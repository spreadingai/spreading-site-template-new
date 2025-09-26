import { getStableUserId } from './utils';

/**
 * AI API 配置常量
 */
const AI_API_CONFIG = {
  // API 接口路径
  CHAT_ENDPOINT: '/agents/zego-doc-agent-zh/runs',
  WELCOME_PROMPTS_ENDPOINT: '/prompts/welcome',
  QA_VOTE_ENDPOINT: '/qa/vote',
  QA_ADD_ENDPOINT: '/qa/add',
  QA_UPDATE_ENDPOINT: '/qa/update',
  // 服务器地址
  SERVERS: {
    DEVELOPMENT: 'http://localhost:8000',
    PRODUCTION: 'http://47.79.19.129:8000'
  }
} as const;

/**
 * 获取AI API的基础URL
 * 根据 NODE_ENV 自动选择对应的服务器地址
 * - development: 使用本地开发服务器
 * - production: 使用生产环境服务器
 */
const getApiBaseUrl = (): string => {
  if (process.env.NODE_ENV === 'production') {
    return AI_API_CONFIG.SERVERS.PRODUCTION;
  }
  return AI_API_CONFIG.SERVERS.DEVELOPMENT;
  // return AI_API_CONFIG.SERVERS.PRODUCTION;
};

export interface StreamEvent {
  event_name: string;
  tool_name?: string;
  tool_args?: any;
  data?: any;
  run_id?: string;
  record_id?: string;
}

export interface RequestParams {
  message: string;
  product: string;
  platform: string;
  user_id?: string;
  session_id?: string;
}

export interface StreamCallbacks {
  onEvent?: (event: StreamEvent) => void;
  onMessage?: (message: string) => void;
  onError?: (error: Error) => void;
  onComplete?: () => void;
}

/**
 * 欢迎提示请求参数
 */
export interface WelcomePromptsRequest {
  product: string;
  platform: string;
  language?: string;
}

/**
 * 欢迎提示响应
 */
export interface WelcomePromptsResponse {
  success: boolean;
  data?: {
    prompts: string[];
  };
  message?: string;
}

/**
 * 评分类型枚举
 */
export enum ScoreType {
  ZERO = 0,
  ONE = 1,
  TWO = 2,
}

/**
 * 参考来源接口
 */
export interface Reference {
  title: string;
  url: string;
  content?: string;
}

/**
 * 问题数据接口
 */
export interface Question {
  run_id: string; // 对应问题答案的唯一标识，必填
  vote: ScoreType; // 评分，可选，枚举值 0：未评分、1：点赞、2：点踩，默认 0
}
/**
 * 从 tool.result 中提取参考文献列表（前端整理）
 * - 支持字符串/数组两种结果
 * - 去重依据 metadata.document_name
 */
const extractReferencesFromToolResult = (rawResult: any): Reference[] => {
  let documents: any[] = [];
  try {
    if (typeof rawResult === 'string') {
      documents = JSON.parse(rawResult);
    } else if (Array.isArray(rawResult)) {
      documents = rawResult;
    } else if (rawResult) {
      documents = [rawResult];
    }
  } catch {
    documents = [];
  }

  const seen = new Set<string>();
  const refs: Reference[] = [];

  for (const doc of documents) {
    let document_name = '';
    if (doc && typeof doc === 'object') {
      const meta = (doc as any).metadata || {};
      document_name = String(meta.document_name || (doc as any).document_name || '');
    } else if (typeof doc === 'string') {
      document_name = doc;
    }

    if (!document_name) continue;
    if (seen.has(document_name)) continue;
    seen.add(document_name);

    const ref = parseReferenceFromGeneratedFilename(document_name);
    if (ref) refs.push(ref);
  }

  return refs;
};

/**
 * 反向解析由 get_filename_from_url 生成的文件名，提取 title 与 url
 * 规则回顾：
 *  title存在：{clean_title}---{netloc}{path}，其后整体做 / -> >，& -> ^^，= -> ^^^，末尾加 .md
 *  title缺失：{netloc}{path}，其后同样替换并加 .md
 */
const parseReferenceFromGeneratedFilename = (filename: string): Reference | null => {
  try {
    let s = filename.trim();
    if (s.toLowerCase().endsWith('.md')) s = s.slice(0, -3);

    // 先还原替换：注意顺序，先 ^^^ -> =，再 ^^ -> &
    const reverseReplacements = (text: string) => text.replace(/\^\^\^/g, '=').replace(/\^\^/g, '&');

    // 拆分 title 与 netloc+path
    let titlePart = '';
    let locPathPart = '';
    const idx = s.indexOf('---');
    if (idx >= 0) {
      titlePart = s.slice(0, idx);
      locPathPart = s.slice(idx + 3);
    } else {
      locPathPart = s;
    }

    // 还原 netloc 与 path（'>' -> '/'）
    locPathPart = reverseReplacements(locPathPart);
    const gtIdx = locPathPart.indexOf('>');
    let netloc = '';
    let path = '';
    if (gtIdx >= 0) {
      netloc = locPathPart.slice(0, gtIdx);
      path = locPathPart.slice(gtIdx + 1).replace(/>/g, '/');
      if (path && !path.startsWith('/')) path = '/' + path;
    } else {
      netloc = locPathPart;
      path = '';
    }

    const url = `https://${netloc}${path}`;
    const title = titlePart
      ? titlePart.replace(/-/g, ' ').replace(/\s+/g, ' ').trim()
      : (path ? (path.split('/').pop() || '').replace(/-/g, ' ') : netloc);

    if (!netloc) return null;
    return { title: title || netloc, url };
  } catch {
    return null;
  }
};




/**
 * 发送流式请求到AI助手API
 */
export const sendStreamRequest = async (
  params: RequestParams,
  callbacks: StreamCallbacks
): Promise<void> => {
  const { onEvent, onMessage, onError, onComplete } = callbacks;

  // 使用稳定的 user_id；session_id 必须由外部在弹出对话框时生成并传入
  const user_id = params.user_id || getStableUserId();
  if (!params.session_id) {
    throw new Error('[sendStreamRequest] session_id is required. It should be created when opening the AskAI modal and reused within the same dialog.');
  }
  const session_id = params.session_id;

  // 后端要求表单编码且需要 `stream=true`，否则会 422
  const formData = new URLSearchParams();
  formData.set('message', params.message);
  formData.set('user_id', user_id);
  formData.set('session_id', session_id);
  formData.set('stream', 'true');
  formData.set('dependencies', JSON.stringify({
    product: params.product,
    platform: params.platform,
  }));

  try {
    const apiBaseUrl = getApiBaseUrl();
    const apiEndpoint = `${apiBaseUrl}${AI_API_CONFIG.CHAT_ENDPOINT}`;

    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: formData.toString(),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('Response body is not readable');
    }

    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        // 处理剩余的buffer内容
        if (buffer.length > 0) {
          const finalLines = buffer.split('\n');
          for (const line of finalLines) {
            const trimmedLine = line.trim();
            if (!trimmedLine) continue;

            // 仅解析 SSE 的 data: 行，忽略其他行（如 event: 行）
            let jsonText = '';
            if (trimmedLine.startsWith('data:')) {
              jsonText = trimmedLine.slice(5).trim();
            } else {
              continue;
            }

            try {
              const parsed: any = JSON.parse(jsonText);
              const eventName = parsed.event || parsed.event_name || '';
              const normalized: StreamEvent = {
                event_name: eventName,
                data: parsed.content,
                run_id: parsed.run_id ? String(parsed.run_id) : undefined,
                record_id: parsed.record_id ? String(parsed.record_id) : undefined,
              };

              // 工具事件兼容（新协议使用 parsed.tool）
              if (parsed.tool && typeof parsed.tool === 'object') {
                normalized.tool_name = parsed.tool.tool_name || parsed.tool.name;
                normalized.tool_args = parsed.tool.tool_args || parsed.tool.arguments;
                if (eventName === 'ToolCallCompleted' && normalized.tool_name === 'search_knowledge_base') {
                  normalized.data = extractReferencesFromToolResult(parsed.tool.result);
                }
              }

              onEvent?.(normalized);

              // 文本内容事件：RunContent（流式片段）或 RunCompleted（完整内容）
              const contentMaybe = parsed.content ?? normalized.data;
              if (
                (eventName === 'RunContent' || eventName === 'RunCompleted') &&
                typeof contentMaybe === 'string'
              ) {
                onMessage?.(contentMaybe);
              }
            } catch (e) {
              console.warn('Failed to parse SSE data line:', trimmedLine, e);
            }
          }
        }
        onComplete?.();
        break;
      }

      buffer += decoder.decode(value, { stream: true });

      // 按行分割，但保留所有行（包括空行）
      const lines = buffer.split('\n');
      buffer = lines.pop() || ''; // 保留最后一行（可能不完整）

      for (const line of lines) {
        const trimmedLine = line.trim();
        if (!trimmedLine) continue;

        // 仅解析 SSE 的 data: 行，忽略其他行（如 event: 行）
        let jsonText = '';
        if (trimmedLine.startsWith('data:')) {
          jsonText = trimmedLine.slice(5).trim();
        } else {
          continue;
        }


        try {
          // 解析后端JSON事件，并做一次规范化（event -> event_name）
          const parsed: any = JSON.parse(jsonText);
          const eventName = parsed.event || parsed.event_name || '';
          const normalized: StreamEvent = {
            event_name: eventName,
            data: parsed.content,
            run_id: parsed.run_id ? String(parsed.run_id) : undefined,
            record_id: parsed.record_id ? String(parsed.record_id) : undefined,
          };
          // 工具事件兼容（新协议使用 parsed.tool）
          if (parsed.tool && typeof parsed.tool === 'object') {
            normalized.tool_name = parsed.tool.tool_name || parsed.tool.name;
            normalized.tool_args = parsed.tool.tool_args || parsed.tool.arguments;
            if (eventName === 'ToolCallCompleted' && normalized.tool_name === 'search_knowledge_base') {
              normalized.data = extractReferencesFromToolResult(parsed.tool.result);
            }
          }
          console.log(">>>>>>>>>>>>>>>>>>>>FFF>>>>", normalized)

          // 分发事件
          onEvent?.(normalized);

          // 文本内容事件：RunContent（流式片段）或 RunCompleted（完整内容）
          const contentMaybe = parsed.content ?? normalized.data;
          if (
            (normalized.event_name === 'RunContent') &&
            typeof contentMaybe === 'string'
          ) {
            onMessage?.(contentMaybe);
          }
        } catch (parseError) {
          console.warn('Failed to parse event:', trimmedLine, parseError);
        }
      }
    }
  } catch (error) {
    onError?.(error as Error);
  }
};

/**
 * 获取欢迎提示
 * @param params 请求参数
 * @returns Promise<WelcomePromptsResponse>
 */
export const fetchWelcomePrompts = async (params: WelcomePromptsRequest): Promise<WelcomePromptsResponse> => {
  try {
    const baseUrl = getApiBaseUrl();
    const url = new URL(AI_API_CONFIG.WELCOME_PROMPTS_ENDPOINT, baseUrl);

    // 添加查询参数
    url.searchParams.append('product', params.product);
    url.searchParams.append('platform', params.platform);
    if (params.language) {
      url.searchParams.append('language', params.language);
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (Array.isArray(data)) {
      return {
        success: true,
        data: { prompts: data },
      };
    } else {
      throw new Error('Failed to fetch welcome prompts');
    }
  } catch (error) {
    console.error('Failed to fetch welcome prompts:', error);
    throw error;
  }
};

/**
 * 发送评分反馈
 * @param questions 问题数据数组
 * @returns Promise<any>
 */
export const scoreFetch = async (
  question: Question
): Promise<any> => {
  try {
    const baseUrl = getApiBaseUrl();
    const url = `${baseUrl}${AI_API_CONFIG.QA_VOTE_ENDPOINT}`;
    const reqData = { ...question };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data && data.status === "success") {
      return {
        success: true,
      };
    } else {
      throw new Error('Failed to send score feedback');
    }
  } catch (error) {
    console.error('Score fetch error:', error);
    throw error;
  }
};


/**
 * QA 记录：新增与更新
 */
export interface AddQaRequest {
  run_id: string;
  question: string;
  userid?: string | null;
  sessionid?: string | null;
  answer?: string | null;
  vote?: 0 | 1 | 2;
  product?: string | null;
  platform?: string | null;
}

export interface UpdateQaRequest {
  run_id: string;
  userid?: string | null;
  sessionid?: string | null;
  question?: string | null;
  answer?: string | null;
  vote?: 0 | 1 | 2 | null;
  product?: string | null;
  platform?: string | null;
}

export const addQaRecord = async (body: AddQaRequest): Promise<void> => {
  try {
    const baseUrl = getApiBaseUrl();
    const url = `${baseUrl}${AI_API_CONFIG.QA_ADD_ENDPOINT}`;
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        run_id: body.run_id,
        question: body.question,
        userid: body.userid ?? undefined,
        sessionid: body.sessionid ?? undefined,
        answer: body.answer ?? undefined,
        vote: body.vote ?? 0,
        product: body.product ?? undefined,
        platform: body.platform ?? undefined,
      }),
    });
    if (!resp.ok) {
      console.warn('[QA][add] http error', resp.status, await resp.text());
    } else {
      // 可按需解析返回值
      // const data = await resp.json();
    }
  } catch (e) {
    console.warn('[QA][add] request failed', e);
  }
};

export const updateQaRecord = async (body: UpdateQaRequest): Promise<void> => {
  try {
    const baseUrl = getApiBaseUrl();
    const url = `${baseUrl}${AI_API_CONFIG.QA_UPDATE_ENDPOINT}`;
    const resp = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        run_id: body.run_id,
        userid: body.userid ?? undefined,
        sessionid: body.sessionid ?? undefined,
        question: body.question ?? undefined,
        answer: body.answer ?? undefined,
        vote: body.vote ?? undefined,
        product: body.product ?? undefined,
        platform: body.platform ?? undefined,
      }),
    });
    if (!resp.ok) {
      console.warn('[QA][update] http error', resp.status, await resp.text());
    } else {
      // 可按需解析返回值
      // const data = await resp.json();
    }
  } catch (e) {
    console.warn('[QA][update] request failed', e);
  }
};

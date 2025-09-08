import { generateUserFingerprint, generateSessionId } from './utils';

/**
 * AI API 配置常量
 */
const AI_API_CONFIG = {
  // API 接口路径
  ENDPOINT_PATH: '/v1/agents/zego_rag_agent/runs',
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
  // return AI_API_CONFIG.SERVERS.DEVELOPMENT;
  return AI_API_CONFIG.SERVERS.PRODUCTION;
};

export interface StreamEvent {
  event_name: string;
  tool_name?: string;
  tool_args?: any;
  data?: any;
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
 * 发送流式请求到AI助手API
 */
export const sendStreamRequest = async (
  params: RequestParams,
  callbacks: StreamCallbacks
): Promise<void> => {
  const { onEvent, onMessage, onError, onComplete } = callbacks;

  // 生成用户ID和会话ID
  const user_id = params.user_id || generateUserFingerprint();
  const session_id = params.session_id || generateSessionId();

  const requestBody = {
    message: params.message,
    user_id,
    session_id,
    product: params.product,
    platform: params.platform,
  };

  try {
    const apiBaseUrl = getApiBaseUrl();
    const apiEndpoint = `${apiBaseUrl}${AI_API_CONFIG.ENDPOINT_PATH}`;

    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
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
            if (line.trim().startsWith('{') && line.trim().endsWith('}')) {
              try {
                const event: StreamEvent = JSON.parse(line.trim());
                onEvent?.(event);
                if (event.event_name === 'message' && typeof event.data === 'string') {
                  onMessage?.(event.data);
                }
              } catch (parseError) {
                // 解析失败，当作Markdown内容处理，保留换行符
                onMessage?.(line + '\n');
              }
            } else {
              // 非JSON格式，当作Markdown内容处理，保留换行符
              onMessage?.(line + '\n');
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
        // 检查是否为JSON格式的事件（更精确的判断）
        const trimmedLine = line.trim();
        if (trimmedLine.startsWith('{') && trimmedLine.endsWith('}')) {
          try {
            // 尝试解析JSON事件
            const event: StreamEvent = JSON.parse(trimmedLine);
            onEvent?.(event);

            // 如果是消息内容事件，直接传递event.data（增量内容）
            if (event.event_name === 'message' && typeof event.data === 'string') {
              onMessage?.(event.data);
            }
          } catch (parseError) {
            // JSON解析失败，当作普通Markdown文本处理，保留换行符
            onMessage?.(line + '\n');
          }
        } else {
          // 非JSON格式的行，直接作为Markdown内容处理
          // 保留原始格式，包括空行和缩进，添加换行符
          onMessage?.(line + '\n');
        }
      }
    }
  } catch (error) {
    onError?.(error as Error);
  }
};

/**
 * 解析产品名称
 */
export const parseProductName = (group: string): string => {
  // 根据group映射到产品名称
  const productMap: Record<string, string> = {
    'real_time_voice_zh': '实时音视频',
    'real_time_voice_en': 'Real-time Audio & Video',
    'live_streaming_zh': '直播',
    'live_streaming_en': 'Live Streaming',
    'chat_zh': '即时通讯',
    'chat_en': 'Chat',
    // 添加更多映射
  };

  return productMap[group] || group;
};

/**
 * 解析平台名称
 */
export const parsePlatformName = (platform: string): string => {
  // 根据platform映射到标准格式
  const platformMap: Record<string, string> = {
    'android-java': 'Android(Java)',
    'android-kotlin': 'Android(Kotlin)',
    'ios-oc': 'iOS(Objective-C)',
    'ios-swift': 'iOS(Swift)',
    'web': 'Web',
    'flutter': 'Flutter',
    'react-native': 'React Native',
    'unity': 'Unity',
    'windows': 'Windows',
    'macos': 'macOS',
    'linux': 'Linux',
    // 添加更多映射
  };

  return platformMap[platform] || platform;
};

// 默认问题接口相关类型
export interface DefaultQuestionsRequest {
  group: string;
  platform: string;
  language?: string;
}

export interface DefaultQuestionsResponse {
  questions: string[];
  success: boolean;
  message?: string;
}

// 获取默认问题的接口方法
export const fetchDefaultQuestions = async (
  params: DefaultQuestionsRequest
): Promise<DefaultQuestionsResponse> => {
  try {
    // TODO: 替换为实际的接口地址
    const response = await fetch('/api/default-questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return {
      questions: data.questions || [
        "如何选择视频分辨率、帧率、码率？",
        "媒体音量和通话音量有什么区别？",
        "如何切换前后摄像头？"
      ],
      success: true,
      message: data.message,
    };
  } catch (error) {
    console.error('Failed to fetch default questions:', error);
    return {
      questions: [
        "如何选择视频分辨率、帧率、码率？",
        "媒体音量和通话音量有什么区别？",
        "如何切换前后摄像头？"
      ],
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

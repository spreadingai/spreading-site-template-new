import { generateUserFingerprint, generateSessionId } from './utils';

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
    const response = await fetch('http://localhost:8000/v1/agents/zego_rag_agent/runs', {
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
        onComplete?.();
        break;
      }

      buffer += decoder.decode(value, { stream: true });

      // 处理多行数据
      const lines = buffer.split('\n');
      buffer = lines.pop() || ''; // 保留最后一行（可能不完整）

      for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine) {
          try {
            // 尝试解析JSON事件
            const event: StreamEvent = JSON.parse(trimmedLine);
            onEvent?.(event);

            // 如果是消息内容，也触发onMessage回调
            if (event.event_name === 'message' && typeof event.data === 'string') {
              onMessage?.(event.data);
            }
          } catch (parseError) {
            // 如果不是JSON格式，可能是纯文本消息
            if (trimmedLine.length > 0 && !trimmedLine.startsWith('{')) {
              // 直接作为消息内容处理
              onMessage?.(trimmedLine);
            } else {
              console.warn('Failed to parse event:', trimmedLine, parseError);
            }
          }
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

import React, { useCallback, useRef, useEffect } from 'react';
import { Bubble, BubbleProps } from '@ant-design/x';
import {
  UserOutlined,
  LinkOutlined,
  SyncOutlined,
  CopyOutlined,
  LikeOutlined,
  DislikeOutlined
} from '@ant-design/icons';
import { Typography, Space, message } from 'antd';
import { Markdown } from "@ant-design/pro-editor";
// @ts-ignore
import MarkdownIt from "markdown-it";
import Robot from "@/assets/icons/ai-search/Robot.svg";
import EventStatus from './EventStatus';
import styles from './MessageList.module.scss';

const { Link, Text } = Typography;

const md = MarkdownIt({ html: true, breaks: true });



/**
 * 渲染消息 footer（完全仿照 modal-new.tsx 的实现）
 */
const renderMessageFooter = (
  message: Message,
  handlers: {
    regenerateHandle: (e: React.MouseEvent<HTMLElement, MouseEvent>, message: Message) => void;
    copyHandle: (message: Message) => void;
    scoreHandle: (e: React.MouseEvent<HTMLElement, MouseEvent>, message: Message, score: ScoreType) => void;
  },
  isLoading: boolean = false
) => {
  const { regenerateHandle, copyHandle, scoreHandle } = handlers;

  // 检查按钮是否应该禁用
  const isRegenerateDisabled = isLoading || !message.customID;

  // 处理参考来源数据 - 使用简单直接的方式
  const references = message.references || [];
  console.log('references:', references);

  // 去重处理
  const uniqueReferences = references.filter((ref, index, arr) =>
    arr.findIndex(r => r.url === ref.url) === index
  );

  const renderData = uniqueReferences.map(ref => ({
    docLink: ref.url,
    docName: ref.title,
    docID: ref.url
  }));

  return (
    <>
      {renderData.length ? (
        <div className={`${styles["custom-chat-item-doc-agg"]} custom-chat-item-doc-agg`}>
          <div className={styles["custom-chat-item-doc-agg-title"]}>
            参考来源
          </div>
          {renderData.map((item, index) => {
            return (
              <div
                key={item.docID}
                className={styles["custom-chat-item-doc-agg-item"]}
              >
                <a
                  key={"" + item.docID + index}
                  href={item.docLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.docName}
                </a>
              </div>
            );
          })}
        </div>
      ) : null}
      <div className={`${styles["custom-chat-item-operation"]} custom-chat-item-operation`}>
        <SyncOutlined
          className={`${styles["custom-chat-item-operation-btn"]} ${isRegenerateDisabled ? styles["disabled"] : ""}`}
          onClick={(e) => regenerateHandle(e, message)}
          style={{
            opacity: isRegenerateDisabled ? 0.3 : 0.6,
            cursor: isRegenerateDisabled ? 'not-allowed' : 'pointer'
          }}
        />
        <CopyOutlined
          className={styles["custom-chat-item-operation-btn"]}
          onClick={() => copyHandle(message)}
        />
        <LikeOutlined
          className={styles["custom-chat-item-operation-btn"]}
          onClick={(e) => scoreHandle(e, message, ScoreType.FIVE)}
        />
        <DislikeOutlined
          className={styles["custom-chat-item-operation-btn"]}
          onClick={(e) => scoreHandle(e, message, ScoreType.ONE)}
        />
      </div>
    </>
  );
};

export interface Reference {
  title: string;
  url: string;
}

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp?: number;
  eventInfo?: {
    eventName: string;
    toolName?: string;
    toolArgs?: any;
    isLoading?: boolean;
  };
  references?: Reference[]; // 每条消息可以有自己的参考来源
  status?: 'loading' | 'success' | 'error' | 'complete'; // 消息状态
  customID?: string; // 用于关联 customIDMap 的唯一标识
}

// 复制 modal-new.tsx 的类型定义
export enum ScoreType {
  ZERO = "0",
  ONE = "1",
  TWO = "2",
  THREE = "3",
  FOUR = "4",
  FIVE = "5",
}

export interface Question {
  answerID: string; // 对应问题答案的唯一标识，必填
  question: string; // 询问的问题，必填
  formData?: any; // 文件类型下的传输内容，可选，预留
  type?: string; // 输入内容类型，可选
  score?: ScoreType; // 评分，可选，枚举值 0：未评分、1-5：好评等级，默认 0
  answer?: string; // 回答，可选，预留
}

// 仿照 modal-new.tsx 的 AnswerData 结构
export interface AnswerData {
  id: string;
  answer: string;
  question: string; // 原始用户问题
  session_id?: string;
  references?: Reference[];
  score?: ScoreType; // 使用 ScoreType 枚举
}

// 复制 modal-new.tsx 的 scoreFetch 函数
export const scoreFetch = (
  product: string,
  platform: string,
  sessionID: string,
  questions: Question[]
) => {
  // 这里需要根据实际的 API 端点调整
  const baseURL = process.env.NODE_ENV === 'production'
    ? 'http://47.79.19.129:8000'
    : 'http://localhost:8000';
  const url = `${baseURL}/api/v1/feedback/search`;
  const reqData = { product, platform, sessionID, questions };

  return fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqData),
  })
    .then((res) => {
      if (res.ok) {
        return Promise.resolve(res);
      } else {
        const { status, statusText } = res;
        return Promise.reject(`status: ${status}, statusText: ${statusText}`);
      }
    })
    .then((_res) => {
      return _res.body;
    });
};

export interface MessageListProps {
  messages: Message[];
  currentTheme: string;
  streamingMessageId?: string; // 当前正在流式输出的消息ID
  isLoading?: boolean; // 是否正在加载中
  // 仿照 modal-new.tsx，需要传入必要的状态管理函数
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  onRequest: (content: string) => void; // 重新发送消息的函数
  sessionId?: string; // 会话ID，用于存储到 customIDMap
  // 添加评分需要的参数
  currentGroup?: string;
  currentPlatform?: string;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  currentTheme,
  streamingMessageId,
  isLoading = false,
  setMessages,
  onRequest,
  sessionId,
  currentGroup = 'default',
  currentPlatform = 'default'
}) => {
  // 仿照 modal-new.tsx 的 customIDMap 实现
  const customIDMap = useRef<Record<string, AnswerData>>({});

  // 复制 modal-new.tsx 的 updateScoreStyle 函数
  const updateScoreStyle = useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      try {
        if (e.currentTarget.style.opacity === "1") {
          e.currentTarget.style.color = "";
          e.currentTarget.style.opacity = "";
        } else {
          e.currentTarget.style.color = "var(--docuo-color-primary-active)";
          e.currentTarget.style.opacity = "1";
          if (e.currentTarget.nextElementSibling) {
            // @ts-ignore
            e.currentTarget.nextElementSibling.style.color = "";
            // @ts-ignore
            e.currentTarget.nextElementSibling.style.opacity = "";
          }
          if (e.currentTarget.previousElementSibling) {
            // @ts-ignore
            e.currentTarget.previousElementSibling.style.color = "";
            // @ts-ignore
            e.currentTarget.previousElementSibling.style.opacity = "";
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    []
  );

  // 监听消息变化，更新 customIDMap（仿照 modal-new.tsx 的逻辑）
  useEffect(() => {
    messages.forEach(message => {
      if (message.role === 'assistant' && message.customID && message.content) {
        // 如果消息已完成且有内容，存储到 customIDMap
        if (message.status === 'complete' && !customIDMap.current[message.customID]) {
          // 找到对应的用户问题
          const messageIndex = messages.findIndex(msg => msg.id === message.id);
          const userMessage = messageIndex > 0 ? messages[messageIndex - 1] : null;

          if (userMessage && userMessage.role === 'user') {
            customIDMap.current[message.customID] = {
              id: message.id,
              answer: message.content,
              question: userMessage.content,
              session_id: sessionId, // 添加 session_id
              references: message.references || [],
            };
          }
        }
      }
    });
  }, [messages, sessionId]);

  // 重新生成处理函数（完全仿照 modal-new.tsx）
  const regenerateHandle = useCallback(
    (_e: React.MouseEvent<HTMLElement, MouseEvent>, message: Message) => {
      // 边界条件检查
      if (isLoading || !message.customID) return;

      const answerData = customIDMap.current[message.customID];
      if (!answerData) return;

      // 删除最后一轮对话（用户问题 + AI回答）
      setMessages((oldMessages) => {
        return oldMessages.slice(0, oldMessages.length - 2);
      });

      // 清理 customIDMap 中的数据
      delete customIDMap.current[message.customID];

      // 重新发送原始问题
      onRequest(answerData.question);
    },
    [isLoading, setMessages, onRequest]
  );

  // 复制处理函数
  const copyHandle = useCallback(async (message: Message) => {
    try {
      await navigator.clipboard.writeText(message.content);
      const { message: messageApi } = await import('antd');
      messageApi.success("复制成功");
    } catch (error) {
      console.error('Copy failed:', error);
    }
  }, []);

  // 评分处理函数（完全仿照 modal-new.tsx 的实现）
  const scoreHandle = useCallback(
    (
      e: React.MouseEvent<HTMLElement, MouseEvent>,
      message: Message,
      score: ScoreType
    ) => {
      if (!message.customID) return;
      const answerData = customIDMap.current[message.customID];
      if (!answerData) return;

      // 1. 先更新本地样式
      updateScoreStyle(e);

      const { id, answer } = answerData;
      const oldScore = answerData.score;
      const targetScore = answerData.score === score ? ScoreType.ZERO : score;

      const questionData: Question = {
        answerID: id,
        question: answerData.question,
        score: targetScore || ScoreType.ZERO,
        answer: answer,
      };

      // 2. 更新本地数据
      answerData.score = score;

      // 3. 发送请求，失败了就回退
      scoreFetch(currentGroup, currentPlatform, sessionId || '', [
        questionData,
      ]).catch((error) => {
        console.log("scoreFetch error", error);
        // 回退本地数据
        answerData.score = oldScore;
      });
    },
    [currentGroup, currentPlatform, sessionId, updateScoreStyle]
  );

  // Markdown渲染函数
  const renderMarkdown: BubbleProps["messageRender"] = (content) => {
    return process.env.NODE_ENV === "development" ? (
      <Typography>
        <div
          dangerouslySetInnerHTML={{
            __html: md.render(content as string),
          }}
        />
      </Typography>
    ) : (
      <Markdown>{content as string}</Markdown>
    );
  };
  const roles = {
    assistant: {
      // typing: { step: 5, interval: 10 },
      placement: 'start' as const,
      avatar: (
        <div className={styles["user-avatar-wrap"]}>
          {currentTheme === "light" ? <Robot /> : <Robot />}
        </div>
      ),
      classNames: {
        content: styles.customBubbleContent,
        footer: styles.customBubbleFooter,
      },
    },
    user: {
      placement: 'end' as const,
      avatar: (
        <div className={styles["user-avatar-wrap"]}>
          <UserOutlined />
        </div>
      ),
      classNames: {
        content: styles.customBubbleContent,
      },
    },
  };

  const bubbleItems = messages.map((message) => {
    const item: any = {
      key: message.id,
      content: message.content,
      role: message.role,
    };

    // 为assistant消息添加事件状态header
    if (message.role === 'assistant' && message.eventInfo) {
      item.header = (
        <EventStatus
          eventName={message.eventInfo.eventName}
          toolName={message.eventInfo.toolName}
          toolArgs={message.eventInfo.toolArgs}
          isLoading={message.eventInfo.isLoading || false}
        />
      );
    }

    // 为assistant消息添加Markdown渲染
    if (message.role === 'assistant') {
      item.messageRender = renderMarkdown;
    }

    // 为assistant消息添加footer（参考 modal-new.tsx 的判断逻辑）
    if (message.role === 'assistant') {
      // 判断是否显示 footer：
      // 1. 如果有 status 字段，只有 success/complete 状态才显示
      // 2. 如果没有 status 字段，但消息有内容且不在加载中，则显示
      const shouldShowFooter = message.status
        ? (message.status === 'success' || message.status === 'complete')
        : (message.content && !message.eventInfo?.isLoading && streamingMessageId !== message.id);

      if (shouldShowFooter) {
        item.footer = renderMessageFooter(message, {
          regenerateHandle,
          copyHandle,
          scoreHandle
        }, isLoading);
      }
    }

    // 为正在流式输出的assistant消息启用typing效果
    if (message.role === 'assistant' && streamingMessageId === message.id) {
      item.typing = {
        step: 5,
        interval: 10,
      };
    }

    return item;
  });

  return (
    <div className={styles.messageList}>
      <Bubble.List
        items={bubbleItems}
        roles={roles}
      />
    </div>
  );
};

export default MessageList;

import React, { useCallback, useRef, useEffect, useState } from 'react';
import { Bubble, BubbleProps, Welcome, Prompts } from '@ant-design/x';
import {
  UserOutlined,
  SyncOutlined,
  CopyOutlined,
  LikeOutlined,
  DislikeOutlined,
  CommentOutlined
} from '@ant-design/icons';
import { Space, Spin, Skeleton } from 'antd';
import { Markdown } from "@ant-design/pro-editor";
// @ts-ignore
// import MarkdownIt from "markdown-it";
import Robot from "@/assets/icons/ai-search/Robot.svg";
import EventStatus from './EventStatus';
import outStyles from './MessageList.module.scss';
import { fetchWelcomePrompts, WelcomePromptsRequest, scoreFetch, ScoreType, Reference, Question } from './api';

// const md = MarkdownIt({ html: true, breaks: true });



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
  aiSearchData: any
) => {
  const { regenerateHandle, copyHandle, scoreHandle } = handlers;

  // 处理参考来源数据 - 使用简单直接的方式
  const references = message.references || [];

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
        <div className={`${outStyles["custom-chat-item-doc-agg"]} custom-chat-item-doc-agg`}>
          <div className={outStyles["custom-chat-item-doc-agg-title"]}>
            {aiSearchData.referenceSource}
          </div>
          {renderData.map((item, index) => {
            return (
              <div
                key={item.docID}
                className={outStyles["custom-chat-item-doc-agg-item"]}
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
      <div className={`${outStyles["custom-chat-item-operation"]} custom-chat-item-operation`}>
        <SyncOutlined
          className={`${outStyles["custom-chat-item-operation-btn"]}`}
          onClick={(e) => regenerateHandle(e, message)}
        />
        <CopyOutlined
          className={outStyles["custom-chat-item-operation-btn"]}
          onClick={() => copyHandle(message)}
        />
        <LikeOutlined
          className={outStyles["custom-chat-item-operation-btn"]}
          onClick={(e) => scoreHandle(e, message, ScoreType.ONE)}
        />
        <DislikeOutlined
          className={outStyles["custom-chat-item-operation-btn"]}
          onClick={(e) => scoreHandle(e, message, ScoreType.TWO)}
        />
      </div>
    </>
  );
};



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

// 仿照 modal-new.tsx 的 AnswerData 结构
export interface AnswerData {
  id: string;
  question: string; // 原始用户问题
  score?: ScoreType; // 使用 ScoreType 枚举
}



export interface MessageListProps {
  messages: Message[];
  currentTheme: string;
  streamingMessageId?: string; // 当前正在流式输出的消息ID
  isLoading?: boolean; // 是否正在加载中
  // 仿照 modal-new.tsx，需要传入必要的状态管理函数
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  onRequest: (content: string) => void; // 重新发送消息的函数
  aiSearchData: any;
  // 添加评分需要的参数
  currentGroup: string;
  currentPlatform: string;
  currentLanguage: string;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  currentTheme,
  streamingMessageId,
  isLoading = false,
  setMessages,
  onRequest,
  aiSearchData,
  currentGroup,
  currentPlatform,
  currentLanguage
}) => {
  // 仿照 modal-new.tsx 的 customIDMap 实现
  const customIDMap = useRef<Record<string, AnswerData>>({});

  // 默认问题状态
  const [defaultQuestions, setDefaultQuestions] = useState<string[]>([]);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState<boolean>(true);

  // 组件挂载时获取默认问题
  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        setIsLoadingQuestions(true);

        const params: WelcomePromptsRequest = {
          product: currentGroup,
          platform: currentPlatform,
          language: currentLanguage
        };

        const response = await fetchWelcomePrompts(params);
        setDefaultQuestions(response.data.prompts);
      } catch (error) {
        console.error('Failed to fetch welcome prompts:', error);
        setDefaultQuestions([]);
      } finally {
        setIsLoadingQuestions(false);
      }
    };

    fetchPrompts();
  }, [currentGroup, currentLanguage, currentPlatform]);

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
        if ((message.status === 'complete' || message.status === 'error') && !customIDMap.current[message.customID]) {
          // 找到对应的用户问题
          const messageIndex = messages.findIndex(msg => msg.id === message.id);
          const userMessage = messageIndex > 0 ? messages[messageIndex - 1] : null;

          if (userMessage && userMessage.role === 'user') {
            customIDMap.current[message.customID] = {
              id: message.id,
              question: userMessage.content,
            };
          }
        }
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

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
      messageApi.open({
        type: "success",
        content: aiSearchData.copySuccess,
      });
    } catch (error) {
      console.error('Copy failed:', error);
    }
  }, [aiSearchData]);

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

      const { id } = answerData;
      const oldScore = answerData.score;
      const targetScore = answerData.score === score ? ScoreType.ZERO : score;

      const questionData: Question = {
        run_id: id,
        vote: targetScore || ScoreType.ZERO,
      };

      // 2. 更新本地数据
      answerData.score = score;

      // 3. 发送请求，失败了就回退
      scoreFetch(questionData).catch((error) => {
        console.log("scoreFetch error", error);
        // 回退本地数据
        answerData.score = oldScore;
      });
    },
    [updateScoreStyle]
  );

  // Markdown渲染函数
  const renderMarkdown: BubbleProps["messageRender"] = (content) => {
    // return process.env.NODE_ENV !== "development" ? (
    //   <Typography>
    //     <div
    //       dangerouslySetInnerHTML={{
    //         __html: md.render(content as string),
    //       }}
    //     />
    //   </Typography>
    // ) : (
    //   <Markdown>{content as string}</Markdown>
    // );
    return <Markdown>{content as string}</Markdown>;
  };
  const roles = {
    assistant: {
      // typing: { step: 5, interval: 10 },
      placement: 'start' as const,
      avatar: (
        <div className={outStyles["user-avatar-wrap"]}>
          {currentTheme === "light" ? <Robot /> : <Robot />}
        </div>
      ),
      loadingRender: () => (
        <Space>
          <Spin size="small" className={outStyles.queryLoading} />
          <span className={outStyles.queryTips}>{aiSearchData.beQuerying}</span>
        </Space>
      ),
      classNames: {
        content: outStyles.customBubbleContent,
        footer: outStyles.customBubbleFooter,
      },
    },
    user: {
      placement: 'end' as const,
      avatar: (
        <div className={outStyles["user-avatar-wrap"]}>
          <UserOutlined />
        </div>
      ),
      classNames: {
        content: outStyles.customBubbleContent,
      },
    },
  };

  // 添加默认问题和占位符节点（仿照 modal-new.tsx）
  const placeholderPromptsItems: any[] = [
    {
      key: "1",
      children: defaultQuestions.map((question, index) => ({
        key: `1-${index}`,
        icon: <CommentOutlined />,
        description: question,
      })),
    },
  ];

  const placeholderNode = (
    <Space direction="vertical" className={outStyles.placeholderNode}>
      <Welcome
        variant="borderless"
        icon="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp"
        title={aiSearchData?.defaultRemarks?.[0]}
        description={aiSearchData?.defaultRemarks?.[1]}
        rootClassName={outStyles.welcomeWrap}
        classNames={{
          icon: outStyles.welcomeIcon,
          title: outStyles.welcomeTitle,
          description: outStyles.welcomeDescription,
        }}
      />
      {isLoadingQuestions ? (
        // 显示骨架屏
        <div className={outStyles.skeletonContainer}>
          <div className={outStyles.skeletonTitle}>
            <Skeleton.Input active size="small" style={{ width: 100, height: 20 }} />
          </div>
          <div className={outStyles.skeletonQuestions}>
            {Array.from({ length: 3 }, (_, index) => (
              <div key={index} className={outStyles.skeletonQuestion}>
                <Skeleton.Input
                  active
                  size="default"
                  style={{
                    width: `${Math.random() * 100 + 150}px`,
                    height: 32,
                    borderRadius: 16
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      ) : defaultQuestions.length ? (
        <Prompts
          title={aiSearchData?.guessText}
          items={placeholderPromptsItems}
          classNames={{
            title: outStyles["question-tips"],
            list: outStyles.questionList,
            item: outStyles.questionItem,
            subItem: outStyles.questionSubItem,
          }}
          styles={{
            list: {
              width: "100%",
            },
            item: {
              flex: 1,
            },
          }}
          onItemClick={(info) => {
            // 处理点击默认问题的逻辑
            if (info.data?.description && typeof info.data.description === 'string') {
              onRequest(info.data.description);
            }
          }}
        />
      ) : null}
    </Space>
  );

  const bubbleItems = messages.map((message) => {
    const item: any = {
      key: message.id,
      content: message.content,
      role: message.role,
      loading: !message.content || message.status === 'loading',
    };

    // 为assistant消息添加事件状态header
    if (message.role === 'assistant' && message.eventInfo) {
      item.header = (
        <EventStatus
          eventName={message.eventInfo.eventName}
          toolName={message.eventInfo.toolName}
          toolArgs={message.eventInfo.toolArgs}
          isLoading={message.eventInfo.isLoading || false}
          aiSearchData={aiSearchData}
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
      // 1. 如果有 status 字段，只有 success/complete/error 状态才显示
      // 2. 如果没有 status 字段，但消息有内容且不在加载中，则显示
      const shouldShowFooter = message.status
        ? (message.status === 'success' || message.status === 'complete' || message.status === 'error')
        : (message.content && !message.eventInfo?.isLoading && streamingMessageId !== message.id);

      if (shouldShowFooter) {
        item.footer = renderMessageFooter(message, {
          regenerateHandle,
          copyHandle,
          scoreHandle
        }, aiSearchData);
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
    <div className={outStyles.messageList}>
      <Bubble.List
        items={
          bubbleItems.length > 0
            ? bubbleItems
            : [
                {
                  content: placeholderNode,
                  variant: "borderless",
                  classNames: {
                    content: outStyles.placeholderContent,
                  },
                },
              ]
        }
        roles={roles}
      />
    </div>
  );
};

export default MessageList;

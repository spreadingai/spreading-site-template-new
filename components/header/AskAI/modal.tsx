import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Modal, message } from 'antd';
import { ThemeProvider } from 'antd-style';
// @ts-ignore
import { ReloadOutlined } from '@ant-design/icons';
import MessageList, { Message } from './MessageList';
import { Reference, cancelRun } from './api';
import MessageSender from './MessageSender';
import { sendStreamRequest, StreamEvent } from './api';
import { generateSessionId, generateUUID } from './utils';
import { copywriting } from "@/components/constant/language";
import outStyles from './modal.module.scss';
import { defaultLanguage } from '@/components/context/languageContext';

interface Props {
  rootClassName?: string;
  currentTheme: string;
  currentLanguage: string;
  currentGroup: string;
  currentPlatform: string;
  isModalOpen: boolean;
  onCloseHandle: () => void;
}

const AskAIModal: React.FC<Props> = ({
  rootClassName = '',
  currentTheme,
  currentLanguage,
  currentGroup,
  currentPlatform,
  isModalOpen,
  onCloseHandle,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const [streamingMessageId, setStreamingMessageId] = useState<string>('');
  const [messageApi, contextHolder] = message.useMessage();
  const [screenType, setScreenType] = useState<0 | 1 | 2>(0); // 0: > 700, 1: 400 ~ 700, 2: < 400

  // 更新底部样式 - 复制自 modal-new.tsx
  const updateFooterStyle = useCallback(() => {
    setTimeout(() => {
      const docAggDoms = document.querySelectorAll(`.custom-chat-item-doc-agg`);
      const operationDoms = document.querySelectorAll(
        `.custom-chat-item-operation`
      );
      const docAggDom = docAggDoms[docAggDoms.length - 1];
      const operationDom = operationDoms[operationDoms.length - 1];
      console.log("updateFooterStyle", docAggDom, operationDom);
      docAggDom && ((docAggDom as HTMLElement).style.display = "block");
      operationDom && ((operationDom as HTMLElement).style.display = "flex");
      if (docAggDom || operationDom) {
        const scrollContainer = document.querySelector(".ant-bubble-list");
        scrollContainer &&
          scrollContainer.scrollTo({
            top: scrollContainer.scrollHeight,
            behavior: "smooth",
          });
      }
    }, 300);
  }, []);

  // 更新链接属性 - 复制自 modal-new.tsx
  const updateATagAttr = useCallback(() => {
    setTimeout(() => {
      const chatListItems = document.querySelectorAll(
        ".ant-bubble-list .ant-bubble"
      );
      console.log("updateATagAttr chatListItems ", chatListItems);
      chatListItems.forEach((chatListItem) => {
        const aTags = chatListItem.querySelectorAll(
          ".ant-bubble-content-wrapper article a"
        );
        console.log("updateATagAttr aTags ", aTags, chatListItem);
        aTags.forEach((item) => {
          item.setAttribute("target", "_blank");
        });
      });
    }, 1000);
  }, []);

  const currentMessageRef = useRef<Message | null>(null);
  const aiSearchData = copywriting[currentLanguage || defaultLanguage].aiSearch;

  // 重置对话函数 - 复制自 modal-new.tsx
  const resetConverse = useCallback(() => {
    setMessages([]);
    setIsLoading(false);
    setStreamingMessageId('');
    currentMessageRef.current = null;
    // 可以在这里添加其他需要重置的状态
  }, []);

  // 每次打开模态框时生成新的session ID
  useEffect(() => {
    if (isModalOpen) {
      setSessionId(generateSessionId());
      setMessages([]);
      setIsLoading(false);
      setStreamingMessageId('');
    }
  }, [isModalOpen]);

  useEffect(() => {
    const sizeChangeHandle = () => {
      console.log("sizeChangeHandle");
      const clientWidth = document.documentElement.clientWidth;
      if (!clientWidth || clientWidth > 700) {
        setScreenType(0);
      } else if (clientWidth > 400) {
        setScreenType(1);
      } else {
        setScreenType(2);
      }
    };
    sizeChangeHandle();
    typeof window !== "undefined" &&
      window.addEventListener("resize", sizeChangeHandle);
    return () => {
      typeof window !== "undefined" &&
        window.removeEventListener("resize", sizeChangeHandle);
    };
  }, []);

  const handleSendMessage = useCallback(async (content: string) => {
    if (isLoading) return;

    // 添加用户消息
    const userMessage: Message = {
      id: generateUUID(),
      content,
      role: 'user',
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // 创建AI回复消息
    const customID = Date.now().toString(); // 生成唯一ID
    const aiMessage: Message = {
      id: generateUUID(),
      content: '',
      role: 'assistant',
      timestamp: Date.now(),
      status: 'loading', // 初始状态为加载中
      customID, // 添加 customID
    };

    currentMessageRef.current = aiMessage;
    setStreamingMessageId(aiMessage.id); // 设置当前流式消息ID
    setMessages(prev => [...prev, aiMessage]);

    try {
      await sendStreamRequest(
        {
          message: content,
          product: currentGroup,
          platform: currentPlatform,
          language: currentLanguage,
          session_id: sessionId,
        },
        {
          onEvent: (event: StreamEvent) => {
            // RunStarted：用 run_id 覆盖 AI 消息 id，并记录QA基础信息
            if (event.event_name === 'RunStarted' && event.run_id && currentMessageRef.current) {
              const oldId = currentMessageRef.current.id;
              const newId = String(event.run_id);
              if (oldId !== newId) {
                currentMessageRef.current.id = newId;
                setStreamingMessageId(newId);
                setMessages(prev => prev.map(msg => (msg.id === oldId ? { ...msg, id: newId } : msg)));
              }
            }

            // 仅在工具事件时更新事件头，避免被非工具事件覆盖导致闪烁
            if (
              event.event_name === 'ToolCallStarted' ||
              event.event_name === 'ToolCallCompleted'
            ) {
              // 工具调用开始或完成阶段：保持/开始转圈；有新内容时停止转圈
              if (currentMessageRef.current) {
                currentMessageRef.current.eventInfo = {
                  eventName: event.event_name,
                  toolName: event.tool_name,
                  toolArgs: event.tool_args,
                  isLoading: true,
                };
                setMessages(prev =>
                  prev.map(msg =>
                    msg.id === currentMessageRef.current?.id
                      ? { ...msg, eventInfo: currentMessageRef.current.eventInfo }
                      : msg
                  )
                );
              }
            }

            // 处理搜索完成事件，添加引用数据（api.ts 已拍平 data）
            if (event.event_name === 'ToolCallCompleted' && event.tool_name === 'search_knowledge_base') {
              // 处理搜索完成事件，将引用数据关联到当前AI消息
              if (event.data && Array.isArray(event.data) && currentMessageRef.current) {
                const newReferences: Reference[] = event.data.map((item: any) => ({
                  title: item.title,
                  url: item.url,
                }));

                // 将参考来源添加到当前AI消息
                currentMessageRef.current.references = [
                  ...(currentMessageRef.current.references || []),
                  ...newReferences
                ];

                // 更新消息列表中的参考来源
                setMessages(prev =>
                  prev.map(msg =>
                    msg.id === currentMessageRef.current?.id
                      ? { ...msg, references: currentMessageRef.current.references }
                      : msg
                  )
                );
              }
            }
          },
          onMessage: (messageContent: string) => {
            // 累积AI消息内容，而不是覆盖；并在收到内容时停止转圈（仅改转圈，不改文案）
            if (currentMessageRef.current) {
              // 累积内容
              currentMessageRef.current.content += messageContent;

              // 停止事件头部的转圈，但保留原有文案/图标
              if (currentMessageRef.current.eventInfo?.isLoading) {
                currentMessageRef.current.eventInfo = {
                  ...currentMessageRef.current.eventInfo,
                  isLoading: false,
                };
              }

              setMessages(prev =>
                prev.map(msg =>
                  msg.id === currentMessageRef.current?.id
                    ? {
                        ...msg,
                        content: currentMessageRef.current.content,
                        eventInfo: currentMessageRef.current.eventInfo,
                      }
                    : msg
                )
              );
            }
          },
          onError: (error: Error) => {
            console.error('Stream request error:', error);
            // messageApi.error('请求失败，请稍后重试');
            setIsLoading(false);
            setStreamingMessageId(''); // 清除流式消息ID

            // 更新消息状态为错误
            if (currentMessageRef.current) {
              setMessages(prev =>
                prev.map(msg =>
                  msg.id === currentMessageRef.current?.id
                    ? { ...msg, status: 'error', content: msg.content || aiSearchData.unableToReply }
                    : msg
                )
              );
              // 消息完成后调用样式更新函数 - 与 modal-new.tsx 保持一致
              updateFooterStyle();
              updateATagAttr();
            }
          },
          onComplete: () => {
            setIsLoading(false);
            setStreamingMessageId(''); // 清除流式消息ID

            // 更新消息状态为完成
            if (currentMessageRef.current) {
              setMessages(prev =>
                prev.map(msg =>
                  msg.id === currentMessageRef.current?.id
                    ? { ...msg, status: 'complete' }
                    : msg
                )
              );


              // 消息完成后调用样式更新函数 - 与 modal-new.tsx 保持一致
              updateFooterStyle();
              updateATagAttr();
            }
          },
        }
      );
    } catch (error) {
      console.error('Send message error:', error);
      messageApi.error('发送消息失败，请稍后重试');
      setIsLoading(false);
      setStreamingMessageId(''); // 清除流式消息ID

      // 更新消息状态为错误
      if (currentMessageRef.current) {
        setMessages(prev =>
          prev.map(msg =>
            msg.id === currentMessageRef.current?.id
              ? { ...msg, status: 'error' }
              : msg
          )
        );
      }
    }
  }, [isLoading, sessionId, currentGroup, currentPlatform, messageApi, updateFooterStyle, updateATagAttr]);

  const cancelHandle = () => {
    if (streamingMessageId) {
      void cancelRun(streamingMessageId);
    }
    onCloseHandle();
  };

  return (
    <Modal
      title={aiSearchData?.modalTitle}
      open={isModalOpen}
      onCancel={cancelHandle}
      footer={null}
      className={outStyles["ask-ai-dialog"]}
      keyboard={false}
      maskClosable={false}
      rootClassName={outStyles[rootClassName]}
    >
      {contextHolder}
      <ThemeProvider
        appearance={currentTheme}
        theme={{
          token: {
            colorText: "var(--docuo-text-color)",
          },
        }}
      >
        <div className={outStyles["converse-wrap"]}>
          <div className={outStyles["converse-content"]}>
            {/* 消息列表 */}
            <MessageList
              messages={messages}
              currentTheme={currentTheme}
              streamingMessageId={streamingMessageId}
              isLoading={isLoading}
              setMessages={setMessages}
              onRequest={handleSendMessage}
              aiSearchData={aiSearchData}
              currentGroup={currentGroup}
              currentPlatform={currentPlatform}
              currentLanguage={currentLanguage}
              sessionId={sessionId}
            />

            {/* 输入框区域 - 与 modal-new.tsx 结构一致 */}
            <div className={outStyles["custom-input-area"]}>
              <MessageSender
                onSubmit={handleSendMessage}
                loading={isLoading}
                placeholder={
                  screenType === 0
                    ? aiSearchData.inputPlaceholder
                    : screenType === 1
                    ? aiSearchData.inputPlaceholderM1
                    : aiSearchData.inputPlaceholderM2
                }
                onCancel={() => {
                  if (streamingMessageId) {
                    cancelRun(streamingMessageId);
                  }
                  setIsLoading(false);
                  setStreamingMessageId('');
                  if (currentMessageRef.current) {
                    setMessages(prev =>
                      prev.map(msg =>
                        msg.id === currentMessageRef.current?.id
                          ? { ...msg, status: 'complete' }
                          : msg
                      )
                    );
                  }
                }}
              />
              {/* 重置对话按钮 - 复制自 modal-new.tsx */}
              {messages.length ? (
                <div
                  className={outStyles["custom-converse-reset"]}
                  onClick={resetConverse}
                >
                  <ReloadOutlined />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </ThemeProvider>
    </Modal>
  );
};

export default AskAIModal;
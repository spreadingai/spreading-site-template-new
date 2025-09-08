import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Modal, message } from 'antd';
import { ThemeProvider } from 'antd-style';
import MessageList, { Message, Reference, scoreFetch, Question, ScoreType } from './MessageList';
import MessageSender from './MessageSender';
import { sendStreamRequest, parseProductName, parsePlatformName, StreamEvent } from './api';
import { generateSessionId, generateUUID } from './utils';
import { copywriting } from "@/components/constant/language";
import styles from './modal.module.scss';

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

  const currentMessageRef = useRef<Message | null>(null);
  const aiSearchData = copywriting[currentLanguage]?.aiSearch || copywriting.zh?.aiSearch;

  // 每次打开模态框时生成新的session ID
  useEffect(() => {
    if (isModalOpen) {
      setSessionId(generateSessionId());
      setMessages([]);
      setIsLoading(false);
      setStreamingMessageId('');
    }
  }, [isModalOpen]);

  // 自动插入评分记录（仿照 modal-new.tsx 的 autoInsertHandle）
  const autoInsertHandle = useCallback((messageId: string, aiMessage: Message, userQuestion: string) => {
    console.log('autoInsertHandle', messageId, sessionId, currentGroup, currentPlatform);

    // 直接使用传入的参数，避免依赖异步更新的 messages 状态
    if (!aiMessage.customID) return;

    // 构建评分数据
    const questionData: Question = {
      answerID: messageId,
      question: userQuestion,
      score: ScoreType.ZERO, // 初始化为未评分状态
      answer: aiMessage.content,
    };

    // 使用 MessageList 的 scoreFetch 函数
    scoreFetch(currentGroup, currentPlatform, sessionId, [questionData])
      .catch((error) => {
        console.log("auto insert error", error);
      });
  }, [sessionId, currentGroup, currentPlatform]);

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
    // 保存用户问题内容到 currentMessageRef，用于后续的 autoInsertHandle
    (currentMessageRef.current as any).userQuestion = content;
    setStreamingMessageId(aiMessage.id); // 设置当前流式消息ID
    setMessages(prev => [...prev, aiMessage]);

    try {
      await sendStreamRequest(
        {
          message: content,
          product: parseProductName(currentGroup),
          platform: parsePlatformName(currentPlatform),
          session_id: sessionId,
        },
        {
          onEvent: (event: StreamEvent) => {
            // 更新当前AI消息的事件信息
            if (currentMessageRef.current) {
              currentMessageRef.current.eventInfo = {
                eventName: event.event_name,
                toolName: event.tool_name,
                toolArgs: event.tool_args,
                isLoading: event.event_name !== 'ToolCallCompleted',
              };

              // 更新消息列表中的事件信息
              setMessages(prev =>
                prev.map(msg =>
                  msg.id === currentMessageRef.current?.id
                    ? { ...msg, eventInfo: currentMessageRef.current.eventInfo }
                    : msg
                )
              );
            }

            // 处理不同事件
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
            // 累积AI消息内容，而不是覆盖
            if (currentMessageRef.current) {
              // 累积内容
              currentMessageRef.current.content += messageContent;
              setMessages(prev =>
                prev.map(msg =>
                  msg.id === currentMessageRef.current?.id
                    ? { ...msg, content: currentMessageRef.current.content }
                    : msg
                )
              );
            }
          },
          onError: (error: Error) => {
            console.error('Stream request error:', error);
            messageApi.error('请求失败，请稍后重试');
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

              // 自动插入评分记录（仿照 modal-new.tsx）
              autoInsertHandle(
                currentMessageRef.current.id,
                currentMessageRef.current,
                (currentMessageRef.current as any).userQuestion
              );
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
  }, [isLoading, sessionId, currentGroup, currentPlatform, messageApi, autoInsertHandle]);

  const cancelHandle = () => {
    onCloseHandle();
  };

  return (
    <Modal
      title={aiSearchData?.modalTitle || "AI 文档助手"}
      open={isModalOpen}
      onCancel={cancelHandle}
      footer={null}
      className={styles["ask-ai-dialog"]}
      keyboard={false}
      maskClosable={false}
      rootClassName={styles[rootClassName]}
      width="80%"
      style={{ height: '80%', minHeight: '580px', maxWidth: '1000px' }}
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
        <div className={styles.modalContent}>
          {/* 消息列表 */}
          <MessageList
            messages={messages}
            currentTheme={currentTheme}
            streamingMessageId={streamingMessageId}
            isLoading={isLoading}
            setMessages={setMessages}
            onRequest={handleSendMessage}
            sessionId={sessionId}
            currentGroup={currentGroup}
            currentPlatform={currentPlatform}
          />

          {/* 输入框 */}
          <MessageSender
            onSubmit={handleSendMessage}
            loading={isLoading}
            placeholder={aiSearchData?.inputPlaceholder || "您可以询问关于本平台产品的任何问题"}
          />
        </div>
      </ThemeProvider>
    </Modal>
  );
};

export default AskAIModal;
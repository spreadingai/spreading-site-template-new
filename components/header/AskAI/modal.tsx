import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Modal, message } from 'antd';
import { ThemeProvider } from 'antd-style';
import MessageList, { Message } from './MessageList';
import ReferencesFooter, { Reference } from './ReferencesFooter';
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
  const [references, setReferences] = useState<Reference[]>([]);
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
      setReferences([]);
      setIsLoading(false);
      setStreamingMessageId('');
    }
  }, [isModalOpen]);

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
    setReferences([]);

    // 创建AI回复消息
    const aiMessage: Message = {
      id: generateUUID(),
      content: '',
      role: 'assistant',
      timestamp: Date.now(),
    };

    currentMessageRef.current = aiMessage;
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
              // 处理搜索完成事件，添加引用数据
              if (event.data && Array.isArray(event.data)) {
                const newReferences: Reference[] = event.data.map((item: any) => ({
                  title: item.title,
                  url: item.url,
                }));
                setReferences(prev => [...prev, ...newReferences]);
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
          },
          onComplete: () => {
            setIsLoading(false);
            setStreamingMessageId(''); // 清除流式消息ID
          },
        }
      );
    } catch (error) {
      console.error('Send message error:', error);
      messageApi.error('发送消息失败，请稍后重试');
      setIsLoading(false);
      setStreamingMessageId(''); // 清除流式消息ID
    }
  }, [isLoading, sessionId, currentGroup, currentPlatform, messageApi]);

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
          />

          {/* 引用链接 */}
          {references.length > 0 && (
            <ReferencesFooter references={references} />
          )}

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
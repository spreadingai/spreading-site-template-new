import React from 'react';
import { Bubble, BubbleProps } from '@ant-design/x';
import { UserOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import { Markdown } from "@ant-design/pro-editor";
// @ts-ignore
import MarkdownIt from "markdown-it";
import Robot from "@/assets/icons/ai-search/Robot.svg";
import EventStatus from './EventStatus';
import styles from './MessageList.module.scss';

const md = MarkdownIt({ html: true, breaks: true });

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
}

export interface MessageListProps {
  messages: Message[];
  currentTheme: string;
  streamingMessageId?: string; // 当前正在流式输出的消息ID
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  currentTheme,
  streamingMessageId
}) => {
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

import React from 'react';
import { Sender } from '@ant-design/x';
// @ts-ignore
import { SendOutlined } from '@ant-design/icons';
import outStyles from './MessageSender.module.scss';

export interface MessageSenderProps {
  onSubmit: (message: string) => void;
  loading?: boolean;
  placeholder?: string;
  disabled?: boolean;
  onCancel?: () => void;
}

const MessageSender: React.FC<MessageSenderProps> = ({
  onSubmit,
  loading = false,
  placeholder,
  disabled = false,
  onCancel,
}) => {
  const [value, setValue] = React.useState('');

  const handleSubmit = (message: string) => {
    if (message.trim()) {
      onSubmit(message.trim());
      setValue('');
    }
  };

  const handleCancel = () => {
    try {
      onCancel?.();
    } finally {
      setValue('');
    }
  };

  return (
    <Sender
      value={value}
      onSubmit={handleSubmit}
      onChange={setValue}
      loading={loading}
      disabled={disabled}
      onCancel={handleCancel}
      placeholder={placeholder}
      className={outStyles.sender}
      classNames={{
        actions: outStyles.senderActions,
      }}
        actions={(_, info) => {
          const { SendButton, LoadingButton } = info.components;
          if (loading) {
            return <LoadingButton />;
          } else {
            return (
              <SendButton
                icon={<SendOutlined />}
                type="primary"
                size="small"
              />
            );
          }
        }}
      />
  );
};

export default MessageSender;

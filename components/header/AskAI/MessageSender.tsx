import React from 'react';
import { Sender } from '@ant-design/x';
import Image from "next/image";
import outStyles from './MessageSender.module.scss';
import iconSend from '@/assets/images/search/icon_send@2x.png';
import iconSendDark from '@/assets/images/search/icon_send_dark@2x.png';
import iconSendDisabled from '@/assets/images/search/icon_send_disabled@2x.png';
import iconSendDarkDisabled from '@/assets/images/search/icon_send_disabled_dark@2x.png';
import iconSendIng from '@/assets/images/search/icon_send_ing@2x.png';
import iconSendIngDark from '@/assets/images/search/icon_send_ing_dark@2x.png';

export interface MessageSenderProps {
  onSubmit: (message: string) => void;
  loading?: boolean;
  placeholder?: string;
  disabled?: boolean;
  onCancel?: () => void;
  currentTheme?: string;
}

const MessageSender: React.FC<MessageSenderProps> = ({
  onSubmit,
  loading = false,
  placeholder,
  disabled = false,
  onCancel,
  currentTheme = 'light',
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
      className={`${outStyles.sender} ${value? outStyles['sender-ing'] : ''}`}
      classNames={{
        actions: outStyles.senderActions,
      }}
        actions={(_, info) => {
          const { SendButton, LoadingButton } = info.components;
          const isDark = currentTheme === 'dark';
          if (loading) {
            return (
              <LoadingButton
                icon={
                  <Image
                    src={isDark ? iconSendIngDark.src : iconSendIng.src}
                    alt=""
                    width={23}
                    height={23}
                  />
                }
                type="primary"
                size="small"
              />
            );
          } else {
            return (
              <SendButton
                disabled={!value.trim()}
                icon={
                  <Image
                    src={isDark ? !value.trim() ? iconSendDarkDisabled.src : iconSendDark.src : !value.trim() ? iconSendDisabled.src : iconSend.src}
                    alt=""
                    width={28}
                    height={28}
                  />
                }
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

import React from 'react';
import { Space, Spin } from 'antd';
import {
  DatabaseOutlined,
  LoadingOutlined
  // @ts-ignore
} from "@ant-design/icons";
import Image from "next/image";
import iconSearch from '@/assets/images/search/icon_search@2x.png';
import iconSearchDark from '@/assets/images/search/icon_search_dark@2x.png';
import styles from './EventStatus.module.scss';

export interface EventStatusProps {
  eventName: string;
  toolName?: string;
  toolArgs?: any;
  aiSearchData: any;
  currentTheme?: string;
}

const EventStatus: React.FC<EventStatusProps> = ({
  eventName,
  toolName,
  toolArgs,
  aiSearchData,
  currentTheme = 'light',
}) => {
  const isDark = currentTheme === 'dark';
  const searchIcon = (
    <Image
      src={isDark ? iconSearchDark.src : iconSearch.src}
      alt=""
      width={16}
      height={16}
    />
  );

  const getEventDisplay = () => {
    switch (toolName) {
      case 'list_datasets':
        return {
          icon: searchIcon,
          text: aiSearchData.event.list_datasets,
        };
      case 'set_dataset_ids':
        return {
          icon: searchIcon,
          text: aiSearchData.event.set_dataset_ids,
        };
      case 'search_knowledge_base':
        return {
          icon: searchIcon,
          text: `${aiSearchData.event.search}: ${toolArgs?.query || ''}`,
        };
      case 'validate_error_codes':
        return {
          icon: searchIcon,
          text: aiSearchData.event.validate_error_codes,
        };
      default:
        return null;
    }
  };

  const eventDisplay = getEventDisplay();

  if (!eventDisplay) {
    return null;
  }

  return (
    <div className={styles.eventStatus}>
      <Space size="small">
        {eventDisplay.icon}
        <span className={styles.eventText}>{eventDisplay.text}</span>
      </Space>
    </div>
  );
};

export default EventStatus;

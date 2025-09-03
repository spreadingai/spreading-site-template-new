import React from 'react';
import { Space, Spin } from 'antd';
import { 
  DatabaseOutlined, 
  SearchOutlined, 
  LoadingOutlined 
} from '@ant-design/icons';
import styles from './EventStatus.module.scss';

export interface EventStatusProps {
  eventName: string;
  toolName?: string;
  toolArgs?: any;
  isLoading: boolean;
}

const EventStatus: React.FC<EventStatusProps> = ({ 
  eventName, 
  toolName, 
  toolArgs, 
  isLoading 
}) => {
  const getEventDisplay = () => {
    switch (toolName) {
      case 'list_datasets':
        return {
          icon: <DatabaseOutlined />,
          text: '收集知识库列表',
        };
      case 'set_dataset_ids':
        return {
          icon: <DatabaseOutlined />,
          text: '选择相关知识库',
        };
      case 'search_knowledge_base':
        return {
          icon: <SearchOutlined />,
          text: `搜索: ${toolArgs?.query || ''}`,
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
        {isLoading && (
          <Spin 
            indicator={<LoadingOutlined style={{ fontSize: 14 }} spin />} 
            size="small" 
          />
        )}
      </Space>
    </div>
  );
};

export default EventStatus;

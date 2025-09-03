import React from 'react';
import { Space, Typography } from 'antd';
import { LinkOutlined } from '@ant-design/icons';
import styles from './ReferencesFooter.module.scss';

const { Link, Text } = Typography;

export interface Reference {
  title: string;
  url: string;
}

export interface ReferencesFooterProps {
  references: Reference[];
}

const ReferencesFooter: React.FC<ReferencesFooterProps> = ({ references }) => {
  // 去重合并引用数据
  const uniqueReferences = React.useMemo(() => {
    const seen = new Set<string>();
    return references.filter(ref => {
      if (seen.has(ref.url)) {
        return false;
      }
      seen.add(ref.url);
      return true;
    });
  }, [references]);

  if (uniqueReferences.length === 0) {
    return null;
  }

  return (
    <div className={styles.referencesFooter}>
      <div className={styles.header}>
        <Space size="small">
          <LinkOutlined />
          <Text strong>参考来源:</Text>
        </Space>
      </div>
      <div className={styles.referencesList}>
        {uniqueReferences.map((ref, index) => (
          <div key={ref.url} className={styles.referenceItem}>
            <Link 
              href={ref.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.referenceLink}
            >
              {ref.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReferencesFooter;

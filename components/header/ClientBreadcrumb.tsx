import React, { useState, useEffect } from 'react';
import { Breadcrumb } from 'antd';
import { FolderTreeData, TreeDataObject } from '@/lib/types';
import IconBreadcrumbArrow from '@/assets/icons/breadcrumb/arrow.svg';
import { callApi } from '@/lib/client/api';

interface ClientBreadcrumbProps {
  slug: string[];
}

const ClientBreadcrumb: React.FC<ClientBreadcrumbProps> = ({ slug }) => {
  const [folderTreeData, setFolderTreeData] = useState<FolderTreeData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   const fetchTreeData = async () => {
      const result = await callApi<FolderTreeData[]>('/api/folder-tree', {
        method: 'POST',
        body: JSON.stringify({ slug }),
      });

      if (result.success && result.data) {
        setFolderTreeData(result.data);
      } else {
        console.error('Failed to fetch tree data:', result.error);
      }
      
      setLoading(false);
    };

    fetchTreeData();
  }, [slug]);

  const getBreadCrumbData = () => {
    const docID = slug.join("/");
    let result: TreeDataObject[] = [];
    
    const loop = (children: TreeDataObject[], parentNodes: TreeDataObject[]) => {
      for (const element of children) {
        if (element.id === docID) {
          result = parentNodes.concat(element);
          return;
        }
        if (element.children) {
          loop(element.children, parentNodes.concat(element));
        }
      }
    };
    
    loop(folderTreeData as TreeDataObject[], []);
    
    const len = result.length;
    return result.map((item, index) => ({
      title: (
        <span
          className={
            `breadcrumb-label` +
            (index === len - 2
              ? " doc-search-lvl0"
              : ` doc-search-lvl${index + 1}`)
          }
        >
          {item.title}
        </span>
      ),
    }));
  };

  if (loading) {
    return <div className="breadcrumb-loading">Loading...</div>;
  }

  const breadCrumbData = getBreadCrumbData();

  return (
    <Breadcrumb
      items={breadCrumbData}
      separator={<IconBreadcrumbArrow className="breadcrumb-icon m-auto" />}
    />
  );
};

export default ClientBreadcrumb;
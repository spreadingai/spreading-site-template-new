import { FC, useState, useEffect } from "react";
import TreeNode from "./TreeNode";
import classNames from "classnames";
import IconClose from "@/assets/icons/tree/m_navclose.svg";
import LogoGrey from "@/assets/images/logo_grey.png";
import Image from "next/image";
import { DocuoConfig, Plan, FolderTreeData, TreeDataObject, SidebarItemType } from "@/lib/types";
import { eventEmitter } from "@/lib/client/event";
import { callApi } from '@/lib/client/api';

interface TreeProps {
  className?: string;
  docuoConfig: DocuoConfig;
  slug: string[];
  titleRender?: (node: TreeNode) => React.ReactNode;
}

const DocuoTree: FC<TreeProps> = ({
  className,
  docuoConfig,
  slug,
  titleRender,
}) => {
  const [folderTreeData, setFolderTreeData] = useState<FolderTreeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedKeys, setSelectedKeys] = useState([]);

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

  useEffect(() => {
      const docID = slug.join("/");
      const selectedKeys: string[] = [];
      const loop = (children: TreeDataObject[], parentKeys: string[]) => {
        for (const element of children) {
          if (element.id === docID) {
            return element.key;
          }
          if (element.children) {
            const result = loop(element.children, parentKeys.concat(element.key));
            if (result) return result;
          }
        }
      };
      const selectedKey = loop(folderTreeData, []);
      selectedKeys.push(selectedKey);
      setSelectedKeys(selectedKeys);
  }, [folderTreeData, slug]);

  const onSelect = (selectedKeys, node) => {
    if (node.type === SidebarItemType.Doc) {
      eventEmitter.emit('drawer-trigger', false);
    }
  };

  const handleClose = () => {
    eventEmitter.emit('drawer-trigger', false);
  };

  const isHideWaterMark =
    Number(process.env.NEXT_PUBLIC_PLAN) !== Plan.Free &&
    docuoConfig?.themeConfig?.removeWatermark === true;

  if (loading) {
    return (
      <div className={classNames("preview-sider-tree-content", className)}>
        <div className="tree-loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className={classNames("preview-sider-tree-content", className)}>
      <span
        onClick={handleClose}
        className="w-6 absolute right-5 top-2 cursor-pointer z-10 preview-side-close-btn"
      >
        <IconClose />
      </span>
      {folderTreeData.map((node, index) => (
        <TreeNode
          key={index}
          node={node}
          showLines={true}
          selectedKeys={selectedKeys}
          onSelect={onSelect}
          titleRender={titleRender}
          defaultExpandAll={!node.collapsed}
        />
      ))}
      {!isHideWaterMark && (
        <div className="powered-by">
          <span>Powered By</span>
          <a href="https://www.spreading.ai/" target="_blank">
            <Image src={LogoGrey} alt={"spreading"} />
          </a>
        </div>
      )}
    </div>
  );
};

export default DocuoTree;

import { FC, useState } from "react";
import TreeNode from "./node";

interface TreeProps {
  data: TreeNode[];
  selectedKeys?: string[];
  onSelect?: (selectedKeys: string[], node: TreeNode) => void;
  titleRender?: (node: TreeNode) => React.ReactNode;
}

const DocuoTree: FC<TreeProps> = ({
  data = [],
  selectedKeys,
  titleRender,
  onSelect,
}) => {
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

  const onExpand = (expandedKeys) => {
    setExpandedKeys(expandedKeys);
  };
  return (
    <div className="pt-[28px] pb-10 pl-8 pr-6">
      {data.map((node, index) => (
        <TreeNode
          key={index}
          node={node}
          showLines={true}
          selectedKeys={selectedKeys || expandedKeys}
          onSelect={onSelect || onExpand}
          titleRender={titleRender}
        />
      ))}
    </div>
  );
};

export default DocuoTree;

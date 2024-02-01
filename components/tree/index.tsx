import { FC, useState } from "react";
import TreeNode from "./TreeNode";
import classNames from "classnames";

interface TreeProps {
  className?: string;
  data: TreeNode[];
  selectedKeys?: string[];
  onSelect?: (selectedKeys: string[], node: TreeNode) => void;
  titleRender?: (node: TreeNode) => React.ReactNode;
  defaultExpandAll?: boolean;
}

const DocuoTree: FC<TreeProps> = ({
  className,
  data = [],
  selectedKeys,
  titleRender,
  onSelect,
  defaultExpandAll = false,
}) => {
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

  const onExpand = (expandedKeys) => {
    setExpandedKeys(expandedKeys);
  };
  return (
    <div className={classNames("pt-[28px] pb-10 pl-8 pr-6", className)}>
      {data.map((node, index) => (
        <TreeNode
          key={index}
          node={node}
          showLines={true}
          selectedKeys={selectedKeys || expandedKeys}
          onSelect={onSelect || onExpand}
          titleRender={titleRender}
          defaultExpandAll={defaultExpandAll}
        />
      ))}
    </div>
  );
};

export default DocuoTree;

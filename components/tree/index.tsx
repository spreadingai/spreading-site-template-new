import { FC, useState } from "react";
import TreeNode from "./TreeNode";
import classNames from "classnames";
import IconClose from "@/assets/icons/tree/m_navclose.svg";

interface TreeProps {
  className?: string;
  data: TreeNode[];
  selectedKeys?: string[];
  onSelect?: (selectedKeys: string[], node: TreeNode) => void;
  titleRender?: (node: TreeNode) => React.ReactNode;
  defaultExpandAll?: boolean;
  setDrawerOpen: (value: boolean) => void;
}

const DocuoTree: FC<TreeProps> = ({
  className,
  data = [],
  selectedKeys,
  titleRender,
  onSelect,
  defaultExpandAll = false,
  setDrawerOpen,
}) => {
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

  const onExpand = (expandedKeys) => {
    setExpandedKeys(expandedKeys);
  };
  const handleClose = () => {
    console.log("1");
    setDrawerOpen(false);
  };
  return (
    <div className={classNames("pt-[28px] pb-10 pl-8 pr-6", className)}>
      <span
        onClick={handleClose}
        className="w-6 absolute right-5 top-5 cursor-pointer z-10 preview-side-close-btn"
      >
        <IconClose />
      </span>
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

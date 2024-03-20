import styles from "./TreeNode.module.scss";
import classNames from "classnames";
import { FC, useEffect, useState } from "react";
import IconTreeArrow from "@/assets/icons/tree/sidebar_arrow_open.svg";
import { SidebarItemType } from "@/lib/types";

interface TreeNode {
  key: string;
  type: SidebarItemType;
  title: string;
  children?: TreeNode[];
  isOpen?: boolean;
}
interface TreeNodeProps {
  node: TreeNode;
  showLines?: boolean;
  level?: number;
  selectedKeys?: string[];
  defaultExpandAll?: boolean;
  onSelect?: (selectedKeys: string[], node: TreeNode) => void;
  titleRender?: (node: TreeNode) => React.ReactNode;
  onExpand?: () => void;
}

const TreeNode: FC<TreeNodeProps> = ({
  node,
  showLines,
  level = 0,
  selectedKeys,
  defaultExpandAll = false,
  onSelect,
  titleRender,
  onExpand,
}) => {
  const hasChildren = node.children && node.children.length > 0;

  const [isOpen, setIsOpen] = useState(
    level !== 0 ? (defaultExpandAll ? defaultExpandAll : !!node.isOpen) : true
  );

  useEffect(() => {
    node.children?.forEach((child) => {
      if (selectedKeys?.includes(child.key)) {
        setIsOpen(true);
        onExpand && onExpand();
      }
    });
  }, [node.children, node.key, onExpand, selectedKeys]);

  const toggleNode = () => {
    if (hasChildren && level !== 0) {
      setIsOpen(!isOpen);
    }

    if (onSelect && !hasChildren) {
      onSelect([node.key], node);
    }
  };
  return (
    <div
      className={classNames({
        "mb-7": level == 0,
        relative: showLines,
      })}
    >
      <div
        className={classNames("text-sm flex items-center", {
          "mb-2.5": level === 0,
          "mb-2 cursor-pointer": level > 0,
        })}
        onClick={level > 0 ? toggleNode : undefined}
      >
        <span
          className={classNames(styles.treeNodeLabel, {
            [styles.isLevel0]: level === 0,
            [styles.active]: selectedKeys?.includes(node.key),
            [styles.islink]: node.type === SidebarItemType.Doc || node.type === SidebarItemType.Link
          })}
        >
          <span>{titleRender ? titleRender(node) : node.title}</span>
        </span>

        {hasChildren && level > 0 ? (
          <span
            className={classNames("duration-200 ml-1.5", styles.treeNodeIcon, {
              "rotate-90": isOpen,
            })}
          >
            <IconTreeArrow
              style={{
                fontSize: "18px",
              }}
            />
          </span>
        ) : (
          ""
        )}
      </div>
      {hasChildren && (
        <div
          className={classNames("mt-2.5", {
            "ml-4": level > 0,
            hidden: !isOpen,
            [styles.childrenBorderLeft]: showLines,
          })}
        >
          {node.children.map((child, index) => (
            <TreeNode
              key={index}
              node={child}
              showLines={showLines}
              level={level + 1}
              selectedKeys={selectedKeys}
              defaultExpandAll={defaultExpandAll}
              onSelect={onSelect}
              titleRender={titleRender}
              onExpand={() => {
                setIsOpen(true);
                onExpand && onExpand();
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;

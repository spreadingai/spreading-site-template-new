import classNames from "classnames";
import { FC, useState } from "react";
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
}

const TreeNode: FC<TreeNodeProps> = ({
  node,
  showLines,
  level = 0,
  selectedKeys,
  defaultExpandAll = false,
  onSelect,
  titleRender,
}) => {
  const hasChildren = node.children && node.children.length > 0;

  const [isOpen, setIsOpen] = useState(
    level !== 0 ? (defaultExpandAll ? defaultExpandAll : !!node.isOpen) : true
  );

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
          "mb-2": level > 0,
        })}
      >
        <span
          className={classNames({
            "hover:text-sidebar-hover hover:border-l-2 hover:border-s-sidebar-hover hover:-translate-x-[2px]":
              node.type === SidebarItemType.Doc ||
              node.type === SidebarItemType.Link,
            "pl-[14px] text-opacity-90": level > 0,
            "font-inter-bold font-semibold text-sidebar-primary": level === 0,
            "text-sidebar-secondary":
              !selectedKeys?.includes(node.key) && level > 0,
            "font-inter-bold font-semibold border-l-2 border-s-sidebar-active text-sidebar-active -translate-x-[2px]":
              selectedKeys?.includes(node.key),
          })}
        >
          <span
            className={classNames({ "cursor-pointer": level > 0 })}
            onClick={level > 0 ? toggleNode : undefined}
          >
            {titleRender ? titleRender(node) : node.title}
          </span>
        </span>

        {hasChildren && level > 0 ? (
          <span
            className={classNames("duration-200 ml-1.5", {
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
            "border-l-2 border-s-sidebar-default": showLines,
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
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;

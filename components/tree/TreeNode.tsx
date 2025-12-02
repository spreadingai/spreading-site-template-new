import styles from "./TreeNode.module.scss";
import classNames from "classnames";
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import IconTreeArrow from "@/assets/icons/tree/sidebar_arrow_open.svg";
import { SidebarItemType } from "@/lib/types";
import SidebarTag from "./SidebarTag";

interface TreeNode {
  key: string;
  type: SidebarItemType;
  title: string;
  children?: TreeNode[];
  isOpen?: boolean;
  collapsed?: boolean;
  tag?: {
    label: string;
    color: string;
  };
  id?: string;
  link?: string;
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
  const router = useRouter();
  const hasChildren = node.children && node.children.length > 0;

  const [isOpen, setIsOpen] = useState(
    // level !== 0 ? (defaultExpandAll ? defaultExpandAll : !!node.isOpen) : true
    !!defaultExpandAll || !!node.isOpen
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
    // if (hasChildren && level !== 0) {
    if (hasChildren) {
      setIsOpen(!isOpen);
    }

    if (onSelect && !hasChildren) {
      onSelect([node.key], node);
    }

    // 叶子节点整行点击：触发导航
    if (!hasChildren) {
      if (node.type === SidebarItemType.Doc && node.id) {
        router.push(node.id);
        return;
      }
      if (node.type === SidebarItemType.Link && node.link) {
        const href = node.link;
        if (href.startsWith("http")) {
          window.open(href, "_blank");
        } else {
          // const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
          // 这里是以 "/" 开头的绝对 slug 路径，nextjs 已经自动加上 basePath
          const basePath = "";
          router.push(`${basePath}${href}`);
        }
        return;
      }
    }
  };
  return (
    <div
      className={classNames("tree-node-wrapper", {
        [styles.level0]: level == 0,
        relative: showLines,
      })}
    >
      <div
        className={classNames(
          // `${styles.treeNodeContainer} text-sm flex items-center tree-node-container`,
          `${styles.treeNodeContainer} text-sm flex items-center tree-node-container cursor-pointer`,
          {
            "mb-2.5": level === 0,
            "mb-2 cursor-pointer": level > 0,
            "hover:opacity-70": level > 0 && hasChildren,
          }
        )}
        // onClick={level > 0 ? toggleNode : undefined}
        onClick={toggleNode}
      >
        <span
          className={classNames(`${styles.treeNodeLabel} tree-node-label`, {
            [styles.isLevel0]: level === 0,
            [styles.active]: selectedKeys?.includes(node.key),
            active: selectedKeys?.includes(node.key),
            [styles.islink]:
              node.type === SidebarItemType.Doc ||
              node.type === SidebarItemType.Link,
          })}
        >
          <div className={styles.treeNodeContent}>
            {node.tag && (
              <SidebarTag
                label={node.tag.label}
                color={
                  node.tag.color as
                    | "Check"
                    | "Tip"
                    | "Note"
                    | "Warning"
                    | "Error"
                }
                className={styles.sidebarTag}
              />
            )}
            <span className={styles.titleText}>
              {titleRender ? titleRender(node) : node.title}
            </span>
          </div>
        </span>

        {/* {hasChildren && level > 0 ? ( */}
        {hasChildren ? (
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
          className={classNames("mt-2.5 tree-node-children-wrapper", {
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
              // defaultExpandAll={defaultExpandAll}
              defaultExpandAll={!child.collapsed}
              onSelect={onSelect}
              titleRender={titleRender}
              // onExpand={() => {
              //   setIsOpen(true);
              //   onExpand && onExpand();
              // }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;

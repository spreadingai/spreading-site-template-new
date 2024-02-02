import classNames from "classnames";
import {
  FC,
  MouseEvent,
  MouseEventHandler,
  useContext,
  useEffect,
} from "react";
import IconTreeArrow from "@/assets/icons/tree/sidebar_arrow_open.svg";
import { SidebarItemType } from "@/lib/types";
import AnchorContext from "./context";

interface AnchorNode {
  key: string;
  title: string;
  href: string;
  children?: AnchorNode[];
}
export interface AnchorNodeProps {
  node: AnchorNode;
  showLines?: boolean;
  level?: number;
  onClick?: (
    selectedKeys: string[],
    node: AnchorNode & {
      event?: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>;
    }
  ) => void;
}

const AnchorNode: FC<AnchorNodeProps> = ({
  node,
  showLines,
  level = 0,
  onClick,
}) => {
  const { unregisterLink, registerLink, activeLink, scrollTo } =
    useContext(AnchorContext);

  const hasChildren = node.children && node.children.length > 0;

  useEffect(() => {
    registerLink(node.href);
    return () => {
      unregisterLink(node.href);
    };
  }, [node.href]);

  const toggleNode: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    scrollTo?.(node.href);
    if (onClick) {
      onClick([node.key], { ...node, event: e });
    }
  };

  return (
    <div
      className={classNames({
        "mb-1 last:mb-0": level !== 0,
      })}
    >
      <div className={classNames("text-sm flex items-center")}>
        <span
          className={classNames({
            "hover:border-l-2 hover:border-s-sidebar-hover hover:-translate-x-[2px]":
              level !== 0,
            "border-l-2 border-s-sidebar-active  -translate-x-[2px]":
              activeLink === node.href && level !== 0,
          })}
        >
          <a
            href={node.href}
            className={classNames(
              "cursor-pointer block",
              "text-opacity-80",
              "hover:text-sidebar-hover",
              {
                "pl-[14px]": level !== 0,
                "font-inter-bold font-semibold text-sidebar-active":
                  activeLink === node.href,
              }
            )}
            onClick={toggleNode}
          >
            {node.title}
          </a>
        </span>
      </div>
      {hasChildren && (
        <div
          className={classNames(" mt-1", {
            "ml-4": level !== 0,
            "border-l-2 border-s-sidebar-default": true,
          })}
        >
          {node.children.map((child, index) => (
            <AnchorNode
              key={index}
              node={child}
              level={level + 1}
              showLines={showLines}
              onClick={onClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AnchorNode;

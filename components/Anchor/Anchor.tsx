import classNames from "classnames";
import React, {
  FC,
  MouseEvent,
  MouseEventHandler,
  useContext,
  useEffect,
} from "react";
import IconTreeArrow from "@/assets/icons/tree/sidebar_arrow_open.svg";
import { SidebarItemType } from "@/lib/types";
import AnchorContext from "./context";
import { useMediaQuery } from "usehooks-ts";

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

  const [isMobile, setIsMobile] = React.useState(false);
  const isShowMobile = useMediaQuery(`(max-width: 1280px)`);

  useEffect(() => {
    registerLink(node.href);
    return () => {
      unregisterLink(node.href);
    };
  }, [node.href]);

  useEffect(() => {
    setIsMobile(isShowMobile);
  }, [isShowMobile]);

  const toggleNode: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    scrollTo?.(node.href);
    if (onClick) {
      onClick([node.key], { ...node, event: e });
    }
  };

  return (
    <div className={isMobile ? "mb-2.5 last:mb-0" : "mb-1 last:mb-0"}>
      <div
        className={`flex items-center font-inter-regular`}
        style={
          isMobile
            ? { fontSize: 16, lineHeight: "28px", marginBottom: 10 }
            : { fontSize: 13, lineHeight: "22px" }
        }
      >
        <span
          className={classNames({
            "text-secondary/80 hover:border-l hover:border-s-sidebar-hover hover:-translate-x-[1px]":
              level !== 0,
            "border-l border-s-sidebar-active  -translate-x-[1px]":
              activeLink === node.href && level !== 0,
            "active:text-sidebar-active": level !== 0,
            "text-secondary/80": level === 0,
          })}
        >
          <a
            href={node.href}
            className={classNames(
              "cursor-pointer block",
              "hover:text-sidebar-hover",
              "active:text-sidebar-active",

              "font-inter-regular",
              {
                "pl-[13px]": level !== 0,
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
            "border-l border-s-sidebar-default": true,
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

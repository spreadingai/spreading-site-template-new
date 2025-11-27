import styles from "./Anchor.module.scss";
import classNames from "classnames";
import React, {
  FC,
  MouseEvent,
  MouseEventHandler,
  useContext,
  useEffect,
} from "react";
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

    if (!node.href || !node.href.startsWith("#")) {
      return;
    }

    const targetId = node.href.substring(1);
    const targetElement = document.getElementById(targetId);

    if (!targetElement) {
      // 如果找不到目标元素，使用原来的滚动方式
      scrollTo?.(node.href);
      return;
    }

    // 检查目标元素是否在隐藏的Accordion或Tab中
    const isInHiddenAccordion = targetElement.closest(".contentCollapsed");
    const isInHiddenTab = targetElement.closest(".tabPaneHidden");

    if (isInHiddenAccordion || isInHiddenTab) {
      // 目标在隐藏组件中，让组件自己处理展开和滚动
      // 只更新URL，不执行滚动（组件会监听URL变化并处理）
    } else {
      // 目标元素可见，直接跳转（无动画）
      targetElement.scrollIntoView({
        behavior: "auto",
        block: "start",
      });
    }

    // 更新浏览器地址栏，触发hashchange事件让组件处理
    if (typeof window !== "undefined") {
      // 使用pushState更新URL，然后手动触发hashchange事件
      window.history.pushState(null, "", node.href);

      // 手动触发hashchange事件，让Accordion/Tabs组件处理
      const hashChangeEvent = new HashChangeEvent("hashchange", {
        oldURL: window.location.href,
        newURL: window.location.href,
      });
      window.dispatchEvent(hashChangeEvent);
    }

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
            ? // ? { fontSize: 16, lineHeight: "28px", marginBottom: 10 }
              { fontSize: 13, lineHeight: "22px" }
            : { fontSize: 13, lineHeight: "22px" }
        }
      >
        <span
          className={classNames(styles.anchorText, "overflow-hidden", {
            [styles.active]: activeLink === node.href,
            [styles.gt0Level]: level !== 0,
          })}
        >
          <a
            href={node.href}
            className={classNames(
              "cursor-pointer block truncate",
              "font-inter-regular",
              {
                "pl-[13px]": level !== 0,
                "font-inter-bold font-semibold": activeLink === node.href,
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
          className={classNames(" mt-1", styles.anchorChildrenWrap, {
            "ml-4": level !== 0,
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

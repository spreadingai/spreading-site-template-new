import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import AnchorNode, { AnchorNodeProps } from "./Anchor";
import classNames from "classnames";
import scrollTo, {
  getOffsetTop,
  getDefaultTarget,
  sharpMatcherRegex,
  getScroll,
} from "./utils";
import AnchorContext from "./context";
import { throttle } from "lodash-es";
import useTab from "@/components/hooks/useTab";

const headerHeight = 68;
const subHeaderHeight = 55;
interface TreeProps {
  className?: string;
  targetOffset?: number;
  offsetTop?: number;
  data: AnchorNode[];
  onSelect?: AnchorNodeProps["onClick"];
}

interface Section {
  link: string;
  top: number;
}

const DocuoAnchor: FC<TreeProps> = ({
  className,
  data = [],
  targetOffset,
  offsetTop,
  onSelect,
}) => {
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [links, setLinks] = useState<string[]>([]);
  const [activeLink, setActiveLink] = useState<string>();
  const activeLinkRef = useRef<string | null>(activeLink);
  const wrapperRef = useRef<HTMLElement | null>(null);
  const { shouldShowTabs, displayTabs } = useTab();

  const onExpand = (expandedKeys) => {
    setExpandedKeys(expandedKeys);
  };
  const animating = useRef(false);
  const setCurrentActiveLink = useCallback((link: string) => {
    if (activeLinkRef.current === link) {
      return;
    }

    const newLink = link;
    setActiveLink(newLink);
    activeLinkRef.current = newLink;
  }, []);
  const handleScroll = useCallback(
    throttle(() => {
      if (animating.current) {
        return;
      }
      const getInternalCurrentAnchor = (
        _links: string[],
        _offsetTop = 0,
        _bounds = 5
      ): string => {
        const linkSections: Section[] = [];
        const container = getDefaultTarget();

        const isElementVisibleForTOC = (element: HTMLElement): boolean => {
          if (!element) return false;
          // 过滤隐藏的 Tab 面板中的标题
          const inHiddenTab = element.closest('.tabPaneHidden');
          if (inHiddenTab) return false;
          // display/visibility 基本判断
          const style = window.getComputedStyle(element);
          if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
            return false;
          }
          // 继续检查父容器
          let parent = element.parentElement;
          while (parent) {
            const ps = window.getComputedStyle(parent);
            if (ps.display === 'none' || ps.visibility === 'hidden' || ps.opacity === '0') {
              return false;
            }
            if (parent.classList.contains('tabPaneHidden') || parent.className.includes('tabPaneHidden')) {
              return false;
            }
            parent = parent.parentElement;
          }
          return true;
        };

        _links.forEach((link) => {
          const sharpLinkMatch = sharpMatcherRegex.exec(link?.toString());
          if (!sharpLinkMatch) {
            return;
          }
          const target = document.getElementById(sharpLinkMatch[1]);
          if (target && isElementVisibleForTOC(target)) {
            const top = getOffsetTop(target, container);
            if (top < _offsetTop + _bounds) {
              linkSections.push({ link, top });
            }
          }
        });

        if (linkSections.length) {
          const maxSection = linkSections.reduce((prev, curr) =>
            curr.top > prev.top ? curr : prev
          );
          return maxSection.link || linkSections[0].link;
        }
        return "";
      };

      const currentActiveLink = getInternalCurrentAnchor(
        links,
        headerHeight + ((!shouldShowTabs || displayTabs.length <= 1) ? 0 : subHeaderHeight)
      );
      if (currentActiveLink) {
        setCurrentActiveLink(currentActiveLink);
        scrollIntoViewIfNeeded(currentActiveLink);
      }
    }, 200),
    [links, setCurrentActiveLink]
  );

  const scrollIntoViewIfNeeded = (currentActiveLink) => {
    const pcAnchorContainer = document.querySelector(".article-anchor-right");
    const wrapper = wrapperRef.current;
    // 移动端直接 return
    if (!pcAnchorContainer.contains(wrapper)) return;
    const scrollContainer = wrapper?.parentElement;
    if (!scrollContainer) return;
    const anchor: HTMLElement = wrapper.querySelector(`a[href="${currentActiveLink}"]`);
    if (!anchor) return;
    const { top: visibleTop, bottom: visibleBottom, height } = scrollContainer.getBoundingClientRect();
    const { top: anchorTop, bottom: anchorBottom } = anchor.getBoundingClientRect();
    if (
      (anchorTop > visibleTop && anchorTop < visibleBottom) ||
      (anchorBottom > visibleTop && anchorBottom < visibleBottom)
    ) {
      return;
    }
    scrollContainer.scrollTo(0, anchor.offsetTop - height / 2);
  }

  useEffect(() => {
    const scrollContainer = getDefaultTarget();
    handleScroll();
    scrollContainer?.addEventListener("scroll", handleScroll);
    return () => {
      scrollContainer?.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);
  const registerLink = useCallback(
    (link) => {
      if (!links.includes(link)) {
        setLinks((prev) => [...prev, link]);
      }
    },
    [links]
  );

  const handleScrollTo = useCallback<(link: string) => void>(
    (link) => {
      setCurrentActiveLink(link);
      const sharpLinkMatch = sharpMatcherRegex.exec(link);
      if (!sharpLinkMatch) {
        return;
      }
      const targetElement = document.getElementById(sharpLinkMatch[1]);
      if (!targetElement) {
        return;
      }

      const container = getDefaultTarget();
      const scrollTop = getScroll(container, true);
      const eleOffsetTop = getOffsetTop(targetElement, container);
      let y = scrollTop + eleOffsetTop;
      y -= targetOffset !== undefined ? targetOffset : offsetTop || 0;
      animating.current = true;
      scrollTo(y, {
        // @ts-ignore
        // getContainer: getDefaultTarget(),
        callback() {
          animating.current = false;
        },
      });
    },
    [setCurrentActiveLink, targetOffset, offsetTop]
  );

  const unregisterLink = useCallback(
    (link) => {
      if (links.includes(link)) {
        setLinks((prev) => prev.filter((i) => i !== link));
      }
    },
    [links]
  );
  const memoizedContextValue = useMemo(
    () => ({
      registerLink,
      unregisterLink,
      scrollTo: handleScrollTo,
      activeLink,
      setActiveLink: setCurrentActiveLink,
      // onClick,
    }),
    [activeLink, handleScrollTo, registerLink, unregisterLink, setCurrentActiveLink]
    //activeLink, onClick, handleScrollTo, anchorDirection
  );

  return (
    <AnchorContext.Provider value={memoizedContextValue}>
      <div ref={(el: any) => (wrapperRef.current = el)} className={classNames(className)}>
        {data.map((node, index) => (
          <AnchorNode key={index} node={node} onClick={onSelect || onExpand} />
        ))}
      </div>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.DocuoAnchorApi = ${JSON.stringify({})};`
        }}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.DocuoAnchorApi = Object.assign(window.DocuoAnchorApi || {}, { setActiveLink: ${setCurrentActiveLink.toString()} });`
        }}
      />
    </AnchorContext.Provider>
  );
};

export default DocuoAnchor;

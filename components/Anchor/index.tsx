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
        _links.forEach((link) => {
          const sharpLinkMatch = sharpMatcherRegex.exec(link?.toString());
          if (!sharpLinkMatch) {
            return;
          }
          const target = document.getElementById(sharpLinkMatch[1]);
          if (target) {
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

      const currentActiveLink = getInternalCurrentAnchor(links, 68);
      setCurrentActiveLink(currentActiveLink);
    }, 200),
    [links, setCurrentActiveLink]
  );

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
      // onClick,
    }),
    [activeLink, handleScrollTo, registerLink, unregisterLink]
    //activeLink, onClick, handleScrollTo, anchorDirection
  );

  return (
    <AnchorContext.Provider value={memoizedContextValue}>
      <div className={classNames(className)}>
        {data.map((node, index) => (
          <AnchorNode key={index} node={node} onClick={onSelect || onExpand} />
        ))}
      </div>
    </AnchorContext.Provider>
  );
};

export default DocuoAnchor;

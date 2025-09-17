import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import styles from "./index.module.scss";

interface Props {
  children?: React.ReactNode;
  // Tabs 级别的标题尺寸，传给内部 Tab 作为默认值
  titleSize?: "p" | "h2" | "h3" | "h4" | "h5";
}

interface TabItem {
  key: string;
  label: string;
  // Tab 自己的标题尺寸（优先级高于父级）
  titleSize?: "p" | "h2" | "h3" | "h4" | "h5";
  children: React.ReactNode;
}

export const DocuoTabs = (props: Props) => {
  const { children, titleSize } = props;
  const [activeKey, setActiveKey] = useState<string>("0");
  const [items, setItems] = useState<TabItem[]>([]);
  const tabListRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  // 防止锚点跳转处理重入导致抖动
  const navigatingRef = useRef(false);
  // 确保仅在首次挂载时处理一次初始 hash
  const initialHashHandledRef = useRef(false);

  const finalTitleSize = (titleSize || "p") as Props["titleSize"];

  // 解析 children 生成 tab items
  useEffect(() => {
    const tabItems: TabItem[] = [];

    if (children) {
      let temp: any[] = Array.isArray(children) ? (children as any[]) : [children];
      temp.forEach((element: any, index: number) => {
        // 更可靠的组件类型检测：检查组件的displayName、name或者props.title的存在
        const isTabComponent =
          element?.type?.displayName === "DocuoTab" ||
          element?.type?.name === "DocuoTab" ||
          element?.type?.name === "th" ||
          element?.type?.name === "tf" ||
          // 如果有title属性，也认为是Tab组件
          (element?.props && element.props.title !== undefined);

        if (isTabComponent) {
          const style = element?.props?.style;
          const visible = !style || !style.display || style.display !== "none";
          if (visible) {
            tabItems.push({
              key: index.toString(),
              label: element.props?.title,
              titleSize: element.props?.titleSize,
              children: element.props?.children,
            });
          }
        }
      });
    }

    setItems(tabItems);

    // 初始化时触发TOC更新，确保能扫描到Tab内容
    const timer = setTimeout(() => {
      if (typeof document !== 'undefined') {
        document.dispatchEvent(new CustomEvent('toc-update'));
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [children]);

  // 使用useLayoutEffect在DOM布局完成后触发TOC更新
  useLayoutEffect(() => {
    // 在DOM布局完成后立即触发TOC更新
    if (typeof document !== 'undefined' && typeof window !== 'undefined') {
      document.dispatchEvent(new CustomEvent('toc-update'));
    }
  }, [items, activeKey]);

  // 检测是否需要显示箭头
  const checkArrowsVisibility = () => {
    if (tabListRef.current) {
      const { scrollLeft, scrollWidth, offsetWidth } = tabListRef.current;

      // 左箭头：当有向左滚动的内容时显示
      setShowLeftArrow(scrollLeft > 0);

      // 右箭头：当有向右滚动的内容时显示
      setShowRightArrow(scrollLeft + offsetWidth < scrollWidth);
    }
  };

  // 监听滚动事件和窗口大小变化
  useEffect(() => {
    // 初始检查
    checkArrowsVisibility();

    const tabListElement = tabListRef.current;

    // 监听窗口大小变化
    const resizeObserver = new ResizeObserver(checkArrowsVisibility);
    if (tabListElement) {
      resizeObserver.observe(tabListElement);
      // 监听滚动事件
      tabListElement.addEventListener('scroll', checkArrowsVisibility);
    }

    return () => {
      resizeObserver.disconnect();
      if (tabListElement) {
        tabListElement.removeEventListener('scroll', checkArrowsVisibility);
      }
    };
  }, [items]);

  // 监听 URL 变化和锚点跳转
  useEffect(() => {
    // 检查初始 URL 的锚点（仅处理一次）
    if (!initialHashHandledRef.current && window.location.hash) {
      initialHashHandledRef.current = true;
      handleAnchorNavigation(window.location.hash);
    }

    // 监听锚点变化（同页面跳转）
    const handleHashChange = () => {
      if (!window.location.hash) return;
      // 若用户主动点击了 Tab 导航（非 TOC），允许切换，不要被hash强行拉回
      if (navigatingRef.current) return; // 仍在导航过程
      handleAnchorNavigation(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);

    // 监听页面内锚点链接点击
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === 'A' && target.hash) {
        // 延迟处理，确保 URL 已更新
        setTimeout(() => {
          handleAnchorNavigation(target.hash);
        }, 0);
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      document.removeEventListener('click', handleAnchorClick);
    };
  }, [items, activeKey]); // 添加activeKey依赖

  // 箭头点击处理函数
  const handleLeftClick = () => {
    if (tabListRef.current) {
      tabListRef.current.scrollLeft -= 120;
      // 滚动后重新检查箭头显示状态
      setTimeout(checkArrowsVisibility, 100);
    }
  };

  const handleRightClick = () => {
    if (tabListRef.current) {
      tabListRef.current.scrollLeft += 120;
      // 滚动后重新检查箭头显示状态
      setTimeout(checkArrowsVisibility, 100);
    }
  };

  // 检查元素是否真正可见（不被隐藏）
  const isElementVisible = (element: HTMLElement): boolean => {
    if (!element) return false;

    // 检查元素本身的样式
    const style = window.getComputedStyle(element);
    if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
      return false;
    }

    // 检查父容器是否可见（检查Tab容器）
    let parent = element.parentElement;
    while (parent) {
      const parentStyle = window.getComputedStyle(parent);
      if (parentStyle.display === 'none' || parentStyle.visibility === 'hidden' || parentStyle.opacity === '0') {
        return false;
      }
      // 如果找到了tabPane容器，检查是否是活跃状态
      if (parent.classList.contains('tabPane') || parent.className.includes('tabPane')) {
        return !parent.classList.contains('tabPaneHidden') && !parent.className.includes('tabPaneHidden');
      }
      parent = parent.parentElement;
    }

    return true;
  };

  const generateId = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\u4e00-\u9fa5\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  };

  const renderTitle = (title?: string, tabTitleSize?: TabItem["titleSize"]) => {
    if (!title) return null;
    const size = (tabTitleSize as any) || finalTitleSize;

    if (size === 'p') {
      // 不需要在 TOC 中出现时，直接不渲染标题节点
      return null;
    }

    const id = generateId(title);
    switch (size) {
      case 'h2':
        return <h2 id={id} className={styles.visuallyHidden}>{title}</h2>;
      case 'h3':
        return <h3 id={id} className={styles.visuallyHidden}>{title}</h3>;
      case 'h4':
        return <h4 id={id} className={styles.visuallyHidden}>{title}</h4>;
      case 'h5':
        return <h5 id={id} className={styles.visuallyHidden}>{title}</h5>;
      default:
        return null;
    }
  };

  // 处理锚点跳转
  const handleAnchorNavigation = (hash: string) => {
    if (!hash) return;

    let targetId = hash.substring(1);
    // 解码 URL 编码的字符
    try {
      targetId = decodeURIComponent(targetId);
    } catch (e) {
      // 如果解码失败，使用原始值
    }

    // 防抖：在一个导航流程内，不允许重复进入，避免抖动
    if (navigatingRef.current) return;
    navigatingRef.current = true;

    // 首先检查当前Tab中是否存在目标元素且可见
    const currentElement = document.getElementById(targetId);
    if (currentElement && isElementVisible(currentElement)) {
      currentElement.scrollIntoView({ behavior: 'auto' });
      // 导航完成，解除锁
      setTimeout(() => { navigatingRef.current = false; }, 100);
      return;
    }

    // 如果当前Tab中没有找到可见元素，依次检查每个Tab
    const findAndScrollToAnchor = (tabIndex: number) => {
      if (tabIndex >= items.length) {
        // 完全找不到目标，解除锁
        navigatingRef.current = false;
        return;
      }

      const item = items[tabIndex];
      setActiveKey(item.key);

      setTimeout(() => {
        const targetElement = document.getElementById(targetId);
        if (targetElement && isElementVisible(targetElement)) {
          targetElement.scrollIntoView({ behavior: 'auto' });
          // 导航完成，解除锁
          setTimeout(() => { navigatingRef.current = false; }, 100);
        } else {
          // 如果在当前Tab中没找到可见元素，检查下一个Tab
          findAndScrollToAnchor(tabIndex + 1);
        }
      }, 300);
    };

    // 从第一个Tab开始查找（如果当前不是第一个Tab）
    const startIndex = activeKey === "0" ? 1 : 0;
    findAndScrollToAnchor(startIndex);
  };

  const handleTabClick = (key: string) => {
    setActiveKey(key);

    // 切换Tab后触发TOC更新，延迟确保内容已更新
    setTimeout(() => {
      if (typeof document !== 'undefined') {
        document.dispatchEvent(new CustomEvent('toc-update'));
        // 同步告知 TOC 指向当前Tab下第一个可见heading，避免高亮还停留在其它Tab
        try {
          const anchorApi = (window as any).DocuoAnchorApi;
          if (anchorApi?.setActiveLink) {
            // 找到当前Tab面板内首个标题元素
            const pane = document.querySelector(`.${styles.tabPane}.${styles.tabPaneActive}`) as HTMLElement;
            const heading = pane?.querySelector('h1,h2,h3,h4,h5,h6');
            if (heading?.id) {
              anchorApi.setActiveLink(`#${heading.id}`);
            }
          }
        } catch {}
      }
    }, 100);
  };

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className={`${styles.customTabs} customTabs`}>
      {/* Tab 导航 */}
      <div className={`${styles.tabNav} ${showRightArrow ? styles.hasRightArrow : ""} ${showLeftArrow ? styles.hasLeftArrow : ""}`}>
        {showLeftArrow && (
          <button
            className={`${styles.tabArrow} ${styles.left}`}
            onClick={handleLeftClick}
            aria-label="向左滚动"
          />
        )}
        <div className={styles.tabNavList} ref={tabListRef}>
          {items.map((item: TabItem) => (
            <div
              key={item.key}
              ref={(el) => { tabRefs.current[item.key] = el; }}
              className={`${styles.tab} ${activeKey === item.key ? styles.tabActive : ''}`}
              onClick={() => handleTabClick(item.key)}
            >
              <div className={styles.tabBtn}>{item.label}</div>
              {/* 每个Tab都有自己的分割线 */}
              <div className={styles.tabBorder} />
              {/* 选中的Tab显示高亮块 */}
              {activeKey === item.key && <div className={styles.tabInkBar} />}
            </div>
          ))}
        </div>
        {showRightArrow && (
          <button
            className={`${styles.tabArrow} ${styles.right}`}
            onClick={handleRightClick}
            aria-label="向右滚动"
          />
        )}

      </div>

      {/* Tab 内容 */}
      <div className={styles.tabContent}>
        {items.map((item: TabItem) => (
          <div
            key={item.key}
            className={`${styles.tabPane} ${activeKey === item.key ? styles.tabPaneActive : styles.tabPaneHidden}`}
          >
            {renderTitle(item.label, item.titleSize)}
            {item.children}
          </div>
        ))}
      </div>
    </div>
  );
};

export const DocuoTab = (props: any) => {
  return <div>{props.children}</div>;
};

import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
const IconExpandablePackup = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

interface Props {
  children?: React.ReactNode;
  title?: string;
  defaultOpen?: string;
  style?: any;
  className?: string;
}

export const Accordion = (props: Props) => {
  const { title, defaultOpen, children, style, className } = props;
  const defaultKey = title;
  const accordionRef = useRef<HTMLDivElement>(null);
  const [activeKey, setActiveKey] = useState<string | string[] | undefined>(
    defaultOpen === "true" ? defaultKey : undefined
  );

  // 检查 children 内容是否包含目标锚点
  const containsTargetAnchor = (hash: string) => {
    if (!hash) return false;

    // 移除 # 号并解码 URL 编码
    let targetId = hash.substring(1);
    if (!targetId) return false;

    // 解码 URL 编码的字符
    try {
      targetId = decodeURIComponent(targetId);
    } catch (e) {
      // 如果解码失败，使用原始值
    }

    // 递归检查 children 内容
    const checkChildren = (node: any): boolean => {
      if (!node) return false;

      // 检查是否是 Heading 组件且 id 匹配
      if ((node.type && node.type.name === 'Heading' && node.props && node.props.id === targetId) ||
          (node.props && node.props.id === targetId)) {
        return true;
      }

      // 检查 props.children
      if (node.props && node.props.children) {
        if (Array.isArray(node.props.children)) {
          return node.props.children.some((child: any) => checkChildren(child));
        } else {
          return checkChildren(node.props.children);
        }
      }

      // 检查直接的 children 属性
      if (node.children) {
        if (Array.isArray(node.children)) {
          return node.children.some((child: any) => checkChildren(child));
        } else {
          return checkChildren(node.children);
        }
      }

      return false;
    };

    // 如果 children 是数组，需要遍历每个元素
    if (Array.isArray(children)) {
      return children.some((child: any) => checkChildren(child));
    } else {
      return checkChildren(children);
    }
  };

  // 处理锚点跳转
  const handleAnchorNavigation = (hash: string) => {
    if (containsTargetAnchor(hash)) {
      // 展开 Accordion
      setActiveKey(defaultKey);

      // 等待 DOM 更新后再跳转
      setTimeout(() => {
        let targetId = hash.substring(1);
        // 解码 URL 编码的字符
        try {
          targetId = decodeURIComponent(targetId);
        } catch (e) {
          // 如果解码失败，使用原始值
        }

        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'auto' });
        }
      }, 300); // 给 Collapse 动画时间
    }
  };

  // 监听 URL 变化和初始加载
  useEffect(() => {
    // 检查初始 URL 的锚点
    if (window.location.hash) {
      handleAnchorNavigation(window.location.hash);
    }

    // 监听锚点变化（同页面跳转）
    const handleHashChange = () => {
      if (window.location.hash) {
        handleAnchorNavigation(window.location.hash);
      }
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
  }, [defaultKey]);

  const isExpanded = activeKey === defaultKey;

  return (
    <div ref={accordionRef} className={`${styles.customAccordion} customAccordion ${className || ""}`} style={style || null}>
      <div className={styles.accordionItem}>
        <div
          className={`${styles.accordionHeader} ${isExpanded ? styles.expanded : ''}`}
          onClick={() => setActiveKey(isExpanded ? undefined : defaultKey)}
          role="button"
          tabIndex={0}
          aria-expanded={isExpanded}
        >
          <div className={styles.expandIcon}>
            <IconExpandablePackup />
          </div>
          <span className={styles.headerText}>{title}</span>
        </div>
        <div className={`${styles.accordionContent} ${isExpanded ? styles.contentExpanded : styles.contentCollapsed}`}>
          <div className={styles.contentBox}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

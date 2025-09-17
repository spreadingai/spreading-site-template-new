import React, { useState, useRef, useEffect } from "react";
import { RawCode } from "codehike/code";
import { Code } from "./Code";
import styles from "./CodeGroup.module.scss";

interface CodeGroupProps {
  tabs: RawCode[];
  className?: string;
  style?: React.CSSProperties;
  showLineNumbers?: boolean;
  showCopyButton?: boolean;
}

export const CodeGroup = ({
  tabs,
  className,
  style,
  showLineNumbers = true,
  showCopyButton = true
}: CodeGroupProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const tabListRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

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
  }, [tabs]);

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

  if (!tabs || tabs.length === 0) {
    return null;
  }

  // 如果只有一个tab且没有文件名，直接显示代码块
  if (tabs.length === 1 && !getTabName(tabs[0])) {
    return (
      <Code
        codeblock={tabs[0]}
        className={className}
        style={style}
        showLineNumbers={showLineNumbers}
        showCopyButton={showCopyButton}
        hideFilename={true}
      />
    );
  }

  return (
    <div className={`${styles.wrapper} ${className || ""}`} style={style}>
      {/* Tab 导航 */}
      <div className={`${styles.tabNav} ${showRightArrow ? styles.hasRightArrow : ""} ${showLeftArrow ? styles.hasLeftArrow : ""}`}>
        {showLeftArrow && (
          <button
            className={`${styles.tabArrow} ${styles.left}`}
            onClick={handleLeftClick}
            aria-label="向左滚动"
          />
        )}
        <div className={styles.tabList} ref={tabListRef}>
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`${styles.tabItem} ${activeTab === index ? styles.active : ""}`}
              onClick={() => setActiveTab(index)}
            >
              <span className={styles.tabFilename}>
                {getTabName(tab) || `Tab ${index + 1}`}
              </span>
            </button>
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
        <Code
          codeblock={tabs[activeTab]}
          showLineNumbers={showLineNumbers}
          showCopyButton={showCopyButton}
          filename={getTabName(tabs[activeTab])}
          hideFilename={true}
        />
      </div>
    </div>
  );
};

// 获取tab名称：从meta字符串中提取title，如果没有title则使用meta本身
function getTabName(codeblock: RawCode): string | undefined {
  if (!codeblock.meta) {
    return undefined;
  }

  // 首先尝试从meta字符串中提取title
  const titleMatch = codeblock.meta.match(/title=["']([^"']+)["']/);
  if (titleMatch) {
    return titleMatch[1];
  }

  // 如果没有title属性，则使用meta本身（但排除包含title=的情况）
  if (!codeblock.meta.includes('title=')) {
    return codeblock.meta;
  }

  return undefined;
}

export default CodeGroup;

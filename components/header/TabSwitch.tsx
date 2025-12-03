import React, { FC, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./TabSwitch.module.scss";
import useTab from "../hooks/useTab";
import useGroup from "../hooks/useGroup";
import useLanguage from "../hooks/useLanguage";
import useSet from "../hooks/useSet";

interface TabSwitchProps {
  className?: string;
}

const TabSwitch: FC<TabSwitchProps> = ({ className }) => {
  const router = useRouter();
  const { currentTab, displayTabs, shouldShowTabs } = useTab();
  const { currentGroup } = useGroup();
  const { currentLanguage } = useLanguage();
  const { handleTabChanged } = useSet();



  // 如果不需要显示tabs或者tabs数量小于等于1，则不渲染
  if (!shouldShowTabs || displayTabs.length <= 1) {
    return null;
  }



  const handleTabClick = (tab: string, defaultLink: string, event: React.MouseEvent) => {
    // 对于外部链接，让<a>标签自然处理跳转，不需要阻止默认行为
    if (defaultLink.startsWith('http')) {
      // 外链由<a>标签的href和target="_blank"自然处理
      return;
    }
    // 对于内部链接，让Link组件处理路由跳转
  };

  return (
    <div className={`${className || ''}`}>
      <div className={styles.tabContainer}>
        {displayTabs.map((tabInfo, index) => {
          const isActive = currentTab === tabInfo.tab;
          const isExternal = tabInfo.defaultLink.startsWith('http');

          return (
            <div key={tabInfo.tab} className={styles.tabWrapper}>
              {isExternal ? (
                <a
                  href={tabInfo.defaultLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.tabItem} ${isActive ? styles.active : ''}`}
                  onClick={(e) => handleTabClick(tabInfo.tab, tabInfo.defaultLink, e)}
                >
                  <span className={styles.tabLabel}>{tabInfo.tabLabel}</span>
                </a>
              ) : (
                <Link
                  href={tabInfo.defaultLink}
                  className={`${styles.tabItem} ${isActive ? styles.active : ''}`}
                  onClick={(e) => handleTabClick(tabInfo.tab, tabInfo.defaultLink, e)}
                >
                  <span className={styles.tabLabel}>{tabInfo.tabLabel}</span>
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TabSwitch;

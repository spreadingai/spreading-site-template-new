import React, { FC, useMemo } from "react";
import { Dropdown } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./index.module.scss";
import useTab from "../hooks/useTab";
import IconArrowRight from "@/assets/icons/iconArrowRight.svg";

interface TabDropdownProps {
  className?: string;
}

const TabDropdown: FC<TabDropdownProps> = ({ className }) => {
  const router = useRouter();
  const { currentTab, currentTabLabel, displayTabs, shouldShowTabs } = useTab();
  const [open, setOpen] = React.useState(false);

  // 如果不需要显示tabs或者tabs数量小于等于1，则不渲染
  if (!shouldShowTabs || displayTabs.length <= 1) {
    return null;
  }

  const DropdownList = useMemo(() => {
    return displayTabs.map((tabInfo, index) => {
      const isActive = currentTab === tabInfo.tab;
      const isExternal = tabInfo.defaultLink.startsWith('http');

      return {
        key: index,
        label: isExternal ? (
          <a 
            href={tabInfo.defaultLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {tabInfo.tabLabel}
          </a>
        ) : (
          <Link href={tabInfo.defaultLink}>
            {tabInfo.tabLabel}
          </Link>
        ),
        className: `${styles["popup-list-item"]} ${
          isActive ? styles.active : ""
        }`,
      };
    });
  }, [displayTabs, currentTab]);

  const handleOpenChange = (val: boolean) => {
    setOpen(val);
    if (val) {
      setTimeout(() => {
        const activeNode = document.querySelector(
          `.${styles.active}.${styles["popup-list-item"]}`
        );
        if (activeNode) {
          activeNode.scrollIntoView();
        }
      }, 100);
    }
  };

  return (
    <Dropdown
      menu={{
        items: DropdownList,
        className: styles["ins-version-popup"],
        style: { top: "4px" },
      }}
      open={open}
      onOpenChange={handleOpenChange}
    >
      <div
        title={currentTabLabel}
        className={`mt-[12px] ${styles["ins-version-wrapper"]} ${
          styles.tab
        } ${open ? styles.active : ""} ${className || ''}`}
      >
        <span
          className={`${styles["label"]} text-ellipsis overflow-hidden`}
        >
          {currentTabLabel}
        </span>
        {open ? (
          <IconArrowRight
            className={styles["icon"]}
            style={{ transform: "rotate(-90deg)" }}
          />
        ) : (
          <IconArrowRight
            className={styles["icon"]}
            style={{ transform: "rotate(90deg)" }}
          />
        )}
      </div>
    </Dropdown>
  );
};

export default TabDropdown;

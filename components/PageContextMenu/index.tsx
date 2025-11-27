"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router"; // Pages Router，请根据你的项目版本选择
import styles from "./index.module.scss";
import { Button, Dropdown, MenuProps, Space } from "antd";
import IconTreeArrow from "@/assets/icons/tree/sidebar_arrow_open.svg";
import IconCopy from "@/assets/images/icon_copy@2x.png";
import IconCopyDark from "@/assets/images/icon_copy_dark@2x.png";
import IconCopied from "@/assets/images/icon_copied@2x.png";
import IconCopiedDark from "@/assets/images/icon_copied_dark@2x.png";
import IconBacktotop from "@/assets/images/icon_backtotop@2x.png";
import IconBacktotopDark from "@/assets/images/icon_backtotop_dark@2x.png";
import Image from "next/image";
import useTheme from "@/components/hooks/useTheme";
import useLanguage from "@/components/hooks/useLanguage";
import { ThemeEmum } from "../header/Theme.context";
import { copywriting } from "../constant/language";

enum CopyStatus {
  Init,
  Copied,
}

const copyIcon = {
  0: IconCopy,
  1: IconCopied,
};

const copyIconDark = {
  0: IconCopyDark,
  1: IconCopiedDark,
};

const PageContextMenu = () => {
  const router = useRouter();
  const mdPath = router.asPath.split("?")[0];
  const [copyStatus, setCopyStatus] = useState(CopyStatus.Init);
  const { theme } = useTheme();
  const { currentLanguage } = useLanguage();
  const pageContextMenuCopywriting =
    copywriting[currentLanguage].pageContextMenu;
  const copyText = {
    0: pageContextMenuCopywriting.copyPageContent,
    1: pageContextMenuCopywriting.copyied,
  };

  const handleButtonClick = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (copyStatus === CopyStatus.Copied) return;

    let mdText = "";
    try {
      mdText = await fetchMDContent();
    } catch (error) {}

    await navigator.clipboard.writeText(mdText);

    setCopyStatus(CopyStatus.Copied);
    setTimeout(() => {
      setCopyStatus(CopyStatus.Init);
    }, 3000);
  };

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    const key = e.key;
    if (key === "1") {
      handleButtonClick();
    } else if (key === "2") {
      const mdUrl = `${location.origin}${mdPath}.md`;
      window.open(mdUrl);
    } else if (key === "3") {
      window.open(
        `${location.origin}${process.env.NEXT_PUBLIC_BASE_PATH || ""}/llms.txt`
      );
    }
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <span className={styles.PageContextItem}>
          <span className={styles.PageContextItemTitle}>
            {pageContextMenuCopywriting.copyPageContent}
          </span>
          <span className={styles.PageContextItemDesc}>
            {pageContextMenuCopywriting.copyPageContentDesc}
          </span>
        </span>
      ),
      key: "1",
    },
    {
      label: (
        <span className={styles.PageContextItem}>
          <span className={styles.PageContextItemTitle}>
            <span>{pageContextMenuCopywriting.viewMarkdown}</span>
            <Image
              width={20}
              height={20}
              src={theme === ThemeEmum.Dark ? IconBacktotopDark : IconBacktotop}
              alt=""
            />
          </span>
          <span className={styles.PageContextItemDesc}>
            {pageContextMenuCopywriting.viewMarkdownDesc}
          </span>
        </span>
      ),
      key: "2",
    },
    {
      label: (
        <span className={styles.PageContextItem}>
          <span className={styles.PageContextItemTitle}>
            <span>{pageContextMenuCopywriting.llms}</span>
            <Image
              width={20}
              height={20}
              src={theme === ThemeEmum.Dark ? IconBacktotopDark : IconBacktotop}
              alt=""
            />
          </span>
          <span className={styles.PageContextItemDesc}>
            {pageContextMenuCopywriting.llmsDesc}
          </span>
        </span>
      ),
      key: "3",
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const fetchMDContent = () => {
    // 目标远程 MD 文件的 URL
    const mdUrl = `${location.origin}${mdPath}.md`;
    return fetch(mdUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `网络响应不是 ok: ${response.status} ${response.statusText}`
          );
        }
        return response.text();
      })
      .then((mdText) => {
        return mdText;
      });
  };

  return (
    <div className={`${styles.PageContextMenu} page-context-menu`}>
      <Space.Compact>
        <Button
          onClick={handleButtonClick}
          icon={
            <Image
              width={20}
              height={20}
              src={
                theme === ThemeEmum.Dark
                  ? copyIconDark[copyStatus]
                  : copyIcon[copyStatus]
              }
              alt={"context menu"}
            />
          }
        >
          {copyText[copyStatus]}
        </Button>
        <Dropdown
          rootClassName={styles.PageContextDropdownMenu}
          menu={menuProps}
          placement="bottomRight"
          trigger={["hover"]}
        >
          <Button icon={<IconTreeArrow />} />
        </Dropdown>
      </Space.Compact>
    </div>
  );
};

export default PageContextMenu;

import React from "react";
import styles from "./index.module.scss";

interface Props {
  id?: string;
  children?: React.ReactNode;
  title?: string;
  // 与 Step 保持一致的标题尺寸定义
  titleSize?: "p" | "h2" | "h3" | "h4" | "h5";
  // 父级 Tabs 传入的默认标题尺寸（Tab 未设置时生效）
  defaultTitleSize?: "p" | "h2" | "h3" | "h4" | "h5";
  className?: string;
  style?: any;
}

export const DocuoTab = (props: Props) => {
  const { id, children, className, style, title = "", titleSize = "", defaultTitleSize = "p" } = props;
  const finalTitleSize = titleSize || defaultTitleSize;

  const generateId = (text: string) => {
    // 简单的 slug 生成，支持中文字符
    return text
      .toLowerCase()
      .replace(/[^\u4e00-\u9fa5\w\s-]/g, "") // 保留中文、英文、数字、空格、连字符
      .replace(/\s+/g, "-")
      .trim();
  };

  const renderTitle = () => {
    if (!title) return null;

    // finalTitleSize 为 heading 时生成 id；视觉上隐藏
    if (finalTitleSize !== "p") {
      const headingId = id || generateId(title);
      switch (finalTitleSize) {
        case "h2":
          return <h2 id={headingId} className={styles.visuallyHidden}>{title}</h2>;
        case "h3":
          return <h3 id={headingId} className={styles.visuallyHidden}>{title}</h3>;
        case "h4":
          return <h4 id={headingId} className={styles.visuallyHidden}>{title}</h4>;
        case "h5":
          return <h5 id={headingId} className={styles.visuallyHidden}>{title}</h5>;
        default:
          return null;
      }
    }

    return null;
  };

  return (
    <div
      id={title && finalTitleSize !== "p" ? undefined : id}
      className={`${styles.customTab} customTab ${className || ""}`}
      style={style || null}
    >
      {renderTitle()}
      {children}
    </div>
  );
};

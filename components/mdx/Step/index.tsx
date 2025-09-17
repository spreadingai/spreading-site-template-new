import React from "react";
import styles from "./index.module.scss";

interface StepProps {
  title?: string;
  icon?: string | React.ReactNode;
  stepNumber?: number;
  defaultNumber: number;
  titleSize?: "p" | "h2" | "h3" | "h4" | "h5";
  defaultTitleSize: "p" | "h2" | "h3" | "h4" | "h5";
  children: React.ReactNode;
  style?: any;
  className?: string;
}

export const Step = (props: StepProps) => {
  const {
    title = "",
    icon = "",
    stepNumber = 0,
    defaultNumber,
    titleSize = "",
    defaultTitleSize,
    children,
    style,
    className,
  } = props;

  const renderStepNumber = () => {
    if (icon && React.isValidElement(icon)) {
      return <div className={styles.stepIcon}>{icon}</div>; // svg
    }

    if (icon && typeof icon === "string") {
      // Treat as image URL
      return (
        <div className={styles.stepIcon}>
          <img src={icon} alt="Step icon" />
        </div>
      );
    }

    return (
      <div className={styles.stepNumber}>
        <span>{stepNumber || defaultNumber}</span>
      </div>
    );
  };

  const generateId = (text: string) => {
    // 简单的slug生成，支持中文字符
    return text
      .toLowerCase()
      .replace(/[^\u4e00-\u9fa5\w\s-]/g, '') // 保留中文字符、英文字符、数字、空格和连字符
      .replace(/\s+/g, '-') // 空格替换为连字符
      .trim();
  };

  const renderTitle = () => {
    const finalTitleSize = (titleSize || defaultTitleSize) as typeof defaultTitleSize;
    const titleClassName = styles.title;

    // 为标题元素自动生成id，以便动态TOC可以识别
    if (finalTitleSize !== "p" && title) {
      const id = generateId(title);

      switch (finalTitleSize) {
        case "h2":
          return <h2 id={id} className={titleClassName}>{title}</h2>;
        case "h3":
          return <h3 id={id} className={titleClassName}>{title}</h3>;
        case "h4":
          return <h4 id={id} className={titleClassName}>{title}</h4>;
        case "h5":
          return <h5 id={id} className={titleClassName}>{title}</h5>;
        default:
          return <p className={titleClassName}>{title}</p>;
      }
    }

    // 段落元素不需要id
    return <p className={titleClassName}>{title}</p>;
  };

  return (
    <div
      className={`${styles.stepItem} ${className || ""}`}
      style={style || null}
    >
      <div className={styles.line}></div>
      <div className={styles.stepNumberWrapper}>{renderStepNumber()}</div>
      <div className={styles.main}>
        {renderTitle()}
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

import React from "react";
import styles from "./index.module.scss";

interface CardProps {
  title?: string;
  icon?: string | React.ReactNode;
  href?: string;
  target?: string;
  children: React.ReactNode;
  style?: any;
  className?: string;
}

export const Card = (props: CardProps) => {
  const {
    title = "",
    icon = "",
    href = "",
    target = "_self",
    children,
    style,
    className,
  } = props;

  const renderIcon = (icon: string | React.ReactNode) => {
    if (!icon) return null;
    if (React.isValidElement(icon)) return icon;
    return <img src={icon as string} alt="Card icon" />;
  };

  const handleCardClick = (e) => {
    if (e.target?.tagName === "A") return;
    if (!href) return;
    const eventName = "link-clicked";
    const myCustomEvent = new CustomEvent(eventName, {
      detail: {
        href,
        target,
      },
    });
    document.dispatchEvent(myCustomEvent);
  };

  return (
    <div
      onClick={handleCardClick}
      className={`${styles.wrapper} ${!!href && styles.link} ${className || ""}`}
      style={style || null}
    >
      {!!icon && <div className={styles.iconWrap}>{renderIcon(icon)}</div>}
      <div className={styles.title}>{title}</div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

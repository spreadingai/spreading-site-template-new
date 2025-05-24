import React from "react";
import classNames from "classnames";
import styles from "./SidebarTag.module.scss";

interface SidebarTagProps {
  label: string;
  color: "Check" | "Tip" | "Note" | "Warning" | "Error";
  className?: string;
}

const SidebarTag: React.FC<SidebarTagProps> = ({ label, color, className }) => {
  return (
    <span
      className={classNames(
        styles.sidebarTag,
        styles[`sidebarTag--${color.toLowerCase()}`],
        className
      )}
    >
      {label}
    </span>
  );
};

export default SidebarTag;

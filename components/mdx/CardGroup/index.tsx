import React from "react";
import styles from "./index.module.scss";

interface CardGroupProps {
  children?: React.ReactNode;
  cols?: number;
  style?: any;
  className?: string;
}

export const CardGroup = (props: CardGroupProps) => {
  const { children, cols = 2, style, className } = props;

  const tempCols = Number.isNaN(Number(cols)) ? 2 : Number(cols);
  const targetCols = Math.max(1, Math.min(5, tempCols));

  return (
    <div
      style={{
        gridTemplateColumns: `repeat(${targetCols}, 1fr)`,
        // @ts-ignore
        ...(style || {}),
      }}
      className={`${styles.wrapper} ${className || ""}`}
    >
      {children}
    </div>
  );
};

import React from "react";
import styles from "./DocSearchPortal.module.scss";

interface DocSearchAboveContentProps {
  hasQuery: boolean;
}

const DocSearchAboveContent = ({ hasQuery }: DocSearchAboveContentProps) => {
  return (
    <div className={styles.aboveWrapper}>
      {hasQuery ? (
        <>
          <span className={styles.tab}>内容 B — Tab 占位 A</span>
          <span className={styles.tab}>内容 B — Tab 占位 B</span>
        </>
      ) : (
        <span className={styles.placeholder}>内容 A — 无搜索词时的占位</span>
      )}
    </div>
  );
};

export default DocSearchAboveContent;

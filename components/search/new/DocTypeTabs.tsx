import React from "react";
import { useMenu } from "react-instantsearch";
import styles from "./index.module.scss";

interface Props {
  allLabel?: string;
}

const DocTypeTabs: React.FC<Props> = ({ allLabel = "All" }) => {
  const { items, refine } = useMenu({
    attribute: "doctype",
    limit: 50,
    sortBy: ["count:desc", "name:asc"],
  });

  const activeItem = items.find((i) => i.isRefined);
  const total = items.reduce((sum, i) => sum + i.count, 0);

  if (!items.length) return null;

  return (
    <div className={styles.docTypeTabs} role="tablist">
      <button
        type="button"
        role="tab"
        aria-selected={!activeItem}
        className={`${styles.docTypeTab} ${
          !activeItem ? styles.docTypeTabActive : ""
        }`}
        onClick={() => refine(undefined as any)}
      >
        {allLabel}
        <span className={styles.docTypeTabCount}>({total})</span>
      </button>
      {items.map((item) => (
        <button
          key={item.value}
          type="button"
          role="tab"
          aria-selected={item.isRefined}
          className={`${styles.docTypeTab} ${
            item.isRefined ? styles.docTypeTabActive : ""
          }`}
          onClick={() => refine(item.value)}
        >
          {item.label}
          <span className={styles.docTypeTabCount}>({item.count})</span>
        </button>
      ))}
    </div>
  );
};

export default DocTypeTabs;

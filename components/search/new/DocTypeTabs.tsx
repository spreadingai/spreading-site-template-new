import React from "react";
import { useMenu } from "react-instantsearch";
import { getDocTypeLabel, getAllLabel } from "./facetMapping";
import styles from "./index.module.scss";

interface Props {
  language?: string;
}

const DocTypeTabs: React.FC<Props> = ({ language = "zh" }) => {
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
        {getAllLabel(language)}
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
          {getDocTypeLabel(item.label, language)}
          <span className={styles.docTypeTabCount}>({item.count})</span>
        </button>
      ))}
    </div>
  );
};

export default DocTypeTabs;

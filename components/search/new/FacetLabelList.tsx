import React, { useState } from "react";
import { useMenu } from "react-instantsearch";
import styles from "./index.module.scss";

interface Props {
  attribute: string;
  title?: string;
  allLabel?: string;
  collapsedCount?: number;
}

const FacetLabelList: React.FC<Props> = ({
  attribute,
  title,
  allLabel = "All",
  collapsedCount = 8,
}) => {
  const { items, refine } = useMenu({
    attribute,
    limit: 200,
    sortBy: ["count:desc", "name:asc"],
  });
  const [expanded, setExpanded] = useState(false);

  if (!items.length) return null;

  const activeItem = items.find((i) => i.isRefined);
  const needsToggle = items.length > collapsedCount;
  const visibleItems = expanded ? items : items.slice(0, collapsedCount);

  return (
    <div className={styles.facetRow}>
      {title && <span className={styles.facetRowTitle}>{title}</span>}
      <div className={styles.facetRowList}>
        <button
          type="button"
          className={`${styles.facetLabel} ${
            !activeItem ? styles.facetLabelActive : ""
          }`}
          onClick={() => refine(undefined as any)}
        >
          {allLabel}
        </button>
        {visibleItems.map((item) => (
          <button
            key={item.value}
            type="button"
            className={`${styles.facetLabel} ${
              item.isRefined ? styles.facetLabelActive : ""
            }`}
            onClick={() => refine(item.value)}
          >
            {item.label}
            <span className={styles.facetLabelCount}>({item.count})</span>
          </button>
        ))}
      </div>
      {needsToggle && (
        <button
          type="button"
          className={styles.facetRowToggle}
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? "收起" : "展开"}
        </button>
      )}
    </div>
  );
};

export default FacetLabelList;

import React, { useState } from "react";
import { useMenu } from "react-instantsearch";
import {
  getGroupLabel,
  getPlatformLabel,
  getAllLabel,
  getFacetTitle,
  getExpandLabel,
} from "./facetMapping";
import IconArrowRight from "@/assets/icons/iconArrowRight.svg";

type GroupMap = Map<string, string>;
import styles from "./index.module.scss";

interface Props {
  attribute: string;
  title?: string;
  collapsedCount?: number;
  language?: string;
  groupMap?: GroupMap;
}

const FacetLabelList: React.FC<Props> = ({
  attribute,
  title,
  collapsedCount = 8,
  language = "zh",
  groupMap,
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

  const getLabel = (label: string) => {
    if (attribute === "group" && groupMap)
      return getGroupLabel(groupMap, label);
    if (attribute === "platform") return getPlatformLabel(label, language);
    return label;
  };

  return (
    <div className={styles.facetRow}>
      {title && (
        <span className={styles.facetRowTitle}>
          {getFacetTitle(title, language)}
        </span>
      )}
      <div className={styles.facetRowList}>
        <button
          type="button"
          className={`${styles.facetLabel} ${
            !activeItem ? styles.facetLabelActive : ""
          }`}
          onClick={() => refine(undefined as any)}
        >
          {getAllLabel(language)}
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
            {getLabel(item.label)}
            <span className={styles.facetLabelCount}>({item.count})</span>
          </button>
        ))}
      </div>
      {needsToggle && (
        <button
          type="button"
          className={`${styles.facetRowToggle} ${
            expanded
              ? styles.facetRowToggleExpanded
              : styles.facetRowToggleCollapsed
          }`}
          onClick={() => setExpanded((v) => !v)}
        >
          {getExpandLabel(language)}
          <IconArrowRight />
        </button>
      )}
    </div>
  );
};

export default FacetLabelList;

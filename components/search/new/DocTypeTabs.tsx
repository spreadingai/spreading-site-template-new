import React from "react";
import { useMenu, useSearchBox } from "react-instantsearch";
import { getDocTypeLabel, getAllLabel } from "./facetMapping";
import IconArrowRight from "@/assets/icons/iconArrowRight.svg";
import styles from "./index.module.scss";

interface Props {
  language?: string;
  showViewMore?: boolean;
  indexName?: string;
  variant?: "default" | "dropdown";
  extraParams?: {
    group?: string;
    platform?: string;
  };
}

const VIEW_MORE_LABEL: Record<string, string> = {
  zh: "查看更多",
  en: "View More",
};

const DocTypeTabs: React.FC<Props> = ({
  language = "zh",
  showViewMore = false,
  indexName = "",
  variant = "default",
  extraParams,
}) => {
  const { items, refine } = useMenu({
    attribute: "doctype",
    limit: 50,
    sortBy: ["count:desc", "name:asc"],
  });
  const { query } = useSearchBox();

  const activeItem = items.find((i) => i.isRefined);
  const total = items.reduce((sum, i) => sum + i.count, 0);

  if (!items.length) return null;

  const buildSearchUrl = () => {
    const prefix = indexName ? `${indexName}` : "";
    const params = new URLSearchParams();
    if (query) params.set(`${prefix}[query]`, query);
    if (activeItem?.value)
      params.set(`${prefix}[menu][doctype]`, activeItem.value);
    if (extraParams?.group)
      params.set(`${prefix}[menu][group]`, extraParams.group);
    if (extraParams?.platform)
      params.set(`${prefix}[menu][platform]`, extraParams.platform);
    const qs = params.toString();
    return `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/search${qs ? `?${qs}` : ""}`;
  };

  return (
    <div
      className={`${styles.docTypeTabsWrapper} ${showViewMore ? styles.docTypeTabsWrapperWithMore : ""} ${variant === "dropdown" ? styles.docTypeTabsDropdown : ""}`}
    >
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
      {showViewMore && (
        <a
          className={styles.docTypeTabsViewMore}
          href={buildSearchUrl()}
          target="_blank"
        >
          {VIEW_MORE_LABEL[language === "zh" ? "zh" : "en"]}
          <IconArrowRight />
        </a>
      )}
    </div>
  );
};

export default DocTypeTabs;

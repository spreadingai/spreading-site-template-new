import React from "react";
import { useInstantSearch } from "react-instantsearch";
import SearchHitItem, { AlgoliaHit } from "./SearchHitItem";
import styles from "./index.module.scss";

type GroupMap = Map<string, string>;

interface Props {
  items: AlgoliaHit[];
  totalCount: number;
  language?: string;
  groupMap?: GroupMap;
}

const SearchHits: React.FC<Props> = ({
  items,
  totalCount,
  language = "zh",
  groupMap,
}) => {
  const { status } = useInstantSearch();

  const loading = status === "loading" || status === "stalled";

  if (loading && totalCount === 0) {
    return (
      <div className={styles.hitsLoading}>
        <span>搜索中…</span>
      </div>
    );
  }

  if (!loading && totalCount === 0) {
    return (
      <div className={styles.hitsEmpty}>
        <p>未能检索到相关内容，建议您尝试其他关键词</p>
        <p>
          您可{" "}
          <a
            className={styles.emptyFeedbackLink}
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            提交反馈
          </a>{" "}
          进行
        </p>
      </div>
    );
  }

  return (
    <ul className={styles.hitsList}>
      {items.map((hit) => (
        <li key={hit.objectID} className={styles.hitsListItem}>
          <SearchHitItem hit={hit} language={language} groupMap={groupMap} />
        </li>
      ))}
    </ul>
  );
};

export default SearchHits;

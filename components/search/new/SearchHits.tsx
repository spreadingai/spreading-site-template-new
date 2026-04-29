import React from "react";
import { useInstantSearch } from "react-instantsearch";
import SearchHitItem, { AlgoliaHit } from "./SearchHitItem";
import HitsLoading from "./HitsLoading";
import HitsEmpty from "./HitsEmpty";
import styles from "./index.module.scss";

type GroupMap = Map<string, string>;

type Variant = "default" | "dropdown";

interface Props {
  items: AlgoliaHit[];
  totalCount: number;
  language?: string;
  groupMap?: GroupMap;
  variant?: Variant;
}

const SearchHits: React.FC<Props> = ({
  items,
  totalCount,
  language = "zh",
  groupMap,
  variant = "default",
}) => {
  const { status } = useInstantSearch();

  const loading = status === "loading" || status === "stalled";

  if (loading && totalCount === 0) {
    return <HitsLoading language={language} />;
  }

  if (variant === "default" && !loading && totalCount === 0) {
    return <HitsEmpty language={language} />;
  }

  return (
    <ul
      className={`${styles.hitsList} ${variant === "dropdown" ? styles.hitsListDropdown : ""}`}
    >
      {items.map((hit) => (
        <li key={hit.objectID} className={styles.hitsListItem}>
          <SearchHitItem
            hit={hit}
            language={language}
            groupMap={groupMap}
            variant={variant}
          />
        </li>
      ))}
    </ul>
  );
};

export default SearchHits;

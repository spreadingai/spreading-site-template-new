import React from "react";
import { useInstantSearch } from "react-instantsearch";
import SearchHitItem, { AlgoliaHit } from "./SearchHitItem";
import HitsLoading from "./HitsLoading";
import HitsEmpty from "./HitsEmpty";
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
    return <HitsLoading language={language} />;
  }

  if (!loading && totalCount === 0) {
    return <HitsEmpty language={language} />;
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

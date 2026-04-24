import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSearchBox, useInstantSearch } from "react-instantsearch";
import styles from "./index.module.scss";

interface Props {
  placeholder?: string;
}

const SearchBox: React.FC<Props> = ({ placeholder = "Search" }) => {
  const { query, refine, clear } = useSearchBox();
  const { status } = useInstantSearch();
  const [value, setValue] = useState(query);
  const inputRef = useRef<HTMLInputElement>(null);

  // keep local value in sync with upstream query (routing / external changes)
  useEffect(() => {
    setValue(query);
  }, [query]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const next = e.currentTarget.value;
      setValue(next);
      refine(next);
    },
    [refine]
  );

  const handleClear = useCallback(() => {
    setValue("");
    clear();
    inputRef.current?.focus();
  }, [clear]);

  const loading = status === "loading" || status === "stalled";

  return (
    <div className={styles.searchBox}>
      <span className={styles.searchBoxIcon} aria-hidden>
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
          <path
            d="M14.386 14.386l4.088 4.088-4.088-4.088A7 7 0 113 8a7 7 0 0111 6.386z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <input
        ref={inputRef}
        className={styles.searchBoxInput}
        type="search"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
      />
      {loading && <span className={styles.searchBoxLoading}>…</span>}
      {!!value && !loading && (
        <button
          type="button"
          className={styles.searchBoxClear}
          onClick={handleClear}
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default SearchBox;

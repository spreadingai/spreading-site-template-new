import React, { useCallback, useContext, useEffect, useState } from "react";
import { getSearchHistoryText } from "./facetMapping";
import ThemeContext from "@/components/header/Theme.context";
import iconDel from "@/assets/images/search/icon_del@2x.png";
import iconDelDark from "@/assets/images/search/icon_del_dark@2x.png";
import Image from "next/image";
import styles from "./searchDropdown.module.scss";

const STORAGE_KEY = "search_history";
const MAX_HISTORY = 10;

function getHistory(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveHistory(items: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function addSearchHistory(query: string) {
  const trimmed = query.trim();
  if (!trimmed) return;
  const items = getHistory().filter((q) => q !== trimmed);
  items.unshift(trimmed);
  saveHistory(items.slice(0, MAX_HISTORY));
}

interface Props {
  language?: string;
  onSelect?: (query: string) => void;
  variant?: "default" | "dropdown";
}

const SearchHistory: React.FC<Props> = ({
  language = "zh",
  onSelect,
  variant = "default",
}) => {
  const [items, setItems] = useState<string[]>([]);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    setItems(getHistory());
  }, []);

  const handleClear = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setItems([]);
  }, []);

  if (items.length === 0) return null;

  const { title, clear } = getSearchHistoryText(language);

  return (
    <div
      className={`${styles.searchHistory} ${variant !== "dropdown" ? styles.searchHistoryPage : ""}`}
    >
      <div className={styles.searchHistoryHeader}>
        <span className={styles.searchHistoryTitle}>{title}</span>
        <button
          type="button"
          className={styles.searchHistoryClear}
          onClick={handleClear}
        >
          <Image
            src={theme === "dark" ? iconDelDark.src : iconDel.src}
            alt="delete"
            width={14}
            height={14}
          />
          {clear}
        </button>
      </div>
      <div className={styles.searchHistoryList}>
        {items.map((text) => (
          <button
            key={text}
            type="button"
            className={styles.searchHistoryItem}
            onClick={() => onSelect?.(text)}
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchHistory;

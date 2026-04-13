import React, { useState, useEffect } from "react";
import styles from "./DocSearchPortal.module.scss";
import { getRecentQueries } from "./recentQueries";
import useLanguage from "@/components/hooks/useLanguage";
import { defaultLanguage } from "@/components/context/languageContext";

interface DocSearchAboveContentProps {
  hasQuery: boolean;
  indexName: string;
}

/**
 * 将搜索词填入 DocSearch 输入框并触发搜索。
 *
 * DocSearch 使用 React 受控 input，直接赋值无效；
 * 需要通过原生 setter + 派发 input 事件让 React 感知变化。
 */
function fillSearchInput(query: string) {
  const input = document.querySelector<HTMLInputElement>(".DocSearch-Input");
  if (!input) return;
  const nativeSetter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    "value",
  )?.set;
  nativeSetter?.call(input, query);
  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.focus();
}

const DocSearchAboveContent = ({
  hasQuery,
  indexName,
}: DocSearchAboveContentProps) => {
  const [recentQueries, setRecentQueries] = useState<string[]>([]);
  const { currentLanguage } = useLanguage();
  const isZh = currentLanguage !== defaultLanguage;

  // 每次切换到"无搜索词"状态时，从 localStorage 重新读取最新历史
  useEffect(() => {
    if (!hasQuery) {
      setRecentQueries(getRecentQueries(indexName));
    }
  }, [hasQuery, indexName]);

  // 有搜索词时不展示额外内容
  if (hasQuery) return null;

  // 无搜索词时展示历史搜索词 labels
  if (recentQueries.length === 0) return null;

  return (
    <div className={styles.recentQueriesWrapper}>
      <span className={styles.recentQueriesTitle}>
        {isZh ? "最近搜索" : "Recent"}
      </span>
      {recentQueries.map((query) => (
        <button
          key={query}
          className={styles.queryLabel}
          onClick={() => fillSearchInput(query)}
          title={query}
          type="button"
        >
          {query}
        </button>
      ))}
    </div>
  );
};

export default DocSearchAboveContent;

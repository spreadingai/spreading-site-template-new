import React, { useContext, useEffect, useMemo, useState } from "react";
import { useHits, useInstantSearch, useSearchBox } from "react-instantsearch";
import dynamic from "next/dynamic";
import SearchBox from "./SearchBox";
import DocTypeTabs from "./DocTypeTabs";
import FacetLabelList from "./FacetLabelList";
import SearchHits from "./SearchHits";
import SearchPagination from "./SearchPagination";
import AISuggestion, { getSuggestions } from "./AISuggestion";
import { filterHits } from "./filterHits";
import type { AlgoliaHit } from "./SearchHitItem";
import useLanguage from "@/components/hooks/useLanguage";
import ThemeContext from "@/components/header/Theme.context";
import styles from "./index.module.scss";

const AskAIModal = dynamic(() => import("@/components/header/AskAI/modal"), {
  ssr: false,
});

const PAGE_SIZE = 30;

// 调试开关：true = 过滤 matchLevel 为 "none" 的条目；false = 不过滤，展示 Algolia 原始结果
const ENABLE_FILTER = true;

interface Props {
  placeholder?: string;
}

const SearchPageClient: React.FC<Props> = ({ placeholder }) => {
  const { query } = useSearchBox();
  const hasQuery = !!query && query.trim().length > 0;
  const { currentLanguage } = useLanguage();
  const { theme } = useContext(ThemeContext);

  // AI 弹框状态
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiInitialMessage, setAiInitialMessage] = useState<string>();

  const handleOpenAI = (message?: string) => {
    setAiInitialMessage(message);
    setAiModalOpen(true);
  };

  // 1) 客户端过滤：受 ENABLE_FILTER 控制
  const { items: filteredItems } = useHits<AlgoliaHit>(
    ENABLE_FILTER ? { transformItems: filterHits } : undefined
  );

  // 2) 查询或筛选变化时，重置到第 1 页
  const { indexUiState } = useInstantSearch();
  const stateKey = useMemo(
    () =>
      JSON.stringify({
        q: indexUiState.query || "",
        r: indexUiState.refinementList || {},
      }),
    [indexUiState.query, indexUiState.refinementList]
  );
  const [pageIndex, setPageIndex] = useState(0);
  useEffect(() => {
    setPageIndex(0);
  }, [stateKey]);

  // 3) 客户端切片
  const totalPages = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE));
  const safePageIndex = Math.min(pageIndex, totalPages - 1);
  const pageItems = useMemo(
    () =>
      filteredItems.slice(
        safePageIndex * PAGE_SIZE,
        (safePageIndex + 1) * PAGE_SIZE
      ),
    [filteredItems, safePageIndex]
  );

  return (
    <div className={styles.pageRoot}>
      <div className={styles.criteria}>
        <SearchBox placeholder={placeholder} />
        {hasQuery && (
          <>
            <DocTypeTabs allLabel="全部" />
            <FacetLabelList attribute="group" title="Group" allLabel="全部" />
            <FacetLabelList
              attribute="platform"
              title="Platform"
              allLabel="全部"
            />
          </>
        )}
      </div>
      {hasQuery && (
        <div className={styles.body}>
          {filteredItems.length > 0 && (
            <AISuggestion query={query} onOpenAI={handleOpenAI} />
          )}
          <SearchHits items={pageItems} totalCount={filteredItems.length} />
          {filteredItems.length > 0 && (
            <div className={styles.feedbackBar}>
              <span className={styles.feedbackText}>没有找到您查询的内容？</span>
              <a
                className={styles.feedbackBtn}
                href="#"
                target="_blank"
                rel="noopener noreferrer"
              >
                提交反馈
              </a>
            </div>
          )}
          <SearchPagination
            page={safePageIndex}
            totalPages={totalPages}
            onChange={setPageIndex}
          />
        </div>
      )}
      <AskAIModal
        isModalOpen={aiModalOpen}
        onCloseHandle={() => setAiModalOpen(false)}
        currentTheme={theme}
        currentLanguage={currentLanguage}
        currentGroup=""
        currentPlatform=""
        initialMessage={aiInitialMessage}
        defaultQuestions={hasQuery ? getSuggestions(query) : undefined}
      />
    </div>
  );
};

export default SearchPageClient;

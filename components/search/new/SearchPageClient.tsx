import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import "instantsearch.css/themes/satellite.css";
import {
  Pagination,
  SearchBox as ISSearchBox,
  useHits,
  useInstantSearch,
  useSearchBox,
} from "react-instantsearch";
import dynamic from "next/dynamic";
import DocTypeTabs from "./DocTypeTabs";
import FacetLabelList from "./FacetLabelList";
import SearchHits from "./SearchHits";
import AISuggestion from "./AISuggestion";
import FeedbackBar from "./FeedbackBar";
import type { AlgoliaHit } from "./SearchHitItem";
import { buildGroupMap, getPlaceholder } from "./facetMapping";
import useLanguage from "@/components/hooks/useLanguage";
import ThemeContext from "@/components/header/Theme.context";
import type { InstanceGroup } from "@/lib/types";
import styles from "./index.module.scss";

const AskAIModal = dynamic(() => import("@/components/header/AskAI/modal"), {
  ssr: false,
});

interface Props {
  instanceGroups?: InstanceGroup[];
}

const SearchPageClient: React.FC<Props> = ({ instanceGroups = [] }) => {
  const { query } = useSearchBox();
  const hasQuery = !!query && query.trim().length > 0;
  const { currentLanguage } = useLanguage();
  const { theme } = useContext(ThemeContext);

  // AI 弹框状态
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiInitialMessage, setAiInitialMessage] = useState<string>();
  const [aiDefaultQuestions, setAiDefaultQuestions] = useState<string[]>();
  const [paginationPadding, setPaginationPadding] = useState(3);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      setPaginationPadding(w <= 375 ? 1 : w <= 750 ? 2 : 3);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleOpenAI = (message?: string, defaultQuestions?: string[]) => {
    setAiInitialMessage(message);
    setAiDefaultQuestions(defaultQuestions);
    setAiModalOpen(true);
  };

  // Algolia 服务端分页：useHits 只返回当前页数据
  const { items } = useHits<AlgoliaHit>();
  const { results, indexUiState, setIndexUiState } = useInstantSearch();

  // 切换页码后滚动到列表顶部
  useEffect(() => {
    if (indexUiState.page && indexUiState.page > 0) {
      bodyRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [indexUiState.page]);

  // 查询或筛选变化时重置到第 1 页
  const stateKey = useMemo(
    () =>
      JSON.stringify({
        q: indexUiState.query || "",
        r: indexUiState.refinementList || {},
      }),
    [indexUiState.query, indexUiState.refinementList],
  );
  useEffect(() => {
    setIndexUiState((prev) => ({ ...prev, page: 0 }));
  }, [stateKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const totalCount = results?.nbHits ?? 0;
  const groupMap = useMemo(
    () => buildGroupMap(instanceGroups),
    [instanceGroups],
  );

  return (
    <div className={styles.pageRoot}>
      <div
        className={`${styles.criteria} ${hasQuery ? styles.criteriaHasQuery : ""}`}
      >
        <ISSearchBox placeholder={getPlaceholder(currentLanguage)} />
        {hasQuery && (
          <>
            <DocTypeTabs language={currentLanguage} />
            <FacetLabelList
              attribute="group"
              title="Group"
              language={currentLanguage}
              groupMap={groupMap}
            />
            <FacetLabelList
              attribute="platform"
              title="Platform"
              language={currentLanguage}
            />
          </>
        )}
      </div>
      {hasQuery && (
        <div className={styles.body} ref={bodyRef}>
          {totalCount > 0 && (
            <AISuggestion
              query={query}
              onOpenAI={handleOpenAI}
              language={currentLanguage}
            />
          )}
          <SearchHits
            items={items}
            totalCount={totalCount}
            language={currentLanguage}
            groupMap={groupMap}
          />
          {totalCount > 0 && <FeedbackBar language={currentLanguage} />}
          {/* Algolia 分页最多支持 1000 条结果（paginationLimitedTo 默认值），
              超出部分无法翻页访问，但 facet counts 显示的是真实总数，两者可能不一致 */}
          {totalCount > 0 && <Pagination padding={paginationPadding} />}
        </div>
      )}
      <AskAIModal
        isModalOpen={aiModalOpen}
        onCloseHandle={() => setAiModalOpen(false)}
        currentTheme={theme}
        currentLanguage={currentLanguage}
        initialMessage={aiInitialMessage}
        defaultQuestions={aiDefaultQuestions}
      />
    </div>
  );
};

export default SearchPageClient;

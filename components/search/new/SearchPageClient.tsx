import React, { useContext, useEffect, useMemo, useState } from "react";
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
import AISuggestion, { getSuggestions } from "./AISuggestion";
import type { AlgoliaHit } from "./SearchHitItem";
import { buildGroupMap } from "./facetMapping";
import useLanguage from "@/components/hooks/useLanguage";
import ThemeContext from "@/components/header/Theme.context";
import type { InstanceGroup } from "@/lib/types";
import styles from "./index.module.scss";

const AskAIModal = dynamic(() => import("@/components/header/AskAI/modal"), {
  ssr: false,
});

interface Props {
  placeholder?: string;
  instanceGroups?: InstanceGroup[];
}

const SearchPageClient: React.FC<Props> = ({
  placeholder,
  instanceGroups = [],
}) => {
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

  // Algolia 服务端分页：useHits 只返回当前页数据
  const { items } = useHits<AlgoliaHit>();
  const { results, indexUiState, setIndexUiState } = useInstantSearch();

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
        className={`${styles.criteria} ${hasQuery ? styles.criteriaHasQuery : styles.criteriaEmpty}`}
      >
        <ISSearchBox placeholder={placeholder} />
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
        <div className={styles.body}>
          {totalCount > 0 && (
            <AISuggestion query={query} onOpenAI={handleOpenAI} />
          )}
          <SearchHits
            items={items}
            totalCount={totalCount}
            language={currentLanguage}
            groupMap={groupMap}
          />
          {totalCount > 0 && (
            <div className={styles.feedbackBar}>
              <span className={styles.feedbackText}>
                没有找到您查询的内容？
              </span>
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
          {/* Algolia 分页最多支持 1000 条结果（paginationLimitedTo 默认值），
              超出部分无法翻页访问，但 facet counts 显示的是真实总数，两者可能不一致 */}
          {totalCount > 0 && <Pagination />}
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

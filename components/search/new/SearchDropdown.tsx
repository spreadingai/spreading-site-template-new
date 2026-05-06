import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { algoliasearch } from "algoliasearch";
import "instantsearch.css/themes/satellite.css";
import {
  Configure,
  InstantSearch,
  SearchBox as ISSearchBox,
  useHits,
  useInstantSearch,
  useSearchBox,
} from "react-instantsearch";
import DocTypeTabs from "./DocTypeTabs";
import SearchHits from "./SearchHits";
import AISuggestion from "./AISuggestion";
import SearchHistory, { addSearchHistory } from "./SearchHistory";
import { getPlaceholder, buildGroupMap } from "./facetMapping";
import type { AlgoliaHit } from "./SearchHitItem";
import useLanguage from "@/components/hooks/useLanguage";
import type { InstanceGroup } from "@/lib/types";
import styles from "./searchDropdown.module.scss";

// --- Algolia 配置（与 search page 共用） ---

// attributesToRetrieve：接口返回哪些字段。
// 即「响应里能看到什么」，不在列表里的字段不会出现在 hit 对象中。
// 比如不需要 content 全文，就不列进来，减少传输量。
const ATTRIBUTES_TO_RETRIEVE = [
  "hierarchy.lvl0",
  "hierarchy.lvl1",
  "hierarchy.lvl2",
  "hierarchy.lvl3",
  "hierarchy.lvl4",
  "hierarchy.lvl5",
  "hierarchy.lvl6",
  "type",
  "url",
  "doctype",
  "group",
  "platform",
];

// attributesToSnippet：对指定字段返回截断摘要（snippet）。
// 格式为 "字段名:字数"，比如 "content:30" 表示 content 最多返回 30 个词的摘要。
// 匹配部分会用 <mark> 标签包裹，超出部分用 snippetEllipsisText 替代。
// 结果通过 hit._snippetResult.字段名.value 获取。
const ATTRIBUTES_TO_SNIPPET = [
  "hierarchy.lvl1:10",
  "hierarchy.lvl2:10",
  "hierarchy.lvl3:10",
  "hierarchy.lvl4:10",
  "hierarchy.lvl5:10",
  "hierarchy.lvl6:10",
  "content:30",
];

// restrictSearchableAttributes：限制只在哪些字段中搜索/匹配关键词。
// 即「去哪里找」，不在列表里的字段即使包含关键词也不会被匹配到。
// 比如不希望搜 url、doctype 等元数据字段，就只列 hierarchy 和 content。
const RESTRICT_SEARCHABLE_ATTRIBUTES = [
  "content",
  "hierarchy.lvl1",
  "hierarchy.lvl2",
  "hierarchy.lvl3",
  "hierarchy.lvl4",
  "hierarchy.lvl5",
  "hierarchy.lvl6",
];

const ALGOLIA_CONFIG = {
  en: {
    appId: "N61JOMLMAK",
    apiKey: "cc55591748c47b1e5e24d363cdf1d5eb",
    indexName: "zegocloud",
  },
  zh: {
    appId: "OHAH1GCXFR",
    apiKey: "edb39b8b663b032fb3821ffceee85cfa",
    indexName: "zh-zego",
  },
} as const;

// --- 内部组件：面板内容（必须在 InstantSearch 内部） ---
interface DropdownContentProps {
  language: string;
  groupMap: GroupMap;
  indexName: string;
  currentGroup?: string;
  currentPlatform?: string;
  onOpenAI?: (message?: string) => void;
}

type GroupMap = Map<string, string>;

const DropdownContent: React.FC<DropdownContentProps> = ({
  language,
  groupMap,
  indexName,
  currentGroup,
  currentPlatform,
  onOpenAI,
}) => {
  const { query, refine } = useSearchBox();
  const hasQuery = !!query && query.trim().length > 0;
  const { results, status } = useInstantSearch();
  const { items } = useHits<AlgoliaHit>();
  const totalCount = results?.nbHits ?? 0;
  const loading = status === "loading" || status === "stalled";

  // 输入停顿 800ms 后且有搜索结果时保存历史
  React.useEffect(() => {
    if (!hasQuery || !query.trim()) return;
    const timer = setTimeout(() => {
      if (totalCount > 0) {
        addSearchHistory(query);
      }
    }, 800);
    return () => clearTimeout(timer);
  }, [query, hasQuery, totalCount]);

  return (
    <div className={styles.searchDropdownPanel}>
      {!hasQuery && (
        <SearchHistory language={language} onSelect={(q) => refine(q)} />
      )}
      {hasQuery && (
        <>
          <DocTypeTabs
            language={language}
            showViewMore
            indexName={indexName}
            variant="dropdown"
            extraParams={{ group: currentGroup, platform: currentPlatform }}
          />
          <div className={styles.scrollable}>
            <SearchHits
              items={items}
              totalCount={totalCount}
              language={language}
              groupMap={groupMap}
              variant="dropdown"
            />
          </div>
        </>
      )}
      {query && (
        <AISuggestion query={query} language={language} variant="dropdown" onOpenAI={onOpenAI} />
      )}
    </div>
  );
};

// --- 搜索框包装：根据 query 状态切换样式，回车跳转 search 页面 ---
const SearchBoxWrap: React.FC<{
  placeholder: string;
  queryHook: (query: string, search: (q: string) => void) => void;
  onFocus: () => void;
  indexName: string;
  extraParams?: {
    group?: string;
    platform?: string;
  };
  isOpen: boolean;
}> = ({ placeholder, queryHook, onFocus, indexName, extraParams, isOpen }) => {
  const { query } = useSearchBox();

  const buildSearchUrl = () => {
    const prefix = indexName || "";
    const params = new URLSearchParams();
    if (query) params.set(`${prefix}[query]`, query);
    if (extraParams?.group)
      params.set(`${prefix}[menu][group]`, extraParams.group);
    if (extraParams?.platform)
      params.set(`${prefix}[menu][platform]`, extraParams.platform);
    const qs = params.toString();
    return `/search${qs ? `?${qs}` : ""}`;
  };

  // const handleKeyDown = (e: React.KeyboardEvent) => {
  //   if (e.key !== "Enter" || !query.trim()) return;
  //   e.preventDefault();
  //   window.open(buildSearchUrl(), "_blank");
  // };

  const handleAfterClick = () => {
    window.open(buildSearchUrl(), "_blank");
  };

  return (
    <div
      className={`${styles.searchBoxWrap} ${
        isOpen ? styles.searchBoxWrapExpand : ""
      }`}
      // onKeyDown={handleKeyDown}
    >
      <ISSearchBox
        placeholder={placeholder}
        queryHook={queryHook}
        onFocus={onFocus}
      />
      <button
        type="button"
        className={styles.searchBoxAfterBtn}
        onClick={handleAfterClick}
      />
    </div>
  );
};

// --- 主组件 ---
interface Props {
  instanceGroups?: InstanceGroup[];
  currentGroup?: string;
  currentPlatform?: string;
}

const SearchDropdown: React.FC<Props> = ({
  instanceGroups = [],
  currentGroup = "",
  currentPlatform = "",
}) => {
  const { currentLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const lang = currentLanguage === "zh" ? "zh" : "en";
  const { appId, apiKey, indexName } = ALGOLIA_CONFIG[lang];
  const searchClient = useMemo(
    () => algoliasearch(appId, apiKey),
    [appId, apiKey],
  );
  const groupMap = useMemo(
    () => buildGroupMap(instanceGroups),
    [instanceGroups],
  );

  // facetFilters: 按 group 和 platform 过滤
  const facetFilters = useMemo(() => {
    const filters: string[] = [];
    if (currentGroup) filters.push(`group:${currentGroup}`);
    if (currentPlatform) filters.push(`platform:${currentPlatform}`);
    return filters.length > 0 ? filters : undefined;
  }, [currentGroup, currentPlatform]);

  // debounce queryHook：减少中间态查询
  const queryHook = useCallback(
    (() => {
      let timer: ReturnType<typeof setTimeout> | null = null;
      return (query: string, search: (q: string) => void) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => search(query), 400);
      };
    })(),
    [],
  );

  // 点击外部关闭
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOpenAI = useCallback((message?: string) => {
    setIsOpen(false);
    window.dispatchEvent(new CustomEvent("open-ask-ai", { detail: { message } }));
  }, []);

  return (
    <div className={styles.searchDropdowncontainer} ref={containerRef}>
      <InstantSearch
        key={lang}
        searchClient={searchClient}
        indexName={indexName}
        future={{ preserveSharedStateOnUnmount: true }}
      >
        <Configure
          hitsPerPage={5}
          restrictSearchableAttributes={RESTRICT_SEARCHABLE_ATTRIBUTES}
          attributesToRetrieve={ATTRIBUTES_TO_RETRIEVE}
          attributesToSnippet={ATTRIBUTES_TO_SNIPPET}
          snippetEllipsisText="…"
          highlightPreTag="<mark>"
          highlightPostTag="</mark>"
          clickAnalytics={false}
          analytics={false}
          facetFilters={facetFilters}
        />
        <SearchBoxWrap
          placeholder={getPlaceholder(currentLanguage, "dropdown")}
          queryHook={queryHook}
          onFocus={() => setIsOpen(true)}
          indexName={indexName}
          extraParams={{ group: currentGroup, platform: currentPlatform }}
          isOpen={isOpen}
        />
        <div
          className={`${styles.dropdownPanel} ${isOpen ? styles.dropdownPanelVisible : ""}`}
        >
          <DropdownContent
            language={currentLanguage}
            groupMap={groupMap}
            indexName={indexName}
            currentGroup={currentGroup}
            currentPlatform={currentPlatform}
            onOpenAI={handleOpenAI}
          />
        </div>
      </InstantSearch>
    </div>
  );
};

export default SearchDropdown;

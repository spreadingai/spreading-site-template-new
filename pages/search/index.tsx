import React, { useMemo } from "react";
import { algoliasearch } from "algoliasearch";
import { InstantSearch, Configure } from "react-instantsearch";
import SearchLayout from "@/components/search/new/layout";
import SearchPageClient from "@/components/search/new/SearchPageClient";
import useLanguage from "@/components/hooks/useLanguage";
import LibControllerImpl from "@/lib/index";

export const getStaticProps = () => {
  const inputDocuoConfig = LibControllerImpl.getDocuoConfig();
  return {
    props: {
      inputDocuoConfig,
    },
  };
};

// facets 不在此处声明，由 useRefinementList hook 自动管理（disjunctive faceting）

// 注意：不 retrieve 完整 content 字段（可能上万字），只用 _snippetResult.content 片段即可
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
const ATTRIBUTES_TO_SNIPPET = [
  "hierarchy.lvl1:30",
  "hierarchy.lvl2:30",
  "hierarchy.lvl3:30",
  "hierarchy.lvl4:30",
  "hierarchy.lvl5:30",
  "hierarchy.lvl6:30",
  "content:120",
];
// 限制 Algolia 只在可见字段中搜索
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

export default function SearchPage({
  inputDocuoConfig,
}: {
  inputDocuoConfig: any;
}) {
  const { currentLanguage } = useLanguage();
  const { appId, apiKey, indexName } =
    ALGOLIA_CONFIG[currentLanguage === "zh" ? "zh" : "en"];
  const searchClient = useMemo(
    () => algoliasearch(appId, apiKey),
    [appId, apiKey],
  );

  return (
    <div id="search-page">
      <InstantSearch
        key={currentLanguage}
        searchClient={searchClient}
        indexName={indexName}
        routing={true}
        future={{ preserveSharedStateOnUnmount: true }}
      >
        <Configure
          hitsPerPage={10}
          restrictSearchableAttributes={RESTRICT_SEARCHABLE_ATTRIBUTES}
          attributesToRetrieve={ATTRIBUTES_TO_RETRIEVE}
          attributesToSnippet={ATTRIBUTES_TO_SNIPPET}
          snippetEllipsisText="…"
          highlightPreTag="<mark>"
          highlightPostTag="</mark>"
          clickAnalytics={false}
          analytics={false}
        />
        <SearchPageClient
          instanceGroups={inputDocuoConfig?.themeConfig?.instanceGroups || []}
        />
      </InstantSearch>
    </div>
  );
}

SearchPage.getLayout = function getLayout(page, pageProps) {
  return <SearchLayout {...pageProps}>{page}</SearchLayout>;
};

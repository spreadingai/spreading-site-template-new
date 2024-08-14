import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import algoliasearch from "algoliasearch";
import {
  InstantSearch,
  SearchBox,
  Hits,
  Pagination,
  Configure,
  // @ts-ignore
} from "react-instantsearch";
import CustomHit from "@/components/search/CustomHit";
import Layout from "@/components/search/layout";
import "instantsearch.css/themes/satellite.css";

const searchClient = algoliasearch(
  "N61JOMLMAK",
  "cc55591748c47b1e5e24d363cdf1d5eb"
);

export const getStaticProps = () => {
  return {
    props: {
      slug: "test",
    },
  };
};

export default function Search({ slug }) {
  return (
    <InstantSearch searchClient={searchClient} indexName="zegocloud">
      <Configure
        snippetEllipsisText="…"
        highlightPreTag="<mark>"
        highlightPostTag="</mark>"
        // hitsPerPage={20}
        clickAnalytics={false}
        attributesToRetrieve={[
          "hierarchy.lvl0",
          "hierarchy.lvl1",
          "hierarchy.lvl2",
          "hierarchy.lvl3",
          "hierarchy.lvl4",
          "hierarchy.lvl5",
          "hierarchy.lvl6",
          "content",
          "type",
          "url",
        ]}
        attributesToSnippet={[
          "hierarchy.lvl1:5",
          "hierarchy.lvl2:5",
          "hierarchy.lvl3:5",
          "hierarchy.lvl4:5",
          "hierarchy.lvl5:5",
          "hierarchy.lvl6:5",
          "content:5",
        ]}
        facetFilters={[
          `version:${"next"}`,
          `instance:${"callkit_android"}`,
          `language:${"English"}`,
        ]}
      />
      <SearchBox />
      <Hits hitComponent={CustomHit} />
      <Pagination />
    </InstantSearch>
  );
}

Search.getLayout = function getLayout(page, pageProps) {
  return <Layout {...pageProps}>{page}</Layout>;
};

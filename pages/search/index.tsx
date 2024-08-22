// Warning: Not compatible with previous versions of navigationInfo
import React from "react";
import { Dropdown } from "antd";
import algoliasearch from "algoliasearch";
import {
  InstantSearch,
  SearchBox,
  Hits,
  Pagination,
  Configure,
} from "react-instantsearch";
import CustomHit from "@/components/search/CustomHit";
import Layout from "@/components/search/layout";
import "instantsearch.css/themes/satellite.css";
import VersionsControllerImpl from "@/lib/versions-help";
import useGroup from "@/components/hooks/useGroup";
import usePlatform from "@/components/hooks/usePlatform";
import useVersion from "@/components/hooks/useVersion";
import useSet from "@/components/hooks/useSet";
import IconLanguageNorLight from "@/assets/icons/header/icon_language_nor_light.svg";
import IconLanguageNorDark from "@/assets/icons/header/icon_language_nor_dark.svg";
import styles from "@/components/header/ThemeSwitch.module.scss";

const searchClient = algoliasearch(
  "N61JOMLMAK",
  "cc55591748c47b1e5e24d363cdf1d5eb"
);

interface SearchPageProps {}

export const getStaticProps = (props) => {
  const allUsedVersions = VersionsControllerImpl.getAllUsedVersions();
  return {
    props: {
      allUsedVersions,
    },
  };
};

const SearchSelectWrap = (props: SearchPageProps) => {
  const { handleGroupChanged, handlePlatformChanged, handleVersionChanged } =
    useSet();
  const { currentGroup, displayGroups, setCurrentGroup, setCurrentGroupLabel } =
    useGroup();
  const { currentPlatform, displayPlatforms } = usePlatform();
  const { docVersion, slugVersion, displayVersions } = useVersion();

  // groups
  const groupsItems = displayGroups.map((item) => ({
    key: item.group,
    label: <span>{item.groupLabel}</span>,
    className: `${styles.modeItem} ${
      item.group === currentGroup ? styles.active : ""
    }`,
  }));

  // platforms
  const platformsItems = displayPlatforms.map((item) => ({
    key: item.platform,
    label: <span>{item.platformLabel}</span>,
    className: `${styles.modeItem} ${
      item.platform === currentPlatform ? styles.active : ""
    }`,
  }));

  // versions
  const versionsItems = displayVersions.map((item) => ({
    key: item.version,
    label: <span>{item.version}</span>,
    className: `${styles.modeItem} ${
      item.version === docVersion ? styles.active : ""
    }`,
  }));

  return (
    <div className="search-select-wrap">
      <Dropdown
        trigger={["click"]}
        menu={{
          items: groupsItems,
          className: styles.languageWrapper,
          onClick: handleGroupChanged,
        }}
        placement="bottomRight"
      >
        <button className={styles.toggleButton}>
          <IconLanguageNorLight className={styles.lightToggleIcon} />
          <IconLanguageNorDark className={styles.darkToggleIcon} />
        </button>
      </Dropdown>
      <Dropdown
        trigger={["click"]}
        menu={{
          items: platformsItems,
          className: styles.languageWrapper,
          onClick: handlePlatformChanged,
        }}
        placement="bottomRight"
      >
        <button className={styles.toggleButton}>
          <IconLanguageNorLight className={styles.lightToggleIcon} />
          <IconLanguageNorDark className={styles.darkToggleIcon} />
        </button>
      </Dropdown>
      <Dropdown
        trigger={["click"]}
        menu={{
          items: versionsItems,
          className: styles.languageWrapper,
          onClick: handleVersionChanged,
        }}
        placement="bottomRight"
      >
        <button className={styles.toggleButton}>
          <IconLanguageNorLight className={styles.lightToggleIcon} />
          <IconLanguageNorDark className={styles.darkToggleIcon} />
        </button>
      </Dropdown>
    </div>
  );
};

export default function SearchPage(props: SearchPageProps) {
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
      <div className="search-box-wrap">
        <SearchBox />
      </div>
      <SearchSelectWrap {...props} />
      <Hits hitComponent={CustomHit} />
      <Pagination />
    </InstantSearch>
  );
}

SearchPage.getLayout = function getLayout(page, pageProps) {
  return <Layout {...pageProps}>{page}</Layout>;
};

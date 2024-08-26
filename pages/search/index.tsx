// Warning: Not compatible with previous versions of navigationInfo
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import algoliasearch from "algoliasearch";
import {
  InstantSearch,
  // SearchBox,
  Hits,
  Pagination,
  Configure,
  useSearchBox,
  useInstantSearch,
} from "react-instantsearch";
import CustomHit from "@/components/search/CustomHit";
import Layout from "@/components/search/layout";
import "instantsearch.css/themes/satellite.css";
import VersionsControllerImpl from "@/lib/versions-help";
import useGroup from "@/components/hooks/useGroup";
import usePlatform from "@/components/hooks/usePlatform";
import useVersion from "@/components/hooks/useVersion";
import useLanguage from "@/components/hooks/useLanguage";
import useInstance from "@/components/hooks/useInstance";
import useSet from "@/components/hooks/useSet";
import styles from "@/components/search/index.module.scss";
import { useRouter } from "next/router";
import { Input, Select, Tabs } from "antd";
import useDocType from "@/components/hooks/useDocType";
import {
  defaultDocTypes,
  defaultDocType,
  defaultDocTypeLabel,
  DocTypeContext,
  allDocTypeItem,
} from "@/components/context/docTypeContext";
import { copywriting } from "@/components/constant/language";
import { allPlatformItem } from "@/components/context/platformContext";
import { allGroupItem } from "@/components/context/groupContext";

const searchClient = algoliasearch(
  "N61JOMLMAK",
  "cc55591748c47b1e5e24d363cdf1d5eb"
);

interface TargetInfo {
  language?: string;
  type?: string;
  group?: string;
  platform?: string;
  version?: string;
}
interface SearchSelectProps {
  targetInfo: null | TargetInfo;
}

export const getStaticProps = (props) => {
  const allUsedVersions = VersionsControllerImpl.getAllUsedVersions();
  return {
    props: {
      allUsedVersions,
    },
  };
};

const SearchSelectWrap = (props: SearchSelectProps) => {
  const { targetInfo } = props;
  const { handlePlatformChanged, handleVersionChanged, initSelect } = useSet();
  const { currentPlatform, displayPlatforms } = usePlatform();
  const { docVersion, slugVersion, displayVersions } = useVersion();
  const {
    currentDocType,
    currentDocTypeLabel,
    docTypes,
    setCurrentDocType,
    setCurrentDocTypeLabel,
  } = useDocType();

  // doc types
  const addDocTypeAllItem = useCallback((docTypes) => {
    return [{ ...allDocTypeItem }, ...docTypes];
  }, []);
  const handleDocTypeChanged = useCallback(
    ({ key: docType }) => {
      const target = addDocTypeAllItem(docTypes).find(
        (item) => item.key === docType
      );
      setCurrentDocType(docType);
      setCurrentDocTypeLabel(target.label);
    },
    [docTypes, addDocTypeAllItem, setCurrentDocType, setCurrentDocTypeLabel]
  );
  const DocTypeListView = useMemo(() => {
    const docTypesItems = addDocTypeAllItem(docTypes).map((item) => {
      return {
        key: item.key,
        label: item.label,
      };
    });
    return (
      <div className={styles.docTypeList}>
        <Tabs
          defaultActiveKey={currentDocType}
          items={docTypesItems}
          onChange={(activeKey: string) => {
            handleDocTypeChanged({ key: activeKey });
          }}
        />
      </div>
    );
  }, [currentDocType, docTypes, addDocTypeAllItem, handleDocTypeChanged]);

  // platforms
  const addPlatformAllItem = useCallback((displayPlatforms) => {
    return [{ ...allPlatformItem }, ...displayPlatforms];
  }, []);
  const PlatformListView = useMemo(() => {
    const platformsItems = addPlatformAllItem(displayPlatforms).map((item) => ({
      value: item.platform,
      label: item.platformLabel,
    }));
    return (
      <div className={styles.platformList}>
        {platformsItems.map((platformsItem) => {
          return (
            <div
              className={`${styles.platformItem} ${
                platformsItem.value === currentPlatform ? styles.active : ""
              }`}
              key={platformsItem.value}
            >
              <button
                onClick={() => {
                  handlePlatformChanged({ key: platformsItem.value });
                }}
              >
                {platformsItem.label}
              </button>
            </div>
          );
        })}
      </div>
    );
  }, [
    currentPlatform,
    displayPlatforms,
    addPlatformAllItem,
    handlePlatformChanged,
  ]);

  // versions
  const VersionListView = useMemo(() => {
    const versionsItems = displayVersions.map((item) => ({
      value: item.version,
      label: item.version,
    }));
    return (
      <Select
        defaultValue={docVersion}
        value={docVersion}
        style={{ width: 100 }}
        onChange={(value) => {
          handleVersionChanged({ key: value });
        }}
        options={versionsItems}
      />
    );
  }, [docVersion, displayVersions, handleVersionChanged]);

  initSelect(targetInfo);

  return (
    <div className={styles.searchSelectWrap}>
      {DocTypeListView}
      <div className={styles.platformAndVersionWrap}>
        {PlatformListView}
        {VersionListView}
      </div>
    </div>
  );
};

const SearchBoxWrap = (props) => {
  const { handleGroupChanged } = useSet();
  const { currentLanguage } = useLanguage();
  const { currentGroup, displayGroups } = useGroup();
  const { searchKey } = props;
  const { query, refine } = useSearchBox(props);
  const { status } = useInstantSearch();
  const [inputValue, setInputValue] = useState(query);
  const inputRef = useRef(null);
  const isSearchStalled = status === "stalled";

  console.log("[SearchBoxWrap]", searchKey, query, isSearchStalled);

  const setQuery = useCallback(
    (newQuery) => {
      setInputValue(newQuery);
      refine(newQuery);
    },
    [refine]
  );
  const handleChange = useCallback(
    (event) => {
      setQuery(event.currentTarget.value);
    },
    [setQuery]
  );
  const handleClear = useCallback(() => {}, []);
  const handlePressEnter = useCallback(() => {}, []);

  // groups
  const addGroupAllItem = useCallback((displayGroups) => {
    return [{ ...allGroupItem }, ...displayGroups];
  }, []);
  const GroupListView = useMemo(() => {
    const groupsItems = addGroupAllItem(displayGroups).map((item) => ({
      value: item.group,
      label: item.groupLabel,
    }));
    return (
      <Select
        className={styles.groupSelect}
        defaultValue={currentGroup}
        value={currentGroup}
        style={{ width: 300 }}
        onChange={(value) => {
          handleGroupChanged({ key: value });
        }}
        options={groupsItems}
      />
    );
  }, [currentGroup, displayGroups, addGroupAllItem, handleGroupChanged]);

  useEffect(() => {
    setQuery(searchKey || "");
  }, [searchKey, setQuery]);

  return (
    <div className={styles.searchBoxWrap}>
      <Input
        className={styles.searchInput}
        allowClear
        onChange={handleChange}
        onClear={handleClear}
        onPressEnter={handlePressEnter}
        ref={inputRef}
        value={inputValue}
        placeholder={copywriting[currentLanguage].search.placeholder}
      />
      {GroupListView}
    </div>
  );
};

export default function SearchPage(props) {
  const router = useRouter();
  const [searchKey, setSearchKey] = useState("");
  const [targetInfo, setTargetInfo] = useState<TargetInfo>(null);
  const { currentLanguageLabel } = useLanguage();
  const { instanceID } = useInstance();
  // const { currentGroupLabel } = useGroup();
  // const { currentPlatformLabel } = usePlatform();
  const { docVersion, slugVersion } = useVersion();
  const [currentDocType, setCurrentDocType] = useState(defaultDocType);
  const [currentDocTypeLabel, setCurrentDocTypeLabel] =
    useState(defaultDocTypeLabel);

  useEffect(() => {
    if (router.isReady) {
      // k, group, type, platform, version
      const { k, language, group, type, platform, version } = router.query;
      setSearchKey((k as string) || "");
      setTargetInfo({
        language: language as string,
        type: type as string,
        group: group as string,
        platform: platform as string,
        version: version as string,
      });
    }
  }, [router.isReady, router.query]);

  return (
    <div id="search-page">
      <DocTypeContext.Provider
        value={{
          currentDocType,
          currentDocTypeLabel,
          docTypes: defaultDocTypes,
          setCurrentDocType,
          setCurrentDocTypeLabel,
        }}
      >
        <InstantSearch searchClient={searchClient} indexName="zegocloud">
          <Configure
            snippetEllipsisText="…"
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
              `version:${docVersion}`,
              `instance:${instanceID}`, // The previous versions of navigationInfo
              // `group:${currentGroupLabel}`, // The later versions of navigationInfo
              `language:${currentLanguageLabel}`,
              // `platform:${currentPlatformLabel}`, // The later versions of navigationInfo
              // `doctype:${currentDocTypeLabel}`, // The later versions of navigationInfo
            ]}
          />
          <div className={styles.searchCriteria}>
            {/* <SearchBox /> */}
            <SearchBoxWrap searchKey={searchKey} />
            <SearchSelectWrap {...props} targetInfo={targetInfo} />
          </div>
          <div className={styles.hitWrap}>
            <Hits hitComponent={CustomHit} />
          </div>
          <div className={styles.paginationWrap}>
            <Pagination />
          </div>
        </InstantSearch>
      </DocTypeContext.Provider>
    </div>
  );
}

SearchPage.getLayout = function getLayout(page, pageProps) {
  return <Layout {...pageProps}>{page}</Layout>;
};

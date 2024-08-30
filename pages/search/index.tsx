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
  usePagination,
  useConfigure,
  useHits,
  PoweredBy,
  Index,
} from "react-instantsearch";
import CustomHit from "@/components/search/CustomHit";
import Layout from "@/components/search/layout";
import "instantsearch.css/themes/satellite.css";
import VersionsControllerImpl from "@/lib/versions-help";
import GroupControllerImpl from "@/lib/client/group-help";
import PlatformControllerImpl from "@/lib/client/platform-help";
import useGroup from "@/components/hooks/useGroup";
import usePlatform from "@/components/hooks/usePlatform";
import useVersion from "@/components/hooks/useVersion";
import useLanguage from "@/components/hooks/useLanguage";
import useInstance from "@/components/hooks/useInstance";
import useSet from "@/components/hooks/useSet";
import styles from "@/components/search/index.module.scss";
import { useRouter } from "next/router";
import { Input, Select, Tabs, Spin } from "antd";
import useDocType from "@/components/hooks/useDocType";
import {
  defaultDocTypes,
  defaultDocType,
  defaultDocTypeLabel,
  DocTypeContext,
  allDocTypeItem,
} from "@/components/context/docTypeContext";
import { copywriting } from "@/components/constant/language";
import { DEFAULT_CURRENT_SLUG_VERSION } from "@/lib/constants";
import { allGroupItem } from "@/components/context/groupContext";
import { allPlatformItem } from "@/components/context/platformContext";

const searchClient = algoliasearch(
  "N61JOMLMAK",
  "cc55591748c47b1e5e24d363cdf1d5eb"
);

const ignoreStr = "docuoignoreinitsearch";

const isNumber = (value: any) => {
  return !isNaN(parseFloat(value)) && isFinite(value);
};

export const getStaticProps = (props) => {
  const allUsedVersions = VersionsControllerImpl.getAllUsedVersions();
  return {
    props: {
      allUsedVersions,
    },
  };
};

const SearchSelectWrap = (props) => {
  const { searchKey, changeKey, setChangeKey } = props;
  const { handlePlatformChanged, handleVersionChanged } = useSet();
  const { currentPlatform, displayPlatforms } = usePlatform();
  const { docVersion, slugVersion, displayVersions } = useVersion();
  const {
    currentDocType,
    currentDocTypeLabel,
    docTypes,
    setCurrentDocType,
    setCurrentDocTypeLabel,
  } = useDocType();
  const { results } = useHits();
  const { facets, nbHits } = results;

  // doc types
  const handleDocTypeChanged = useCallback(
    ({ key: docType, initChild }) => {
      const target = docTypes.find((item) => item.key === docType);
      setCurrentDocType(docType);
      setCurrentDocTypeLabel(target.label);
      setChangeKey("doctype");
      handlePlatformChanged({ key: "all", initChild: true });
    },
    [
      docTypes,
      handlePlatformChanged,
      setChangeKey,
      setCurrentDocType,
      setCurrentDocTypeLabel,
    ]
  );
  // const DocTypeListView = useMemo(() => {
  //   const docTypesItems = docTypes.map((item) => {
  //     return {
  //       key: item.key,
  //       label: item.label,
  //     };
  //   });
  //   return (
  //     <div className={styles.docTypeList}>
  //       <Tabs
  //         rootClassName="doc-type-tab"
  //         defaultActiveKey={currentDocType}
  //         items={docTypesItems}
  //         onChange={(activeKey: string) => {
  //           handleDocTypeChanged({ key: activeKey });
  //         }}
  //       />
  //     </div>
  //   );
  // }, [currentDocType, docTypes, handleDocTypeChanged]);
  const DynamicDocTypeListView = useMemo(() => {
    console.log("[SearchSelectWrap] DynamicDocTypeListView", changeKey, {
      ...facets,
    });
    let searchCountData;
    if (
      (changeKey === "doctype" || changeKey === "platform") &&
      sessionStorage.getItem("doctype-search-cache")
    ) {
      searchCountData = JSON.parse(
        sessionStorage.getItem("doctype-search-cache")
      );
      // currentDocType !== "all" &&
      //   (searchCountData.data[currentDocType] = nbHits);
    } else {
      searchCountData = facets.find((item) => item.name === "doctype");
    }
    let menuItems = [];
    if (searchCountData && searchCountData.data) {
      const keys = Object.keys(searchCountData.data);
      let total = 0;
      // let total = nbHits;
      keys.forEach((key) => {
        if (isNumber(searchCountData.data[key])) {
          const target = docTypes.find((item) => item.key === key);
          menuItems.push({
            key: key,
            label:
              (target ? target.key : key) + `(${searchCountData.data[key]})`,
          });
          total += searchCountData.data[key];
        }
      });
      menuItems.unshift({
        key: allDocTypeItem.key,
        label: allDocTypeItem.label + `(${total})`,
      });
    }
    return (
      <div className={styles.docTypeList}>
        {menuItems.length ? (
          <Tabs
            rootClassName="doc-type-tab"
            defaultActiveKey={currentDocType}
            items={menuItems}
            onChange={(activeKey: string) => {
              handleDocTypeChanged({ key: activeKey, initChild: true });
            }}
          />
        ) : null}
      </div>
    );
  }, [changeKey, currentDocType, docTypes, facets, handleDocTypeChanged]);

  // platforms
  // const PlatformListView = useMemo(() => {
  //   const platformsItems = displayPlatforms.map((item) => ({
  //     value: item.platform,
  //     label: item.platformLabel,
  //   }));
  //   return (
  //     <div className={styles.platformList}>
  //       {platformsItems.map((platformsItem) => {
  //         return (
  //           <div
  //             className={`${styles.platformItem} ${
  //               platformsItem.value === currentPlatform ? styles.active : ""
  //             }`}
  //             key={platformsItem.value}
  //             onClick={() => {
  //               handlePlatformChanged({ key: platformsItem.value, initChild: true });
  //             }}
  //           >
  //             {platformsItem.label}
  //           </div>
  //         );
  //       })}
  //     </div>
  //   );
  // }, [currentPlatform, displayPlatforms, handlePlatformChanged]);
  const DynamicPlatformListView = useMemo(() => {
    console.log("[SearchSelectWrap] DynamicPlatformListView", changeKey, {
      ...facets,
    });
    let searchCountData;
    if (
      changeKey === "platform" &&
      sessionStorage.getItem("platform-search-cache")
    ) {
      searchCountData = JSON.parse(
        sessionStorage.getItem("platform-search-cache")
      );
    } else {
      searchCountData = facets.find((item) => item.name === "platform");
    }
    let menuItems = [];
    if (searchCountData && searchCountData.data) {
      const keys = Object.keys(searchCountData.data);
      let total = 0;
      // let total = nbHits;
      keys.forEach((key) => {
        if (isNumber(searchCountData.data[key])) {
          const target = PlatformControllerImpl.getDisplayPlatform(
            key,
            displayPlatforms
          );
          menuItems.push({
            value: key,
            label:
              (target ? target.platformLabel : key) +
              `(${searchCountData.data[key]})`,
          });
          total += searchCountData.data[key];
        }
      });
      menuItems.unshift({
        value: allPlatformItem.platform,
        label: allPlatformItem.platformLabel + `(${total})`,
      });
    }
    return (
      <div className={styles.platformList}>
        {menuItems.map((platformsItem) => {
          return (
            <div
              className={`${styles.platformItem} ${
                platformsItem.value === currentPlatform ? styles.active : ""
              }`}
              key={platformsItem.value}
              onClick={() => {
                // if (platformsItem.value === "all") {
                //   sessionStorage.removeItem("platform-search-cache");
                // }
                setChangeKey("platform");
                handlePlatformChanged({
                  key: platformsItem.value,
                  initChild: true,
                });
              }}
            >
              {platformsItem.label}
            </div>
          );
        })}
      </div>
    );
  }, [
    changeKey,
    facets,
    displayPlatforms,
    currentPlatform,
    setChangeKey,
    handlePlatformChanged,
  ]);

  // versions
  // const VersionListView = useMemo(() => {
  //   const versionsItems = displayVersions.map((item) => ({
  //     value: item.version,
  //     label: item.version,
  //   }));
  //   return versionsItems.length === 1 &&
  //     versionsItems[0].value === DEFAULT_CURRENT_SLUG_VERSION ? null : (
  //     <Select
  //       className="version-select"
  //       popupClassName="version-select-popup"
  //       defaultValue={docVersion}
  //       value={docVersion}
  //       onChange={(value) => {
  //         handleVersionChanged({ key: value, initChild: true });
  //       }}
  //       options={versionsItems}
  //     />
  //   );
  // }, [docVersion, displayVersions, handleVersionChanged]);
  const DynamicVersionListView = useMemo(() => {
    console.log("[SearchSelectWrap] DynamicVersionListView", changeKey, {
      ...facets,
    });
    const searchCountData = facets.find((item) => item.name === "version");
    let menuItems = [];
    if (searchCountData && searchCountData.data) {
      const keys = Object.keys(searchCountData.data);
      let total = 0;
      keys.forEach((key) => {
        if (isNumber(searchCountData.data[key])) {
          menuItems.push({
            value: key,
            label: key + `(${searchCountData.data[key]})`,
          });
          total += searchCountData.data[key];
        }
      });
    }
    return (
      <>
        {!menuItems.length ||
        (menuItems.length === 1 &&
          menuItems[0].value === DEFAULT_CURRENT_SLUG_VERSION) ? null : (
          <Select
            className="version-select"
            popupClassName="version-select-popup"
            defaultValue={docVersion}
            value={docVersion}
            onChange={(value) => {
              setChangeKey("version");
              handleVersionChanged({ key: value, initChild: true });
            }}
            options={menuItems}
          />
        )}
      </>
    );
  }, [changeKey, docVersion, facets, handleVersionChanged, setChangeKey]);

  return (
    <div className={styles.searchSelectWrap}>
      {/* {DocTypeListView} */}
      {searchKey ? DynamicDocTypeListView : null}
      <div className={styles.platformAndVersionWrap}>
        {/* {PlatformListView} */}
        {searchKey ? DynamicPlatformListView : null}
        {/* {VersionListView} */}
        {searchKey ? DynamicVersionListView : null}
      </div>
    </div>
  );
};

const SearchBoxWrap = (props) => {
  const { handleGroupChanged } = useSet();
  const { currentLanguage } = useLanguage();
  const { currentGroup, displayGroups } = useGroup();
  const { currentPlatform } = usePlatform();
  const { currentDocType } = useDocType();
  const { searchKey, setSearchKey, changeKey, setChangeKey } = props;
  const { status } = useInstantSearch();
  const { query, refine } = useSearchBox();
  const [inputValue, setInputValue] = useState(query);
  const inputRef = useRef(null);
  const { results } = useHits();
  const { facets, nbHits } = results;

  console.log("[SearchBoxWrap] query", query);
  console.log("[SearchBoxWrap] results", results);

  const setQuery = useCallback(
    (newQuery) => {
      setSearchKey(newQuery);
      setInputValue(newQuery);
      newQuery && refine(newQuery);
      setChangeKey("searchKey");
    },
    [refine, setChangeKey, setSearchKey]
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
  // const GroupListView = useMemo(() => {
  //   const groupsItems = displayGroups.map((item) => ({
  //     value: item.group,
  //     label: item.groupLabel,
  //   }));
  //   return (
  //     <Select
  //       className="group-select"
  //       popupClassName="group-select-popup"
  //       defaultValue={currentGroup}
  //       value={currentGroup}
  //       onChange={(value) => {
  //         handleGroupChanged({ key: value, initChild: true });
  //       }}
  //       options={groupsItems}
  //     />
  //   );
  // }, [currentGroup, displayGroups, handleGroupChanged]);

  const DynamicGroupListView = useMemo(() => {
    console.log("[SearchBoxWrap] DynamicGroupListView", changeKey, {
      ...facets,
    });
    let searchCountData;
    if (
      (changeKey === "group" ||
        changeKey === "doctype" ||
        changeKey === "platform") &&
      sessionStorage.getItem("group-search-cache")
    ) {
      searchCountData = JSON.parse(
        sessionStorage.getItem("group-search-cache")
      );
    } else {
      searchCountData = facets.find((item) => item.name === "group");
    }
    let menuItems = [];
    if (searchCountData && searchCountData.data) {
      const keys = Object.keys(searchCountData.data);
      keys.forEach((key) => {
        if (isNumber(searchCountData.data[key])) {
          const target = GroupControllerImpl.getDisplayGroup(
            key,
            displayGroups
          );
          menuItems.push({
            value: key,
            label: target ? target.groupLabel : key,
          });
        }
      });
      menuItems.unshift({
        value: allGroupItem.group,
        label: allGroupItem.groupLabel,
      });
    }
    console.log("menuItems", menuItems, currentGroup);
    return (
      <>
        {menuItems.length ? (
          <Select
            className="group-select"
            popupClassName="group-select-popup"
            defaultValue={currentGroup}
            value={currentGroup}
            onChange={(value) => {
              setChangeKey("group");
              handleGroupChanged({ key: value, initChild: true });
            }}
            options={menuItems}
          />
        ) : null}
      </>
    );
  }, [
    changeKey,
    currentGroup,
    displayGroups,
    facets,
    handleGroupChanged,
    setChangeKey,
  ]);

  useEffect(() => {
    setQuery(searchKey || "");
  }, [searchKey, setQuery]);

  useEffect(() => {
    if (status === "idle") {
      console.log(`[SearchBoxWrap] ${changeKey} cache`, { ...facets });
      const searchGroupCountData = facets.find((item) => item.name === "group");
      const searchDoctypeCountData = facets.find(
        (item) => item.name === "doctype"
      );
      const searchPlatformCountData = facets.find(
        (item) => item.name === "platform"
      );
      if (changeKey === "searchKey") {
        if (currentGroup === "all") {
          if (searchGroupCountData) {
            sessionStorage.setItem(
              "group-search-cache",
              JSON.stringify(searchGroupCountData)
            );
          } else {
            sessionStorage.removeItem("group-search-cache");
          }
        }
        if (currentDocType === "all") {
          if (searchDoctypeCountData) {
            sessionStorage.setItem(
              "doctype-search-cache",
              JSON.stringify(searchDoctypeCountData)
            );
          } else {
            sessionStorage.removeItem("doctype-search-cache");
          }
        }
        if (currentPlatform === "all") {
          if (searchPlatformCountData) {
            sessionStorage.setItem(
              "platform-search-cache",
              JSON.stringify(searchPlatformCountData)
            );
          } else {
            sessionStorage.removeItem("platform-search-cache");
          }
        }
      } else if (changeKey === "group") {
        if (searchDoctypeCountData) {
          sessionStorage.setItem(
            "doctype-search-cache",
            JSON.stringify(searchDoctypeCountData)
          );
        } else {
          sessionStorage.removeItem("doctype-search-cache");
        }
        if (searchPlatformCountData) {
          sessionStorage.setItem(
            "platform-search-cache",
            JSON.stringify(searchPlatformCountData)
          );
        } else {
          sessionStorage.removeItem("platform-search-cache");
        }
      } else if (changeKey === "doctype") {
        if (searchPlatformCountData) {
          sessionStorage.setItem(
            "platform-search-cache",
            JSON.stringify(searchPlatformCountData)
          );
        } else {
          sessionStorage.removeItem("platform-search-cache");
        }
      }
    }
  }, [
    changeKey,
    currentDocType,
    currentGroup,
    currentPlatform,
    facets,
    status,
  ]);

  return (
    <div className={styles.searchBoxWrap}>
      <Input.Search
        loading={searchKey && status !== "idle"}
        className={styles.searchInput}
        allowClear
        onChange={handleChange}
        onClear={handleClear}
        onPressEnter={handlePressEnter}
        ref={inputRef}
        value={inputValue}
        placeholder={copywriting[currentLanguage].search.placeholder}
      />
      {/* {GroupListView} */}
      {searchKey ? DynamicGroupListView : null}
    </div>
  );
};

const HitWrap = (props) => {
  const { currentLanguage, searchKey } = props;
  // loading: The search is in progress.
  // stalled: The search is in progress, but the response is taking longer than expected.
  // error: The search failed.
  // idle: The search succeeded.
  const { status } = useInstantSearch();
  const { results } = useHits();
  const { hits } = results;
  console.log("[HitWrap] status", status);
  console.log("[HitWrap] searchKey", searchKey);

  return searchKey ? (
    <div className={styles.hitWrap}>
      <Hits hitComponent={CustomHit} />
      {/* {status !== "idle" ? (
        <div className={styles.loadingWrap}>
          <Spin className="search-loading" />
        </div>
      ) : null} */}
      {status === "idle" && !hits.length ? (
        <div className={styles.noResultsWrap}>
          <span>
            {
              copywriting[currentLanguage].search.translations.modal
                .noResultsScreen.noResultsText
            }
            {` "${searchKey}"`}
          </span>
        </div>
      ) : null}
    </div>
  ) : null;
};

const PaginationWrap = (props) => {
  const { searchKey } = props;
  const { pages } = usePagination();
  return searchKey ? (
    <div className={styles.paginationWrap}>
      <Pagination />
    </div>
  ) : null;
};

export default function SearchPage(props) {
  const router = useRouter();
  const [searchKey, setSearchKey] = useState("");
  const [changeKey, setChangeKey] = useState("searchKey");
  const { currentLanguage, currentLanguageLabel } = useLanguage();
  const { instanceIDs } = useInstance();
  const { currentGroup, currentGroupLabel } = useGroup();
  const { currentPlatform, currentPlatformLabel } = usePlatform();
  const { docVersion, slugVersion } = useVersion();
  const [currentDocType, setCurrentDocType] = useState(defaultDocType);
  const [currentDocTypeLabel, setCurrentDocTypeLabel] =
    useState(defaultDocTypeLabel);

  const initFacetFilters = [["init"], "init"];
  const [facetFilters, setFacetFilters] = useState(initFacetFilters);
  const initFacets = [
    "language",
    "instance",
    "group",
    "doctype",
    "platform",
    "version",
  ];

  useEffect(() => {
    console.log("[SearchPage] instanceIDs", instanceIDs);
    const versionFilter = `version:${docVersion}`;
    const instanceFilter = instanceIDs.map((instanceID) => {
      return `instance:${instanceID}`;
    });
    // const groupFilter = `group:${currentGroup}`;
    const languageFilter = `language:${currentLanguage}`;
    // const platformFilter = `platform:${currentPlatform}`;
    const doctypeFilter =
      currentDocType === "all" ? `` : `doctype:${currentDocType}`;
    setFacetFilters([
      versionFilter,
      instanceFilter,
      // groupFilter,
      languageFilter,
      // platformFilter,
      doctypeFilter,
    ]);
  }, [
    docVersion,
    instanceIDs,
    // currentGroup,
    currentLanguage,
    // currentPlatform,
    currentDocType,
  ]);
  useEffect(() => {
    // type
    const type = localStorage.getItem("search-type") as string;

    const target = defaultDocTypes.find((item) => item.key === type);
    target && setCurrentDocType(type);
    target && setCurrentDocTypeLabel(target.label);

    return () => {
      sessionStorage.clear();
    };
  }, []);
  useEffect(() => {
    if (router.isReady) {
      // k
      const { k } = router.query;
      setSearchKey((k as string) || "");
    }
  }, [router.isReady, router.query]);
  useEffect(() => {
    sessionStorage.clear();
    setChangeKey("searchKey");
  }, [currentLanguage]);

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
        <InstantSearch
          searchClient={searchClient}
          indexName="zegocloud"
          initialUiState={{
            zegocloud: {
              query: ignoreStr,
            },
          }}
        >
          <Configure
            snippetEllipsisText="…"
            clickAnalytics={true}
            analytics={true}
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
            facetFilters={facetFilters}
            facets={initFacets}
          />

          <div className={styles.poweredByWrap}>
            <PoweredBy />
          </div>
          <div className={styles.searchCriteria}>
            {/* <SearchBox /> */}
            <SearchBoxWrap
              searchKey={searchKey}
              setSearchKey={setSearchKey}
              changeKey={changeKey}
              setChangeKey={setChangeKey}
            />
            <SearchSelectWrap
              searchKey={searchKey}
              changeKey={changeKey}
              setChangeKey={setChangeKey}
            />
          </div>
          <HitWrap currentLanguage={currentLanguage} searchKey={searchKey} />
          <PaginationWrap searchKey={searchKey} />
          {/* <Index indexName="zegocloud">
            <Configure
              facetFilters={[
                "version:next",
                ["instance:live_streaming_kit_ios"],
                "language:en",
                "",
              ]}
            />
          </Index> */}
        </InstantSearch>
      </DocTypeContext.Provider>
    </div>
  );
}

SearchPage.getLayout = function getLayout(page, pageProps) {
  return <Layout {...pageProps}>{page}</Layout>;
};

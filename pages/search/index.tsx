// Warning: Not compatible with previous versions of navigationInfo
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { algoliasearch } from "algoliasearch";
import {
  InstantSearch,
  // SearchBox,
  Hits,
  Pagination,
  Configure,
  useSearchBox,
  useInstantSearch,
  usePagination,
  // useConfigure,
  useHits,
  PoweredBy,
  // Index,
} from "react-instantsearch";
// import CustomHit from "@/components/search/CustomHit";
import NewCustomHit from "@/components/search/NewCustomHit";
import Layout from "@/components/search/layout";
import "instantsearch.css/themes/satellite.css";
import LibControllerImpl from "@/lib/index";
import CommonControllerImpl from "@/lib/optimize/common";
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
  DocTypeContext,
  allDocTypeItem,
} from "@/components/context/docTypeContext";
import { copywriting } from "@/components/constant/language";
import { DEFAULT_CURRENT_SLUG_VERSION } from "@/lib/constants";
import { allGroupItem } from "@/components/context/groupContext";
import { allPlatformItem } from "@/components/context/platformContext";
// @ts-ignore
import { LoadingOutlined } from "@ant-design/icons";
import { InstanceType } from "@/lib/types";

const ignoreStr = "docuoignoreinitsearch";

const isNumber = (value: any) => {
  return !isNaN(parseFloat(value)) && isFinite(value);
};

export const getStaticProps = (props) => {
  const inputDocuoConfig = LibControllerImpl.getDocuoConfig();
  const instances = LibControllerImpl.getInstances(InstanceType.Normal);
  const allUsedVersions = CommonControllerImpl.getAllUsedVersions(instances);
  return {
    props: {
      inputDocuoConfig,
      allUsedVersions,
    },
  };
};

const SearchSelectWrap = (props) => {
  const { searchKey, changeKey, setChangeKey } = props;
  const { handlePlatformChanged, handleVersionChanged } = useSet();
  const { currentPlatform, displayPlatforms } = usePlatform();
  const { currentLanguage } = useLanguage();
  const { docVersion, slugVersion, displayVersions } = useVersion();
  const { currentDocType, setCurrentDocType } = useDocType();
  const { results } = useHits();
  const { facets, nbHits } = results;

  // doc types
  const handleDocTypeChanged = useCallback(
    ({ key: docType, initChild }: { key: string; initChild?: boolean }) => {
      setCurrentDocType(docType);
      setChangeKey("doctype");
      handlePlatformChanged({ key: allPlatformItem.platform, initChild });
    },
    [handlePlatformChanged, setChangeKey, setCurrentDocType]
  );
  // const DocTypeListView = useMemo(() => {
  //   const docTypesItems = defaultDocTypes.map((item) => {
  //     return {
  //       key: item[`${currentLanguage}_key`] || item[`en_key`],
  //       label: item[`${currentLanguage}_label`] || item[`en_label`],
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
  // }, [currentDocType, currentLanguage, handleDocTypeChanged]);
  const DynamicDocTypeListView = useMemo(() => {
    // console.log("[SearchSelectWrap] DynamicDocTypeListView", changeKey, {
    //   ...facets,
    // });
    let searchCountData;
    if (
      (changeKey === "doctype" || changeKey === "platform") &&
      sessionStorage.getItem("doctype-search-cache")
    ) {
      searchCountData = JSON.parse(
        sessionStorage.getItem("doctype-search-cache")
      );
    } else {
      searchCountData = facets.find((item) => item.name === "doctype");
    }
    let menuItems = [];
    if (searchCountData && searchCountData.data) {
      const keys = Object.keys(searchCountData.data);
      let total = 0;
      keys.forEach((key) => {
        if (isNumber(searchCountData.data[key])) {
          menuItems.push({
            key: key,
            label: key + `(${searchCountData.data[key]})`,
          });
          total += searchCountData.data[key];
        }
      });
      menuItems.unshift({
        key: allDocTypeItem[`${currentLanguage}_key`],
        label: allDocTypeItem[`${currentLanguage}_label`] + `(${total})`,
      });
    }
    return (
      <div className={styles.docTypeList}>
        {menuItems.length ? (
          <Tabs
            rootClassName="doc-type-tab"
            defaultActiveKey={currentDocType}
            activeKey={currentDocType}
            items={menuItems}
            onChange={(activeKey: string) => {
              handleDocTypeChanged({ key: activeKey, initChild: true });
            }}
          />
        ) : null}
      </div>
    );
  }, [
    changeKey,
    currentDocType,
    currentLanguage,
    facets,
    handleDocTypeChanged,
  ]);

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
  //               handlePlatformChanged({ key: platformsItem.value });
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
    // console.log("[SearchSelectWrap] DynamicPlatformListView", changeKey, {
    //   ...facets,
    // });
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
      keys.forEach((key) => {
        if (isNumber(searchCountData.data[key])) {
          const target = PlatformControllerImpl.getDisplayPlatform(
            key,
            displayPlatforms
          );
          // Update count
          if (key === currentPlatform) {
            searchCountData.data[key] = nbHits;
          }
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
        label:
          allPlatformItem[`${currentLanguage}_platformLabel`] + `(${total})`,
      });
    }
    return (
      <div className={`${styles.platformList} platform_list`}>
        {menuItems.map((platformsItem) => {
          return (
            <div
              className={`${styles.platformItem} ${
                platformsItem.value === currentPlatform ? styles.active : ""
              }`}
              key={platformsItem.value}
              onClick={() => {
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
    currentLanguage,
    displayPlatforms,
    currentPlatform,
    nbHits,
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
  //         handleVersionChanged({ key: value });
  //       }}
  //       options={versionsItems}
  //     />
  //   );
  // }, [docVersion, displayVersions, handleVersionChanged]);
  const DynamicVersionListView = useMemo(() => {
    // console.log("[SearchSelectWrap] DynamicVersionListView", changeKey, {
    //   ...facets,
    // });
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
  }, [docVersion, facets, handleVersionChanged, setChangeKey]);

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
  const { searchKey, setSearchKey, changeKey, setChangeKey, updateDocType } =
    props;
  const { status } = useInstantSearch();
  const { query, refine } = useSearchBox();
  const [inputValue, setInputValue] = useState(query);
  const inputRef = useRef(null);
  const { results } = useHits();
  const { facets } = results;

  // console.log("[SearchBoxWrap] query", query);
  // console.log("[SearchBoxWrap] results", results);

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
  //         updateDocType({ initChild: true });
  //         handleGroupChanged({ key: value });
  //       }}
  //       options={groupsItems}
  //     />
  //   );
  // }, [currentGroup, displayGroups, handleGroupChanged, updateDocType]);

  const DynamicGroupListView = useMemo(() => {
    // console.log("[SearchBoxWrap] DynamicGroupListView", changeKey, {
    //   ...facets,
    // });
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
        label: allGroupItem[`${currentLanguage}_groupLabel`],
      });
    }
    // console.log("menuItems", menuItems, currentGroup);
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
              updateDocType({ initChild: true });
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
    currentLanguage,
    displayGroups,
    facets,
    handleGroupChanged,
    setChangeKey,
    updateDocType,
  ]);

  const updateHitWrapStyle = () => {
    const platformListDom = document.querySelector(".platform_list");
    const hitWrapDom = document.querySelector(".hit_wrap") as HTMLElement;
    if (platformListDom && hitWrapDom) {
      const clientHeight = platformListDom.clientHeight;
      // 53、106、159...
      const paddingTop = `${156 + clientHeight}px`;
      hitWrapDom.style.paddingTop = paddingTop;
    }
  };

  useEffect(() => {
    setQuery(searchKey || "");
  }, [searchKey, setQuery]);

  useEffect(() => {
    if (status === "idle") {
      // console.log(`[SearchBoxWrap] ${changeKey} cache`, { ...facets });
      const searchGroupCountData = facets.find((item) => item.name === "group");
      const searchDoctypeCountData = facets.find(
        (item) => item.name === "doctype"
      );
      const searchPlatformCountData = facets.find(
        (item) => item.name === "platform"
      );
      if (changeKey === "searchKey") {
        if (currentGroup === allGroupItem.group) {
          if (searchGroupCountData) {
            sessionStorage.setItem(
              "group-search-cache",
              JSON.stringify(searchGroupCountData)
            );
          } else {
            sessionStorage.removeItem("group-search-cache");
          }
        }
        if (currentDocType === allDocTypeItem[`${currentLanguage}_key`]) {
          if (searchDoctypeCountData) {
            sessionStorage.setItem(
              "doctype-search-cache",
              JSON.stringify(searchDoctypeCountData)
            );
          } else {
            sessionStorage.removeItem("doctype-search-cache");
          }
        }
        if (currentPlatform === allPlatformItem.platform) {
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

      // Update style
      updateHitWrapStyle();
    }
  }, [
    changeKey,
    currentDocType,
    currentGroup,
    currentLanguage,
    currentPlatform,
    facets,
    status,
  ]);

  useEffect(() => {
    const resizeHandle = () => {
      updateHitWrapStyle();
    };
    window.addEventListener("resize", resizeHandle);
    return () => {
      window.removeEventListener("resize", resizeHandle);
    };
  }, []);

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
  // console.log("[HitWrap] status", status);
  // console.log("[HitWrap] searchKey", searchKey);

  const transformItems = useCallback((items) => {
    // sort by group
    return items;
  }, []);

  return searchKey ? (
    <div className={`${styles.hitWrap} hit_wrap`}>
      <Hits hitComponent={NewCustomHit} transformItems={transformItems} />
      {status !== "idle" ? (
        <Spin
          className="search-loading"
          fullscreen
          indicator={<LoadingOutlined spin />}
          size="large"
        />
      ) : null}
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
  const { inputDocuoConfig } = props;
  let appId = "N61JOMLMAK";
  let apiKey = "cc55591748c47b1e5e24d363cdf1d5eb";
  let indexName = "zegocloud";
  if (
    inputDocuoConfig &&
    inputDocuoConfig.search &&
    inputDocuoConfig.search.algolia
  ) {
    appId = inputDocuoConfig.search.algolia.appId;
    apiKey = inputDocuoConfig.search.algolia.apiKey;
    indexName = inputDocuoConfig.search.algolia.indexName;
  }
  const searchClient = algoliasearch(appId, apiKey);
  const initialUiState = {
    [indexName]: {
      query: ignoreStr,
    },
  };
  const router = useRouter();
  const [searchKey, setSearchKey] = useState("");
  const [changeKey, setChangeKey] = useState("searchKey");
  const { currentLanguage } = useLanguage();
  // const { instanceIDs } = useInstance();
  const { currentGroup } = useGroup();
  const { currentPlatform } = usePlatform();
  const { docVersion, slugVersion } = useVersion();
  const [currentDocType, setCurrentDocType] = useState(defaultDocType);

  const initFacetFilters = [["init"], "init"];
  const [facetFilters, setFacetFilters] = useState(initFacetFilters);
  const initFacets = [
    "language",
    // "instance",
    "group",
    "doctype",
    "platform",
    "version",
  ];

  const updateDocType = useCallback(
    (params: { docType?: string; initChild?: boolean }) => {
      const { docType, initChild } = params;
      if (initChild) {
        setCurrentDocType(allDocTypeItem[`${currentLanguage}_key`]);
      } else {
        if (docType) {
          setCurrentDocType(docType);
        }
      }
    },
    [currentLanguage]
  );

  useEffect(() => {
    // console.log("[SearchPage] instanceIDs", instanceIDs);
    const versionFilter = `version:${docVersion}`;
    // const instanceFilter = instanceIDs.map((instanceID) => {
    //   return `instance:${instanceID}`;
    // });
    const groupFilter =
      currentGroup === allGroupItem.group ? `` : `group:${currentGroup}`;
    const languageFilter = `language:${currentLanguage}`;
    const platformFilter =
      currentPlatform === allPlatformItem.platform
        ? ``
        : `platform:${currentPlatform}`;
    const doctypeFilter =
      currentDocType === allDocTypeItem[`${currentLanguage}_key`]
        ? ``
        : `doctype:${currentDocType}`;
    setFacetFilters([
      versionFilter,
      // instanceFilter,
      groupFilter,
      languageFilter,
      platformFilter,
      doctypeFilter,
    ]);
  }, [
    docVersion,
    // instanceIDs,
    currentGroup,
    currentLanguage,
    currentPlatform,
    currentDocType,
  ]);
  useEffect(() => {
    // type
    // const type = localStorage.getItem("search-type") as string;

    // setCurrentDocType(type);

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
    updateDocType({ initChild: true });
  }, [currentLanguage, updateDocType]);

  return (
    <div id="search-page">
      <DocTypeContext.Provider
        value={{
          currentDocType,
          setCurrentDocType,
        }}
      >
        <InstantSearch
          searchClient={searchClient}
          indexName={indexName}
          initialUiState={initialUiState}
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
              "hierarchy.lvl1:30",
              "hierarchy.lvl2:30",
              "hierarchy.lvl3:30",
              "hierarchy.lvl4:30",
              "hierarchy.lvl5:30",
              "hierarchy.lvl6:30",
              "content:100",
            ]}
            // attributesToHighlight={[
            //   "hierarchy.lvl1:30",
            //   "hierarchy.lvl2:30",
            //   "hierarchy.lvl3:30",
            //   "hierarchy.lvl4:30",
            //   "hierarchy.lvl5:30",
            //   "hierarchy.lvl6:30",
            //   "content:100",
            // ]}
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
              updateDocType={updateDocType}
            />
            <SearchSelectWrap
              searchKey={searchKey}
              changeKey={changeKey}
              setChangeKey={setChangeKey}
            />
          </div>
          <HitWrap currentLanguage={currentLanguage} searchKey={searchKey} />
          <PaginationWrap searchKey={searchKey} />
        </InstantSearch>
      </DocTypeContext.Provider>
    </div>
  );
}

SearchPage.getLayout = function getLayout(page, pageProps) {
  return <Layout {...pageProps}>{page}</Layout>;
};

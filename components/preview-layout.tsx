// TODO antd cause lambda very slow!!!!!!!!!!!!!! It will take more 7s!!!!!!!!

import React, { useState, useEffect, useMemo } from "react";
import { Breadcrumb, Drawer } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import Header from "./header";
import PageBg from "./PageBg";
import Footer from "./footer";

import {
  DisplayInstance,
  DisplayVersion,
  DocuoConfig,
  SidebarItemType,
  TocItem,
  DisplayLanguage,
  DisplayPlatform,
  DisplayGroup,
  CategoryMenuData,
} from "@/lib/types";
import Image from "next/image";
import IconOutlink from "@/assets/images/icon_outlink.png";

import SearchMeta from "@/components/meta/SearchMeta";
import DocuoTree from "./tree";
import DocuoAnchor from "./Anchor";
import AnchorNode from "./Anchor/Anchor";
import IconBackTop from "@/assets/icons/anchor/IconBackTop.svg";
import IconBackTopDark from "@/assets/icons/anchor/IconBackTopDark.svg";
import IconBreadcrumbArrow from "@/assets/icons/breadcrumb/arrow.svg";
import AnChorMobile from "./Anchor/AnchorMobile";
import InsVersionDropdown from "@/components/dropdown/InsVersionDropdown";
import { GoogleAnalytics } from "@next/third-parties/google";
import ThemeContext, { Theme } from "@/components/header/Theme.context";
import useColors from "./hooks/useColors";
import useColorMode from "./hooks/useColorMode";
import ArticlePager, { PaginationData } from "./articlePager";
import { copywriting } from "@/components/constant/language";
import { LanguageContext } from "@/components/context/languageContext";
import { GroupContext } from "@/components/context/groupContext";
import { InstanceContext } from "@/components/context/instanceContext";
import { PlatformContext } from "@/components/context/platformContext";
import { VersionContext } from "@/components/context/versionContext";
import { CategoryContext } from "@/components/context/categoryContext";
import CategoryMenu from "./header/CategoryMenu";

type Props = {
  children: React.ReactNode;
  slug?: string[];
  instanceID: string;
  currentInstanceLabel: string;
  docVersion: string;
  slugVersion: string;
  versions: string[];
  mdxSource: any;
  toc: TocItem[];
  folderTreeData: TreeDataObject[];
  docuoConfig: DocuoConfig;
  displayVersions: DisplayVersion[];
  displayInstances: DisplayInstance[];
  displayLanguages: DisplayLanguage[];
  currentLanguage: string;
  currentLanguageLabel: string;
  currentGroup: string;
  currentGroupLabel: string;
  displayGroups: DisplayGroup[];
  currentPlatform: string;
  currentPlatformLabel: string;
  displayPlatforms: DisplayPlatform[];
  currentCategory: string;
  currentProduct: string;
  displayCategorys: CategoryMenuData[];
  prev: PaginationData;
  next: PaginationData;
};

type TreeDataObject = {
  key: string;
  title: string;
  type: SidebarItemType;
  link?: string;
  id?: string;
  children?: TreeDataObject[];
};

let WsConnecting = false;
const PreviewLayout = ({
  children,
  slug,
  instanceID,
  currentInstanceLabel,
  docVersion,
  slugVersion,
  versions,
  toc,
  folderTreeData,
  docuoConfig,
  displayVersions,
  displayInstances,
  displayLanguages,
  currentLanguage,
  currentLanguageLabel,
  currentGroup,
  currentGroupLabel,
  displayGroups,
  currentPlatform,
  currentPlatformLabel,
  displayPlatforms,
  currentCategory,
  currentProduct,
  displayCategorys,
  prev,
  next,
}: Props) => {
  // slug eg: instance routeBasePath/version/folder/filename
  // console.log(
  //   "[Site]init params",
  //   slug,
  //   instanceID,
  //   currentGroup,
  //   currentGroupLabel,
  //   displayGroups,
  //   currentPlatform,
  //   currentPlatformLabel,
  //   displayPlatforms,
  //   displayLanguages
  // );

  // Avoid empty slug
  if (!slug) {
    return null;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [titleElement, setTitleElement] = useState<HTMLElement | null>(null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isExpand, setIsExpand] = useState(true);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [drawerOpen, setDrawerOpen] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [selectedKeys, setSelectedKeys] = useState([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [expandedKeys, setExpandedKeys] = useState([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [theme, setTheme] = useState<Theme>("light");

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useColorMode(docuoConfig.themeConfig?.colorMode, theme, setTheme);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useColors(docuoConfig.themeConfig?.colors);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    // NEXT_PUBLIC_LOCAL_WS: auto reload only for dev mode
    if (!process?.env?.NEXT_PUBLIC_LOCAL_WS || WsConnecting) return;
    WsConnecting = true;
    if ("WebSocket" in window) {
      const ws = new WebSocket("ws://localhost:59999");
      ws.onopen = function () {
        console.log("建立连接，状态:" + ws.readyState);
        WsConnecting = true;
      };
      ws.onmessage = function (evt) {
        console.log("状态：" + ws.readyState + "；服务端返回数据:", evt);
        if (evt.data === "reload") {
          location.reload();
        }
      };
      ws.onerror = function () {
        console.log("发生错误，状态:" + ws.readyState);
        WsConnecting = false;
      };
      ws.onclose = function () {
        console.log("连接关闭，状态：", ws.readyState);
        WsConnecting = false;
      };
    }
  }, []);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const beforeUnloadHandler = () => {
      localStorage.setItem("scrollHeight", String(document.body.scrollTop));
    };
    window.addEventListener("beforeunload", beforeUnloadHandler);
    const scrollHeight = localStorage.getItem("scrollHeight");
    localStorage.removeItem("scrollHeight");
    if (scrollHeight) {
      // setTimeout: Scroll after images rendered
      setTimeout(() => {
        document.body.scrollTo({
          top: Number(scrollHeight),
        });
      }, 10);
    }

    return () => {
      window.removeEventListener("beforeunload", beforeUnloadHandler);
    };
  }, []);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const linkClickHandler = (event) => {
      const { href, target } = event.detail || {};
      if (!href || typeof href !== "string") return;
      if (target === "_blank") {
        window.open(href);
      } else {
        if (href.startsWith("http")) {
          location.href = href;
        } else {
          router.push({ pathname: href });
        }
      }
    };
    const eventName = "link-clicked";
    document.addEventListener(eventName, linkClickHandler);

    return () => {
      document.removeEventListener(eventName, linkClickHandler);
    };
  }, [router]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (router.isReady) {
      document.body.scrollTo({ top: 0 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath]);

  // All articles must have an id
  const docID = slug.join("/");

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const docID = slug.join("/");
    const selectedKeys: string[] = [];
    let expandedKeys = [];
    const loop = (children: TreeDataObject[], parentKeys: string[]) => {
      for (const element of children) {
        if (element.id === docID) {
          // Find the first
          expandedKeys = parentKeys.concat(element.key);
          return element.key;
        }
        if (element.children) {
          const result = loop(element.children, parentKeys.concat(element.key));
          if (result) return result;
        }
      }
    };
    const selectedKey = loop(folderTreeData, []);
    selectedKeys.push(selectedKey);
    setSelectedKeys(selectedKeys);
    setExpandedKeys((oldVal) =>
      Array.from(new Set(oldVal.concat(expandedKeys)))
    );
  }, [slug]);

  const formatFormatterTocForAntdAnchor = (data, k): AnchorNode[] => {
    let key = k;
    return data.map((item) => {
      const newItem = { ...item };

      newItem.href = `#${newItem.id}`;
      delete newItem.id;
      newItem.key = key++;

      if (newItem.children) {
        newItem.children = formatFormatterTocForAntdAnchor(
          newItem.children,
          key
        );
      }

      return newItem;
    });
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const tocFormatData = useMemo(() => {
    return formatFormatterTocForAntdAnchor(toc, 0);
  }, [toc]);

  // Update bread crumb data
  const getBreadCrumbData = () => {
    let result: TreeDataObject[] = [];
    const loop = (
      children: TreeDataObject[],
      parentNodes: TreeDataObject[]
    ) => {
      for (const element of children) {
        if (element.id === docID) {
          result = parentNodes.concat(element);
          return;
        }
        if (element.children) {
          loop(element.children, parentNodes.concat(element));
        }
      }
    };
    loop(folderTreeData, []);
    const len = result.length;
    return result.map((item, index, arr) => {
      return {
        title: item.title,
        className:
          `breadcrumb-label` +
          (index === len - 2
            ? " doc-search-lvl0"
            : ` doc-search-lvl${index + 1}`),
      };
    });
  };
  const breadCrumbData = getBreadCrumbData();

  const fileSelectHandle = (selectedKeys, node) => {
    if (node.type === SidebarItemType.Category) {
      setExpandedKeys((oldVal) => {
        if (oldVal.includes(node.key)) {
          return oldVal.filter((key) => key !== node.key);
        }
        return [...oldVal, node.key];
      });
    }
    if (node.type === SidebarItemType.Doc) {
      setDrawerOpen(false);
    }
  };

  const scrollToTop = () => {
    document.body.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onDrawerClose = () => {
    setDrawerOpen(false);
  };

  const titleRenderHandle = (nodeData: TreeDataObject) => {
    return (
      <div className="custom-node-title">
        {nodeData.id ? (
          <Link className="title" href={nodeData.id}>
            {nodeData.title}
          </Link>
        ) : nodeData.type === SidebarItemType.Link ? (
          <Link className="title" href={nodeData.link} target="_blank">
            {nodeData.title}
          </Link>
        ) : (
          <span className="title">{nodeData.title}</span>
        )}
        <span className="right-content">
          {/* @ts-ignore */}
          {nodeData.tag ? (
            // @ts-ignore
            <span className="title-tag">{nodeData.tag || "POST"}</span>
          ) : null}
          {nodeData.type === SidebarItemType.Link ? (
            <Image src={IconOutlink} alt={"link"} />
          ) : null}
        </span>
      </div>
    );
  };

  // @ts-ignore
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const menuVersions = useMemo<any>(() => {
    return {
      key: docVersion,
      label: docVersion,
      type: "dropdown",
      items: displayVersions.map((item) => ({
        ...item,
        key: item.version,
        label: item.version,
      })),
    };
  }, [docVersion, displayVersions]);
  // @ts-ignore
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const menuInstances = useMemo<any>(() => {
    return {
      key: instanceID,
      label: currentInstanceLabel,
      type: "dropdown",
      items: displayInstances.map((item) => ({
        ...item,
        key: item.instance.id,
        label: item.instance.label,
      })),
    };
  }, [instanceID, currentInstanceLabel, displayInstances]);

  // @ts-ignore
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const menuGroups = useMemo<any>(() => {
    return {
      key: currentGroup,
      label: currentGroupLabel,
      type: "dropdown",
      items: displayGroups.map((item) => ({
        ...item,
        key: item.group,
        label: item.groupLabel,
      })),
    };
  }, [currentGroup, currentGroupLabel, displayGroups]);
  // @ts-ignore
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const menuPlatforms = useMemo<any>(() => {
    return {
      key: currentPlatform,
      label: currentPlatformLabel,
      type: "dropdown",
      items: displayPlatforms.map((item) => ({
        ...item,
        key: item.platform,
        label: item.platformLabel,
      })),
    };
  }, [currentPlatform, currentPlatformLabel, displayPlatforms]);

  const gaId = docuoConfig?.analytics?.ga4?.measurementId;
  const isFooterHidden = !!docuoConfig?.themeConfig?.footer?.hidden;

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <LanguageContext.Provider
        value={{
          currentLanguage,
          currentLanguageLabel,
          displayLanguages,
        }}
      >
        <CategoryContext.Provider
          value={{
            currentCategory,
            currentProduct,
            displayCategorys,
          }}
        >
          <InstanceContext.Provider
            value={{
              instanceIDs: [instanceID],
              currentInstanceLabels: [currentInstanceLabel],
              displayInstances,
            }}
          >
            <VersionContext.Provider
              value={{
                docVersion,
                slugVersion,
                displayVersions,
                versions,
              }}
            >
              <GroupContext.Provider
                value={{
                  currentGroup,
                  currentGroupLabel,
                  displayGroups,
                }}
              >
                <PlatformContext.Provider
                  value={{
                    currentPlatform,
                    currentPlatformLabel,
                    displayPlatforms,
                  }}
                >
                  <div className="preview-screen relative">
                    {!!gaId && <GoogleAnalytics gaId={gaId} />}
                    <SearchMeta />
                    <Header
                      docuoConfig={docuoConfig}
                      tocFormatData={tocFormatData}
                      setDrawerOpen={setDrawerOpen}
                    ></Header>
                    <PageBg />
                    <main className="preview-main">
                      <div className="preview-sider">
                        <div className={`mt-[16px] flex pl-8 flex-wrap`}>
                          {!displayGroups || !displayGroups.length ? (
                            <>
                              <InsVersionDropdown
                                type="instance"
                                menu={menuInstances}
                              />
                              <InsVersionDropdown
                                type="version"
                                menu={menuVersions}
                              />
                            </>
                          ) : (
                            <>
                              {/* <InsVersionDropdown
                                type="group"
                                menu={menuGroups}
                              /> */}
                              <CategoryMenu />
                              <InsVersionDropdown
                                type="platform"
                                menu={menuPlatforms}
                              />
                              <InsVersionDropdown
                                type="version"
                                menu={menuVersions}
                              />
                            </>
                          )}
                        </div>
                        <DocuoTree
                          docuoConfig={docuoConfig}
                          data={folderTreeData}
                          selectedKeys={selectedKeys}
                          onSelect={fileSelectHandle}
                          titleRender={titleRenderHandle}
                          setDrawerOpen={setDrawerOpen}
                        />
                      </div>
                      <div className="preview-content-wrap">
                        <div className="preview-content">
                          <div className="article">
                            <div className="article-breadcrumb flex justify-between	items-center">
                              <Breadcrumb
                                items={breadCrumbData}
                                separator={
                                  <IconBreadcrumbArrow className="breadcrumb-icon m-auto" />
                                }
                              />
                              <div className={"middle__show  relative"}>
                                <AnChorMobile tocFormatData={tocFormatData} />
                              </div>
                            </div>
                            <div
                              className="article-content"
                              ref={(current) => {
                                const titleElement =
                                  current?.querySelector("h1[class*='title']");
                                setTitleElement(titleElement as HTMLElement);
                              }}
                            >
                              {children}
                            </div>
                            <ArticlePager prev={prev} next={next} />
                          </div>
                          <div className="article-anchor-right">
                            {toc?.length ? (
                              <div className="pt-[28px]  pb-10 ml-8">
                                <p
                                  className="mb-2.5 font-inter-bold font-semibold text-sm"
                                  onClick={() => setIsExpand(!isExpand)}
                                >
                                  {copywriting[currentLanguage]
                                    ? copywriting[currentLanguage].toc.title
                                    : copywriting.en.toc.title}
                                </p>
                                <div className="toc-scroller overflow-auto overscroll-none relative pr-6 max-h-[70vh]">
                                  <DocuoAnchor
                                    data={tocFormatData}
                                    offsetTop={68}
                                  />
                                </div>

                                <div className="right-anchor-divide"></div>
                                <div
                                  className="back-to-top hover:opacity-70"
                                  onClick={scrollToTop}
                                >
                                  <div className="top-btn">
                                    {theme === "dark" ? (
                                      <IconBackTopDark />
                                    ) : (
                                      <IconBackTop />
                                    )}
                                  </div>
                                  {copywriting[currentLanguage]
                                    ? copywriting[currentLanguage].toc
                                        .backToTopText
                                    : copywriting.en.toc.backToTopText}
                                </div>
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      <Drawer
                        rootClassName="mobile-tree-container"
                        placement="left"
                        onClose={onDrawerClose}
                        open={drawerOpen}
                        key="left"
                        getContainer={false}
                      >
                        <div className={`mt-[16px] flex pl-8 flex-wrap`}>
                          {!displayGroups || !displayGroups.length ? (
                            <>
                              <InsVersionDropdown
                                type="instance"
                                menu={menuInstances}
                              />
                              <InsVersionDropdown
                                type="version"
                                menu={menuVersions}
                              />
                            </>
                          ) : (
                            <>
                              {/* <InsVersionDropdown
                                type="group"
                                menu={menuGroups}
                              /> */}
                              <CategoryMenu />
                              <InsVersionDropdown
                                type="platform"
                                menu={menuPlatforms}
                              />
                              <InsVersionDropdown
                                type="version"
                                menu={menuVersions}
                              />
                            </>
                          )}
                        </div>
                        <DocuoTree
                          docuoConfig={docuoConfig}
                          data={folderTreeData}
                          selectedKeys={selectedKeys}
                          onSelect={fileSelectHandle}
                          titleRender={titleRenderHandle}
                          setDrawerOpen={setDrawerOpen}
                        />
                      </Drawer>
                    </main>
                    {!isFooterHidden && (
                      <Footer
                        docuoConfig={docuoConfig}
                        socials={[]}
                        links={[]}
                      />
                    )}
                  </div>
                </PlatformContext.Provider>
              </GroupContext.Provider>
            </VersionContext.Provider>
          </InstanceContext.Provider>
        </CategoryContext.Provider>
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  );
};

export default PreviewLayout;

// TODO antd cause lambda very slow!!!!!!!!!!!!!! It will take more 7s!!!!!!!!

import React, { useState, useEffect, useMemo } from "react";
import { Drawer } from "antd";
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
  DisplayTab,
  CategoryMenuData,
  TreeDataObject,
} from "@/lib/types";
import Image from "next/image";
import IconOutlink from "@/assets/images/icon_outlink.png";

import SearchMeta from "@/components/meta/SearchMeta";
import DocuoTree from "./tree";
import DocuoAnchor from "./Anchor";
import AnchorNode from "./Anchor/Anchor";
import IconBackTop from "@/assets/icons/anchor/IconBackTop.svg";
import IconBackTopDark from "@/assets/icons/anchor/IconBackTopDark.svg";
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
import { TabContext } from "@/components/context/tabContext";
import CategoryMenu from "./header/CategoryMenu";
import SubHeader from "./SubHeader";
import dynamic from "next/dynamic";
import TabDropdown from "./dropdown/TabDropdown";
import { useDynamicTOC } from "./hooks/useDynamicTOC";
import FontInitializer from "./FontInitializer";
import { eventEmitter } from "@/lib/client/event";
// 动态导入 ClientBreadcrumb，禁用 SSR
const ClientBreadcrumb = dynamic(() => import("./header/ClientBreadcrumb"), {
  ssr: false,
});

// 动态导入
const FloatingFrame = dynamic(() => import("@/components/FloatingFrame"), {
  ssr: false,
});

const headerHeight = 68;
const subHeaderHeight = 55;

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
  currentTab: string;
  currentTabLabel: string;
  displayTabs: DisplayTab[];
  shouldShowTabs: boolean;
  prev: PaginationData;
  next: PaginationData;
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
  mdxSource,
  toc,
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
  currentTab,
  currentTabLabel,
  displayTabs,
  shouldShowTabs,
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

    eventEmitter.on("drawer-trigger", (value) => {
      setDrawerOpen(!!value);
    });

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

      // 触发路由变化事件，让动态TOC重新扫描
      document.dispatchEvent(new CustomEvent("route-change"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath]);

  const formatFormatterTocForAntdAnchor = (data, k): AnchorNode[] => {
    let key = k;
    return data.map((item) => {
      const newItem = { ...item };

      newItem.href = `#${newItem.id || ""}`;
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

  // 检查frontmatter中是否禁用TOC
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const shouldShowToc = useMemo(() => {
    const frontmatter = mdxSource?.frontmatter || {};
    // 默认显示TOC，只有明确设置为false时才隐藏
    return frontmatter.show_toc !== false;
  }, [mdxSource]);

  // 使用动态TOC来支持组件生成的标题（如Steps组件）
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { toc: dynamicToc } = useDynamicTOC(".article-content");

  // 合并静态TOC和动态TOC
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const combinedToc = useMemo(() => {
    // 如果禁用了TOC，返回空数组
    if (!shouldShowToc) {
      return [];
    }
    // 如果动态TOC有内容，优先使用动态TOC（包含组件生成的标题）
    // 否则使用静态TOC作为后备
    return dynamicToc && dynamicToc.length > 0 ? dynamicToc : toc;
  }, [dynamicToc, toc, shouldShowToc]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const tocFormatData = useMemo(() => {
    return formatFormatterTocForAntdAnchor(combinedToc, 0);
  }, [combinedToc]);

  const scrollToTop = () => {
    document.body.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onDrawerClose = () => {
    setDrawerOpen(false);
  };

  const titleRenderHandle = (nodeData: TreeDataObject) => {
    // 处理链接的函数，为站内链接添加 BASE_PATH
    const processLinkHref = (href: string) => {
      if (!href) return "";

      // 如果是外部链接（以 http 开头），直接返回
      if (href.startsWith("http")) {
        return href;
      }

      // 如果是站内链接（以 / 开头），添加 BASE_PATH
      if (href.startsWith("/")) {
        const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
        return `${basePath}${href}`;
      }

      // 其他情况直接返回
      return href;
    };

    // 判断是否为外部链接
    const isExternalLink = (href: string) => {
      return href && href.startsWith("http");
    };

    return (
      <div className="custom-node-title">
        {nodeData.id ? (
          <Link className="title" href={nodeData.id}>
            {nodeData.title}
          </Link>
        ) : nodeData.type === SidebarItemType.Link ? (
          <a
            className="title"
            href={processLinkHref(nodeData.link || "")}
            target={isExternalLink(nodeData.link || "") ? "_blank" : "_self"}
          >
            {nodeData.title}
          </a>
        ) : (
          <span className="title">{nodeData.title}</span>
        )}
        <span className="right-content">
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
          <TabContext.Provider
            value={{
              currentTab,
              currentTabLabel,
              displayTabs,
              shouldShowTabs,
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
                    <FontInitializer />
                    <div className="preview-screen relative">
                      {!!gaId && <GoogleAnalytics gaId={gaId} />}
                      <SearchMeta />
                      <Header
                        docuoConfig={docuoConfig}
                        tocFormatData={tocFormatData}
                      ></Header>
                      <PageBg />
                      <main className="preview-main">
                        <SubHeader />
                        <div className="preview-sub-main">
                          <div
                            className={`preview-sider ${
                              !shouldShowTabs || displayTabs.length <= 1
                                ? "hidden-tab"
                                : ""
                            }`}
                          >
                            <div className={`preview-sider-tree-top`}>
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
                              slug={slug}
                              docuoConfig={docuoConfig}
                              titleRender={titleRenderHandle}
                            />
                          </div>
                          <div className="preview-content-wrap">
                            <div className="preview-content">
                              <div
                                className={`article ${
                                  !shouldShowToc ? "no-toc" : ""
                                }`}
                              >
                                <div className="article-breadcrumb flex justify-between items-center">
                                  <ClientBreadcrumb slug={slug} />
                                  <div className={"middle__show  relative"}>
                                    <AnChorMobile
                                      tocFormatData={tocFormatData}
                                    />
                                  </div>
                                </div>
                                <div
                                  className="article-content"
                                  ref={(current) => {
                                    const titleElement =
                                      current?.querySelector(
                                        "h1[class*='title']"
                                      );
                                    setTitleElement(
                                      titleElement as HTMLElement
                                    );
                                  }}
                                >
                                  {children}
                                </div>
                                <ArticlePager prev={prev} next={next} />
                              </div>
                              <div
                                className={`article-anchor-right ${
                                  !shouldShowTabs || displayTabs.length <= 1
                                    ? "hidden-tab"
                                    : ""
                                } ${!shouldShowToc ? "hidden-toc" : ""}`}
                              >
                                {shouldShowToc && toc?.length ? (
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
                                        offsetTop={
                                          headerHeight +
                                          (!shouldShowTabs ||
                                          displayTabs.length <= 1
                                            ? 0
                                            : subHeaderHeight)
                                        }
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
                        </div>
                        <Drawer
                          rootClassName="mobile-tree-container"
                          placement="left"
                          onClose={onDrawerClose}
                          open={drawerOpen}
                          key="left"
                          getContainer={false}
                        >
                          <div className={`mt-[30px] flex pl-8 pr-6 flex-wrap`}>
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
                                {shouldShowTabs && displayTabs.length > 1 && (
                                  <TabDropdown />
                                )}
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
                            slug={slug}
                            docuoConfig={docuoConfig}
                            titleRender={titleRenderHandle}
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
                      <FloatingFrame locale={currentLanguage} />
                    </div>
                  </PlatformContext.Provider>
                </GroupContext.Provider>
              </VersionContext.Provider>
            </InstanceContext.Provider>
          </TabContext.Provider>
        </CategoryContext.Provider>
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  );
};

export default PreviewLayout;

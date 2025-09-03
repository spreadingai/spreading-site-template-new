import React, { useMemo } from "react";
import PreviewLayout from "@/components/preview-layout";
// import { MDXRemote } from "next-mdx-remote";
import { MDXProvider, useMDXComponents } from "@mdx-js/react";
import {
  Code,
  CodeGroup,
  Callout,
  Frame,
  Video,
  Heading,
  Button,
  Accordion,
  Tab,
  Tabs,
  Card,
  CardGroup,
  Step,
  Steps,
  QRCode,
  LastUpdated,
} from "@spreading/docuo-mdx-component";
import LibControllerImpl from "@/lib";
import DocsControllerImpl from "@/lib/docs-help";
import TreeControllerImpl from "@/lib/tree-help";
import SlugControllerImpl from "@/lib/slug-help";
import LanguageControllerImpl from "@/lib/language-help";
import GroupControllerImpl from "@/lib/group-help";
import PlatformControllerImpl from "@/lib/platform-help";
import TabControllerImpl from "@/lib/tab-help";
import VersionsControllerImpl from "@/lib/versions-help";
import PagerControllerImpl from "@/lib/pager-help";
import ShortLinkTransControllerImpl from "@/lib/trans-short-link";
import CategoryTransControllerImpl from "@/lib/category-help";
import CommonControllerImpl from "@/lib/optimize/common";
import Link from "next/link";
import { SlugData, DocuoConfig, TocItem } from "@/lib/types";
import Head from "next/head";
import ApiItem from "@/components/docuoOpenapi/theme/ApiItem";
import MethodEndpoint from "@/components/docuoOpenapi/theme/ApiExplorer/MethodEndpoint";
import ParamsItem from "@/components/docuoOpenapi/theme/ParamsItem";
import MimeTabs from "@/components/docuoOpenapi/theme/MimeTabs";
import TabItem from "@/components/docuoOpenapi/theme-classic/src/theme/TabItem";
import SchemaItem from "@/components/docuoOpenapi/theme/SchemaItem";
import SchemaTabs from "@/components/docuoOpenapi/theme/SchemaTabs";
import DiscriminatorTabs from "@/components/docuoOpenapi/theme/DiscriminatorTabs";
import ApiTabs from "@/components/docuoOpenapi/theme/ApiTabs";
import ResponseSamples from "@/components/docuoOpenapi/theme/ResponseSamples";
import OperationTabs from "@/components/docuoOpenapi/theme/OperationTabs";
import Markdown from "@/components/docuoOpenapi/theme/Markdown";
import SecuritySchemes from "@/components/docuoOpenapi/theme/ApiExplorer/SecuritySchemes";
import ApiLogo from "@/components/docuoOpenapi/theme/ApiLogo";
import Export from "@/components/docuoOpenapi/theme/ApiExplorer/Export";
import { DocFrontMatter } from "@/components/docuoOpenapi/types";
import { DEFAULT_CURRENT_SLUG_VERSION } from "@/lib/constants";
import { getMDXComponent } from "mdx-bundler/client";
import { defaultLanguage } from "@/components/context/languageContext";
import { PaginationData } from "@/components/articlePager";
import dynamic from "next/dynamic";

// 动态导入 Mermaid 组件，禁用 SSR
const MermaidComponent = dynamic(
  () => import("mdx-mermaid/lib/Mermaid").then((mod) => ({ default: mod.Mermaid })),
  { ssr: false }
);

const MDX_GLOBAL_CONFIG = {
  MdxJsReact: {
    useMDXComponents,
  },
};

const components = {
  Code,
  CodeGroup,
  Check: Callout.Check,
  Tip: Callout.Tip,
  Note: Callout.Note,
  Warning: Callout.Warning,
  Error: Callout.Error,
  Frame,
  Video,
  Heading,
  Button,
  Accordion,
  Tab,
  Tabs,
  Card,
  CardGroup,
  Step,
  Steps,
  QRCode,
  LastUpdated,
  a: (props) =>
    props.href && props.href.startsWith("http") ? (
      <a {...props} target="_blank" />
    ) : props.href && props.href.startsWith("/article/") ? (
      <a {...props} />
    ) : (
      <Link {...props} />
    ),
  mermaid: (props: any) => {
    console.log('Mermaid props:', props);
    return <MermaidComponent {...props} config={{ theme: "default" }} />;
  },
  Mermaid: (props: any) => {
    console.log('Mermaid props:', props);
    return <MermaidComponent {...props} config={{ theme: "default" }} />;
  },
  MethodEndpoint,
  ParamsItem,
  MimeTabs,
  TabItem,
  SchemaItem,
  SchemaTabs,
  DiscriminatorTabs,
  ApiTabs,
  ResponseSamples,
  OperationTabs,
  Markdown,
  SecuritySchemes,
  ApiLogo,
  Export,
};

// 优化docuoConfig，只保留页面需要的配置
function optimizeDocuoConfig(fullConfig: any, currentLanguage: string) {
  if (!fullConfig) return fullConfig;

  const navbarKey = currentLanguage === 'zh' ? 'navbar.zh' : 'navbar';
  const footerKey = currentLanguage === 'zh' ? 'footer.zh' : 'footer';

  // 构建优化后的配置，过滤掉undefined值
  const optimizedConfig: any = {
    title: fullConfig.title,
    favicon: fullConfig.favicon,
    themeConfig: {},
    i18n: fullConfig.i18n,
  };

  // 只添加非undefined的themeConfig属性
  if (fullConfig.themeConfig?.removeWatermark !== undefined) {
    optimizedConfig.themeConfig.removeWatermark = fullConfig.themeConfig.removeWatermark;
  }
  if (fullConfig.themeConfig?.colors !== undefined) {
    optimizedConfig.themeConfig.colors = fullConfig.themeConfig.colors;
  }
  if (fullConfig.themeConfig?.colorMode !== undefined) {
    optimizedConfig.themeConfig.colorMode = fullConfig.themeConfig.colorMode;
  }
  // Keep api config (e.g., proxy) for OpenAPI request panel
  if (fullConfig.themeConfig?.api !== undefined) {
    optimizedConfig.themeConfig.api = fullConfig.themeConfig.api;
  }
  if (fullConfig.themeConfig?.[navbarKey] || fullConfig.themeConfig?.navbar) {
    optimizedConfig.themeConfig.navbar = fullConfig.themeConfig?.[navbarKey] || fullConfig.themeConfig?.navbar;
  }
  if (fullConfig.themeConfig?.[footerKey] || fullConfig.themeConfig?.footer) {
    optimizedConfig.themeConfig.footer = fullConfig.themeConfig?.[footerKey] || fullConfig.themeConfig?.footer;
  }
  if (fullConfig.themeConfig?.showAskAI !== undefined) {
    optimizedConfig.themeConfig.showAskAI = fullConfig.themeConfig.showAskAI;
  }

  // 只添加非undefined的search配置
  if (fullConfig.search !== undefined) {
    optimizedConfig.search = fullConfig.search;
  }

  return optimizedConfig;
}

// 优化displayInstances，只保留当前产品组的实例
function optimizeDisplayInstances(instances: any[], currentLanguage: string, currentGroupId?: string) {
  if (!instances || !Array.isArray(instances)) return instances;

  // 去重：基于instance.id去重
  const uniqueInstances = instances.filter((item, index, self) =>
    index === self.findIndex(t => t.instance?.id === item.instance?.id)
  );

  // 只保留当前语言或无语言设置的实例
  // 如果没有locale，默认为英语(en)
  const languageFilteredInstances = uniqueInstances.filter(item => {
    const instanceLocale = item.instance?.locale || 'en';
    return instanceLocale === currentLanguage;
  });

  // 如果有currentGroupId，只保留同一个产品组的实例
  const groupFilteredInstances = currentGroupId
    ? languageFilteredInstances.filter(item => {
        return item.instance?.navigationInfo?.group?.id === currentGroupId;
      })
    : languageFilteredInstances;

  // 只保留必要的属性，减少数据传输
  return groupFilteredInstances.map(item => ({
    instance: {
      id: item.instance.id,
      label: item.instance.label,
      // 保留navigationInfo，因为在tab-help.ts、group-help.ts、platform-help.ts中会用到
      navigationInfo: item.instance.navigationInfo,
      // 保留path和routeBasePath，因为在tab-help.ts中会用到
      path: item.instance.path,
      routeBasePath: item.instance.routeBasePath,
      locale: item.instance.locale,
      // 移除askAi等不必要的属性
    },
    defaultLink: item.defaultLink,
  }));
}



interface Props {
  mdxSource: any;
  toc: TocItem[];
  slug: string[];
  docuoConfig: DocuoConfig;
  currentInstanceLabel: string;
  slugVersion: string;
  currentLanguage: string;
  currentGroupLabel: string;
  currentPlatformLabel: string;
  frontmatterRef: {
    fileName: string;
    firstParagraphContent: string;
    firstImgSrc: string;
  };
  curr: PaginationData;
}

export const getStaticProps = async ({ params }: SlugData) => {
  // TODO: Here some methods are executed multiple times
  const slug = params.slug;
  // Remove the effect of anchor points
  slug[slug.length - 1] = slug[slug.length - 1].replace(/#.*$/, "");

  // console.log(`[getStaticProps] Validating slug: ${slug.join("/")}`);

  // 验证slug是否有效
  const allSlugs = CommonControllerImpl.readAllSlugsByFile();
  const currentSlugPath = slug.join("/");
  const isValidSlug = allSlugs.some((slugData) => {
    const validSlugPath = slugData.params.slug.join("/");
    return validSlugPath === currentSlugPath;
  });

  // console.log(`[getStaticProps] Slug validation result: ${isValidSlug}`);

  // 如果slug无效，返回404
  if (!isValidSlug) {
    console.warn(`[getStaticProps] Invalid slug detected: ${currentSlugPath}, redirecting to 404`);
    return {
      notFound: true,
    };
  }

  // Reason: `undefined` cannot be serialized as JSON. Please use `null` or omit this value.
  const fullDocuoConfig = LibControllerImpl.getDocuoConfig();
  LibControllerImpl.addDefaultLink();
  const instances = LibControllerImpl.getInstances();
  const { instanceID, slugVersion, docVersion } =
    CommonControllerImpl.getExtractInfoFromSlug(slug, instances);
  const { currentLanguage } =
    LanguageControllerImpl.getInfoByInstanceID(instanceID);
  const folderTreeData = TreeControllerImpl.getFolderTreeDataBySlug(slug);
  const displayVersions = VersionsControllerImpl.getDisplayVersions(slug);
  const fullDisplayInstances =
    LibControllerImpl.getDisplayInstances(currentLanguage);
  const { displayLanguages, currentLanguageLabel } =
    LanguageControllerImpl.getDisplayLanguages(slug);
  const { displayGroups, currentGroup, currentGroupLabel } =
    GroupControllerImpl.getDisplayGroups(slug, currentLanguage);
  const { displayPlatforms, currentPlatform, currentPlatformLabel } =
    PlatformControllerImpl.getDisplayPlatforms(slug, currentLanguage);
  ShortLinkTransControllerImpl.injectData({ locale: currentLanguage });
  const postData = await DocsControllerImpl.readDoc(slug);
  const versions = CommonControllerImpl.getUsedVersions(
    instanceID,
    LibControllerImpl.getTargetInstance(instanceID)
  );
  const currentInstance = fullDisplayInstances.find((item) => {
    // Matches multiple language instance id
    return item.instance.id === instanceID;
  });
  const { prev, curr, next } = PagerControllerImpl.getPageTurningData(slug);
  const { displayCategorys, currentCategory, currentProduct } =
    CategoryTransControllerImpl.getDisplayCategorys(
      currentLanguage,
      instanceID,
      displayGroups
    );
  const { displayTabs, currentTab, currentTabLabel, shouldShowTabs } =
    TabControllerImpl.getDisplayTabs(slug, currentLanguage);

  // 应用优化
  const docuoConfig = optimizeDocuoConfig(fullDocuoConfig, currentLanguage);
  // 只保留当前产品组的实例，大幅减少数据传输
  const displayInstances = optimizeDisplayInstances(fullDisplayInstances, currentLanguage, currentGroup);

  return {
    props: {
      ...postData,
      instanceID,
      currentInstanceLabel: currentInstance.instance.label,
      docVersion: docVersion || slugVersion || DEFAULT_CURRENT_SLUG_VERSION,
      slugVersion,
      folderTreeData,
      docuoConfig,
      displayVersions,
      displayInstances,
      currentLanguage,
      currentLanguageLabel,
      displayLanguages,
      currentGroup,
      currentGroupLabel,
      displayGroups,
      currentPlatform,
      currentPlatformLabel,
      displayPlatforms,
      versions,
      prev,
      curr,
      next,
      currentCategory,
      currentProduct,
      displayCategorys,
      currentTab,
      currentTabLabel,
      displayTabs,
      shouldShowTabs,
    },
  };
  // return {
  //   props: {},
  // };
};

export function getStaticPaths() {
  console.time("getAllSlugs");
  const paths = SlugControllerImpl.generateAllSlugs();
  console.timeEnd("getAllSlugs");

  return {
    paths,
    fallback: true,
  };
}

export default function DocPage(props: Props) {
  const { mdxSource, slug } = props;
  // console.log("DocPage", slug);
  if (!slug) {
    return null;
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const Component = useMemo(
    () => getMDXComponent(mdxSource.code, MDX_GLOBAL_CONFIG),
    [mdxSource.code]
  );
  return (
    <div className="prose" style={{ maxWidth: "unset" }}>
      <PageHead {...props}></PageHead>
      <article className="editor-wrapper">
        <ApiItem {...props}>
          {/* @ts-ignore */}
          {/* <MDXRemote {...mdxSource} components={components} /> */}
          {/* @ts-ignore */}
          <MDXProvider components={components}>
            <Component />
          </MDXProvider>
        </ApiItem>
      </article>
    </div>
  );
}

function PageHead(props: Props) {
  const {
    mdxSource,
    docuoConfig,
    frontmatterRef,
    slug,
    currentInstanceLabel,
    slugVersion,
    currentLanguage,
    currentGroupLabel,
    currentPlatformLabel,
    curr,
  } = props;
  const frontmatter = mdxSource.frontmatter as DocFrontMatter;
  const str = `${currentInstanceLabel ? currentInstanceLabel + " " : ""}${
    slugVersion ? slugVersion + " " : ""
  }`;
  let { title, keywords = [], description } = frontmatter;
  title = `${str}${
    title ||
    curr.description ||
    frontmatterRef.fileName ||
    docuoConfig.title ||
    ""
  }`;
  description = `${str}${
    description ||
    frontmatterRef.firstParagraphContent ||
    docuoConfig.description ||
    ""
  }`;
  const navbarLogo = docuoConfig.themeConfig.navbar.logo;
  let logo =
    typeof navbarLogo === "string"
      ? navbarLogo
      : typeof navbarLogo !== "undefined"
      ? navbarLogo.dark
      : "";
  logo = logo.includes("http")
    ? `${logo}`
    : logo
    ? `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/${logo.replace(/^\//, "")}`
    : "";
  const ogSiteName = frontmatter["og:site_name"] || docuoConfig.title || "";
  const ogUrl =
    frontmatter["og:url"] ||
    `${
      process.env.NEXT_PUBLIC_CUSTOM_DOMAIN ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      ""
    }${process.env.NEXT_PUBLIC_BASE_PATH || ""}` ||
    "";
  const ogImage = frontmatter["og:image"] || "";
  const ogLocale = frontmatter["og:locale"] || "en_US";
  const ogLogo = frontmatter["og:logo"] || logo;
  const articlePublisher = frontmatter["article:publisher"] || "";
  const twitterUrl = frontmatter["twitter:url"] || "";
  const twitterImage =
    frontmatter["twitter:image"] || frontmatterRef.firstImgSrc;
  const twitterSite = frontmatter["twitter:site"] || "";
  const ogImageWidth = frontmatter["og:image:width"] || "";
  const ogImageHeight = frontmatter["og:image:height"] || "";
  const searchDocType =
    frontmatter["docType"] ||
    (currentLanguage === defaultLanguage ? "Docs" : "技术文档");

  if (currentLanguage !== defaultLanguage) {
    // 平台+开发语言+产品名称+文档标题 - 开发者中心 - ZEGO即构科技
    // Android Java 实时音视频 概述 - 开发者中心 - ZEGO即构科技
    title = `${currentPlatformLabel.replaceAll(
      /:\s*/g,
      " "
    )} ${currentGroupLabel} ${
      frontmatter.title ||
      curr.description ||
      frontmatterRef.fileName ||
      docuoConfig.title
    } - 开发者中心 - ZEGO即构科技`;
    description = "";
    keywords = [];
  }
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(",")} />
      {ogSiteName ? (
        <meta property="og:site_name" content={ogSiteName}></meta>
      ) : null}
      <meta property="og:title" content={title}></meta>
      <meta property="og:description" content={description}></meta>
      {ogUrl ? <meta property="og:url" content={ogUrl}></meta> : null}
      {ogImage ? <meta property="og:image" content={ogImage}></meta> : null}
      {ogLocale ? <meta property="og:locale" content={ogLocale}></meta> : null}
      {ogLogo ? <meta property="og:logo" content={ogLogo}></meta> : null}
      {articlePublisher ? (
        <meta property="article:publisher" content={articlePublisher}></meta>
      ) : null}
      <meta name="twitter:title" content={title}></meta>
      <meta name="twitter:description" content={description}></meta>
      {twitterUrl ? (
        <meta name="twitter:url" content={twitterUrl}></meta>
      ) : null}
      {twitterImage ? (
        <meta name="twitter:image" content={twitterImage}></meta>
      ) : null}
      {twitterSite ? (
        <meta name="twitter:site" content={twitterSite}></meta>
      ) : null}
      {ogImageWidth ? (
        <meta property="og:image:width" content={ogImageWidth}></meta>
      ) : null}
      {ogImageHeight ? (
        <meta property="og:image:height" content={ogImageHeight}></meta>
      ) : null}
      <meta name="docsearch:doctype" content={searchDocType} />
      <link
        rel="canonical"
        href={`${
          process.env.NEXT_PUBLIC_CUSTOM_DOMAIN ||
          process.env.NEXT_PUBLIC_SITE_URL ||
          ""
        }${process.env.NEXT_PUBLIC_BASE_PATH || ""}/${slug.join("/")}`}
      />
    </Head>
  );
}

DocPage.getLayout = function getLayout(page, pageProps) {
  return <PreviewLayout {...pageProps}>{page}</PreviewLayout>;
};

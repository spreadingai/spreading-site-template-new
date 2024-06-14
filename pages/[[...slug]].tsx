import React, { useMemo } from "react";
import PreviewLayout from "@/components/preview-layout";
// import { MDXRemote } from "next-mdx-remote";
import { MDXProvider, useMDXComponents } from "@mdx-js/react";
import {
  CodeBlock,
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
} from "@spreading/docuo-mdx-component";
import LibControllerImpl from "@/lib";
import DocsControllerImpl from "@/lib/docs-help";
import TreeControllerImpl from "@/lib/tree-help";
import SlugControllerImpl from "@/lib/slug-help";
import LanguageControllerImpl from "@/lib/language-help";
import VersionsControllerImpl from "@/lib/versions-help";
import Link from "next/link";
import { SlugData, DocuoConfig, TocItem, DocInstance } from "@/lib/types";
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
import { Mermaid } from "mdx-mermaid/lib/Mermaid";

const MDX_GLOBAL_CONFIG = {
  MdxJsReact: {
    useMDXComponents,
  },
};

const components = {
  CodeBlock,
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
  a: Link,
  mermaid: (props) => <Mermaid config={{ theme: "default" }} {...props} />,
  Mermaid: (props) => <Mermaid config={{ theme: "default" }} {...props} />,
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

interface Props {
  mdxSource: any;
  toc: TocItem[];
  slug: string[];
  docuoConfig: DocuoConfig;
  instances: DocInstance[];
  versions: string[];
  frontmatterRef: {
    fileName: string;
    firstParagraphContent: string;
    firstImgSrc: string;
  };
}

export const getStaticProps = async ({ params }: SlugData) => {
  // TODO: Here some methods are executed multiple times
  console.log(
    new Date().toISOString().slice(0, 23),
    "[Spreading] getStaticProps..."
  );
  const slug = params.slug;
  // Remove the effect of anchor points
  slug[slug.length - 1] = slug[slug.length - 1].replace(/#.*$/, "");
  // Reason: `undefined` cannot be serialized as JSON. Please use `null` or omit this value.
  const docuoConfig = LibControllerImpl.getDocuoConfig();
  LibControllerImpl.addDefaultLink();
  const { instanceID, slugVersion, docVersion } =
    SlugControllerImpl.getExtractInfoFromSlug(slug);
  const { baseInstanceID } =
    LanguageControllerImpl.getInfoByInstanceID(instanceID);
  const folderTreeData = TreeControllerImpl.getFolderTreeDataBySlug(slug);
  const displayVersions = VersionsControllerImpl.getDisplayVersions(slug);
  const displayInstances = LibControllerImpl.getDisplayInstances();
  const { displayLanguages, currentLanguage } =
    LanguageControllerImpl.getDisplayLanguages(slug);
  const postData = await DocsControllerImpl.readDoc(slug);
  const instances = LibControllerImpl.getDocuoConfig().instances;
  const versions = VersionsControllerImpl.getUsedVersions(instanceID);
  return {
    props: {
      ...postData,
      instanceID,
      baseInstanceID,
      docVersion: docVersion || slugVersion || DEFAULT_CURRENT_SLUG_VERSION,
      folderTreeData,
      docuoConfig,
      displayVersions,
      displayInstances,
      currentLanguage,
      displayLanguages,
      instances,
      versions,
      prev: { title: "prev", description: "", href: "" },
      next: { title: "next", description: "", href: "" },
    },
  };
};

export function getStaticPaths() {
  console.log(
    new Date().toISOString().slice(0, 23),
    "[Spreading] getStaticPaths..."
  );
  const paths = SlugControllerImpl.getAllSlugs();
  console.time("copyStaticFile");
  DocsControllerImpl.copyStaticFile();
  console.timeEnd("copyStaticFile");
  return {
    paths,
    fallback: true,
  };
}

export default function DocPage(props: Props) {
  const { mdxSource, slug } = props;
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
  const { mdxSource, docuoConfig, frontmatterRef, slug } = props;
  const frontmatter = mdxSource.frontmatter as DocFrontMatter;
  let { title, description } = frontmatter;
  title = title || frontmatterRef.fileName || docuoConfig.title || "";
  description =
    description ||
    frontmatterRef.firstParagraphContent ||
    docuoConfig.description ||
    "";
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
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
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

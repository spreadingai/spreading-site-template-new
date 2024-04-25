import PreviewLayout from "@/components/preview-layout";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import {
  CodeBlock,
  CodeGroup,
  Callout,
  Frame,
  Video,
  Heading,
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

const components = {
  CodeBlock,
  CodeGroup,
  Tip: Callout.Tip,
  Note: Callout.Note,
  Warning: Callout.Warning,
  Error: Callout.Error,
  Frame,
  Video,
  Heading,
  a: Link,
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
  mdxSource: MDXRemoteSerializeResult;
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
  return (
    <div className="prose" style={{ maxWidth: "unset" }}>
      <PageHead {...props}></PageHead>
      <article className="editor-wrapper">
        <ApiItem {...props}>
          {/* @ts-ignore */}
          <MDXRemote {...mdxSource} components={components} />
        </ApiItem>
      </article>
    </div>
  );
}

function PageHead(props: Props) {
  const { mdxSource, docuoConfig, frontmatterRef } = props;
  const frontmatter = mdxSource.frontmatter as DocFrontMatter;
  let { title, description } = frontmatter;
  title = title || frontmatterRef.fileName || docuoConfig.title || "";
  description =
    description ||
    frontmatterRef.firstParagraphContent ||
    docuoConfig.description ||
    "";
  const navbarLogo = docuoConfig.themeConfig.navbar.logo;
  let ogLogo =
    typeof navbarLogo === "string"
      ? navbarLogo
      : typeof navbarLogo !== "undefined"
      ? navbarLogo.dark
      : "";
  ogLogo = ogLogo.includes("http")
    ? `${ogLogo}`
    : `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/${ogLogo.replace(/^\//, "")}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        property="og:site_name"
        content={frontmatter["og:site_name"] || docuoConfig.title || ""}
      ></meta>
      <meta property="og:title" content={title}></meta>
      <meta property="og:description" content={description}></meta>
      <meta
        property="og:url"
        content={
          frontmatter["og:url"] || process.env.NEXT_PUBLIC_SITE_URL || ""
        }
      ></meta>
      <meta property="og:image" content={frontmatter["og:image"] || ""}></meta>
      <meta
        property="og:locale"
        content={frontmatter["og:locale"] || "en_US"}
      ></meta>
      <meta
        property="og:logo"
        content={frontmatter["og:logo"] || ogLogo}
      ></meta>
      <meta
        property="article:publisher"
        content={frontmatter["article:publisher"] || ""}
      ></meta>
      <meta name="twitter:title" content={title}></meta>
      <meta name="twitter:description" content={description}></meta>
      <meta
        name="twitter:url"
        content={frontmatter["twitter:url"] || ""}
      ></meta>
      <meta
        name="twitter:image"
        content={frontmatter["twitter:image"] || frontmatterRef.firstImgSrc}
      ></meta>
      <meta
        name="twitter:site"
        content={frontmatter["twitter:site"] || ""}
      ></meta>
      <meta
        property="og:image:width"
        content={frontmatter["og:image:width"] || ""}
      ></meta>
      <meta
        property="og:image:height"
        content={frontmatter["og:image:height"] || ""}
      ></meta>
    </Head>
  );
}

DocPage.getLayout = function getLayout(page, pageProps) {
  return <PreviewLayout {...pageProps}>{page}</PreviewLayout>;
};

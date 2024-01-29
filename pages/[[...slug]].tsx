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
import VersionsControllerImpl from "@/lib/versions-help";
import Link from "next/link";
import { SlugData, DocuoConfig, TocItem } from "@/lib/types";
import Head from "next/head";
import { CMS_NAME } from "@/lib/constants";

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
};

interface Props {
  mdxSource: MDXRemoteSerializeResult;
  toc: TocItem[];
  slug: string[];
  docuoConfig: DocuoConfig;
}

export const getStaticProps = async ({ params }: SlugData) => {
  // Reason: `undefined` cannot be serialized as JSON. Please use `null` or omit this value.
  const docuoConfig = LibControllerImpl.getDocuoConfig();
  const allSlugs = SlugControllerImpl.getAllSlugs();
  LibControllerImpl.addDefaultLink(allSlugs);
  const { instanceID, slugVersion, docVersion } =
    SlugControllerImpl.getExtractInfoFromSlug(params.slug);
  const defaultVersion = VersionsControllerImpl.getDefaultVersion();
  const folderTreeData = TreeControllerImpl.getFolderTreeDataBySlug(
    params.slug
  );
  const displayVersions = VersionsControllerImpl.getDisplayVersions(
    params.slug
  );
  const displayInstances = LibControllerImpl.getDisplayInstances();
  const postData = await DocsControllerImpl.readDoc(params.slug);
  return {
    props: {
      ...postData,
      instanceID,
      docVersion: docVersion || slugVersion || defaultVersion,
      folderTreeData,
      docuoConfig,
      displayVersions,
      displayInstances,
    },
  };
};

export function getStaticPaths() {
  console.log(
    new Date().toISOString().slice(0, 23),
    "[Spreading] getStaticPaths..."
  );
  const paths = SlugControllerImpl.getAllSlugs();
  DocsControllerImpl.copyStaticFile();
  return {
    paths,
    fallback: true,
  };
}

export default function DocPage({ mdxSource, slug, docuoConfig }: Props) {
  if (!slug) {
    return null;
  }
  const title =
    (mdxSource?.frontmatter?.title as string) || docuoConfig.title || "";
  const description =
    (mdxSource?.frontmatter?.description as string) ||
    `A statically generated blog example using Next.js and ${CMS_NAME}.`;
  return (
    <div className="prose" style={{ maxWidth: "unset" }}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <article className="editor-wrapper">
        {/* @ts-ignore */}
        <MDXRemote {...mdxSource} components={components} />
      </article>
    </div>
  );
}

DocPage.getLayout = function getLayout(page, pageProps) {
  return <PreviewLayout {...pageProps}>{page}</PreviewLayout>;
};

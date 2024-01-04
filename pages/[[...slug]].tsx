import PreviewLayout from "@/components/preview-layout";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import {
  CodeBlock,
  CodeGroup,
  Callout,
  Frame,
  Video,
} from "docuo-mdx-component";
import LibControllerImpl from "@/lib";
import DocsControllerImpl from "@/lib/docs-help";
import TreeControllerImpl from "@/lib/tree-help";
import SlugControllerImpl from "@/lib/slug-help";
import VersionsControllerImpl from "@/lib/versions-help";
import Link from "next/link";
import { SlugData } from "@/lib/types";

const components = {
  CodeBlock,
  CodeGroup,
  Tip: Callout.Tip,
  Note: Callout.Note,
  Warning: Callout.Warning,
  Error: Callout.Error,
  Frame,
  Video,
  a: Link,
};

interface Props {
  mdxSource: MDXRemoteSerializeResult;
  slug: string[];
}

export const getStaticProps = async ({ params }: SlugData) => {
  // Reason: `undefined` cannot be serialized as JSON. Please use `null` or omit this value.
  console.log(
    new Date().toISOString().slice(0, 23),
    "[Spreading] getStaticProps:",
    params
  );
  const instanceID = SlugControllerImpl.getInstanceIDFromSlug(params.slug);
  const folderTreeData = TreeControllerImpl.getFolderTreeDataBySlug(
    params.slug
  );
  const displayVersions = VersionsControllerImpl.getDisplayVersions(
    params.slug
  );
  const docuoConfig = LibControllerImpl.getDocuoConfig();
  console.log(
    "[Spreading] getStaticProps docuoConfig",
    JSON.stringify(docuoConfig)
  );
  const postData = await DocsControllerImpl.readDoc(params.slug);
  return {
    props: {
      ...postData,
      instanceID,
      folderTreeData,
      docuoConfig,
      displayVersions,
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
  LibControllerImpl.addDefaultLink(paths);
  return {
    paths,
    fallback: true,
  };
}

export default function DocPage({ mdxSource, slug }: Props) {
  if (!slug) {
    return null;
  }
  return (
    <div className="prose" style={{ maxWidth: "unset" }}>
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

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

const components = {
  CodeBlock,
  CodeGroup,
  Tip: Callout.Tip,
  Note: Callout.Note,
  Warning: Callout.Warning,
  Error: Callout.Error,
  Frame,
  Video,
};

interface Props {
  mdxSource: MDXRemoteSerializeResult;
  slug: string[];
}

export const getStaticProps = async ({
  params,
}: {
  params: {
    slug: string[];
    instanceID: string; // Can not get
    slugVersion: string; // Can not get
    sidebarId: string; // Can not get
  };
}) => {
  console.log(
    new Date().toISOString().slice(0, 23),
    "[Spreading] getStaticProps:",
    params
  );
  const docuoConfig = LibControllerImpl.getDocuoConfig();
  const folderTreeData = TreeControllerImpl.getFolderTreeDataBySlug(
    params.slug
  );
  const postData = await DocsControllerImpl.readDoc(params.slug);
  return {
    props: {
      ...postData,
      folderTreeData,
      docuoConfig,
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

export default function DocPage({ mdxSource, slug }: Props) {
  if (!slug) {
    return null;
  }
  return (
    <div className="prose" style={{ maxWidth: "unset" }}>
      <article className="editor-wrapper">
        <MDXRemote {...mdxSource} components={components} />
      </article>
    </div>
  );
}

DocPage.getLayout = function getLayout(page, pageProps) {
  return <PreviewLayout {...pageProps}>{page}</PreviewLayout>;
};

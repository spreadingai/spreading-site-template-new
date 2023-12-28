import PreviewLayout from "@/components/preview-layout";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import {
  CodeBlock,
  CodeGroup,
  SH,
  SQuote,
  SCallout,
  SCalloutHeader,
  SCalloutContent,
  STitle,
} from "docuo-mdx-component";
import { getAllSlugs, getDocuoConfig, readDoc } from "@/lib/docs";
import { getFolderTreeDataBySlug } from "@/lib/folder-tree";

const components = {
  CodeBlock,
  CodeGroup,
  Blockquote: SQuote,
  SH,
  SCallout,
  SCalloutHeader,
  SCalloutContent,
  STitle,
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
    version: string; // Can not get
    sidebarId: string; // Can not get
  };
}) => {
  console.log(
    new Date().toISOString().slice(0, 23),
    "[Spreading] getStaticProps:",
    params
  );
  const folderTreeData = getFolderTreeDataBySlug(params.slug);
  const docuoConfig = getDocuoConfig();
  const postData = await readDoc(params.slug);
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
  const paths = getAllSlugs();

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

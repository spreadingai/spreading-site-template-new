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
import DocsControllerImpl from "@/lib/docs-help";

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
  const folderTreeData = DocsControllerImpl.getFolderTreeDataBySlug(
    params.slug
  );
  const docuoConfig = DocsControllerImpl.getDocuoConfig();
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
  const paths = DocsControllerImpl.getAllSlugs();

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

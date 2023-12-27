import fs from "fs";
import path from "path";
import PreviewLayout from "@/components/preview-layout";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Head from "next/head";
import { useState } from "react";

// plugins
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
// import remarkMdxImages from "remark-mdx-images";
import remarkImages from "remark-images";
import { rehypeCodeBlocks, rehypeCodeGroup } from "@/plugins";

import {
  CodeBlock,
  CodeGroup,
  SH,
  SQuote,
  SCallout,
  SCalloutHeader,
  SCalloutContent,
} from "docuo-mdx-component";

const components = {
  CodeBlock,
  CodeGroup,
  Blockquote: SQuote,
  SH,
  SCallout,
  SCalloutHeader,
  SCalloutContent,
};

interface Props {
  mdxSource: MDXRemoteSerializeResult;
}

const readDoc = async () => {
  let originContent = fs.readFileSync(
    path.resolve("./mdxs", "reference/components.md"),
    "utf8"
  );

  const mdxSource = await serialize(originContent, {
    mdxOptions: {
      remarkPlugins: [
        remarkGfm,
        remarkMath,
        remarkImages,
        // @ts-ignore
        // remarkMdxImages,
        // myRemarkPlugin,
      ],
      rehypePlugins: [
        // @ts-ignore
        rehypeKatex,
        rehypeCodeBlocks,
        rehypeCodeGroup,
      ],
      format: "mdx",
      // useDynamicImport: true,
    },
    parseFrontmatter: true,
  });
  return {
    slug: [
      "test project7",
      "main",
      "Novel.sh",
      "typescript-as-config",
      "d22677f7",
    ],
    mdxSource,
  };
};

const getFolderTreeData = () => {
  return [
    {
      title: "test project7",
      type: "folder",
      key: "test project7",
      children: [
        {
          title: "main",
          type: "folder",
          key: "test project7/main",
          children: [
            {
              title: "English",
              type: "folder",
              key: "test project7/main/en_us",
              children: [
                {
                  title: "Default collection",
                  type: "folder",
                  key: "test project7/main/en_US/Default collection",
                  children: [
                    {
                      title: "Novel.sh",
                      type: "folder",
                      key: "test project7/main/Novel.sh",
                      children: [
                        {
                          title: "介绍",
                          type: "file",
                          key: "test project7/main/Novel.sh/Introduction/c2f32c16",
                          isContentVisible: true,
                          children: [],
                        },
                        {
                          title: "快速上手",
                          type: "file",
                          key: "test project7/main/Novel.sh/getting-started/d22677f7",
                          isContentVisible: true,
                          children: [],
                        },
                        {
                          title: "目录结构",
                          type: "file",
                          key: "test project7/main/Novel.sh/directory-structure/d22677f7",
                          isContentVisible: true,
                          children: [],
                        },
                        {
                          title: "基本配置",
                          type: "file",
                          key: "test project7/main/Novel.sh/basic-config/d22677f7",
                          isContentVisible: true,
                          children: [],
                        },
                        {
                          title: "内置组件",
                          type: "file",
                          key: "test project7/main/Novel.sh/typescript-as-config/d22677f7",
                          isContentVisible: true,
                          children: [],
                        },
                        {
                          title: "静态资源",
                          type: "file",
                          key: "test project7/main/Novel.sh/assets/d22677f7",
                          isContentVisible: true,
                          children: [],
                        },
                        {
                          title: "Markdown 拓展",
                          type: "file",
                          key: "test project7/main/Novel.sh/markdown/d22677f7",
                          isContentVisible: true,
                          children: [],
                        },
                        {
                          title: "主题",
                          type: "file",
                          key: "test project7/main/Novel.sh/using-vue/d22677f7",
                          isContentVisible: true,
                          children: [],
                        },
                        {
                          title: "多语言支持",
                          type: "file",
                          key: "test project7/main/Novel.sh/i18n/d22677f7",
                          isContentVisible: true,
                          children: [],
                        },

                        {
                          title: "部署",
                          type: "file",
                          key: "test project7/main/Novel.sh/deploy/d22677f7",
                          isContentVisible: true,
                          children: [],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ];
};

const getSiteInfo = () => {
  return {
    title: "xxx",
    iconRedirectUrl: "https://app.spreading.ai",
    version: "32",
  };
};

const getProxyPath = () => {
  return "";
};

export async function getStaticProps() {
  const postData = await readDoc();
  const folderTreeData = getFolderTreeData();
  const siteInfo = getSiteInfo();
  const proxyPath = getProxyPath();
  return {
    props: {
      ...postData,
      frontmatter: postData.mdxSource.frontmatter,
      folderTreeData,
      siteInfo,
      proxyPath,
    },
  };
}

export default function RemoteMdxPage({ mdxSource }: Props) {
  const [darkMode, setDarkMode] = useState(false);
  console.log(`[RemoteMdxPage]frontmatter `, mdxSource.frontmatter);
  return (
    <>
      <Head>
        <title>{(mdxSource as any)?.frontmatter?.title || ""}</title>
        <meta
          name="description"
          content={(mdxSource as any)?.frontmatter?.description}
        />
      </Head>
      <div className="prose" style={{ maxWidth: "unset" }}>
        {/* <button onClick={() => setDarkMode(!darkMode)}>{ darkMode ? 'light' : 'dark' }</button> */}
        <article className="editor-wrapper">
          <MDXRemote {...mdxSource} components={components} />
        </article>
      </div>
    </>
  );
}

RemoteMdxPage.getLayout = function getLayout(page, pageProps) {
  return <PreviewLayout {...pageProps}>{page}</PreviewLayout>;
};

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
    path.resolve("./mdxs", "test_default.mdx"),
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
      "Getting Started",
      "Installation",
      "7f6e8517",
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
                          title: "Overview",
                          type: "folder",
                          key: "test project7/main/Novel.sh/Overview",
                          children: [
                            {
                              title: "Introduction",
                              type: "file",
                              key: "test project7/main/Novel.sh/Overview/Introduction/c2f32c16",
                              isContentVisible: true,
                              children: [],
                            },
                            {
                              title: "Features",
                              type: "file",
                              key: "test project7/main/Novel.sh/Overview/Features/d22677f7",
                              isContentVisible: true,
                              children: [],
                            },
                          ],
                        },
                        {
                          title: "Getting Started",
                          type: "folder",
                          key: "test project7/main/Novel.sh/Getting Started",
                          children: [
                            {
                              title: "Installation",
                              type: "file",
                              key: "test project7/main/Novel.sh/Getting Started/Installation/7f6e8517",
                              isContentVisible: true,
                              children: [],
                            },
                            {
                              title: "Configuration",
                              type: "file",
                              key: "test project7/main/Novel.sh/Getting Started/Configuration/37af3200",
                              isContentVisible: true,
                              children: [],
                            },
                          ],
                        },
                        {
                          title: "Tech Stack",
                          type: "folder",
                          key: "test project7/main/Novel.sh/Tech Stack",
                          children: [
                            {
                              title: "Technologies",
                              type: "file",
                              key: "test project7/main/Novel.sh/Tech Stack/Technologies/d27057bb",
                              isContentVisible: true,
                              children: [],
                            },
                            {
                              title: "Advanced Features",
                              type: "file",
                              key: "test project7/main/Novel.sh/Tech Stack/Advanced Features/d92cf834",
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

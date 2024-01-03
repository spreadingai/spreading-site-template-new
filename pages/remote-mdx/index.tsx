import fs from "fs";
import path from "path";
import PreviewLayout from "@/components/preview-layout";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import Script from "next/script";

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
  Callout,
  Frame,
  Video,
} from "docuo-mdx-component";

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
}

const readDoc = async () => {
  let originContent = fs.readFileSync(
    path.resolve("./docs/docs", "foo1.mdx"),
    "utf8"
  );

  // <Snippet file="my-snippet.mdx" />
  originContent = originContent.replace(/<Snippet file=["'](\S+?)["'][\S\s]*?\/>/gm, (_, filename) => {
    let snippetContent = "";
    try {
      snippetContent = fs.readFileSync(
        path.resolve("./mdxs", filename),
        "utf8"
      );
    } catch (error) {
      snippetContent = "";
    }
    return snippetContent;
  });

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
  const router = useRouter();
  console.log('router=', router);
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
        {
          router?.query?.preview === "true" && (
            <Script strategy="beforeInteractive" src="/socket.io/socket.io.js"></Script>              
          )
        }
        {
          router?.query?.preview === "true" && (            
            <Script strategy="afterInteractive" id="socket" dangerouslySetInnerHTML={{
              __html: `
              var socket = io();
              socket.on("reload", function() {
                window.location.reload();
              });
              `
            }}></Script>
          )
        }
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

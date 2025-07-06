import fs from "fs";
import path from "path";
// import { serialize } from "next-mdx-remote/serialize";
import { bundleMDX } from "mdx-bundler";

// plugins
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import remarkImages from "remark-images";
import mdxMermaid from "mdx-mermaid";
import remarkDirective from "remark-directive";
import {
  rehypeImages,
  rehypeLink,
  rehypeA,
  rehypeCodeBlocks,
  rehypeCodeGroup,
  remarkToc,
  remarkFrontmatter,
  rehypeNestedFormat,
  remarkConditions,
  // remarkTest,
} from "@/plugins";

import LibControllerImpl from "./index";
import CommonControllerImpl from "./optimize/common";
import ShortLinkTransControllerImpl from "./trans-short-link";
import { convertDocID, ignoreNumberPrefix, removeMdxSuffix } from "./utils";
import { DEFAULT_INSTANCE_ID, ENTITY_ROOT_DIRECTORY } from "./constants";
import { InstanceType } from "./types";

// import Markdoc from "@markdoc/markdoc";

class DocsController {
  static _instance: DocsController;
  static getInstance() {
    return (
      DocsController._instance ||
      (DocsController._instance = new DocsController())
    );
  }
  async readDoc(slug: string[]) {
    // const source = "# Markdoc";

    // const ast = Markdoc.parse(source);
    // const content = Markdoc.transform(ast /* config */);

    // const html = Markdoc.renderers.html(content);

    console.log(`[DocsController]readDoc `, slug);
    const instances = LibControllerImpl.getInstances();
    const { docVersion, mdxFileID, instanceID, slugVersion, routeBasePath } =
      CommonControllerImpl.getExtractInfoFromSlug(slug, instances);
    const instance = LibControllerImpl.getTargetInstance(instanceID);
    const versions = CommonControllerImpl.getUsedVersions(instanceID, instance);

    let originContent =
      "The conversion of the article content encountered an exception and cannot be displayed.";
    let mdxFileUrl = "";
    let rootUrl = "",
      newRootUrl = "";
    // console.log(
    //   `[DocsController]readDoc slugVersion、versions`,
    //   slugVersion,
    //   versions
    // );
    if (!slugVersion || slugVersion !== versions[0]) {
      const targetInstance = LibControllerImpl.getInstances(InstanceType.Normal)
        .find((instance) => instance.id === instanceID);

      if (!targetInstance) {
        console.warn(`[DocsController]readDoc: Instance not found: ${instanceID}`);
        return {
          slug,
          mdxSource: { code: "", frontmatter: {} },
          toc: [],
          frontmatterRef: {},
        };
      }

      // 直接使用实例配置中的path，支持任意路径结构
      rootUrl = path.join(ENTITY_ROOT_DIRECTORY, targetInstance.path);

      // 如果有版本，在path后面添加版本目录
      if (docVersion) {
        rootUrl = path.join(ENTITY_ROOT_DIRECTORY, targetInstance.path, "versioned_docs", `version-${docVersion}`);
      }
      const actualMdxFilePath = this.getActualMdxFilePath(rootUrl, mdxFileID);
      if (actualMdxFilePath) {
        // console.log(`[DocsController]readDoc found MDX file: ${actualMdxFilePath}`);
        mdxFileUrl = actualMdxFilePath;
        originContent = fs.readFileSync(actualMdxFilePath, "utf8");
      } else {
        console.warn(`[DocsController]readDoc MDX file not found - rootUrl: ${rootUrl}, mdxFileID: ${mdxFileID}`);
      }
    }

    // console.time("count transShortLink");
    // const regex = /^---\n+[\s|\S]*?articleID:\s?(\d+)[\s|\S]*?\n+---/;
    // const match = originContent.match(regex);
    // if (match && match[1]) {
    //   const result = await ShortLinkTransControllerImpl.replaceApiShortLink(
    //     match[1],
    //     originContent
    //   );
    //   originContent = result.content;
    // }
    // console.timeEnd("count transShortLink");

    const tocRef: any = {};
    const temp = mdxFileUrl.split("/");
    const frontmatterRef: any = {
      fileName: ignoreNumberPrefix(removeMdxSuffix(temp[temp.length - 1])),
    };
    const linkObj = {
      rootUrl: `${rootUrl}`,
      filePath: mdxFileUrl,
      prefix: `${
        slugVersion ? (routeBasePath ? routeBasePath + "/" : "") : routeBasePath
      }${slugVersion}`,
    };
    const remarkPlugins = [
      // remarkTest,
      remarkDirective,
      remarkGfm,
      remarkMath,
      remarkImages,
      [mdxMermaid, {
        mermaid: {
          theme: "default",
          startOnLoad: false,
          securityLevel: "loose"
        },
        output: "component" // 使用组件模式而不是 SVG 模式
      }],
      [remarkToc, { exportRef: tocRef }],
      [remarkFrontmatter, { exportRef: frontmatterRef }],
      remarkConditions,
    ];
    const rehypePlugins = [
      rehypeKatex,
      rehypeCodeBlocks,
      rehypeCodeGroup,
      rehypeNestedFormat,
      [rehypeImages, { filePath: mdxFileUrl, exportRef: frontmatterRef }],
      [rehypeLink, linkObj],
      [rehypeA, linkObj],
    ];
    // const mdxSource = await serialize(originContent, {
    //   mdxOptions: {
    //     // @ts-ignore
    //     remarkPlugins,
    //     // @ts-ignore
    //     rehypePlugins,
    //     format: "mdx",
    //     useDynamicImport: true,
    //   },
    //   parseFrontmatter: true,
    // });

    const cwd = mdxFileUrl ? path.dirname(mdxFileUrl) : undefined;
    const globals = {
      "@mdx-js/react": {
        varName: "MdxJsReact",
        namedExports: ["useMDXComponents"],
        defaultExport: false,
      },
    };
    const mdxSource = await bundleMDX({
      cwd,
      source: originContent,
      globals,
      mdxOptions: (opts) => {
        opts.remarkPlugins = [...(opts.remarkPlugins ?? []), ...remarkPlugins];
        opts.rehypePlugins = [...(opts.rehypePlugins ?? []), ...rehypePlugins];
        return {
          ...opts,
          providerImportSource: "@mdx-js/react",
        };
      },
    });

    // Copy frontmatter img
    mdxSource.frontmatter = mdxSource.frontmatter || {};
    mdxSource.frontmatter["og:logo"] = this.getPublicPath(
      mdxSource.frontmatter["og:logo"],
      mdxFileUrl
    );
    mdxSource.frontmatter["og:image"] = this.getPublicPath(
      mdxSource.frontmatter["og:image"],
      mdxFileUrl
    );

    // console.time("count transShortLink");
    if (mdxSource.frontmatter && mdxSource.frontmatter.articleID) {
      const result = await ShortLinkTransControllerImpl.replaceApiShortLink(
        mdxSource.frontmatter.articleID,
        mdxSource.matter.content,
        mdxSource.code
      );
      mdxSource.matter.content = result.content;
      mdxSource.code = result.codeStr;
    }
    // console.timeEnd("count transShortLink");

    console.log(`[DocsController]readDoc end`);
    delete mdxSource.matter.content;
    return {
      slug,
      mdxSource,
      toc: tocRef.toc || [],
      frontmatterRef,
    };
  }
  getPublicPath(relativePath, filePath) {
    if (!relativePath || !filePath) return "";
    if (relativePath.startsWith("http")) {
      return relativePath;
    }
    if (relativePath.startsWith("/")) {
      return `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${relativePath}`;
    }
    // Get the relative path of the image
    const imagePath = path.resolve(path.dirname(filePath), relativePath);
    // Determine whether the image exists
    const isExist = fs.existsSync(imagePath);
    // Skip if the image does not exist
    if (!isExist) return "";
    // Get the relative path of the image and
    const publicPath = path.relative("docs", imagePath);
    // Create the public directory (if it does not exist)
    fs.mkdirSync("public/docs", { recursive: true });
    // Create the same folder structure in the public directory
    fs.mkdirSync(path.join("public/docs", path.dirname(publicPath)), {
      recursive: true,
    });
    // Copy the image to the public directory
    const destPath = path.join("public/docs", publicPath);
    fs.copyFileSync(imagePath, destPath);
    return `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/docs/${path.join(
      publicPath
    )}`;
  }
  getActualMdxFilePath(rootUrl: string, mdxFileID: string) {
    const rootPath = path.resolve("./public", "..", rootUrl);
    const levels = mdxFileID.split("/");

    const loop = (sourcePath: string, level: number) => {
      const files = fs.readdirSync(sourcePath);
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        const joinPath = path.join(sourcePath, file);
        const stat = fs.statSync(joinPath);
        if (stat.isDirectory()) {
          if (level <= levels.length) {
            const targetPath = path.join(sourcePath, file);
            const result = loop(targetPath, level + 1);
            if (result) return result;
          } else {
            // console.log(
            //   `[DocsController]getActualMdxFilePath exceed level`,
            //   level
            // );
          }
        } else {
          let relativePath = path.relative(rootPath, joinPath);
          // Remove mdx|md suffix
          relativePath = removeMdxSuffix(relativePath);
          relativePath = ignoreNumberPrefix(relativePath);
          if (convertDocID(relativePath) === mdxFileID) {
            return joinPath;
          }
        }
      }
    };
    const actualMdxFilePath = loop(rootPath, 1);
    return actualMdxFilePath;
  }
}

export default DocsController.getInstance();

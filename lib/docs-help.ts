import fs from "fs";
import path from "path";
import { serialize } from "next-mdx-remote/serialize";

// plugins
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import remarkImages from "remark-images";
import {
  rehypeImages,
  rehypeLink,
  rehypeCodeBlocks,
  rehypeCodeGroup,
  remarkToc,
} from "@/plugins";

import LibControllerImpl from "./index";
import SlugControllerImpl from "./slug-help";
import VersionsControllerImpl from "./versions-help";

class DocsController {
  static _instance: DocsController;
  static getInstance() {
    return (
      DocsController._instance ||
      (DocsController._instance = new DocsController())
    );
  }
  async readDoc(slug: string[]) {
    console.log(`[DocsController]readDoc `, slug);
    const { docVersion, mdxFileID, instanceID, slugVersion, routeBasePath } =
      SlugControllerImpl.getExtractInfoFromSlug(slug);
    const versions = VersionsControllerImpl.getUsedVersions(instanceID);

    let originContent =
      "The conversion of the article content encountered an exception and cannot be displayed.";
    let mdxFileUrl = "";
    let rootUrl = "";
    console.log(
      `[DocsController]readDoc slugVersion、versions`,
      slugVersion,
      versions
    );
    if (!slugVersion || slugVersion !== versions[0]) {
      rootUrl = `${LibControllerImpl.getEntityRootDirectory()}/${
        instanceID === "default" ? "" : instanceID + "_"
      }docs`;
      if (docVersion) {
        rootUrl = `${LibControllerImpl.getEntityRootDirectory()}/${
          instanceID === "default" ? "" : instanceID + "_"
        }versioned_docs/version-${docVersion}`;
      }

      const actualMdxFilePath = this.getActualMdxFilePath(rootUrl, mdxFileID);
      if (actualMdxFilePath) {
        mdxFileUrl = actualMdxFilePath;
        originContent = fs.readFileSync(actualMdxFilePath, "utf8");
      }
    }
    const tocRef: any = {};
    const mdxSource = await serialize(originContent, {
      mdxOptions: {
        remarkPlugins: [
          remarkGfm,
          remarkMath,
          remarkImages,
          [remarkToc, { exportRef: tocRef }],
        ],
        rehypePlugins: [
          // @ts-ignore
          rehypeKatex,
          rehypeCodeBlocks,
          rehypeCodeGroup,
          [rehypeImages, { filePath: mdxFileUrl }],
          [
            rehypeLink,
            {
              rootUrl: `${rootUrl}`,
              filePath: mdxFileUrl,
              prefix: `${routeBasePath}${slugVersion ? "/" : ""}${slugVersion}`,
            },
          ],
        ],
        format: "mdx",
        useDynamicImport: true,
      },
      parseFrontmatter: true,
    });
    return {
      slug,
      mdxSource,
      toc: tocRef.toc || [],
    };
  }
  copyStaticFile() {
    const staticFileUrl = `${LibControllerImpl.getEntityRootDirectory()}/static`;
    const staticFilePath = path.resolve("./public", "..", staticFileUrl);
    const targetFileUrl = "public";
    const targetFilePath = path.resolve("./public", "..", targetFileUrl);

    function loop(source, target) {
      if (!fs.existsSync(source)) {
        return;
      }
      if (!fs.existsSync(target)) {
        fs.mkdirSync(target);
      }
      const files = fs.readdirSync(source);
      files.forEach((file) => {
        const sourcePath = path.join(source, file);
        const targetPath = path.join(target, file);

        if (fs.statSync(sourcePath).isDirectory()) {
          loop(sourcePath, targetPath);
        } else {
          fs.copyFileSync(sourcePath, targetPath);
        }
      });
    }
    loop(staticFilePath, targetFilePath);
  }
  getActualMdxFilePath(rootUrl: string, mdxFileID: string) {
    const rootPath = path.resolve("./public", "..", rootUrl);
    const levels = mdxFileID.split("/");

    const loop = (sourcePath: string, level: number) => {
      if (!fs.existsSync(sourcePath)) {
        return;
      }
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
            console.log(
              `[DocsController]getActualMdxFilePath exceed level`,
              level
            );
          }
        } else {
          let relativePath = path.relative(rootPath, joinPath);
          const suffixIndex = relativePath.lastIndexOf(".");
          const temp =
            suffixIndex !== -1
              ? relativePath.slice(0, suffixIndex)
              : relativePath;
          if (this.convertDocID(temp) === mdxFileID) {
            return joinPath;
          }
        }
      }
    };
    const actualMdxFilePath = loop(rootPath, 1);
    console.log(`getActualMdxFilePath actualMdxFilePath`, actualMdxFilePath);
    return actualMdxFilePath;
  }
  convertDocID(str: string) {
    // Quick Start, Quick-Start
    // Quick start, Quick-start
    // Quick start/Overview
    const result = [];
    const temp = str.split("/");
    temp.forEach((path) => {
      result.push(path.toLowerCase().replace(/\s+/g, "-"));
    });
    return result.join("/");
  }
}

export default DocsController.getInstance();

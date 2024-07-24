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
} from "@/plugins";

import LibControllerImpl from "./index";
import SlugControllerImpl from "./slug-help";
import VersionsControllerImpl from "./versions-help";
import { convertDocID, ignoreNumberPrefix, removeMdxSuffix } from "./utils";
import { DEFAULT_INSTANCE_ID } from "./constants";
import { InstanceType } from "./types";

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
    let rootUrl = "",
      newRootUrl = "";
    console.log(
      `[DocsController]readDoc slugVersion、versions`,
      slugVersion,
      versions
    );
    if (!slugVersion || slugVersion !== versions[0]) {
      const temp = LibControllerImpl.getInstances(InstanceType.Normal)
        .find((instance) => instance.id === instanceID)
        .path.split("/");
      const instanceFolder = temp.slice(0, temp.length - 1).join("/");
      rootUrl = path.join(
        LibControllerImpl.getEntityRootDirectory(),
        (instanceID === DEFAULT_INSTANCE_ID
          ? ""
          : (instanceFolder ? instanceFolder + "/" : "") + instanceID + "_") +
          "docs"
      );
      newRootUrl = path.join(
        LibControllerImpl.getEntityRootDirectory(),
        instanceID === DEFAULT_INSTANCE_ID
          ? "docs"
          : (instanceFolder ? instanceFolder + "/" : "") + "docs_" + instanceID
      );
      if (docVersion) {
        rootUrl = path.join(
          LibControllerImpl.getEntityRootDirectory(),
          `${
            instanceID === DEFAULT_INSTANCE_ID
              ? ""
              : (instanceFolder ? instanceFolder + "/" : "") + instanceID + "_"
          }versioned_docs`,
          `version-${docVersion}`
        );
        newRootUrl = path.join(
          LibControllerImpl.getEntityRootDirectory(),
          `${
            instanceID === DEFAULT_INSTANCE_ID
              ? "docs_"
              : (instanceFolder ? instanceFolder + "/" : "") +
                "docs_" +
                instanceID +
                "_"
          }versioned`,
          `version-${docVersion}`
        );
      }
      // Compatible prefixes and suffixes
      if (fs.existsSync(path.resolve("./public", "..", newRootUrl))) {
        rootUrl = newRootUrl;
      }
      const actualMdxFilePath = this.getActualMdxFilePath(rootUrl, mdxFileID);
      if (actualMdxFilePath) {
        console.log("#####actualMdxFilePath", actualMdxFilePath);
        mdxFileUrl = actualMdxFilePath;
        originContent = fs.readFileSync(actualMdxFilePath, "utf8");
      }
    }
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
      remarkDirective,
      remarkGfm,
      remarkMath,
      remarkImages,
      [mdxMermaid, { mermaid: { theme: "default" } }],
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

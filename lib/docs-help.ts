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

      // Test md suffix
      mdxFileUrl = `${rootUrl}/${mdxFileID}.md`;
      let mdxFilePath = path.resolve("./public", "..", mdxFileUrl);
      console.log(
        `[DocsController]readDoc mdxFilePath`,
        mdxFileID,
        mdxFileUrl,
        mdxFilePath
      );

      if (fs.existsSync(mdxFilePath)) {
        originContent = fs.readFileSync(
          path.resolve("./public", "..", mdxFilePath),
          "utf8"
        );
      } else {
        // Test mdx suffix
        mdxFileUrl = `${mdxFileUrl}x`;
        mdxFilePath = `${mdxFilePath}x`;
        if (fs.existsSync(mdxFilePath)) {
          originContent = fs.readFileSync(
            path.resolve("./public", "..", mdxFilePath),
            "utf8"
          );
        }
      }
    }
    const mdxSource = await serialize(originContent, {
      mdxOptions: {
        remarkPlugins: [remarkGfm, remarkMath, remarkImages],
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
  convertDocID(str: string) {}
}

export default DocsController.getInstance();

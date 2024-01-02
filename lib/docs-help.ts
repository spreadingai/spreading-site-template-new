import fs from "fs";
import path from "path";
import { visit } from "unist-util-visit";
import { serialize } from "next-mdx-remote/serialize";
import remarkImages from "remark-images";
import { rehypeImages } from "@/plugins";
import LibControllerImpl from "./index";
import SlugControllerImpl from "./slug-help";
import VersionsControllerImpl from "./versions-help";

class DocsController {
  static _instance: DocsController;
  _UUID = "37e7bcb6-4fa7-431d-b11c-df9a1c26cf62";
  static getInstance() {
    return (
      DocsController._instance ||
      (DocsController._instance = new DocsController())
    );
  }
  async readDoc(slug: string[]) {
    console.log(`[DocsController]readDoc `, slug);
    const { docVersion, mdxFileID, instanceID, slugVersion } =
      SlugControllerImpl.extractInfoFromSlug(slug);
    const versions = VersionsControllerImpl.getUsedVersions(instanceID);

    let originContent =
      "The conversion of the article content encountered an exception and cannot be displayed.";
    let mdxFileUrl = "";
    if (!slugVersion || slugVersion !== versions[0]) {
      mdxFileUrl = `${LibControllerImpl.getEntityRootDirectory()}/${
        instanceID === "default" ? "" : instanceID + "_"
      }docs/${mdxFileID}.mdx`;
      if (docVersion) {
        mdxFileUrl = `${LibControllerImpl.getEntityRootDirectory()}/${
          instanceID === "default" ? "" : instanceID + "_"
        }versioned_docs/version-${docVersion}/${mdxFileID}.mdx`;
      }
      const mdxFilePath = path.resolve("./public", "..", mdxFileUrl);
      if (fs.existsSync(mdxFilePath)) {
        originContent = fs.readFileSync(
          path.resolve("./public", "..", mdxFileUrl),
          "utf8"
        );
      }
    }
    originContent = originContent
      .replace(
        /```(\S*?\s)([\s\S]*?)(```)(?=\n<\/SCodeBlock>)/gm,
        (_, lang, code) => {
          code = code.replace(/```/g, this._UUID);
          return "```" + lang + code + "```";
        }
      )
      .replaceAll("&nbsp;", " ");
    const myRemarkPlugin = () => {
      return (tree) => {
        visit(tree, "code", (node) => {
          if (typeof node.value === "string") {
            node.value = node.value.replaceAll(this._UUID, "```");
          }
        });
      };
    };
    const mdxSource = await serialize(originContent, {
      mdxOptions: {
        remarkPlugins: [remarkImages, myRemarkPlugin],
        rehypePlugins: [[rehypeImages, { filePath: mdxFileUrl }]],
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
}

export default DocsController.getInstance();

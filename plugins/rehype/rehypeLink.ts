import { visit } from "unist-util-visit";
import Link from "next/link";
import path from "path";
import fs from "fs";

export function rehypeLink(options: {
  prefix: string;
  rootUrl: string;
  filePath: string;
}) {
  return function updateLinkTag(tree, file) {
    visit(tree, "element", (node, i, parent) => {
      if (node.tagName !== "a" || !node.properties.href) return;
      // http 链接在新标签打开
      if (node.properties.href.startsWith("http")) {
        node.properties.target = "_blank";
        return;
      }
      //   console.log("rehypeLink ", node.tagName, node.properties);
      if (!options.rootUrl || !options.filePath) return;
      // while href does not start with 'http'
      const href = node.properties.href;
      const parsedPath = path.parse(href);
      const targetHref = `${parsedPath.dir}/${parsedPath.name}`;
      const imagePath = path.resolve(
        path.dirname(options.filePath),
        targetHref
      );
      const publicPath = path.relative(options.rootUrl, imagePath);
      console.log(
        `[rehypeLink]updateLinkTag`,
        options.prefix,
        options.rootUrl,
        imagePath,
        targetHref,
        publicPath
      );
      node.properties.href = `${options.prefix}/${publicPath}`;
    });
  };
}

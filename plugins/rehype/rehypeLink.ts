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
      if (node.properties.href.includes(":")) {
        return;
      }
      if (!options.rootUrl || !options.filePath) return;
      // while href does not start with 'http'
      const href = node.properties.href;
      const parsedPath = path.parse(href);
      let targetHref = `${parsedPath.dir}/${parsedPath.name}`;
      parsedPath.ext.includes("#") &&
        (targetHref += `#${parsedPath.ext.split("#")[1]}`);
      const imagePath = path.resolve(
        path.dirname(options.filePath),
        targetHref
      );
      const publicPath = path.relative(options.rootUrl, imagePath);
      const convertDocID = (str: string) => {
        // Quick Start, Quick-Start
        // Quick start, Quick-start
        // Quick start/Overview
        const result = [];
        const temp = str.split("/");
        temp.forEach((path) => {
          result.push(
            path.toLowerCase().replace(/%20/g, " ").replace(/\s+/g, "-")
          );
        });
        return result.join("/");
      };
      // console.log(
      //   `[rehypeLink]updateLinkTag`,
      //   options.prefix,
      //   options.rootUrl,
      //   options.filePath,
      //   imagePath,
      //   targetHref,
      //   publicPath
      // );
      node.properties.href = `${options.prefix}/${convertDocID(publicPath)}`;
    });
  };
}

import { visit } from "unist-util-visit";
import Link from "next/link";
import path from "path";
import fs from "fs";
import { ignoreNumberPrefix } from "@/lib/utils";

export function rehypeLink(options: {
  prefix: string;
  rootUrl: string;
  filePath: string;
}) {
  return function updateLinkTag(tree, file) {
    visit(tree, "element", (node, i, parent) => {
      if (node.tagName !== "a" || !node.properties.href) return;
      // support [leaveAllRoom\|\_blank](@leaveAllRoom)
      if (node.children && node.children[0]) {
        const temp = node.children[0];
        if (temp && temp.type === "text" && temp.value.endsWith("|_blank")) {
          temp.value = temp.value.replace("|_blank", "");
          node.properties.target = "_blank";
        }
      }
      // http 链接在新标签打开
      if (node.properties.href.startsWith("http")) {
        node.properties.target = "_blank";
        return;
      }
      if (
        node.properties.href.startsWith(":") ||
        node.properties.href.startsWith("#")
      ) {
        return;
      }
      if (!options.rootUrl || !options.filePath) return;
      // while href does not start with 'http'
      const href = node.properties.href;
      const parsedPath = path.parse(href);
      let targetHref = `${parsedPath.dir}/${parsedPath.name}`;
      targetHref += parsedPath.ext.replace(/^\.mdx?/gi, "");
      const imagePath = path.resolve(
        path.dirname(options.filePath),
        targetHref
      );
      const publicPath = path.relative(options.rootUrl, imagePath);
      // console.log(
      //   `[rehypeLink]updateLinkTag`,
      //   options.prefix,
      //   options.rootUrl,
      //   options.filePath,
      //   imagePath,
      //   targetHref,
      //   publicPath
      // );
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
      node.properties.href = `${options.prefix}/${convertDocID(
        ignoreNumberPrefix(publicPath)
      )}`;
    });
  };
}

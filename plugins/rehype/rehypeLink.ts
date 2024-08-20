import { visit } from "unist-util-visit";
import Link from "next/link";
import path from "path";
import fs from "fs";
import { ignoreNumberPrefix } from "@/lib/utils";

// [xxx](/xxx) Absolute paths are not supported (does not contain expression)
// [xxx](xxx) Support relative paths

// [xxx|_blank](!xxx) Support Open new window tab
// [xxx\|\_blank]() Support Open new window tab

// [xxx](http://xxx) Filter
// [xxx](https://xxx) Filter
// [xxx](:xxx) Filter
// [xxx](#xxx) Filter
// [xxx]() Filter
// [](xxx) Filter

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
        const temp1 = node.children[0];
        const temp2 = node.children[1];
        if (temp1.type === "text" && temp1.value.endsWith("|_blank")) {
          temp1.value = temp1.value.replace("|_blank", "");
          node.properties.target = "_blank";
        } else if (
          temp1.tagName === "code" &&
          temp2 &&
          temp2.type === "text" &&
          temp2.value.endsWith("|_blank")
        ) {
          temp2.value = temp2.value.replace("|_blank", "");
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
        node.properties.href.startsWith("#") ||
        node.properties.href.startsWith("@") ||
        node.properties.href.startsWith("!") ||
        node.properties.href.startsWith("docuo-link@") ||
        node.properties.href.startsWith("docuo-link!")
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

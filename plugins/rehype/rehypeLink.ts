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
  passthroughPrefixes?: string[];
}) {
  return function updateLinkTag(tree, file) {
    visit(tree, "element", (node, i, parent) => {
      if (
        node.tagName !== "a" ||
        !node.properties.href ||
        node.properties.href.startsWith("/article/")
      )
        return;
      const hrefRaw = String(node.properties.href || "");
      const passthroughPrefixes = options.passthroughPrefixes || [];
      const isPassthrough = passthroughPrefixes.some((base) => {
        return hrefRaw === base || hrefRaw.startsWith(`${base}/`);
      });
      // 对于由 Nginx/外部系统接管的路径，保留大小写与原始 href，不做 docId 转换
      if (isPassthrough) return;
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
        node.properties.href.startsWith("mailto:") ||
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
      const href = hrefRaw;
      const parsedPath = path.parse(href);
      let targetHref = `${parsedPath.dir}/${parsedPath.name}`;
      targetHref += parsedPath.ext.replace(/^\.mdx?/gi, "");
      const hrefPath = path.resolve(
        path.dirname(options.filePath),
        targetHref
      );
      const publicPath = path.relative(options.rootUrl, hrefPath);
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
      // md 语法链接会被转成能被 @mdx-js/react 的 MDXProvider 处理的 a 标签
      // a => Next Link 会自动加上在 next.config 中配置的顶层 basePath（Next 自带的组件都会自动处理，不用自行添加）
      node.properties.href = `${options.prefix}/${convertDocID(
        ignoreNumberPrefix(publicPath)
      )}`;
    });
  };
}

import { visit } from "unist-util-visit";
import path from "path";
import { ignoreNumberPrefix } from "@/lib/utils";

// Standard a tag or tags similar to a (does not contain expression)

// <a href="/xxx">xxx</a> Absolute paths are not supported
// <a href="xxx">xxx</a> Support relative paths
// <Comp href="/xxx">xxx</Comp> Absolute paths are not supported
// <Comp href="xxx">xxx</Comp> Support relative paths

// <a>xxx</a> Filter
// <a href="">xxx</a> Filter
// <a href="http://xxx">xxx</a> Filter
// <a href="https://xxx">xxx</a> Filter
// <a href=":xxx">xxx</a> Filter
// <a href="#xxx">xxx</a> Filter

// <Comp>xxx</Comp> Filter
// <Comp href="">xxx</Comp> Filter
// <Comp href="http://xxx">xxx</Comp> Filter
// <Comp href="https://xxx">xxx</Comp> Filter
// <Comp href=":xxx">xxx</Comp> Filter
// <Comp href="#xxx">xxx</Comp> Filter

export function rehypeA(options: {
  prefix: string;
  rootUrl: string;
  filePath: string;
  passthroughPrefixes?: string[];
}) {
  return function updateATag(tree, file) {
    visit(tree, (node, i, parent) => {
      if (!node.attributes) return;
      const target = node.attributes.find(
        (item) =>
          item.name === "href" && item.type === "mdxJsxAttribute" && item.value
      );
      if (
        !target ||
        typeof target.value !== "string" ||
        target.value.startsWith("http") ||
        target.value.startsWith(":") ||
        target.value.startsWith("mailto:") ||
        target.value.startsWith("#") ||
        target.value.startsWith("@") ||
        target.value.startsWith("!") ||
        target.value.startsWith("docuo-link@") ||
        target.value.startsWith("docuo-link!") ||
        target.value.startsWith("/article/")
      )
        return;
      const hrefRaw = target.value;
      const passthroughPrefixes = options.passthroughPrefixes || [];
      const isPassthrough = passthroughPrefixes.some((base) => {
        return hrefRaw === base || hrefRaw.startsWith(`${base}/`);
      });
      // 对于由 Nginx/外部系统接管的路径，保留大小写与原始 href，不做 docId 转换
      if (isPassthrough) return;
      if (!options.rootUrl || !options.filePath) return;
      // while href does not start with 'http'
      const href = hrefRaw;
      const parsedPath = path.parse(href);
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
      if (parsedPath.root !== "/" ) {
        let targetHref = `${parsedPath.dir}/${parsedPath.name}`;
        targetHref += parsedPath.ext.replace(/^\.mdx?/gi, "");
        const hrefPath = path.resolve(
          path.dirname(options.filePath),
          targetHref
        );
        const publicPath = path.relative(options.rootUrl, hrefPath);
        target.value = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${
          options.prefix.startsWith("/") ? options.prefix : "/" + options.prefix
        }/${convertDocID(ignoreNumberPrefix(publicPath))}`;
      } else {
        target.value = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${convertDocID(ignoreNumberPrefix(href))}`;
      }
    });
  };
}

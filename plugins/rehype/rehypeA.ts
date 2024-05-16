import { visit } from "unist-util-visit";
import path from "path";
import { ignoreNumberPrefix } from "@/lib/utils";

export function rehypeA(options: {
  prefix: string;
  rootUrl: string;
  filePath: string;
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
        target.value.startsWith("http") ||
        target.value.startsWith(":")
      )
        return;
      if (!options.rootUrl || !options.filePath) return;
      // while href does not start with 'http'
      const href = target.value;
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
      target.value = `${
        options.prefix.startsWith("/") ? options.prefix : "/" + options.prefix
      }/${convertDocID(ignoreNumberPrefix(publicPath))}`;
    });
  };
}

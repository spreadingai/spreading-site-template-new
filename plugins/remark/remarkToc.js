import { visit } from "unist-util-visit";
import { slug } from "github-slugger";
import { toString } from "mdast-util-to-string";
import { parseHeadingsToTocs } from "../utils";

export const remarkToc = (options) => {
  // 标记标题出现次数
  const uniqueId = {};

  return (tree) => {
    const headings = [];
    visit(tree, "heading", (node, i, parent) => {
      const textContent = toString(node);
      // 标题为空，不处理
      if (textContent === "") return;

      let id = slug(textContent);
      let ignore = false;

      if (!uniqueId[id]) {
        uniqueId[id] = 1;
      } else {
        // if (parent.name === "if") {
        //   // ignore repetition
        //   ignore = true;
        // } else {
        uniqueId[id]++;
        id += `-${uniqueId[id]}`;
        // }
      }
      const Heading = {
        type: "mdxJsxFlowElement",
        name: "Heading",
        attributes: [
          { type: "mdxJsxAttribute", name: "level", value: node.depth },
          { type: "mdxJsxAttribute", name: "id", value: id },
        ],
        children: [...node.children],
      };
      parent.children[i] = Heading;

      !ignore &&
        headings.push({
          level: node.depth,
          id,
          title: textContent,
        });
    });
    if (headings.length) {
      const toc = parseHeadingsToTocs(headings);
      if (options.exportRef.toc) {
        options.exportRef.toc.push(...toc);
      } else {
        options.exportRef.toc = toc;
      }
    }
  };
};

import { visit } from "unist-util-visit";
import { isElement } from "../utils";

/**
 * Fixed an error in mdx where a paragraph contains a nested component (such as Note)
 */
function formatNestedNode(tree) {
  visit(tree, (node, i, parent) => {
    if (!isElement(node, "tagName", "p")) {
      return;
    }
    const isNeedFlat = (node) => node.type === "mdxJsxTextElement" && ["Note", "Tip", "Warning", "Error"].includes(node.name);
    const isNeedFormat = node.children.some((item) => !!isNeedFlat(item));
    if (!isNeedFormat) {
      return;
    }
    const children = [];
    node.children.forEach((item) => {
      if (isNeedFlat(item)) {
        children.push(item);
      } else {
        const p = {
          type: "element",
          tagName: "p",
          properties: {},
          children: [item]
        };
        children.push(p);
      }
    });
    parent.children.splice(i, 1, ...children);
  });
  tree.children = [...tree.children];
}
export function rehypeNestedFormat() {
  return formatNestedNode;
}

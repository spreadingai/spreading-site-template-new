import { visit } from "unist-util-visit";
import { flowElementType, isElement } from "../utils";

export function rehypeCodeGroup() {
  return function (tree) {
    visit(tree, (node) => {
      const isFlowElement = isElement(node, "type", flowElementType);
      if (!isFlowElement || node.name !== "CodeGroup") {
        return;
      }
      const codeBlockList = (node.children || []).filter(item => item.name === "CodeBlock");
      const codes = [];
      codeBlockList.forEach((codeBlock, i) => {
        const tabid = i;
        codeBlock.attributes.push({ type: "mdxJsxAttribute", name: "tabid", value: tabid });
        const attrs = {};
        codeBlock.attributes.forEach(attr => {
          if (["filename", "language", "tabid"].includes(attr.name)) {
            attrs[attr.name] = attr.value;
          }
        });
        codes.push(attrs);
      });

      node.attributes = [
        ...node.attributes,
        { type: "mdxJsxAttribute", name: "codes", value: JSON.stringify(codes) }
      ];
    });
    tree.children = [...tree.children];
  }
}

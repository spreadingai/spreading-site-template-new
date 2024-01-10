import { visit } from "unist-util-visit";
import { flowElementType, isElement } from "../utils";

function addCodeBlocks(tree) {
  visit(tree, (node, i, parent) => {
    if (parent == null || i == null || !isElement(node) || !isElement(node, "tagName", "pre")) {
      return;
    }
    const code = node.children[0];
    if (!isElement(code, "tagName", "code")) {
      return;
    }
    const codeBlock = createCodeBlock(code);
    codeBlock.children = [...code.children || []];
    // 如果 parent 不是 CodeGroup，则需要补一个
    if (parent.name !== "CodeGroup") {
      const codeGroup = {
        type: flowElementType,
        name: "CodeGroup",
        attributes: [], // 留空，统一在 rehypeCodeGroup 处理
        data: { _mdxExplicitJsx: true },
        children: [codeBlock]
      };
      parent.children[i] = codeGroup;
    } else {
      parent.children[i] = codeBlock;
    }
  });
  tree.children = [...tree.children];
}
export function rehypeCodeBlocks() {
  return addCodeBlocks;
}

export function createCodeBlock(code) {
  let filename = undefined;
  let focus = "";
  let hideLineNumbers = false;
  const meta = code.data?.meta;
  if (meta && typeof meta === "string") {
    const attrs = code.data.meta.split(" ");
    // filename
    const filenameMatchRes = meta.match(/title="([\s\S]+)"/);
    if (filenameMatchRes) {
      filename = filenameMatchRes[1];
    } else {
      const firstStr = meta.split(" ")[0];
      filename = !firstStr.startsWith("{") && firstStr !== "hideLineNumbers" ? firstStr : "";
    }

    // hideLineNumbers
    hideLineNumbers = meta.includes("hideLineNumbers");

    // focus
    const focusMatchRes = meta.match(/\{[\d,-]+\}/);
    if (focusMatchRes) {
      focus = focusMatchRes[0].slice(1, -1);
    }
  }
  const codeBlock = {
    type: flowElementType,
    name: "CodeBlock",
    attributes: [
      { type: "mdxJsxAttribute", name: "language", value: code.properties?.className?.[0]?.split("-")[1] ?? "" },
      { type: "mdxJsxAttribute", name: "filename", value: filename ?? "" },
      { type: "mdxJsxAttribute", name: "showLineNumber", value: !hideLineNumbers },
      { type: "mdxJsxAttribute", name: "focus", value: focus ?? "" },
    ],
    data: { _mdxExplicitJsx: true },
    children: []
  };

  return codeBlock;
}

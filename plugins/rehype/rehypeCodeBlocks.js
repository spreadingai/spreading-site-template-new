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
  if (code.data?.meta && typeof code.data.meta === "string") {
    const attrs = code.data.meta.split(" ");
    // filename
    filename = !attrs[0]?.startsWith("{") && attrs[0] !== "hideLineNumbers" ? attrs[0] : "";

    // hideLineNumbers
    hideLineNumbers = attrs.includes("hideLineNumbers");

    // focus
    const focusFormat = attrs.find(str => str && /^\{[\d,-]+\}$/.test(str));
    if (focusFormat) {
      focus = focusFormat.slice(1, -1);
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

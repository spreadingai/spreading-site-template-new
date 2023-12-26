export const flowElementType = "mdxJsxFlowElement";

export function isElement(node, key = "type", element = "element") {
  return node != undefined && node[key] === element;
}
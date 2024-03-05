import { visit } from "unist-util-visit";

export function rehypeCharacter() {
  return function replaceSpecialCharacter(tree) {
    visit(tree, "element", (node, i, parent) => {
      if (node.tagName !== "p") return;
      node.children.forEach((item) => {
        if (item.type === "text") {
          item.value = item.value.replace(/</g, "&lt;");
          item.value = item.value.replace(/>/g, "&gt;");
        }
      });
    });
  };
}

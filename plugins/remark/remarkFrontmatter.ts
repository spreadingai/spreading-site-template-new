import { visit } from "unist-util-visit";
import { toString } from "mdast-util-to-string";

export const remarkFrontmatter = (options) => {
  return (tree) => {
    let firstParagraphMarker = false;
    let firstParagraphContent = "";
    visit(tree, (node, i, parent) => {
      console.log("#######remarkFrontmatter", node.type);
      if (!firstParagraphMarker && node.type === "paragraph") {
        const textContent = toString(node);
        if (textContent) {
          firstParagraphContent = textContent;
          firstParagraphMarker = true;
        }
      }
    });
    options.exportRef.firstParagraphContent = firstParagraphContent;
  };
};

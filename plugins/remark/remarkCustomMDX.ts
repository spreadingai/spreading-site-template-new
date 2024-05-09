import { visit } from "unist-util-visit";
import { compile } from "@mdx-js/mdx";

export const remarkCustomMDX = (options) => {
  return (tree) => {
    visit(tree, (node, i, parent) => {
      if (node.type === "mdxjsEsm") {
        console.log(node);
        const importFragment = {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: node.value,
            },
          ],
        };
        parent.children[i] = importFragment;
      }
      if (node.type === "mdxJsxFlowElement" && node.name === "PartialExample") {
        const test =
          "# Hello world! This is my content I want to reuse across pages.";
        compile(test).then((compiled) => {
          console.log("compiled", String(compiled));
        });

        const compFragment = {
          type: "paragraph",
          attributes: node.attributes,
          children: [
            {
              type: "text",
              value: node.name,
            },
          ],
        };
        parent.children[i] = compFragment;
      }
    });
  };
};

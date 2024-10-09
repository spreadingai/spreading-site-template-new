import { visit } from "unist-util-visit";

const tagNameMap = {
  list: "li",
  code: "div",
  blockquote: "div",
  thematicBreak: "div",
};

export const remarkConditions = () => {
  return (tree) => {
    visit(tree, function (node) {
      if (node.children) {
        for (let index = 0; index < node.children.length; ) {
          const childrenNode = node.children[index];
          if (
            (childrenNode.type === "containerDirective" ||
              childrenNode.type === "leafDirective" ||
              childrenNode.type === "textDirective") &&
            childrenNode.name === "if"
          ) {
            const key = Object.keys(childrenNode.attributes)[0];
            let value =
              childrenNode.attributes[Object.keys(childrenNode.attributes)[0]];
            if (!isNaN(Number(value))) value = Number(value);
            if (value === "undefined") value = undefined;
            if (value === "null") value = null;
            const propertyName = key.split(".")[1];
            const operator = "===";
            const expression = `{"display": ${key}${operator}${
              typeof value !== "string" ? value : '"' + value + '"'
            } ? "null" : "none"}`;

            let rightObj: any = {
              type: "Literal",
              value: value,
              raw: `"${value}"`,
            };
            if (value === undefined) {
              rightObj = {
                type: "Identifier",
                name: "undefined",
              };
            }
            if (value === null) {
              rightObj = {
                type: "Identifier",
                name: "null",
              };
            }
            let newChildren = [];
            const oldChildren = childrenNode.children;
            oldChildren.forEach((oldChildreNode, oldIndex) => {
              const arr = [
                {
                  name: "className",
                  type: "mdxJsxAttribute",
                  value: `choose-one ${
                    oldChildreNode.name ||
                    (oldChildreNode.lang
                      ? (oldChildreNode.type || "") + "-" + oldChildreNode.lang
                      : oldChildreNode.type || "")
                  }`,
                },
                {
                  name: "style",
                  type: "mdxJsxAttribute",
                  value: {
                    type: "mdxJsxAttributeValueExpression",
                    value: expression,
                    data: {
                      estree: {
                        type: "Program",
                        body: [
                          {
                            type: "ExpressionStatement",
                            expression: {
                              type: "ObjectExpression",
                              properties: [
                                {
                                  type: "Property",
                                  method: false,
                                  shorthand: false,
                                  computed: false,
                                  key: {
                                    type: "Literal",
                                    value: "display",
                                    raw: '"display"',
                                  },
                                  value: {
                                    type: "ConditionalExpression",
                                    test: {
                                      type: "BinaryExpression",
                                      left: {
                                        type: "MemberExpression",
                                        object: {
                                          type: "Identifier",
                                          name: "props",
                                        },
                                        property: {
                                          type: "Identifier",
                                          name: propertyName,
                                        },
                                        computed: false,
                                        optional: false,
                                      },
                                      operator: operator,
                                      right: rightObj,
                                    },
                                    consequent: {
                                      type: "Literal",
                                      value: "null",
                                      raw: '"null"',
                                    },
                                    alternate: {
                                      type: "Literal",
                                      value: "none",
                                      raw: '"none"',
                                    },
                                  },
                                  kind: "init",
                                },
                              ],
                            },
                          },
                        ],
                        sourceType: "module",
                        comments: [],
                      },
                    },
                  },
                },
              ];
              if (
                oldChildreNode.type &&
                !oldChildreNode.name &&
                node.name !== "CodeGroup"
              ) {
                const temp = {
                  name: tagNameMap[oldChildreNode.type] || oldChildreNode.type,
                  type: "mdxJsxFlowElement",
                  attributes: [...arr],
                  children: [oldChildreNode],
                  data: { _mdxExplicitJsx: true },
                };
                newChildren.push(temp);
              } else {
                if (!oldChildreNode.attributes) {
                  oldChildreNode.attributes = [];
                }
                if (!Array.isArray(oldChildreNode.attributes)) {
                  oldChildreNode.attributes = [oldChildreNode.attributes];
                }
                oldChildreNode.attributes.push(...arr);
                newChildren.push(oldChildreNode);
              }
            });
            if (newChildren.length) {
              node.children.splice(index, 1, ...newChildren);
              index += newChildren.length;
            }
          } else {
            index++;
          }
        }
      }
    });
  };
};

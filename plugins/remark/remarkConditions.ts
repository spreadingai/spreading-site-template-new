import { visit } from "unist-util-visit";

export const remarkConditions = () => {
  return (tree) => {
    visit(tree, function (node) {
      if (node.children) {
        node.children.forEach((childreNode) => {
          if (childreNode.name === "if") {
            const oldChildren = childreNode.children;
            const key = Object.keys(childreNode.attributes)[0];
            const value =
              childreNode.attributes[Object.keys(childreNode.attributes)[0]];
            const propertyName = key.split(".")[1];
            const temp = {
              name: "div",
              type: "mdxJsxFlowElement",
              attributes: [
                {
                  name: "className",
                  type: "mdxJsxAttribute",
                  value: "choose-one",
                },
                {
                  name: "style",
                  type: "mdxJsxAttribute",
                  value: {
                    type: "mdxJsxAttributeValueExpression",
                    value: `{"display": ${key}==="${value}" ? "block" : "none"}`,
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
                                      operator: "===",
                                      right: {
                                        type: "Literal",
                                        value: `${value}`,
                                        raw: `"${value}"`,
                                      },
                                    },
                                    consequent: {
                                      type: "Literal",
                                      value: "block",
                                      raw: '"block"',
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
              ],
              children: [...oldChildren],
              data: { _mdxExplicitJsx: true },
            };
            childreNode.children = [temp];
          }
        });
      }
    });
  };
};

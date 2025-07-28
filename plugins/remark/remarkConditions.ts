import { visit } from "unist-util-visit";

const tagNameMap = {
  list: "div",
  code: "div",
  blockquote: "div",
  thematicBreak: "div",
};

const generateCommonEstreeData = (key, value) => {
  if (!isNaN(Number(value))) value = Number(value);
  if (value === "undefined") value = undefined;
  if (value === "null") value = null;
  const propertyName = key.split(".")[1];
  const operator = "===";
  const operator_ = "==";
  const expression = `{"display": ${key}${
    typeof value === "number" ? operator_ : operator
  }${typeof value !== "string" ? value : '"' + value + '"'} ? "null" : "none"}`;

  let rightObj: any = {
    type: "Literal",
    value: value,
    raw: `${value}`,
  };
  if (value === undefined) {
    rightObj = {
      type: "Identifier",
      name: "undefined",
    };
  } else if (value === null) {
    rightObj = {
      type: "Identifier",
      name: "null",
    };
  } else if (typeof value === "string") {
    rightObj = {
      type: "Literal",
      value: value,
      raw: `"${value}"`,
    };
  }
  return {
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
  };
};

const generateOrEstreeData = (key, value) => {
  // value: "abc|cde|undefined|null|1"
  const arr = value.split("|");
  const newArr = [];
  const elements = [];
  const propertyName = key.split(".")[1];
  const operator = "includes";
  arr.forEach((element) => {
    if (element === "undefined") {
      element = undefined;
      elements.push({
        type: "Identifier",
        name: "undefined",
      });
    } else if (element === "null") {
      element = null;
      elements.push({
        type: "Literal",
        value: null,
        raw: "null",
      });
    } else {
      elements.push({
        type: "Literal",
        value: element,
        raw: `"${element}"`,
      });
    }
    newArr.push(element);
  });
  let str = "[";
  for (let i = 0; i < newArr.length; i++) {
    if (newArr[i] === null) {
      str += "null";
    } else if (newArr[i] === undefined) {
      str += "undefined";
    } else {
      str += JSON.stringify(newArr[i]);
    }
    if (i < newArr.length - 1) {
      str += ", ";
    }
  }
  str += "]";
  const expression = `{ display: ${str}.${operator}(${key}) ? "null" : "none" }`;
  return {
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
                    type: "Identifier",
                    name: "display",
                  },
                  value: {
                    type: "ConditionalExpression",
                    test: {
                      type: "CallExpression",
                      callee: {
                        type: "MemberExpression",
                        object: {
                          type: "ArrayExpression",
                          elements,
                        },
                        property: {
                          type: "Identifier",
                          name: operator,
                        },
                        computed: false,
                        optional: false,
                      },
                      arguments: [
                        {
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
                      ],
                      optional: false,
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
  };
};

export const remarkConditions = () => {
  return (tree) => {
    // 检查是否在 CodeGroup 内部的函数
    function isInsideCodeGroup(node, parent) {
      if (!parent) return false;
      if (parent.type === 'mdxJsxFlowElement' && parent.name === 'CodeGroup') {
        return true;
      }
      return false;
    }

    // 遍历节点并处理条件渲染指令
    visit(tree, function (node, index, parent) {
      if (node.children) {
        for (let i = 0; i < node.children.length; ) {
          const childrenNode = node.children[i];

          if (
            (childrenNode.type === "containerDirective" ||
              childrenNode.type === "leafDirective" ||
              childrenNode.type === "textDirective") &&
            childrenNode.name === "if"
          ) {
            // 跳过 CodeGroup 内部的条件渲染
            if (isInsideCodeGroup(childrenNode, node)) {
              i++;
              continue;
            }
            const key = Object.keys(childrenNode.attributes)[0];
            let value =
              childrenNode.attributes[Object.keys(childrenNode.attributes)[0]];
            let estreeData;
            if (value.split("|").length > 1) {
              estreeData = generateOrEstreeData(key, value);
            } else {
              estreeData = generateCommonEstreeData(key, value);
            }
            let newChildren = [];
            const oldChildren = childrenNode.children;
            oldChildren.forEach((oldChildreNode) => {

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
                  value: estreeData,
                },
              ];
              if (
                oldChildreNode.type &&
                !oldChildreNode.name
              ) {
                // 对于原始节点（如代码块），用 div 包裹
                const temp = {
                  name: "div",
                  type: "mdxJsxFlowElement",
                  attributes: [...arr],
                  children: [oldChildreNode],
                  data: { _mdxExplicitJsx: true },
                };
                newChildren.push(temp);
              } else if (oldChildreNode.name === "CodeGroup" || oldChildreNode.name === "Code") {
                // 对于 CodeGroup 和 Code 组件，也用 div 包裹
                const temp = {
                  name: "div",
                  type: "mdxJsxFlowElement",
                  attributes: [...arr],
                  children: [oldChildreNode],
                  data: { _mdxExplicitJsx: true },
                };
                newChildren.push(temp);
              } else {
                // 对于其他组件，直接添加属性
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
              node.children.splice(i, 1, ...newChildren);
              i += newChildren.length;
            }
          } else {
            i++;
          }
        }
      }
    });
  };
};

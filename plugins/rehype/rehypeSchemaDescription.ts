import { visit } from "unist-util-visit";

/**
 * Rehype 插件：处理 schema-description div 元素中的列表语法
 * 
 * 功能：
 * 1. 匹配特定的 div 元素：className 严格等于 "schema-description"
 * 2. 检测文本内容中的 Markdown 无序列表语法（"- " 开头）
 * 3. 将包含列表语法的内容转换为 <ul> 和 <li> 元素
 * 
 * 匹配条件（必须同时满足）：
 * - 标签类型为 div
 * - className 属性值严格等于 "schema-description"
 * - 子元素只包含纯文本节点（无其他 HTML 标签）
 * 
 * 转换规则：
 * - 如果文本包含 "- " 列表语法：转换为 <ul> 和 <li> 元素
 * - 如果不包含列表语法：保持原样不修改
 */
export function rehypeSchemaDescription() {
  return function processSchemaDescription(tree) {
    visit(tree, (node, index, parent) => {
      // 1. 检查标签类型是否为 div
      // @ts-ignore
      if (node.type !== "text" || parent.name !== "div" || parent.type !== "mdxJsxTextElement") return;

      // 2. 检查 className 属性是否严格等于 "schema-description"
      // @ts-ignore
      const targetAttribute = parent.attributes?.find((attr) => attr.name === "className" && attr.type === 'mdxJsxAttribute');
      if (!targetAttribute) return;

      if (targetAttribute.value.value !== `"schema-description"`){
        return;
      }
      // 3. 获取文本内容
      if (parent.children.length === 1) {
        // 1.有引用（纯文本）：'ZIM 相关信息。>> - 仅当 MessageHistory.SyncMode 为 0 时有效。> - 请确保您的项目已开通 ZIM 服务。> - 请确保已调用 ZIM 机器人注册接口，并将返回的 UserInfo.UserId 作为 RobotId。> - 建议您提前注册机器人，以便完善用户信息设置并提升智能体实例的创建效率。'
        // 2.纯列表：'从 LLM 返回的内容中过滤指定标点符号内的文本，然后再进行语音合成。注意：- 需要在 LLM \> SystemPrompt 中定义哪些内容应该放在指定标点符号内- 此参数在更新智能体实例时无法更新'
        // 注意：普通 >（非引用）一定要用反斜杠 \ 转义
      } else {
        // 3.有引用（有子元素）children
        // [
        //   {
        //     type: "text",
        //     value: "ZIM 相关信息。> ",
        //   },
        //   {
        //     type: "strong",
        //     children: [
        //       {
        //         type: "text",
        //         value: "📌 重要说明",
        //       },
        //     ],
        //   },
        //   {
        //     type: "text",
        //     value: ">> - 仅当 MessageHistory.SyncMode 为 0 时有效。> - 请确保您的项目已开通 ZIM 服务。> - 请确保已调用 ZIM 机器人注册接口，并将返回的 UserInfo.UserId 作为 RobotId。> - 建议您提前注册机器人，以便完善用户信息设置并提升智能体实例的创建效率。",
        //   },
        // ]
        // 4.有引用（有子元素）children
        // [
        //   {
        //     type: "text",
        //     value: "ZIM 相关信息。> ",
        //   },
        //   {
        //     type: "mdxJsxTextElement",
        //     name: "strong",
        //     attributes: [
        //     ],
        //     children: [
        //       {
        //         type: "text",
        //         value: "📌 重要说明",
        //       },
        //     ],
        //   },
        //   {
        //     type: "text",
        //     value: ">> - 仅当 MessageHistory.SyncMode 为 0 时有效。> - 请确保您的项目已开通 ZIM 服务。> - 请确保已调用 ZIM 机器人注册接口，并将返回的 UserInfo.UserId 作为 RobotId。> - 建议您提前注册机器人，以便完善用户信息设置并提升智能体实例的创建效率。",
        //   },
        // ]
      }
      const fullText = node.value;

      // 4. 用正则表达式提取所有 "- " 开头的列表项
      const listItemMatches = fullText.match(/- ([^-]*?)(?=- |$)/g);

      if (!listItemMatches) return;

      // 5. 提取 "- " 前面的内容
      const firstListItemIndex = fullText.indexOf("- ");
      const prefixText = fullText.substring(0, firstListItemIndex).trim();

      // 6. 转换为 <li> 元素
      const listItems = listItemMatches.map((match) => {
        // 移除 "- " 前缀，保留文本内容并去除首尾空格
        const itemText = match.substring(2).trim();

        return {
          type: "element",
          tagName: "li",
          properties: {
            className: ["custom-description-li"],
          },
          children: [
            {
              type: "text",
              value: itemText,
            },
          ],
        };
      });

      // 7. 创建 <ul> 元素
      const ulElement = {
        type: "element",
        tagName: "ul",
        properties: {
          className: ["custom-description-ul"],
        },
        children: listItems,
      };

      // 8. 构建新的子元素数组
      const newChildren = [];

      // 如果有前缀文本，添加为 <p> 标签
      if (prefixText) {
        newChildren.push({
          type: "element",
          tagName: "p",
          properties: {
            className: ["custom-description-p"],
          },
          children: [
            {
              type: "text",
              value: prefixText,
            },
          ],
        });
      }

      // 添加 <ul> 元素
      newChildren.push(ulElement);

      // 替换 div 的子元素
      parent.children = newChildren;
    });
  };
}


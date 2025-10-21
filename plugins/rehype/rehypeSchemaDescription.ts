import { visit } from "unist-util-visit";

/**
 * Rehype 插件：处理 schema-description div 元素中的列表和引用语法
 *
 * 功能：
 * 1. 匹配特定的 div 元素：className 严格等于 "schema-description"
 * 2. 检测文本内容中的 Markdown 无序列表语法（"- " 开头）
 * 3. 检测文本内容中的 Markdown 引用语法（"> " 开头，注意空格）
 * 4. 将包含列表语法的内容转换为 <ul> 和 <li> 元素
 * 5. 将包含引用语法的内容转换为 <blockquote> 元素，内部继续处理列表
 *
 * 匹配条件（必须同时满足）：
 * - 标签类型为 div
 * - className 属性值严格等于 "schema-description"
 * - 子元素只包含纯文本节点（无其他 HTML 标签）
 *
 * 转换规则：
 * - 如果文本包含 "> " 引用语法：先提取引用内容，用 <blockquote> 包裹，内部继续处理列表
 * - 如果文本包含 "- " 列表语法：转换为 <ul> 和 <li> 元素
 * - 如果不包含特殊语法：保持原样不修改
 *
 * 注意：
 * - 引用语法必须是 "> " （大于号后跟空格），不包括转义的 "\>" 或单独的 ">"
 * - 前后都有空格的 " > " 不视为引用语法（如 "LLM > SystemPrompt"）
 * - ">> " 等价于 "> "（换行的引用）
 */

/**
 * 检测是否包含有效的引用语法 "> "
 * 排除转义的 "\>" 和单独的 ">"
 * 排除前后都有空格的 " > "（如 "LLM > SystemPrompt"）
 */
function hasQuoteSyntax(text: string): boolean {
  // 检查是否包含 "> " 或 ">> "
  // 使用负向后瞻确保不是转义的 "\>"
  // 使用负向前瞻确保前面不是空格（排除 " > " 的情况）
  return /(?<!\\)(?<! )> /.test(text) || />> /.test(text);
}

/**
 * 提取引用内容
 * 返回 { beforeQuote, quoteContent, afterQuote }
 *
 * 处理逻辑：
 * 1. 找到第一个 "> " 或 ">> " 的位置（排除 " > " 的情况）
 * 2. 提取前面的内容作为 beforeQuote
 * 3. 从第一个 "> " 开始，提取所有连续的 "> " 或 ">> " 后的内容
 * 4. 返回原始的引用内容（保留 "> " 前缀），由 processQuoteContent 处理
 */
function extractQuoteContent(text: string): { beforeQuote: string; quoteContent: string; afterQuote: string } | null {
  // 匹配 "> " 或 ">> " 开头的引用
  // 排除转义的 "\>" 和前后都有空格的 " > "
  const quoteMatch = text.match(/(?<!\\)(?<! )> |>> /);

  if (!quoteMatch) return null;

  const quoteStartIndex = quoteMatch.index!;
  const beforeQuote = text.substring(0, quoteStartIndex).trim();

  // 从第一个 "> " 开始的内容（保留原始的 "> " 前缀）
  const afterQuoteStart = quoteStartIndex;
  const quoteContent = text.substring(afterQuoteStart);

  return {
    beforeQuote,
    quoteContent,
    afterQuote: "",
  };
}

/**
 * 处理引用内容，根据是否包含列表语法返回不同的元素
 * 如果有列表语法，返回列表元素
 * 如果没有列表语法，根据 "> " 分割成多个 <p> 标签
 *
 * 注意：输入的 text 包含原始的 "> " 前缀
 */
function processQuoteContent(text: string): any[] {
  // 先检测是否有列表语法（在原始文本中检测）
  const listItemMatches = text.match(/- ([^-]*?)(?=- |$)/g);

  // 如果有列表语法，先移除 "> " 前缀，然后使用列表处理逻辑
  if (listItemMatches) {
    const cleanedText = text
      .replace(/>> /g, "")              // 先移除 ">> " 前缀
      .replace(/(?<!\\)(?<! )> /g, ""); // 再移除 "> " 前缀（排除 " > "）
    return processListSyntax(cleanedText);
  }

  // 没有列表语法，根据 "> " 分割成多个段落
  // 将原始文本按照 "> " 或 ">> " 分割
  const paragraphs = text.split(/(?<!\\)(?<! )> |>> /).filter(p => p.trim());

  const children: any[] = [];

  // 为每个段落创建一个 <p> 标签
  paragraphs.forEach((paragraph) => {
    const trimmedParagraph = paragraph.trim();
    if (trimmedParagraph) {
      children.push({
        type: "element",
        tagName: "p",
        properties: {
          className: ["custom-description-p"],
        },
        children: [
          {
            type: "text",
            value: trimmedParagraph,
          },
        ],
      });
    }
  });

  return children;
}

/**
 * 处理列表语法，返回转换后的元素数组
 */
function processListSyntax(text: string): any[] {
  const listItemMatches = text.match(/- ([^-]*?)(?=- |$)/g);

  if (!listItemMatches) return [];

  const firstListItemIndex = text.indexOf("- ");
  const prefixText = text.substring(0, firstListItemIndex).trim();

  const children: any[] = [];

  // 如果有前缀文本，添加为 <p> 标签
  if (prefixText) {
    children.push({
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

  // 转换为 <li> 元素
  const listItems = listItemMatches.map((match: string) => {
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

  // 创建 <ul> 元素
  children.push({
    type: "element",
    tagName: "ul",
    properties: {
      className: ["custom-description-ul"],
    },
    children: listItems,
  });

  return children;
}
export function rehypeSchemaDescription() {
  return function processSchemaDescription(tree) {
    visit(tree, (node, _index, parent) => {
      // 1. 检查标签类型是否为 div
      // @ts-ignore
      if (node.type !== "text" || parent.name !== "div" || parent.type !== "mdxJsxTextElement") return;

      // 2. 检查 className 属性是否严格等于 "schema-description"
      // @ts-ignore
      const targetAttribute = parent.attributes?.find((attr: any) => attr.name === "className" && attr.type === 'mdxJsxAttribute');
      if (!targetAttribute) return;

      if (targetAttribute.value.value !== `"schema-description"`){
        return;
      }

      const fullText = node.value;
      const newChildren: any[] = [];

      // 3. 检测是否包含引用语法
      if (hasQuoteSyntax(fullText)) {
        // 有引用语法，需要先处理引用
        const quoteInfo = extractQuoteContent(fullText);

        if (quoteInfo) {
          // 添加引用前的内容
          if (quoteInfo.beforeQuote) {
            newChildren.push({
              type: "element",
              tagName: "p",
              properties: {
                className: ["custom-description-p"],
              },
              children: [
                {
                  type: "text",
                  value: quoteInfo.beforeQuote,
                },
              ],
            });
          }

          // 处理引用内容（可能有列表或没有列表）
          const blockquoteChildren = processQuoteContent(quoteInfo.quoteContent);

          if (blockquoteChildren.length > 0) {
            newChildren.push({
              type: "element",
              tagName: "blockquote",
              properties: {},
              children: blockquoteChildren,
            });
          }
        }
      } else {
        // 没有引用语法，按原有逻辑处理列表
        const listChildren = processListSyntax(fullText);
        newChildren.push(...listChildren);
      }

      // 4. 只有当有转换内容时才替换
      if (newChildren.length > 0) {
        parent.children = newChildren;
      }
    });
  };
}


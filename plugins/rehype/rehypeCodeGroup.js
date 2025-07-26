import { visit } from "unist-util-visit";
import { flowElementType, isElement } from "../utils";

export function rehypeCodeGroup() {
  return function (tree) {
    visit(tree, (node) => {
      const isFlowElement = isElement(node, "type", flowElementType);
      if (!isFlowElement || node.name !== "CodeGroup") {
        return;
      }

      // 处理子元素，寻找 pre > code 块
      const tabs = [];



      function processChildren(children) {
        if (!children) return;

        children.forEach((child) => {


          if (child.type === "mdxJsxFlowElement" && child.name === "Code") {
            // 处理 MDX JSX 格式的 Code 元素
            const rawCode = createRawCodeFromCodeComponent(child);
            if (rawCode) {
              tabs.push(rawCode);
            }

            // 给 Code 组件添加 hideFilename 属性
            child.attributes.push({
              type: "mdxJsxAttribute",
              name: "hideFilename",
              value: true
            });
          } else if (child.type === "element" && child.tagName === "pre") {
            const codeElement = child.children && child.children[0];
            if (codeElement && codeElement.tagName === "code") {
              const rawCode = createRawCodeFromNode(codeElement);
              tabs.push(rawCode);
            }
          } else if (child.type === "mdxJsxFlowElement" && child.name === "pre") {
            // 处理 MDX JSX 格式的 pre 元素
            const codeElement = child.children && child.children[0];
            if (codeElement && (codeElement.tagName === "code" || codeElement.name === "code")) {
              const rawCode = createRawCodeFromNode(codeElement);
              tabs.push(rawCode);
            }
          } else if (child.children) {
            // 递归处理子元素
            processChildren(child.children);
          }
        });
      }

      processChildren(node.children);

      // 更新CodeGroup的属性
      node.attributes = [
        {
          type: "mdxJsxAttribute",
          name: "tabs",
          value: {
            type: "mdxJsxAttributeValueExpression",
            value: JSON.stringify(tabs),
            data: {
              estree: {
                type: "Program",
                body: [{
                  type: "ExpressionStatement",
                  expression: {
                    type: "Literal",
                    value: tabs
                  }
                }]
              }
            }
          }
        }
      ];

      // 清空children，因为CodeGroup会自己渲染Code组件
      node.children = [];
    });
    tree.children = [...tree.children];
  }
}

function createRawCodeFromNode(code) {
  // 提取代码内容
  const codeText = extractTextFromNode(code);

  // 去除代码末尾的多余空行，但保留代码内部的空行
  const trimmedCode = codeText.replace(/\n+$/, '');

  // 提取语言
  const className = code.properties?.className?.[0];
  const language = className && className.includes("-") ? className.split("-")[1] : "text";

  // 提取meta信息
  const meta = code.data?.meta || "";

  // 解析高亮行语法 {1,4-6,11} 并转换为CodeHike annotation
  let processedCode = trimmedCode;
  let processedMeta = meta;
  const highlightRangeRegex = /\{([\d,-]+)\}/;
  const highlightMatch = meta.match(highlightRangeRegex);

  if (highlightMatch) {
    const rangeString = highlightMatch[1];
    const highlightLines = parseHighlightRange(rangeString);

    // 将高亮行转换为CodeHike的mark annotation
    const codeLines = processedCode.split('\n');
    const processedLines = [];

    // 按连续的行分组，为每组添加一个annotation
    const groups = groupConsecutiveLines(highlightLines);

    for (let i = 0; i < codeLines.length; i++) {
      const lineNumber = i + 1;
      const line = codeLines[i];

      // 检查是否需要在这一行前添加annotation
      const group = groups.find(g => g.start === lineNumber);
      if (group) {
        // 根据目标行的内容选择合适的注释语法
        const targetLine = codeLines[i];
        const actualCommentPrefix = getCommentPrefixForLine(targetLine, language);

        if (group.start === group.end) {
          // 单行高亮
          if (actualCommentPrefix === '<!--') {
            processedLines.push(`<!-- !mark -->`);
          } else {
            processedLines.push(`${actualCommentPrefix} !mark`);
          }
        } else {
          // 多行高亮
          if (actualCommentPrefix === '<!--') {
            processedLines.push(`<!-- !mark(1:${group.end - group.start + 1}) -->`);
          } else {
            processedLines.push(`${actualCommentPrefix} !mark(1:${group.end - group.start + 1})`);
          }
        }
      }

      processedLines.push(line);
    }

    processedCode = processedLines.join('\n');
    // 从meta中移除高亮语法
    processedMeta = meta.replace(highlightRangeRegex, '').trim();
  }

  // 解析文件名 - 处理 !!tabs filename 语法
  let filename = "";
  if (processedMeta && typeof processedMeta === "string") {
    // 匹配 !!tabs filename 格式
    const tabsMatch = processedMeta.match(/!!tabs\s+(.+)/);
    if (tabsMatch) {
      filename = tabsMatch[1].trim();
    } else {
      // 匹配 title="filename" 格式
      const titleMatch = processedMeta.match(/title="([^"]+)"/);
      if (titleMatch) {
        filename = titleMatch[1];
      } else {
        // 匹配第一个非特殊字符串作为文件名
        const firstStr = processedMeta.split(" ")[0];
        if (firstStr && !firstStr.startsWith("{") && firstStr !== "hideLineNumbers") {
          filename = firstStr;
        }
      }
    }
  }

  return {
    value: processedCode,
    lang: language,
    meta: processedMeta,
    filename: filename
  };
}

function createRawCodeFromCodeComponent(codeComponent) {
  // 从 Code 组件的属性中提取信息
  const attributes = codeComponent.attributes || [];

  let code = "";
  let lang = "text";
  let meta = "";
  let title = "";

  attributes.forEach(attr => {
    if (attr.name === "code" && attr.value) {
      code = attr.value;
    } else if (attr.name === "lang" && attr.value) {
      lang = attr.value;
    } else if (attr.name === "meta" && attr.value) {
      meta = attr.value;
    } else if (attr.name === "title" && attr.value) {
      title = attr.value;
    }
  });

  // 解析文件名 - 优先使用 title，然后使用 meta（忽略 !!tabs），最后使用语言
  let filename = "";

  // 首先检查是否有 title 属性
  if (title && typeof title === "string") {
    filename = title;
  } else if (meta && typeof meta === "string") {
    // 如果 meta 只是 !!tabs 或包含 !!tabs，则忽略它
    if (meta === "!!tabs" || meta.includes("!!tabs")) {
      filename = lang;
    } else {
      // 直接使用 meta 作为文件名
      filename = meta;
    }
  } else {
    // 最后使用语言作为标签
    filename = lang;
  }

  if (!code) {
    return null;
  }

  return {
    value: code.replace(/\r\n/g, '\n').replace(/\n+$/, ''),
    lang: lang,
    meta: filename || lang
  };
}

// 解析高亮范围字符串，例如：1,4-6,11 => [1,4,5,6,11]
function parseHighlightRange(rangeString) {
  const ranges = rangeString.split(",");
  const result = [];

  for (const range of ranges) {
    const [start, end] = range.split("-");
    if (end) {
      for (let i = parseInt(start); i <= parseInt(end); i++) {
        result.push(i);
      }
    } else {
      result.push(parseInt(start));
    }
  }

  return result;
}

// 将连续的行号分组，例如：[1,4,5,6,11] => [{start:1,end:1},{start:4,end:6},{start:11,end:11}]
function groupConsecutiveLines(lines) {
  if (lines.length === 0) return [];

  const sorted = [...lines].sort((a, b) => a - b);
  const groups = [];
  let currentGroup = { start: sorted[0], end: sorted[0] };

  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i] === currentGroup.end + 1) {
      // 连续的行，扩展当前组
      currentGroup.end = sorted[i];
    } else {
      // 不连续，开始新组
      groups.push(currentGroup);
      currentGroup = { start: sorted[i], end: sorted[i] };
    }
  }

  groups.push(currentGroup);
  return groups;
}

// 根据语言获取注释前缀
function getCommentPrefix(language) {
  const commentMap = {
    javascript: "//",
    js: "//",
    jsx: "//",
    typescript: "//",
    ts: "//",
    tsx: "//",
    java: "//",
    c: "//",
    cpp: "//",
    csharp: "//",
    cs: "//",
    php: "//",
    swift: "//",
    kotlin: "//",
    scala: "//",
    go: "//",
    rust: "//",
    python: "#",
    py: "#",
    ruby: "#",
    rb: "#",
    perl: "#",
    bash: "#",
    sh: "#",
    yaml: "#",
    yml: "#",
    toml: "#",
    r: "#",
    sql: "--",
    lua: "--",
    haskell: "--",
    hs: "--",
    html: "<!--",
    xml: "<!--",
    css: "/*",
    scss: "//",
    sass: "//",
    less: "//",
    stylus: "//",
    json: "//", // 使用 jsonc 语法
    jsonc: "//",
    json5: "//"
  };

  return commentMap[language] || "//";
}

// 根据行内容和语言选择合适的注释前缀
function getCommentPrefixForLine(line, language) {
  const trimmedLine = line.trim();

  // 对于JSX/TSX，需要检测是HTML标签还是JavaScript代码
  if (language === 'jsx' || language === 'tsx') {
    // 检测是否是HTML标签行（简单启发式）
    if (trimmedLine.startsWith('<') && (trimmedLine.includes('>') || trimmedLine.endsWith('>'))) {
      return '<!--';
    }
    // 检测是否在JSX返回语句中的HTML部分
    if (trimmedLine.includes('<') && trimmedLine.includes('>')) {
      return '<!--';
    }
  }

  // 对于HTML/XML文件
  if (language === 'html' || language === 'xml') {
    return '<!--';
  }

  // 其他情况使用默认的语言注释前缀
  return getCommentPrefix(language);
}

function extractTextFromNode(node) {
  if (node.type === "text") {
    return node.value;
  }
  if (node.children) {
    return node.children.map(extractTextFromNode).join("");
  }
  return "";
}

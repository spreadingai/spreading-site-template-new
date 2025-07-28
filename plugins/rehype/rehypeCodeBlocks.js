import { visit } from "unist-util-visit";
import { flowElementType, isElement } from "../utils";

function addCodeBlocks(tree) {
  visit(tree, (node, i, parent) => {
    if (parent == null || i == null || !isElement(node) || !isElement(node, "tagName", "pre")) {
      return;
    }
    const code = node.children[0];
    if (!isElement(code, "tagName", "code")) {
      return;
    }

    // 检查父元素是否有条件渲染属性，如果有则保留
    let shouldPreserveParent = false;
    if (parent && parent.type === "mdxJsxFlowElement" && parent.name === "div" &&
        parent.attributes && parent.attributes.some(attr => attr.name === "style")) {
      shouldPreserveParent = true;
    }

    // 创建CodeHike的RawCode对象
    const rawCode = createRawCodeFromNode(code);

    // 创建Code组件 - 简化版本
    const codeComponent = {
      type: flowElementType,
      name: "Code",
      attributes: [
        { type: "mdxJsxAttribute", name: "code", value: rawCode.value },
        { type: "mdxJsxAttribute", name: "lang", value: rawCode.lang },
        { type: "mdxJsxAttribute", name: "meta", value: rawCode.meta },
        { type: "mdxJsxAttribute", name: "filename", value: rawCode.filename }
      ],
      data: { _mdxExplicitJsx: true },
      children: []
    };

    // 如果父元素有条件渲染属性，保留包装结构
    if (shouldPreserveParent) {
      // 将 Code 组件的属性合并到父 div 中，或者保持原有结构
      parent.children[i] = codeComponent;
    } else {
      parent.children[i] = codeComponent;
    }
  });
}

export function rehypeCodeBlocks() {
  return addCodeBlocks;
}

// 语言别名映射
function normalizeLanguage(language) {
  const languageAliases = {
    'oc': 'objective-c',
    'objc': 'objective-c',
    'objectivec': 'objective-c',
    'js': 'javascript',
    'ts': 'typescript',
    'py': 'python',
    'rb': 'ruby',
    'sh': 'bash',
    'yml': 'yaml',
    'md': 'markdown'
  };

  return languageAliases[language] || language;
}

function createRawCodeFromNode(code) {
  // 提取代码内容
  const codeText = extractTextFromNode(code);

  // 去除代码末尾的多余空行，但保留代码内部的空行
  const trimmedCode = codeText.replace(/\n+$/, '');

  // 提取语言
  const className = code.properties?.className?.[0];
  let language = className && className.includes("-") ? className.split("-")[1] : "text";

  // 标准化语言标识符
  language = normalizeLanguage(language);

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
    const commentPrefix = getCommentPrefix(language);

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

  // 解析文件名
  let filename = "";
  if (processedMeta && typeof processedMeta === "string") {
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

  return {
    value: processedCode,
    lang: language,
    meta: processedMeta,
    filename: filename
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
    objectivec: "//", // Objective-C 使用 // 注释
    objc: "//", // Objective-C 使用 // 注释
    "objective-c": "//", // Objective-C 使用 // 注释
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

import React from "react";
import { RawCode, Pre, highlight, AnnotationHandler } from "codehike/code";
import { mark } from "./annotations/mark";
import { focus } from "./annotations/focus";
import { lineNumbers } from "./annotations/lineNumbers";
import { CopyButtonInternal } from "./CopyButtonInternal";
import styles from "./Code.module.scss";

interface CodeProps {
  codeblock?: RawCode;
  code?: string;
  lang?: string;
  meta?: string;
  className?: string;
  style?: React.CSSProperties;
  showLineNumbers?: boolean;
  showCopyButton?: boolean;
  filename?: string; // 支持通过props传入filename
  hideFilename?: boolean; // 是否隐藏文件名标题栏
}

export const Code: React.FC<CodeProps> = ({
  codeblock,
  code,
  lang,
  meta,
  className,
  style,
  showLineNumbers = true,
  showCopyButton = true,
  filename,
  hideFilename = false
}) => {
  const [highlighted, setHighlighted] = React.useState<any>(null);
  // const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    // 如果有codeblock，使用codeblock；否则构造一个
    const rawCode = codeblock || {
      value: code || "",
      lang: lang || "text",
      meta: meta || ""
    };

    // 确保code不为空
    if (!rawCode.value) {
      // setError("No code content provided");
      console.log("No code content provided");
      return;
    }

    // 确保rawCode格式正确
    const codeToHighlight = {
      value: String(rawCode.value),
      lang: String(rawCode.lang || "text"),
      meta: String(rawCode.meta || "")
    };

    highlight(codeToHighlight, "github-dark")
      .then(result => {
        setHighlighted(result);
      })
      .catch(err => {
        console.error("CodeHike highlight error:", err);
        // setError(`Failed to highlight code: ${err.message}`);
      });
  }, [codeblock, code, lang, meta]);

  // 获取原始代码内容
  const rawCode = codeblock || {
    value: code || "",
    lang: lang || "text",
    meta: meta || ""
  };

  // 处理文件名：优先使用props中的filename，然后是meta，最后是title
  const displayFilename = filename || meta || (codeblock && codeblock.meta) || extractTitleFromMeta(meta || (codeblock && codeblock.meta));

  // 获取代码内容用于显示和复制
  const codeContent = rawCode.value || "";
  const language = rawCode.lang || "text";

  // if (error) {
  //   return (
  //     <div className={styles.wrapper}>
  //       <div className={styles.error}>Error: {error}</div>
  //     </div>
  //   );
  // }

  // 配置handlers
  const handlers: AnnotationHandler[] = [];
  if (showLineNumbers) {
    handlers.push(lineNumbers);
  }
  handlers.push(mark, focus);

  return (
    <div className={`${styles.wrapper} ${className || ""}`} style={style}>
      {/* 隐藏的搜索内容 - 供搜索引擎和 Algolia 使用 */}
      <div
        className={styles.searchableContent}
        aria-hidden="true"
        data-searchable-content="codeblock"
      >
        {displayFilename && <h4>{displayFilename}</h4>}
        <pre><code className={`language-${language}`}>{codeContent}</code></pre>
      </div>

      {/* 文件名显示 - 只有在不隐藏文件名时才显示 */}
      {!hideFilename && displayFilename && (
        <div className={styles.filename}>
          {displayFilename}
        </div>
      )}

      {/* 复制按钮 */}
      {showCopyButton && <CopyButtonInternal text={codeContent} />}

      {/* 代码块 - 如果有高亮结果则显示高亮版本，否则显示原始代码 */}
      {highlighted ? (
        <Pre code={highlighted} handlers={handlers} className={styles.pre} />
      ) : (
        <pre className={styles.pre}>
          <code className={`language-${language}`}>{codeContent}</code>
        </pre>
      )}
    </div>
  );
};

// 从meta字符串中提取title
function extractTitleFromMeta(meta?: string): string | undefined {
  if (!meta) return undefined;

  // 匹配 title="filename" 格式
  const titleMatch = meta.match(/title=["']([^"']+)["']/);
  return titleMatch ? titleMatch[1] : undefined;
}

export default Code;

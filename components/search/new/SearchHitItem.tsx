import React from "react";
import styles from "./index.module.scss";

export type HitType =
  | "lvl0"
  | "lvl1"
  | "lvl2"
  | "lvl3"
  | "lvl4"
  | "lvl5"
  | "lvl6"
  | "content";

export interface AlgoliaHit {
  objectID: string;
  url?: string;
  type?: HitType;
  content?: string;
  doctype?: string;
  group?: string;
  platform?: string;
  hierarchy?: Partial<Record<`lvl${0 | 1 | 2 | 3 | 4 | 5 | 6}`, string | null>>;
  _highlightResult?: {
    content?: { value: string; matchedWords?: string[]; matchLevel?: string };
    hierarchy?: Partial<
      Record<
        `lvl${0 | 1 | 2 | 3 | 4 | 5 | 6}`,
        { value: string; matchedWords: string[]; matchLevel?: string }
      >
    >;
  };
  _snippetResult?: {
    content?: { value: string; matchLevel?: string };
    hierarchy?: Partial<
      Record<
        `lvl${0 | 1 | 2 | 3 | 4 | 5 | 6}`,
        { value: string; matchLevel?: string }
      >
    >;
  };
}

const LVL_KEYS = ["lvl1", "lvl2", "lvl3", "lvl4", "lvl5", "lvl6"] as const;

function buildTitlePath(hit: AlgoliaHit): string {
  const highlight = hit._highlightResult?.hierarchy || {};
  const raw = hit.hierarchy || {};
  const parts: string[] = [];
  for (const key of LVL_KEYS) {
    const h = highlight[key];
    const r = raw[key];
    if (h?.value) {
      parts.push(h.value);
    } else if (r) {
      parts.push(r);
    }
  }
  return parts.join(" › ");
}

// 围绕首个 <mark> 截取上下文，避免把 <mark>...</mark> 对切成两半。
// 长度参考 Configure.attributesToSnippet 的 content:160 配置，视觉上接近 snippet。
const HIGHLIGHT_CONTEXT_BEFORE = 80;
const HIGHLIGHT_CONTEXT_AFTER = 120;
const MARK_OPEN = "<mark>";
const MARK_CLOSE = "</mark>";

function truncateAroundFirstMark(html: string): string {
  const firstOpen = html.indexOf(MARK_OPEN);
  if (firstOpen === -1) return html;
  const firstCloseAfter =
    html.indexOf(MARK_CLOSE, firstOpen) + MARK_CLOSE.length;

  let start = Math.max(0, firstOpen - HIGHLIGHT_CONTEXT_BEFORE);
  // 如果 start 正好落在某个 <mark>...</mark> 对内部，往前退到该 <mark> 之前
  const openBeforeStart = html.lastIndexOf(MARK_OPEN, start);
  const closeBeforeStart = html.lastIndexOf(MARK_CLOSE, start);
  if (openBeforeStart !== -1 && openBeforeStart > closeBeforeStart) {
    start = openBeforeStart;
  }

  let end = Math.min(html.length, firstCloseAfter + HIGHLIGHT_CONTEXT_AFTER);
  // 如果 end 落在某个 <mark>...</mark> 对内部，延伸到后面最近的 </mark> 之后
  const openBeforeEnd = html.lastIndexOf(MARK_OPEN, end);
  const closeBeforeEnd = html.lastIndexOf(MARK_CLOSE, end);
  if (openBeforeEnd !== -1 && openBeforeEnd > closeBeforeEnd) {
    const nextClose = html.indexOf(MARK_CLOSE, end);
    if (nextClose !== -1) end = nextClose + MARK_CLOSE.length;
  }

  let result = html.slice(start, end).trim();
  if (start > 0) result = `… ${result}`;
  if (end < html.length) result = `${result} …`;
  return result;
}

// content 第二行：优先用 snippet（截断的命中片段），snippet 没命中时回退 highlight（完整高亮）。
// 原因：snippet 视觉更友好（只展示命中词附近的上下文），但 Algolia 对某些长 content 可能
// 返回 snippet.matchLevel=none（命中词位置或 snippet 长度限制），此时改用 highlight 并自行截取。
function buildSnippetHtml(hit: AlgoliaHit): string {
  const snippet = hit._snippetResult?.content;
  if (snippet?.value && snippet.matchLevel && snippet.matchLevel !== "none") {
    return snippet.value;
  }
  const highlight = hit._highlightResult?.content;
  if (
    highlight?.value &&
    highlight.matchLevel &&
    highlight.matchLevel !== "none"
  ) {
    return truncateAroundFirstMark(highlight.value);
  }
  return snippet?.value || "";
}

const SearchHitItem: React.FC<{ hit: AlgoliaHit }> = ({ hit }) => {
  const titleHtml = buildTitlePath(hit);
  const snippetHtml = buildSnippetHtml(hit);
  const tags = [
    { key: "doctype", value: hit.doctype },
    { key: "group", value: hit.group },
    { key: "platform", value: hit.platform },
  ].filter((t) => !!t.value);
  // TODO(debug): 临时展示 Algolia 原始响应中的位置，联调完成后移除
  const rawPosition = (hit as any).__position;

  return (
    <a
      className={styles.hitItem}
      href={hit.url || "#"}
      target="_blank"
      rel="noreferrer"
    >
      <div
        className={styles.hitTitle}
        dangerouslySetInnerHTML={{
          __html:
            rawPosition != null
              ? `<span style="color:#999;margin-right:6px;font-weight:normal">#${rawPosition}</span>${titleHtml}`
              : titleHtml,
        }}
      />
      {snippetHtml && (
        <div
          className={styles.hitSnippet}
          dangerouslySetInnerHTML={{ __html: snippetHtml }}
        />
      )}
      {tags.length > 0 && (
        <div className={styles.hitTags}>
          {tags.map((t) => (
            <span key={t.key} className={styles.hitTag} data-tag={t.key}>
              {t.value}
            </span>
          ))}
        </div>
      )}
    </a>
  );
};

export default SearchHitItem;

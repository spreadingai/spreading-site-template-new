import React from "react";
import {
  getDocTypeLabel,
  getGroupLabel,
  getPlatformLabel,
} from "./facetMapping";
import styles from "./index.module.scss";

type GroupMap = Map<string, string>;

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

type Variant = "default" | "dropdown";

function hasContentHighlight(hit: AlgoliaHit): boolean {
  const snippet = hit._snippetResult?.content;
  if (snippet?.matchLevel && snippet.matchLevel !== "none") return true;
  const highlight = hit._highlightResult?.content;
  if (highlight?.matchLevel && highlight.matchLevel !== "none") return true;
  return false;
}

function buildTitleParts(
  hit: AlgoliaHit,
  variant: Variant = "default",
): string[] {
  const highlight = hit._highlightResult?.hierarchy || {};
  const raw = hit.hierarchy || {};

  // content 有高亮时保留所有层级，否则去掉尾部不高亮的层级
  const shouldTruncate = !hasContentHighlight(hit);

  // 找到最后一个高亮命中的层级索引
  let lastHighlightedIdx = -1;
  for (let i = LVL_KEYS.length - 1; i >= 0; i--) {
    const h = highlight[LVL_KEYS[i]];
    if (h?.value && h.matchLevel && h.matchLevel !== "none") {
      lastHighlightedIdx = i;
      break;
    }
  }

  const endIdx = shouldTruncate ? lastHighlightedIdx : LVL_KEYS.length - 1;

  const hierarchyParts: string[] = [];
  for (let i = 0; i <= endIdx; i++) {
    const key = LVL_KEYS[i];
    const h = highlight[key];
    const r = raw[key];
    if (h?.value) {
      hierarchyParts.push(h.value);
    } else if (r) {
      hierarchyParts.push(r);
    }
  }

  const parts: string[] = [];
  // dropdown 场景：先拼 lvl0（取第一段后面的所有，用 › 拼接）
  if (variant === "dropdown" && raw.lvl0) {
    const lvl0Parts = raw.lvl0.replace(/&gt;/g, ">").split(">");
    const restParts = lvl0Parts.slice(1).map((s) => s.trim()).filter(Boolean);
    if (restParts.length > 0) parts.push(restParts.join(" › "));
  }
  parts.push(...hierarchyParts);
  return parts;
}

// 围绕首个 <mark> 截取上下文，避免把 <mark>...</mark> 对切成两半。
const MARK_OPEN = "<mark>";
const MARK_CLOSE = "</mark>";

const HIGHLIGHT_CONTEXT: Record<Variant, { before: number; after: number }> = {
  default: { before: 80, after: 120 }, // 对应 content:160
  dropdown: { before: 15, after: 20 }, // 对应 content:30
};

function truncateAroundFirstMark(
  html: string,
  variant: Variant = "default",
): string {
  const { before: ctxBefore, after: ctxAfter } = HIGHLIGHT_CONTEXT[variant];
  const firstOpen = html.indexOf(MARK_OPEN);
  if (firstOpen === -1) return html;
  const firstCloseAfter =
    html.indexOf(MARK_CLOSE, firstOpen) + MARK_CLOSE.length;

  let start = Math.max(0, firstOpen - ctxBefore);
  // 如果 start 正好落在某个 <mark>...</mark> 对内部，往前退到该 <mark> 之前
  const openBeforeStart = html.lastIndexOf(MARK_OPEN, start);
  const closeBeforeStart = html.lastIndexOf(MARK_CLOSE, start);
  if (openBeforeStart !== -1 && openBeforeStart > closeBeforeStart) {
    start = openBeforeStart;
  }

  let end = Math.min(html.length, firstCloseAfter + ctxAfter);
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

// content：优先用 snippet（截断的命中片段），snippet 没命中时回退 highlight（完整高亮）。
function buildSnippetHtml(
  hit: AlgoliaHit,
  variant: Variant = "default",
): string {
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
    console.log("truncateAroundFirstMark", highlight.value);
    return truncateAroundFirstMark(highlight.value, variant);
  }
  return snippet?.value || "";
}

const SearchHitItem: React.FC<{
  hit: AlgoliaHit;
  language?: string;
  groupMap?: GroupMap;
  variant?: Variant;
}> = ({ hit, language = "zh", groupMap, variant = "default" }) => {
  const titleParts = buildTitleParts(hit, variant);
  let snippetHtml = buildSnippetHtml(hit, variant);

  // dropdown 场景：snippet 为空时，从 titleParts 中拆分保证两者都有内容
  if (variant === "dropdown" && !snippetHtml && titleParts.length > 0) {
    // titleParts 中去掉 lvl0 后的层级数量（即 hierarchy 部分）
    const hasLvl0 = variant === "dropdown" && hit.hierarchy?.lvl0;
    const hierarchyCount = hasLvl0 ? titleParts.length - 1 : titleParts.length;

    if (hierarchyCount <= 1) {
      // 只有一级：title 展示 lvl0，snippet 用这一级
      snippetHtml = titleParts[titleParts.length - 1];
      if (hasLvl0) {
        // titleParts[0] 就是 lvl0，title 只保留它
        titleParts.splice(1);
      }
    } else {
      // 多级：snippet 用最后一级，title 去掉最后一级
      snippetHtml = titleParts.pop()!;
    }
  }

  const titleHtml = titleParts.join(" › ");
  const tags = [
    {
      key: "doctype",
      value: hit.doctype ? getDocTypeLabel(hit.doctype, language) : undefined,
    },
    {
      key: "group",
      value:
        hit.group && groupMap ? getGroupLabel(groupMap, hit.group) : hit.group,
    },
    {
      key: "platform",
      value: hit.platform
        ? getPlatformLabel(hit.platform, language)
        : undefined,
    },
  ].filter((t) => !!t.value);
  // TODO(debug): 临时展示 Algolia 原始响应中的位置，联调完成后移除
  const rawPosition = (hit as any).__position;

  return (
    <a
      className={`${styles.hitItem} ${variant === "dropdown" ? styles.hitItemDropdown : ""}`}
      href={hit.url || "#"}
      target="_blank"
      rel="noreferrer"
    >
      <div
        className={styles.hitTitle}
        dangerouslySetInnerHTML={{
          __html:
            rawPosition != null
              ? // <span style="color:#999;margin-right:6px;font-weight:normal">#${rawPosition}</span>
                `${titleHtml}`
              : titleHtml,
        }}
      />
      {snippetHtml && (
        <div
          className={styles.hitSnippet}
          dangerouslySetInnerHTML={{ __html: snippetHtml }}
        />
      )}
      {variant === "default" && tags.length > 0 && (
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

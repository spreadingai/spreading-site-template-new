import React from "react";
import { addRecentQuery } from "./recentQueries";

/**
 * DocSearchHit — 自定义搜索结果渲染组件
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * 背景：Algolia DocSearch 的索引结构
 * ─────────────────────────────────────────────────────────────────────────────
 * Algolia Crawler 抓取文档时，会将每个页面拆分为多条独立的 record，每条 record 有一个
 * type 字段，表示它在文档层级中的位置：
 *
 *   type = lvl0         → 页面的一级标题（通常是产品名/章节名）
 *   type = lvl1~lvl6    → 页面内的各级子标题（h2~h6）
 *   type = content      → 标题下方的正文段落文本
 *
 * 每条 record 同时携带完整的 hierarchy 字段，记录它所处的上下文路径：
 *   hierarchy.lvl0 = "实时音视频"
 *   hierarchy.lvl1 = "快速开始"
 *   hierarchy.lvl2 = "SDK 安装"   ← 当前 record 所在的层级
 *
 * Algolia 搜索时，除了返回直接命中的 record，还会返回其父级/兄弟级 record（用于
 * 保持层级上下文完整性），这些"顺带返回"的 record 在 _highlightResult 中对应字段
 * 的 matchLevel 为 "none"（即未真正命中查询词）。
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * 三个核心字段说明
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * hierarchy          — 各层级的原始纯文本，不含任何高亮标签。
 *                      用途：拼接面包屑路径时的兜底文本。
 *
 * _highlightResult   — 各字段的高亮结果，value 中命中词被 <mark> 标签包裹。
 *                      每个字段有 matchLevel：
 *                        "full"    → 查询词全部命中该字段
 *                        "partial" → 查询词部分命中（多词查询中只匹配了部分词）
 *                        "none"    → 该字段未命中任何查询词
 *                      结构：{ hierarchy: { lvl0~lvl6: { value, matchLevel } }, content: { value, matchLevel } }
 *                      用途：展示 lvlX 类型的标题 title（文本短，展示完整高亮）；
 *                            展示面包屑路径中各层级的高亮文本。
 *
 * _snippetResult     — _highlightResult 的截断版本，只保留命中词前后的上下文片段，
 *                      命中词同样用 <mark> 标签包裹。
 *                      结构：{ content: { value, matchLevel }, hierarchy: { lvl0~lvl6: { value, matchLevel } } }
 *                      用途：展示 content 类型的正文 title（正文文本长，截断后展示
 *                            关键词上下文更合适，避免显示大段无关文字）。
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * 过滤策略（在 index.tsx 的 transformItems 中前置执行）
 * ─────────────────────────────────────────────────────────────────────────────
 * 目标：只展示自身文本命中的 record，过滤掉 Algolia 因层级机制带出的无关上下文条目，
 *       避免搜索结果中出现无高亮、与查询词无关的条目，消除用户歧义。
 *
 * 过滤规则：
 *   type = content → _snippetResult.content.matchLevel !== "none" 且 content 字段非空
 *                    （content 为空说明这条正文 record 没有实际内容，
 *                     content 未命中说明它只是因父级标题命中而被带出）
 *   type = lvlX   → _highlightResult.hierarchy[type].matchLevel !== "none"
 *                    （matchLevel 为 "none" 说明这个标题本身未命中，
 *                     是因其子级 content 命中而被 Algolia 顺带返回的父级 record）
 *
 * 注意：lvlX 命中的标题 和 其下方的 content 命中的正文 是两条独立的 record，
 *       过滤 content record 不会导致对应的 lvlX 标题丢失。
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * 渲染策略
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * [Title]
 *   type = content → 使用 _snippetResult.content.value
 *                    优先展示截断的高亮片段，让用户直接看到命中关键词的上下文。
 *                    兜底：_snippetResult 不存在时用原始 content 纯文本。
 *   type = lvlX   → 使用 _highlightResult.hierarchy[type].value
 *                    标题文本短，展示完整文本并高亮命中词。
 *                    兜底：_highlightResult 不存在时用 hierarchy[type] 纯文本。
 *   最终兜底：titleHtml 为空字符串时，直接 return null，不渲染空白条目。
 *
 * [Path 面包屑]
 *   取 hierarchy 中当前 type 之上的所有层级（不含自身）：
 *     type = lvlX   → slice(0, indexOf(type))，如 lvl2 取 [lvl0, lvl1]
 *     type = content → slice(0, 7)，取全部 lvl0~lvl6（正文展示完整路径）
 *   每个层级优先使用 _highlightResult.hierarchy[lvl].value（可能含 <mark>），
 *   不存在时回退到 hierarchy[lvl] 纯文本，过滤掉 null/undefined 后用 " > " 拼接。
 *   效果：面包屑中凡是命中查询词的层级标题也会高亮显示，未命中的层级展示纯文本。
 */

const HIERARCHY_LEVELS = [
  "lvl0",
  "lvl1",
  "lvl2",
  "lvl3",
  "lvl4",
  "lvl5",
  "lvl6",
] as const;

const DocSearchHit = ({
  hit,
  indexName,
}: {
  hit: any;
  indexName: string;
  children?: React.ReactNode;
}) => {
  const { hierarchy, type, content, url } = hit;

  const highlightResult = hit._highlightResult;
  const snippetResult = hit._snippetResult;

  // Title: 优先使用带 <mark> 高亮标签的值
  // content 类型用 snippetResult（截断片段），lvlX 类型用 highlightResult（完整标题）
  let titleHtml = "";
  if (type === "content") {
    titleHtml = snippetResult?.content?.value || content || "";
  } else {
    titleHtml =
      highlightResult?.hierarchy?.[type]?.value || hierarchy[type] || "";
  }

  // transformItems 已过滤掉无效记录，此处作为兜底：空 title 不渲染
  if (!titleHtml) return null;

  // Path: lvl0 > lvl1 > ... 到当前 type 的上一层（不含自身）
  // 优先用 _highlightResult 的值，命中的层级会带 <mark> 高亮
  const stopIdx =
    type === "content"
      ? HIERARCHY_LEVELS.length
      : HIERARCHY_LEVELS.indexOf(type);
  const pathHtml = HIERARCHY_LEVELS.slice(0, stopIdx)
    .map((lvl) => highlightResult?.hierarchy?.[lvl]?.value || hierarchy[lvl])
    .filter(Boolean)
    .join(" > ");

  const handleClick = () => {
    const input = document.querySelector<HTMLInputElement>(".DocSearch-Input");
    const query = input?.value?.trim();
    if (query) {
      addRecentQuery(query, indexName);
    }
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
    >
      <div className="DocSearch-Hit-Container">
        <div className="DocSearch-Hit-content-wrapper">
          <span
            className="DocSearch-Hit-title"
            dangerouslySetInnerHTML={{ __html: titleHtml }}
          />
          {pathHtml && (
            <span
              className="DocSearch-Hit-path"
              dangerouslySetInnerHTML={{ __html: pathHtml }}
            />
          )}
        </div>
      </div>
    </a>
  );
};

export default DocSearchHit;

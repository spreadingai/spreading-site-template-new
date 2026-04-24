import type { Hit } from "instantsearch.js";
import type { AlgoliaHit } from "./SearchHitItem";

type FilterableHit = Hit<AlgoliaHit>;

/**
 * 过滤 Algolia 返回的 hits：
 * 只要记录的任意"可见字段"存在命中（matchLevel !== "none"）就保留，
 * 否则视为无关上下文条目丢弃。
 *
 * 可见字段定义（与 SearchHitItem 的展示范围对齐）：
 * - content（snippet 第二行）
 * - hierarchy.lvl1 ~ lvl6（标题路径第一行）
 * 注意：lvl0 是顶层分类/面包屑前缀，UI 不展示，命中它也没有视觉体现，忽略。
 */
const HAS_MATCH = (matchLevel?: string) =>
  !!matchLevel && matchLevel !== "none";

const VISIBLE_HIERARCHY_LEVELS = [
  "lvl1",
  "lvl2",
  "lvl3",
  "lvl4",
  "lvl5",
  "lvl6",
] as const;

export const filterHits = (items: FilterableHit[]): FilterableHit[] => {
  const rejected: Array<{ reason: string; sample: any }> = [];
  const kept = items.filter((hit) => {
    const highlight: any = hit._highlightResult;
    const snippet: any = hit._snippetResult;

    // 1) content 字段命中（高亮或片段任一即可）
    if (
      HAS_MATCH(highlight?.content?.matchLevel) ||
      HAS_MATCH(snippet?.content?.matchLevel)
    ) {
      return true;
    }

    // 2) 任一可见 hierarchy 层级命中（lvl1~lvl6，lvl0 不展示故忽略）
    const hierarchyHighlight = highlight?.hierarchy || {};
    const hierarchySnippet = snippet?.hierarchy || {};
    for (const lvl of VISIBLE_HIERARCHY_LEVELS) {
      if (
        HAS_MATCH(hierarchyHighlight[lvl]?.matchLevel) ||
        HAS_MATCH(hierarchySnippet[lvl]?.matchLevel)
      ) {
        return true;
      }
    }

    rejected.push({ reason: "no match in any field", sample: hit });
    return false;
  });
  // eslint-disable-next-line no-console
  console.log("[filterHits]", {
    input: items.length,
    kept: kept.length,
    rejected: rejected.length,
    firstRejectedSample: rejected[0],
    firstKeptSample: kept[0],
  });
  return kept;
};

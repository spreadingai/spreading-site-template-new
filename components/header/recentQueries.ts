/**
 * recentQueries — 自定义最近搜索词存储
 *
 * 与 DocSearch 的 __DOCSEARCH_RECENT_SEARCHES__ 类似，但只存储 query 字符串，
 * 不存储完整的 hit record。用于在搜索框上方以 label 形式展示历史搜索词。
 *
 * 存储规则：
 *   - 去重：新词加入时，若已存在则先移除旧条目再插入到最前面
 *   - 最多保留 MAX_RECENT_QUERIES 条，超出时移除最早加入的（末尾元素）
 *   - 存储在 localStorage，key 固定为 RECENT_QUERIES_KEY
 */

const KEY_PREFIX = "__DOCSEARCH_CUSTOM_RECENT_QUERIES__";
export const MAX_RECENT_QUERIES = 10;

function buildKey(indexName: string): string {
  return `${KEY_PREFIX}${indexName}`;
}

/**
 * 读取所有历史搜索词，返回数组（最新的在最前面）
 */
export function getRecentQueries(indexName: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(buildKey(indexName));
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

/**
 * 保存一条搜索词：
 *   1. 去重（若已存在则先删除旧条目）
 *   2. 插入到数组最前面
 *   3. 超出上限时截断末尾
 */
export function addRecentQuery(query: string, indexName: string): void {
  if (typeof window === "undefined") return;
  const trimmed = query.trim();
  if (!trimmed) return;
  try {
    const queries = getRecentQueries(indexName).filter((q) => q !== trimmed);
    queries.unshift(trimmed);
    if (queries.length > MAX_RECENT_QUERIES) {
      queries.splice(MAX_RECENT_QUERIES);
    }
    localStorage.setItem(buildKey(indexName), JSON.stringify(queries));
  } catch {
    // localStorage 不可用时静默失败
  }
}

/**
 * DocSearch transformItems 过滤函数
 *
 * 只保留"直接匹配"的结果：
 *   - content 类型：snippetResult 或 highlightResult 的 matchLevel 不为 none，且有实际内容
 *   - hierarchy 类型：对应层级的 matchLevel 不为 none
 */
export function filterDocSearchItems(items: any[]): any[] {
  return items.filter((item: any) => {
    const hl = item._highlightResult;
    const sn = item._snippetResult;
    if (item.type === "content") {
      const matchLevel = sn?.content?.matchLevel ?? hl?.content?.matchLevel;
      const hasContent = !!(item.content || sn?.content?.value);
      return matchLevel !== "none" && hasContent;
    }
    return hl?.hierarchy?.[item.type]?.matchLevel !== "none";
  });
}

/**
 * 清空所有历史搜索词
 */
export function clearRecentQueries(indexName: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(buildKey(indexName));
  } catch {
    // ignore
  }
}

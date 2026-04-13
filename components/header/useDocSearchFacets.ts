/**
 * useDocSearchFacets — 独立轻量 Algolia 查询，获取 doctype 分类统计
 *
 * 原理：
 *   DocSearch 内部不暴露 facets 数据，我们通过 MutationObserver + input 事件
 *   监听搜索词变化，每次变化时向 Algolia REST API 发送一个 hitsPerPage=0 的查询，
 *   只取 facets 统计数据，不返回 hits，极快（<5ms 服务端处理）。
 *
 * facetFilters 设计：
 *   保留 version/group/language/platform 过滤（与 DocSearch 主查询一致），
 *   不包含 doctype — 这样可以获取所有 doctype 的全量计数，
 *   点击 Tab 切换时不影响其他 Tab 上的数字。
 */

import { useState, useEffect, useRef, useCallback } from "react";

/** facets 统计结果 */
export interface DocSearchFacetsResult {
  /** doctype 分类统计，如 { "技术文档": 22701, "API": 1597 } */
  facets: Record<string, number>;
  /** 总命中数（不含 doctype 过滤） */
  totalHits: number;
  /** 是否正在加载 */
  loading: boolean;
}

interface UseDocSearchFacetsOptions {
  appId: string;
  apiKey: string;
  indexName: string;
  /** 基础 facetFilters（不含 doctype），与 DocSearch 主查询保持一致 */
  baseFacetFilters: string[];
}

const DEBOUNCE_MS = 300;

export function useDocSearchFacets({
  appId,
  apiKey,
  indexName,
  baseFacetFilters,
}: UseDocSearchFacetsOptions): DocSearchFacetsResult {
  const [facets, setFacets] = useState<Record<string, number>>({});
  const [totalHits, setTotalHits] = useState(0);
  const [loading, setLoading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const abortRef = useRef<AbortController>();
  // 缓存最新的 baseFacetFilters 避免闭包过期
  const filtersRef = useRef(baseFacetFilters);
  filtersRef.current = baseFacetFilters;

  const fetchFacets = useCallback(
    async (query: string) => {
      // 取消上一次请求
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setLoading(true);
      try {
        const url = `https://${appId}-dsn.algolia.net/1/indexes/${indexName}/query`;
        const body = {
          query,
          hitsPerPage: 0,
          facets: ["doctype"],
          facetFilters: filtersRef.current,
          attributesToRetrieve: [],
          attributesToSnippet: [],
          attributesToHighlight: [],
        };
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Algolia-Application-Id": appId,
            "X-Algolia-API-Key": apiKey,
          },
          body: JSON.stringify(body),
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`Algolia ${res.status}`);
        const data = await res.json();
        if (!controller.signal.aborted) {
          setFacets(data.facets?.doctype ?? {});
          setTotalHits(data.nbHits ?? 0);
        }
      } catch (err: any) {
        if (err?.name !== "AbortError") {
          console.warn("[useDocSearchFacets] fetch error:", err);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    },
    [appId, apiKey, indexName],
  );

  useEffect(() => {
    function update() {
      const modal = document.querySelector(".DocSearch-Modal");
      if (!modal) {
        // 弹窗关闭时清空
        setFacets({});
        setTotalHits(0);
        return;
      }
      const input =
        document.querySelector<HTMLInputElement>(".DocSearch-Input");
      const query = input?.value?.trim() || "";
      if (!query) {
        setFacets({});
        setTotalHits(0);
        return;
      }
      // debounce
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => fetchFacets(query), DEBOUNCE_MS);
    }

    const observer = new MutationObserver(update);
    observer.observe(document.body, { childList: true, subtree: true });
    document.addEventListener("input", update, true);

    return () => {
      observer.disconnect();
      document.removeEventListener("input", update, true);
      clearTimeout(timerRef.current);
      abortRef.current?.abort();
    };
  }, [fetchFacets]);

  return { facets, totalHits, loading };
}

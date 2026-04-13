import { useState, useEffect } from "react";
import styles from "./DocSearchPortal.module.scss";

export interface DocSearchPortalResult {
  /** portal 挂载节点，null 表示弹框未打开 */
  portalNode: HTMLElement | null;
  /** 当前搜索框是否有非空输入，供调用方切换内容 A / 内容 B */
  hasQuery: boolean;
}

/**
 * 通用 hook：在 DocSearch 结果列表的上方或下方注入自定义内容。
 *
 * 显示时机：
 *  - 弹框打开（.DocSearch-Modal 出现）且结果容器存在时创建 portal 挂载点
 *  - 弹框关闭（.DocSearch-Modal 消失）时自动移除挂载点
 *  - above / below 均遵循此规则，与搜索词、结果数量无关
 *
 * 插入位置：
 *  - "above" → insertBefore(.DocSearch-Dropdown-Container)
 *  - "below" → insertAfter(.DocSearch-Dropdown-Container)（DOM 无原生 insertAfter，用 insertBefore(nextSibling) 实现）
 *
 * 返回值：
 *  - portalNode：挂载节点，通过 createPortal 渲染内容
 *  - hasQuery：当前是否有搜索词，供 above 调用方区分内容 A（无词）和内容 B（有词）
 */
function useDocSearchPortal(
  id: string,
  position: "above" | "below",
): DocSearchPortalResult {
  const [portalNode, setPortalNode] = useState<HTMLElement | null>(null);
  const [hasQuery, setHasQuery] = useState(false);

  useEffect(() => {
    let currentNode: HTMLElement | null = null;

    function update() {
      const modal = document.querySelector(".DocSearch-Modal");
      const container = document.querySelector(".DocSearch-Dropdown-Container");
      const input =
        document.querySelector<HTMLInputElement>(".DocSearch-Input");

      // 同步 hasQuery 状态（供调用方切换内容 A/B）
      setHasQuery(!!input?.value?.trim());

      // 弹框打开且结果容器存在时才插入 portal
      const shouldShow = !!(modal && container);

      if (shouldShow && !currentNode) {
        const node = document.createElement("div");
        node.id = id;
        node.className =
          position === "above" ? styles.abovePortal : styles.belowPortal;
        if (position === "above") {
          container!.parentNode?.insertBefore(node, container);
        } else {
          // insertAfter 语义：DOM 无原生 insertAfter，用 insertBefore(nextSibling) 实现
          // nextSibling 为 null 时等同于 appendChild
          container!.parentNode?.insertBefore(node, container!.nextSibling);
        }
        currentNode = node;
        setPortalNode(node);
      } else if (!shouldShow && currentNode) {
        currentNode.remove();
        currentNode = null;
        setPortalNode(null);
      }
    }

    const observer = new MutationObserver(update);
    observer.observe(document.body, { childList: true, subtree: true });
    document.addEventListener("input", update, true);

    return () => {
      observer.disconnect();
      document.removeEventListener("input", update, true);
      currentNode?.remove();
      currentNode = null;
      setPortalNode(null);
    };
  }, [id, position]);

  return { portalNode, hasQuery };
}

export function useDocSearchAboveResults(): DocSearchPortalResult {
  return useDocSearchPortal("docsearch-above-results", "above");
}

export function useDocSearchBelowResults(): DocSearchPortalResult {
  return useDocSearchPortal("docsearch-below-results", "below");
}

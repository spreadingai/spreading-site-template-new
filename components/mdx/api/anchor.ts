import { useEffect } from "react";
export type RefLink = { href?: string; anchorId?: string; title?: string };

export function buildAnchorId(kind: string, opts: { scope?: string; name?: string } = {}) {
  // 简化锚点：不再拼接 language，仅保留 kind-scope-name，并规范化分隔符
  let { scope, name } = opts;
  // 规范化：将路径分隔符替换为连字符，避免片段中出现 '/'
  const sanitize = (s?: string) => (s || "").replace(/\/+/g, "-");
  scope = sanitize(scope);
  name = sanitize(name);
  const parts = [kind];
  if (scope) parts.push(scope);
  if (name) parts.push(name);
  return parts.join("-");
}

export function buildHref(ref?: RefLink): string | undefined {
  if (!ref) return undefined;
  const { href, anchorId } = ref;
  if (href && anchorId) return `${href}#${anchorId}`;
  if (anchorId) return `#${anchorId}`;
  if (href) return href;
  return undefined;
}

export function copyAnchorToClipboard(id: string) {
  try {
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}${window.location.pathname}#${id}`;
      navigator?.clipboard?.writeText?.(url);
    }
  } catch (e) {
    // ignore
  }
}

export function useAnchorEffect(id?: string, opts: { scroll?: boolean; highlight?: boolean } = { scroll: true, highlight: true }) {
  useEffect(() => {
    if (!id || typeof window === "undefined") return;
    const run = () => {
      const hash = window.location.hash?.replace(/^#/, "");
      if (hash !== id) return;
      const el = document.getElementById(id);
      if (!el) return;
      if (opts.scroll !== false) {
        try { el.scrollIntoView({ behavior: "smooth", block: "start" }); } catch {}
      }
      if (opts.highlight !== false) {
        const original = el.style.boxShadow;
        el.style.boxShadow = "0 0 0 3px rgba(59,130,246,0.5) inset";
        setTimeout(() => { el.style.boxShadow = original; }, 1600);
      }
    };
    window.addEventListener("hashchange", run);
    // 初次挂载也尝试执行一次（处理直接打开带 hash 的情况）
    run();
    return () => window.removeEventListener("hashchange", run);
  }, [id, opts.scroll, opts.highlight]);
}

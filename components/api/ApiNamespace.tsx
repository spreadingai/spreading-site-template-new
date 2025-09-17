import React from "react";
import { useAnchorEffect, buildAnchorId, RefLink, buildHref, copyAnchorToClipboard } from "./anchor";

export interface ApiNamespaceProps {
  language?: "cpp" | "ts" | "js" | "cs";
  name: string;
  declaredIn?: string;
  headerBadges?: string[];
  children?: React.ReactNode; // 可嵌套其他组件
  deprecated?: string;
  id?: string;
  showLinkIcon?: boolean;
  seeAlsoRefs?: RefLink[];
}

const codeStyle: React.CSSProperties = {
  fontFamily:
    "SFMono-Regular,Consolas,Liberation Mono,Menlo,Monaco,monospace",
  fontSize: 14,
};

export default function ApiNamespace(props: ApiNamespaceProps) {
  const { language = "ts", name, declaredIn, headerBadges, children, deprecated } = props;
  const signature = (() => {
    switch (language) {
      case "cpp": return `namespace ${name}`;
      case "cs": return `namespace ${name}`;
      case "ts":
      case "js":
      default: return `namespace ${name}`;
    }
  })();

  const anchorId = props.id || buildAnchorId("namespace", { name });
  const [hover, setHover] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [collapsed, setCollapsed] = React.useState(false);
  useAnchorEffect(anchorId);

  return (
    <div id={anchorId} style={{ border: "1px solid var(--docuo-table-border)", borderRadius: 8, margin: "16px 0" }}>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "8px 12px", background: "var(--docuo-table-th-bg)", borderTopLeftRadius: 8, borderTopRightRadius: 8,
      }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ fontWeight: 600 }}>{name}</div>
          {props.showLinkIcon !== false && (
            <button aria-label="copy-anchor" onClick={() => { copyAnchorToClipboard(anchorId); setCopied(true); setTimeout(() => setCopied(false), 1200); }} style={{
              background: "transparent", border: "none", cursor: "pointer", fontSize: 14, color: "var(--docuo-language-btn-color)", opacity: (hover || copied) ? 1 : 0
            }}>#</button>
          )}
          {copied && <span style={{ fontSize: 12, color: "var(--ifm-color-success)" }}>Copied</span>}
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {!!deprecated && <span style={{ fontSize: 12, background: "var(--ifm-color-danger-contrast-background)", color: "var(--ifm-color-danger)", padding: "2px 6px", borderRadius: 6 }}>Deprecated</span>}
          {headerBadges?.map((b) => (
            <span key={b} style={{ fontSize: 12, background: "var(--docuo-table-th-bg)", color: "var(--docuo-color-primary-active)", padding: "2px 6px", borderRadius: 6 }}>{b}</span>
          ))}
          <button aria-label="collapse-toggle" onClick={() => setCollapsed(v => !v)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--docuo-language-btn-color)", display: "flex", alignItems: "center" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" style={{ transform: collapsed ? "rotate(-90deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}>
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
      <div style={{ padding: 12, borderTop: "1px solid var(--docuo-table-border)", display: collapsed ? "none" : "block" }}>
        {declaredIn && <div style={{ marginBottom: 6, color: "var(--docuo-language-btn-color)" }}>Declared in {declaredIn}</div>}
        {deprecated && <div style={{ marginBottom: 6, color: "var(--ifm-color-danger)" }}>{deprecated}</div>}
        <div style={{ ...codeStyle, margin: 0 }}>{signature}</div>
        {children && <div style={{ marginTop: 10 }}>{children}</div>}
        {props.seeAlsoRefs && props.seeAlsoRefs.length>0 && (
          <div style={{ marginTop: 10 }}>
            <div style={{ fontWeight: 600, marginBottom: 6 }}>See also</div>
            <ul style={{ paddingLeft: 18 }}>
              {props.seeAlsoRefs.map((r, i) => (
                <li key={i}><a href={buildHref(r)}>{r.title || buildHref(r)}</a></li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}


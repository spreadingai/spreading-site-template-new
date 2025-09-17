import React from "react";
import { buildAnchorId, copyAnchorToClipboard, useAnchorEffect } from "./anchor";

export interface ApiSectionProps {
  title: string;
  id?: string;
  headerBadges?: string[];
  showLinkIcon?: boolean;
  children?: React.ReactNode;
  defaultCollapsed?: boolean;
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" style={{ transform: open ? "rotate(0deg)" : "rotate(-90deg)", transition: "transform 0.2s ease" }}>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function ApiSection(props: ApiSectionProps) {
  const { title, headerBadges, children } = props;
  const anchorId = props.id || buildAnchorId("section", { name: title });
  const [hover, setHover] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [collapsed, setCollapsed] = React.useState(!!props.defaultCollapsed);
  useAnchorEffect(anchorId);

  return (
    <div id={anchorId} style={{ border: "var(--docuo-table-border)", borderRadius: 8, margin: "16px 0" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", background: "var(--docuo-table-th-bg)", borderTopLeftRadius: 8, borderTopRightRadius: 8 }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ fontWeight: 600 }}>{title}</div>
          {props.showLinkIcon !== false && (
            <button aria-label="copy-anchor" onClick={() => { copyAnchorToClipboard(anchorId); setCopied(true); setTimeout(() => setCopied(false), 1200); }} style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--docuo-language-btn-color)", opacity: (hover || copied) ? 1 : 0 }}>
              #
            </button>
          )}
          {copied && <span style={{ fontSize: 12, color: "var(--ifm-color-success)" }}>Copied</span>}
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {headerBadges?.map((b) => (
            <span key={b} style={{ fontSize: 12, background: "var(--docuo-table-th-bg)", color: "var(--docuo-color-primary-active)", padding: "2px 6px", borderRadius: 6 }}>{b}</span>
          ))}
          <button aria-label="collapse-toggle" onClick={() => setCollapsed(v => !v)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--docuo-language-btn-color)", display: "flex", alignItems: "center" }}>
            <Chevron open={!collapsed} />
          </button>
        </div>
      </div>
      <div style={{ padding: 12, display: collapsed ? "none" : "block" }}>
        {children}
      </div>
    </div>
  );
}


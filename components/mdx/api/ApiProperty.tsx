import React from "react";
import { RefLink, buildAnchorId, buildHref, copyAnchorToClipboard, useAnchorEffect } from "./anchor";

export interface ApiPropertyProps {
  name: string;
  type?: string;
  typeRef?: RefLink;
  valueExample?: string;
  desc?: string;
  modifiersBefore?: string[]; // e.g., public, static
  modifiersAfter?: string[]; // e.g., readonly
  declaredIn?: string; // class/interface
  children?: React.ReactNode; // 放大段描述
  deprecated?: string; // 弃用说明
  id?: string;
  showLinkIcon?: boolean;
  seeAlsoRefs?: RefLink[];
  deprecatedReplacementRef?: RefLink;
}

const codeStyle: React.CSSProperties = {
  fontFamily:
    "SFMono-Regular,Consolas,Liberation Mono,Menlo,Monaco,monospace",
  fontSize: 14,
};

function renderModifierTokens(mods?: string[]) {
  return (mods || []).map((m, i) => (
    <span key={`mod-${i}`} style={{
      display: "inline-block",
      padding: "0 6px",
      marginRight: 6,
      borderRadius: 6,
      fontSize: 12,
      background: "var(--docuo-table-th-bg)",
      color: "var(--docuo-color-primary-active)",
    }}>{m}</span>
  ));
}

export default function ApiProperty(props: ApiPropertyProps) {
  const { name, type, valueExample, desc, modifiersBefore, modifiersAfter, declaredIn, children, deprecated } = props;

  if (typeof window !== "undefined") {
    console.log("[ApiProperty] render", { name });
  }

  const anchorId = props.id || buildAnchorId("property", { scope: declaredIn, name });
  const [hover, setHover] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [collapsed, setCollapsed] = React.useState(false);
  useAnchorEffect(anchorId);

  return (
    <div id={anchorId} style={{ border: "var(--docuo-table-border)", borderRadius: 8, margin: "16px 0" }}>
      <div style={{ padding: "8px 12px", background: "var(--docuo-table-th-bg)", borderTopLeftRadius: 8, borderTopRightRadius: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        <div style={{ fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
          <span>{name}</span>
          {props.showLinkIcon !== false && (
            <button aria-label="copy-anchor" onClick={() => { copyAnchorToClipboard(anchorId); setCopied(true); setTimeout(() => setCopied(false), 1200); }} style={{ cursor: "pointer", border: "none", background: "transparent", color: "var(--docuo-language-btn-color)", opacity: (hover || copied) ? 1 : 0 }}>
              #
            </button>
          )}
          {copied && <span style={{ fontSize: 12, color: "var(--ifm-color-success)" }}>Copied</span>}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {!!deprecated && (
            <span style={{ fontSize: 12, background: "var(--ifm-color-danger-contrast-background)", color: "var(--ifm-color-danger)", padding: "2px 6px", borderRadius: 6 }}>Deprecated</span>
          )}
          <button aria-label="collapse-toggle" onClick={() => setCollapsed(v => !v)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--docuo-language-btn-color)", display: "flex", alignItems: "center" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" style={{ transform: collapsed ? "rotate(-90deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}>
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
      <div style={{ padding: 12, display: collapsed ? "none" : "block" }}>
        {declaredIn && (
          <div style={{ marginBottom: 6, color: "var(--docuo-language-btn-color)" }}>Declared in {declaredIn}</div>
        )}
        {deprecated && (
          <div style={{ marginBottom: 6, color: "var(--ifm-color-danger)" }}>
            {deprecated}
            {props.deprecatedReplacementRef && (
              <>
                {" · 替代："}
                <a href={buildHref(props.deprecatedReplacementRef)}>{props.deprecatedReplacementRef.title || "替代 API"}</a>
              </>
            )}
          </div>
        )}
        <div style={{ ...codeStyle, margin: 0 }}>
          {renderModifierTokens(modifiersBefore)}{" "}
          {type ? (
            props.typeRef ? <a href={buildHref(props.typeRef)}><code>{type}</code></a> : <code>{type}</code>
          ) : null}{" "}
          <span>{name}</span>
          {valueExample ? <span>{` = ${valueExample}`}</span> : null}{" "}
          {renderModifierTokens(modifiersAfter)}
        </div>
        {desc && <p style={{ marginTop: 8 }}>{desc}</p>}
        {children && <div style={{ marginTop: 8 }}>{children}</div>}
        {props.seeAlsoRefs && props.seeAlsoRefs.length > 0 && (
          <div style={{ marginTop: 12 }}>
            <div style={{ fontWeight: 600, marginBottom: 6 }}>相关</div>
            <ul style={{ paddingLeft: 18, margin: 0 }}>
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


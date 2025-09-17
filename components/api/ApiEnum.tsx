import React from "react";
import { useAnchorEffect, buildAnchorId, RefLink, buildHref, copyAnchorToClipboard } from "./anchor";

export interface ApiEnumMember {
  name: string;
  value?: string | number;
  desc?: string;
  deprecated?: string;
}

export interface ApiEnumProps {
  name: string;
  typeKeyword?: string; // enum / enum class / typedef NS_ENUM / sealed class
  underlyingType?: string; // e.g., int, NSUInteger
  members: ApiEnumMember[];
  notes?: string[];
  children?: React.ReactNode; // 放大段描述
  deprecated?: string; // 弃用整个枚举
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

function renderEnumHeader(typeKeyword: string, underlyingType?: string) {
  if (typeKeyword.includes("NS_ENUM")) {
    return `${typeKeyword}${underlyingType ? `<${underlyingType}>` : ""}`;
  }
  return `${typeKeyword}${underlyingType ? ` ${underlyingType}` : ""}`;
}

export default function ApiEnum(props: ApiEnumProps) {
  const { name, typeKeyword = "enum", underlyingType, members, notes, children, deprecated } = props;
  const anchorId = props.id || buildAnchorId("enum", { name });
  const [hover, setHover] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [collapsed, setCollapsed] = React.useState(false);
  useAnchorEffect(anchorId);

  return (
    <div id={anchorId} style={{ border: "1px solid var(--docuo-table-border)", borderRadius: 8, margin: "16px 0" }}>
      <div style={{ padding: "8px 12px", background: "var(--docuo-table-th-bg)", borderTopLeftRadius: 8, borderTopRightRadius: 8, display: "flex", alignItems: "center", justifyContent: "space-between" }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ fontWeight: 600 }}>{name}</div>
          {props.showLinkIcon !== false && (
            <button aria-label="copy-anchor" onClick={() => { copyAnchorToClipboard(anchorId); setCopied(true); setTimeout(() => setCopied(false), 1200); }} style={{
              background: "transparent", border: "none", cursor: "pointer", fontSize: 14, color: "var(--docuo-language-btn-color)", opacity: (hover || copied) ? 1 : 0
            }}>#</button>
          )}
          {copied && <span style={{ fontSize: 12, color: "var(--ifm-color-success)" }}>Copied</span>}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {!!deprecated && <span style={{ fontSize: 12, background: "var(--ifm-color-danger-contrast-background)", color: "var(--ifm-color-danger)", padding: "2px 6px", borderRadius: 6 }}>Deprecated</span>}
          <button aria-label="collapse-toggle" onClick={() => setCollapsed(v => !v)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--docuo-language-btn-color)", display: "flex", alignItems: "center" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" style={{ transform: collapsed ? "rotate(-90deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}>
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
      <div style={{ padding: 12, display: collapsed ? "none" : "block" }}>
        {!!deprecated && <div style={{ marginBottom: 6, color: "#b91c1c" }}>{deprecated}</div>}
        <div style={{ border: "1px solid var(--docuo-table-border)", borderRadius: 8, overflow: "hidden" }}>
          <div style={{ padding: "8px 12px", background: "var(--docuo-table-th-bg)", fontWeight: 600 }}>属性</div>
          <div>
            {members.map((m, i) => (
              <div key={m.name} style={{ borderTop: i===0 ? "none" : "1px solid var(--docuo-table-border)" }}>
                <div style={{ padding: "10px 12px", background: "var(--docuo-table-th-bg)", fontWeight: 600 }}>{m.name}</div>
                <div style={{ padding: "8px 12px" }}>
                  <div style={{ ...codeStyle }}>
                    {m.name}{m.value !== undefined ? ` = (${m.value})` : ""}
                  </div>
                  {m.desc && <p style={{ marginTop: 8 }}>{m.desc}</p>}
                  {m.deprecated && <div style={{ color: "var(--ifm-color-danger)" }}>Deprecated: {m.deprecated}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
        {children && <div style={{ marginTop: 8 }}>{children}</div>}
        {notes && notes.length > 0 && (
          <ul style={{ marginTop: 8, paddingLeft: 18 }}>
            {notes.map((n, i) => (
              <li key={i}>{n}</li>
            ))}
          </ul>
        )}
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
        {!!props.deprecatedReplacementRef && (
          <div style={{ marginTop: 8 }}>
            <span style={{ color: "#b91c1c" }}>替代：</span>
            <a href={buildHref(props.deprecatedReplacementRef)}>{props.deprecatedReplacementRef.title || buildHref(props.deprecatedReplacementRef)}</a>
          </div>
        )}
      </div>
    </div>
  );
}


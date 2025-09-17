import React from "react";
import { useAnchorEffect, buildAnchorId, RefLink, buildHref, copyAnchorToClipboard } from "./anchor";

export interface ApiConstProps {
  language?: "oc" | "java" | "cpp" | "cs" | "ts" | "js" | "dart";
  name: string;
  type?: string;
  typeRef?: RefLink;
  value?: string | number | boolean;
  modifiersBefore?: string[]; // const/static/final
  declaredIn?: string;
  children?: React.ReactNode; // 描述
  deprecated?: string;
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

export default function ApiConst(props: ApiConstProps) {
  const { language = "ts", name, type, value, modifiersBefore, declaredIn, children, deprecated } = props;

  const signature = (() => {
    const mb = (modifiersBefore || []).join(" ");
    const v = value === undefined ? "" : ` = ${String(value)}`;
    switch (language) {
      case "oc":
        return `${mb} ${type || "NSString *"} const ${name}${v}`.trim();
      case "java":
        return `${mb} ${type || "String"} ${name}${v}`.trim();
      case "cs":
        return `${mb} ${type || "string"} ${name}${v}`.trim();
      case "cpp":
        return `${mb} ${type || "const char*"} ${name}${v}`.trim();
      case "dart":
        return `${mb} ${type || "String"} ${name}${v}`.trim();
      case "ts":
      case "js":
      default:
        return `${mb} ${type ? `${type} ` : ""}${name}${v}`.trim();
    }
  })();

  const anchorId = props.id || buildAnchorId("const", { name });
  const [hover, setHover] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [collapsed, setCollapsed] = React.useState(false);
  useAnchorEffect(anchorId);

  return (
    <div id={anchorId} style={{ border: "1px solid var(--docuo-table-border)", borderRadius: 8, margin: "16px 0" }}>
      <div style={{ padding: "8px 12px", background: "var(--docuo-table-th-bg)", borderTopLeftRadius: 8, borderTopRightRadius: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
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
      <div style={{ padding: 12, borderTop: "1px solid var(--docuo-table-border)", display: collapsed ? "none" : "block" }}>
        {declaredIn && <div style={{ marginBottom: 6, color: "var(--docuo-language-btn-color)" }}>Declared in {declaredIn}</div>}
        {!!deprecated && <div style={{ marginBottom: 6, color: "var(--ifm-color-danger)" }}>{deprecated}</div>}
        <div style={{ ...codeStyle, margin: 0 }}>
          {(modifiersBefore || []).map((m,i)=>(<span key={i} style={{ display: "inline-block", padding: "0 6px", marginRight: 6, borderRadius: 6, fontSize: 12, background: "var(--docuo-table-th-bg)", color: "var(--docuo-color-primary-active)" }}>{m}</span>))}
          {" "}
          {type ? (props.typeRef ? <a href={buildHref(props.typeRef)}><code>{type}</code></a> : <code>{type}</code>) : null}
          {" "}<span style={{ fontWeight: 600 }}>{name}</span>
          {value === undefined ? null : <span>{` = ${String(value)}`}</span>}
        </div>
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
        {!!props.deprecatedReplacementRef && (
          <div style={{ marginTop: 8 }}>
            <span style={{ color: "var(--ifm-color-danger)" }}>替代：</span>
            <a href={buildHref(props.deprecatedReplacementRef)}>{props.deprecatedReplacementRef.title || buildHref(props.deprecatedReplacementRef)}</a>
          </div>
        )}
      </div>
    </div>
  );
}


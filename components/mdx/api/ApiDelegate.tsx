import React from "react";
import { useAnchorEffect, buildAnchorId, RefLink, copyAnchorToClipboard, buildHref } from "./anchor";

export interface ApiDelegateParam { name: string; type?: string; typeRef?: RefLink; desc?: string }

export interface ApiDelegateProps {
  language?: "cs" | "cpp" | "ts" | "oc" | "java" | "c" | "dart" | "js";
  name: string;
  returnType?: string;
  returnTypeRef?: RefLink;
  params?: ApiDelegateParam[];
  modifiersBefore?: string[]; // delegate/public
  declaredIn?: string;
  children?: React.ReactNode;
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

function paramList(params?: ApiDelegateParam[]) {
  return (params || []).map(p => `${p.type || "void"} ${p.name}`).join(", ");
}

export default function ApiDelegate(props: ApiDelegateProps) {
  const { language = "cs", name, returnType = "void", params, modifiersBefore, declaredIn, children } = props;

  const anchorId = props.id || buildAnchorId("delegate", { name });
  const [hover, setHover] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [collapsed, setCollapsed] = React.useState(false);
  useAnchorEffect(anchorId);

  const keyword = language === "cs" ? "delegate"
    : language === "cpp" ? "using"
    : language === "oc" ? "typedef"
    : language === "ts" ? "type" : "";

  return (
    <div id={anchorId} style={{ border: "var(--docuo-table-border)", borderRadius: 8, margin: "16px 0" }}>
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
          {!!props.deprecated && <span style={{ fontSize: 12, background: "var(--ifm-color-danger-contrast-background)", color: "var(--ifm-color-danger)", padding: "2px 6px", borderRadius: 6 }}>Deprecated</span>}
          <button aria-label="collapse-toggle" onClick={() => setCollapsed(v => !v)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--docuo-language-btn-color)", display: "flex", alignItems: "center" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" style={{ transform: collapsed ? "rotate(-90deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}>
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
      <div style={{ padding: 12, borderTop: "1px solid var(--docuo-table-border)", display: collapsed ? "none" : "block" }}>
        {declaredIn && <div style={{ marginBottom: 6, color: "var(--docuo-language-btn-color)" }}>Declared in {declaredIn}</div>}
        <div style={{ ...codeStyle, margin: 0 }}>
          {(props.modifiersBefore||[]).map((m,i)=>(<span key={i} style={{ display: "inline-block", padding: "0 6px", marginRight: 6, borderRadius: 6, fontSize: 12, background: "var(--docuo-table-th-bg)", color: "var(--docuo-color-primary-active)" }}>{m}</span>))} {" "}
          {keyword} {props.returnTypeRef ? <a href={buildHref(props.returnTypeRef)}><code>{returnType}</code></a> : <code>{returnType}</code>} <span style={{ fontWeight: 600 }}>{name}</span>
          {(params||[]).length>0 ? <span>(
            {(params||[]).map((p, idx)=> (
              <span key={idx}>
                {idx>0 ? ", " : ""}{p.typeRef ? <a href={buildHref(p.typeRef)}><code>{p.type || "void"}</code></a> : <code>{p.type || "void"}</code>} {p.name}
              </span>
            ))}
          )</span> : <span>()</span>}
        </div>
        {children && <div style={{ marginTop: 8 }}>{children}</div>}
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


import React from "react";
import { useAnchorEffect, buildAnchorId, RefLink, buildHref, copyAnchorToClipboard } from "./anchor";

export interface ApiClassProps {
  language?: "oc" | "java" | "cpp" | "cs" | "ts" | "js" | "dart";
  name: string;
  kind?: "class" | "struct"; // C++ 可用 struct
  generics?: string; // e.g., <T extends Foo>
  extends?: string | string[]; // super / base classes
  extendsRef?: RefLink; // 简化：整体链接
  implements?: string | string[]; // interfaces / protocols
  implementsRefs?: RefLink[]; // 可选：对应多个实现接口
  modifiersBefore?: string[]; // public / static / final / abstract
  modifiersAfter?: string[]; // e.g., where T:class
  signatureOverride?: string; // 自定义声明
  headerBadges?: string[];
  declaredIn?: string;
  children?: React.ReactNode; // 放大段描述或嵌套成员组件
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

function join<T>(value?: T | T[], sep = ", ") {
  if (!value) return "";
  return Array.isArray(value) ? value.join(sep) : String(value);
}

export default function ApiClass(props: ApiClassProps) {
  const {
    language = "ts",
    name,
    kind = "class",
    generics,
    extends: base,
    implements: impl,
    modifiersBefore,
    modifiersAfter,
    signatureOverride,
    headerBadges,
    declaredIn,
    children,
    deprecated,
  } = props;

  const extendsTxt = join(base);
  const implTxt = join(impl);

  const signature = signatureOverride
    || (() => {
      switch (language) {
        case "oc": {
          // Objective-C: @interface Name : Super <Protocols>
          const basePart = extendsTxt ? ` : ${extendsTxt}` : "";
          const protoPart = implTxt ? ` <${implTxt}>` : "";
          return `@interface ${name}${basePart}${protoPart}`;
        }
        case "java": {
          const basePart = extendsTxt ? ` extends ${extendsTxt}` : "";
          const implPart = implTxt ? ` implements ${implTxt}` : "";
          return `${(modifiersBefore || []).join(" ")} class ${name}${generics || ""}${basePart}${implPart}`.trim();
        }
        case "cs": {
          const basePart = [extendsTxt, implTxt].filter(Boolean).join(", ");
          return `${(modifiersBefore || []).join(" ")} class ${name}${generics || ""}${basePart ? ` : ${basePart}` : ""}`.trim();
        }
        case "cpp": {
          const basePart = extendsTxt ? ` : ${extendsTxt}` : ""; // 由上层传入 public Foo, virtual Bar
          return `${kind} ${name}${generics || ""}${basePart}`;
        }
        case "dart": {
          const basePart = extendsTxt ? ` extends ${extendsTxt}` : "";
          const implPart = implTxt ? ` implements ${implTxt}` : "";
          return `${(modifiersBefore || []).join(" ")} class ${name}${generics || ""}${basePart}${implPart}`.trim();
        }
        case "ts":
        case "js":
        default: {
          const basePart = extendsTxt ? ` extends ${extendsTxt}` : "";
          const implPart = implTxt ? ` implements ${implTxt}` : "";
          return `${(modifiersBefore || []).join(" ")} class ${name}${generics || ""}${basePart}${implPart}`.trim();
        }
      }
    })();

  const anchorId = props.id || buildAnchorId("class", { name });
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
            }}>
              #
            </button>
          )}
          {copied && <span style={{ fontSize: 12, color: "var(--ifm-color-success)" }}>Copied</span>}
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {!!props.deprecated && <span style={{ fontSize: 12, background: "var(--ifm-color-danger-contrast-background)", color: "var(--ifm-color-danger)", padding: "2px 6px", borderRadius: 6 }}>Deprecated</span>}
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
        {declaredIn && (
          <div style={{ marginBottom: 6, color: "var(--docuo-language-btn-color)" }}>Declared in {declaredIn}</div>
        )}
        {!!props.deprecated && <div style={{ marginBottom: 6, color: "var(--ifm-color-danger)" }}>{props.deprecated}</div>}
        <div style={{ ...codeStyle, margin: 0 }}>
          {renderModifierTokens(modifiersBefore)} {kind} <span style={{ fontWeight: 600 }}>{name}</span>{generics || ""}
          {(() => {
            const basePart = (props.extendsRef && (props.extends || "")) ? (
              <> extends <a href={buildHref(props.extendsRef)}><code>{String(props.extends)}</code></a></>
            ) : (props.extends ? <> extends <code>{String(props.extends)}</code></> : null);
            const implPart = (props.implementsRefs && props.implements && Array.isArray(props.implements)) ? (
              <> implements {(props.implements as string[]).map((it, idx) => (
                <span key={idx}>
                  {idx>0 ? ", " : ""}
                  {props.implementsRefs?.[idx] ? <a href={buildHref(props.implementsRefs[idx])}><code>{it}</code></a> : <code>{it}</code>}
                </span>
              ))}</>
            ) : (props.implements ? <> implements <code>{String(props.implements)}</code></> : null);
            return <>{basePart}{implPart}</>;
          })()}
          {" "}{(modifiersAfter||[]).length>0 ? renderModifierTokens(modifiersAfter) : null}
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


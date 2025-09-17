import React from "react";
import { RefLink, buildAnchorId, buildHref, copyAnchorToClipboard, useAnchorEffect } from "./anchor";

export type LanguageKey =
  | "oc" // Objective-C
  | "java"
  | "cpp"
  | "c"
  | "cs"
  | "dart"
  | "js"
  | "ts";

export interface ApiParam {
  name: string;
  type?: string;
  typeRef?: RefLink; // 可跳转到类型定义
  desc?: string;
  optional?: boolean;
  defaultValue?: string;
  nullable?: boolean;
  modifiersBefore?: string[]; // e.g., const
  modifiersAfter?: string[]; // e.g., ? extends
}

export interface ApiReturn {
  type?: string;
  typeRef?: RefLink;
  desc?: string;
}

export interface ApiMethodProps {
  language: LanguageKey;
  name: string; // method name (generic)
  belongClass?: string; // class/struct
  modifiersBefore?: string[]; // e.g., public, static
  modifiersAfter?: string[]; // e.g., async, noexcept
  generics?: string; // raw generic text like <T extends Foo>
  params?: ApiParam[];
  returns?: ApiReturn;
  throws?: string[];
  // For languages with special syntax (e.g., Objective‑C), allow raw signature override
  signatureOverride?: string;
  headerBadges?: string[]; // badges to show on the top right
  notes?: string[]; // bullet notes under the signature
  declaredIn?: string; // file/class info
  children?: React.ReactNode; // 大段描述/详情
  deprecated?: string; // 弃用说明
  id?: string; // 自定义锚点
  showLinkIcon?: boolean;
  seeAlsoRefs?: RefLink[];
  deprecatedReplacementRef?: RefLink;
}

const codeStyle: React.CSSProperties = {
  fontFamily:
    "SFMono-Regular,Consolas,Liberation Mono,Menlo,Monaco,monospace",
  fontSize: 14,
};

function joinNonEmpty(list?: (string | undefined)[], sep = " ") {
  return (list || []).filter(Boolean).join(sep);
}

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

function renderParams(params: ApiParam[] | undefined, lang: LanguageKey) {
  if (!params || params.length === 0) return "";
  const mapped = params.map((p) => {
    const opt = p.optional ? "?" : "";
    const nul = p.nullable ? (lang === "ts" || lang === "dart" ? "?" : "") : "";
    switch (lang) {
      case "java":
      case "cs":
      case "c":
      case "cpp":
        return joinNonEmpty([p.type, p.name]);
      case "js":
      case "ts":
        return `${p.name}${opt}: ${p.type || "any"}`;
      case "dart":
        return `${p.type || "dynamic"} ${p.name}${nul}`;
      case "oc":
        // OC 复杂，这里仅用于 signatureOverride 缺省时的简化格式
        return `(${p.type || "id"})${p.name}`;
      default:
        return `${p.name}`;
    }
  });
  return mapped.join(", ");
}

function renderSignatureInline(props: ApiMethodProps): React.ReactNode {
  const { language, name, params = [], returns, generics, modifiersBefore, modifiersAfter, signatureOverride } = props;
  const before = renderModifierTokens(modifiersBefore);
  const after = renderModifierTokens(modifiersAfter);

  if (signatureOverride) {
    return (
      <div style={{ ...codeStyle, whiteSpace: "pre-wrap" }}>
        {before} <span>{signatureOverride}</span> {after}
      </div>
    );
  }

  const comma = (i: number, len: number) => (i < len - 1 ? <span key={`comma-${i}`}>, </span> : null);

  switch (language) {
    case "java":
    case "cs": {
      return (
        <div style={{ ...codeStyle, whiteSpace: "pre-wrap" }}>
          {before}
          {" "}
          <span>
            <span>{returns?.type || "void"}</span>{" "}
            <span>{name}</span>
            {generics && <span>{generics}</span>}
            <span>(
              {params.map((p, i) => (
                <React.Fragment key={p.name}>
                  {p.typeRef ? <a href={buildHref(p.typeRef)}><code>{p.type}</code></a> : <code>{p.type}</code>}
                  {" "}{p.name}
                  {comma(i, params.length)}
                </React.Fragment>
              ))}
            )</span>
          </span>
          {" "}
          {after}
        </div>
      );
    }
    case "c":
    case "cpp": {
      return (
        <div style={{ ...codeStyle, whiteSpace: "pre-wrap" }}>
          {before}{" "}
          <span>{returns?.type || "void"}</span>{" "}
          <span>{name}</span>
          <span>(
            {params.map((p, i) => (
              <React.Fragment key={p.name}>
                {p.typeRef ? <a href={buildHref(p.typeRef)}><code>{p.type}</code></a> : <code>{p.type}</code>}
                {" "}{p.name}
                {comma(i, params.length)}
              </React.Fragment>
            ))}
          )</span>
          {" "}{after}
        </div>
      );
    }
    case "ts":
    case "js": {
      return (
        <div style={{ ...codeStyle, whiteSpace: "pre-wrap" }}>
          {before}{" "}
          <span>{name}</span>
          {generics && <span>{generics}</span>}
          <span>(
            {params.map((p, i) => (
              <React.Fragment key={p.name}>
                <span>{p.name}</span>
                {": "}
                {p.typeRef ? <a href={buildHref(p.typeRef)}><code>{p.type || "any"}</code></a> : <code>{p.type || "any"}</code>}
                {comma(i, params.length)}
              </React.Fragment>
            ))}
          )</span>
          {returns?.type && (
            <>
              {": "}
              {returns.typeRef ? <a href={buildHref(returns.typeRef)}><code>{returns.type}</code></a> : <code>{returns.type}</code>}
            </>
          )}
          {" "}{after}
        </div>
      );
    }
    case "dart": {
      return (
        <div style={{ ...codeStyle, whiteSpace: "pre-wrap" }}>
          {before}{" "}
          <span>{returns?.type || "void"}</span>{" "}
          <span>{name}</span>
          <span>(
            {params.map((p, i) => (
              <React.Fragment key={p.name}>
                {p.typeRef ? <a href={buildHref(p.typeRef)}><code>{p.type || "dynamic"}</code></a> : <code>{p.type || "dynamic"}</code>}
                {" "}{p.name}
                {comma(i, params.length)}
              </React.Fragment>
            ))}
          )</span>
          {" "}{after}
        </div>
      );
    }
    case "oc":
    default:
      return (
        <div style={{ ...codeStyle, whiteSpace: "pre-wrap" }}>
          {before}{" "}
          <span>{defaultSignature(props)}</span>
          {" "}{after}
        </div>
      );
  }
}

function defaultSignature(props: ApiMethodProps) {
  const { language, name, params = [], returns, generics, modifiersBefore, modifiersAfter } = props;
  const paramStr = renderParams(params, language);
  switch (language) {
    case "java":
    case "cs":
      return joinNonEmpty([
        joinNonEmpty(modifiersBefore),
        returns?.type || "void",
        `${name}${generics || ""}(${paramStr})`,
        joinNonEmpty(modifiersAfter),
      ]);
    case "c":
    case "cpp":
      return joinNonEmpty([
        joinNonEmpty(modifiersBefore),
        returns?.type || "void",
        `${name}(${paramStr})`,
        joinNonEmpty(modifiersAfter),
      ]);
    case "ts":
    case "js":
      return joinNonEmpty([
        joinNonEmpty(modifiersBefore),
        `${name}${generics || ""}(${paramStr})${returns?.type ? `: ${returns.type}` : ""}`,
        joinNonEmpty(modifiersAfter),
      ]);
    case "dart":
      return joinNonEmpty([
        joinNonEmpty(modifiersBefore),
        returns?.type || "void",
        `${name}${generics || ""}(${paramStr})`,
        joinNonEmpty(modifiersAfter),
      ]);
    case "oc":
      // Fallback 简化写法，推荐传入 signatureOverride
      return `${returns?.type ? `- (${returns.type})` : "-"} ${name}:${paramStr}`;
    default:
      return `${name}(${paramStr})`;
  }
}

function autoId(props: ApiMethodProps) {
  try {
    const scope = props.belongClass || "";
    return props.id || buildAnchorId("method", { scope, name: props.name });
  } catch {
    return props.id || buildAnchorId("method", { scope: props.belongClass || "", name: props.name });
  }
}

export default function ApiMethod(props: ApiMethodProps) {
  const {
    language,
    name,
    belongClass,
    params,
    returns,
    throws,
    headerBadges,
    notes,
    declaredIn,
    children,
    deprecated,
  } = props;

  // Debug log for quick client-side verification
  if (typeof window !== "undefined") {
    console.log("[ApiMethod] render", { language, name, belongClass });
  }

  const anchorId = autoId(props);
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
        <div style={{ fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
          <span>{name}</span>
          {props.showLinkIcon !== false && (
            <button aria-label="copy-anchor" onClick={() => { copyAnchorToClipboard(anchorId); setCopied(true); setTimeout(() => setCopied(false), 1200); }} style={{ cursor: "pointer", border: "none", background: "transparent", color: "var(--docuo-language-btn-color)", opacity: (hover || copied) ? 1 : 0 }}>
              #
            </button>
          )}
          {copied && <span style={{ fontSize: 12, color: "var(--ifm-color-success)" }}>Copied</span>}
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {!!deprecated && (
            <span style={{ fontSize: 12, background: "var(--ifm-color-danger-contrast-background)", color: "var(--ifm-color-danger)", padding: "2px 6px", borderRadius: 6 }}>Deprecated</span>
          )}
          {headerBadges?.map((b) => (
            <span key={b} style={{
              fontSize: 12, background: "var(--docuo-table-th-bg)", color: "var(--docuo-color-primary-active)", padding: "2px 6px", borderRadius: 6,
            }}>{b}</span>
          ))}
          <button aria-label="collapse-toggle" onClick={() => setCollapsed(v => !v)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--docuo-language-btn-color)", display: "flex", alignItems: "center" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" style={{ transform: collapsed ? "rotate(-90deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}>
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      <div style={{ padding: "12px 16px", borderTop: "1px solid var(--docuo-table-border)", display: collapsed ? "none" : "block" }}>
        {belongClass && (
          <div style={{ marginBottom: 6, color: "var(--docuo-language-btn-color)" }}>Declared in {belongClass}{declaredIn ? ` · ${declaredIn}` : ""}</div>
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
        {renderSignatureInline(props)}

        {children && (
          <div style={{ marginTop: 10 }}>
            <div style={{ fontWeight: 600, marginBottom: 6 }}>描述</div>
            <div>{children}</div>
          </div>
        )}

        {notes && notes.length > 0 && (
          <ul style={{ marginTop: 10, paddingLeft: 18 }}>
            {notes.map((n, i) => (
              <li key={i} style={{ color: "var(--docuo-text-color)" }}>{n}</li>
            ))}
          </ul>
        )}

        {params && params.length > 0 && (
          <div style={{ marginTop: 12 }}>
            <div style={{ fontWeight: 600, marginBottom: 6 }}>参数</div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", padding: "6px" }}>名称</th>
                  <th style={{ textAlign: "left", padding: "6px" }}>类型</th>
                  <th style={{ textAlign: "left", padding: "6px" }}>说明</th>
                </tr>
              </thead>
              <tbody>
                {params.map((p) => (
                  <tr key={p.name}>
                    <td style={{ padding: "6px", borderTop: "1px solid var(--docuo-table-border)" }}>{p.name}</td>
                    <td style={{ padding: "6px", borderTop: "1px solid var(--docuo-table-border)", ...codeStyle }}>
                      {p.typeRef ? <a href={buildHref(p.typeRef)}>{p.type || "type"}</a> : p.type}
                    </td>
                    <td style={{ padding: "6px", borderTop: "1px solid var(--docuo-table-border)" }}>{p.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {returns && (returns.type || returns.desc) && (
          <div style={{ marginTop: 12 }}>
            <div style={{ fontWeight: 600, marginBottom: 6 }}>返回值</div>
            <div>
              {returns.type && (
                returns.typeRef ? <a href={buildHref(returns.typeRef)}><code style={codeStyle}>{returns.type}</code></a> : <code style={codeStyle}>{returns.type}</code>
              )} {returns.desc}
            </div>
          </div>
        )}

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

        {throws && throws.length > 0 && (
          <div style={{ marginTop: 12 }}>
            <div style={{ fontWeight: 600, marginBottom: 6 }}>异常</div>
            <ul style={{ paddingLeft: 18 }}>
              {throws.map((t) => (
                <li key={t} style={{ color: "var(--docuo-text-color)" }}><code style={codeStyle}>{t}</code></li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}


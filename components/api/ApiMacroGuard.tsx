import React from "react";

export interface ApiMacroGuardProps {
  tag?: string; // e.g., "Engine · Init"
  preffix?: string; // e.g., "#if TARGET_OS_IPHONE"
  suffix?: string; // e.g., "#endif"
  children?: React.ReactNode; // 包裹目标声明
}

const codeStyle: React.CSSProperties = {
  fontFamily:
    "SFMono-Regular,Consolas,Liberation Mono,Menlo,Monaco,monospace",
  fontSize: 14,
};

export default function ApiMacroGuard(props: ApiMacroGuardProps) {
  const { tag, preffix, suffix, children } = props;
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <div style={{ border: "1px dashed var(--docuo-table-border)", borderRadius: 8, margin: "16px 0" }}>
      <div style={{ padding: "8px 12px", background: "var(--docuo-table-th-bg)", borderTopLeftRadius: 8, borderTopRightRadius: 8, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontWeight: 600 }}>编译宏</div>
        <button aria-label="collapse-toggle" onClick={() => setCollapsed(v => !v)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--docuo-language-btn-color)", display: "flex", alignItems: "center" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" style={{ transform: collapsed ? "rotate(-90deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}>
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      <div style={{ padding: 12, display: collapsed ? "none" : "block" }}>
        {tag && (
          <pre style={{ ...codeStyle, margin: 0 }}>{`#pragma mark ${tag}`}</pre>
        )}
        {preffix && (
          <pre style={{ ...codeStyle, margin: 0 }}>{preffix}</pre>
        )}
        <div style={{ margin: "8px 0" }}>{children}</div>
        {suffix && (
          <pre style={{ ...codeStyle, margin: 0 }}>{suffix}</pre>
        )}
      </div>
    </div>
  );
}


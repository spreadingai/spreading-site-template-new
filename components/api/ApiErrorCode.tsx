import React from "react";
import ApiSection from "./ApiSection";

export interface ApiErrorCodeItem {
  code: number | string;
  name?: string;
  desc?: string;
}

export interface ApiErrorCodeProps {
  title?: string;
  items: ApiErrorCodeItem[];
  children?: React.ReactNode; // 复杂描述
}

export default function ApiErrorCode(props: ApiErrorCodeProps) {
  const { title = "错误码", items, children } = props;
  return (
    <ApiSection title={title}>
      {children && <div style={{ marginBottom: 8 }}>{children}</div>}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left", padding: 6 }}>Code</th>
            <th style={{ textAlign: "left", padding: 6 }}>Name</th>
            <th style={{ textAlign: "left", padding: 6 }}>Description</th>
          </tr>
        </thead>
        <tbody>
          {items.map((x, i) => (
            <tr key={i}>
              <td style={{ padding: 6, borderTop: "1px solid var(--docuo-table-border)" }}>{x.code}</td>
              <td style={{ padding: 6, borderTop: "1px solid var(--docuo-table-border)" }}>{x.name}</td>
              <td style={{ padding: 6, borderTop: "1px solid var(--docuo-table-border)" }}>{x.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </ApiSection>
  );
}


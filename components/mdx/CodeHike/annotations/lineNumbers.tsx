import React from "react";
import { AnnotationHandler, InnerLine } from "codehike/code";

export const lineNumbers: AnnotationHandler = {
  name: "line-numbers",
  Line: function(props) {
    // 计算最大行号的宽度，确保有足够空间显示所有行号
    const maxLineNumberWidth = props.totalLines.toString().length;
    // 使用固定宽度而不是最小宽度，确保对齐一致性
    const width = `${maxLineNumberWidth}ch`;

    return React.createElement(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "flex-start",
          border: "none",
          outline: "none",
          background: "transparent"
        }
      },
      React.createElement(
        "span",
        {
          style: {
            width: width, // 使用固定宽度而不是minWidth
            paddingRight: "16px",
            textAlign: "right",
            color: "rgba(255, 255, 255, 0.4)",
            fontSize: "14px",
            lineHeight: "1.5",
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, 'Cascadia Code', 'Segoe UI Mono', 'Roboto Mono', 'Oxygen Mono', 'Ubuntu Monospace', 'Source Code Pro', 'Fira Code', 'Droid Sans Mono', 'Courier New', monospace",
            userSelect: "none",
            flexShrink: 0,
            border: "none",
            outline: "none",
            background: "transparent",
            // 确保数字右对齐显示
            display: "inline-block"
          }
        },
        props.lineNumber
      ),
      React.createElement(InnerLine, {
        merge: props,
        style: {
          flex: 1,
          minWidth: 0,
          border: "none",
          outline: "none",
          background: "transparent"
        }
      })
    );
  },
};

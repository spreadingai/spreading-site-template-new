import React from "react";
import { AnnotationHandler, InnerLine } from "codehike/code";
import styles from "../Code.module.scss";

export const mark: AnnotationHandler = {
  name: "mark",
  Line: function({ annotation, ...props }) {
    const color = annotation?.query || "rgb(14 165 233)";
    
    // 根据颜色选择CSS类
    const getColorClass = (colorName: string) => {
      const classMap: { [key: string]: string } = {
        "gold": styles.markLineGold,
        "pink": styles.markLinePink,
        "red": styles.markLineRed,
        "blue": styles.markLineBlue,
        "green": styles.markLineGreen,
        "purple": styles.markLinePurple,
        "orange": styles.markLineOrange,
        "yellow": styles.markLineYellow,
      };
      return classMap[colorName.toLowerCase()] || styles.markLineBlue;
    };
    
    const colorClass = annotation ? getColorClass(color) : styles.markLineDefault;
    const className = `${styles.markLine} ${colorClass}`;

    return React.createElement(
      "div",
      {
        className
      },
      React.createElement(InnerLine, {
        merge: props,
        style: { flex: "1", minWidth: 0 }
      })
    );
  },
  Inline: function({ annotation, children }) {
    const color = annotation?.query || "rgb(14 165 233)";

    // 解析颜色名称到RGB值
    const getColorValue = (colorName: string) => {
      const colorMap: { [key: string]: string } = {
        "gold": "rgb(255 215 0)",
        "pink": "rgb(255 192 203)",
        "red": "rgb(239 68 68)",
        "blue": "rgb(59 130 246)",
        "green": "rgb(34 197 94)",
        "purple": "rgb(168 85 247)",
        "orange": "rgb(249 115 22)",
        "yellow": "rgb(234 179 8)",
      };
      return colorMap[colorName.toLowerCase()] || colorName;
    };

    const resolvedColor = getColorValue(color);

    return React.createElement(
      "span",
      {
        style: {
          outline: `solid 2px ${resolvedColor}`,
          background: `${resolvedColor.replace("rgb(", "rgba(").replace(")", ", 0.2)")}`,
          borderRadius: "3px",
          padding: "1px 4px",
          margin: "0 1px"
        }
      },
      children
    );
  },
};

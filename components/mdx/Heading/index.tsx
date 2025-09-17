import React from "react";
import { HeadingProps } from "@/types/mdx";
const levels = [1, 2, 3, 4, 5, 6];

export const Heading = (props: HeadingProps) => {
  const { level: oldLevel, children, id, style, className } = props;
  const level = levels.includes(Number(oldLevel)) ? oldLevel : levels[0];
  const Tag = `h${level}`;
  return (
    // @ts-ignore
    <Tag id={id} style={style || null} className={`${className || ""}`}>
      {children}
    </Tag>
  );
};

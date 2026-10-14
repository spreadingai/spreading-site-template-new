import React from "react";
import { HeadingProps } from "@/types/mdx";
import { LastUpdated, useLastUpdatedDate } from "../LastUpdated";
const levels = [1, 2, 3, 4, 5, 6];

export const Heading = (props: HeadingProps & React.HTMLAttributes<HTMLHeadingElement>) => {
  const { level: oldLevel, children, id, style, className, ...rest } = props;
  const level = levels.includes(Number(oldLevel)) ? Number(oldLevel) : levels[0];
  const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  const date = useLastUpdatedDate();
  return (
    <>
      <Tag {...rest} id={id} style={style || null} className={`${className || ""}`}>
        {children}
      </Tag>
      {level === 1 && date && <LastUpdated date={date} />}
    </>
  );
};

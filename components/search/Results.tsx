import React from "react";
import { Snippet } from "./Snippet";
import type { InternalDocSearchHit } from "./types";

export function Result({ item, renderIcon, renderAction, hitComponent }) {
  const Hit = hitComponent!;

  return (
    <div
      className={[
        "DocSearch-Hit",
        (item as unknown as InternalDocSearchHit).__docsearch_parent &&
          "DocSearch-Hit--Child",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Hit hit={item}>
        <div className="DocSearch-Hit-Container">
          {renderIcon({ item })}

          {item.hierarchy[item.type] && item.type === "lvl1" && (
            <div className="DocSearch-Hit-content-wrapper">
              <Snippet
                className="DocSearch-Hit-title"
                hit={item}
                attribute="hierarchy.lvl1"
              />
              {item.content && (
                <Snippet
                  className="DocSearch-Hit-path"
                  hit={item}
                  attribute="content"
                />
              )}
              {!item.content && (
                <span className="DocSearch-Hit-path">
                  {item.hierarchy.lvl0}
                  {item.hierarchy.lvl1 ? " > " + item.hierarchy.lvl1 : ""}
                  {item.hierarchy.lvl2 ? " > " + item.hierarchy.lvl2 : ""}
                  {item.hierarchy.lvl3 ? " > " + item.hierarchy.lvl3 : ""}
                  {item.hierarchy.lvl4 ? " > " + item.hierarchy.lvl4 : ""}
                  {item.hierarchy.lvl5 ? " > " + item.hierarchy.lvl5 : ""}
                  {item.hierarchy.lvl6 ? " > " + item.hierarchy.lvl6 : ""}
                </span>
              )}
            </div>
          )}

          {item.hierarchy[item.type] &&
            (item.type === "lvl2" ||
              item.type === "lvl3" ||
              item.type === "lvl4" ||
              item.type === "lvl5" ||
              item.type === "lvl6") && (
              <div className="DocSearch-Hit-content-wrapper">
                <Snippet
                  className="DocSearch-Hit-title"
                  hit={item}
                  attribute={`hierarchy.${item.type}`}
                />
                <Snippet
                  className="DocSearch-Hit-path"
                  hit={item}
                  attribute="hierarchy.lvl1"
                />
              </div>
            )}

          {item.type === "content" && (
            <div className="DocSearch-Hit-content-wrapper">
              <Snippet
                className="DocSearch-Hit-title"
                hit={item}
                attribute="content"
              />
              <Snippet
                className="DocSearch-Hit-path"
                hit={item}
                attribute="hierarchy.lvl1"
              />
            </div>
          )}

          {renderAction({ item })}
        </div>
      </Hit>
    </div>
  );
}

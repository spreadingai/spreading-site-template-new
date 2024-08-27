import { createElement } from "react";

import type { StoredDocSearchHit } from "./types";

function getPropertyByPath(object: Record<string, any>, path: string): any {
  const parts = path.split(".");

  return parts.reduce((prev, current) => {
    if (prev?.[current]) return prev[current];
    return null;
  }, object);
}

interface SnippetProps<TItem> {
  hit: TItem;
  attribute: string;
  tagName?: string;
  [prop: string]: unknown;
}

export function Snippet<TItem extends StoredDocSearchHit>({
  hit,
  attribute,
  tagName = "span",
  ...rest
}: SnippetProps<TItem>) {
  return createElement(tagName, {
    ...rest,
    dangerouslySetInnerHTML: {
      __html:
        attribute === "hierarchy.lvl1" &&
        rest.className === "DocSearch-Hit-path"
          ? hit.hierarchy.lvl0 +
            (hit.hierarchy.lvl1 ? " > " + hit.hierarchy.lvl1 : "") +
            (hit.hierarchy.lvl2 ? " > " + hit.hierarchy.lvl2 : "") +
            (hit.hierarchy.lvl3 ? " > " + hit.hierarchy.lvl3 : "") +
            (hit.hierarchy.lvl4 ? " > " + hit.hierarchy.lvl4 : "") +
            (hit.hierarchy.lvl5 ? " > " + hit.hierarchy.lvl5 : "") +
            (hit.hierarchy.lvl6 ? " > " + hit.hierarchy.lvl6 : "")
          : "" +
            (getPropertyByPath(hit, `_snippetResult.${attribute}.value`) ||
              getPropertyByPath(hit, attribute)),
    },
  });
}

import React from "react";

interface CustomHitType {
  url: string;
  type:
    | "lvl0"
    | "lvl1"
    | "lvl2"
    | "lvl3"
    | "lvl4"
    | "lvl5"
    | "lvl6"
    | "content";
  hierarchy: {
    lvl0: string | null;
    lvl1: string | null;
    lvl2: string | null;
    lvl3: string | null;
    lvl4: string | null;
    lvl5: string | null;
    lvl6: string | null;
  };
  _snippetResult: {
    content: { value: string; matchLevel?: string };
    hierarchy: {
      lvl0?: { value: string; matchedWords: string[] };
      lvl1?: { value: string; matchedWords: string[] };
      lvl2?: { value: string; matchedWords: string[] };
      lvl3?: { value: string; matchedWords: string[] };
      lvl4?: { value: string; matchedWords: string[] };
      lvl5?: { value: string; matchedWords: string[] };
      lvl6?: { value: string; matchedWords: string[] };
    };
  };
  _highlightResult: {
    content: { value: string; matchLevel?: string };
    hierarchy: {
      lvl0?: { value: string; matchedWords: string[] };
      lvl1?: { value: string; matchedWords: string[] };
      lvl2?: { value: string; matchedWords: string[] };
      lvl3?: { value: string; matchedWords: string[] };
      lvl4?: { value: string; matchedWords: string[] };
      lvl5?: { value: string; matchedWords: string[] };
      lvl6?: { value: string; matchedWords: string[] };
    };
  };
}

const NewCustomHit = ({ hit }: { hit: CustomHitType }) => {
  const { type, _highlightResult, _snippetResult } = hit;
  let titleHtmlStr = "",
    pathHtmlStr = "";
  if (type === "content") {
    const { content } = _snippetResult;
    const { matchLevel, value } = content;
    titleHtmlStr =
      matchLevel !== "none" ? value : _highlightResult.content.value;
  } else {
    const level = Number(type.split("lvl")[1]);
    if (level === 0) {
      titleHtmlStr = _highlightResult.hierarchy[`lvl0`].value;
    } else {
      titleHtmlStr = _highlightResult.hierarchy[type].value;
      for (let index = level; index >= 0; index--) {
        const temp = _highlightResult.hierarchy[`lvl${index}`];
        if (temp && temp.matchedWords.length) {
          titleHtmlStr = _highlightResult.hierarchy[`lvl${index}`].value;
          break;
        }
      }
    }
  }
  const hierarchyKeys = Object.keys(_highlightResult.hierarchy);
  hierarchyKeys.forEach((hierarchyKey, index) => {
    pathHtmlStr += `${_highlightResult.hierarchy[hierarchyKey].value}${
      index !== hierarchyKeys.length - 1 ? " > " : ""
    }`;
  });
  return (
    <>
      <section className="DocSearch-Hits">
        {/* <div className="DocSearch-Hit-source" style={{ zIndex: "unset" }}></div> */}
        <ul role="listbox">
          <li className={`DocSearch-Hit`} role="option" aria-selected="false">
            <a href={hit.url} target="_blank">
              <div className="DocSearch-Hit-Container">
                <div className="DocSearch-Hit-icon">
                  <svg width="20" height="20" viewBox="0 0 20 20">
                    <path
                      d="M13 13h4-4V8H7v5h6v4-4H7V8H3h4V3v5h6V3v5h4-4v5zm-6 0v4-4H3h4z"
                      stroke="currentColor"
                      fill="none"
                      fill-rule="evenodd"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </div>
                <div className="DocSearch-Hit-content-wrapper">
                  <span
                    className={`DocSearch-Hit-title`}
                    dangerouslySetInnerHTML={{
                      __html: titleHtmlStr,
                    }}
                  ></span>
                  <span
                    className={`DocSearch-Hit-path`}
                    dangerouslySetInnerHTML={{
                      __html: pathHtmlStr,
                    }}
                  ></span>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </section>
    </>
  );
};

export default NewCustomHit;

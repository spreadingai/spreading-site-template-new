import { SEQUENCE_PREFIX_REGEX } from "./constants";

export const convertDocID = (str: string) => {
  // Quick Start, Quick-Start
  // Quick start, Quick-start
  // Quick start/Overview
  let sp = "/";
  if (process.platform.includes("win")) {
    str = str.replace(/\\/g, "/");
  }
  const result = [];
  const temp = str.split(sp);
  temp.forEach((path) => {
    result.push(path.toLowerCase().replace(/\s+/g, "-"));
  });
  return result.join(sp);
};

export const ignoreNumberPrefix = (str: string) => {
  const arr = str.split("/");
  if (arr.length === 1) {
    return str.replace(SEQUENCE_PREFIX_REGEX, "");
  } else {
    return arr.map((item) => item.replace(SEQUENCE_PREFIX_REGEX, "")).join("/");
  }
};

export const removeMdxSuffix = (str: string) => {
  let result = str;
  const suffixIndex = str.lastIndexOf(".");
  if (suffixIndex !== -1) {
    const suffix = str.slice(suffixIndex + 1);
    (suffix.toLowerCase() === "mdx" || suffix.toLowerCase() === "md") &&
      (result = result.slice(0, suffixIndex));
  }
  return result;
};

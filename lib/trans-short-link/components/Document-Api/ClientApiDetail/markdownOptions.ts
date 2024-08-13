import { paramCase } from "change-case";

export const paramCaseId = (raw: string, overloadFlag = "") => {
  let res = paramCase(raw) || raw;
  if (overloadFlag) {
    res = res + "-" + overloadFlag;
  }
  return res;
};

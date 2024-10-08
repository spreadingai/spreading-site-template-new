import { DataUtil } from "../assets/js/util/dataUtil";
import { replaceDomainOldToNew } from "./replaceDomain";

export const getMainDomain = () => {
  let baseUrl = "";

  const dataEnv = (process.env.DATA_ENV as string) || "";
  if (dataEnv.includes("test")) {
    baseUrl =
      DataUtil.locale === "zh"
        ? "https://doc-preview-test-zh.zego.im"
        : "https://doc-preview-test-en.zego.im";

    if (!dataEnv.includes("preview")) {
      baseUrl =
        DataUtil.locale === "zh"
          ? "https://doc-test-zh.zego.im"
          : "https://doc-test-en.zego.im";
    }
  } else if (dataEnv.includes("preview")) {
    baseUrl =
      DataUtil.locale === "zh"
        ? "https://doc-preview-zh.zego.im"
        : "https://doc-preview-en.zegocloud.com";
  } else {
    baseUrl =
      DataUtil.locale === "zh"
        ? "https://doc-zh.zego.im"
        : "https://docs.zegocloud.com";
  }

  baseUrl = replaceDomainOldToNew(baseUrl);

  return baseUrl;
};

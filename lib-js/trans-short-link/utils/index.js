// 完整复制 lib/trans-short-link/utils/index.ts 的JavaScript版本

const { DataUtil } = require('../assets/js/util/dataUtil');
const { replaceDomainOldToNew } = require('./replaceDomain');

const getMainDomain = () => {
  let baseUrl = "";

  const dataEnv = process.env.DATA_ENV || "";
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

module.exports = {
  getMainDomain
};

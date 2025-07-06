import fs from "fs";
import path from "path";

// /Users/zego-lh/Documents/spreading-site-template-new
// console.log(path.resolve());

const _enLanguageKey = "en";
const _zhLanguageKey = "zh";

const getLocale = () => {
  let locale = _zhLanguageKey;
  if (process && process.env) {
    if (process.env.LOCALE) {
      locale = process.env.LOCALE;
    } else {
      if (typeof process.env.LANG === "string") {
        if (process.env.LANG.includes("zh_CN")) {
          locale = _zhLanguageKey;
        } else if (process.env.LANG.includes("en_US")) {
          locale = _enLanguageKey;
        }
      }
    }
  }
  console.log("[InitController] locale", locale);
  return locale;
};

const InitController = class {
  static serverBaseUrl =
    getLocale() === _enLanguageKey
      ? "https://docs.zegocloud.com"
      : "https://doc-zh.zego.im";
  static dataJsonUrl = "/api/doc/getMenuTree?type=tree";
  static commonJsonConfigUrl = "/api/common-json-config/query";
  static rootPath = "docs/external";
  static dataJsonPath = "menuTree.json";
  static commonJsonConfigPath = "commonJsonConfig.json";
  static async getJson(locale, method, jsonUrl, jsonPath, refresh = false) {
    const headers = locale
      ? {
          "Accept-Language": locale,
        }
      : undefined;
    const fetchFunc = async (method, jsonUrl) => {
      try {
        const res = await fetch(`${InitController.serverBaseUrl}${jsonUrl}`, {
          method,
          headers,
        });
        const jsonRes = await res.json();
        const text = JSON.stringify(jsonRes.data);
        return text;
      } catch (error) {
        console.error("[InitController] getJson", error);
        return "";
      }
    };
    const createExternalFolder = () => {
      const temp = path.resolve(InitController.rootPath);
      if (!fs.existsSync(temp)) {
        fs.mkdirSync(temp);
      }
    };
    const temp = path.resolve(InitController.rootPath, jsonPath);
    if (refresh) {
      const text = await fetchFunc(method, jsonUrl);
      if (!text) return "";
      createExternalFolder();
      fs.writeFileSync(temp, text, {
        encoding: "utf-8",
      });
      return text;
    } else {
      if (fs.existsSync(temp)) {
        const text = fs.readFileSync(temp, { encoding: "utf-8" });
        return text;
      } else {
        const text = await fetchFunc(method, jsonUrl);
        if (!text) return "";
        createExternalFolder();
        fs.writeFileSync(temp, text, {
          encoding: "utf-8",
        });
        return text;
      }
    }
  }
  static async getDataJson(locale, refresh = false) {
    console.log("[InitController]getDataJson", refresh);
    const text = await InitController.getJson(
      locale,
      "get",
      InitController.dataJsonUrl,
      `${locale}_${InitController.dataJsonPath}`,
      refresh
    );
    return text;
  }
  static async getCommonJsonConfig(refresh = false) {
    console.log("[InitController]getCommonJsonConfig", refresh);
    const text = await InitController.getJson(
      null,
      "post",
      InitController.commonJsonConfigUrl,
      InitController.commonJsonConfigPath,
      refresh
    );
    return text;
  }
};

console.time("count getInitData");
// 在开发模式下不强制刷新，使用缓存
const isDev = process.env.NODE_ENV === 'development';
const skipExternalFetch = process.env.SKIP_EXTERNAL_DATA_FETCH === 'true';

console.log("[InitController] Environment check:", { isDev, skipExternalFetch, NODE_ENV: process.env.NODE_ENV });

if (skipExternalFetch && isDev) {
  console.log("[InitController] Skipping external data fetch in development mode");
} else {
  InitController.getDataJson(_enLanguageKey, !isDev);
  InitController.getDataJson(_zhLanguageKey, !isDev);
  InitController.getCommonJsonConfig(!isDev);
}
console.timeEnd("count getInitData");

export default InitController;

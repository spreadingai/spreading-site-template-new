// 完整复制 lib/trans-short-link/init.mjs 的JavaScript版本

const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");
const url = require("url");

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
        const fullUrl = `${InitController.serverBaseUrl}${jsonUrl}`;
        console.log(`[InitController] Fetching: ${fullUrl}`);
        
        return new Promise((resolve, reject) => {
          const parsedUrl = url.parse(fullUrl);
          const client = parsedUrl.protocol === 'https:' ? https : http;
          
          const options = {
            hostname: parsedUrl.hostname,
            port: parsedUrl.port,
            path: parsedUrl.path,
            method: method.toUpperCase(),
            headers: {
              'User-Agent': 'Node.js',
              'Content-Type': 'application/json',
              ...headers
            }
          };
          
          const req = client.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => {
              data += chunk;
            });
            res.on('end', () => {
              try {
                const jsonRes = JSON.parse(data);
                const text = JSON.stringify(jsonRes.data);
                resolve(text);
              } catch (parseError) {
                console.error("[InitController] JSON parse error:", parseError);
                resolve("");
              }
            });
          });
          
          req.on('error', (error) => {
            console.error("[InitController] Request error:", error);
            resolve("");
          });
          
          req.end();
        });
      } catch (error) {
        console.error("[InitController] getJson", error);
        return "";
      }
    };
    
    const createExternalFolder = () => {
      const temp = path.resolve(InitController.rootPath);
      if (!fs.existsSync(temp)) {
        fs.mkdirSync(temp, { recursive: true });
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

// 初始化数据获取逻辑
const initializeData = async () => {
  console.time("count getInitData");
  
  // 在开发模式下不强制刷新，使用缓存
  const isDev = process.env.NODE_ENV === 'development';
  const skipExternalFetch = process.env.SKIP_EXTERNAL_DATA_FETCH === 'true';
  
  console.log("[InitController] Environment check:", { isDev, skipExternalFetch, NODE_ENV: process.env.NODE_ENV });
  
  if (skipExternalFetch && isDev) {
    console.log("[InitController] Skipping external data fetch in development mode");
  } else {
    try {
      await Promise.all([
        InitController.getDataJson(_enLanguageKey, !isDev),
        InitController.getDataJson(_zhLanguageKey, !isDev),
        InitController.getCommonJsonConfig(!isDev)
      ]);
    } catch (error) {
      console.error("[InitController] Failed to initialize data:", error);
    }
  }
  
  console.timeEnd("count getInitData");
};

// 如果直接运行此文件，则执行初始化
if (require.main === module) {
  initializeData().catch(error => {
    console.error('初始化失败:', error);
    process.exit(1);
  });
}

module.exports = {
  InitController,
  initializeData,
  getLocale,
  _enLanguageKey,
  _zhLanguageKey
};

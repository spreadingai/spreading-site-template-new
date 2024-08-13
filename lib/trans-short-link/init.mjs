import fs from "fs";
import path from "path";

// /Users/zego-lh/Documents/spreading-site-template-new
// console.log(path.resolve());

const InitController = class {
  static serverBaseUrl =
    process.env.LOCALE === "en"
      ? "https://docs.zegocloud.com"
      : "https://doc-zh.zego.im";
  static dataJsonUrl = "/api/doc/getMenuTree?type=tree";
  static commonJsonConfigUrl = "/api/common-json-config/query";
  static rootPath = "docs/external";
  static dataJsonPath = "menuTree.json";
  static commonJsonConfigPath = "commonJsonConfig.json";
  static async getJson(method, jsonUrl, jsonPath, refresh = false) {
    const fetchFunc = async (method, jsonUrl) => {
      const res = await fetch(`${InitController.serverBaseUrl}${jsonUrl}`, {
        method,
      });
      const jsonRes = await res.json();
      const text = JSON.stringify(jsonRes.data);
      return text;
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
        createExternalFolder();
        fs.writeFileSync(temp, text, {
          encoding: "utf-8",
        });
        return text;
      }
    }
  }
  static async getDataJson(refresh = false) {
    console.log("[InitController]getDataJson", refresh);
    const text = await InitController.getJson(
      "get",
      InitController.dataJsonUrl,
      InitController.dataJsonPath,
      refresh
    );
    return text;
  }
  static async getCommonJsonConfig(refresh = false) {
    console.log("[InitController]getCommonJsonConfig", refresh);
    const text = await InitController.getJson(
      "post",
      InitController.commonJsonConfigUrl,
      InitController.commonJsonConfigPath,
      refresh
    );
    return text;
  }
};

console.time("count getInitData");
InitController.getDataJson(true);
InitController.getCommonJsonConfig(true);
console.timeEnd("count getInitData");

export default InitController;

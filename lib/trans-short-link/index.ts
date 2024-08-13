import { DataUtil } from "./assets/js/util/dataUtil";
import { Menu } from "./types/Menu";
import InitController from "./init.mjs";
import {
  getClientRelatePathByPath,
  getMarkdownBaseUrl,
  filterSearchDataByLang,
  getUrlByPathList,
} from "./components/Document-Api/utils";
import { paramCaseId } from "./components/Document-Api/ClientApiDetail/markdownOptions";
import path from "path";
import fs from "fs";

class ShortLinkTransController {
  static _instance: ShortLinkTransController;
  static getInstance() {
    return (
      ShortLinkTransController._instance ||
      (ShortLinkTransController._instance = new ShortLinkTransController())
    );
  }
  _enLanguageKey = "en";
  _zhLanguageKey = "zh";
  _locale = this._zhLanguageKey;
  _serverBaseUrl = "https://doc-zh.zego.im";
  _menuData: Menu[];
  _configData: any;
  _clientApiData: any = {};
  _mdKeyIdMap: any = {};
  _shortLinkMap: any = {};
  injectData({ locale }: any) {
    if (locale) {
      this._locale = locale;
      this._serverBaseUrl =
        this._locale === this._enLanguageKey
          ? "https://docs.zegocloud.com"
          : "https://doc-zh.zego.im";
      DataUtil.setLocale(locale);
    }
  }
  getDataJson() {
    if (this._menuData) {
      return this._menuData;
    } else {
      const temp = path.resolve(
        InitController.rootPath,
        `${this._locale}_${InitController.dataJsonPath}`
      );
      const text = fs.readFileSync(temp, { encoding: "utf-8" });
      return (this._menuData = JSON.parse(text) as Menu[]);
    }
  }
  getCommonJsonConfig(keys: string[]) {
    if (this._configData) {
      return keys.reduce((obj, key) => {
        obj[key] = this._configData[key];
        return obj;
      }, {});
    } else {
      const temp = path.resolve(
        InitController.rootPath,
        InitController.commonJsonConfigPath
      );
      const text = fs.readFileSync(temp, { encoding: "utf-8" });
      const originConfigData = JSON.parse(text);
      const commonJsonConfig = originConfigData.reduce(
        (prev: any, curr: any) => {
          prev[curr.key] = curr.value;
          return prev;
        },
        {}
      );
      return (this._configData = commonJsonConfig);
    }
  }
  getArticleInfoByID(articleID: string | number) {
    const menuData = this.getDataJson();
    const articleInfo = DataUtil.getMenuById(Number(articleID), menuData);
    return articleInfo;
  }
  getArticleInfoByPath() {
    const menuData = this.getDataJson();
    const params = {
      product: "",
      docKey: "",
      platform: "",
      language: "",
    };
    const articleInfo = DataUtil.getMenuByPath(params, menuData);
    return articleInfo;
  }
  async fetchFunc(method, jsonUrl) {
    const res = await fetch(`${jsonUrl}`, {
      method,
    });
    const jsonRes = await res.json();
    const text = JSON.stringify(jsonRes);
    return text;
  }
  async getClientApiTreeData(url: string, refresh = false) {
    // url: https://doc-zh.zego.im/client-api/zim/zh/java_android/data.json
    const splitStr = url
      .split(`${this._serverBaseUrl}/client-api/`)[1]
      .split("/data.json")[0];
    const apiTreeDataPath = splitStr.split("/").join("_") + ".json";
    const temp = path.resolve(InitController.rootPath, apiTreeDataPath);
    if (refresh) {
      const text = await this.fetchFunc("get", url);
      fs.writeFileSync(temp, text, {
        encoding: "utf-8",
      });
      return JSON.parse(text);
    } else {
      if (fs.existsSync(temp)) {
        const text = fs.readFileSync(temp, { encoding: "utf-8" });
        return JSON.parse(text);
      } else {
        const text = await this.fetchFunc("get", url);
        fs.writeFileSync(temp, text, {
          encoding: "utf-8",
        });
        return JSON.parse(text);
      }
    }
  }
  updateClientApiData(playload: any) {
    if (playload.url) {
      this._clientApiData = {
        ...this._clientApiData,
        [playload.url]: playload.data,
      };
    }
  }
  async getClientApiData(apiPathData: any) {
    if (!apiPathData.language && !apiPathData.docId) return;
    const proConfig = this.getCommonJsonConfig([
      "crossPlatformLangMapZh",
      "crossPlatformLangMapEn",
      "clientApiProductsMapZh",
      "clientApiProductsMapEn",
    ]);
    const url = `${getMarkdownBaseUrl(apiPathData, proConfig)}data.json`;
    if (this._clientApiData[url] !== undefined) return this._clientApiData[url];
    let res: any = {};
    try {
      res = (await this.getClientApiTreeData(url)) || {};
    } catch (e) {
      console.error("getClientApiData url:", url, e);
    }
    if (res) {
      res = {
        searchData: res.searchData.map((item: any) => {
          const shortName = (item.compoundName || item.name)
            .split(".")
            .pop()
            .split(":")
            .pop();
          return {
            ...item,
            shortName,
            members: (item.members || []).map((x: any) => {
              const linkName = x.memberName || x.name;
              return {
                ...x,
                // linkName: x.link?.split("/")?.pop()?.split("#")[1],
                linkName,
              };
            }),
          };
        }),
        treeData: res.treeData,
        ...apiPathData,
        url,
      };
    }
    this.updateClientApiData({
      url,
      data: res || "",
    });
    return res;
  }
  async getAllApiTreeData(articleInfo: Menu) {
    const { commonApiPathNameDataZh, commonApiPathNameDataEn } =
      this.getCommonJsonConfig([
        "commonApiPathNameDataZh",
        "commonApiPathNameDataEn",
      ]);
    const pathMap =
      this._locale === this._enLanguageKey
        ? commonApiPathNameDataEn
        : commonApiPathNameDataZh;
    const path =
      getClientRelatePathByPath(
        articleInfo.path?.split("/")[0].replace(/_api$/i, ""),
        pathMap
      ) || "";
    const [platform = "", language = ""] = (articleInfo.name || "").split("_");
    const apiPathData = {
      sdkValue: path,
      platform,
      language,
    };
    if (path && typeof path === "string") {
      const clientApiData = await this.getClientApiData(apiPathData);
      return { ...clientApiData, platform };
    }

    if (path && Array.isArray(path)) {
      const resList = await Promise.all(
        path.map((item) => {
          return this.getClientApiData({
            ...apiPathData,
            sdkValue: item,
          });
        })
      );
      return resList
        .filter((x) => x)
        .reduce((pre, cur) => {
          const searchData = (cur.searchData || []).map((item) => ({
            ...item,
            sdkValue: cur.sdkValue,
          }));
          return {
            language,
            platform,
            searchData: [...(pre.searchData || []), ...searchData],
            url: [...(pre.url || []), cur.url],
            sdkValue: [...(pre.sdkValue || []), cur.sdkValue],
          };
        }, {});
    }
  }
  getClientApiMatchedLink(
    apiTreeData: any,
    { attr = "", name = "", kind = "" }
  ) {
    if (!apiTreeData) return "";
    // eslint-disable-next-line prefer-const
    let { searchData, language } = apiTreeData;
    if (!searchData) return "";
    searchData = filterSearchDataByLang(searchData, language);
    if (kind) {
      searchData = searchData.filter((item: any) => {
        const kind = item.compoundKind || item.kind;
        return kind === kind.toLowerCase();
      });
    }
    if (name) {
      searchData = searchData.filter((item: any) => item.shortName === name);
    }
    let realAttrName = attr;
    if (attr) {
      const [attrName, reloadHash] = attr.split("__");
      searchData = searchData.filter((item: any) => {
        return item.members.some((member) => {
          if (member.memberName.toLowerCase() === attrName.toLowerCase()) {
            realAttrName = reloadHash
              ? member.memberName + "-" + reloadHash
              : member.memberName;
            return true;
          }
          // 处理oc方法名里的:
          const memberName = (member.memberName || "").split(":")[0];
          // if (memberName.startsWith("onCa")) console.log(memberName, attr);
          if (memberName.toLowerCase() === attrName.toLowerCase()) {
            realAttrName = reloadHash
              ? member.memberName + "-" + reloadHash
              : member.memberName;
            return true;
          }
          return false;
        });
      });
    }
    const matched = searchData[0];
    let linkName = "";
    if (matched) {
      // linkName = matched.link.split("/").pop();
      linkName = matched.compoundName || matched.name;
      return getUrlByPathList({
        sdkValue: matched.sdkValue || apiTreeData.sdkValue,
        language: apiTreeData.language,
        platform: apiTreeData.platform,
        category: matched.compoundKind || matched.kind,
        filePath: linkName,
        hash: paramCaseId(realAttrName || attr),
      });
    }

    return "/404";
  }
  getApiShortLink(str: string, apiTreeData: any) {
    const [attr = "", name = "", kind = ""] = str.split("-");
    if (!attr && !name) return `/404`;
    let link = this.getClientApiMatchedLink(apiTreeData, {
      attr,
      name,
      kind,
    });
    link = link.replace(/\+/g, "%2B");

    return link;
  }
  getMdKeyIdMap() {
    if (JSON.stringify(this._mdKeyIdMap) !== "{}") {
      return { mdKeyIdMap: this._mdKeyIdMap, shortLinkMap: this._shortLinkMap };
    }
    const mdKeyIdMap: any = {};
    const shortLinkMap: any = {};
    // const docsIdShortLinkMap: any = {};
    const collectChild = (children: any[], shortLink = "") => {
      if (children) {
        children.forEach((item: any) => {
          if (item.children && item.type !== "doc") {
            collectChild(
              item.children,
              item.type === "docs" ? item.shortLink : ""
            );

            // if (item.type === "docs") {
            //   docsIdShortLinkMap[item.id] = item.shortLink;
            // }
          } else if (item.type === "doc") {
            mdKeyIdMap[item.fullKey] = item.id;

            const proKey = item.fullKey.split("/")[0];
            shortLinkMap[proKey + "-" + shortLink + "-" + item.key] = item.id;
          }
        });
      }
    };
    collectChild(this._menuData);
    this._mdKeyIdMap = mdKeyIdMap;
    this._shortLinkMap = shortLinkMap;
    return { mdKeyIdMap, shortLinkMap };
  }
  getSelfKeyMatchedLink({
    url = "",
    shortLinkMap,
    articleInfo = { key: "", fullKey: "" },
    hash,
    proKey = "",
    articleKey = "",
  }) {
    proKey = proKey || articleInfo.fullKey.split("/")[0];
    articleKey = articleKey || articleInfo.key;
    url = url.includes("-") ? url : proKey + "-" + url;
    const id =
      shortLinkMap[url + "-" + articleKey] || shortLinkMap[url + "-all"];
    if (id) return `/article/${id}${hash ? "#" + hash : ""}`;
    return "/404";
  }
  getCommonShortLink = (str: string, shortLinkMap: any, articleInfo: Menu) => {
    const [url = "", hash = ""] = str.split("#");
    const link = this.getSelfKeyMatchedLink({
      url,
      shortLinkMap,
      articleInfo,
      hash,
    });
    return link;
  };
  async replaceApiShortLink(articleID: string | number, content: string) {
    const articleInfo = this.getArticleInfoByID(articleID);
    const allApiTreeData = await this.getAllApiTreeData(articleInfo);
    const { shortLinkMap } = this.getMdKeyIdMap();

    const clientApiMdHrefReg = /(\[.*?\])\(@(.*?)\)/g;
    const clientApiAHrefReg = /(<a.*?href=")@(.*?)"/gi;

    const selfKeyMdHrefReg = /(\[.*?\])\(!(.*?)\)/g;
    const selfKeyAHrefReg = /(<a.*?href=")!(.*?)"/gi;

    // trans md "@" link
    content = content.replace(
      clientApiMdHrefReg,
      ($: string, $1: string, $2 = "") => {
        const link = this.getApiShortLink($2, allApiTreeData);
        // console.log("md api", $, link);
        return `${$1}(${this._serverBaseUrl}${link})`;
      }
    );

    // trans a "@" link
    content = content.replace(
      clientApiAHrefReg,
      ($: string, $1: string, $2 = "") => {
        const link = this.getApiShortLink($2, allApiTreeData);
        // console.log("a api", $, link);
        return `${$1}${this._serverBaseUrl}${link}"`;
      }
    );

    // trans md "!" link
    content = content.replace(
      selfKeyMdHrefReg,
      ($: string, $1: string, $2 = "") => {
        const link = this.getCommonShortLink($2, shortLinkMap, articleInfo);
        return `${$1}(${this._serverBaseUrl}${link})`;
      }
    );

    // trans a "!" link
    content = content.replace(
      selfKeyAHrefReg,
      ($: string, $1: string, $2 = "") => {
        const link = this.getCommonShortLink($2, shortLinkMap, articleInfo);
        return `${$1}${this._serverBaseUrl}${link}"`;
      }
    );

    return content;
  }
}

export default ShortLinkTransController.getInstance();

import { DataUtil } from "./assets/js/util/dataUtil";
import { Menu } from "./types/Menu";
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
  _rootPath = "docs/external";
  _dataJsonPath = "menuTree.json";
  _commonJsonConfigPath = "commonJsonConfig.json";
  _enLanguageKey = "en";
  _zhLanguageKey = "zh";
  _locale = this._zhLanguageKey;
  _serverBaseUrl = "https://doc-zh.zego.im";
  _en_menuData: Menu[];
  _zh_menuData: Menu[];
  _configData: any;
  _clientApiData: any = {};
  _mdKeyIdMap: any = {};
  _shortLinkMap: any = {};
  _defaultNotFoundPath = "/";
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
    if (this._locale === this._enLanguageKey && this._en_menuData) {
      return this._en_menuData;
    } else if (this._locale === this._zhLanguageKey && this._zh_menuData) {
      return this._zh_menuData;
    } else {
      const temp = path.resolve(
        this._rootPath,
        `${this._locale}_${this._dataJsonPath}`
      );
      const text = fs.readFileSync(temp, { encoding: "utf-8" });
      try {
        return (this[`_${this._locale}_menuData`] = JSON.parse(text) as Menu[]);
      } catch (error) {
        console.error("[ShortLinkTransController] getDataJson", error);
        return;
      }
    }
  }
  getCommonJsonConfig(keys: string[]) {
    if (this._configData) {
      return keys.reduce((obj, key) => {
        obj[key] = this._configData[key];
        return obj;
      }, {});
    } else {
      const temp = path.resolve(this._rootPath, this._commonJsonConfigPath);
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
    if (!menuData) return;
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
  async fetchFunc(method, jsonUrl, maxRetries = 3) {
    let lastError;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const res = await fetch(`${jsonUrl}`, {
          method,
        });
        const jsonRes = await res.json();
        const text = JSON.stringify(jsonRes);
        return text;
      } catch (error) {
        lastError = error;

        // 如果不是404错误且还有重试次数，则继续重试
        if (
          !error.message.includes("Unexpected token") &&
          attempt < maxRetries
        ) {
          console.log(`尝试 ${attempt}/${maxRetries} 失败，正在重试...`);
          // 等待一段时间再重试（指数退避）
          await new Promise((resolve) =>
            setTimeout(resolve, Math.pow(2, attempt) * 1000)
          );
          continue;
        }

        // 如果是404错误或者已经达到最大重试次数，则抛出错误
        throw error;
      }
    }

    // 如果所有重试都失败了，抛出最后一个错误
    throw lastError;
  }
  async getClientApiTreeData(url: string, refresh = false) {
    // url: https://doc-zh.zego.im/client-api/zim/zh/java_android/data.json
    const splitStr = url
      .split(`${this._serverBaseUrl}/client-api/`)[1]
      .split("/data.json")[0];
    const apiTreeDataPath = splitStr.split("/").join("_") + ".json";
    const temp = path.resolve(this._rootPath, apiTreeDataPath);
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
    if (!apiPathData.language && !apiPathData.docId) return {};
    const proConfig = this.getCommonJsonConfig([
      "crossPlatformLangMapZh",
      "crossPlatformLangMapEn",
      "clientApiProductsMapZh",
      "clientApiProductsMapEn",
    ]);
    const url = `${getMarkdownBaseUrl(apiPathData, proConfig)}data.json`;
    if (this._clientApiData[url]) return this._clientApiData[url];
    let res: any = {};
    try {
      res = (await this.getClientApiTreeData(url)) || {};
    } catch (e) {
      console.log("getClientApiData url:", url, e);
    }
    if (res && res.searchData) {
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
      data: res,
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

    return this._defaultNotFoundPath;
  }
  getApiShortLink(str: string, apiTreeData: any) {
    const [attr = "", name = "", kind = ""] = str.split("-");
    if (!attr && !name) return this._defaultNotFoundPath;
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
    collectChild(this[`_${this._locale}_menuData`]);
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
    return this._defaultNotFoundPath;
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
  async replaceApiShortLink(
    articleID: string | number,
    content: string,
    codeStr?: string
  ) {
    const articleInfo = this.getArticleInfoByID(articleID);
    if (!articleInfo) return;
    const allApiTreeData = await this.getAllApiTreeData(articleInfo);
    const { shortLinkMap } = this.getMdKeyIdMap();

    const clientApiMdHrefReg = /(\[.*?\])\((docuo-link)?@(.*?)\)/g;
    const clientApiAHrefReg = /(<a.*?href=")(docuo-link)?@(.*?)"/gi;

    const selfKeyMdHrefReg = /(\[.*?\])\((docuo-link)?!(.*?)\)/g;
    const selfKeyAHrefReg = /(<a.*?href=")(docuo-link)?!(.*?)"/gi;

    // trans md "@" link
    content = content.replace(
      clientApiMdHrefReg,
      ($: string, $1: string, $2 = "", $3 = "") => {
        const link = this.getApiShortLink($3, allApiTreeData);
        // console.log("md api", $, link);
        return `${$1}(${this._serverBaseUrl}${link})`;
      }
    );

    // trans a "@" link
    content = content.replace(
      clientApiAHrefReg,
      ($: string, $1: string, $2 = "", $3 = "") => {
        const link = this.getApiShortLink($3, allApiTreeData);
        // console.log("a api", $, link);
        return `${$1}${this._serverBaseUrl}${link}"`;
      }
    );

    // trans md "!" link
    content = content.replace(
      selfKeyMdHrefReg,
      ($: string, $1: string, $2 = "", $3 = "") => {
        const link = this.getCommonShortLink($3, shortLinkMap, articleInfo);
        return `${$1}(${this._serverBaseUrl}${link})`;
      }
    );

    // trans a "!" link
    content = content.replace(
      selfKeyAHrefReg,
      ($: string, $1: string, $2 = "", $3 = "") => {
        const link = this.getCommonShortLink($3, shortLinkMap, articleInfo);
        return `${$1}${this._serverBaseUrl}${link}"`;
      }
    );

    if (codeStr) {
      // mdxSource.code
      // eg: ...("a",{className:"11",href:"@createRoom",children:"333333"})... => href:"@createRoom"
      // eg: ...(n.a,{href:"@enterRoom",children:"444444"})... => href:"@enterRoom"
      // eg: ...("a",{className:"11",href:t.a?"docuo-link@createRoom":"docuo-link@enterRoom",children:"333333"})... => href:t.a?"@createRoom":"@enterRoom"
      const mdxSourceCodeClientApiMdHrefReg =
        /(a.*?href:")(docuo-link)?@(.*?)"/gi;
      const mdxSourceCodeSelfKeyHrefReg = /(a.*?href:")(docuo-link)?!(.*?)"/gi;
      const mdxSourceCodeClientApiMdHrefCommonReg = /(.*?")docuo-link@(.*?)"/gi;
      const mdxSourceCodeSelfKeyHrefCommonReg = /(.*?")docuo-link!(.*?)"/gi;
      codeStr = codeStr.replace(
        mdxSourceCodeClientApiMdHrefReg,
        ($: string, $1: string, $2 = "", $3 = "") => {
          const link = this.getApiShortLink($3, allApiTreeData);
          return `${$1}${this._serverBaseUrl}${link}"`;
        }
      );
      codeStr = codeStr.replace(
        mdxSourceCodeSelfKeyHrefReg,
        ($: string, $1: string, $2 = "", $3 = "") => {
          const link = this.getCommonShortLink($3, shortLinkMap, articleInfo);
          return `${$1}${this._serverBaseUrl}${link}"`;
        }
      );

      codeStr = codeStr.replace(
        mdxSourceCodeClientApiMdHrefCommonReg,
        ($: string, $1: string, $2 = "") => {
          const link = this.getApiShortLink($2, allApiTreeData);
          return `${$1}${this._serverBaseUrl}${link}"`;
        }
      );
      codeStr = codeStr.replace(
        mdxSourceCodeSelfKeyHrefCommonReg,
        ($: string, $1: string, $2 = "") => {
          const link = this.getCommonShortLink($2, shortLinkMap, articleInfo);
          return `${$1}${this._serverBaseUrl}${link}"`;
        }
      );

      content = content.replace(
        mdxSourceCodeClientApiMdHrefCommonReg,
        ($: string, $1: string, $2 = "") => {
          const link = this.getApiShortLink($2, allApiTreeData);
          return `${$1}${this._serverBaseUrl}${link}"`;
        }
      );
      content = content.replace(
        mdxSourceCodeSelfKeyHrefCommonReg,
        ($: string, $1: string, $2 = "") => {
          const link = this.getCommonShortLink($2, shortLinkMap, articleInfo);
          return `${$1}${this._serverBaseUrl}${link}"`;
        }
      );
    }

    return {
      content,
      codeStr,
    };
  }
}

export default ShortLinkTransController.getInstance();

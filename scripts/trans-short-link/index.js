// 完整复制 lib/trans-short-link/index.ts 的JavaScript版本

const { DataUtil } = require('./assets/js/util/dataUtil');
const {
  getClientRelatePathByPath,
  getMarkdownBaseUrl,
  filterSearchDataByLang,
  getUrlByPathList,
} = require('./components/Document-Api/utils');
const { paramCaseId } = require('./components/Document-Api/ClientApiDetail/markdownOptions');
const { InitController } = require('./init');
const path = require('path');
const fs = require('fs');

class ShortLinkTransController {
  static _instance = null;
  
  static getInstance() {
    return (
      ShortLinkTransController._instance ||
      (ShortLinkTransController._instance = new ShortLinkTransController())
    );
  }
  
  constructor() {
    this._rootPath = "docs/external";
    this._dataJsonPath = "menuTree.json";
    this._commonJsonConfigPath = "commonJsonConfig.json";
    this._enLanguageKey = "en";
    this._zhLanguageKey = "zh";
    this._locale = this._zhLanguageKey;
    this._serverBaseUrl = "https://doc-zh.zego.im";
    this._en_menuData = null;
    this._zh_menuData = null;
    this._configData = null;
    this._clientApiData = {};
    this._mdKeyIdMap = {};
    this._shortLinkMap = {};
    this._defaultNotFoundPath = "/";

    // 短链接处理日志
    this._shortLinkLogs = {
      processedFiles: [],
      failedFiles: [],
      totalShortLinksProcessed: 0,
      totalApiShortLinks: 0,
      totalDocShortLinks: 0,
      startTime: null,
      endTime: null
    };
  }
  
  injectData({ locale }) {
    if (locale) {
      this._locale = locale;
      this._serverBaseUrl =
        this._locale === this._enLanguageKey
          ? "https://docs.zegocloud.com"
          : "https://doc-zh.zego.im";
      DataUtil.setLocale(locale);
    }
  }
  
  async getDataJson() {
    if (this._locale === this._enLanguageKey && this._en_menuData) {
      return this._en_menuData;
    } else if (this._locale === this._zhLanguageKey && this._zh_menuData) {
      return this._zh_menuData;
    } else {
      try {
        // 使用InitController获取数据
        const text = await InitController.getDataJson(this._locale, false);
        if (text) {
          this[`_${this._locale}_menuData`] = JSON.parse(text);
          return this[`_${this._locale}_menuData`];
        }
      } catch (error) {
        console.error("[ShortLinkTransController] getDataJson", error);
      }

      // 如果InitController失败，尝试从本地文件读取
      const temp = path.resolve(
        this._rootPath,
        `${this._locale}_${this._dataJsonPath}`
      );

      try {
        if (fs.existsSync(temp)) {
          const text = fs.readFileSync(temp, { encoding: "utf-8" });
          this[`_${this._locale}_menuData`] = JSON.parse(text);
          return this[`_${this._locale}_menuData`];
        }
      } catch (error) {
        console.error("[ShortLinkTransController] getDataJson fallback", error);
      }
      return [];
    }
  }
  
  async getCommonJsonConfig(keys) {
    if (this._configData) {
      return keys ? keys.reduce((obj, key) => {
        obj[key] = this._configData[key];
        return obj;
      }, {}) : this._configData;
    } else {
      try {
        // 使用InitController获取数据
        const text = await InitController.getCommonJsonConfig(false);
        if (text) {
          const originConfigData = JSON.parse(text);
          const commonJsonConfig = originConfigData.reduce(
            (prev, curr) => {
              prev[curr.key] = curr.value;
              return prev;
            },
            {}
          );
          this._configData = commonJsonConfig;
          return keys ? keys.reduce((obj, key) => {
            obj[key] = commonJsonConfig[key];
            return obj;
          }, {}) : commonJsonConfig;
        }
      } catch (error) {
        console.error("[ShortLinkTransController] getCommonJsonConfig", error);
      }

      // 如果InitController失败，尝试从本地文件读取
      const temp = path.resolve(this._rootPath, this._commonJsonConfigPath);

      try {
        if (fs.existsSync(temp)) {
          const text = fs.readFileSync(temp, { encoding: "utf-8" });
          const originConfigData = JSON.parse(text);
          const commonJsonConfig = originConfigData.reduce(
            (prev, curr) => {
              prev[curr.key] = curr.value;
              return prev;
            },
            {}
          );
          this._configData = commonJsonConfig;
          return keys ? keys.reduce((obj, key) => {
            obj[key] = commonJsonConfig[key];
            return obj;
          }, {}) : commonJsonConfig;
        }
      } catch (error) {
        console.error("[ShortLinkTransController] getCommonJsonConfig fallback", error);
      }
      return {};
    }
  }
  
  async getArticleInfoByID(articleID) {
    const menuData = await this.getDataJson();
    if (!menuData) return null;
    const articleInfo = DataUtil.getMenuById(Number(articleID), menuData);
    return articleInfo;
  }
  
  async getArticleInfoByPath() {
    const menuData = await this.getDataJson();
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
        // 在Node.js环境中使用内置的https模块
        const https = require('https');
        const http = require('http');
        const url = require('url');

        return new Promise((resolve, reject) => {
          const parsedUrl = url.parse(jsonUrl);
          const client = parsedUrl.protocol === 'https:' ? https : http;

          const req = client.request({
            hostname: parsedUrl.hostname,
            port: parsedUrl.port,
            path: parsedUrl.path,
            method: method.toUpperCase(),
            headers: {
              'User-Agent': 'Node.js'
            }
          }, (res) => {
            let data = '';
            res.on('data', (chunk) => {
              data += chunk;
            });
            res.on('end', () => {
              try {
                const jsonRes = JSON.parse(data);
                resolve(JSON.stringify(jsonRes));
              } catch (parseError) {
                reject(parseError);
              }
            });
          });

          req.on('error', (error) => {
            reject(error);
          });

          req.end();
        });
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
  
  async getClientApiTreeData(url, refresh = false) {
    // url: https://doc-zh.zego.im/client-api/zim/zh/java_android/data.json
    const splitStr = url
      .split(`${this._serverBaseUrl}/client-api/`)[1]
      .split("/data.json")[0];
    const apiTreeDataPath = splitStr.split("/").join("_") + ".json";
    const temp = path.resolve(this._rootPath, apiTreeDataPath);
    
    if (refresh) {
      try {
        const text = await this.fetchFunc("get", url);
        fs.writeFileSync(temp, text, { encoding: "utf-8" });
        return JSON.parse(text);
      } catch (error) {
        console.error("getClientApiTreeData refresh error:", error);
        return {};
      }
    } else {
      if (fs.existsSync(temp)) {
        try {
          const text = fs.readFileSync(temp, { encoding: "utf-8" });
          return JSON.parse(text);
        } catch (error) {
          console.error("getClientApiTreeData read error:", error);
          return {};
        }
      } else {
        try {
          const text = await this.fetchFunc("get", url);
          fs.writeFileSync(temp, text, { encoding: "utf-8" });
          return JSON.parse(text);
        } catch (error) {
          console.error("getClientApiTreeData fetch error:", error);
          return {};
        }
      }
    }
  }
  
  updateClientApiData(playload) {
    if (playload.url) {
      this._clientApiData = {
        ...this._clientApiData,
        [playload.url]: playload.data,
      };
    }
  }

  async getClientApiData(apiPathData) {
    if (!apiPathData.language && !apiPathData.docId) return {};
    const proConfig = await this.getCommonJsonConfig([
      "crossPlatformLangMapZh",
      "crossPlatformLangMapEn",
      "clientApiProductsMapZh",
      "clientApiProductsMapEn",
    ]);
    const url = `${getMarkdownBaseUrl(apiPathData, proConfig)}data.json`;
    if (this._clientApiData[url]) return this._clientApiData[url];
    let res = {};
    try {
      res = (await this.getClientApiTreeData(url)) || {};
    } catch (e) {
      console.log("getClientApiData url:", url, e);
    }
    if (res && res.searchData) {
      res = {
        searchData: res.searchData.map((item) => {
          const shortName = (item.compoundName || item.name)
            .split(".")
            .pop()
            .split(":")
            .pop();
          return {
            ...item,
            shortName,
            members: (item.members || []).map((x) => {
              const linkName = x.memberName || x.name;
              return {
                ...x,
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

  async getAllApiTreeData(articleInfo) {
    const { commonApiPathNameDataZh, commonApiPathNameDataEn } =
      await this.getCommonJsonConfig([
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

    return {};
  }

  getClientApiMatchedLink(
    apiTreeData,
    { attr = "", name = "", kind = "" }
  ) {
    if (!apiTreeData) return "";
    let { searchData, language } = apiTreeData;
    if (!searchData) return "";
    searchData = filterSearchDataByLang(searchData, language);
    if (kind) {
      searchData = searchData.filter((item) => {
        const kind = item.compoundKind || item.kind;
        return kind === kind.toLowerCase();
      });
    }
    if (name) {
      searchData = searchData.filter((item) => item.shortName === name);
    }
    let realAttrName = attr;
    if (attr) {
      const [attrName, reloadHash] = attr.split("__");
      searchData = searchData.filter((item) => {
        return item.members.some((member) => {
          if (member.memberName.toLowerCase() === attrName.toLowerCase()) {
            realAttrName = reloadHash
              ? member.memberName + "-" + reloadHash
              : member.memberName;
            return true;
          }
          // 处理oc方法名里的:
          const memberName = (member.memberName || "").split(":")[0];
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

  getMdKeyIdMap() {
    if (JSON.stringify(this._mdKeyIdMap) !== "{}") {
      return { mdKeyIdMap: this._mdKeyIdMap, shortLinkMap: this._shortLinkMap };
    }

    const mdKeyIdMap = {};
    const shortLinkMap = {};

    const collectChild = (children, shortLink = "") => {
      if (children) {
        children.forEach((item) => {
          if (item.children && item.type !== "doc") {
            collectChild(
              item.children,
              item.type === "docs" ? item.shortLink : ""
            );
          } else if (item.type === "doc") {
            mdKeyIdMap[item.fullKey] = item.id;
            const proKey = item.fullKey.split("/")[0];
            shortLinkMap[proKey + "-" + shortLink + "-" + item.key] = item.id;
          }
        });
      }
    };

    const menuData = this[`_${this._locale}_menuData`];
    if (menuData) {
      collectChild(menuData);
    }

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
    proKey = proKey || (articleInfo.fullKey ? articleInfo.fullKey.split("/")[0] : "");
    articleKey = articleKey || articleInfo.key || "";
    url = url.includes("-") ? url : proKey + "-" + url;
    const id = shortLinkMap[url + "-" + articleKey] || shortLinkMap[url + "-all"];
    if (id) return `/article/${id}${hash ? "#" + hash : ""}`;
    return this._defaultNotFoundPath;
  }

  getCommonShortLink(str, shortLinkMap, articleInfo) {
    const [url = "", hash = ""] = str.split("#");
    const link = this.getSelfKeyMatchedLink({
      url,
      shortLinkMap,
      articleInfo,
      hash,
    });
    return link;
  }

  getApiShortLink(str, apiTreeData) {
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

  async replaceApiShortLink(articleID, content, codeStr, filePath = '', slug = []) {
    const startTime = new Date();
    console.log(`   📎 开始处理短链接，articleID: ${articleID}`);

    const articleInfo = await this.getArticleInfoByID(articleID);
    if (!articleInfo) {
      console.log(`   ⚠️  未找到articleID ${articleID} 对应的文章信息`);
      this._logFailedFile(filePath, slug, articleID, '未找到articleID对应的文章信息', startTime);
      return { content, codeStr };
    }

    // 获取短链接映射和API数据
    const { shortLinkMap } = this.getMdKeyIdMap();
    const apiTreeData = await this.getAllApiTreeData(articleInfo);

    // 定义正则表达式（完全复制原实现）
    const clientApiMdHrefReg = /(\[.*?\])\((docuo-link)?@(.*?)\)/g;
    const clientApiAHrefReg = /(<a.*?href=")(docuo-link)?@(.*?)"/gi;
    const selfKeyMdHrefReg = /(\[.*?\])\((docuo-link)?!(.*?)\)/g;
    const selfKeyAHrefReg = /(<a.*?href=")(docuo-link)?!(.*?)"/gi;

    let processedContent = content;
    let processedCodeStr = codeStr;
    let processedCount = 0;
    let apiShortLinksCount = 0;
    let docShortLinksCount = 0;
    const processedShortLinks = [];

    // 处理Markdown格式的API短链接 (@) - 需要同步处理
    const apiMdMatches = [];
    let match;
    while ((match = clientApiMdHrefReg.exec(processedContent)) !== null) {
      apiMdMatches.push({
        match: match[0],
        text: match[1],
        prefix: match[2] || "",
        shortLink: match[3] || "",
        index: match.index
      });
    }

    // 从后往前替换，避免索引变化
    for (let i = apiMdMatches.length - 1; i >= 0; i--) {
      const item = apiMdMatches[i];
      const link = this.getApiShortLink(item.shortLink, apiTreeData);
      processedCount++;
      apiShortLinksCount++;
      console.log(`     🔗 处理API短链接: ${item.text}(@${item.shortLink}) → ${this._serverBaseUrl}${link}`);
      processedShortLinks.push({
        type: 'API短链接 (Markdown)',
        original: `${item.text}(@${item.shortLink})`,
        converted: `${item.text}(${this._serverBaseUrl}${link})`,
        shortLink: item.shortLink,
        resolvedLink: link
      });
      const replacement = `${item.text}(${this._serverBaseUrl}${link})`;
      processedContent = processedContent.substring(0, item.index) + replacement + processedContent.substring(item.index + item.match.length);
    }

    // 处理HTML格式的API短链接 (@) - 需要同步处理
    const apiHtmlMatches = [];
    clientApiAHrefReg.lastIndex = 0; // 重置正则表达式
    while ((match = clientApiAHrefReg.exec(processedContent)) !== null) {
      apiHtmlMatches.push({
        match: match[0],
        before: match[1],
        prefix: match[2] || "",
        shortLink: match[3] || "",
        index: match.index
      });
    }

    // 从后往前替换，避免索引变化
    for (let i = apiHtmlMatches.length - 1; i >= 0; i--) {
      const item = apiHtmlMatches[i];
      const link = this.getApiShortLink(item.shortLink, apiTreeData);
      processedCount++;
      apiShortLinksCount++;
      console.log(`     🔗 处理HTML API短链接: @${item.shortLink} → ${this._serverBaseUrl}${link}`);
      processedShortLinks.push({
        type: 'API短链接 (HTML)',
        original: `@${item.shortLink}`,
        converted: `${this._serverBaseUrl}${link}`,
        shortLink: item.shortLink,
        resolvedLink: link
      });
      const replacement = `${item.before}${this._serverBaseUrl}${link}"`;
      processedContent = processedContent.substring(0, item.index) + replacement + processedContent.substring(item.index + item.match.length);
    }

    // 处理Markdown格式的文档短链接 (!)
    processedContent = processedContent.replace(
      selfKeyMdHrefReg,
      (match, text, prefix = "", shortLink = "") => {
        const link = this.getCommonShortLink(shortLink, shortLinkMap, articleInfo);
        processedCount++;
        docShortLinksCount++;
        console.log(`     🔗 处理文档短链接: ${text}(!${shortLink}) → ${this._serverBaseUrl}${link}`);
        processedShortLinks.push({
          type: '文档短链接 (Markdown)',
          original: `${text}(!${shortLink})`,
          converted: `${text}(${this._serverBaseUrl}${link})`,
          shortLink: shortLink,
          resolvedLink: link
        });
        return `${text}(${this._serverBaseUrl}${link})`;
      }
    );

    // 处理HTML格式的文档短链接 (!)
    processedContent = processedContent.replace(
      selfKeyAHrefReg,
      (match, before, prefix = "", shortLink = "") => {
        const link = this.getCommonShortLink(shortLink, shortLinkMap, articleInfo);
        processedCount++;
        docShortLinksCount++;
        console.log(`     🔗 处理HTML文档短链接: !${shortLink} → ${this._serverBaseUrl}${link}`);
        processedShortLinks.push({
          type: '文档短链接 (HTML)',
          original: `!${shortLink}`,
          converted: `${this._serverBaseUrl}${link}`,
          shortLink: shortLink,
          resolvedLink: link
        });
        return `${before}${this._serverBaseUrl}${link}"`;
      }
    );

    // 处理codeStr中的短链接（如果存在）
    if (processedCodeStr) {
      processedCodeStr = processedCodeStr.replace(
        clientApiMdHrefReg,
        (match, text, prefix = "", shortLink = "") => {
          const link = this.getApiShortLink(shortLink, apiTreeData);
          processedCount++;
          return `${text}(${this._serverBaseUrl}${link})`;
        }
      );

      processedCodeStr = processedCodeStr.replace(
        selfKeyMdHrefReg,
        (match, text, prefix = "", shortLink = "") => {
          const link = this.getCommonShortLink(shortLink, shortLinkMap, articleInfo);
          processedCount++;
          return `${text}(${this._serverBaseUrl}${link})`;
        }
      );
    }

    const endTime = new Date();
    const processingTime = endTime - startTime;

    if (processedCount > 0) {
      console.log(`   ✅ 成功处理 ${processedCount} 个短链接 (API: ${apiShortLinksCount}, 文档: ${docShortLinksCount})`);
      this._logProcessedFile(filePath, slug, articleID, {
        totalShortLinks: processedCount,
        apiShortLinks: apiShortLinksCount,
        docShortLinks: docShortLinksCount,
        processedShortLinks: processedShortLinks,
        processingTime: processingTime,
        articleInfo: articleInfo
      }, startTime, endTime);
    } else {
      console.log(`   ℹ️  未发现需要处理的短链接`);
    }

    // 更新全局统计
    this._shortLinkLogs.totalShortLinksProcessed += processedCount;
    this._shortLinkLogs.totalApiShortLinks += apiShortLinksCount;
    this._shortLinkLogs.totalDocShortLinks += docShortLinksCount;

    return {
      content: processedContent,
      codeStr: processedCodeStr
    };
  }

  /**
   * 记录成功处理的文件
   */
  _logProcessedFile(filePath, slug, articleID, processInfo, startTime, endTime) {
    this._shortLinkLogs.processedFiles.push({
      timestamp: new Date().toISOString(),
      filePath: filePath,
      slug: slug.join('/'),
      articleID: articleID,
      totalShortLinks: processInfo.totalShortLinks,
      apiShortLinks: processInfo.apiShortLinks,
      docShortLinks: processInfo.docShortLinks,
      processedShortLinks: processInfo.processedShortLinks,
      processingTime: processInfo.processingTime,
      articleInfo: {
        id: processInfo.articleInfo.id,
        key: processInfo.articleInfo.key,
        fullKey: processInfo.articleInfo.fullKey,
        title: processInfo.articleInfo.title
      },
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString()
    });
  }

  /**
   * 记录失败的文件
   */
  _logFailedFile(filePath, slug, articleID, error, startTime) {
    this._shortLinkLogs.failedFiles.push({
      timestamp: new Date().toISOString(),
      filePath: filePath,
      slug: slug.join('/'),
      articleID: articleID,
      error: error,
      startTime: startTime.toISOString()
    });
  }

  /**
   * 开始短链接处理会话
   */
  startShortLinkSession() {
    this._shortLinkLogs.startTime = new Date();
    this._shortLinkLogs.processedFiles = [];
    this._shortLinkLogs.failedFiles = [];
    this._shortLinkLogs.totalShortLinksProcessed = 0;
    this._shortLinkLogs.totalApiShortLinks = 0;
    this._shortLinkLogs.totalDocShortLinks = 0;
    console.log('📎 开始短链接处理会话');
  }

  /**
   * 结束短链接处理会话并生成日志
   */
  endShortLinkSession() {
    this._shortLinkLogs.endTime = new Date();
    this._generateShortLinkLogs();
    console.log('📎 短链接处理会话结束');
  }

  /**
   * 生成短链接处理日志文件
   */
  _generateShortLinkLogs() {
    const fs = require('fs');
    const path = require('path');

    // 确保logs目录存在（与静态MD生成日志放在同一目录）
    const logsDir = path.join(__dirname, '..', 'logs');
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }

    const locale = this._locale;
    const timestamp = this._shortLinkLogs.endTime;
    const startTime = this._shortLinkLogs.startTime;
    const processingTime = Math.round((timestamp - startTime) / 1000);

    const processedCount = this._shortLinkLogs.processedFiles.length;
    const failedCount = this._shortLinkLogs.failedFiles.length;
    const totalFiles = processedCount + failedCount;

    // 生成成功文件日志
    const successLogPath = path.join(logsDir, `${locale}-short-link-processed-files.txt`);
    let successContent = `# 短链接处理 - 成功文件列表\n`;
    successContent += `# =====================================\n\n`;
    successContent += `生成时间: ${timestamp.toISOString()}\n`;
    successContent += `开始时间: ${startTime.toISOString()}\n`;
    successContent += `耗时: ${processingTime}秒\n`;
    successContent += `处理文件数: ${processedCount}\n`;
    successContent += `失败文件数: ${failedCount}\n`;
    successContent += `总文件数: ${totalFiles}\n`;
    successContent += `总短链接数: ${this._shortLinkLogs.totalShortLinksProcessed}\n`;
    successContent += `API短链接数: ${this._shortLinkLogs.totalApiShortLinks}\n`;
    successContent += `文档短链接数: ${this._shortLinkLogs.totalDocShortLinks}\n\n`;

    successContent += `# 成功处理的文件列表:\n`;
    successContent += `# 格式: [时间戳] 文件路径 (slug路径)\n`;
    successContent += `#        文章ID: articleID\n`;
    successContent += `#        短链接: 总数 (API: X, 文档: Y)\n`;
    successContent += `#        处理时间: X毫秒\n\n`;

    this._shortLinkLogs.processedFiles.forEach(file => {
      successContent += `[${file.timestamp}] ${file.filePath} (${file.slug})\n`;
      successContent += `        文章ID: ${file.articleID}\n`;
      successContent += `        短链接: ${file.totalShortLinks} (API: ${file.apiShortLinks}, 文档: ${file.docShortLinks})\n`;
      successContent += `        处理时间: ${file.processingTime}毫秒\n`;

      if (file.processedShortLinks.length > 0) {
        successContent += `        详细转换:\n`;
        file.processedShortLinks.forEach((link, index) => {
          successContent += `          ${index + 1}. ${link.type}: ${link.original} → ${link.converted}\n`;
        });
      }
      successContent += `\n`;
    });

    fs.writeFileSync(successLogPath, successContent, 'utf8');

    // 生成失败文件日志
    const failedLogPath = path.join(logsDir, `${locale}-short-link-failed-files.txt`);
    let failedContent = `# 短链接处理 - 失败文件列表\n`;
    failedContent += `# =====================================\n\n`;
    failedContent += `生成时间: ${timestamp.toISOString()}\n`;
    failedContent += `开始时间: ${startTime.toISOString()}\n`;
    failedContent += `耗时: ${processingTime}秒\n`;
    failedContent += `处理文件数: ${processedCount}\n`;
    failedContent += `失败文件数: ${failedCount}\n`;
    failedContent += `总文件数: ${totalFiles}\n\n`;

    if (failedCount > 0) {
      failedContent += `# 失败文件列表:\n`;
      failedContent += `# 格式: [时间戳] 文件路径 (slug路径)\n`;
      failedContent += `#        文章ID: articleID\n`;
      failedContent += `#        错误: 错误信息\n\n`;

      this._shortLinkLogs.failedFiles.forEach(file => {
        failedContent += `[${file.timestamp}] ${file.filePath} (${file.slug})\n`;
        failedContent += `        文章ID: ${file.articleID}\n`;
        failedContent += `        错误: ${file.error}\n\n`;
      });
    } else {
      failedContent += `# 🎉 没有失败的文件！\n`;
    }

    fs.writeFileSync(failedLogPath, failedContent, 'utf8');

    console.log(`📊 短链接处理日志已生成:`);
    console.log(`   ✅ 成功文件日志: ${successLogPath}`);
    console.log(`   ❌ 失败文件日志: ${failedLogPath}`);
    console.log(`   📈 统计: ${processedCount}个文件, ${this._shortLinkLogs.totalShortLinksProcessed}个短链接`);
  }
}

// 创建单例实例
const ShortLinkTransControllerImpl = ShortLinkTransController.getInstance();

module.exports = {
  ShortLinkTransController,
  ShortLinkTransControllerImpl
};

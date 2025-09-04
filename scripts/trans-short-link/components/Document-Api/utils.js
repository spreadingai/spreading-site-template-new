// 完整复制 lib/trans-short-link/components/Document-Api/utils.ts 的JavaScript版本

const { DataUtil } = require('../../assets/js/util/dataUtil');
const { languageList } = require('../../assets/js/data/platformList');
const { getMainDomain } = require('../../utils');

// 简单的lodash invert实现
const invert = (obj) => {
  const result = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[obj[key]] = key;
    }
  }
  return result;
};

const CLIENT_API_ES_MAP = {
  IM: "zim",
  Live_Room: "express-video-sdk",
  Express_Video_SDK_API: "express-video-sdk",
  express_video_sdk: "express-video-sdk",
  express_audio_sdk: "express-audio-sdk",
  ExpressAudioRoomSDK: "express-audio-sdk",
  hybrid_hierarchical_delivery_system: "express-video-sdk",
  ZegoAvatar: "zegoAvatar",
  Metaworld: "metaworld",
  virtual_ktv: "metaworld",
  ZegoSuperBoard: "superboard",
  ZegoMiniGameEngine: "zegominigameengine",
  AI_Vision: "effects-sdk",
  ai_vision: "effects-sdk",
  Data_Stream_Recording: "data-stream-recording",
  data_stream_recording: "data-stream-recording",
  RoomKit_API: "roomkit",
  RoomKitCore_API: "roomkit-core",
  "roomkit-core_API": "roomkit-core",
  DocsView: "docsview",
  WhiteBoard: "whiteboardview",
  whiteboardview_API: "whiteboardview",
  ZegoAccurateSyncMediaPlayerSDK: "zegoaccuratesyncmediaplayer",
  zegoaccuratesyncmediaplayersdk: "zegoaccuratesyncmediaplayer",
};

const clientApiDocBaseUrl = "/article/api";

const showCategoryList = {
  java: ["Class", "Enum", "Interface", "Struct"],
  c: ["Class", "Enum", "File", "Struct"],
};

const getUrlByPathList = (
  {
    sdkValue = "",
    language = "",
    platform = "",
    category = "",
    filePath = "",
    hash = "",
    docId = "",
  },
  isFunc = false
) => {
  let pathSplits = [];
  if (!sdkValue) {
  } else if (!language && !platform) {
    pathSplits = [sdkValue];
  } else if (language && platform && !language.includes(platform)) {
    // language带平台时，不用拼接platform；暂时需要拼接platform的是doxygen文档
    pathSplits = [sdkValue, `${language}_${platform}`];
  } else {
    pathSplits = [sdkValue, language || platform];
  }
  if (!isFunc) {
    if (category) pathSplits.push(category);
    if (filePath) pathSplits.push(filePath);
  }
  return `${clientApiDocBaseUrl}?${
    docId ? `docId=${docId}&` : ""
  }doc=${pathSplits.join("~")}${isFunc ? "&isFunc=1" : ""}${
    hash ? "#" + hash : ""
  }`;
};

const languageFormat = (language = "") => {
  return language.replace("-", "");
};

const getClientRelatePathByPath = (path, pathMap) => {
  const matchedPath = pathMap[path];
  if (matchedPath) {
    return matchedPath;
  } else {
    return `${path}_API`;
  }
};

const getPreviewClientApiRootUrl = (docId) => {
  let baseUrl = "https://doc-preview-zh.zego.im"; // 预览环境
  let reqUrl = `/preview_file/${docId}`;
  
  // 在Node.js环境中，没有location对象，使用环境变量或默认值
  const host = process.env.HOST || '';
  
  if (host.includes("test")) {
    baseUrl = "//doc-api-system-test.zego.im"; // 测试环境
  } else if (host.includes("doc-zh.zego.im")) {
    baseUrl = "https://doc.zego.im"; // 正式环境
    reqUrl = `/data/preview_file/${docId}`;
  }

  if (docId.startsWith("out")) {
    baseUrl = getMainDomain(); // 正式环境
    reqUrl = `/data/preview_file/${docId}`;
  }

  return baseUrl + reqUrl;
};

const dealSpecialFlag = (str) => {
  return decodeURIComponent(str.replace("objective-c", "objectivec"));
};

const getPreviewMarkdownBaseUrl = (docId, sdkValue, langPlatform) => {
  return `${getPreviewClientApiRootUrl(docId)}/${sdkValue}/${
    DataUtil.locale
  }/${langPlatform}/`;
};

const getMarkdownBaseUrl = (
  {
    sdkValue = "",
    platform = "",
    language = "",
    docId = "",
    isPreviewCrossPlatform = false,
  },
  commonJsonConfig = {}
) => {
  if (docId) {
    return getPreviewMarkdownBaseUrl(
      docId,
      sdkValue,
      `${languageFormat(language)}_${
        isPreviewCrossPlatform ? "cross_platform" : platform
      }`
    );
  }

  const {
    crossPlatformLangMapZh = {},
    crossPlatformLangMapEn = {},
    clientApiProductsMapZh = {},
    clientApiProductsMapEn = {},
  } = commonJsonConfig;
  const crossPlatformLangMap =
    DataUtil.locale === "en" ? crossPlatformLangMapEn : crossPlatformLangMapZh;
  const clientApiPathMap =
    DataUtil.locale === "en" ? clientApiProductsMapEn : clientApiProductsMapZh;
  const tempClientApiPathMap = invert(clientApiPathMap);
  // 处理objective-c标识不一致
  language = dealSpecialFlag(language);
  let rootDirectory = sdkValue;
  if (!sdkValue.startsWith("roomkit")) {
    rootDirectory = tempClientApiPathMap[sdkValue];
  }
  if (!rootDirectory)
    rootDirectory = sdkValue
      .toLowerCase()
      .replace("_api", "")
      .replace(/roomkitcore/g, "roomkit-core");

  rootDirectory = CLIENT_API_ES_MAP[rootDirectory] || rootDirectory;
  
  const matchedItem = languageList.find(
    (x) => x.value.replace("-", "") === language
  );

  if (!matchedItem) return "";
  let langPlatform = language + "_" + platform;

  const curCrossPlatformLangMap = crossPlatformLangMap[rootDirectory];
  if (curCrossPlatformLangMap) {
    const plarforms = curCrossPlatformLangMap[language] || [];
    if (plarforms.includes(platform) || platform === "cross") {
      langPlatform = `${language}_cross_platform`;
    }
  }

  let baseUrl = getMainDomain();
  return `${baseUrl}/client-api/${rootDirectory}/${DataUtil.locale}/${langPlatform}/`;
};

const filterSearchDataByLang = (searchData, lang) => {
  const shownCategoryArr = (showCategoryList[lang] || []).map((item) =>
    item.toLowerCase()
  );
  return shownCategoryArr.length
    ? searchData.filter((item) =>
        shownCategoryArr.includes(item.compoundKind.toLowerCase())
      )
    : searchData;
};

module.exports = {
  CLIENT_API_ES_MAP,
  clientApiDocBaseUrl,
  showCategoryList,
  getUrlByPathList,
  languageFormat,
  getClientRelatePathByPath,
  getPreviewClientApiRootUrl,
  dealSpecialFlag,
  getMarkdownBaseUrl,
  filterSearchDataByLang
};

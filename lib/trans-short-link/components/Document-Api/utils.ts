import { locale } from "../../config";
import invert from "lodash/invert";
import { serverBaseUrl } from "../../utils";
import { languageList } from "../../assets/js/data/platformList";

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

export const clientApiDocBaseUrl = "/article/api";

export const showCategoryList = {
  java: ["Class", "Enum", "Interface", "Struct"],
  // "objective-c": ["Class", "Enum", "Protocol"],
  // objectivec: ["Class", "Enum", "Protocol"],
  c: ["Class", "Enum", "File", "Struct"],
  // cs: ["Class", "Namespace"],
  // javascript: ["Class", "Enum", "Interface"],
};

export const getUrlByPathList = (
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
  let pathSplits: string[] = [];
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

export const languageFormat = (language = "") => {
  return language.replace("-", "");
};

export const getClientRelatePathByPath = (path: string, pathMap) => {
  const matchedPath = pathMap[path];
  if (matchedPath) {
    return matchedPath;
  } else {
    return `${path}_API`;
  }
};

export const getPreviewClientApiRootUrl = (docId) => {
  let baseUrl = "https://doc-preview-zh.zego.im"; // 预览环境
  // 测试地址
  // baseUrl = "http://doc-api-system-test.zego.im";
  let reqUrl = `/preview_file/${docId}`;
  if (location && location.host.includes("test")) {
    baseUrl = "//doc-api-system-test.zego.im"; // 测试环境
  } else if (location && location.host.includes("doc-zh.zego.im")) {
    baseUrl = "https://doc.zego.im"; // 正式环境
    // baseUrl = "http://127.0.0.1:3006";
    reqUrl = `/data/preview_file/${docId}`;
  }

  if (docId.startsWith("out")) {
    baseUrl = serverBaseUrl; // 正式环境
    reqUrl = `/data/preview_file/${docId}`;
  }

  return baseUrl + reqUrl;
};

export const dealSpecialFlag = (str: string) => {
  return decodeURIComponent(str.replace("objective-c", "objectivec"));
};

const getPreviewMarkdownBaseUrl = (docId, sdkValue, langPlatform) => {
  return `${getPreviewClientApiRootUrl(
    docId
  )}/${sdkValue}/${locale}/${langPlatform}/`;
};

export const getMarkdownBaseUrl = (
  {
    sdkValue = "",
    platform = "",
    language = "",
    docId = "",
    isPreviewCrossPlatform = false,
  },
  commonJsonConfig: any = {}
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
    locale === "en" ? crossPlatformLangMapEn : crossPlatformLangMapZh;
  const clientApiPathMap =
    locale === "en" ? clientApiProductsMapEn : clientApiProductsMapZh;
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
  // const host = (location && location.host) || "";
  const matchedItem = languageList.find(
    (x) => (x.value as string).replace("-", "") === language
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

  let baseUrl = serverBaseUrl;
  // TODO: ignore env
  // if (process.env.NODE_ENV.includes("dev"))
  //   // baseUrl = "https://doc-preview-test-zh.zego.im";
  //   baseUrl = "https://doc-preview-zh.zego.im";
  return `${baseUrl}/client-api/${rootDirectory}/${locale}/${langPlatform}/`;
};

export const filterSearchDataByLang = (searchData: any, lang: string) => {
  const shownCategoryArr = (showCategoryList[lang] || []).map((item) =>
    item.toLowerCase()
  );
  return shownCategoryArr.length
    ? searchData.filter((item) =>
        shownCategoryArr.includes(item.compoundKind.toLowerCase())
      )
    : searchData;
};

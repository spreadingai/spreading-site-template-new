import { locale } from "../../../config";

interface PlatformItem {
  value: string;
  name: string;
  langs?: string[];
  children?: any[];
  type?: string;
  iconClass?: string;
}

const iosOcSwiftList =
  locale === "en" ? ["swift", "objective-c"] : ["objective-c", "swift"];

export let oldPlatformList: PlatformItem[] = [
  {
    value: "ios",
    name: "iOS",
    langs: [...iosOcSwiftList, "c"],
    type: "platform",
    iconClass: "doc-icon_language_ios",
  },
  {
    value: "android",
    name: "Android",
    langs: ["java", "kotlin", "c"],
    type: "platform",
    iconClass: "doc-icon_language_android",
  },
  {
    value: "macos",
    name: "macOS",
    langs: ["objective-c", "swift", "cpp", "c"],
    type: "platform",
    iconClass: "doc-icon_language_macos",
  },
  {
    value: "windows",
    name: "Windows",
    langs: ["cpp", "cs", "c"],
    type: "platform",
    iconClass: "doc-icon_language_windows",
  },
  {
    value: "harmony",
    name: "HarmonyOS",
    langs: ["arkts"],
    type: "platform",
    iconClass: "doc-icon_language_harmonyos",
  },
  {
    value: "linux",
    name: "Linux",
    langs: ["cpp", "java", "c"],
    type: "platform",
    iconClass: "doc-icon_language_linux",
  },
  {
    value: "web",
    name: "Web",
    langs: ["javascript"],
    type: "platform",
    iconClass: "doc-icon_language_web",
  },
  (locale === "zh" && {
    value: "wxxcx",
    name: "小程序",
    langs: ["javascript"],
    type: "platform",
    iconClass: "doc-icon_language_wxmini",
  }) as PlatformItem,
  // {
  //   value: "zfbmini",
  //   name: "支付宝小程序",
  //   langs: ["javascript"],
  //   type: "platform",
  // },
  {
    value: "flutter",
    name: "Flutter",
    langs: ["dart"],
    type: "framework",
    iconClass: "doc-icon_language_flutter",
  },
  {
    value: "electron",
    name: "Electron",
    langs: ["javascript"],
    type: "framework",
    iconClass: "doc-icon_language_electron",
  },
  {
    value: "ue",
    name: "Unreal Engine",
    langs: ["cpp"],
    type: "framework",
    iconClass: "doc-icon_language_ue",
  },
  {
    value: "unity3d",
    name: "Unity3D",
    langs: ["cs"],
    type: "framework",
    iconClass: "doc-icon_language_unity3d",
  },
  (locale === "zh" && {
    value: "uni-app",
    name: "uni-app",
    langs: ["javascript"],
    type: "framework",
    iconClass: "doc-icon_language_uniapp",
  }) as PlatformItem,
  {
    value: "react-native",
    name: "React Native",
    langs: ["javascript"],
    type: "framework",
    iconClass: "doc-icon_language_reactnative",
  },
  // {
  //   value: "cocos2d",
  //   name: "Cocos2d-x",
  //   langs: ["cpp"],
  //   type: "framework",
  //   iconClass: "doc-icon_language_cocos2dx",
  // },
  {
    value: "cocos-creator",
    name: "Cocos Creator",
    langs: ["typescript"],
    type: "framework",
    iconClass: "doc-icon_language_cocoscreator",
  },
  // {
  //   value: "all",
  //   name: "全平台",
  // },
  // {
  //     value: '4',
  //     name: '娃娃机控制端',
  //     enName: 'WawajiControl',
  // },
  // {
  //     value: '14',
  //     name: '树莓派', // RasPi
  //     enName: 'RasPi',
  // },
];

// 英文平台列表排序
if (locale === "en") {
  const enPlatformKeysList = [
    "ios",
    "android",
    "web",
    "flutter",
    "react-native",
    "electron",
    "unity3d",
    "cocos2d",
    "cocos-creator",
    "windows",
    "macos",
    "linux",
    "wxxcx",
    "uni-app",
    "ue",
  ];
  const enPlatformKeysListIndexMap = enPlatformKeysList.reduce(
    (acc, cur, index) => {
      acc[cur] = index;
      return acc;
    },
    {}
  );
  // 按照英文平台列表排序
  oldPlatformList = oldPlatformList.sort((a, b) => {
    return (
      enPlatformKeysListIndexMap[a.value] - enPlatformKeysListIndexMap[b.value]
    );
  });
}

export const languageList = [
  {
    value: "objective-c",
    name: "Objective-C",
  },
  {
    value: "swift",
    name: "Swift",
  },
  {
    value: "java",
    name: "Java",
  },
  {
    value: "kotlin",
    name: "Kotlin",
  },
  {
    value: "cpp",
    name: "C++",
  },
  {
    value: "cs",
    name: "C#",
  },
  {
    value: "dart",
    name: "Dart",
  },
  {
    value: "javascript",
    name: "JavaScript",
  },
  {
    value: "typescript",
    name: "TypeScript",
  },
  {
    value: "c",
    name: "C",
  },
  {
    value: "arkts",
    name: "ArkTS",
  },
];

export const platformKeyMap = oldPlatformList.reduce((acc, cur) => {
  acc[cur.value] = cur;
  return acc;
}, {});

const languageListMap = languageList.reduce(
  (result: any, item: { value: string; name: string }) => {
    result[item.value] = item;
    return result;
  },
  {}
);
const tempFlatPlatformLangList: any[] = [];
oldPlatformList.forEach((item) => {
  if (item.langs && item.langs.length) {
    item.langs.forEach((key) => {
      const platformLanItem = {
        ...languageListMap[key],
        originValue: key,
        originName: languageListMap[key].name,
        value: `${item.value}_${languageListMap[key].value}`,
        name: `${item.name}/${languageListMap[key].name}`,
        platformName: item.name,
        type: item.type,
        iconClass: item.iconClass,
      };
      if (languageListMap[key]) {
        item.children = [...(item.children || []), platformLanItem];
        tempFlatPlatformLangList.push(platformLanItem);
      } else {
        throw new Error("平台列表里的语言key有错误");
      }
    });
  } else {
    // item.children = [];
    tempFlatPlatformLangList.push({
      ...item,
      originName: item.name,
      iconClass: item.iconClass,
    });
  }
});

export const treePlatformLangList = oldPlatformList;
export const platformList = tempFlatPlatformLangList;

export const platformLangMap = tempFlatPlatformLangList.reduce(
  (result: any, item: any) => {
    result[item.value] = item;
    return result;
  },
  {}
);

export const apiPlatformLangList = oldPlatformList;

// 这个数据搬进数据库了，此处先注释，后面删除
// // 全标签
// const tagOptionsZh = [
//   // 产品
//   { value: "prod1", label: "云通讯产品" },
//   { value: "prod6", label: "Meta 元宇宙" },
//   { value: "prod2", label: "配套服务/插件" },
//   { value: "prod3", label: "说明" },
//   { value: "prod4", label: "FAQ" },
//   { value: "prod5", label: "低代码互动产品" },
//   // 场景
//   { value: "scene8", label: "Meta 元宇宙" },
//   { value: "scene1", label: "社交娱乐" },
//   { value: "scene2", label: "在线教育" },
//   { value: "scene3", label: "互动游戏" },
//   { value: "scene4", label: "协同办公" },
//   { value: "scene5", label: "电商直播" },
//   { value: "scene6", label: "物联网" },
//   { value: "scene7", label: "私有化" },
//   { value: "scene9", label: "医疗健康" },
//   // 客户端API
//   { value: "api1", label: "云通讯产品" },
//   { value: "api4", label: "Meta 元宇宙" },
//   { value: "api2", label: "配套服务/插件" },
//   { value: "api3", label: "旧版产品" },
//   // 服务端API
//   { value: "server1", label: "服务端API" },
//   // 旧版SDK
//   { value: "origin1", label: "旧版产品" },
//   { value: "origin2", label: "场景" },
//   // 套件
//   { value: "suit1", label: "套件" },
// ];
// const tagOptionsEn = [
//   // 产品
//   { value: "prod1", label: "Cloud Communications Products" },
//   { value: "prod6", label: "Metaverse" },
//   { value: "prod2", label: "Supporting Services" },
//   { value: "prod3", label: "Description" },
//   { value: "prod4", label: "FAQ" },
//   { value: "prod5", label: "Low-Code Products" },
//   // 场景
//   { value: "scene1", label: "Socializing" },
//   { value: "scene2", label: "Online Education" },
//   { value: "scene3", label: "Interactive Games" },
//   { value: "scene4", label: "Cooperative Office" },
//   { value: "scene5", label: "Livestream Shopping" },
//   { value: "scene6", label: "IOT" },
//   { value: "scene7", label: "On-premise" },
//   // 服务端API
//   { value: "api1", label: "Cloud Communications Products" },
//   { value: "api4", label: "Metaverse" },
//   { value: "api2", label: "Supporting Services" },
//   { value: "api3", label: "Old SDKs" },
//   // 服务端API
//   { value: "server1", label: "Server APIs" },
//   // 旧版SDK
//   { value: "origin1", label: "Old SDKs" },
//   { value: "origin2", label: "Scenarios" },
//   // 套件
//   { value: "suit1", label: "Suites" },
//   // 原版标签(该项目不会用到)
//   { value: "1", label: "Old Version - Platform" },
//   { value: "2", label: "Old Version - SDKs" },
//   { value: "3", label: "Old Version - Console" },
//   { value: "4", label: "Old Version - Scenarios" },
//   { value: "5", label: "Old Version - FAQ" },
//   { value: "6", label: "Old Version - SDK Plugins" },
//   { value: "8", label: "Old Version - SDKs2" },
// ];
// export const tagOptions = locale === "en" ? tagOptionsEn : tagOptionsZh;

// export const tagMap = tagOptions.reduce(
//   (result: any, item: { value: string; label: string }) => {
//     result[item.value] = item.label;
//     return result;
//   },
//   {}
// );

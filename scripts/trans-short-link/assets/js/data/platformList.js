// 完整复制 lib/trans-short-link/assets/js/data/platformList.ts 的JavaScript版本

const languageList = [
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

const getTreePlatformLangList = (locale) => {
  const iosOcSwiftList = locale === "en" ? ["swift", "objective-c"] : ["objective-c", "swift"];
  const oldPlatformList = [
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
      langs: ["arkts", "javascript"],
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
    ...(locale === "zh" ? [{
      value: "wxxcx",
      name: "小程序",
      langs: ["javascript"],
      type: "platform",
      iconClass: "doc-icon_language_wxmini",
    }] : []),
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
    ...(locale === "zh" ? [{
      value: "uni-app",
      name: "uni-app",
      langs: ["javascript"],
      type: "framework",
      iconClass: "doc-icon_language_uniapp",
    }] : []),
    {
      value: "react-native",
      name: "React Native",
      langs: ["javascript"],
      type: "framework",
      iconClass: "doc-icon_language_reactnative",
    },
    {
      value: "cocos-creator",
      name: "Cocos Creator",
      langs: ["typescript"],
      type: "framework",
      iconClass: "doc-icon_language_cocoscreator",
    },
  ];
  return oldPlatformList;
};

module.exports = {
  languageList,
  getTreePlatformLangList
};

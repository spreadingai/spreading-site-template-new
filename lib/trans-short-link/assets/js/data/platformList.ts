interface PlatformItem {
  value: string;
  name: string;
  langs?: string[];
  children?: any[];
  type?: string;
  iconClass?: string;
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

export const getTreePlatformLangList = (locale: string) => {
  const iosOcSwiftList =
    locale === "en" ? ["swift", "objective-c"] : ["objective-c", "swift"];
  const oldPlatformList: PlatformItem[] = [
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
  return oldPlatformList;
};

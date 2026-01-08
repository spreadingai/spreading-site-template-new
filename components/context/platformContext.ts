import { DisplayPlatform } from "@/lib/types";
import { Dispatch, SetStateAction, createContext } from "react";

type PlatformContentType = {
  currentPlatform: string;
  currentPlatformLabel: string;
  displayPlatforms: DisplayPlatform[];
  setCurrentPlatform?: Dispatch<SetStateAction<string>>;
  setCurrentPlatformLabel?: Dispatch<SetStateAction<string>>;
  setDisplayPlatforms?: Dispatch<SetStateAction<DisplayPlatform[]>>;
};

export const allPlatformItem = {
  platform: "all",
  platformLabel: "All platform",
  en_platformLabel: "All platform",
  zh_platformLabel: "所有平台",
};
export const addPlatformAllItem = (displayPlatforms) => {
  return displayPlatforms && displayPlatforms.length > 0
    ? [{ ...allPlatformItem }, ...displayPlatforms]
    : [];
};
export const defaultPlatform: string = allPlatformItem.platform;
export const defaultPlatformLabel: string = allPlatformItem.platformLabel;
export const defaultDisplayPlatforms: [] = [];

export const PlatformContext = createContext<PlatformContentType>({
  currentPlatform: defaultPlatform,
  currentPlatformLabel: defaultPlatformLabel,
  displayPlatforms: defaultDisplayPlatforms,
  setCurrentPlatform: (platform) => platform,
  setCurrentPlatformLabel: (platformLabel) => platformLabel,
  setDisplayPlatforms: (platforms) => platforms,
});

export const platformList = {
  "iOS: Objective-C": "doc-icon_language_ios",
  "iOS: Swift": "doc-icon_language_ios",
  "Android: Java": "doc-icon_language_android",
  "Android: Kotlin": "doc-icon_language_android",
  "macOS: Objective-C": "doc-icon_language_macos",
  "macOS: Swift": "doc-icon_language_macos",
  "macOS: C++": "doc-icon_language_macos",
  "macOS: C": "doc-icon_language_macos",
  "Windows: C++": "doc-icon_language_windows",
  "Windows: C#": "doc-icon_language_windows",
  "Windows: C": "doc-icon_language_windows",
  "HarmonyOS: ArkTS": "doc-icon_language_harmonyos",
  "Linux: C++": "doc-icon_language_linux",
  "Linux: Java": "doc-icon_language_linux",
  "Web: JS": "doc-icon_language_web",
  "Web: TS": "doc-icon_language_web",
  "小程序: JS": "doc-icon_language_wxmini",
  "小程序: TS": "doc-icon_language_wxmini",
  "Flutter: Dart": "doc-icon_language_flutter",
  "Electron: JS": "doc-icon_language_electron",
  "Unreal Engine: C++": "doc-icon_language_ue",
  "Unity3D: C#": "doc-icon_language_unity3d",
  "uni-app: JS": "doc-icon_language_uniapp",
  "uni-app: TS": "doc-icon_language_uniapp",
  "uni-app x: UTS": "doc-icon_language_uniapp",
  "uni-app (x): UTS": "doc-icon_language_uniapp",
  "React Native: JS": "doc-icon_language_reactnative",
  "React Native: TS": "doc-icon_language_reactnative",
  "Cocos Creator: TS": "doc-icon_language_cocoscreator",
  All: "doc-icon_language_web",
  Server: "doc-icon_language_web",
};

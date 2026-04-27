import type { InstanceGroup } from "@/lib/types";

// ---------------------------------------------------------------------------
// Group 映射：从 instanceGroups 构建 id → name
// ---------------------------------------------------------------------------

export function buildGroupMap(
  instanceGroups: InstanceGroup[],
): Map<string, string> {
  const map = new Map<string, string>();
  instanceGroups.forEach((g) => {
    if (g.id && g.name) {
      map.set(g.id, g.name);
    }
  });
  return map;
}

export function getGroupLabel(
  groupMap: Map<string, string>,
  groupId: string,
): string {
  return groupMap.get(groupId) || groupId;
}

// ---------------------------------------------------------------------------
// Platform 映射：当前 Algolia 中的 platform 值与显示值一致，无需转换
// 如后续需要调整，修改下方映射表即可
// ---------------------------------------------------------------------------

const PLATFORM_MAP: Record<string, Record<string, string>> = {
  zh: {
    "Android: Java": "Android: Java",
    "iOS: Objective-C": "iOS: Objective-C",
    "macOS: Objective-C": "macOS: Objective-C",
    "Windows: C++": "Windows: C++",
    "Web: JS": "Web: JS",
    "macOS: C++": "macOS: C++",
    "Flutter: Dart": "Flutter: Dart",
    "Unity3D: C#": "Unity3D: C#",
    "React Native: JS": "React Native: JS",
    "Linux: C++": "Linux: C++",
    "uni-app: JS": "uni-app: JS",
    "HarmonyOS: ArkTS": "HarmonyOS: ArkTS",
    "Electron: JS": "Electron: JS",
    "Cocos Creator: TS": "Cocos Creator: TS",
    "小程序: JS": "小程序: JS",
    "Windows: C#": "Windows: C#",
  },
  en: {
    "Android: Java": "Android: Java",
    "iOS: Objective-C": "iOS: Objective-C",
    "macOS: Objective-C": "macOS: Objective-C",
    "Windows: C++": "Windows: C++",
    "Web: JS": "Web: JS",
    "macOS: C++": "macOS: C++",
    "Flutter: Dart": "Flutter: Dart",
    "Unity3D: C#": "Unity3D: C#",
    "React Native: JS": "React Native: JS",
    "Linux: C++": "Linux: C++",
    "uni-app: JS": "uni-app: JS",
    "HarmonyOS: ArkTS": "HarmonyOS: ArkTS",
    "Electron: JS": "Electron: JS",
    "Cocos Creator: TS": "Cocos Creator: TS",
    "小程序: JS": "小程序: JS",
    "Windows: C#": "Windows: C#",
  },
};

export function getPlatformLabel(platform: string, language: string): string {
  const lang = language === "zh" ? "zh" : "en";
  return PLATFORM_MAP[lang]?.[platform] || platform;
}

// ---------------------------------------------------------------------------
// Doctype 映射：待确定具体映射关系，先占位
// ---------------------------------------------------------------------------

const DOCTYPE_MAP: Record<string, Record<string, string>> = {
  zh: {
    技术文档: "技术文档",
  },
  en: {
    技术文档: "Technical Doc",
  },
};

export function getDocTypeLabel(doctype: string, language: string): string {
  const lang = language === "zh" ? "zh" : "en";
  return DOCTYPE_MAP[lang]?.[doctype] || doctype;
}

// ---------------------------------------------------------------------------
// Facet row title 映射
// ---------------------------------------------------------------------------

const FACET_TITLE_MAP: Record<string, Record<string, string>> = {
  zh: { group: "产品/解决方案：", platform: "平台：" },
  en: { group: "Group: ", platform: "Platform: " },
};

export function getFacetTitle(attribute: string, language: string): string {
  const lang = language === "zh" ? "zh" : "en";
  return FACET_TITLE_MAP[lang]?.[attribute.toLowerCase()] || attribute;
}

// ---------------------------------------------------------------------------
// "全部" 按钮文案映射
// ---------------------------------------------------------------------------

const ALL_LABEL_MAP: Record<string, string> = {
  zh: "全部",
  en: "All",
};

export function getAllLabel(language: string): string {
  return ALL_LABEL_MAP[language === "zh" ? "zh" : "en"];
}

// ---------------------------------------------------------------------------
// "展开" 按钮文案映射
// ---------------------------------------------------------------------------

const EXPAND_LABEL_MAP: Record<string, string> = {
  zh: "展开",
  en: "More",
};

export function getExpandLabel(language: string): string {
  return EXPAND_LABEL_MAP[language === "zh" ? "zh" : "en"];
}

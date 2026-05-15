import type { InstanceGroup } from "@/lib/types";

// ---------------------------------------------------------------------------
// InstanceGroup IDs（从 docuo.config.zh.json / docuo.config.en.json 提取）
// ---------------------------------------------------------------------------

export const INSTANCE_GROUP_IDS: Record<string, string[]> = {
  zh: [
    "real_time_video_zh",
    "real_time_voice_zh",
    "live_streaming_zh",
    "zim_zh",
    "aiagent_zh",
    "aigc_digital_human_zh",
    "super_board_zh",
    "cloud_player_zh",
    "ai_effects_zh",
    "cloud_recording_zh",
    "local-recording",
    "analytics_dashboard_zh",
    "cloud_realtime_asr_zh",
    "callkit_zh",
    "live_streaming_kit_zh",
    "live_audio_room_kit_zh",
    "imkit_zh",
    "shumei-moderation-zh",
    "ai-voice-changer-zh",
    "real-time-translation-zh",
    "solution_audio_room_zh",
    "solution_live_streaming_zh",
    "solution_ktv_zh",
    "solution_online_fitness_zh",
    "solution_interactive_podcast_zh",
    "solution_large_class_ai_zh",
    "solution_large_class_zh",
    "solution_small_class_zh",
    "solution_online_music_lessons_zh",
    "solution_online_painting_lessons_zh",
    "solution_online_programming_lessons_zh",
    "solution_voice_call_zh",
    "solution_video_call_zh",
    "solution_meeting_zh",
    "solution_telemedicine_zh",
    // "console-zh",
    // "policies_and_agreements_zh",
    // "glossary_zh",
    "faq-zh",
  ],
  en: [
    "real_time_video",
    "real_time_voice",
    "live_streaming",
    "zim",
    "callkit",
    "live_streaming_kit",
    "live_audio_room_kit",
    "imkit",
    "video_conference_kit",
    "super_board",
    "cloud_realtime_asr",
    "cloud_player",
    "ai_effects",
    "cloud_recording",
    // "console",
    "analytics_dashboard",
    "aiagent_en",
    "aigc_digital_human",
    "faq-en",
  ],
};

// ---------------------------------------------------------------------------
// 随机获取一个 InstanceGroup ID
// ---------------------------------------------------------------------------

export function getRandomGroupId(language: string): string {
  const lang = language === "zh" ? "zh" : "en";
  const ids = INSTANCE_GROUP_IDS[lang];
  return ids[Math.floor(Math.random() * ids.length)];
}

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

// ---------------------------------------------------------------------------
// FeedbackBar 文案映射
// ---------------------------------------------------------------------------

const FEEDBACK_TEXT_MAP: Record<string, { text: string; btn: string }> = {
  zh: { text: "没有找到您查询的内容？", btn: "提交反馈" },
  en: { text: "Can't find what you're looking for?", btn: "Submit Feedback" },
};

export function getFeedbackText(language: string): {
  text: string;
  btn: string;
} {
  return FEEDBACK_TEXT_MAP[language === "zh" ? "zh" : "en"];
}

// ---------------------------------------------------------------------------
// HitsLoading 文案映射
// ---------------------------------------------------------------------------

const LOADING_TEXT_MAP: Record<string, string> = {
  zh: "加载中",
  en: "Loading",
};

export function getLoadingText(language: string): string {
  return LOADING_TEXT_MAP[language === "zh" ? "zh" : "en"];
}

// ---------------------------------------------------------------------------
// HitsEmpty 文案映射
// ---------------------------------------------------------------------------

const EMPTY_TEXT_MAP: Record<
  string,
  {
    main: string;
    feedback: string;
    suffix: string;
  }
> = {
  zh: {
    main: "未能检索到相关内容，建议您尝试其他关键词",
    feedback: "提交反馈",
    suffix: "进行反映",
  },
  en: {
    main: "No results found. Please try other keywords.",
    feedback: "Submit Feedback",
    suffix: "",
  },
};

export function getEmptyText(language: string): {
  main: string;
  feedback: string;
  suffix: string;
} {
  return EMPTY_TEXT_MAP[language === "zh" ? "zh" : "en"];
}

// ---------------------------------------------------------------------------
// AISuggestion 文案映射
// ---------------------------------------------------------------------------

const AI_SUGGESTION_MAP: Record<
  string,
  {
    prefix: string;
    link: string;
    suffix: string;
  }
> = {
  zh: {
    prefix: "搜索支持 ",
    link: "询问 AI 文档助手",
    suffix: " 啦！猜您想问：",
  },
  en: {
    prefix: "Search is now powered by ",
    link: "Ask AI Document Assistant",
    suffix: "! You might want to ask:",
  },
};

export function getAISuggestionText(language: string): {
  prefix: string;
  link: string;
  suffix: string;
} {
  return AI_SUGGESTION_MAP[language === "zh" ? "zh" : "en"];
}

// ---------------------------------------------------------------------------
// 问题来源开关：true 走 /prompts/welcome API，false 走本地模板
// ---------------------------------------------------------------------------
export const USE_API_SUGGESTIONS = false;

const AI_SUGGESTION_TEMPLATES: Record<string, string[]> = {
  zh: [
    "{query} 是什么",
    "{query} 快速入门教程",
    "如何接入 {query}",
    "{query} 如何解决",
  ],
  en: [
    "What is {query}",
    "{query} quick start tutorial",
    "How to connect {query}",
    "How to solve {query}",
  ],
};

const AI_SUGGESTION_DEFAULT: Record<string, string[]> = {
  zh: [
    "如何快速集成 SDK",
    "常见错误码及解决方案",
    "如何实现音视频通话",
    "SDK 支持哪些平台",
  ],
  en: [
    "How to quickly integrate SDK",
    "Common error codes and solutions",
    "How to implement audio/video calls",
    "Which platforms does SDK support",
  ],
};

export function getSuggestions(query: string, language: string): string[] {
  const lang = language === "zh" ? "zh" : "en";
  if (!query.trim()) return AI_SUGGESTION_DEFAULT[lang];
  const templates = AI_SUGGESTION_TEMPLATES[lang];
  return templates.map((t) => t.replace(/\{query\}/g, query));
}

// ---------------------------------------------------------------------------
// SearchBox placeholder 映射
// ---------------------------------------------------------------------------

const PLACEHOLDER_MAP: Record<string, Record<string, string>> = {
  zh: {
    default: "你可以输入文档关键词、开发问题、错误码",
    defaultMobile: "请输入文档关键词",
    dropdown: "请输入文档关键词",
  },
  en: {
    default: "Enter keywords, issues, and error codes",
    defaultMobile: "Enter keywords",
    dropdown: "Enter keywords",
  },
};

export function getPlaceholder(
  language: string,
  variant: "default" | "dropdown" = "default",
  isMobile = false,
): string {
  const lang = language === "zh" ? "zh" : "en";
  if (variant === "default" && isMobile) {
    return PLACEHOLDER_MAP[lang].defaultMobile;
  }
  return PLACEHOLDER_MAP[lang][variant];
}

// ---------------------------------------------------------------------------
// SearchHistory 映射
// ---------------------------------------------------------------------------

const SEARCH_HISTORY_TEXT: Record<string, { title: string; clear: string }> = {
  zh: { title: "搜索历史", clear: "清空" },
  en: { title: "Search History", clear: "Clear" },
};

export function getSearchHistoryText(language: string) {
  return SEARCH_HISTORY_TEXT[language === "zh" ? "zh" : "en"];
}

import React, { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import ThemeContext, { Theme } from "@/components/header/Theme.context";
import {
  LanguageContext,
  defaultLanguage,
} from "@/components/context/languageContext";

const SearchDropdown = dynamic(
  () => import("@/components/search/new/SearchDropdown"),
  { ssr: false },
);

// --- 域名白名单 ---
const WHITE_LIST = [
  "http://localhost:5666",
  "http://localhost:5668",
  "https://doc-zh.zego.im",
  "https://www.zegocloud.com",
  "https://docs.zegocloud.com",
];

// --- postMessage 工具 ---
function postToParent(data: Record<string, unknown>) {
  WHITE_LIST.forEach((domain) => {
    window.parent.postMessage({ origin: "search-embed", ...data }, domain);
  });
}

const SearchEmbedPage = () => {
  const [theme, setTheme] = useState<Theme>("light");
  const [language, setLanguage] = useState("zh");
  const containerRef = useRef<HTMLDivElement>(null);

  // 设置 #__next 样式 & 标记 embed 模式（阻止子组件移动端媒体查询生效）
  useEffect(() => {
    const nextEl = document.getElementById("__next");
    const bodyEl = document.body;
    if (nextEl) {
      nextEl.style.background = "unset";
      nextEl.style.overflow = "hidden";
    }
    bodyEl.style.overflow = "hidden";
    document.documentElement.setAttribute("data-embed", "true");
  }, []);

  // 监听父页面 postMessage
  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (!WHITE_LIST.includes(event.origin)) return;
      const data = event.data;
      if (!data || data.origin !== "zego parent") return;

      if (data.type === "init") {
        if (data.language) setLanguage(data.language as string);
        if (data.theme) setTheme(data.theme as Theme);
      } else if (data.type === "setTheme") {
        setTheme(data.theme as Theme);
      } else if (data.type === "setLanguage") {
        setLanguage(data.language as string);
      } else if (data.type === "collapsePanel") {
        window.dispatchEvent(new CustomEvent("collapse-search-panel"));
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  // 事件委托：拦截搜索结果 <a> 点击 → postMessage
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handler = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (href && href !== "#") {
        e.preventDefault();
        postToParent({ type: "openUrl", url: href });
      }
    };
    container.addEventListener("click", handler);
    return () => container.removeEventListener("click", handler);
  }, []);

  // 监听 SearchDropdown 发出的 CustomEvent("open-ask-ai") → postMessage
  useEffect(() => {
    const handler = (e: Event) => {
      const { message, defaultQuestions } = (e as CustomEvent).detail || {};
      postToParent({ type: "openAI", message, defaultQuestions });
    };
    window.addEventListener("open-ask-ai", handler);
    return () => window.removeEventListener("open-ask-ai", handler);
  }, []);

  // ResizeObserver：监听 searchDropdownPanel 高度变化
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let resizeObserver: ResizeObserver | null = null;

    const reportHeight = () => {
      const panel = container.querySelector('[class*="searchDropdownPanel"]');
      if (!panel) return;
      const containerTop = container.getBoundingClientRect().top;
      const panelRect = panel.getBoundingClientRect();
      const height = panelRect.top - containerTop + panelRect.height;
      postToParent({ type: "resize", height: height || 38 });
    };

    const observePanel = (panel: Element) => {
      if (resizeObserver) resizeObserver.disconnect();
      resizeObserver = new ResizeObserver(reportHeight);
      resizeObserver.observe(panel);
      reportHeight();
    };

    // 用 MutationObserver 检测面板出现，然后监听它的尺寸变化
    const panel = container.querySelector('[class*="searchDropdownPanel"]');
    if (panel) {
      observePanel(panel);
    }

    const mutationObserver = new MutationObserver(() => {
      const panel = container.querySelector('[class*="searchDropdownPanel"]');
      if (panel) observePanel(panel);
    });
    mutationObserver.observe(container, { childList: true, subtree: true });

    return () => {
      resizeObserver?.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  // LanguageContext value
  const languageValue = useCallback(
    (lang: string) => ({
      currentLanguage: lang,
      currentLanguageLabel: lang === "zh" ? "中文" : "English",
      displayLanguages: [],
      setCurrentLanguage: () => {},
      setCurrentLanguageLabel: () => {},
    }),
    [],
  );

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <LanguageContext.Provider value={languageValue(language)}>
        <div ref={containerRef}>
          <SearchDropdown isEmbed={true} />
        </div>
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  );
};

export default SearchEmbedPage;

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const AskAIModal = dynamic(() => import("@/components/header/AskAI/modal"), {
  ssr: false,
});

// --- 域名白名单 ---
const WHITE_LIST_EN = [
  "https://dev-beta.zegocloud.com",
  "http://localhost:5668",
  "https://www.zegocloud.com",
  "https://docs.zegocloud.com",
  "https://uikit.spreading.io",
  "https://localhost:3335",
];
const WHITE_LIST_ZH = [
  "http://localhost:5666",
  "https://doc-zh.zego.im",
  "https://zegoim.spreading.io",
  // 控制台
  "https://console.zego.im",
  "https://console-preview.zego.im",
  "https://console-beta.zego.im",
  "https://balala.zego.im:8989",
];

interface Props {
  language: string;
}

const AISearchView = ({ language }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [iframeData, setIframeData] = useState<{
    product: string;
    platform: string;
    message: string;
    defaultQuestions: [];
  }>({
    product: "",
    platform: "",
    message: "",
    defaultQuestions: [],
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const onCloseHandle = () => {
    const WHITE_LIST = language === "zh" ? WHITE_LIST_ZH : WHITE_LIST_EN;
    setIsModalOpen(false);
    WHITE_LIST.forEach((domain) => {
      console.log("[AISearchPage] send message to zego");
      window.parent.postMessage(
        {
          origin: "docuo children",
          close: true,
        },
        domain,
      );
    });
  };

  useEffect(() => {
    const WHITE_LIST = language === "zh" ? WHITE_LIST_ZH : WHITE_LIST_EN;
    const receiveMessage = (event: MessageEvent) => {
      if (!WHITE_LIST.includes(event.origin)) return;

      if (!event.data || event.data.origin !== "zego parent") {
        return;
      }

      event.source.postMessage({
        origin: "docuo children",
      });

      console.log("[AISearchPage] receive message from zego", event.data);
      if (event.data.open) {
        showModal();
        setIframeData({
          ...event.data,
        });
      }
      // 父页面指令：关闭弹框
      // 1) 通过事件让 Modal 内部取消正在进行的流式请求
      // 2) 直接 setIsModalOpen(false) 关闭弹框
      // 不调用 onCloseHandle，避免向父页面回传 close 消息造成循环
      if (event.data.close) {
        window.dispatchEvent(new CustomEvent("cancel-ask-ai-stream"));
        setIsModalOpen(false);
      }
    };
    window.addEventListener("message", receiveMessage, false);
    return () => {
      window.removeEventListener("message", receiveMessage, false);
    };
  }, []);

  return (
    <AskAIModal
      rootClassName="ai-search-page"
      isModalOpen={isModalOpen}
      onCloseHandle={onCloseHandle}
      currentTheme="light"
      currentLanguage={language}
      // currentGroup={iframeData.product}
      // currentPlatform={iframeData.platform}
      initialMessage={iframeData.message}
      defaultQuestions={iframeData.defaultQuestions}
    />
  );
};

export default AISearchView;

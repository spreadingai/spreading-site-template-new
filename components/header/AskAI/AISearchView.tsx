import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const AskAIModal = dynamic(() => import("@/components/header/AskAI/modal"), {
  ssr: false,
});

// --- 域名白名单 ---
const WHITE_LIST_EN = [
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

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const AskAIModal = dynamic(() => import("@/components/header/AskAI/modal"), {
  ssr: false,
});

const whiteList = [
  "http://localhost:5666",
  "http://localhost:5668",
  "https://doc-zh.zego.im",
  "https://www.zegocloud.com",
  "https://docs.zegocloud.com",
];

interface Props {}

const AISearchPage = (props: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [iframeData, setIframeData] = useState<{
    language: string;
    product: string;
    platform: string;
  }>({ language: "zh", product: "", platform: "" });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const onCloseHandle = () => {
    setIsModalOpen(false);
    const language = iframeData.language;
    const targetDomain =
      process.env.NODE_ENV === "development"
        ? language === "zh"
          ? whiteList[0]
          : whiteList[1]
        : language === "zh"
          ? whiteList[2]
          : whiteList[3];
    window.parent.postMessage(
      {
        origin: "docuo children",
        close: true,
      },
      targetDomain,
    );
    window.parent.postMessage(
      {
        origin: "docuo children",
        close: true,
      },
      whiteList[4],
    );
  };

  useEffect(() => {
    const receiveMessage = (event: MessageEvent) => {
      if (!whiteList.includes(event.origin)) return;

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
      currentLanguage={iframeData.language}
      currentGroup={iframeData.product}
      currentPlatform={iframeData.platform}
    />
  );
};

export default AISearchPage;

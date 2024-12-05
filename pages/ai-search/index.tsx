import React, { useEffect, useRef, useState } from "react";
import AISearchModal from "@/components/header/AISearch/modal";
// import { useRouter } from "next/router";

const whiteList = [
  "http://localhost:5666",
  "http://localhost:5668",
  "https://doc-zh.zego.im",
  "https://www.zegocloud.com",
];

interface Props {}

const AISearchPage = (props: Props) => {
  // const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const iframeData = useRef<{
    language: string;
    product: string;
    platform: string;
  }>({ language: "zh", product: "", platform: "" });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const onCloseHandle = () => {
    setIsModalOpen(false);
    const language = iframeData.current.language;
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
      targetDomain
    );
  };

  // useEffect(() => {
  //   if (
  //     !window.top ||
  //     window.self === window.top ||
  //     !whiteList.includes(window.top.origin)
  //   ) {
  //     router.push({ pathname: "/" });
  //   }
  // }, []);

  useEffect(() => {
    const receiveMessage = (event) => {
      if (!whiteList.includes(event.origin)) return;

      if (!event.data || event.data.origin !== "zego parent") {
        return;
      }

      event.source.postMessage({
        origin: "docuo children",
      });

      // Parse data
      console.log("[AISearchPage] receive message from zego", event.data);
      if (event.data.open) {
        showModal();
        iframeData.current = event.data;
      }
    };
    window.addEventListener("message", receiveMessage, false);
    return () => {
      window.removeEventListener("message", receiveMessage, false);
    };
  }, []);

  return (
    <AISearchModal
      rootClassName="ai-search-page"
      isModalOpen={isModalOpen}
      onCloseHandle={onCloseHandle}
      currentTheme="light"
      currentLanguage={iframeData.current.language}
      currentGroup={iframeData.current.product}
      currentPlatform={iframeData.current.platform}
    />
  );
};

export default AISearchPage;

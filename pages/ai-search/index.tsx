import React, { useEffect, useRef, useState } from "react";
// import AISearchModal from "@/components/header/AISearch/modal";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const NewAISearchModal = dynamic(
  () => import("@/components/header/AISearch/modal-new"),
  {
    ssr: false,
  }
);

const whiteList = [
  "http://localhost:5666",
  "http://localhost:5668",
  "https://doc-zh.zego.im",
  "https://www.zegocloud.com",
  "https://docs.zegocloud.com",
];

interface Props {}

const AISearchPage = (props: Props) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [iframeData, setIframeData] = useState<{
    language: string;
    product: string;
    platform: string;
  }>({ language: "zh", product: "", platform: "" });
  // const iframeData = useRef<{
  //   language: string;
  //   product: string;
  //   platform: string;
  // }>({ language: "zh", product: "", platform: "" });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const onCloseHandle = () => {
    setIsModalOpen(false);
    // const language = iframeData.current.language;
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
      targetDomain
    );
    window.parent.postMessage(
      {
        origin: "docuo children",
        close: true,
      },
      whiteList[4]
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
        // iframeData.current = { ...event.data };
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

  // useEffect(() => {
  //   // test
  //   setTimeout(() => {
  //     showModal();
  //     setIframeData({
  //       language: "zh",
  //       product: "real_time_voice_zh",
  //       platform: "Android: Java",
  //     });
  //   }, 3000);
  // }, []);

  return (
    <NewAISearchModal
      rootClassName="ai-search-page"
      isModalOpen={isModalOpen}
      onCloseHandle={onCloseHandle}
      currentTheme="light"
      // currentLanguage={iframeData.current.language}
      // currentGroup={iframeData.current.product}
      // currentPlatform={iframeData.current.platform}
      currentLanguage={iframeData.language}
      currentGroup={iframeData.product}
      currentPlatform={iframeData.platform}
    />
  );
};

export default AISearchPage;

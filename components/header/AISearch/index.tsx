import React, { useState } from "react";
import styles from "./index.module.scss";
import useLanguage from "@/components/hooks/useLanguage";
// import AISearchModal from "./modal";
import ThemeContext from "../Theme.context";
import useGroup from "@/components/hooks/useGroup";
import usePlatform from "@/components/hooks/usePlatform";
import iconAshAI from "@/assets/icons/ai-search/icon_ask_ai.png";
import Image from "next/image";
import dynamic from "next/dynamic";

// 使用新的AskAI组件
const AskAIModal = dynamic(() => import("../AskAI/modal"), {
  ssr: false,
});
// const NewAISearchModal = dynamic(() => import("../AISearch/modal-new"), {
//   ssr: false,
// });

const AISearch = () => {
  const { theme } = React.useContext(ThemeContext);
  const { currentLanguage } = useLanguage();
  const { currentGroup } = useGroup();
  const { currentPlatform } = usePlatform();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const onCloseHandle = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles["ai-search-wrap"]}>
      <div onClick={showModal} className={styles["ai-btn"]}>
        <Image src={iconAshAI} alt="" decoding="async" />
      </div>
      {/* 使用新的AskAI模态框 */}
      <AskAIModal
        isModalOpen={isModalOpen}
        onCloseHandle={onCloseHandle}
        currentTheme={theme}
        currentLanguage={currentLanguage}
        currentGroup={currentGroup}
        currentPlatform={currentPlatform}
      />
      {/* 保留原有的AISearch模态框作为备用，可以通过环境变量或配置切换 */}
      {/*
      <NewAISearchModal
        isModalOpen={isModalOpen}
        onCloseHandle={onCloseHandle}
        currentTheme={theme}
        currentLanguage={currentLanguage}
        currentGroup={currentGroup}
        currentPlatform={currentPlatform}
      /> 
      */}
    </div>
  );
};

export default AISearch;

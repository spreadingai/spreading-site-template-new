import React, { useState } from "react";
import styles from "./index.module.scss";
import useLanguage from "@/components/hooks/useLanguage";
import ThemeContext from "../Theme.context";
import useGroup from "@/components/hooks/useGroup";
import usePlatform from "@/components/hooks/usePlatform";
import iconAshAI from "@/assets/icons/ai-search/icon_ask_ai.png";

import dynamic from "next/dynamic";

const AskAIModal = dynamic(() => import("../AskAI/modal"), {
  ssr: false,
});
const AISearch = () => {
  const { theme } = React.useContext(ThemeContext);
  const { currentLanguage } = useLanguage();
  const { currentGroupLabel } = useGroup();
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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={iconAshAI.src}
          alt=""
          decoding="async"
          loading="lazy"
          // fetchPriority="low"
          width={iconAshAI.width}
          height={iconAshAI.height}
        />
      </div>
      <AskAIModal
        isModalOpen={isModalOpen}
        onCloseHandle={onCloseHandle}
        currentTheme={theme}
        currentLanguage={currentLanguage}
        currentGroup={currentGroupLabel}
        currentPlatform={currentPlatform}
      />
    </div>
  );
};

export default AISearch;

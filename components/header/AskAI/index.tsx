import React, { useState } from "react";
import styles from "./index.module.scss";
import useLanguage from "@/components/hooks/useLanguage";
import ThemeContext from "../Theme.context";
import useGroup from "@/components/hooks/useGroup";
import usePlatform from "@/components/hooks/usePlatform";
import iconAshAI from "@/assets/icons/ai-search/icon_ask_ai.png";
import Image from "next/image";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const AskAIModal = dynamic(() => import("./modal"), {
  ssr: false,
});

interface Props {}

const AskAI: React.FC<Props> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { currentLanguage } = useLanguage();
  const { currentGroup } = useGroup();
  const { currentPlatform } = usePlatform();
  const router = useRouter();
  const { theme } = React.useContext(ThemeContext);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const onCloseHandle = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles["ask-ai-wrap"]}>
      <div onClick={showModal} className={styles["ai-btn"]}>
        <Image src={iconAshAI} alt="" decoding="async" />
      </div>
      <AskAIModal
        isModalOpen={isModalOpen}
        onCloseHandle={onCloseHandle}
        currentTheme={theme}
        currentLanguage={currentLanguage}
        currentGroup={currentGroup}
        currentPlatform={currentPlatform}
      />
    </div>
  );
};

export default AskAI;

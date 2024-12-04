import React, { useState } from "react";
import styles from "./index.module.scss";
import useLanguage from "@/components/hooks/useLanguage";
import { copywriting } from "@/components/constant/language";
import AISearchModal from "./modal";
import ThemeContext from "../Theme.context";
import useGroup from "@/components/hooks/useGroup";
import usePlatform from "@/components/hooks/usePlatform";
import iconAshAI from "@/assets/icons/ai-search/icon_ask_ai.png";
import Image from "next/image";

interface Props {}

const AISearch = (props: Props) => {
  const { theme } = React.useContext(ThemeContext);
  const { currentLanguage } = useLanguage();
  const { currentGroup } = useGroup();
  const { currentPlatform } = usePlatform();

  const aiSearchData = copywriting[currentLanguage].aiSearch;

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
      <AISearchModal
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

export default AISearch;

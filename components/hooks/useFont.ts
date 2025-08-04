import { useEffect } from "react";
import useLanguage from "@/components/hooks/useLanguage";
import FontManager from "@/lib/font";

export const useFont = () => {
  const { currentLanguage } = useLanguage();
  const fontManager = FontManager.getInstance();

  useEffect(() => {
    // 当语言改变时更新字体
    fontManager.setLanguage(currentLanguage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLanguage]);

  return {
    currentLanguage,
    fontManager,
  };
};

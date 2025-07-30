import { useEffect } from "react";
import useLanguage from "@/components/hooks/useLanguage";
import FontManager from "@/lib/font";

const FontInitializer = () => {
  const { currentLanguage } = useLanguage();

  useEffect(() => {
    const fontManager = FontManager.getInstance();
    fontManager.setLanguage(currentLanguage);
  }, [currentLanguage]);

  return null; // 这是一个纯逻辑组件，不渲染任何内容
};

export default FontInitializer;

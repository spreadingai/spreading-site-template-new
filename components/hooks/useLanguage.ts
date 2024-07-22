import { useContext } from "react";
import { LanguageContext } from "../context/languageContext";

const useLanguage = () => {
  return useContext(LanguageContext);
};

export default useLanguage;

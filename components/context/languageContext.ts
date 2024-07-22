import { DisplayLanguage } from "@/lib/types";
import { Dispatch, SetStateAction, createContext } from "react";

type LanguageContentType = {
  currentLanguage: string;
  currentLanguageLabel: string;
  displayLanguages: DisplayLanguage[];
  setCurrentLanguage?: Dispatch<SetStateAction<string>>;
  setCurrentLanguageLabel?: Dispatch<SetStateAction<string>>;
  setDisplayLanguages?: Dispatch<SetStateAction<[]>>;
};

export const defaultLanguage: string = "en";
export const defaultLanguageLabel: string = "en";
export const defaultDisplayLanguages: [] = [];

export const LanguageContext = createContext<LanguageContentType>({
  currentLanguage: defaultLanguage,
  currentLanguageLabel: defaultLanguageLabel,
  displayLanguages: defaultDisplayLanguages,
  setCurrentLanguage: (language) => language,
  setCurrentLanguageLabel: (languageLabel) => languageLabel,
  setDisplayLanguages: (languages) => languages,
});

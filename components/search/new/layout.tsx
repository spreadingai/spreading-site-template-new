import React, { useCallback, useEffect, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import LibControllerImpl from "@/lib/client";
import LanguageControllerImpl from "@/lib/client/language-help";
import ThemeContext, { Theme } from "@/components/header/Theme.context";
import {
  LanguageContext,
  defaultLanguage,
  defaultLanguageLabel,
} from "@/components/context/languageContext";
import { SetContext } from "@/components/context/setContext";
import useColors from "@/components/hooks/useColors";
import useColorMode from "@/components/hooks/useColorMode";
import Header from "@/components/header";
import SearchMeta from "@/components/meta/SearchMeta";
import { DocuoConfig } from "@/lib/types";

type Props = {
  inputDocuoConfig: DocuoConfig;
  children: React.ReactNode;
};

const SearchLayout = ({ children, inputDocuoConfig }: Props) => {
  const [theme, setTheme] = useState<Theme>("light");
  LibControllerImpl.setClientDocuoConfig(inputDocuoConfig);
  const docuoConfig = LibControllerImpl.getClientDocuoConfig();
  const gaId = docuoConfig?.analytics?.ga4?.measurementId;
  useColorMode(docuoConfig.themeConfig?.colorMode, theme, setTheme);
  useColors(docuoConfig.themeConfig?.colors);

  const { displayLanguages: _displayLanguages } =
    LanguageControllerImpl.getDisplayLanguages();
  const [currentLanguage, setCurrentLanguage] = useState(
    _displayLanguages[0]?.language || defaultLanguage
  );
  const [currentLanguageLabel, setCurrentLanguageLabel] = useState(
    _displayLanguages[0]?.languageLabel || defaultLanguageLabel
  );

  const setLanguage = useCallback(
    (language: string) => {
      const target = LanguageControllerImpl.getDisplayLanguage(
        language,
        _displayLanguages
      );
      if (target) {
        setCurrentLanguage(language);
        setCurrentLanguageLabel(target.languageLabel);
        return language;
      }
      return "";
    },
    [_displayLanguages]
  );

  const handleLanguageChanged = useCallback(
    ({ key: language }: { key: string; initChild?: boolean }) => {
      const _language = setLanguage(language);
      if (_language) {
        localStorage.setItem("search-language", language);
      }
    },
    [setLanguage]
  );

  // Restore language from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("search-language");
    if (saved) {
      setLanguage(saved);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Other Set handlers are no-ops (not used by the new search page)
  const noop = useCallback(() => {}, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <LanguageContext.Provider
        value={{
          currentLanguage,
          currentLanguageLabel,
          displayLanguages: _displayLanguages,
          setCurrentLanguage,
          setCurrentLanguageLabel,
        }}
      >
        <SetContext.Provider
          value={{
            handleLanguageChanged,
            handleGroupChanged: noop,
            handlePlatformChanged: noop,
            handleVersionChanged: noop,
            handleTabChanged: noop,
          }}
        >
          <div className="search-screen relative">
            {!!gaId && <GoogleAnalytics gaId={gaId} />}
            <SearchMeta />
            <Header docuoConfig={docuoConfig} isSearchPage={true} />
            <main className="search-main">{children}</main>
          </div>
        </SetContext.Provider>
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  );
};

export default SearchLayout;

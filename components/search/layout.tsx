import React, { useState } from "react";
import LibControllerImpl from "@/lib/client";
import LanguageControllerImpl from "@/lib/client/language-help";
import VersionsControllerImpl from "@/lib/client/versions-help";
import GroupControllerImpl from "@/lib/client/group-help";
import PlatformControllerImpl from "@/lib/client/platform-help";
import ThemeContext, { Theme } from "@/components/header/Theme.context";
import {
  LanguageContext,
  defaultLanguage,
  defaultLanguageLabel,
} from "@/components/context/languageContext";
import {
  InstanceContext,
  defaultInstance,
  defaultInstanceLabel,
} from "@/components/context/instanceContext";
import {
  VersionContext,
  defaultDocVersion,
} from "@/components/context/versionContext";
import {
  GroupContext,
  defaultGroup,
  defaultGroupLabel,
} from "@/components/context/groupContext";
import {
  PlatformContext,
  defaultPlatform,
  defaultPlatformLabel,
} from "@/components/context/platformContext";
import useColors from "@/components/hooks/useColors";
import useColorMode from "@/components/hooks/useColorMode";
import { GoogleAnalytics } from "@next/third-parties/google";
import Header from "@/components/header";
import PageBg from "@/components/PageBg";

type Props = {
  allUsedVersions: Record<string, string[]>;
  children: React.ReactNode;
};

const Layout = ({ children, allUsedVersions }: Props) => {
  const [theme, setTheme] = useState<Theme>("light");
  const docuoConfig = LibControllerImpl.getDocuoConfig();
  const gaId = docuoConfig?.analytics?.ga4?.measurementId;
  useColorMode(docuoConfig.themeConfig?.colorMode, theme, setTheme);
  useColors(docuoConfig.themeConfig?.colors);

  const { displayLanguages } = LanguageControllerImpl.getDisplayLanguages();
  const [currentLanguage, setCurrentLanguage] = useState(defaultLanguage);
  const [currentLanguageLabel, setCurrentLanguageLabel] =
    useState(defaultLanguageLabel);

  const displayInstances =
    LibControllerImpl.getDisplayInstances(currentLanguage);
  const [instanceID, setInstanceID] = useState(defaultInstance);
  const [currentInstanceLabel, setCurrentInstanceLabel] =
    useState(defaultInstanceLabel);

  const displayVersions = VersionsControllerImpl.getDisplayVersions(
    instanceID,
    allUsedVersions
  );
  const [docVersion, setDocVersion] = useState(defaultDocVersion);

  const { displayGroups } = GroupControllerImpl.getDisplayGroups(
    instanceID,
    currentLanguage
  );
  const [currentGroup, setCurrentGroup] = useState(defaultGroup);
  const [currentGroupLabel, setCurrentGroupLabel] = useState(defaultGroupLabel);

  const { displayPlatforms } = PlatformControllerImpl.getDisplayPlatforms(
    instanceID,
    currentLanguage
  );
  const [currentPlatform, setCurrentPlatform] = useState(defaultPlatform);
  const [currentPlatformLabel, setCurrentPlatformLabel] =
    useState(defaultPlatformLabel);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <LanguageContext.Provider
        value={{
          currentLanguage,
          currentLanguageLabel,
          displayLanguages,
          setCurrentLanguage,
          setCurrentLanguageLabel,
        }}
      >
        <InstanceContext.Provider
          value={{
            instanceID,
            currentInstanceLabel,
            displayInstances,
            setInstanceID,
            setCurrentInstanceLabel,
          }}
        >
          <VersionContext.Provider
            value={{
              docVersion,
              displayVersions,
              setDocVersion,
            }}
          >
            <GroupContext.Provider
              value={{
                currentGroup,
                currentGroupLabel,
                displayGroups,
                setCurrentGroup,
                setCurrentGroupLabel,
              }}
            >
              <PlatformContext.Provider
                value={{
                  currentPlatform,
                  currentPlatformLabel,
                  displayPlatforms,
                  setCurrentPlatform,
                  setCurrentPlatformLabel,
                }}
              >
                <div className="search-screen relative">
                  {!!gaId && <GoogleAnalytics gaId={gaId} />}
                  <Header
                    docuoConfig={docuoConfig}
                    isSearchPage={true}
                  ></Header>
                  <PageBg />
                  <main className="search-main">{children}</main>
                </div>
              </PlatformContext.Provider>
            </GroupContext.Provider>
          </VersionContext.Provider>
        </InstanceContext.Provider>
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  );
};

export default Layout;

// Warning: Not compatible with previous versions of navigationInfo
import React, { useCallback, useState } from "react";
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
  VersionContext,
  defaultDocVersion,
  defaultSlugVersion,
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
import { SetContext } from "@/components/context/setContext";
import useColors from "@/components/hooks/useColors";
import useColorMode from "@/components/hooks/useColorMode";
import { GoogleAnalytics } from "@next/third-parties/google";
import Header from "@/components/header";
import PageBg from "@/components/PageBg";
import SearchMeta from "@/components/meta/SearchMeta";

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

  // languages
  const { displayLanguages } = LanguageControllerImpl.getDisplayLanguages();
  const [currentLanguage, setCurrentLanguage] = useState(
    displayLanguages[0]?.language || defaultLanguage
  );
  const [currentLanguageLabel, setCurrentLanguageLabel] = useState(
    displayLanguages[0]?.languageLabel || defaultLanguageLabel
  );

  // groups
  const [displayGroups, setDisplayGroups] = useState(
    GroupControllerImpl.getDisplayGroups(currentLanguage).displayGroups
  );
  const [currentGroup, setCurrentGroup] = useState(
    displayGroups[0]?.group || defaultGroup
  );
  const [currentGroupLabel, setCurrentGroupLabel] = useState(
    displayGroups[0]?.groupLabel || defaultGroupLabel
  );

  // platforms
  const [displayPlatforms, setDisplayPlatforms] = useState(
    PlatformControllerImpl.getDisplayPlatforms(currentGroup, currentLanguage)
      .displayPlatforms
  );
  const [currentPlatform, setCurrentPlatform] = useState(
    displayPlatforms[0]?.platform || defaultPlatform
  );
  const [currentPlatformLabel, setCurrentPlatformLabel] = useState(
    displayPlatforms[0]?.platformLabel || defaultPlatformLabel
  );

  // versions
  const [displayVersions, setDisplayVersions] = useState(
    VersionsControllerImpl.getDisplayVersions(
      currentGroup,
      currentPlatform,
      currentLanguage,
      allUsedVersions
    )
  );
  const [slugVersion, setSlugVersion] = useState(
    displayVersions[0]?.version || defaultSlugVersion
  );
  const [docVersion, setDocVersion] = useState(
    displayVersions[0]?.version || defaultDocVersion
  );

  const setLanguage = useCallback(
    (language: string) => {
      const target = displayLanguages.find(
        (item) => item.language === language
      );
      setCurrentLanguage(language);
      target && setCurrentLanguageLabel(target.languageLabel);
    },
    [displayLanguages, setCurrentLanguage, setCurrentLanguageLabel]
  );
  const handleLanguageChanged = ({ key: language }) => {
    setLanguage(language);

    // update group
    const _currentGroup = updateGroup(language);

    // update platform
    const _currentPlatform = updatePlatform(_currentGroup, language);

    // update version
    updateVersion(_currentGroup, _currentPlatform, language);
  };

  const setGroup = useCallback(
    (group: string) => {
      const target = displayGroups.find((item) => item.group === group);
      setCurrentGroup(group);
      target && setCurrentGroupLabel(target.groupLabel);
    },
    [displayGroups]
  );
  const updateGroup = useCallback(
    (language) => {
      const _displayGroups =
        GroupControllerImpl.getDisplayGroups(language).displayGroups;
      const _currentGroup = _displayGroups[0]?.group || defaultGroup;
      setDisplayGroups(_displayGroups);
      setGroup(_currentGroup);
      return _currentGroup;
    },
    [setGroup]
  );
  const handleGroupChanged = ({ key: group }) => {
    setGroup(group);
    // update platform
    const _currentPlatform = updatePlatform(group, currentLanguage);
    // update version
    updateVersion(group, _currentPlatform, currentLanguage);
  };

  const setPlatform = useCallback(
    (platform: string) => {
      const target = displayPlatforms.find(
        (item) => item.platform === platform
      );
      setCurrentPlatform(platform);
      target && setCurrentPlatformLabel(target.platformLabel);
    },
    [displayPlatforms]
  );
  const updatePlatform = useCallback(
    (_currentGroup, language) => {
      const _displayPlatforms = PlatformControllerImpl.getDisplayPlatforms(
        _currentGroup,
        language
      ).displayPlatforms;
      const temp1 = _displayPlatforms.find(
        (displayPlaytform) => displayPlaytform.platform === currentPlatform
      );
      const _currentPlatform = temp1
        ? temp1.platform
        : _displayPlatforms[0]?.platform || defaultPlatform;
      setDisplayPlatforms(_displayPlatforms);
      setPlatform(_currentPlatform);
      return _currentPlatform;
    },
    [currentPlatform, setPlatform]
  );
  const handlePlatformChanged = ({ key: platform }) => {
    setPlatform(platform);
    // update version
    updateVersion(currentGroup, platform, currentLanguage);
  };

  const setVersion = useCallback(
    (version) => {
      setDocVersion(version);
      setSlugVersion(version);
    },
    [setDocVersion, setSlugVersion]
  );
  const updateVersion = useCallback(
    (_currentGroup, _currentPlatform, language) => {
      const _displayVersions = VersionsControllerImpl.getDisplayVersions(
        _currentGroup,
        _currentPlatform,
        language,
        allUsedVersions
      );
      const temp2 = _displayVersions.find(
        (displayVersion) => displayVersion.version === docVersion
      );
      const _version = temp2
        ? temp2.version
        : displayVersions[0]?.version || defaultDocVersion;
      setDisplayVersions(_displayVersions);
      setVersion(_version);
      return _version;
    },
    [allUsedVersions, displayVersions, docVersion, setVersion]
  );
  const handleVersionChanged = ({ key: version }) => {
    setVersion(version);
  };

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
        <GroupContext.Provider
          value={{
            currentGroup,
            currentGroupLabel,
            displayGroups,
            setCurrentGroup,
            setCurrentGroupLabel,
            setDisplayGroups,
          }}
        >
          <PlatformContext.Provider
            value={{
              currentPlatform,
              currentPlatformLabel,
              displayPlatforms,
              setCurrentPlatform,
              setCurrentPlatformLabel,
              setDisplayPlatforms,
            }}
          >
            <VersionContext.Provider
              value={{
                docVersion,
                slugVersion,
                displayVersions,
                setSlugVersion,
                setDocVersion,
                setDisplayVersions,
              }}
            >
              <SetContext.Provider
                value={{
                  handleLanguageChanged,
                  handleGroupChanged,
                  handlePlatformChanged,
                  handleVersionChanged,
                }}
              >
                <div className="search-screen relative">
                  {!!gaId && <GoogleAnalytics gaId={gaId} />}
                  <SearchMeta />
                  <Header
                    docuoConfig={docuoConfig}
                    isSearchPage={true}
                  ></Header>
                  <PageBg />
                  <main className="search-main">{children}</main>
                </div>
              </SetContext.Provider>
            </VersionContext.Provider>
          </PlatformContext.Provider>
        </GroupContext.Provider>
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  );
};

export default Layout;

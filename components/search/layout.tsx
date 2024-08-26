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
  InstanceContext,
  defaultInstanceID,
  defaultInstanceLabel,
} from "@/components/context/instanceContext";
import {
  VersionContext,
  defaultDocVersion,
  defaultSlugVersion,
} from "@/components/context/versionContext";
import {
  GroupContext,
  allGroupItem,
  defaultGroup,
  defaultGroupLabel,
} from "@/components/context/groupContext";
import {
  PlatformContext,
  allPlatformItem,
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
import {
  DisplayGroup,
  DisplayInstance,
  DisplayPlatform,
  DisplayVersion,
} from "@/lib/types";

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

  // instances
  const [displayInstances, setDisplayInstances] = useState(
    LibControllerImpl.getDisplayInstances(currentLanguage)
  );
  const [instanceID, setInstanceID] = useState(
    displayInstances[0]?.instance?.id || defaultInstanceID
  );
  const [currentInstanceLabel, setCurrentInstanceLabel] = useState(
    displayInstances[0]?.instance?.label || defaultInstanceLabel
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

  // version
  const setVersion = useCallback(
    (version: string, _displayVersions?: DisplayVersion[]) => {
      console.log("[Layout]setVersion", _displayVersions, displayVersions);
      setDocVersion(version);
      setSlugVersion(version);
    },
    [setDocVersion, setSlugVersion, displayVersions]
  );
  const updateVersion = useCallback(
    (
      _currentGroup: string,
      _currentPlatform: string,
      language: string,
      targetVersion?: string
    ) => {
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
      setVersion(_version, _displayVersions);
      return _version;
    },
    [allUsedVersions, displayVersions, docVersion, setVersion]
  );
  const handleVersionChanged = useCallback(
    ({ key: version }) => {
      setVersion(version);
    },
    [setVersion]
  );

  // instance
  const setInstance = useCallback(
    (instanceID: string, _displayInstances?: DisplayInstance[]) => {
      console.log("[Layout]setInstance", _displayInstances, displayInstances);
      const target = (_displayInstances || displayInstances).find(
        (item) => item.instance.id === instanceID
      );
      target && setInstanceID(instanceID);
      target && setCurrentInstanceLabel(target.instance.label);
      return target ? instanceID : "";
    },
    [displayInstances]
  );
  const updateInstance = useCallback(
    (language: string, targetInstanceID?: string) => {
      const _displayInstances = LibControllerImpl.getDisplayInstances(language);
      const _instanceID =
        _displayInstances[0]?.instance?.id || defaultInstanceID;
      setDisplayInstances(_displayInstances);
      setInstance(_instanceID, _displayInstances);
      return _instanceID;
    },
    [setInstance]
  );

  // platform
  const addPlatformAllItem = useCallback((displayPlatforms) => {
    return [{ ...allPlatformItem }, ...displayPlatforms];
  }, []);
  const setPlatform = useCallback(
    (platform: string, _displayPlatforms?: DisplayPlatform[]) => {
      console.log("[Layout]setPlatform", _displayPlatforms, displayPlatforms);
      const target = (_displayPlatforms || displayPlatforms).find(
        (item) => item.platform === platform
      );
      target && setCurrentPlatform(platform);
      target && setCurrentPlatformLabel(target.platformLabel);
      return target ? platform : "";
    },
    [displayPlatforms]
  );
  const updatePlatform = useCallback(
    (_currentGroup: string, language: string, targetPlatform?: string) => {
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
      setPlatform(_currentPlatform, _displayPlatforms);
      return _currentPlatform;
    },
    [currentPlatform, setPlatform]
  );
  const handlePlatformChanged = useCallback(
    ({ key: platform }) => {
      // compatible with all
      const _platform = setPlatform(platform);

      if (_platform) {
        // update instance
        updateInstance(currentLanguage);

        // update version
        updateVersion(currentGroup, _platform, currentLanguage);
      }
    },
    [currentGroup, currentLanguage, setPlatform, updateInstance, updateVersion]
  );

  // group
  const addGroupAllItem = useCallback((displayGroups) => {
    return [{ ...allGroupItem }, ...displayGroups];
  }, []);
  const setGroup = useCallback(
    (group: string, _displayGroups?: DisplayGroup[]) => {
      console.log("[Layout]setGroup", _displayGroups, displayGroups);
      const target = addGroupAllItem(_displayGroups || displayGroups).find(
        (item) => item.group === group
      );
      target && setCurrentGroup(group);
      target && setCurrentGroupLabel(target.groupLabel);
      return target ? group : "";
    },
    [addGroupAllItem, displayGroups]
  );
  const updateGroup = useCallback(
    (language: string, targetGroup?: string) => {
      const _displayGroups =
        GroupControllerImpl.getDisplayGroups(language).displayGroups;
      const _currentGroup = _displayGroups[0]?.group || defaultGroup;
      setDisplayGroups(_displayGroups);
      setGroup(_currentGroup, _displayGroups);
      return _currentGroup;
    },
    [setGroup]
  );
  const handleGroupChanged = useCallback(
    ({ key: group }) => {
      // compatible with all
      const _group = setGroup(group);

      if (_group) {
        // update platform
        const _currentPlatform = updatePlatform(_group, currentLanguage);

        if (_currentPlatform) {
          // update instance
          updateInstance(currentLanguage);

          // update version
          updateVersion(_group, _currentPlatform, currentLanguage);
        }
      }
    },
    [currentLanguage, setGroup, updateInstance, updatePlatform, updateVersion]
  );

  // language
  const setLanguage = useCallback(
    (language: string) => {
      const target = displayLanguages.find(
        (item) => item.language === language
      );
      target && setCurrentLanguage(language);
      target && setCurrentLanguageLabel(target.languageLabel);
      return target ? language : "";
    },
    [displayLanguages, setCurrentLanguage, setCurrentLanguageLabel]
  );
  const handleLanguageChanged = useCallback(
    ({ key: language }) => {
      const _language = setLanguage(language);

      if (_language) {
        // update instance
        updateInstance(_language);

        // update group
        const _currentGroup = updateGroup(_language);

        if (_currentGroup) {
          // update platform
          const _currentPlatform = updatePlatform(_currentGroup, _language);

          // update version
          _currentPlatform &&
            updateVersion(_currentGroup, _currentPlatform, _language);
        }
      }
    },
    [setLanguage, updateGroup, updateInstance, updatePlatform, updateVersion]
  );

  const initSelect = useCallback(
    (targetInfo) => {
      console.log("[Layout]initSelect");
      // if (!language) return;
      // const _language = setLanguage(language);

      // if (_language) {
      //   // update group
      //   const _currentGroup = updateGroup(_language, group);

      //   if (_currentGroup) {
      //     // update platform
      //     const _currentPlatform = updatePlatform(
      //       _currentGroup,
      //       _language,
      //       platform
      //     );

      //     // update version
      //     _currentPlatform &&
      //       updateVersion(_currentGroup, _currentPlatform, _language, version);
      //   }
      // }
    },
    [setLanguage, updateGroup, updatePlatform, updateVersion]
  );

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
            setDisplayInstances,
            setInstanceID,
            setCurrentInstanceLabel,
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
                    initSelect,
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
        </InstanceContext.Provider>
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  );
};

export default Layout;

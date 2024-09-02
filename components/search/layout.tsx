// Warning: Not compatible with previous versions of navigationInfo
import React, { useCallback, useEffect, useState } from "react";
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
  defaultInstanceIDs,
  defaultInstanceLabels,
} from "@/components/context/instanceContext";
import {
  VersionContext,
  defaultDocVersion,
  defaultSlugVersion,
} from "@/components/context/versionContext";
import {
  GroupContext,
  addGroupAllItem,
  defaultGroup,
  defaultGroupLabel,
} from "@/components/context/groupContext";
import {
  PlatformContext,
  addPlatformAllItem,
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
  const { displayLanguages: _displayLanguages } =
    LanguageControllerImpl.getDisplayLanguages();
  const [currentLanguage, setCurrentLanguage] = useState(
    _displayLanguages[0]?.language || defaultLanguage
  );
  const [currentLanguageLabel, setCurrentLanguageLabel] = useState(
    _displayLanguages[0]?.languageLabel || defaultLanguageLabel
  );

  // instances
  const _displayInstances =
    LibControllerImpl.getDisplayInstances(currentLanguage);
  const [displayInstances, setDisplayInstances] = useState(_displayInstances);
  const [instanceIDs, setInstanceIDs] = useState(
    _displayInstances.map((item) => item.instance.id) || defaultInstanceIDs
  );
  const [currentInstanceLabels, setCurrentInstanceLabels] = useState(
    _displayInstances.map((item) => item.instance.label) ||
      defaultInstanceLabels
  );

  // groups
  const _displayGroups = addGroupAllItem(
    GroupControllerImpl.getDisplayGroups(currentLanguage).displayGroups
  );
  const [displayGroups, setDisplayGroups] = useState(_displayGroups);
  const [currentGroup, setCurrentGroup] = useState(
    _displayGroups[0]?.group || defaultGroup
  );
  const [currentGroupLabel, setCurrentGroupLabel] = useState(
    _displayGroups[0]?.groupLabel || defaultGroupLabel
  );

  // platforms
  const _displayPlatforms = addPlatformAllItem(
    PlatformControllerImpl.getDisplayPlatforms(currentGroup, currentLanguage)
      .displayPlatforms
  );
  const [displayPlatforms, setDisplayPlatforms] = useState(_displayPlatforms);
  const [currentPlatform, setCurrentPlatform] = useState(
    _displayPlatforms[0]?.platform || defaultPlatform
  );
  const [currentPlatformLabel, setCurrentPlatformLabel] = useState(
    _displayPlatforms[0]?.platformLabel || defaultPlatformLabel
  );

  // versions
  const _displayVersions = VersionsControllerImpl.getDisplayVersions(
    currentGroup,
    currentPlatform,
    currentLanguage,
    allUsedVersions
  );
  const [displayVersions, setDisplayVersions] = useState(_displayVersions);
  const [slugVersion, setSlugVersion] = useState(
    _displayVersions[0]?.version || defaultSlugVersion
  );
  const [docVersion, setDocVersion] = useState(
    _displayVersions[0]?.version || defaultDocVersion
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
    (params: {
      group: string;
      platform: string;
      language: string;
      version?: string;
      initChild?: boolean;
    }) => {
      const {
        language,
        version: targetVersion,
        group: _currentGroup,
        platform: _currentPlatform,
        initChild,
      } = params;
      const _displayVersions = VersionsControllerImpl.getDisplayVersions(
        _currentGroup,
        _currentPlatform,
        language,
        allUsedVersions
      );
      const temp2 = !initChild
        ? _displayVersions.find(
            (displayVersion) => displayVersion.version === docVersion
          )
        : null;
      const _version =
        targetVersion ||
        (temp2 ? temp2.version : _displayVersions[0]?.version) ||
        defaultDocVersion;
      setDisplayVersions(_displayVersions);
      setVersion(_version, _displayVersions);
      return _version;
    },
    [allUsedVersions, docVersion, setVersion]
  );
  const handleVersionChanged = useCallback(
    ({ key: version, initChild }) => {
      setVersion(version);
    },
    [setVersion]
  );

  // instance
  const setInstance = useCallback(
    (instanceIDs: string[], _displayInstances?: DisplayInstance[]) => {
      console.log("[Layout]setInstance", _displayInstances, displayInstances);
      const result1 = [];
      const result2 = [];
      instanceIDs.forEach((instanceID) => {
        const target = LibControllerImpl.getDisplayInstance(
          instanceID,
          _displayInstances || displayInstances
        );
        if (target) {
          result1.push(instanceID);
          result2.push(target.instance.label);
        }
      });
      if (result2.length) {
        setInstanceIDs(result1);
        setCurrentInstanceLabels(result2);
      }
      return result1;
    },
    [displayInstances]
  );
  const updateInstance = useCallback(
    (params: { language: string; instanceIDs?: string[] }) => {
      const { language, instanceIDs: targetInstanceIDs } = params;
      const _displayInstances = LibControllerImpl.getDisplayInstances(language);
      const _instanceIDs =
        targetInstanceIDs && targetInstanceIDs.length
          ? targetInstanceIDs
          : _displayInstances.map((item) => item.instance.id).slice(0, 1) ||
            defaultInstanceIDs;
      setDisplayInstances(_displayInstances);
      setInstance(_instanceIDs, _displayInstances);
      return _instanceIDs;
    },
    [setInstance]
  );

  // platform
  const setPlatform = useCallback(
    (platform: string, _displayPlatforms?: DisplayPlatform[]) => {
      console.log("[Layout]setPlatform", _displayPlatforms, displayPlatforms);
      const target = PlatformControllerImpl.getDisplayPlatform(
        platform,
        _displayPlatforms || displayPlatforms
      );
      target && setCurrentPlatform(platform);
      target && setCurrentPlatformLabel(target.platformLabel);
      return target ? platform : "";
    },
    [displayPlatforms]
  );
  const updatePlatform = useCallback(
    (params: {
      group: string;
      language: string;
      platform?: string;
      initChild?: boolean;
    }) => {
      const {
        group: _currentGroup,
        language,
        platform: targetPlatform,
        initChild,
      } = params;
      const _displayPlatforms = addPlatformAllItem(
        PlatformControllerImpl.getDisplayPlatforms(_currentGroup, language)
          .displayPlatforms
      );
      const temp1 = !initChild
        ? _displayPlatforms.find(
            (displayPlaytform) => displayPlaytform.platform === currentPlatform
          )
        : null;
      const _currentPlatform =
        targetPlatform ||
        (temp1 ? temp1.platform : _displayPlatforms[0]?.platform) ||
        defaultPlatform;
      setDisplayPlatforms(_displayPlatforms);
      setPlatform(_currentPlatform, _displayPlatforms);
      return _currentPlatform;
    },
    [currentPlatform, setPlatform]
  );
  const handlePlatformChanged = useCallback(
    ({ key: platform, initChild }) => {
      // compatible with all
      const _platform = setPlatform(platform);

      if (_platform) {
        // update instance
        const targetInstanceIDs = VersionsControllerImpl.getInstanceIDs(
          currentLanguage,
          currentGroup,
          _platform
        );
        updateInstance({
          language: currentLanguage,
          instanceIDs: targetInstanceIDs,
        });

        // update version
        updateVersion({
          group: currentGroup,
          platform: _platform,
          language: currentLanguage,
          initChild,
        });
      }
    },
    [currentGroup, currentLanguage, setPlatform, updateInstance, updateVersion]
  );

  // group
  const setGroup = useCallback(
    (group: string, _displayGroups?: DisplayGroup[]) => {
      console.log("[Layout]setGroup", _displayGroups, displayGroups);
      const target = GroupControllerImpl.getDisplayGroup(
        group,
        _displayGroups || displayGroups
      );
      target && setCurrentGroup(group);
      target && setCurrentGroupLabel(target.groupLabel);
      return target ? group : "";
    },
    [displayGroups]
  );
  const updateGroup = useCallback(
    (params: { language: string; group?: string }) => {
      const { language, group: targetGroup } = params;
      const _displayGroups = addGroupAllItem(
        GroupControllerImpl.getDisplayGroups(language).displayGroups
      );
      const _currentGroup =
        targetGroup || _displayGroups[0]?.group || defaultGroup;
      setDisplayGroups(_displayGroups);
      setGroup(_currentGroup, _displayGroups);
      return _currentGroup;
    },
    [setGroup]
  );
  const handleGroupChanged = useCallback(
    ({ key: group, initChild }) => {
      // compatible with all
      const _group = setGroup(group);

      if (_group) {
        // update platform
        const _currentPlatform = updatePlatform({
          group: _group,
          language: currentLanguage,
          initChild,
        });

        if (_currentPlatform) {
          // update instance
          const targetInstanceIDs = VersionsControllerImpl.getInstanceIDs(
            currentLanguage,
            _group,
            _currentPlatform
          );
          updateInstance({
            language: currentLanguage,
            instanceIDs: targetInstanceIDs,
          });

          // update version
          updateVersion({
            group: _group,
            platform: _currentPlatform,
            language: currentLanguage,
            initChild,
          });
        }
      }
    },
    [currentLanguage, setGroup, updateInstance, updatePlatform, updateVersion]
  );

  // language
  const setLanguage = useCallback(
    (language: string) => {
      const target = LanguageControllerImpl.getDisplayLanguage(
        language,
        _displayLanguages
      );
      target && setCurrentLanguage(language);
      target && setCurrentLanguageLabel(target.languageLabel);
      return target ? language : "";
    },
    [_displayLanguages, setCurrentLanguage, setCurrentLanguageLabel]
  );
  const handleLanguageChanged = useCallback(
    ({ key: language, initChild }) => {
      initChild = true;
      const _language = setLanguage(language);

      if (_language) {
        // update instance
        const targetInstanceIDs = VersionsControllerImpl.getInstanceIDs(
          language,
          currentGroup,
          currentPlatform
        );
        updateInstance({
          language: _language,
          instanceIDs: targetInstanceIDs,
        });

        // update group
        const _currentGroup = updateGroup({ language: _language });

        if (_currentGroup) {
          // update platform
          const _currentPlatform = updatePlatform({
            group: _currentGroup,
            language: _language,
            initChild,
          });

          // update version
          _currentPlatform &&
            updateVersion({
              group: _currentGroup,
              platform: _currentPlatform,
              language: _language,
              initChild,
            });
        }
      }
    },
    [
      currentGroup,
      currentPlatform,
      setLanguage,
      updateGroup,
      updateInstance,
      updatePlatform,
      updateVersion,
    ]
  );

  // const initSelect = useCallback(
  //   (targetInfo) => {
  //     console.log("[Layout]initSelect", targetInfo);
  //     const { language, group, platform, version } = targetInfo;
  //     // update language
  //     const _language = setLanguage(language) || defaultLanguage;
  //     // update group
  //     const _currentGroup = updateGroup({
  //       language: _language,
  //       group,
  //     });
  //     // update platform
  //     const _currentPlatform = updatePlatform({
  //       group: _currentGroup,
  //       language: _language,
  //       platform,
  //     });
  //     // update instance
  //     const targetInstanceIDs = VersionsControllerImpl.getInstanceIDs(
  //       _language,
  //       _currentGroup,
  //       _currentPlatform
  //     );
  //     updateInstance({
  //       language: _language,
  //       instanceIDs: targetInstanceIDs,
  //     });
  //     // update version
  //     updateVersion({
  //       group: _currentGroup,
  //       platform: _currentPlatform,
  //       language: _language,
  //       version,
  //     });
  //   },
  //   [setLanguage, updateGroup, updateInstance, updatePlatform, updateVersion]
  // );

  // useEffect(() => {
  //   // language, group, platform, version
  //   const language = localStorage.getItem("search-language") as string;
  //   const group = localStorage.getItem("search-group") as string;
  //   const platform = localStorage.getItem("search-platform") as string;
  //   const version = localStorage.getItem("search-version") as string;
  //   // can only be executed once
  //   initSelect({
  //     language,
  //     group,
  //     platform,
  //     version,
  //   });
  // }, []);

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
        <InstanceContext.Provider
          value={{
            instanceIDs,
            currentInstanceLabels,
            displayInstances,
            setDisplayInstances,
            setInstanceIDs,
            setCurrentInstanceLabels,
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
        </InstanceContext.Provider>
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  );
};

export default Layout;

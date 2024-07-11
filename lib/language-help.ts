import LibControllerImpl from "./index";
import SlugControllerImpl from "./slug-help";
import VersionsControllerImpl from "./versions-help";
import { DisplayLanguage, InstanceType } from "./types";
import {
  DEFAULT_CURRENT_DOC_VERSION,
  DEFAULT_LATEST_SLUG_VERSION,
} from "./constants";

class LanguageController {
  static _instance: LanguageController;
  static getInstance() {
    return (
      LanguageController._instance ||
      (LanguageController._instance = new LanguageController())
    );
  }
  getInfoByInstanceID(instanceID: string) {
    // instanceID eg: callkit、callkit_zh_CN
    let baseInstanceID = "",
      currentLanguage = "";
    const { i18n } = LibControllerImpl.getDocuoConfig();
    if (i18n && i18n.localeConfigs) {
      const keys = Object.keys(i18n.localeConfigs);
      const result = keys.find((suffix) => instanceID.endsWith(`_${suffix}`));
      if (result) {
        const temp = instanceID.lastIndexOf(`_${result}`);
        baseInstanceID = instanceID.slice(0, temp);
        currentLanguage = result;
      } else {
        baseInstanceID = instanceID;
        currentLanguage = i18n.defaultLocale;
      }
    } else {
      baseInstanceID = instanceID;
    }
    return { baseInstanceID, currentLanguage };
  }
  getDisplayLanguages(slug: string[]) {
    const { i18n } = LibControllerImpl.getDocuoConfig();
    const result: {
      currentLanguage: string;
      currentLanguageLabel: string;
      displayLanguages: DisplayLanguage[];
    } = { currentLanguage: "", currentLanguageLabel: "", displayLanguages: [] };
    if (i18n && i18n.localeConfigs) {
      const {
        instanceID,
        slugVersion: currentSlugVersion,
        docVersion: currentDocVersion,
        mdxFileID,
      } = SlugControllerImpl.getExtractInfoFromSlug(slug);
      const keys = Object.keys(i18n.localeConfigs);
      const { baseInstanceID, currentLanguage } =
        this.getInfoByInstanceID(instanceID);

      result.currentLanguage = currentLanguage;
      result.currentLanguageLabel = i18n.localeConfigs[currentLanguage];

      let defaultLocaleInstance;
      // Put the default language first
      const defaultKeyIndex = keys.findIndex(
        (key) => key === i18n.defaultLocale
      );
      keys.unshift(keys.splice(defaultKeyIndex, 1)[0]);
      keys.forEach((suffix) => {
        // Find the corresponding language instance
        let targetInstanceID = baseInstanceID;
        if (suffix !== i18n.defaultLocale) {
          targetInstanceID += `_${suffix}`;
        }
        let targetInstance =
          LibControllerImpl.getTargetInstance(targetInstanceID);

        // New logic: The first non-linked document takes the first non-linked instance of the target language if it is not found
        const reg = /^https?:/i;
        if (!targetInstance || reg.test(targetInstance.path)) {
          const displayInstances =
            LibControllerImpl.getDisplayInstances(suffix);
          const target = displayInstances.find(
            (instance) => !reg.test(instance.defaultLink)
          );
          if (target) {
            targetInstance = target.instance;
            defaultLocaleInstance = JSON.parse(JSON.stringify(target.instance));
          } else {
            targetInstance = defaultLocaleInstance;
          }
        } else {
          defaultLocaleInstance = JSON.parse(JSON.stringify(targetInstance));
        }

        // Old logic: In the current version, the version display policy of different instances when switching languages
        // A 表示 instance zh_CN, version: [3.0.0, 2.0.0, 1.0.0]
        // B 表示 instance en, version: [4.0.0, 2.0.0, 1.0.0]
        // A 的 1.0.0, 2.0.0 => B 的 1.0.0, 2.0.0 （版本一一对应）
        // A 的 3.0.0 => B 的 4.0.0（A 是最新版本，所以切到 B 最新，如果 B 有 3.0.0，那 B 就取 3.0.0）
        // A 的 next => B 的 next（都取当前版本）
        // 目标文档名称即为当前文档名称，无论是否存在
        const defaultLink = this.getDefaultLink(
          currentSlugVersion,
          currentDocVersion,
          mdxFileID,
          targetInstance
        );
        result.displayLanguages.push({
          language: suffix,
          languageLabel: i18n.localeConfigs[suffix],
          defaultLink,
        });
      });
    }
    return result;
  }
  getDefaultLink(
    currentSlugVersion,
    currentDocVersion,
    mdxFileID,
    targetInstance
  ) {
    let targetSlugVersion = currentSlugVersion;
    const targetUsedVersions = VersionsControllerImpl.getUsedVersions(
      targetInstance.id
    ).concat([DEFAULT_CURRENT_DOC_VERSION]);
    if (currentSlugVersion === DEFAULT_LATEST_SLUG_VERSION) {
      if (targetUsedVersions.includes(currentDocVersion)) {
        const temp = SlugControllerImpl.docVersionToSlugVersion(
          targetInstance.id,
          currentDocVersion
        );
        if (temp !== DEFAULT_LATEST_SLUG_VERSION) {
          targetSlugVersion = temp;
        }
      }
    } else {
      if (targetUsedVersions.includes(currentDocVersion)) {
        const temp = SlugControllerImpl.docVersionToSlugVersion(
          targetInstance.id,
          currentDocVersion
        );
        if (temp === DEFAULT_LATEST_SLUG_VERSION) {
          targetSlugVersion = DEFAULT_LATEST_SLUG_VERSION;
        }
      } else {
        targetSlugVersion = DEFAULT_LATEST_SLUG_VERSION;
      }
    }
    const defaultLink = `${
      targetInstance.routeBasePath ? "/" + targetInstance.routeBasePath : ""
    }/${targetSlugVersion}${targetSlugVersion ? "/" + mdxFileID : mdxFileID}`;
    return defaultLink;
  }
}

export default LanguageController.getInstance();

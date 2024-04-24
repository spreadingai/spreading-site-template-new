import LibControllerImpl from "./index";
import SlugControllerImpl from "./slug-help";
import VersionsControllerImpl from "./versions-help";
import { DisplayLanguage } from "./types";
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
    const { instances, i18n } = LibControllerImpl.getDocuoConfig();
    const result: {
      currentLanguage: string;
      displayLanguages: DisplayLanguage[];
    } = { currentLanguage: "", displayLanguages: [] };
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

      result.currentLanguage = i18n.localeConfigs[currentLanguage];

      keys.forEach((suffix) => {
        let targetInstanceID = baseInstanceID;
        if (suffix !== i18n.defaultLocale) {
          targetInstanceID += `_${suffix}`;
        }
        const targetInstance = instances.find(
          (instance) => instance.id === targetInstanceID
        );
        if (targetInstance) {
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
          result.displayLanguages.push({
            language: i18n.localeConfigs[suffix],
            defaultLink: `${
              targetInstance.routeBasePath
                ? "/" + targetInstance.routeBasePath
                : ""
            }/${targetSlugVersion}${
              targetSlugVersion ? "/" + mdxFileID : mdxFileID
            }`,
          });
        }
      });
    }
    return result;
  }
}

export default LanguageController.getInstance();

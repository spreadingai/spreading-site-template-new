import LibControllerImpl from "./index";
import CommonControllerImpl from "./debug/common";
import LanguageControllerImpl from "./language-help";
import { DisplayPlatform, NavigationInfo } from "./types";

class PlatformController {
  static _instance: PlatformController;
  static getInstance() {
    return (
      PlatformController._instance ||
      (PlatformController._instance = new PlatformController())
    );
  }
  getDisplayPlatforms(slug: string[], currentLanguage: string) {
    const result: {
      currentPlatform: string;
      currentPlatformLabel: string;
      displayPlatforms: DisplayPlatform[];
    } = { currentPlatform: "", currentPlatformLabel: "", displayPlatforms: [] };

    const instances = LibControllerImpl.getInstances();
    const {
      instanceID: targetInstanceID,
      slugVersion: currentSlugVersion,
      docVersion: currentDocVersion,
      mdxFileID,
    } = CommonControllerImpl.getExtractInfoFromSlug(slug, instances);
    const targetInstance = instances.find(
      (instance) => instance.id === targetInstanceID
    );
    if (targetInstance && targetInstance.navigationInfo) {
      const { navigationInfo } = targetInstance;
      if (navigationInfo && navigationInfo.group) {
        const { id } = navigationInfo.group;
        result.currentPlatform = navigationInfo.platform;
        result.currentPlatformLabel = navigationInfo.platform;
        // Aggregate platform data
        instances.forEach((instance) => {
          // The new version uses locale judgment, and we're going to replace the suffix judgment later
          if (instance.locale === currentLanguage) {
            if (
              instance.navigationInfo &&
              instance.navigationInfo.group &&
              instance.navigationInfo.group.id === id
            ) {
              const reg = /^https?:/i;
              let defaultLink = "";
              if (reg.test(instance.path)) {
                defaultLink = instance.path;
              } else {
                defaultLink = LanguageControllerImpl.getDefaultLink(
                  currentSlugVersion,
                  currentDocVersion,
                  mdxFileID,
                  instance
                );
              }
              const platform = (instance.navigationInfo as NavigationInfo)
                .platform as string;
              result.displayPlatforms.push({
                platform,
                platformLabel: platform,
                defaultLink,
              });
            }
          }
        });
      }
    }
    return result;
  }
}

export default PlatformController.getInstance();

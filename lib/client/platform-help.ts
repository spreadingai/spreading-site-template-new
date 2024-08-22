import LibControllerImpl from "./index";
import { DisplayPlatform, NavigationInfo } from "../types";

class PlatformController {
  static _instance: PlatformController;
  static getInstance() {
    return (
      PlatformController._instance ||
      (PlatformController._instance = new PlatformController())
    );
  }
  getDisplayPlatforms(targetInstanceID: string, currentLanguage: string) {
    const result: {
      displayPlatforms: DisplayPlatform[];
    } = { displayPlatforms: [] };

    const instances = LibControllerImpl.getInstances();
    const targetInstance = instances.find(
      (instance) => instance.id === targetInstanceID
    );
    if (targetInstance && targetInstance.navigationInfo) {
      const { navigationInfo } = targetInstance;
      if (navigationInfo && navigationInfo.group) {
        const { id } = navigationInfo.group;
        // Aggregate platform data
        instances.forEach((instance) => {
          // The new version uses locale judgment, and we're going to replace the suffix judgment later
          if (instance.locale === currentLanguage) {
            if (
              instance.navigationInfo &&
              instance.navigationInfo.group &&
              instance.navigationInfo.group.id === id
            ) {
              const platform = (instance.navigationInfo as NavigationInfo)
                .platform as string;
              result.displayPlatforms.push({
                platform,
                platformLabel: platform,
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

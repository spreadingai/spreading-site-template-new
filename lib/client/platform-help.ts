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
  getDisplayPlatforms(groupID: string, currentLanguage: string) {
    const result: {
      displayPlatforms: DisplayPlatform[];
    } = { displayPlatforms: [] };

    const instances = LibControllerImpl.getInstances();
    // Aggregate platform data
    instances.forEach((instance) => {
      // The new version uses locale judgment, and we're going to replace the suffix judgment later
      if (instance.locale === currentLanguage) {
        if (
          instance.navigationInfo &&
          instance.navigationInfo.group &&
          instance.navigationInfo.group.id === groupID
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
    return result;
  }
}

export default PlatformController.getInstance();

import LibControllerImpl from "./index";
import { DisplayPlatform } from "../types";
import { allGroupItem } from "@/components/context/groupContext";

class PlatformController {
  static _instance: PlatformController;
  static getInstance() {
    return (
      PlatformController._instance ||
      (PlatformController._instance = new PlatformController())
    );
  }
  getDisplayPlatforms(currentGroup: string, currentLanguage: string, currentTab?: string) {
    // Compatible with all
    const result: {
      displayPlatforms: DisplayPlatform[];
    } = { displayPlatforms: [] };

    const instances = LibControllerImpl.getInstances();
    // Aggregate platform data
    instances.forEach((instance) => {
      // The new version uses locale judgment, and we're going to replace the suffix judgment later
      if (instance.locale === currentLanguage) {
        const navInfo = LibControllerImpl.getNavigationInfoByInstanceId(instance.id);
        const groupId = navInfo.group?.id;
        const platform = navInfo.platform;
        const tab = navInfo.tab;

        if (
          (currentGroup !== allGroupItem.group &&
            groupId === currentGroup &&
            // 如果指定了currentTab，只显示同一tab下的platforms
            (!currentTab || tab === currentTab)) ||
          currentGroup === allGroupItem.group
        ) {
          // Filter duplicate elements
          const isExist = result.displayPlatforms.find(
            (item) => item.platform === platform
          );
          !isExist &&
            platform &&
            result.displayPlatforms.push({
              platform,
              platformLabel: platform,
            });
        }
      }
    });
    return result;
  }
  getDisplayPlatform(platform: string, displayPlatforms: DisplayPlatform[]) {
    const target = displayPlatforms.find((item) => item.platform === platform);
    return target;
  }
}

export default PlatformController.getInstance();

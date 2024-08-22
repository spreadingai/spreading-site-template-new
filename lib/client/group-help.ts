import LibControllerImpl from "./index";
import { DisplayGroup, NavigationGroupInfo } from "../types";

class GroupController {
  static _instance: GroupController;
  static getInstance() {
    return (
      GroupController._instance ||
      (GroupController._instance = new GroupController())
    );
  }
  getDisplayGroups(currentLanguage: string) {
    const result: {
      displayGroups: DisplayGroup[];
    } = { displayGroups: [] };

    const instances = LibControllerImpl.getInstances();
    // Aggregate group data
    instances.forEach((instance) => {
      // The new version uses locale judgment, and we're going to replace the suffix judgment later
      if (instance.locale === currentLanguage) {
        // const reg = /^https?:/i;
        const navigationInfo = instance.navigationInfo;
        if (navigationInfo && navigationInfo.group) {
          const group = navigationInfo?.group as NavigationGroupInfo;
          const index = result.displayGroups.find(
            (item) => item.group === group.id
          );
          !index &&
            result.displayGroups.push({
              group: group?.id,
              groupLabel: group?.name,
              tag: group?.tag,
            });
        } else {
          // if (reg.test(instance.path)) {
          //   result.displayGroups.push({
          //     group: instance.id,
          //     groupLabel: instance.label,
          //   });
          // }
        }
      }
    });
    return result;
  }
}

export default GroupController.getInstance();

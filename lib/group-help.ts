import LibControllerImpl from "./index";
import { DisplayGroup, NavigationGroupInfo } from "./types";
import CommonControllerImpl from "./optimize/common";

class GroupController {
  static _instance: GroupController;
  static getInstance() {
    return (
      GroupController._instance ||
      (GroupController._instance = new GroupController())
    );
  }
  getDisplayGroups(slug: string[], currentLanguage: string) {
    const result: {
      currentGroup: string;
      currentGroupLabel: string;
      displayGroups: DisplayGroup[];
    } = { currentGroup: "", currentGroupLabel: "", displayGroups: [] };

    const instances = LibControllerImpl.getInstances();
    const { instanceID: targetInstanceID } =
      CommonControllerImpl.getExtractInfoFromSlug(slug, instances);
    console.log(
      "[GroupController]getDisplayGroups targetInstanceID",
      targetInstanceID
    );
    const targetInstance = instances.find(
      (instance) => instance.id === targetInstanceID
    );
    if (targetInstance && targetInstance.navigationInfo) {
      const { navigationInfo } = targetInstance;
      if (navigationInfo && navigationInfo.group) {
        result.currentGroup = navigationInfo.group.id;
        result.currentGroupLabel = navigationInfo.group.name;
        const allSlugs = CommonControllerImpl.readAllSlugsByFile();
        // Aggregate group data
        instances.forEach((instance) => {
          // The new version uses locale judgment, and we're going to replace the suffix judgment later
          if (instance.locale === currentLanguage) {
            const reg = /^https?:/i;
            const navigationInfo = instance.navigationInfo;
            if (navigationInfo && navigationInfo.group) {
              let defaultLink = "";
              if (!reg.test(instance.path)) {
                // Finds the first slug corresponding to the instance
                const targetSlug = allSlugs.find((item) => {
                  return item.params.instanceID === instance.id;
                });
                console.log(
                  "[GroupController]getDisplayGroups targetSlug",
                  instance,
                  targetSlug,
                  allSlugs.length
                );
                defaultLink = targetSlug
                  ? `/${targetSlug.params.slug.join("/")}`
                  : "";
              } else {
                // Determine whether there is a platform that is not an external chain
                const temp = instances.find(
                  (instance) =>
                    instance.locale === currentLanguage &&
                    !reg.test(instance.path) &&
                    instance.navigationInfo &&
                    instance.navigationInfo.group.id === navigationInfo.group.id
                );
                if (!temp) {
                  defaultLink = instance.path;
                } else {
                  const targetSlug = allSlugs.find((item) => {
                    return item.params.instanceID === temp.id;
                  });
                  defaultLink = targetSlug
                    ? `/${targetSlug.params.slug.join("/")}`
                    : "";
                }
              }
              const group = navigationInfo?.group as NavigationGroupInfo;
              const index = result.displayGroups.find(
                (item) => item.group === group.id
              );
              !index &&
                result.displayGroups.push({
                  group: group?.id,
                  groupLabel: group?.name,
                  tag: group?.tag,
                  defaultLink,
                });
            } else {
              // if (reg.test(instance.path)) {
              //   result.displayGroups.push({
              //     group: instance.id,
              //     groupLabel: instance.label,
              //     defaultLink: instance.path,
              //   });
              // }
            }
          }
        });
      }
    }
    return result;
  }
}

export default GroupController.getInstance();

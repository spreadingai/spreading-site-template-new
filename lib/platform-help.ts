import LibControllerImpl from "./index";
import CommonControllerImpl from "./optimize/common";
import LanguageControllerImpl from "./language-help";
import { DisplayPlatform } from "./types";

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

    // 使用 instanceGroups 获取导航信息
    const targetNavInfo = LibControllerImpl.getNavigationInfoByInstanceId(targetInstanceID);

    if (targetInstance && targetNavInfo.group) {
      const groupId = targetNavInfo.group.id;
      const currentTab = targetNavInfo.tab; // 获取当前实例的tab
      result.currentPlatform = targetNavInfo.platform || "";
      result.currentPlatformLabel = targetNavInfo.platform || "";

      // 获取该 group 的所有实例
      const group = LibControllerImpl.getInstanceGroupById(groupId);
      if (group && group.instances) {
        // Aggregate platform data
        group.instances.forEach((groupInst) => {
          const instance = instances.find((i) => i.id === groupInst.id);
          if (!instance) return;

          // The new version uses locale judgment
          if (instance.locale === currentLanguage) {
            // 只有在同一个tab下的实例才能进行platform切换
            if (groupInst.tab === currentTab && groupInst.platform) {
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
              result.displayPlatforms.push({
                platform: groupInst.platform,
                platformLabel: groupInst.platform,
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

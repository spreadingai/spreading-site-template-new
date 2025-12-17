import LibControllerImpl from "./index";
import { DisplayTab } from "./types";
import CommonControllerImpl from "./optimize/common";

class TabController {
  static _instance: TabController;
  static getInstance() {
    return (
      TabController._instance ||
      (TabController._instance = new TabController())
    );
  }

  /**
   * 获取指定group下的所有tab信息
   * @param slug 当前页面的slug
   * @param currentLanguage 当前语言
   * @returns tab相关信息
   */
  getDisplayTabs(slug: string[], currentLanguage: string) {
    const result: {
      currentTab: string;
      currentTabLabel: string;
      displayTabs: DisplayTab[];
      shouldShowTabs: boolean;
    } = {
      currentTab: "",
      currentTabLabel: "",
      displayTabs: [],
      shouldShowTabs: false
    };

    const instances = LibControllerImpl.getInstances();
    const { instanceID: targetInstanceID } =
      CommonControllerImpl.getExtractInfoFromSlug(slug, instances);

    const targetInstance = instances.find(
      (instance) => instance.id === targetInstanceID
    );

    // 使用 instanceGroups 获取导航信息
    const targetNavInfo = LibControllerImpl.getNavigationInfoByInstanceId(targetInstanceID);

    if (targetInstance && targetNavInfo.group) {
      const groupId = targetNavInfo.group.id;

      // 设置当前tab
      if (targetNavInfo.tab) {
        result.currentTab = targetNavInfo.tab;
        result.currentTabLabel = targetNavInfo.tab;
      }

      // 收集同group下的所有tab
      const tabMap = new Map<string, DisplayTab>();
      const allSlugs = CommonControllerImpl.readAllSlugsByFile();

      // 获取该 group 的所有实例
      const group = LibControllerImpl.getInstanceGroupById(groupId);
      if (group && group.instances) {
        group.instances.forEach((groupInst) => {
          const instance = instances.find((i) => i.id === groupInst.id);
          if (!instance) return;

          if (instance.locale === currentLanguage && groupInst.tab) {
            const tab = groupInst.tab;

            if (!tabMap.has(tab)) {
              let defaultLink = "";
              const reg = /^https?:/i;

              if (reg.test(instance.path)) {
                defaultLink = instance.path;
              } else {
                // 查找该实例的第一个slug作为默认链接
                const instanceSlugs = allSlugs.filter(
                  (slugData) => slugData.params.instanceID === instance.id
                );
                if (instanceSlugs.length > 0) {
                  const firstSlug = instanceSlugs[0];
                  defaultLink = `/${firstSlug.params.slug.join("/")}`;
                } else {
                  defaultLink = `/${instance.routeBasePath}`;
                }
              }

              tabMap.set(tab, {
                tab,
                tabLabel: tab,
                defaultLink,
              });
            }
          }
        });
      }

      result.displayTabs = Array.from(tabMap.values());
      // 只有当同group下有超过1个tab时才显示tab切换
      result.shouldShowTabs = result.displayTabs.length > 1;
    }

    return result;
  }

  /**
   * 获取指定tab的默认链接
   * @param tab tab名称
   * @param groupId 组ID
   * @param currentLanguage 当前语言
   * @returns 默认链接
   */
  getTabDefaultLink(tab: string, groupId: string, currentLanguage: string): string {
    const instances = LibControllerImpl.getInstances();
    const allSlugs = CommonControllerImpl.readAllSlugsByFile();

    // 获取该 group
    const group = LibControllerImpl.getInstanceGroupById(groupId);
    if (!group || !group.instances) return "/";

    // 找到匹配的实例
    const targetGroupInst = group.instances.find((groupInst) => {
      const instance = instances.find((i) => i.id === groupInst.id);
      return instance && instance.locale === currentLanguage && groupInst.tab === tab;
    });

    if (!targetGroupInst) return "/";

    const targetInstance = instances.find((i) => i.id === targetGroupInst.id);
    if (!targetInstance) return "/";

    const reg = /^https?:/i;
    if (reg.test(targetInstance.path)) {
      return targetInstance.path;
    } else {
      const instanceSlugs = allSlugs.filter(
        (slugData) => slugData.params.instanceID === targetInstance.id
      );
      if (instanceSlugs.length > 0) {
        const firstSlug = instanceSlugs[0];
        return `/${firstSlug.params.slug.join("/")}`;
      } else {
        return `/${targetInstance.routeBasePath}`;
      }
    }
  }
}

const TabControllerImpl = TabController.getInstance();
export default TabControllerImpl;

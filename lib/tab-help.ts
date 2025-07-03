import LibControllerImpl from "./index";
import { DisplayTab, DocInstance, NavigationInfo } from "./types";
import CommonControllerImpl from "./optimize/common";
import { defaultLanguage } from "@/components/context/languageContext";

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

    if (targetInstance && targetInstance.navigationInfo) {
      const { navigationInfo } = targetInstance;
      if (navigationInfo && navigationInfo.group) {
        const groupId = navigationInfo.group.id;

        // 设置当前tab
        if (navigationInfo.tab) {
          result.currentTab = navigationInfo.tab;
          result.currentTabLabel = navigationInfo.tab;
        }

        // 收集同group下的所有tab
        const tabMap = new Map<string, DisplayTab>();
        const allSlugs = CommonControllerImpl.readAllSlugsByFile();

        instances.forEach((instance) => {
          if (
            instance.locale === currentLanguage &&
            instance.navigationInfo &&
            instance.navigationInfo.group &&
            instance.navigationInfo.group.id === groupId &&
            instance.navigationInfo.tab
          ) {
            const tab = instance.navigationInfo.tab;

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

        result.displayTabs = Array.from(tabMap.values());
        // 只有当同group下有超过1个tab时才显示tab切换
        result.shouldShowTabs = result.displayTabs.length > 1;
      }
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

    const targetInstance = instances.find(
      (instance) =>
        instance.locale === currentLanguage &&
        instance.navigationInfo &&
        instance.navigationInfo.group &&
        instance.navigationInfo.group.id === groupId &&
        instance.navigationInfo.tab === tab
    );

    if (targetInstance) {
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

    return "/";
  }
}

const TabControllerImpl = TabController.getInstance();
export default TabControllerImpl;

import LibControllerImpl from "./index";
import { DisplayTab, NavigationInfo } from "../types";

class TabController {
  static _instance: TabController;
  static getInstance() {
    return (
      TabController._instance ||
      (TabController._instance = new TabController())
    );
  }

  /**
   * 获取指定group下的所有tab信息（客户端版本）
   * @param currentGroup 当前组ID
   * @param currentLanguage 当前语言
   * @returns tab相关信息
   */
  getDisplayTabs(currentGroup: string, currentLanguage: string) {
    const result: {
      displayTabs: DisplayTab[];
      shouldShowTabs: boolean;
    } = { 
      displayTabs: [], 
      shouldShowTabs: false 
    };

    const instances = LibControllerImpl.getInstances();
    
    // 收集同group下的所有tab
    const tabMap = new Map<string, DisplayTab>();

    instances.forEach((instance) => {
      if (
        instance.locale === currentLanguage &&
        instance.navigationInfo &&
        instance.navigationInfo.group &&
        instance.navigationInfo.group.id === currentGroup &&
        instance.navigationInfo.tab
      ) {
        const tab = instance.navigationInfo.tab;
        
        if (!tabMap.has(tab)) {
          let defaultLink = "";
          const reg = /^https?:/i;
          
          if (reg.test(instance.path)) {
            defaultLink = instance.path;
          } else {
            // 对于本地路径，使用routeBasePath
            defaultLink = `/${instance.routeBasePath}`;
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

    return result;
  }

  /**
   * 获取指定tab信息
   * @param tab tab名称
   * @param displayTabs 显示的tabs列表
   * @returns tab信息
   */
  getDisplayTab(tab: string, displayTabs: DisplayTab[]) {
    return displayTabs.find((item) => item.tab === tab);
  }

  /**
   * 检查指定group是否需要显示tabs
   * @param currentGroup 当前组ID
   * @param currentLanguage 当前语言
   * @returns 是否需要显示tabs
   */
  shouldShowTabs(currentGroup: string, currentLanguage: string): boolean {
    const { shouldShowTabs } = this.getDisplayTabs(currentGroup, currentLanguage);
    return shouldShowTabs;
  }
}

const TabControllerImpl = TabController.getInstance();
export default TabControllerImpl;

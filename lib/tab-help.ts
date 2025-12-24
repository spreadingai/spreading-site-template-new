import LibControllerImpl from "./index";
import { DisplayTab } from "./types";
import CommonControllerImpl from "./optimize/common";
import {
  buildGroupTabDefinitions,
  normalizeInstanceTabConfig,
  resolveCurrentSidebarIdFromSlug,
  resolveFirstSlugLinkForSidebar,
} from "./tab-model";

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

    const group = LibControllerImpl.getInstanceGroupByInstanceId(targetInstanceID);
    if (!targetInstance || !group) return result;

    const groupId = group.id;
    const currentSidebarId = resolveCurrentSidebarIdFromSlug(slug);
    const { slugVersion } = CommonControllerImpl.getExtractInfoFromSlug(slug, instances);

    // 1) 聚合 group 下所有 tab（按标题去重，标题冲突直接报错）
    const tabDefsByTitle = buildGroupTabDefinitions({
      group,
      currentLanguage,
    });

    // 2) 推导当前 tab：优先用“当前 URL 命中的 sidebarId”反推
    if (currentSidebarId) {
      Array.from(tabDefsByTitle.entries()).some(([title, def]) => {
        if (def.kind === "sidebar" && def.sidebarId === currentSidebarId) {
          result.currentTab = title;
          result.currentTabLabel = title;
          return true;
        }
        return false;
      });
    }

    // 兜底：如果无法从 URL 反推（例如 sidebar 为空/无匹配），用当前实例配置的第一个 tab
    if (!result.currentTab) {
      const groupInst = (group.instances || []).find((i) => i.id === targetInstanceID);
      const first = groupInst ? normalizeInstanceTabConfig(groupInst.tab)[0] : undefined;
      if (first) {
        result.currentTab = first.title;
        result.currentTabLabel = first.title;
      } else {
        // 再兜底：任意一个 tab 标题
        const any = tabDefsByTitle.keys().next().value as string | undefined;
        if (any) {
          result.currentTab = any;
          result.currentTabLabel = any;
        }
      }
    }

    // 3) 生成 displayTabs（tab 标题去重后渲染）
    const displayTabs: DisplayTab[] = [];
    const isSameTarget = (a: any, b: any) => {
      if (!a || !b) return false;
      if (a.kind !== b.kind) return false;
      if (a.kind === "external") return a.href === b.href;
      return a.sidebarId === b.sidebarId;
    };

    Array.from(tabDefsByTitle.entries()).forEach(([title, def]) => {
      // 选择一个“跳转实例”：优先当前实例，其次 group 内第一个包含该 tab 的实例
      let jumpInstanceId = targetInstanceID;
      const currentGroupInst = (group.instances || []).find((gi) => gi.id === targetInstanceID);
      const currentTargets = currentGroupInst
        ? normalizeInstanceTabConfig(currentGroupInst.tab)
        : [];
      const currentHas = currentTargets.some((t) => isSameTarget(t, def));
      if (!currentHas) {
        const found = (group.instances || []).find((gi) => {
          const inst = instances.find((i) => i.id === gi.id);
          if (!inst || inst.locale !== currentLanguage) return false;
          const targets = normalizeInstanceTabConfig(gi.tab);
          return targets.some((t) => isSameTarget(t, def));
        });
        if (found) jumpInstanceId = found.id;
      }

      let defaultLink = "/";
      if (def.kind === "external") {
        defaultLink = def.href;
      } else {
        defaultLink = resolveFirstSlugLinkForSidebar({
          instanceId: jumpInstanceId,
          sidebarId: def.sidebarId,
          preferredSlugVersion: slugVersion,
        });
      }

      displayTabs.push({
        tab: title,
        tabLabel: title,
        defaultLink,
      });
    });

    result.displayTabs = displayTabs;
    result.shouldShowTabs = result.displayTabs.length > 1;

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
    // 旧接口保留：基于 tab 标题在 group 内找到对应定义，然后返回默认跳转
    const instances = LibControllerImpl.getInstances();
    const group = LibControllerImpl.getInstanceGroupById(groupId);
    if (!group) return "/";

    const defs = buildGroupTabDefinitions({ group, currentLanguage });
    const def = defs.get(tab);
    if (!def) return "/";

    // 选择 group 下第一个包含该 tab 的实例作为跳转实例
    const targetGroupInst = (group.instances || []).find((gi) => {
      const inst = instances.find((i) => i.id === gi.id);
      if (!inst || inst.locale !== currentLanguage) return false;
      const targets = normalizeInstanceTabConfig(gi.tab);
      if (def.kind === "external") {
        return targets.some((t) => t.kind === "external" && t.title === tab && t.href === def.href);
      }
      return targets.some(
        (t) => t.kind === "sidebar" && t.title === tab && t.sidebarId === def.sidebarId
      );
    });
    if (!targetGroupInst) return "/";

    if (def.kind === "external") return def.href;
    return resolveFirstSlugLinkForSidebar({
      instanceId: targetGroupInst.id,
      sidebarId: def.sidebarId,
      preferredSlugVersion: "",
    });
  }
}

const TabControllerImpl = TabController.getInstance();
export default TabControllerImpl;

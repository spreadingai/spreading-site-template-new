import LibControllerImpl from "./index";
import CommonControllerImpl from "./optimize/common";
import LanguageControllerImpl from "./language-help";
import { DisplayPlatform } from "./types";
import {
  buildGroupTabDefinitions,
  normalizeInstanceTabConfig,
  resolveCurrentSidebarIdFromSlug,
  resolveFirstSlugLinkForSidebar,
} from "./tab-model";

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

    const group = LibControllerImpl.getInstanceGroupByInstanceId(targetInstanceID);
    if (!targetInstance || !group) return result;

    // 当前 platform 仍来自 instanceGroups.platform
    const navInfo = LibControllerImpl.getNavigationInfoByInstanceId(targetInstanceID);
    result.currentPlatform = navInfo.platform || "";
    result.currentPlatformLabel = navInfo.platform || "";

    // 推导当前 tab（标题）：用 URL 反推 sidebarId -> tabTitle
    const currentSidebarId = resolveCurrentSidebarIdFromSlug(slug);
    const tabDefsByTitle = buildGroupTabDefinitions({ group, currentLanguage });
    let currentTabTitle = "";
    if (currentSidebarId) {
      tabDefsByTitle.forEach((def, title) => {
        if (currentTabTitle) return;
        if (def.kind === "sidebar" && def.sidebarId === currentSidebarId) {
          currentTabTitle = title;
        }
      });
    }
    if (!currentTabTitle) {
      // 兜底：取当前实例配置的第一个 tab 标题
      const groupInst = (group.instances || []).find((i) => i.id === targetInstanceID);
      const first = groupInst ? normalizeInstanceTabConfig(groupInst.tab)[0] : undefined;
      currentTabTitle = first?.title || "";
    }

    // 当前 tab 的定义（用于决定“切平台跳转到哪个 sidebarId 或外链”）
    const currentTabDef = currentTabTitle ? tabDefsByTitle.get(currentTabTitle) : undefined;

    // 聚合同 tab 下的 platform 列表
    const displayPlatforms: DisplayPlatform[] = [];
    (group.instances || []).forEach((groupInst) => {
      const instance = instances.find((i) => i.id === groupInst.id);
      if (!instance) return;
      if (instance.locale !== currentLanguage) return;
      if (!groupInst.platform) return;

      // 该实例是否“属于当前 tab”（按 tab 标题匹配 + 且映射一致）
      if (currentTabDef) {
        const targets = normalizeInstanceTabConfig(groupInst.tab);
        const belongs = targets.some((t) => {
          if (t.title !== currentTabTitle) return false;
          if (currentTabDef.kind === "external") {
            return t.kind === "external" && t.href === currentTabDef.href;
          }
          return t.kind === "sidebar" && t.sidebarId === currentTabDef.sidebarId;
        });
        if (!belongs) return;
      }

      let defaultLink = "";
      const reg = /^https?:/i;

      if (currentTabDef?.kind === "external") {
        // 外链 tab：平台项点击只打开新标签页，不改变当前值（现有 InsVersionDropdown 行为）
        defaultLink = currentTabDef.href;
      } else if (currentTabDef?.kind === "sidebar") {
        // sidebar tab：切平台跳转到该 sidebarId 的第一条可用 slug，尽量保持当前 slugVersion
        defaultLink = resolveFirstSlugLinkForSidebar({
          instanceId: instance.id,
          sidebarId: currentTabDef.sidebarId,
          preferredSlugVersion: currentSlugVersion,
          mdxFileID,
        });
      } else if (reg.test(instance.path)) {
        defaultLink = instance.path;
      } else {
        // 兜底：保持当前文档（如果存在）或跳到实例默认
        defaultLink = LanguageControllerImpl.getDefaultLink(
          currentSlugVersion,
          currentDocVersion,
          mdxFileID,
          instance
        );
      }

      // 去重 platform
      const exist = displayPlatforms.find((p) => p.platform === groupInst.platform);
      if (!exist) {
        displayPlatforms.push({
          platform: groupInst.platform,
          platformLabel: groupInst.platform,
          defaultLink,
        });
      }
    });

    result.displayPlatforms = displayPlatforms;
    return result;
  }
}

export default PlatformController.getInstance();

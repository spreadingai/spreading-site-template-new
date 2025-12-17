import LibControllerImpl from "./index";
import { DisplayGroup, DocInstance } from "./types";
import CommonControllerImpl from "./optimize/common";
import { defaultLanguage } from "@/components/context/languageContext";

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

    const targetInstance = instances.find(
      (instance) => instance.id === targetInstanceID
    );

    // 使用 instanceGroups 获取导航信息
    const targetNavInfo = LibControllerImpl.getNavigationInfoByInstanceId(targetInstanceID);

    if (targetInstance && targetNavInfo.group) {
      result.currentGroup = targetNavInfo.group.id;
      result.currentGroupLabel = targetNavInfo.group.name;
      const allSlugs = CommonControllerImpl.readAllSlugsByFile();

      // Aggregate group data - 遍历 instanceGroups 而不是 instances
      const instanceGroups = LibControllerImpl.getInstanceGroups();

      instanceGroups.forEach((group) => {
        // 检查该 group 是否有当前语言的实例
        const groupInstances = group.instances || [];
        const hasLocaleInstance = groupInstances.some((groupInst) => {
          const inst = instances.find((i) => i.id === groupInst.id);
          return inst && inst.locale === currentLanguage;
        });

        if (!hasLocaleInstance) return;

        // 找到该 group 下当前语言的第一个非外链实例
        let defaultLink = "";
        const reg = /^https?:/i;

        // 优先找同 platform 的实例
        const samePlatformInst = groupInstances.find((groupInst) => {
          const inst = instances.find((i) => i.id === groupInst.id);
          return (
            inst &&
            inst.locale === currentLanguage &&
            !reg.test(inst.path) &&
            groupInst.platform === targetNavInfo.platform
          );
        });

        const jumpGroupInst = samePlatformInst || groupInstances.find((groupInst) => {
          const inst = instances.find((i) => i.id === groupInst.id);
          return inst && inst.locale === currentLanguage && !reg.test(inst.path);
        });

        if (jumpGroupInst) {
          const jumpInstance = instances.find((i) => i.id === jumpGroupInst.id);
          if (jumpInstance) {
            const targetSlug = allSlugs.find((item) => {
              return item.params.instanceID === jumpInstance.id;
            });
            defaultLink = targetSlug
              ? `/${targetSlug.params.slug.join("/")}`
              : this.getGroupDefaultLink(jumpInstance, currentLanguage, targetNavInfo.platform);
          }
        } else {
          // 如果没有非外链实例，使用外链
          const externalInst = groupInstances.find((groupInst) => {
            const inst = instances.find((i) => i.id === groupInst.id);
            return inst && inst.locale === currentLanguage && reg.test(inst.path);
          });
          if (externalInst) {
            const inst = instances.find((i) => i.id === externalInst.id);
            if (inst) {
              defaultLink = inst.path;
            }
          }
        }

        // 添加到 displayGroups（去重）
        const exists = result.displayGroups.find((item) => item.group === group.id);
        if (!exists) {
          result.displayGroups.push({
            group: group.id,
            groupLabel: group.name,
            tag: group.tag || null, // undefined 不能被 JSON 序列化，转为 null
            defaultLink,
          });
        }
      });
    }
    return result;
  }

  getGroupDefaultLink(
    instance: DocInstance,
    currentLanguage: string,
    platform: string
  ) {
    console.log("[GroupController]getGroupDefaultLink", instance.id);
    let defaultLink = "";
    if (
      currentLanguage === defaultLanguage &&
      !instance.id.endsWith("_zh") &&
      (instance.locale === defaultLanguage || !instance.locale)
    ) {
      const plaformSuffixMap = {
        "Android: Java": "android",
        "Flutter: Dart": "flutter",
        "iOS: Objective-C": "ios",
        "iOS: Swift": "ios",
        "macOS: Objective-C": "macos",
        "React Native: TS": "rn",
        "React Native: JS": "rn",
        "Unity3D: C#": "u3d",
        "Web: TS": "web",
        "Web: JS": "web",
        "Windows: C++": "win",
        Server: "server",
      };
      const platformSuffix = plaformSuffixMap[platform] || "android";
      if (instance.id.startsWith("zim_")) {
        defaultLink = `/zim-${platformSuffix}/introduction/overview`;
      } else if (instance.id.startsWith("callkit_")) {
        defaultLink = `/uikit/callkit-${platformSuffix}/overview`;
      } else if (instance.id.startsWith("live_streaming_kit_")) {
        defaultLink = `/uikit/live-streaming-kit-${platformSuffix}/overview`;
      } else if (instance.id.startsWith("live_audio_room_kit_")) {
        defaultLink = `/uikit/live-audio-room-kit-${platformSuffix}/overview`;
      } else if (instance.id.startsWith("in_app_chat_kit_")) {
        defaultLink = `/uikit/in-app-chat-kit-${platformSuffix}/overview`;
      } else if (instance.id.startsWith("video_conference_kit_")) {
        defaultLink = `/uikit/video-conference-kit-${platformSuffix}/overview`;
      } else if (instance.id.startsWith("aiagent_")) {
        defaultLink = `/aiagent-${platformSuffix}/introduction/overview`;
      }
    }
    return defaultLink;
  }

  getJumpInstanceByPlatform(
    currentInstance: DocInstance,
    currentLanguage: string,
    currentPlatform: string
  ) {
    let jumpInstance = currentInstance;
    const instances = LibControllerImpl.getInstances();
    const currentNavInfo = LibControllerImpl.getNavigationInfoByInstanceId(currentInstance.id);

    instances.forEach((instance) => {
      const navInfo = LibControllerImpl.getNavigationInfoByInstanceId(instance.id);
      if (
        instance.locale === currentLanguage &&
        currentNavInfo.group &&
        navInfo.group &&
        navInfo.group.id === currentNavInfo.group.id &&
        navInfo.platform === currentPlatform
      ) {
        jumpInstance = instance;
      }
    });
    return jumpInstance;
  }
}

export default GroupController.getInstance();

import LibControllerImpl from "./index";
import { DisplayGroup, DocInstance, NavigationGroupInfo } from "./types";
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
    // console.log(
    //   "[GroupController]getDisplayGroups targetInstanceID",
    //   targetInstanceID
    // );
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
                const jumpInstance = this.getJumpInstanceByPlatform(
                  instance,
                  currentLanguage,
                  targetInstance.navigationInfo.platform
                );
                const targetSlug = allSlugs.find((item) => {
                  return item.params.instanceID === jumpInstance.id;
                });
                defaultLink = targetSlug
                  ? `/${targetSlug.params.slug.join("/")}`
                  : // TODO: 先特殊处理线上 targetSlug 为空的时候，只有英文有这个问题，中文没有
                    this.getGroupDefaultLink(
                      instance,
                      currentLanguage,
                      targetInstance.navigationInfo.platform
                    );
                // : "";
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
    instances.forEach((instance) => {
      const { group, platform } = instance.navigationInfo || {};
      const { group: currentGroup } = currentInstance.navigationInfo || {};
      if (
        instance.locale === currentLanguage &&
        currentGroup &&
        group &&
        group.id === currentGroup.id &&
        platform === currentPlatform
      ) {
        jumpInstance = instance;
      }
    });
    return jumpInstance;
  }
}

export default GroupController.getInstance();

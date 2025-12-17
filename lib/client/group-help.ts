import LibControllerImpl from "./index";
import { DisplayGroup, InstanceGroup } from "../types";

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
    const instanceGroups = LibControllerImpl.getInstanceGroups();

    // Aggregate group data - 遍历 instanceGroups 而不是 instances
    instanceGroups.forEach((group: InstanceGroup) => {
      // 检查该 group 是否有当前语言的实例
      const groupInstances = group.instances || [];
      const hasLocaleInstance = groupInstances.some((groupInst) => {
        const inst = instances.find((i) => i.id === groupInst.id);
        return inst && inst.locale === currentLanguage;
      });

      if (hasLocaleInstance) {
        const exists = result.displayGroups.find((item) => item.group === group.id);
        if (!exists) {
          result.displayGroups.push({
            group: group.id,
            groupLabel: group.name,
            tag: group.tag || null,
          });
        }
      }
    });
    return result;
  }
  getDisplayGroup(group: string, displayGroups: DisplayGroup[]) {
    const target = displayGroups.find((item) => item.group === group);
    return target;
  }
}

export default GroupController.getInstance();

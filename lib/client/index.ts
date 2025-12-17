import {
  DocuoConfig,
  InstanceType,
  DocInstance,
  DisplayInstance,
  InstanceGroup,
  ResolvedNavigationInfo,
} from "../types";

class LibController {
  static _instance: LibController;
  _docuoConfig: DocuoConfig;
  _displayInstances = null;
  static getInstance() {
    return (
      LibController._instance || (LibController._instance = new LibController())
    );
  }
  setClientDocuoConfig(inputDocuoConfig) {
    this._docuoConfig = inputDocuoConfig;
  }
  getClientDocuoConfig() {
    return this._docuoConfig;
  }
  getInstances(type?: InstanceType) {
    let instances: DocInstance[];
    if (!this._docuoConfig) {
      instances = this.getClientDocuoConfig().instances;
    } else {
      instances = this._docuoConfig.instances;
    }

    const reg = /^https?:/i;
    if (type === InstanceType.Normal) {
      return instances.filter((item) => !reg.test(item.path));
    } else if (type === InstanceType.OutsideChain) {
      return instances.filter((item) => reg.test(item.path));
    } else {
      return instances;
    }
  }
  getDisplayInstances(currentLanguage: string) {
    const { i18n } = this.getClientDocuoConfig();
    const result: DisplayInstance[] = [];
    const instances = this.getInstances();
    instances.forEach((instance) => {
      if (
        // Multiple languages are not configured
        !i18n ||
        !currentLanguage ||
        // No instance of locale is configured
        (!instance.locale && i18n.defaultLocale === currentLanguage) ||
        // Locale corresponding instance
        instance.locale === currentLanguage
      ) {
        result.push({
          instance,
        });
      }
    });
    return result;
  }
  getDisplayInstance(instanceID: string, displayInstances: DisplayInstance[]) {
    const target = displayInstances.find(
      (item) => item.instance.id === instanceID
    );
    return target;
  }

  // ========== instanceGroups 相关方法 ==========

  /**
   * 获取所有 instanceGroups
   */
  getInstanceGroups(): InstanceGroup[] {
    const config = this.getClientDocuoConfig();
    return (config?.themeConfig as any)?.instanceGroups || [];
  }

  /**
   * 根据 instanceId 查找所属的 InstanceGroup
   */
  getInstanceGroupByInstanceId(instanceId: string): InstanceGroup | undefined {
    const instanceGroups = this.getInstanceGroups();
    return instanceGroups.find((group) =>
      group.instances?.some((inst) => inst.id === instanceId)
    );
  }

  /**
   * 根据 instanceId 获取完整的导航信息（从 instanceGroups 解析）
   */
  getNavigationInfoByInstanceId(instanceId: string): ResolvedNavigationInfo {
    const group = this.getInstanceGroupByInstanceId(instanceId);
    if (!group) {
      return {};
    }
    const instanceInGroup = group.instances?.find((i) => i.id === instanceId);
    return {
      group: {
        id: group.id,
        name: group.name,
        tag: group.tag,
      },
      category: group.category,
      platform: instanceInGroup?.platform,
      tab: instanceInGroup?.tab,
    };
  }

  /**
   * 根据 groupId 获取 InstanceGroup
   */
  getInstanceGroupById(groupId: string): InstanceGroup | undefined {
    const instanceGroups = this.getInstanceGroups();
    return instanceGroups.find((group) => group.id === groupId);
  }
}

export default LibController.getInstance();

import {
  DocuoConfig,
  Plan,
  InstanceType,
  DocInstance,
  DisplayInstance,
} from "../types";
import { DEFAULT_INSTANCE_ID, UNLIMITED_INSTANCE_NUMBER } from "../constants";

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
}

export default LibController.getInstance();

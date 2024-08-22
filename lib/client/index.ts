import inputDocuoConfig from "@/docs/docuo.config.json";
import {
  DisplayInstance,
  DocuoConfig,
  Plan,
  InstanceType,
  DocInstance,
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
  getDocuoConfig() {
    // Complete the default value
    if (!this._docuoConfig) {
      const docuoConfig: DocuoConfig = JSON.parse(
        JSON.stringify(inputDocuoConfig)
      );
      const defaultInstance = {
        id: DEFAULT_INSTANCE_ID, // Host instance
        label: "docs",
        path: "docs",
        routeBasePath: "",
      };
      // Check instances
      if (!docuoConfig.instances || !docuoConfig.instances.length) {
        // Insert host instance
        docuoConfig.instances = [defaultInstance];
      } else {
        docuoConfig.instances.forEach((instance) => {
          if (!instance.id) {
            instance.id = defaultInstance.id;
          }
          if (!instance.path) {
            instance.path = defaultInstance.path;
          }
          if (!instance.label) {
            instance.label = defaultInstance.label;
          }
          if (!instance.routeBasePath) {
            instance.routeBasePath = "";
          } else {
            // Compatible with old implementations, removing the "/" before and after
            instance.routeBasePath = instance.routeBasePath.replace(
              /^\/|\/$/g,
              ""
            );
          }
          if (docuoConfig.i18n && !instance.locale) {
            instance.locale = docuoConfig.i18n.defaultLocale;
          }
        });
        if (Number(process.env.NEXT_PUBLIC_PLAN) === Plan.Free) {
          docuoConfig.instances.splice(1);
        } else {
          if (
            process.env.NEXT_PUBLIC_INSTANCE_LIMIT !== UNLIMITED_INSTANCE_NUMBER
          ) {
            try {
              const limit = Number(process.env.NEXT_PUBLIC_INSTANCE_LIMIT);
              if (!isNaN(limit) && limit) {
                docuoConfig.instances.splice(limit);
              }
            } catch (error) {
              console.log(
                `[LibController]getDocuoConfig process.env.NEXT_PUBLIC_INSTANCE_LIMIT: `,
                process.env.NEXT_PUBLIC_INSTANCE_LIMIT
              );
            }
          }
        }
      }
      this._docuoConfig = docuoConfig;
    }
    return this._docuoConfig;
  }
  getInstances(type?: InstanceType) {
    let instances: DocInstance[];
    if (!this._docuoConfig) {
      instances = this.getDocuoConfig().instances;
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
  getDisplayInstances(currentLanguage?: string): DisplayInstance[] {
    if (this._displayInstances) {
      return JSON.parse(JSON.stringify(this._displayInstances));
    }
    if (!this._docuoConfig) return [];
    const { i18n } = this._docuoConfig;
    const result: DisplayInstance[] = [];
    const instances = this.getInstances();
    instances.forEach((instance) => {
      if (
        // Multiple languages are not configured
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
}

export default LibController.getInstance();

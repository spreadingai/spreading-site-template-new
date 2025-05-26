import fs from "fs";
import path from "path";
import inputDocuoConfig from "@/docs/docuo.config.json";
import CommonControllerImpl from "./optimize/common";
import {
  DisplayInstance,
  DocuoConfig,
  FooterLink,
  NavBarItem,
  NavBarItemType,
  Plan,
  SlugData,
  InstanceType,
  DocInstance,
} from "./types";
import {
  DEFAULT_INSTANCE_ID,
  ENTITY_ROOT_DIRECTORY,
  UNLIMITED_INSTANCE_NUMBER,
} from "./constants";

class LibController {
  static _instance: LibController;
  _docuoConfig: DocuoConfig;
  _addDefaultLinkMarker = false;
  _updateFooterLinksMarker = false;
  _displayInstances = null;
  static getInstance() {
    return (
      LibController._instance || (LibController._instance = new LibController())
    );
  }
  getDocuoConfig() {
    // Complete the default value
    if (!this._docuoConfig) {
      let docuoConfig: DocuoConfig;
      try {
        const docuoConfigPath = path.resolve(
          "./public",
          "..",
          `${ENTITY_ROOT_DIRECTORY}/${process.env.NEXT_PUBLIC_CONFIG_FILE}`
        );
        console.log(
          "[LibController]getDocuoConfig docuoConfigPath ",
          docuoConfigPath
        );
        const readDocuoConfig = fs.readFileSync(docuoConfigPath, "utf8");
        docuoConfig = JSON.parse(readDocuoConfig);
      } catch (error) {
        // console.log("[LibController]getDocuoConfig docuoConfigPath ", "docs/docuo.config.json");
        docuoConfig = JSON.parse(JSON.stringify(inputDocuoConfig));
      }
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
  getFirstSlug(allSlugs: SlugData[], instanceID: string, sidebarIds: string[]) {
    let firstSlug: string[] = [];
    const targetSlug = allSlugs.find(
      (item) =>
        item.params.instanceID === instanceID &&
        item.params.sidebarId === sidebarIds[0]
    );
    targetSlug && (firstSlug = targetSlug.params.slug);
    return firstSlug;
  }
  addDefaultLink() {
    if (this._addDefaultLinkMarker) return;
    const allSlugs = CommonControllerImpl.readAllSlugsByFile();
    const { themeConfig } = this.getDocuoConfig();
    const instances = this.getInstances();
    if (!themeConfig) return;
    const { navbar } = themeConfig;
    // Add a default jump link to all docSidebar type items and update the `to` field
    const loop = (items: NavBarItem[] = []) => {
      if (items.length === 0) return;
      for (const item of items) {
        if (item.defaultLink) continue;
        !item.docsInstanceId && (item.docsInstanceId = DEFAULT_INSTANCE_ID);
        const instance = instances.find((i) => i.id === item.docsInstanceId);
        const routeBasePath = instance ? instance.routeBasePath : "";
        if (item.type === NavBarItemType.DocSidebar) {
          const firstSlug = this.getFirstSlug(
            allSlugs,
            item.docsInstanceId,
            item.sidebarIds || [item.sidebarId]
          );
          item.defaultLink = `/${firstSlug.join("/")}`;
          // Add routeBasePath
          item.to &&
            (item.to = `${routeBasePath}/${item.to.replace(/^\//, "")}`);
        }
        if (item.items) {
          loop(item.items);
        }
      }
    };
    loop(navbar.items);
    this._addDefaultLinkMarker = true;
  }
  updateFooterLinks() {
    if (this._updateFooterLinksMarker) return;
    const { themeConfig } = this.getDocuoConfig();
    if (!themeConfig) return;
    const { footer } = themeConfig;
    const loop = (links: FooterLink[]) => {
      for (const link of links) {
        // @ts-ignore
        if (link.to) {
        }
        if (link.items) {
          // @ts-ignore
          loop(link.items);
        }
      }
    };
    loop(footer.links);
    this._updateFooterLinksMarker = true;
  }
  getDisplayInstances(currentLanguage: string): DisplayInstance[] {
    if (this._displayInstances) {
      // console.log(`[LibController]getDisplayInstances cache`);
      return JSON.parse(JSON.stringify(this._displayInstances));
    }
    if (!this._docuoConfig) return [];
    const { i18n } = this._docuoConfig;
    const allSlugs = CommonControllerImpl.readAllSlugsByFile();
    const result: DisplayInstance[] = [];
    const instances = this.getInstances();
    instances.forEach((instance) => {
      // Old logic: Instances are bound to languages, and only one of the multiple language instances is displayed
      // if (
      //   i18n &&
      //   i18n.localeConfigs &&
      //   Object.keys(i18n.localeConfigs).find((suffix) =>
      //     instance.id.endsWith(`_${suffix}`)
      //   )
      // ) {
      //   // Only the default language instance is displayed. Instances of other languages share a label with the default language instance
      // } else {
      //   // Finds the first slug corresponding to the instance
      //   const targetSlug = allSlugs.find((item) => {
      //     return item.params.instanceID === instance.id;
      //   });
      //   result.push({
      //     instance,
      //     defaultLink: targetSlug ? `/${targetSlug.params.slug.join("/")}` : "",
      //   });
      // }

      // New logic: Language is independent of the instance, and instances are filtered by language
      if (
        // Multiple languages are not configured
        !currentLanguage ||
        // No instance of locale is configured
        (!instance.locale && i18n.defaultLocale === currentLanguage) ||
        // Locale corresponding instance
        instance.locale === currentLanguage
      ) {
        let defaultLink = "";
        const reg = /^https?:/i;
        if (!reg.test(instance.path)) {
          // Finds the first slug corresponding to the instance
          const targetSlug = allSlugs.find((item) => {
            return item.params.instanceID === instance.id;
          });
          defaultLink = targetSlug
            ? `/${targetSlug.params.slug.join("/")}`
            : "";
        } else {
          defaultLink = instance.path;
        }
        result.push({
          instance,
          defaultLink,
        });
      }
    });
    return result;
  }
  getTargetInstance(targetInstanceID: string) {
    const instances = this.getInstances();
    const targetInstance = instances.find(
      (instance) => instance.id === targetInstanceID
    );
    return targetInstance;
  }
}

export default LibController.getInstance();

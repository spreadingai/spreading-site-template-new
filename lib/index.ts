import inputDocuoConfig from "@/docs/docuo.config.json";
import SlugControllerImpl from "./slug-help";
import {
  DisplayInstance,
  DocuoConfig,
  FooterLink,
  NavBarItem,
  NavBarItemType,
  Plan,
  SlugData,
} from "./types";
import { DEFAULT_INSTANCE_ID, UNLIMITED_INSTANCE_NUMBER } from "./constants";

class LibController {
  static _instance: LibController;
  _docuoConfig: DocuoConfig;
  _entityRootDirectory = "docs";
  _instances: DisplayInstance[];
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
        });
        if (process.env.NEXT_PUBLIC_PLAN === Plan.Free) {
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
  getEntityRootDirectory() {
    return this._entityRootDirectory;
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
    const allSlugs = SlugControllerImpl.getAllSlugs();
    const { themeConfig, instances } = this.getDocuoConfig();
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
  getDisplayInstances(): DisplayInstance[] {
    if (this._displayInstances) {
      console.log(`[LibController]getDisplayInstances cache`);
      return JSON.parse(JSON.stringify(this._displayInstances));
    }
    if (!this._docuoConfig) return [];
    const { i18n } = this._docuoConfig;
    const allSlugs = SlugControllerImpl.getAllSlugs();
    const result: DisplayInstance[] = [];
    this._docuoConfig.instances.forEach((instance) => {
      // if (
      //   i18n &&
      //   i18n.localeConfigs &&
      //   Object.keys(i18n.localeConfigs).find((suffix) =>
      //     instance.id.endsWith(`_${suffix}`)
      //   )
      // ) {
      // } else {
      const targetSlug = allSlugs.find((item) => {
        return item.params.instanceID === instance.id;
      });
      result.push({
        instance,
        defaultLink: targetSlug ? `/${targetSlug.params.slug.join("/")}` : "",
      });
      // }
    });
    return result;
  }
}

export default LibController.getInstance();

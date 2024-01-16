import inputDocuoConfig from "@/docs/docuo.config.json";
import { DocuoConfig, NavBarItem, NavBarItemType, SlugData } from "./types";

class LibController {
  static _instance: LibController;
  _docuoConfig: DocuoConfig;
  _entityRootDirectory = "docs";
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
        id: "default", // Host instance
        label: "docs",
        path: "docs",
        routeBasePath: "docs",
      };
      if (!docuoConfig.instances) {
        docuoConfig.instances = [defaultInstance];
      } else {
        docuoConfig.instances.forEach((instance) => {
          if (!instance.id || instance.id === "default") {
            // Host instance
            instance.id = defaultInstance.id;
            instance.label = defaultInstance.label;
            instance.path = defaultInstance.path;
            instance.routeBasePath = defaultInstance.routeBasePath;
          }
          if (!instance.routeBasePath) {
            instance.routeBasePath = instance.path;
          }
        });
        const result = docuoConfig.instances.find(
          (instance) => instance.id === "default"
        );
        if (!result) {
          // Insert host instance
          docuoConfig.instances.unshift(defaultInstance);
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
  addDefaultLink(allSlugs: SlugData[]) {
    const docuoConfig = this.getDocuoConfig();
    const { navbar } = docuoConfig.themeConfig;
    // Add a default jump link to all docSidebar type items
    const loop = (items: NavBarItem[] = []) => {
      if(items.length === 0) return
      for (const item of items) {
        !item.docsInstanceId && (item.docsInstanceId = "default");
        if (item.type === NavBarItemType.DocSidebar) {
          const firstSlug = this.getFirstSlug(
            allSlugs,
            item.docsInstanceId,
            item.sidebarIds
          );
          item.defaultLink = `/${firstSlug.join("/")}`;
        }
        if (item.items) {
          loop(item.items);
        }
      }
    };
    loop(navbar.items);
  }
}

export default LibController.getInstance();

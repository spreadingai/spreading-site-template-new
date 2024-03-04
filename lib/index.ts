import inputDocuoConfig from "@/docs/docuo.config.json";
import SlugControllerImpl from "./slug-help";
import {
  DisplayInstance,
  DocuoConfig,
  NavBarItem,
  NavBarItemType,
  Plan,
  SlugData,
} from "./types";

class LibController {
  static _instance: LibController;
  _docuoConfig: DocuoConfig;
  _entityRootDirectory = "docs";
  _instances: DisplayInstance[];
  _unlimitedInstanceNumber = "-1";
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
        routeBasePath: "",
      };
      if (!docuoConfig.instances) {
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
          }
        });
        const result = docuoConfig.instances.find(
          (instance) => instance.id === "default"
        );
        if (!result) {
          // Insert host instance
          docuoConfig.instances.unshift(defaultInstance);
        }
        if (process.env.NEXT_PUBLIC_PLAN === Plan.Free) {
          docuoConfig.instances.splice(1);
        } else {
          if (
            process.env.NEXT_PUBLIC_INSTANCE_LIMIT !==
            this._unlimitedInstanceNumber
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
  addDefaultLink(allSlugs: SlugData[]) {
    const { themeConfig } = this.getDocuoConfig();
    if (!themeConfig) return; // 容错
    const { navbar } = themeConfig;
    // Add a default jump link to all docSidebar type items
    const loop = (items: NavBarItem[] = []) => {
      if (items.length === 0) return;
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
  getDisplayInstances(): DisplayInstance[] {
    if (!this._docuoConfig) return [];
    const allSlugs = SlugControllerImpl.getAllSlugs();
    console.log("getDisplayInstances", this._docuoConfig.instances);
    return this._docuoConfig.instances.map((instance) => {
      const targetSlug = allSlugs.find((item) => {
        return item.params.instanceID === instance.id;
      });
      return {
        instance,
        firstSlug: targetSlug.params.slug,
        defaultLink: `/${targetSlug.params.slug.join("/")}`,
      };
    });
  }
}

export default LibController.getInstance();

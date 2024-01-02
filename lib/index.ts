import inputDocuoConfig from "@/docs/docuo.config";
import { DocuoConfig } from "./types";

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
    if (!this._docuoConfig) {
      // Complete the default value
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
}

export default LibController.getInstance();

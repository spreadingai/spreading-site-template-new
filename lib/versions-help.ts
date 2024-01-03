import fs from "fs";
import path from "path";
import LibControllerImpl from "./index";

class VersionsController {
  static _instance: VersionsController;
  _usedVersionsMap: Record<string, string[]> = {};
  _actualVersionsMap: Record<string, string[]> = {};
  _defaultVersion = "next";
  static getInstance() {
    return (
      VersionsController._instance ||
      (VersionsController._instance = new VersionsController())
    );
  }
  getUsedVersions(instanceID: string) {
    // Use the external current version if the file is not present or the list is empty
    if (!this._usedVersionsMap[instanceID]) {
      const { instances } = LibControllerImpl.getDocuoConfig();
      const instance = instances.find((i) => i.id === instanceID);
      const versionsUrl = `${LibControllerImpl.getEntityRootDirectory()}/${
        instance.id === "default" ? "" : instance.id + "_"
      }versions.json`;
      const versionsPath = path.resolve("./public", "..", versionsUrl);
      let versions: string[] = [];
      if (fs.existsSync(versionsPath)) {
        versions = (
          JSON.parse(fs.readFileSync(versionsPath, "utf8")) as string[]
        ).filter((version) => version);
      }
      console.log(`[DocsController]getUsedVersions: `, versions);
      this._usedVersionsMap[instanceID] = versions;
    }
    return JSON.parse(
      JSON.stringify(this._usedVersionsMap[instanceID])
    ) as string[];
  }
  getActualVersions(instanceID: string) {
    if (!this._actualVersionsMap[instanceID]) {
      const { instances } = LibControllerImpl.getDocuoConfig();
      const instance = instances.find((i) => i.id === instanceID);
      const versionedUrl = `${LibControllerImpl.getEntityRootDirectory()}/${
        instance.id === "default" ? "" : instance.id + "_"
      }versioned_docs`;
      const versionedPath = path.resolve("./public", "..", versionedUrl);
      let versioned: string[] = [];
      if (fs.existsSync(versionedPath)) {
        const files = fs.readdirSync(versionedPath);
        versioned = files.map((file) => {
          const temp = file.split("-");
          temp.shift();
          return temp.join("-");
        });
      } else {
        // There is only one default version
        console.error(
          `[DocsController]getActualVersions: No version is currently defined `,
          instanceID
        );
      }
      console.error(`[DocsController]getActualVersions: `, versioned);
      this._actualVersionsMap[instanceID] = versioned;
    }
    return this._actualVersionsMap[instanceID];
  }
  getDefaultVersion() {
    return this._defaultVersion;
  }
  getDisplayVersions(instanceID: string) {
    const usedVersions = this.getUsedVersions(instanceID);
    if (usedVersions.length) {
      usedVersions.unshift(this._defaultVersion);
    }
  }
}

export default VersionsController.getInstance();

import fs from "fs";
import path from "path";
import LibControllerImpl from "./index";
import CommonControllerImpl from "./optimize/common";
import { DisplayVersion, Plan } from "./types";
import {
  DEFAULT_INSTANCE_ID,
  DEFAULT_CURRENT_SLUG_VERSION,
  UNLIMITED_VERSION_NUMBER,
  DEFAULT_CURRENT_DOC_VERSION,
  ENTITY_ROOT_DIRECTORY,
} from "./constants";

class VersionsController {
  static _instance: VersionsController;
  _usedVersionsMap: Record<string, string[]> = {};
  _actualVersionsMap: Record<string, string[]> = {};
  static getInstance() {
    return (
      VersionsController._instance ||
      (VersionsController._instance = new VersionsController())
    );
  }
  getActualVersions(instanceID: string) {
    const instance = LibControllerImpl.getTargetInstance(instanceID);

    // Old Logic
    // const versionedUrl = `${ENTITY_ROOT_DIRECTORY}/${
    //   instance.id === DEFAULT_INSTANCE_ID ? "" : instance.id + "_"
    // }versioned_docs`;
    // const newVersionedUrl = `${ENTITY_ROOT_DIRECTORY}/docs_${
    //   instance.id === DEFAULT_INSTANCE_ID ? "" : instance.id + "_"
    // }versioned`;

    // New logic: Use the path of the instance directly
    // 直接使用实例配置中的path，支持任意路径结构
    const versionedUrl = `${ENTITY_ROOT_DIRECTORY}/${instance.path}/versioned_docs`;

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
    // console.log(`[DocsController]getActualVersions: `, versioned);
    this._actualVersionsMap[instanceID] = versioned;
    return JSON.parse(
      JSON.stringify(this._actualVersionsMap[instanceID])
    ) as string[];
  }
  getDisplayVersions(slug: string[]) {
    const result: DisplayVersion[] = [];
    const instances = LibControllerImpl.getInstances();
    const { instanceID, routeBasePath, mdxFileID } =
      CommonControllerImpl.getExtractInfoFromSlug(slug, instances);
    const instance = LibControllerImpl.getTargetInstance(instanceID);
    const usedVersions = CommonControllerImpl.getUsedVersions(
      instanceID,
      instance
    );
    const usedVersions_copy = JSON.parse(JSON.stringify(usedVersions));
    if (usedVersions.length) {
      // ["1.1.0", "1.0.0", ""]
      usedVersions.push(DEFAULT_CURRENT_DOC_VERSION);
      usedVersions.forEach((docVersion) => {
        const slugVersion = CommonControllerImpl.docVersionToSlugVersion(
          docVersion,
          usedVersions_copy
        );
        const version = slugVersion || docVersion; // Here's the latest version to show
        result.push({
          version,
          defaultLink: `${
            routeBasePath ? "/" + routeBasePath : ""
          }/${slugVersion}${slugVersion ? "/" + mdxFileID : mdxFileID}`,
        });
      });
    } else {
      // There is actually no version or the user has not defined the display version list
      result.push({
        version: DEFAULT_CURRENT_SLUG_VERSION,
        defaultLink: `/${slug.join("/")}`,
      });
    }
    return result;
  }
}

export default VersionsController.getInstance();

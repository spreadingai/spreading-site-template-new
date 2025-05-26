import fs from "fs";
import path from "path";
import { DocInstance, Plan, SlugData } from "../types";
import {
  DEFAULT_CURRENT_DOC_VERSION,
  DEFAULT_CURRENT_SLUG_VERSION,
  DEFAULT_INSTANCE_ID,
  DEFAULT_LATEST_SLUG_VERSION,
  ENTITY_ROOT_DIRECTORY,
  MIDDLEWARE_DIRECTORY,
  UNLIMITED_VERSION_NUMBER,
} from "../constants";

class CommonController {
  static _instance: CommonController;
  _usedVersionsMap: Record<string, string[]> = {};
  _allSlugs: SlugData[];
  static getInstance() {
    return (
      CommonController._instance ||
      (CommonController._instance = new CommonController())
    );
  }
  readAllSlugsByFile(): SlugData[] {
    if (this._allSlugs) {
      // console.log("[CommonController]readAllSlugsByFile: memory cache");
      return this._allSlugs;
    } else {
      let allSlugs: SlugData[] = [];
      const slugsFileUrl = `${ENTITY_ROOT_DIRECTORY}/${MIDDLEWARE_DIRECTORY}/all-slugs.json`;
      const slugsFilePath = path.resolve("./public", "..", slugsFileUrl);
      try {
        if (fs.existsSync(slugsFilePath)) {
          allSlugs = JSON.parse(
            fs.readFileSync(slugsFilePath, "utf8")
          ) as SlugData[];
        } else {
          console.error(
            "[CommonController]readAllSlugsByFile: failed to generate"
          );
        }
      } catch (error) {
        console.error("[CommonController]readAllSlugsByFile: error", error);
      }
      this._allSlugs = allSlugs;
      return this._allSlugs;
    }
  }
  writeAllSlugsByFile(allSlugs: SlugData[]): boolean {
    let result = false;
    const slugsFolderUrl = `${ENTITY_ROOT_DIRECTORY}/${MIDDLEWARE_DIRECTORY}`;
    const slugsFolderPath = path.resolve("./public", "..", slugsFolderUrl);
    try {
      if (!fs.existsSync(slugsFolderPath)) {
        fs.mkdirSync(slugsFolderPath);
      }
      fs.writeFileSync(
        `${slugsFolderPath}/all-slugs.json`,
        JSON.stringify(allSlugs),
        {
          encoding: "utf-8",
        }
      );
      result = true;
    } catch (error) {
      console.error("[CommonController]writeAllSlugsByFile: error", error);
    }
    return result;
  }
  slugVersionToDocVersion(slugVersion: string, versions: string[]) {
    // slugVersion: ""("1.1.0"), "1.0.0", "next"
    let docVersion;
    if (versions.length) {
      if (!slugVersion) {
        docVersion = versions[0];
      } else if (slugVersion === DEFAULT_CURRENT_SLUG_VERSION) {
        docVersion = DEFAULT_CURRENT_DOC_VERSION;
      } else {
        docVersion = slugVersion;
      }
    } else {
      docVersion = DEFAULT_CURRENT_DOC_VERSION;
    }
    return docVersion;
  }
  docVersionToSlugVersion(docVersion: string, versions: string[]) {
    // docVersion: "1.1.0", "1.0.0", ""
    let slugVersion;
    if (versions.length) {
      if (docVersion === DEFAULT_CURRENT_SLUG_VERSION) {
        // No conversion required
        slugVersion = docVersion;
      } else if (docVersion === versions[0]) {
        slugVersion = DEFAULT_LATEST_SLUG_VERSION;
      } else if (!docVersion) {
        slugVersion = DEFAULT_CURRENT_SLUG_VERSION;
      } else {
        slugVersion = docVersion;
      }
    } else {
      slugVersion = DEFAULT_LATEST_SLUG_VERSION;
    }
    return slugVersion;
  }
  getUsedVersions(instanceID: string, instance: DocInstance) {
    if (this._usedVersionsMap[instanceID]) {
      // console.log(`[VersionsController]getUsedVersions cache`);
      return JSON.parse(
        JSON.stringify(this._usedVersionsMap[instanceID])
      ) as string[];
    }
    // Use the external current version if the file is not present or the list is empty
    const temp = instance.path.split("/");
    const instanceFolder = temp.slice(0, temp.length - 1).join("/");
    const versionsUrl = `${ENTITY_ROOT_DIRECTORY}/${
      instance.id === DEFAULT_INSTANCE_ID
        ? ""
        : (instanceFolder ? instanceFolder + "/" : "") + instance.id + "_"
    }versions.json`;
    const versionsPath = path.resolve("./public", "..", versionsUrl);
    let versions: string[] = [];
    // Increased the version limit
    if (Number(process.env.NEXT_PUBLIC_PLAN) !== Plan.Free) {
      if (fs.existsSync(versionsPath)) {
        versions = (
          JSON.parse(fs.readFileSync(versionsPath, "utf8")) as string[]
        ).filter((version) => version);
      }
      if (
        process.env.NEXT_PUBLIC_VERSION_LIMIT &&
        process.env.NEXT_PUBLIC_VERSION_LIMIT !== UNLIMITED_VERSION_NUMBER
      ) {
        try {
          const limit = Number(process.env.NEXT_PUBLIC_VERSION_LIMIT);
          if (!isNaN(limit) && limit) {
            versions.splice(limit - 1);
          }
        } catch (error) {
          console.log(
            `[DocsController]getUsedVersions process.env.NEXT_PUBLIC_VERSION_LIMIT: `,
            process.env.NEXT_PUBLIC_VERSION_LIMIT
          );
        }
      }
    }
    this._usedVersionsMap[instanceID] = versions;
    return JSON.parse(
      JSON.stringify(this._usedVersionsMap[instanceID])
    ) as string[];
  }
  getAllUsedVersions(instances: DocInstance[]) {
    instances.forEach((instance) => {
      const usedVersions = this.getUsedVersions(instance.id, instance);
      this._usedVersionsMap[instance.id] = usedVersions;
    });
    return JSON.parse(JSON.stringify(this._usedVersionsMap)) as Record<
      string,
      string[]
    >;
  }
  getExtractInfoFromSlug(slug: string[], instances: DocInstance[]) {
    // eg1: /route/Base/Path/path/to/doc => The current version when there is no version list
    // eg2: /route/Base/Path/path/to/doc => The latest version when the version list is available
    // eg3: /route/Base/Path/next/path/to/doc => The current version when the version list is available
    // eg4: /route/Base/Path/1.0.0/path/to/doc => The specified version when there is a version list
    let routeBasePath = "",
      slugVersion = slug[0];
    let targetInstance = instances.find(
      (instance) => instance.routeBasePath === routeBasePath
    );
    let instanceID = targetInstance ? targetInstance.id : "";
    let exist;
    for (let index = 0, len = instances.length; index < len; index++) {
      const instance = instances[index];
      if (instance.routeBasePath) {
        const temp = `${instance.routeBasePath}/`;
        const slugStr = slug.join("/");
        const index = slugStr.indexOf(temp);
        if (index !== -1) {
          if (exist === undefined) {
            exist = index;
            routeBasePath = slugStr.slice(0, temp.length - 1);
            slugVersion = slug[routeBasePath.split("/").length];
            instanceID = instance.id;
          } else {
            if (index < exist) {
              exist = index;
              routeBasePath = slugStr.slice(0, temp.length - 1);
              slugVersion = slug[routeBasePath.split("/").length];
              instanceID = instance.id;
            }
          }
        }
      }
    }
    const instance = instances.find((instance) => instance.id === instanceID);

    // 如果找不到实例，可能是因为路径已被重定向，使用默认实例
    if (!instance) {
      console.warn(`[CommonController]getExtractInfoFromSlug: Instance not found: ${instanceID}. Using default instance.`);
      const defaultInstance = instances.find((instance) => instance.id === DEFAULT_INSTANCE_ID) || instances[0];
      if (defaultInstance) {
        instanceID = defaultInstance.id;
      }
    }

    const finalInstance = instances.find((instance) => instance.id === instanceID);
    const versions = finalInstance ? this.getUsedVersions(instanceID, finalInstance) : [];
    // mdxFileID: complex-components/test1/link_test.md
    let mdxFileID = slug
      .slice(routeBasePath ? routeBasePath.split("/").length + 1 : 1)
      .join("/");
    const mdxFileName = slug[slug.length - 1];
    if (!versions.length) {
      slugVersion = DEFAULT_LATEST_SLUG_VERSION;
      mdxFileID = slug
        .slice(routeBasePath ? routeBasePath.split("/").length : 0)
        .join("/");
    } else {
      if (slugVersion !== DEFAULT_CURRENT_SLUG_VERSION) {
        if (!versions.includes(slugVersion)) {
          slugVersion = DEFAULT_LATEST_SLUG_VERSION;
          mdxFileID = slug
            .slice(routeBasePath ? routeBasePath.split("/").length : 0)
            .join("/");
        }
      }
    }
    const result = {
      instanceID,
      routeBasePath,
      slugVersion,
      docVersion: this.slugVersionToDocVersion(slugVersion, versions),
      mdxFileID,
      mdxFileName,
    };
    return result;
  }
  copyStaticFile() {
    const staticFileUrl = `${ENTITY_ROOT_DIRECTORY}/static`;
    const staticFilePath = path.resolve("./public", "..", staticFileUrl);
    const targetFileUrl = "public";
    const targetFilePath = path.resolve("./public", "..", targetFileUrl);

    function loop(source, target) {
      if (!fs.existsSync(source)) {
        return;
      }
      if (!fs.existsSync(target)) {
        fs.mkdirSync(target);
      }
      const files = fs.readdirSync(source);
      files.forEach((file) => {
        const sourcePath = path.join(source, file);
        const targetPath = path.join(target, file);

        if (fs.statSync(sourcePath).isDirectory()) {
          loop(sourcePath, targetPath);
        } else {
          fs.copyFileSync(sourcePath, targetPath);
        }
      });
    }
    loop(staticFilePath, targetFilePath);
  }
}

export default CommonController.getInstance();

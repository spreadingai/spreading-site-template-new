import fs from "fs";
import path from "path";
import LibControllerImpl from "./index";
// TODO:Here's the cross-reference
import SlugControllerImpl from "./slug-help";
import { DisplayVersion, Plan } from "./types";
import {
  DEFAULT_INSTANCE_ID,
  DEFAULT_CURRENT_SLUG_VERSION,
  UNLIMITED_VERSION_NUMBER,
  DEFAULT_CURRENT_DOC_VERSION,
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
  getUsedVersions(instanceID: string) {
    if (this._usedVersionsMap[instanceID]) {
      console.log(`[VersionsController]getUsedVersions cache`);
      return JSON.parse(
        JSON.stringify(this._usedVersionsMap[instanceID])
      ) as string[];
    }
    // Use the external current version if the file is not present or the list is empty
    const instance = LibControllerImpl.getTargetInstance(instanceID);
    const versionsUrl = `${LibControllerImpl.getEntityRootDirectory()}/${
      instance.id === DEFAULT_INSTANCE_ID ? "" : instance.id + "_"
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
  getActualVersions(instanceID: string) {
    const instance = LibControllerImpl.getTargetInstance(instanceID);

    // Old Logic
    // const versionedUrl = `${LibControllerImpl.getEntityRootDirectory()}/${
    //   instance.id === DEFAULT_INSTANCE_ID ? "" : instance.id + "_"
    // }versioned_docs`;
    // const newVersionedUrl = `${LibControllerImpl.getEntityRootDirectory()}/docs_${
    //   instance.id === DEFAULT_INSTANCE_ID ? "" : instance.id + "_"
    // }versioned`;

    // New logic: Use the path of the instance directly
    const temp = instance.path.split("/");
    const instanceFolder = temp.slice(0, temp.length - 1).join("/");
    const versionedUrl = `${LibControllerImpl.getEntityRootDirectory()}/${
      instance.id === DEFAULT_INSTANCE_ID
        ? ""
        : (instanceFolder ? instanceFolder + "/" : "") + instance.id + "_"
    }versioned_docs`;
    const newVersionedUrl = `${LibControllerImpl.getEntityRootDirectory()}/${
      instance.id === DEFAULT_INSTANCE_ID
        ? "docs_versioned"
        : (instanceFolder ? instanceFolder + "/" : "") +
          "docs_" +
          instance.id +
          "_versioned"
    }`;

    const versionedPath = path.resolve("./public", "..", versionedUrl);
    const newVersionedPath = path.resolve("./public", "..", newVersionedUrl);
    let versioned: string[] = [];
    if (fs.existsSync(newVersionedPath)) {
      const files = fs.readdirSync(newVersionedPath);
      versioned = files.map((file) => {
        const temp = file.split("-");
        temp.shift();
        return temp.join("-");
      });
    } else {
      if (fs.existsSync(versionedPath)) {
        const files = fs.readdirSync(versionedPath);
        versioned = files.map((file) => {
          const temp = file.split("-");
          temp.shift();
          return temp.join("-");
        });
      }
      // There is only one default version
      console.error(
        `[DocsController]getActualVersions: No version is currently defined `,
        instanceID
      );
    }
    console.log(`[DocsController]getActualVersions: `, versioned);
    this._actualVersionsMap[instanceID] = versioned;
    return JSON.parse(
      JSON.stringify(this._actualVersionsMap[instanceID])
    ) as string[];
  }
  getDisplayVersions(slug: string[]) {
    const result: DisplayVersion[] = [];
    const { instanceID, routeBasePath, mdxFileID } =
      SlugControllerImpl.getExtractInfoFromSlug(slug);
    const usedVersions = this.getUsedVersions(instanceID);
    if (usedVersions.length) {
      // ["1.1.0", "1.0.0", ""]
      usedVersions.push(DEFAULT_CURRENT_DOC_VERSION);
      usedVersions.forEach((docVersion) => {
        const slugVersion = SlugControllerImpl.docVersionToSlugVersion(
          instanceID,
          docVersion
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

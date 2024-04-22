import fs from "fs";
import path from "path";
import LibControllerImpl from "./index";
// TODO:Here's the cross-reference
import SlugControllerImpl from "./slug-help";
import { DisplayVersion, Plan } from "./types";

class VersionsController {
  static _instance: VersionsController;
  _usedVersionsMap: Record<string, string[]> = {};
  _actualVersionsMap: Record<string, string[]> = {};
  _defaultVersion = "next";
  _unlimitedVersionNumber = "-1";
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
    const { instances } = LibControllerImpl.getDocuoConfig();
    const instance = instances.find((i) => i.id === instanceID);
    const versionsUrl = `${LibControllerImpl.getEntityRootDirectory()}/${
      instance.id === "default" ? "" : instance.id + "_"
    }versions.json`;
    const versionsPath = path.resolve("./public", "..", versionsUrl);
    let versions: string[] = [];
    // Increased the version limit
    if (process.env.NEXT_PUBLIC_PLAN !== Plan.Free) {
      if (fs.existsSync(versionsPath)) {
        versions = (
          JSON.parse(fs.readFileSync(versionsPath, "utf8")) as string[]
        ).filter((version) => version);
      }
      if (
        process.env.NEXT_PUBLIC_VERSION_LIMIT &&
        process.env.NEXT_PUBLIC_VERSION_LIMIT !== this._unlimitedVersionNumber
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
    console.log(`[DocsController]getActualVersions: `, versioned);
    this._actualVersionsMap[instanceID] = versioned;
    return JSON.parse(
      JSON.stringify(this._actualVersionsMap[instanceID])
    ) as string[];
  }
  getDefaultVersion() {
    return this._defaultVersion;
  }
  getDisplayVersions(slug: string[]) {
    const result: DisplayVersion[] = [];
    const { instanceID, routeBasePath, mdxFileID, slugVersion } =
      SlugControllerImpl.getExtractInfoFromSlug(slug);
    const usedVersions = this.getUsedVersions(instanceID);
    const allSlugs = SlugControllerImpl.getAllSlugs();
    if (usedVersions.length) {
      // ["1.1.0", "1.0.0", ""]
      usedVersions.push("");
      usedVersions.forEach((docVersion) => {
        const slugVersion = SlugControllerImpl.docVersionToSlugVersion(
          instanceID,
          docVersion
        );
        const targetSlug = allSlugs.find(
          (item) =>
            item.params.instanceID === instanceID &&
            item.params.slugVersion === slugVersion
        );
        const version = slugVersion || docVersion; // Here's the latest version to show
        targetSlug &&
          result.push({
            version,
            firstSlug: targetSlug.params.slug,
            defaultLink: `${
              routeBasePath ? "/" + routeBasePath : ""
            }/${slugVersion}${slugVersion ? "/" + mdxFileID : mdxFileID}`,
            firstLink: `/${targetSlug.params.slug.join("/")}`,
          });
      });
    } else {
      // There is actually no version or the user has not defined the display version list
      const targetSlug = allSlugs.find(
        (item) =>
          item.params.instanceID === instanceID &&
          item.params.slugVersion === slugVersion
      );
      targetSlug &&
        result.push({
          version: this._defaultVersion,
          firstSlug: targetSlug.params.slug,
          defaultLink: `/${slug.join("/")}`,
          firstLink: `/${targetSlug.params.slug.join("/")}`,
        });
    }
    return result;
  }
}

export default VersionsController.getInstance();

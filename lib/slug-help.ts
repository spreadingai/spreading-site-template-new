import LibControllerImpl from "./index";
import { SidebarItem, SidebarItemType, SlugData } from "./types";
import VersionsControllerImpl from "./versions-help";
import SidebarsControllerImpl from "./sidebars-help";

class SlugController {
  static _instance: SlugController;
  _allSlugs: SlugData[];
  static getInstance() {
    return (
      SlugController._instance ||
      (SlugController._instance = new SlugController())
    );
  }
  getAllSlugs() {
    if (!this._allSlugs) {
      let allSlugs: SlugData[] = [];
      const { instances } = LibControllerImpl.getDocuoConfig();
      for (const instance of instances) {
        const slugs = this.getSlugs(instance.id);
        allSlugs = allSlugs.concat(slugs);
      }
      console.log(`[DocsController]getAllSlugs: `, JSON.stringify(allSlugs));
      this._allSlugs = allSlugs;
    }
    return this._allSlugs;
  }
  getSlugs(instanceID: string) {
    // eg: instance routeBasePath/version/folder/filename
    const { instances } = LibControllerImpl.getDocuoConfig();
    const instance = instances.find((i) => i.id === instanceID);
    const usedSidebarIds = SidebarsControllerImpl.getUsedSidebarIds(instanceID);
    let slugs: SlugData[] = [];
    const slugVersions = VersionsControllerImpl.getUsedVersions(instanceID);
    // Convert to slug version
    if (!slugVersions.length) {
      // [""]
      slugVersions.push("");
    } else {
      // ["next", "1.1.0", "1.0.0"]
      slugVersions.unshift(VersionsControllerImpl.getDefaultVersion());
      slugVersions[1] = this.docVersionToSlugVersion(
        instanceID,
        slugVersions[1]
      );
    }
    console.log(`[DocsController]getSlugs slugVersions: `, slugVersions);

    for (let index = 0, len = slugVersions.length; index < len; index++) {
      let preSlug = [instance.routeBasePath];
      const slugVersion = slugVersions[index];
      slugVersion && (preSlug = preSlug.concat([slugVersion]));
      const sidebars = SidebarsControllerImpl.getSidebars(
        instanceID,
        this.slugVersionToDocVersion(instanceID, slugVersion)
      );
      for (const sidebarId of usedSidebarIds) {
        const sidebarItemList = sidebars[sidebarId] as SidebarItem[];
        slugs = slugs.concat(
          this.traverseChildren(
            instanceID,
            slugVersion,
            sidebarId,
            sidebarItemList,
            preSlug
          )
        );
      }
    }
    console.log(`[DocsController]getSlugs: `, JSON.stringify(slugs));
    return slugs;
  }
  traverseChildren(
    instanceID: string,
    slugVersion: string,
    sidebarId: string,
    sidebarItemList: SidebarItem[],
    preSlug: string[]
  ) {
    const result: SlugData[] = [];
    for (const sidebarItem of sidebarItemList) {
      if (sidebarItem.items) {
        result.push(
          ...this.traverseChildren(
            instanceID,
            slugVersion,
            sidebarId,
            sidebarItem.items as SidebarItem[],
            preSlug
          )
        );
      }
      if (sidebarItem.type === SidebarItemType.Doc) {
        const itemSlug = sidebarItem.id.split("/");
        const slug = [...preSlug, ...itemSlug];
        result.push({
          params: {
            instanceID,
            slugVersion,
            sidebarId,
            slug,
          },
        });
      }
    }
    return result;
  }
  getExtractInfoFromSlug(slug: string[]) {
    // eg1: /docs/path/to/doc => The current version when there is no version list
    // eg2: /docs/path/to/doc => The latest version when the version list is available
    // eg3: /docs/next/path/to/doc => The current version when the version list is available
    // eg4: /docs/1.0.0/path/to/doc => The specified version when there is a version list
    const docuoConfig = LibControllerImpl.getDocuoConfig();
    const routeBasePath = slug[0];
    const instanceID = docuoConfig.instances.find(
      (instance) => instance.routeBasePath === routeBasePath
    ).id;
    const versions = VersionsControllerImpl.getUsedVersions(instanceID);
    let slugVersion = slug[1];
    let mdxFileID = slug.slice(2).join("/");
    const mdxFileName = slug[slug.length - 1];
    if (!versions.length) {
      slugVersion = "";
      mdxFileID = slug.slice(1).join("/");
    } else {
      if (slugVersion !== VersionsControllerImpl.getDefaultVersion()) {
        if (!versions.includes(slugVersion)) {
          slugVersion = "";
          mdxFileID = slug.slice(1).join("/");
        }
      }
    }
    const result = {
      instanceID,
      routeBasePath,
      slugVersion,
      docVersion: this.slugVersionToDocVersion(instanceID, slugVersion),
      mdxFileID,
      mdxFileName,
    };
    console.log(`[SlugController]getExtractInfoFromSlug `, result);
    return result;
  }
  getInstanceIDFromSlug(slug: string[]) {
    const docuoConfig = LibControllerImpl.getDocuoConfig();
    const routeBasePath = slug[0];
    const instanceID = docuoConfig.instances.find(
      (instance) => instance.routeBasePath === routeBasePath
    ).id;
    return instanceID;
  }
  slugVersionToDocVersion(instanceID: string, slugVersion: string) {
    // slugVersion: "next", ""("1.1.0"), "1.0.0",
    const versions = VersionsControllerImpl.getUsedVersions(instanceID);
    let docVersion;
    if (versions.length) {
      if (!slugVersion) {
        docVersion = versions[0];
      } else if (slugVersion === VersionsControllerImpl.getDefaultVersion()) {
        docVersion = "";
      } else {
        docVersion = slugVersion;
      }
    } else {
      docVersion = "";
    }
    return docVersion;
  }
  docVersionToSlugVersion(instanceID: string, docVersion: string) {
    // docVersion: "", "1.1.0", "1.0.0"
    const versions = VersionsControllerImpl.getUsedVersions(instanceID);
    let slugVersion;
    if (versions.length) {
      if (docVersion === VersionsControllerImpl.getDefaultVersion()) {
        // No conversion required
        slugVersion = docVersion;
      } else if (docVersion === versions[0]) {
        slugVersion = "";
      } else if (!docVersion) {
        slugVersion = VersionsControllerImpl.getDefaultVersion();
      } else {
        slugVersion = docVersion;
      }
    } else {
      slugVersion = "";
    }
    console.log(
      `[DocsController]getSlugs docVersionToSlugVersion: `,
      versions,
      docVersion,
      slugVersion
    );
    return slugVersion;
  }
}

export default SlugController.getInstance();

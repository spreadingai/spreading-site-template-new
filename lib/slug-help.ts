import LibControllerImpl from "./index";
import { SidebarItem, SidebarItemType, SlugData } from "./types";
// TODO:Here's the cross-reference
import VersionsControllerImpl from "./versions-help";
import SidebarsControllerImpl from "./sidebars-help";
import {
  DEFAULT_CURRENT_DOC_VERSION,
  DEFAULT_CURRENT_SLUG_VERSION,
  DEFAULT_LATEST_SLUG_VERSION,
} from "./constants";

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
      this._allSlugs = allSlugs;
      console.log(`[SlugController]getAllSlugs generate`);
    } else {
      console.log(`[SlugController]getAllSlugs cache`);
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
      slugVersions.push(DEFAULT_LATEST_SLUG_VERSION);
    } else {
      // ["1.1.0", "1.0.0", "next"]
      slugVersions.push(DEFAULT_CURRENT_SLUG_VERSION);
      slugVersions[0] = this.docVersionToSlugVersion(
        instanceID,
        slugVersions[0]
      );
    }
    for (let index = 0, len = slugVersions.length; index < len; index++) {
      let preSlug = instance.routeBasePath ? [instance.routeBasePath] : [];
      const slugVersion = slugVersions[index];
      slugVersion && (preSlug = preSlug.concat([slugVersion]));
      const sidebars = SidebarsControllerImpl.getSidebars(
        instanceID,
        this.slugVersionToDocVersion(instanceID, slugVersion)
      );
      const temp = usedSidebarIds.length
        ? usedSidebarIds
        : Object.keys(sidebars);
      for (const sidebarId of temp) {
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
    // eg1: /route/Base/Path/path/to/doc => The current version when there is no version list
    // eg2: /route/Base/Path/path/to/doc => The latest version when the version list is available
    // eg3: /route/Base/Path/next/path/to/doc => The current version when the version list is available
    // eg4: /route/Base/Path/1.0.0/path/to/doc => The specified version when there is a version list
    const docuoConfig = LibControllerImpl.getDocuoConfig();
    let routeBasePath = "",
      slugVersion = slug[0];
    let targetInstance = docuoConfig.instances.find(
      (instance) => instance.routeBasePath === routeBasePath
    );
    let instanceID = targetInstance ? targetInstance.id : "";
    docuoConfig.instances.forEach((instance) => {
      if (instance.routeBasePath) {
        const temp = `${instance.routeBasePath}/`;
        const slugStr = slug.join("/");
        const index = slugStr.indexOf(temp);
        if (index !== -1) {
          routeBasePath = slugStr.slice(0, temp.length - 1);
          slugVersion = slug[routeBasePath.split("/").length];
          instanceID = instance.id;
          return;
        }
      }
    });

    const versions = VersionsControllerImpl.getUsedVersions(instanceID);
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
      docVersion: this.slugVersionToDocVersion(instanceID, slugVersion),
      mdxFileID,
      mdxFileName,
    };
    return result;
  }
  getInstanceIDFromSlug(slug: string[]) {
    const docuoConfig = LibControllerImpl.getDocuoConfig();
    const routeBasePath = slug[0];
    let targetInstance = docuoConfig.instances.find(
      (instance) => instance.routeBasePath === routeBasePath
    );
    if (!targetInstance) {
      // No basic path
      targetInstance = docuoConfig.instances.find(
        (instance) => !instance.routeBasePath
      );
    }
    const instanceID = targetInstance.id;
    return instanceID;
  }
  slugVersionToDocVersion(instanceID: string, slugVersion: string) {
    // slugVersion: ""("1.1.0"), "1.0.0", "next"
    const versions = VersionsControllerImpl.getUsedVersions(instanceID);
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
  docVersionToSlugVersion(instanceID: string, docVersion: string) {
    // docVersion: "1.1.0", "1.0.0", ""
    const versions = VersionsControllerImpl.getUsedVersions(instanceID);
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
}

export default SlugController.getInstance();

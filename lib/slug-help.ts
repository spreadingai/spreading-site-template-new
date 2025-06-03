import LibControllerImpl from "./index";
import { InstanceType, SidebarItem, SidebarItemType, SlugData } from "./types";
import SidebarsControllerImpl from "./sidebars-help";
import CommonControllerImpl from "./optimize/common";
import {
  DEFAULT_CURRENT_SLUG_VERSION,
  DEFAULT_LATEST_SLUG_VERSION,
} from "./constants";

class SlugController {
  static _instance: SlugController;
  static getInstance() {
    return (
      SlugController._instance ||
      (SlugController._instance = new SlugController())
    );
  }
  generateAllSlugs() {
    let allSlugs: SlugData[] = [];
    const instances = LibControllerImpl.getInstances(InstanceType.Normal);
    for (const instance of instances) {
      // Filter out the external chain, no slug is generated
      const slugs = this.generateSlugs(instance.id);
      allSlugs = allSlugs.concat(slugs);
    }
    // console.log(`[SlugController]getAllSlugs generate`);
    CommonControllerImpl.writeAllSlugsByFile(allSlugs);
    return allSlugs;
  }
  generateSlugs(instanceID: string) {
    // eg: instance routeBasePath/version/folder/filename
    const instances = LibControllerImpl.getInstances();
    const instance = instances.find((i) => i.id === instanceID);
    const usedSidebarIds = SidebarsControllerImpl.getUsedSidebarIds(instanceID);
    let slugs: SlugData[] = [];
    const slugVersions = CommonControllerImpl.getUsedVersions(
      instanceID,
      instance
    );
    const slugVersions_copy = JSON.parse(JSON.stringify(slugVersions));
    // Convert to slug version
    if (!slugVersions.length) {
      // [""]
      slugVersions.push(DEFAULT_LATEST_SLUG_VERSION);
    } else {
      // ["1.1.0", "1.0.0", "next"]
      slugVersions.push(DEFAULT_CURRENT_SLUG_VERSION);
      slugVersions[0] = CommonControllerImpl.docVersionToSlugVersion(
        slugVersions[0],
        slugVersions_copy
      );
    }
    for (let index = 0, len = slugVersions.length; index < len; index++) {
      let preSlug = instance.routeBasePath ? instance.routeBasePath.split('/') : [];
      const slugVersion = slugVersions[index];
      slugVersion && (preSlug = preSlug.concat([slugVersion]));
      const sidebars = SidebarsControllerImpl.getSidebars(
        instanceID,
        CommonControllerImpl.slugVersionToDocVersion(
          slugVersion,
          slugVersions_copy
        )
      );
      // 如果sidebars为空，跳过这个版本
      if (!sidebars || Object.keys(sidebars).length === 0) {
        continue;
      }
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
}

export default SlugController.getInstance();

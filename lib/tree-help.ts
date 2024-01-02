import SlugControllerImpl from "./slug-help";
import { SidebarItem, SidebarItemType } from "./types";
import VersionsControllerImpl from "./versions-help";
import SidebarsControllerImpl from "./sidebars-help";

class TreeController {
  static _instance: TreeController;
  static getInstance() {
    return (
      TreeController._instance ||
      (TreeController._instance = new TreeController())
    );
  }
  getFolderTreeDataBySlug(slug: string[]) {
    const { instanceID, routeBasePath, docVersion, slugVersion } =
      SlugControllerImpl.extractInfoFromSlug(slug);
    console.log(
      `[DocsController]getFolderTreeDataBySlug slug `,
      slug,
      SlugControllerImpl.extractInfoFromSlug(slug)
    );
    let tree = [];

    const versions = VersionsControllerImpl.getUsedVersions(instanceID);
    if (slugVersion && slugVersion === versions[0]) {
      tree = [];
    } else {
      const usedSidebarIds =
        SidebarsControllerImpl.getUsedSidebarIds(instanceID);
      const sidebars = SidebarsControllerImpl.getSidebars(
        instanceID,
        docVersion
      );
      usedSidebarIds.forEach((sidebarId) => {
        const sidebarItems = sidebars[sidebarId];
        const prefixKey = `${routeBasePath}${
          slugVersion ? "/" : ""
        }${slugVersion}/${sidebarId}`;
        const idPrefixKey = `${routeBasePath}${
          slugVersion ? "/" : ""
        }${slugVersion}`;
        tree = tree.concat(
          this.getChildrenFromChildren(
            sidebarItems as SidebarItem[],
            prefixKey,
            idPrefixKey,
            instanceID,
            docVersion,
            slugVersion
          )
        );
      });
    }
    console.log(
      `[lib/folder-tree]getFolderTreeDataBySlug: `,
      instanceID,
      docVersion,
      slugVersion,
      JSON.stringify(tree)
    );
    return tree;
  }
  getChildrenFromChildren(
    sidebarItems: SidebarItem[],
    prefixKey: string,
    idPrefixKey,
    instanceID,
    docVersion,
    slugVersion
  ) {
    prefixKey = prefixKey || "";
    idPrefixKey = idPrefixKey || "";
    const result = [];
    for (const item of sidebarItems) {
      let children;
      if (item.items) {
        children = this.getChildrenFromChildren(
          item.items as SidebarItem[],
          `${prefixKey}${prefixKey ? "/" : ""}${item.label}`,
          idPrefixKey,
          instanceID,
          docVersion,
          slugVersion
        );
      }
      if (
        item.type === SidebarItemType.Doc ||
        item.type === SidebarItemType.Category
      ) {
        const temp: any = {
          title: item.label,
          type: item.type,
          key: `${prefixKey}${prefixKey ? "/" : ""}${item.label}`,
          instanceID,
          docVersion,
          slugVersion,
        };
        children && (temp.children = children);
        item.type === SidebarItemType.Doc &&
          (temp.id = `${idPrefixKey}/${item.id}`);
        result.push(temp);
      } else {
        result.push({
          title: item.label,
          type: item.type,
          key: `${prefixKey}${prefixKey ? "/" : ""}${item.label}`,
          link: item.href || item.to,
          instanceID,
          docVersion,
          slugVersion,
        });
      }
    }
    return result;
  }
}

export default TreeController.getInstance();

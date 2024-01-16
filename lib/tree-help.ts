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
      SlugControllerImpl.getExtractInfoFromSlug(slug);
    console.log(
      `[DocsController]getFolderTreeDataBySlug slug `,
      slug,
      SlugControllerImpl.getExtractInfoFromSlug(slug)
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
      const temp = usedSidebarIds.length
        ? usedSidebarIds
        : Object.keys(sidebars);
      temp.forEach((sidebarId, index) => {
        const sidebarItems = sidebars[sidebarId];
        const prefixKey = `${routeBasePath}${
          slugVersion ? "/" : ""
        }${slugVersion}/${sidebarId}`;
        const idPrefixKey = `${routeBasePath}${
          slugVersion ? "/" : ""
        }${slugVersion}`;
        tree = tree.concat(
          this.getChildrenFromChildren(
            `${index}`,
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
    return tree;
  }
  getChildrenFromChildren(
    level: string,
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
    for (let index = 0; index < sidebarItems.length; index++) {
      const item = sidebarItems[index];
      let children;
      if (item.items) {
        children = this.getChildrenFromChildren(
          `${level}-${index}`,
          item.items as SidebarItem[],
          `${prefixKey}${prefixKey ? "/" : ""}${item.label}-${level}-${index}`,
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
          key: `${prefixKey}${prefixKey ? "/" : ""}${
            item.label
          }-${level}-${index}`,
          instanceID,
          docVersion,
          slugVersion,
        };
        children && (temp.children = children);
        item.id && (temp.id = `${idPrefixKey}/${item.id}`);
        result.push(temp);
      } else {
        // SidebarItemType.Link
        result.push({
          title: item.label,
          type: item.type,
          key: `${prefixKey}${prefixKey ? "/" : ""}${
            item.label
          }-${level}-${index}`,
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

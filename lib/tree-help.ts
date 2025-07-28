import { FolderTreeData, SidebarItem, SidebarItemType } from "./types";
import LibControllerImpl from "./index";
import CommonControllerImpl from "./optimize/common";
import SidebarsControllerImpl from "./sidebars-help";
import { cacheInstanceData } from "./cache";

class TreeController {
  static _instance: TreeController;
  _folderTreeDataMap: Record<string, Record<string, any[]>> = {};
  _idMap: Record<
    string,
    Record<string, Record<string, { mdxFileID: string; originID: string }>>
  > = {}; // { [instanceID]: { [docVersion]: { [id]: { mdxFileID: "", originID: "" } } } }
  static getInstance() {
    return (
      TreeController._instance ||
      (TreeController._instance = new TreeController())
    );
  }
  getFolderTreeDataBySlug(slug: string[], customID?: string) {
    const instances = LibControllerImpl.getInstances();
    const {
      instanceID,
      routeBasePath,
      docVersion,
      slugVersion,
      mdxFileID: currentMdxFileID,
    } = CommonControllerImpl.getExtractInfoFromSlug(slug, instances);

    // 使用基于实例和版本的缓存优化
    return cacheInstanceData.getFolderTreeData(instanceID, docVersion, () => {

      let tree: FolderTreeData[] = [];
      const instance = LibControllerImpl.getTargetInstance(instanceID);
      const versions = CommonControllerImpl.getUsedVersions(instanceID, instance);
      if (slugVersion && slugVersion === versions[0]) {
        tree = [];
      } else {
        const usedSidebarIds =
          SidebarsControllerImpl.getUsedSidebarIds(instanceID);
        const sidebars = SidebarsControllerImpl.getSidebars(
          instanceID,
          docVersion
        );
        const targetSidebarId =
          SidebarsControllerImpl.getSidebarItemIDByMdxFileID(
            sidebars,
            currentMdxFileID
          );
        const temp = targetSidebarId
          ? [targetSidebarId]
          : usedSidebarIds.length
          ? usedSidebarIds
          : Object.keys(sidebars);
        temp.forEach((sidebarId, index) => {
          const sidebarItems = sidebars[sidebarId];
          const idPrefixKey = `${
            slugVersion
              ? routeBasePath
                ? routeBasePath + "/"
                : ""
              : routeBasePath
          }${slugVersion}`;
          const prefixKey = `${idPrefixKey}${idPrefixKey ? "/" : ""}${sidebarId}`;
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

      // 保持向后兼容
      this._folderTreeDataMap[instanceID] =
        this._folderTreeDataMap[instanceID] || {};
      this._folderTreeDataMap[instanceID][docVersion] = tree;
      return tree;
    });
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

      // 跳过 visible: false 的项目
      if (item.visible === false) {
        continue;
      }

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
          indexStr: `${level}-${index}`,
        };

        // 传递tag信息
        if (item.tag) {
          temp.tag = item.tag;
        }
        if (children) {
          temp.children = children;
          temp.collapsed =
            item.collapsed === undefined ? true : !!item.collapsed;
        }
        if (item.id) {
          temp.mdxFileID = item.id;
          temp.originID = `${idPrefixKey}${idPrefixKey ? "/" : ""}${item.id}`;
          temp.id = this.transLanguageID(temp.originID);
          this.updateIDMap(
            instanceID,
            docVersion,
            temp.id,
            temp.originID,
            temp.mdxFileID
          );
        }
        result.push(temp);
      } else {
        // SidebarItemType.Link
        const linkItem: any = {
          title: item.label,
          type: item.type,
          key: `${prefixKey}${prefixKey ? "/" : ""}${
            item.label
          }-${level}-${index}`,
          link: item.href || item.to,
          instanceID,
          docVersion,
          slugVersion,
          indexStr: `${level}-${index}`,
        };

        // 传递tag信息
        if (item.tag) {
          linkItem.tag = item.tag;
        }

        result.push(linkItem);
      }
    }
    return result;
  }
  updateIDMap(
    instanceID: string,
    docVersion: string,
    id: string,
    originID: string,
    mdxFileID: string
  ) {
    this._idMap[instanceID] = this._idMap[instanceID] || {};
    this._idMap[instanceID][docVersion] =
      this._idMap[instanceID][docVersion] || {};
    this._idMap[instanceID][docVersion][id] = {
      mdxFileID,
      originID,
    };
  }
  transLanguageID(originID: string) {
    return originID;
  }
}

export default TreeController.getInstance();

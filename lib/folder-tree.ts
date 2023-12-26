import docuoConfig from "@/docs/docuo.config";
import { getVersions, getSidebars } from "@/lib/docs";
import { SidebarItem, SidebarItemType } from "./types";

export const getFolderTreeData = (isPreview: boolean) => {
  const tree = [];
  const { instances } = docuoConfig;
  for (const instance of instances) {
    const instanceObj = {
      title: instance.label,
      type: "folder",
      key: instance.routeBasePath,
      children: [],
    };
    const versions = getVersions(instance.id);
    for (const version of versions) {
      const versionObj = {
        title: version,
        type: "folder",
        key: `${instance.routeBasePath}/${version}`,
        children: [],
      };
      const sidebars = getSidebars(instance.id, version);
      const sidebarIds = Object.keys(sidebars);
      for (const sidebarId of sidebarIds) {
        const prefixKey = `${instance.routeBasePath}/${version}/${sidebarId}`;
        const sidebarObj = {
          title: sidebarId,
          type: "folder",
          key: prefixKey,
          children: getChildrenFromChildren(
            sidebars[sidebarId] as SidebarItem[],
            prefixKey
          ),
        };
        versionObj.children.push(sidebarObj);
      }
      instanceObj.children.push(versionObj);
    }
    tree.push(instanceObj);
  }
  console.log(`[lib/folder-tree]getFolderTreeData: `, JSON.stringify(tree));
  return tree;
};

function getChildrenFromChildren(
  sidebarItems: SidebarItem[],
  prefixKey: string
) {
  const result = [];
  for (const item of sidebarItems) {
    let children;
    if (item.items) {
      children = getChildrenFromChildren(
        item.items as SidebarItem[],
        prefixKey
      );
    }
    if (
      item.type === SidebarItemType.Doc ||
      item.type === SidebarItemType.Category
    ) {
      result.push({
        title: item.label,
        type: item.type,
        key: `${prefixKey}/${
          item.type === SidebarItemType.Doc ? item.id : item.label
        }`,
        children,
      });
    } else {
      result.push({
        title: item.label,
        type: item.type,
        key: item.href || item.to,
      });
    }
  }
  return result;
}

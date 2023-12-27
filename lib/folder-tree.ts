import { getVersions, getSidebars } from "@/lib/docs";
import { SidebarItem, SidebarItemType } from "./types";
import { getDocuoConfig, extractInfoFromSlug } from "@/lib/docs";

export const getFolderTreeData = () => {
  const tree = [];
  const { instances } = getDocuoConfig();
  for (const instance of instances) {
    const instanceObj = {
      instanceID: instance.id,
      title: instance.label,
      type: "folder",
      key: instance.routeBasePath,
      children: [],
    };
    const versions = getVersions(instance.id);
    for (const version of versions) {
      const versionObj = {
        version,
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
          sidebarId,
          title: sidebarId,
          type: "folder",
          key: prefixKey,
          children: getChildrenFromChildren(
            sidebars[sidebarId] as SidebarItem[],
            prefixKey,
            instance.routeBasePath,
            version
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

export const getFolderTreeDataBySlug = (slug: string[]) => {
  const { instanceID, routeBasePath, version } = extractInfoFromSlug(slug);
  const sidebars = getSidebars(instanceID, version);
  const sidebarIds = Object.keys(sidebars);
  // TODO: Now take the first one
  const sidebarId = sidebarIds[0];
  const sidebar = sidebars[sidebarId];
  const tree = getChildrenFromChildren(
    sidebar as SidebarItem[],
    `${routeBasePath}/${version}`,
    routeBasePath,
    version
  );
  console.log(
    `[lib/folder-tree]getFolderTreeDataBySlug: `,
    instanceID,
    version,
    sidebarId,
    JSON.stringify(tree)
  );
  return tree;
};

function getChildrenFromChildren(
  sidebarItems: SidebarItem[],
  prefixKey: string,
  routeBasePath: string,
  version: string
) {
  prefixKey = prefixKey || "";
  const result = [];
  for (const item of sidebarItems) {
    let children;
    if (item.items) {
      children = getChildrenFromChildren(
        item.items as SidebarItem[],
        `${prefixKey}${prefixKey ? "/" : ""}${item.label}`,
        routeBasePath,
        version
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
      };
      children && (temp.children = children);
      item.type === SidebarItemType.Doc &&
        (temp.id = `${routeBasePath}/${version}/${item.id}`);
      result.push(temp);
    } else {
      result.push({
        title: item.label,
        type: item.type,
        key: `${prefixKey}${prefixKey ? "/" : ""}${item.label}`,
        link: item.href || item.to,
      });
    }
  }
  return result;
}

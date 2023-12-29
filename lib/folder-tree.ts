import { getUsedVersions, getSidebars } from "@/lib/docs";
import { NavBarItemType, SidebarItem, SidebarItemType } from "./types";
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
    const versions = getUsedVersions(instance.id);
    if (!versions.length) {
      // Currently there is only one version
      versions.push("");
    }
    for (const version of versions) {
      const versionObj = {
        version,
        title: version,
        type: "folder",
        key: `${instance.routeBasePath}${version ? "/" : ""}${version}`,
        children: [],
      };
      const sidebars = getSidebars(instance.id, version);
      const sidebarIds = Object.keys(sidebars);
      for (const sidebarId of sidebarIds) {
        const prefixKey = `${instance.routeBasePath}${
          version ? "/" : ""
        }${version}/${sidebarId}`;
        const sidebarObj = {
          sidebarId,
          title: sidebarId,
          type: "folder",
          key: prefixKey,
          children: getChildrenFromChildren(
            sidebars[sidebarId] as SidebarItem[],
            prefixKey,
            `${instance.routeBasePath}${version ? "/" : ""}${version}`
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
  const { themeConfig } = getDocuoConfig();
  const { navbar } = themeConfig;
  // Only one item is allowed per instance
  const docNavBarItem = navbar.items.filter(
    (item) =>
      item.type === NavBarItemType.DocSidebar &&
      item.docsInstanceId === instanceID
  )[0];
  if (!docNavBarItem) return [];

  console.log(
    `[lib/folder-tree]getFolderTreeDataBySlug sidebarIds: `,
    docNavBarItem.sidebarIds
  );
  const sidebars = getSidebars(instanceID, version);
  let tree = [];
  // Now take the first one
  docNavBarItem.sidebarIds.slice(0, 1).forEach((sidebarId) => {
    const sidebar = sidebars[sidebarId];
    tree = tree.concat(
      getChildrenFromChildren(
        sidebar as SidebarItem[],
        `${routeBasePath}${version ? "/" : ""}${version}/${sidebarId}`,
        `${routeBasePath}${version ? "/" : ""}${version}`
      )
    );
  });
  console.log(
    `[lib/folder-tree]getFolderTreeDataBySlug: `,
    instanceID,
    version,
    docNavBarItem.sidebarIds,
    JSON.stringify(tree)
  );
  return tree;
};

export const getChildrenFromChildren = (
  sidebarItems: SidebarItem[],
  prefixKey: string,
  idPrefixKey
) => {
  prefixKey = prefixKey || "";
  idPrefixKey = idPrefixKey || "";
  const result = [];
  for (const item of sidebarItems) {
    let children;
    if (item.items) {
      children = getChildrenFromChildren(
        item.items as SidebarItem[],
        `${prefixKey}${prefixKey ? "/" : ""}${item.label}`,
        idPrefixKey
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
        (temp.id = `${idPrefixKey}/${item.id}`);
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
};

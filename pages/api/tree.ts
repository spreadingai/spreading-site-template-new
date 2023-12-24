import { getProjectNames, getVersions, getStructure } from "../../lib/docs-helper"
import { getSiteTitle, getIconRedirectUrl, getVersion, getProxyPath } from "../../lib/site-helper"


const getChildrenFromChildren = (prefixKey: string, structureChildren: any, isPreview: Boolean) => {
  try {


    const childs = []
    for (const item of structureChildren) {
      let children = []
      if (item.children) {
        children = getChildrenFromChildren(prefixKey + "/" + item.name, item.children, isPreview)
      }
      let isContentVisible = true;
      if (item.type != 'folder') {
        // 如果是preview，那么preview_hash和publish_hash任意一个值应该有效，否则证明是一个新创建且没有预览也没有发布过的文件
        if (isPreview && !item.attributes.preview_hash && !item.attributes.publish_hash) isContentVisible = false
        // 如果不是preview，那么publish_hash必须为有效值才表示这个文件是需要发布的
        if (!isPreview && !item.attributes.publish_hash) isContentVisible = false
      }

      if (item.type === 'file') {
        if (!isContentVisible && children.length == 0) continue

        childs.push({
          title: item.name,
          type: item.type,
          key: prefixKey + "/" + item.name + "/" + item.uri.split('/').pop().replace(/\.[^/.]+$/, "") + (isPreview ? "/preview" : ""),
          isContentVisible,
          children
        })
      } else if (item.type === 'folder') {
        if (children.length == 0) continue

        childs.push({
          title: item.name,
          type: item.type,
          key: prefixKey + "/" + item.name,
          children
        })
      } else {
        if (!isContentVisible) continue;

        childs.push({
          title: item.name,
          type: item.type,
          key: item.uri
        })
      }
    }
    return childs
  } catch (e) {
    console.log("[Spreading][tree] getChildrenFromChildren: ",e)
  }
}

const getStructureFullTreeData = async (isPreview, hasProxy) => {
  const tree = [];
  const projectNames = await getProjectNames();
  for (const projectName of projectNames) {
    const projectObj = {
      title: projectName,
      type: "folder",
      key: projectName,
      children: []
    }
    let versions = []
    try {
      versions = await getVersions(projectName, isPreview)
    } catch (error) {
      console.log(`[${projectName}][${isPreview}] getStructureFullTreeData failed while getting versions: ${error}`)
    }
    for (const version of versions) {
      const versionObj = {
        title: version,
        type: "folder",
        key: `${projectName}/${version}`,
        children: []
      }

      const structure = await getStructure(projectName, version, isPreview);
      // console.log("[Spreading][getStructureFullTreeData] structure: ", JSON.stringify(structure))

      const languageGroups = structure.folder_group
      for (const group of languageGroups) {
        const languageObj = {
          title: group.name,
          type: "folder",
          key: `${projectName}/${version}/${group.key.toLowerCase()}`,
          children: []
        }
        // folder id list
        const platforms = group.values
        for (const platform of platforms) {
          // Don't show group name if there is only one
          const prefixlanguageName = languageGroups.length > 1 ? "/" + group.key.toLowerCase() : "";
          const topLevelFolder = structure.folders.find((c: { id: string; }) => c.id === platform) || {};
          // Don't show folder name if there is only one
          const prefixPlatformName = structure.folders.length > 1 ? "/" + topLevelFolder.name : "";
          const prefixProxy = hasProxy ? getProxyPath() + "/" : ""
          const prefixKey = prefixProxy + projectName + "/" + version + prefixlanguageName + prefixPlatformName
          const platformObj = {
            title: topLevelFolder.name,
            type: "folder",
            key: `${projectName}/${version}/${group.key}/${topLevelFolder.name}`,
            children: getChildrenFromChildren(prefixKey, topLevelFolder.children, isPreview)
          }

          languageObj.children.push(platformObj)
        }

        versionObj.children.push(languageObj)
      }

      projectObj.children.push(versionObj)
    }

    tree.push(projectObj)
  }

  return tree;
}


export default async function handler(req, res) {
  try {
    const { isPreview, slug } = req.query;
    const proxyInSlug = slug && slug.split("#-#").shift()
    const hasProxy = proxyInSlug == getProxyPath()
    const fullTreeData = await getStructureFullTreeData(isPreview === "true", hasProxy);
    const siteInfo = {
      title: getSiteTitle(),
      iconRedirectUrl: getIconRedirectUrl(),
      version: getVersion(),
    }
    res.status(200).send({ treeData: fullTreeData, proxyPath: hasProxy ? proxyInSlug : "", siteInfo })
  } catch (err) {
    res.status(500).send({ error: 'Failed to fetch data' })
  }
}
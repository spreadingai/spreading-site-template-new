import fs from "fs";
import path from "path";
import inputDocuoConfig from "@/docs/docuo.config";
import {
  DocuoConfig,
  NavBarItemType,
  SidebarItem,
  SidebarItemType,
  Sidebars,
} from "./types";
import { visit } from "unist-util-visit";
import { serialize } from "next-mdx-remote/serialize";
import remarkImages from "remark-images";

class DocsController {
  static _instance: DocsController;
  _UUID = "37e7bcb6-4fa7-431d-b11c-df9a1c26cf62";
  _docuoConfig: DocuoConfig;
  _sidebarsMap: Record<string, Record<string, Sidebars>>;
  _entityRootDirectory = "docs";
  _usedVersionsMap: Record<string, string[]> = {};
  _actualVersionsMap: Record<string, string[]> = {};
  _allSlugs: {
    params: { slug: string[]; instanceID: string; version: string };
  }[] = [];
  static getInstance() {
    return (
      DocsController._instance ||
      (DocsController._instance = new DocsController())
    );
  }
  getDocuoConfig() {
    if (!this._docuoConfig) {
      // Complete the default value
      const docuoConfig: DocuoConfig = JSON.parse(
        JSON.stringify(inputDocuoConfig)
      );
      const defaultInstance = {
        id: "default", // Host instance
        label: "docs",
        path: "docs",
        routeBasePath: "docs",
      };
      if (!docuoConfig.instances) {
        docuoConfig.instances = [defaultInstance];
      } else {
        docuoConfig.instances.forEach((instance) => {
          if (!instance.id || instance.id === "default") {
            // Host instance
            instance.id = defaultInstance.id;
            instance.label = defaultInstance.label;
            instance.path = defaultInstance.path;
            instance.routeBasePath = defaultInstance.routeBasePath;
          }
          if (!instance.routeBasePath) {
            instance.routeBasePath = instance.path;
          }
        });
        const result = docuoConfig.instances.find(
          (instance) => instance.id === "default"
        );
        if (!result) {
          // Insert host instance
          docuoConfig.instances.unshift(defaultInstance);
        }
      }
      this._docuoConfig = docuoConfig;
    }
    return this._docuoConfig;
  }
  getSidebars(instanceID: string, version?: string) {
    if (
      !this._sidebarsMap ||
      this._sidebarsMap[instanceID] ||
      this._sidebarsMap[instanceID][version]
    ) {
      let result: Sidebars = null;
      const { instances } = this.getDocuoConfig();
      const instance = instances.find((i) => i.id === instanceID);
      let rootUrl = `${this._entityRootDirectory}/${
        instance.id === "default" ? "" : instance.id + "_"
      }docs`;
      if (version) {
        rootUrl = `${this._entityRootDirectory}/${
          instance.id === "default" ? "" : instance.id + "_"
        }versioned_docs/version-${version}`;
      }
      const rootPath = path.resolve("./public", "..", rootUrl);

      if (fs.existsSync(rootPath)) {
        const sidebarsUrl = `${rootUrl}/sidebars.json`;
        const sidebarsPath = path.resolve("./public", "..", sidebarsUrl);
        if (fs.existsSync(sidebarsPath)) {
          const sidebarsObj: Sidebars = JSON.parse(
            fs.readFileSync(sidebarsPath, "utf8")
          );
          Object.keys(sidebarsObj).forEach((key) => {
            const firstSidebarItem = sidebarsObj[key][0];
            if (
              typeof firstSidebarItem === "object" &&
              firstSidebarItem.type === SidebarItemType.Autogenerated
            ) {
              // Add autogenerated sidebar
              sidebarsObj[key] = this.generatedSidebar(
                rootUrl,
                firstSidebarItem.dirName
              );
            } else {
              this.transSidebarItemStringToObj(sidebarsObj[key]);
            }
          });
          result = sidebarsObj;
        } else {
          // No is generated by directory by default
          const defaultSidebar = {
            mySidebar: this.generatedSidebar(rootUrl, "."),
          };
          result = defaultSidebar;
        }
      } else {
        console.error(
          `[lib/docs]getSidebars: The document directory for the instance was not found `,
          instanceID
        );
      }
      console.log(`[lib/docs]getSidebars: `, JSON.stringify(result));
      this._sidebarsMap = this._sidebarsMap || {};
      this._sidebarsMap[instanceID] = this._sidebarsMap[instanceID] || {};
      this._sidebarsMap[instanceID][version] = result;
    }
    return this._sidebarsMap[instanceID][version];
  }
  generatedSidebar(rootUrl: string, dirName: string) {
    const dirPath = path.resolve("./public", "..", rootUrl, dirName);
    console.log(`[lib/docs]generatedSidebar: `, rootUrl, dirPath);
    const loop = (dirPath: string) => {
      const stats = fs.statSync(dirPath);
      if (!stats.isDirectory()) {
        const relativePath = path.relative(rootUrl, dirPath);
        const parsedPath = path.parse(relativePath);
        if (parsedPath.ext !== ".json") {
          return {
            type: "doc",
            id: path.join(parsedPath.dir, parsedPath.name),
            label: parsedPath.name,
          };
        } else {
          return null;
        }
      }
      const files = fs.readdirSync(dirPath);
      const sidebar = {
        type: "category",
        label: path.basename(dirPath, path.extname(dirPath)),
        items: [],
      };

      files.forEach((file) => {
        const filePath = path.join(dirPath, file);
        const childTreeData = loop(filePath);
        childTreeData && sidebar.items.push(childTreeData);
      });

      return sidebar;
    };
    const sidebar = (loop(dirPath) as SidebarItem).items;
    console.log(
      `[lib/docs]generatedSidebar sidebar: `,
      JSON.stringify(sidebar)
    );
    return sidebar;
  }
  transSidebarItemStringToObj(sidebar: (string | SidebarItem)[]) {
    const loop = (items: (string | SidebarItem)[]) => {
      items.forEach((sidebarItem, index) => {
        if (typeof sidebarItem === "string") {
          items[index] = {
            type: SidebarItemType.Doc,
            id: sidebarItem,
            label: path.basename(sidebarItem),
          };
        } else {
          if (sidebarItem.items) {
            loop(sidebarItem.items);
          }
        }
      });
    };
    loop(sidebar);
  }
  getUsedVersions(instanceID: string) {
    if (!this._usedVersionsMap[instanceID]) {
      const { instances } = this.getDocuoConfig();
      const instance = instances.find((i) => i.id === instanceID);
      const versionsUrl = `${this._entityRootDirectory}/${
        instance.id === "default" ? "" : instance.id + "_"
      }versions.json`;
      const versionsPath = path.resolve("./public", "..", versionsUrl);
      let versions: string[] = [];
      if (fs.existsSync(versionsPath)) {
        versions = JSON.parse(fs.readFileSync(versionsPath, "utf8"));
      } else {
        versions = this.getActualVersions(instanceID);
      }
      console.log(`[lib/docs]getUsedVersions: `, versions);
      this._usedVersionsMap[instanceID] = versions;
    }
    return this._usedVersionsMap[instanceID];
  }
  getActualVersions(instanceID: string) {
    if (!this._actualVersionsMap[instanceID]) {
      const { instances } = this.getDocuoConfig();
      const instance = instances.find((i) => i.id === instanceID);
      const versionedUrl = `${this._entityRootDirectory}/${
        instance.id === "default" ? "" : instance.id + "_"
      }versioned_docs`;
      const versionedPath = path.resolve("./public", "..", versionedUrl);
      let versioned: string[] = [];
      if (fs.existsSync(versionedPath)) {
        const files = fs.readdirSync(versionedPath);
        versioned = files.map((file) => {
          const temp = file.split("-");
          temp.shift();
          return temp.join("-");
        });
      } else {
        // There is only one default version
        console.error(
          `[lib/docs]getActualVersions: No version is currently defined `,
          instanceID
        );
      }
      console.error(`[lib/docs]getActualVersions: `, versioned);
      this._actualVersionsMap[instanceID] = versioned;
    }
    return this._actualVersionsMap[instanceID];
  }
  getAllSlugs() {
    if (!this._allSlugs) {
      let allSlugs: {
        params: { slug: string[]; instanceID: string; version: string };
      }[] = [];
      const { instances } = this.getDocuoConfig();
      for (const instance of instances) {
        const slugs = this.getSlugs(instance.id, instance.routeBasePath);
        allSlugs = allSlugs.concat(slugs);
      }
      console.log(`[lib/docs]getAllSlugs: `, JSON.stringify(allSlugs));
      this._allSlugs = allSlugs;
    }
    return this._allSlugs;
  }
  getSlugs(instanceID: string, routeBasePath: string) {
    // eg: instance routeBasePath/version/folder/filename
    let slugs: {
      params: { slug: string[]; instanceID: string; version: string };
    }[] = [];
    const versions = this.getUsedVersions(instanceID);
    if (!versions.length) {
      // Currently there is only one version
      versions.push("");
    }

    for (const version of versions) {
      const sidebars = this.getSidebars(instanceID, version);
      const sidebarIds = Object.keys(sidebars);
      // Use only the sidebarId that is used
      for (const sidebarId of sidebarIds) {
        const sidebarItemList = sidebars[sidebarId] as SidebarItem[];
        let preSlug = [routeBasePath];
        version && (preSlug = preSlug.concat([version]));
        slugs = slugs.concat(
          this.traverseChildren(
            instanceID,
            version,
            sidebarId,
            sidebarItemList,
            preSlug
          )
        );
      }
    }
    console.log(`[lib/docs]getSlugs: `, JSON.stringify(slugs));
    return slugs;
  }
  traverseChildren(
    instanceID: string,
    version: string,
    sidebarId: string,
    sidebarItemList: SidebarItem[],
    preSlug: string[]
  ) {
    const result: {
      params: {
        slug: string[];
        instanceID: string;
        version: string;
        sidebarId: string;
      };
    }[] = [];
    for (const sidebarItem of sidebarItemList) {
      if (sidebarItem.items) {
        result.push(
          ...this.traverseChildren(
            instanceID,
            version,
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
            version,
            sidebarId,
            slug,
          },
        });
      }
    }
    return result;
  }
  async readDoc(slug: string[]) {
    console.log(`[lib/docs]readDoc `, slug);
    const { version, mdxFileID, instanceID } = this.extractInfoFromSlug(slug);
    let mdxFileUrl = `${this._entityRootDirectory}/${
      instanceID === "default" ? "" : instanceID + "_"
    }docs/${mdxFileID}.mdx`;
    if (version) {
      mdxFileUrl = `${this._entityRootDirectory}/${
        instanceID === "default" ? "" : instanceID + "_"
      }versioned_docs/version-${version}/${mdxFileID}.mdx`;
    }
    let originContent = fs.readFileSync(
      path.resolve("./public", "..", mdxFileUrl),
      "utf8"
    );
    originContent = originContent
      .replace(
        /```(\S*?\s)([\s\S]*?)(```)(?=\n<\/SCodeBlock>)/gm,
        (_, lang, code) => {
          code = code.replace(/```/g, this._UUID);
          return "```" + lang + code + "```";
        }
      )
      .replaceAll("&nbsp;", " ");
    const myRemarkPlugin = () => {
      return (tree) => {
        visit(tree, "code", (node) => {
          if (typeof node.value === "string") {
            node.value = node.value.replaceAll(this._UUID, "```");
          }
        });
      };
    };
    const mdxSource = await serialize(originContent, {
      mdxOptions: {
        remarkPlugins: [remarkImages, myRemarkPlugin],
        rehypePlugins: [],
        format: "mdx",
        useDynamicImport: true,
      },
      parseFrontmatter: true,
    });
    return {
      slug,
      mdxSource,
    };
  }
  extractInfoFromSlug(slug: string[]) {
    const docuoConfig = this.getDocuoConfig();
    const routeBasePath = slug[0];
    const instanceID = docuoConfig.instances.find(
      (instance) => instance.routeBasePath === routeBasePath
    ).id;
    const versions = this.getUsedVersions(instanceID);
    let version = slug[1];
    let mdxFileID = slug.slice(2).join("/");
    const mdxFileName = slug[slug.length - 1];
    if (!versions.includes(version)) {
      version = "";
      mdxFileID = slug.slice(1).join("/");
    }
    return { instanceID, routeBasePath, version, mdxFileID, mdxFileName };
  }
  getFolderTreeData() {
    const tree = [];
    const { instances } = this.getDocuoConfig();
    for (const instance of instances) {
      const instanceObj = {
        instanceID: instance.id,
        title: instance.label,
        type: "folder",
        key: instance.routeBasePath,
        children: [],
      };
      const versions = this.getUsedVersions(instance.id);
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
        const sidebars = this.getSidebars(instance.id, version);
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
            children: this.getChildrenFromChildren(
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
  }
  getFolderTreeDataBySlug(slug: string[]) {
    const { instanceID, routeBasePath, version } =
      this.extractInfoFromSlug(slug);
    const { themeConfig } = this.getDocuoConfig();
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
    const sidebars = this.getSidebars(instanceID, version);
    let tree = [];
    // Now take the first one
    docNavBarItem.sidebarIds.slice(0, 1).forEach((sidebarId) => {
      const sidebar = sidebars[sidebarId];
      tree = tree.concat(
        this.getChildrenFromChildren(
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
  }
  getChildrenFromChildren(
    sidebarItems: SidebarItem[],
    prefixKey: string,
    idPrefixKey
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
  }
}

export default DocsController.getInstance();

import fs from "fs";
import path from "path";
import docuoConfig from "@/docs/docuo.config";
import { DocInstance, SidebarItem, SidebarItemType, Sidebars } from "./types";

const entityRootDirectory = "docs";

export function getDocuoConfig() {
  // Complete the default value
  if (!docuoConfig.instances) {
    docuoConfig.instances = [
      {
        id: "main", // Host instance
        label: "docs",
        path: "docs",
        routeBasePath: "docs",
      },
    ];
  }
  return docuoConfig;
}

export function getSidebars(instanceID: string, version?: string) {
  let result: Sidebars = null;
  const { instances } = docuoConfig;
  const instance = instances.find((i) => i.id === instanceID);
  let rootUrl = `${entityRootDirectory}/${
    instance.id === "main" ? "" : instance.id + "_"
  }docs`;
  if (version) {
    rootUrl = `${entityRootDirectory}/${
      instance.id === "main" ? "" : instance.id + "_"
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
          sidebarsObj[key] = generatedSidebar(
            rootUrl,
            firstSidebarItem.dirName
          );
        } else {
          transSidebarItemStringToObj(sidebarsObj[key]);
        }
      });
      result = sidebarsObj;
    } else {
      // No is generated by directory by default
      const defaultSidebar = {
        mySidebar: generatedSidebar(rootUrl, "."),
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
  return result;
}

export function getVersions(instanceID: string) {
  const { instances } = docuoConfig;
  const instance = instances.find((i) => i.id === instanceID);
  const versionsUrl = `${entityRootDirectory}/${
    instance.id === "main" ? "" : instance.id + "_"
  }versions.json`;
  const versionsPath = path.resolve("./public", "..", versionsUrl);
  let versions: string[] = [];
  if (fs.existsSync(versionsPath)) {
    versions = JSON.parse(fs.readFileSync(versionsPath, "utf8"));
  } else {
    versions = getAllVersions(instanceID);
  }
  console.error(`[lib/docs]getVersions: `, versions);
  return versions;
}

export function getAllVersions(instanceID: string) {
  const { instances } = docuoConfig;
  const instance = instances.find((i) => i.id === instanceID);
  const versionedUrl = `${entityRootDirectory}/${
    instance.id === "main" ? "" : instance.id + "_"
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
    console.error(
      `[lib/docs]getAllVersions: No version is currently defined `,
      instanceID
    );
  }
  console.error(`[lib/docs]getAllVersions: `, versioned);
  return versioned;
}

export function getAllSlugs() {
  let allSlugs = [];
  const { instances } = docuoConfig;
  for (const instance of instances) {
    const slugs = getSlugs(instance.id);
    allSlugs = allSlugs.concat(slugs);
  }
  return allSlugs;
}

function getSlugs(instanceID: string) {
  //eg: instance routeBasePath/version/folder/filename
  let slugs: string[] = [];
  const versions = getVersions(instanceID);
  for (const version of versions) {
  }
  return slugs;
}

function generatedSidebar(rootUrl: string, dirName: string) {
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
  console.log(`[lib/docs]generatedSidebar sidebar: `, JSON.stringify(sidebar));
  return sidebar;
}

function transSidebarItemStringToObj(sidebar: (string | SidebarItem)[]) {
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

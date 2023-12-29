import fs from "fs";
import path from "path";
import docuoConfig from "@/docs/docuo.config";
import { DocuoConfig, SidebarItem, SidebarItemType, Sidebars } from "./types";
import { visit } from "unist-util-visit";
import { serialize } from "next-mdx-remote/serialize";
import remarkImages from "remark-images";
import { rehypeImages } from "@/plugins";

const entityRootDirectory = "docs";
const UUID = "37e7bcb6-4fa7-431d-b11c-df9a1c26cf62";

export function getDocuoConfig() {
  // Complete the default value
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
  return docuoConfig as DocuoConfig;
}

export function getSidebars(instanceID: string, version?: string) {
  let result: Sidebars = null;
  const { instances } = getDocuoConfig();
  const instance = instances.find((i) => i.id === instanceID);
  let rootUrl = `${entityRootDirectory}/${
    instance.id === "default" ? "" : instance.id + "_"
  }docs`;
  if (version) {
    rootUrl = `${entityRootDirectory}/${
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

export function getUsedVersions(instanceID: string) {
  const { instances } = getDocuoConfig();
  const instance = instances.find((i) => i.id === instanceID);
  const versionsUrl = `${entityRootDirectory}/${
    instance.id === "default" ? "" : instance.id + "_"
  }versions.json`;
  const versionsPath = path.resolve("./public", "..", versionsUrl);
  let versions: string[] = [];
  if (fs.existsSync(versionsPath)) {
    versions = JSON.parse(fs.readFileSync(versionsPath, "utf8"));
  } else {
    versions = getActualVersions(instanceID);
  }
  console.log(`[lib/docs]getUsedVersions: `, versions);
  return versions;
}

export function getActualVersions(instanceID: string) {
  const { instances } = getDocuoConfig();
  const instance = instances.find((i) => i.id === instanceID);
  const versionedUrl = `${entityRootDirectory}/${
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
  return versioned;
}

export function getAllSlugs() {
  let allSlugs: {
    params: { slug: string[]; instanceID: string; version: string };
  }[] = [];
  const { instances } = getDocuoConfig();
  for (const instance of instances) {
    const slugs = getSlugs(instance.id, instance.routeBasePath);
    allSlugs = allSlugs.concat(slugs);
  }
  console.log(`[lib/docs]getAllSlugs: `, JSON.stringify(allSlugs));
  return allSlugs;
}

export async function readDoc(slug: string[]) {
  console.log(`[lib/docs]readDoc `, slug);
  const { version, mdxFileID, instanceID } = extractInfoFromSlug(slug);
  let mdxFileUrl = `${entityRootDirectory}/${
    instanceID === "default" ? "" : instanceID + "_"
  }docs/${mdxFileID}.mdx`;
  if (version) {
    mdxFileUrl = `${entityRootDirectory}/${
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
        code = code.replace(/```/g, UUID);
        return "```" + lang + code + "```";
      }
    )
    .replaceAll("&nbsp;", " ");
  const mdxSource = await serialize(originContent, {
    mdxOptions: {
      remarkPlugins: [remarkImages, myRemarkPlugin],
      rehypePlugins: [
        [rehypeImages, { baseDir: process.cwd(), filePath: mdxFileUrl }],
      ],
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

const myRemarkPlugin = () => {
  return function (tree) {
    visit(tree, "code", function (node) {
      if (typeof node.value === "string") {
        node.value = node.value.replaceAll(UUID, "```");
      }
    });
  };
};

export function extractInfoFromSlug(slug: string[]) {
  const docuoConfig = getDocuoConfig();
  const routeBasePath = slug[0];
  const instanceID = docuoConfig.instances.find(
    (instance) => instance.routeBasePath === routeBasePath
  ).id;
  const versions = getUsedVersions(instanceID);
  let version = slug[1];
  let mdxFileID = slug.slice(2).join("/");
  const mdxFileName = slug[slug.length - 1];
  if (!versions.includes(version)) {
    version = "";
    mdxFileID = slug.slice(1).join("/");
  }
  return { instanceID, routeBasePath, version, mdxFileID, mdxFileName };
}

function getSlugs(instanceID: string, routeBasePath: string) {
  // eg: instance routeBasePath/version/folder/filename
  let slugs: {
    params: { slug: string[]; instanceID: string; version: string };
  }[] = [];
  const versions = getUsedVersions(instanceID);
  if (!versions.length) {
    // Currently there is only one version
    versions.push("");
  }

  for (const version of versions) {
    const sidebars = getSidebars(instanceID, version);
    const sidebarIds = Object.keys(sidebars);
    // Use only the sidebarId that is used
    for (const sidebarId of sidebarIds) {
      const sidebarItemList = sidebars[sidebarId] as SidebarItem[];
      let preSlug = [routeBasePath];
      version && (preSlug = preSlug.concat([version]));
      slugs = slugs.concat(
        traverseChildren(
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

export function traverseChildren(
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
        ...traverseChildren(
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

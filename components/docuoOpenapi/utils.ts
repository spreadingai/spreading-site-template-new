import {
  DEFAULT_INSTANCE_ID,
  DEFAULT_CURRENT_SLUG_VERSION,
  DEFAULT_LATEST_SLUG_VERSION,
  DEFAULT_CURRENT_DOC_VERSION,
} from "@/lib/constants";
import { DisplayInstance } from "@/lib/types";

export const docVersionToSlugVersion = (
  docVersion: string,
  versions: string[]
) => {
  // docVersion: "1.1.0", "1.0.0", ""
  let slugVersion;
  if (versions.length) {
    if (docVersion === DEFAULT_CURRENT_SLUG_VERSION) {
      // No conversion required
      slugVersion = docVersion;
    } else if (docVersion === versions[0]) {
      slugVersion = DEFAULT_LATEST_SLUG_VERSION;
    } else if (!docVersion) {
      slugVersion = DEFAULT_CURRENT_SLUG_VERSION;
    } else {
      slugVersion = docVersion;
    }
  } else {
    slugVersion = DEFAULT_LATEST_SLUG_VERSION;
  }
  return slugVersion;
};

export const parseByInfoPath = (
  infoPath: string,
  displayInstances: DisplayInstance[],
  versions: string[]
) => {
  let result = "";
  if (infoPath) {
    infoPath = infoPath.toLowerCase();
    infoPath = infoPath.replace(/\s/g, "-");
    // docs/xxx/swagger-petstore-yaml
    // xxx_docs/xxx/swagger-petstore-yaml
    // versioned_docs/version-x.x.x/xxx/swagger-petstore-yaml
    // xxx_versioned_docs/version-x.x.x/xxx/swagger-petstore-yaml

    // Compatible prefixes and suffixes
    // docs/xxx/swagger-petstore-yaml
    // docs_xxx/xxx/swagger-petstore-yaml
    // docs_versioned/version-x.x.x/xxx/swagger-petstore-yaml
    // docs_xxx_versioned/version-x.x.x/xxx/swagger-petstore-yaml
    const splitArr = infoPath.split("/");
    const firstStr = splitArr[0];
    const secondStr = splitArr[1];
    let instanceID = "",
      docVersion = DEFAULT_CURRENT_DOC_VERSION,
      docArr = [];
    if (firstStr.endsWith("_versioned_docs")) {
      instanceID = firstStr.split("_versioned_docs")[0];
      docVersion = secondStr.split("version-")[1];
      docArr = splitArr.splice(2);
    } else if (firstStr === "versioned_docs" || firstStr === "docs_versioned") {
      instanceID = DEFAULT_INSTANCE_ID;
      docVersion = secondStr.split("version-")[1];
      docArr = splitArr.splice(2);
    } else if (firstStr.endsWith("_docs")) {
      instanceID = firstStr.split("_docs")[0];
      docVersion = DEFAULT_CURRENT_SLUG_VERSION;
      docArr = splitArr.splice(1);
    } else if (/^docs_\S+_versioned$/.test(firstStr)) {
      const match = firstStr.match(/^docs_(\S+)_versioned$/);
      instanceID = match ? match[1] : DEFAULT_CURRENT_SLUG_VERSION;
      docVersion = secondStr.split("version-")[1];
      docArr = splitArr.splice(2);
    } else if (/^docs_\S+/.test(firstStr)) {
      instanceID = firstStr.split("docs_")[1];
      docVersion = DEFAULT_CURRENT_SLUG_VERSION;
      docArr = splitArr.splice(1);
    } else if (firstStr === "docs") {
      instanceID = DEFAULT_INSTANCE_ID;
      docVersion = DEFAULT_CURRENT_SLUG_VERSION;
      docArr = splitArr.splice(1);
    }
    const displayInstance = displayInstances.find(
      (i) => i.instance.id.toLowerCase() === instanceID
    );
    if (displayInstance) {
      const routeBasePath = displayInstance.instance.routeBasePath;
      const slugVersion = docVersionToSlugVersion(docVersion, versions);
      const temp = [];
      routeBasePath && temp.push(routeBasePath);
      slugVersion && temp.push(slugVersion);
      temp.push(...docArr);
      result = temp.join("/");
    }
  }
  return result;
};

import {
  DEFAULT_INSTANCE_ID,
  DEFAULT_CURRENT_SLUG_VERSION,
  DEFAULT_LATEST_SLUG_VERSION,
  DEFAULT_CURRENT_DOC_VERSION,
} from "@/lib/constants";
import { DocInstance } from "@/lib/types";

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
  instances: DocInstance[],
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
    } else if (firstStr.endsWith("versioned_docs")) {
      instanceID = DEFAULT_INSTANCE_ID;
      docVersion = secondStr.split("version-")[1];
      docArr = splitArr.splice(2);
    } else if (firstStr.endsWith("_docs")) {
      instanceID = firstStr.split("_docs")[0];
      docVersion = DEFAULT_CURRENT_SLUG_VERSION;
      docArr = splitArr.splice(1);
    } else if (firstStr.endsWith("docs")) {
      instanceID = DEFAULT_INSTANCE_ID;
      docVersion = DEFAULT_CURRENT_SLUG_VERSION;
      docArr = splitArr.splice(1);
    }
    const instance = instances.find((i) => i.id === instanceID);
    if (instance) {
      const routeBasePath = instance.routeBasePath;
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

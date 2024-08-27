import { allGroupItem } from "@/components/context/groupContext";
import {
  DEFAULT_CURRENT_DOC_VERSION,
  DEFAULT_CURRENT_SLUG_VERSION,
  DEFAULT_LATEST_SLUG_VERSION,
} from "../constants";
import { DisplayVersion } from "../types";
import LibControllerImpl from "./index";
import { allPlatformItem } from "@/components/context/platformContext";

class VersionsController {
  static _instance: VersionsController;
  static getInstance() {
    return (
      VersionsController._instance ||
      (VersionsController._instance = new VersionsController())
    );
  }
  getDisplayVersions(
    currentGroup: string,
    currentPlatform: string,
    currentLanguage: string,
    allUsedVersions: Record<string, string[]>
  ) {
    // Compatible with all
    const result: DisplayVersion[] = [];
    // Get the instanceID from currentGroup and currentPlatform
    const instanceIDs = this.getInstanceIDs(
      currentLanguage,
      currentGroup,
      currentPlatform
    );
    instanceIDs.forEach((instanceID) => {
      const usedVersions = allUsedVersions[instanceID];
      if (usedVersions && usedVersions.length) {
        // ["1.1.0", "1.0.0", ""]
        usedVersions.push(DEFAULT_CURRENT_DOC_VERSION);
        usedVersions.forEach((docVersion) => {
          const slugVersion = this.docVersionToSlugVersion(
            usedVersions,
            docVersion
          );
          const version = slugVersion || docVersion; // Here's the latest version to show
          const isExist = result.find((item) => item.version === version);
          !isExist &&
            result.push({
              version,
            });
        });
      } else {
        // There is actually no version or the user has not defined the display version list
        const isExist = result.find(
          (item) => item.version === DEFAULT_CURRENT_SLUG_VERSION
        );
        !isExist &&
          result.push({
            version: DEFAULT_CURRENT_SLUG_VERSION,
          });
      }
    });
    return result;
  }
  getInstanceIDs(
    currentLanguage: string,
    currentGroup: string,
    currentPlatform: string
  ) {
    const instances = LibControllerImpl.getInstances();
    const targetInstances = instances.filter(
      (instance) =>
        instance.locale === currentLanguage &&
        ((instance.navigationInfo &&
          instance.navigationInfo.group &&
          instance.navigationInfo.group.id === currentGroup &&
          (instance.navigationInfo.platform === currentPlatform ||
            currentPlatform === allPlatformItem.platform)) ||
          (currentGroup === allGroupItem.group &&
            (currentPlatform === allPlatformItem.platform ||
              instance.navigationInfo.platform === currentPlatform)))
    );
    return targetInstances.map((instance) => instance.id);
  }
  docVersionToSlugVersion(versions: string[], docVersion: string) {
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
  }
}

export default VersionsController.getInstance();

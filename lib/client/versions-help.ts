import {
  DEFAULT_CURRENT_DOC_VERSION,
  DEFAULT_CURRENT_SLUG_VERSION,
  DEFAULT_LATEST_SLUG_VERSION,
} from "../constants";
import { DisplayVersion } from "../types";

class VersionsController {
  static _instance: VersionsController;
  static getInstance() {
    return (
      VersionsController._instance ||
      (VersionsController._instance = new VersionsController())
    );
  }
  getDisplayVersions(
    instanceID: string,
    allUsedVersions: Record<string, string[]>
  ) {
    const result: DisplayVersion[] = [];
    const usedVersions = allUsedVersions[instanceID];
    if (!usedVersions) return result;
    if (usedVersions.length) {
      // ["1.1.0", "1.0.0", ""]
      usedVersions.push(DEFAULT_CURRENT_DOC_VERSION);
      usedVersions.forEach((docVersion) => {
        const slugVersion = this.docVersionToSlugVersion(
          usedVersions,
          docVersion
        );
        const version = slugVersion || docVersion; // Here's the latest version to show
        result.push({
          version,
        });
      });
    } else {
      // There is actually no version or the user has not defined the display version list
      result.push({
        version: DEFAULT_CURRENT_SLUG_VERSION,
      });
    }
    return result;
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

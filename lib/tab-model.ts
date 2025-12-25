import LibControllerImpl from "./index";
import CommonControllerImpl from "./optimize/common";
import SidebarsControllerImpl from "./sidebars-help";
import { DocInstance, InstanceGroup } from "./types";
import {
  assertTabTitleMappingConsistency,
  normalizeInstanceTabConfig,
  type NormalizedTabTarget,
} from "./tab-model-core";

export { normalizeInstanceTabConfig };
export type { NormalizedTabTarget };

export function isSlugPrefixMatch(slug: string[], prefix: string[]) {
  if (prefix.length > slug.length) return false;
  for (let i = 0; i < prefix.length; i++) {
    if (slug[i] !== prefix[i]) return false;
  }
  return true;
}

export function getPreferredSlugPrefix(instance: DocInstance, slugVersion: string) {
  const prefix: string[] = [];
  if (instance.routeBasePath) {
    prefix.push(...instance.routeBasePath.split("/").filter(Boolean));
  }
  if (slugVersion) {
    prefix.push(slugVersion);
  }
  return prefix;
}

export function resolveFirstSlugLinkForSidebar(params: {
  instanceId: string;
  sidebarId: string;
  preferredSlugVersion: string;
}): string {
  const { instanceId, sidebarId, preferredSlugVersion } = params;
  const allSlugs = CommonControllerImpl.readAllSlugsByFile();
  const instances = LibControllerImpl.getInstances();
  const instance = instances.find((i) => i.id === instanceId);
  if (!instance) return "/";

  const candidates = allSlugs.filter(
    (s) => s.params.instanceID === instanceId && s.params.sidebarId === sidebarId
  );
  if (candidates.length === 0) {
    return instance.routeBasePath ? `/${instance.routeBasePath}` : "/";
  }

  const preferredPrefix = getPreferredSlugPrefix(instance, preferredSlugVersion);
  const preferred = candidates.find((c) =>
    isSlugPrefixMatch(c.params.slug, preferredPrefix)
  );

  const chosen = preferred || candidates[0];
  return `/${chosen.params.slug.join("/")}`;
}

export function resolveCurrentSidebarIdFromSlug(slug: string[]) {
  const instances = LibControllerImpl.getInstances();
  const { instanceID, docVersion, mdxFileID } =
    CommonControllerImpl.getExtractInfoFromSlug(slug, instances);
  const sidebars = SidebarsControllerImpl.getSidebars(instanceID, docVersion);
  return SidebarsControllerImpl.getSidebarItemIDByMdxFileID(sidebars, mdxFileID);
}

export function buildGroupTabDefinitions(params: {
  group: InstanceGroup;
  currentLanguage: string;
}): Map<string, NormalizedTabTarget> {
  const { group, currentLanguage } = params;
  const instances = LibControllerImpl.getInstances();
  const tabByTitle = new Map<string, NormalizedTabTarget>();

  (group.instances || []).forEach((groupInst) => {
    const instance = instances.find((i) => i.id === groupInst.id);
    if (!instance) return;
    if (instance.locale !== currentLanguage) return;

    const targets = normalizeInstanceTabConfig(groupInst.tab);
    for (const t of targets) {
      const prev = tabByTitle.get(t.title);
      assertTabTitleMappingConsistency({
        groupId: group.id,
        title: t.title,
        prev,
        next: t,
      });
      if (!prev) tabByTitle.set(t.title, t);
    }
  });

  return tabByTitle;
}



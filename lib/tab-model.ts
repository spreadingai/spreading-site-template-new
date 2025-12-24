import LibControllerImpl from "./index";
import CommonControllerImpl from "./optimize/common";
import SidebarsControllerImpl from "./sidebars-help";
import { DocInstance, InstanceGroup } from "./types";

export type NormalizedTabTarget =
  | {
      kind: "external";
      title: string;
      href: string;
    }
  | {
      kind: "sidebar";
      title: string;
      sidebarId: string;
    };

export function normalizeInstanceTabConfig(
  tab: unknown
): NormalizedTabTarget[] {
  if (!tab) return [];

  // string => { mySidebar: string }
  if (typeof tab === "string") {
    return [
      {
        kind: "sidebar",
        title: tab,
        sidebarId: "mySidebar",
      },
    ];
  }

  // object => { [key]: title }
  if (typeof tab === "object" && tab !== null && !Array.isArray(tab)) {
    const obj = tab as Record<string, unknown>;
    const result: NormalizedTabTarget[] = [];
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value !== "string" || !value) continue;
      if (/^https:\/\//i.test(key)) {
        result.push({ kind: "external", href: key, title: value });
      } else {
        result.push({ kind: "sidebar", sidebarId: key, title: value });
      }
    }
    return result;
  }

  return [];
}

export function assertTabTitleMappingConsistency(params: {
  groupId: string;
  title: string;
  prev?: NormalizedTabTarget;
  next: NormalizedTabTarget;
}) {
  const { groupId, title, prev, next } = params;
  if (!prev) return;

  const same =
    prev.kind === next.kind &&
    (prev.kind === "external"
      ? prev.href === (next as any).href
      : (prev as any).sidebarId === (next as any).sidebarId);

  if (!same) {
    const prevTarget =
      prev.kind === "external" ? prev.href : (prev as any).sidebarId;
    const nextTarget =
      next.kind === "external" ? next.href : (next as any).sidebarId;
    // 需求：同一 group 内，同一个 Tab 标题必须映射到相同的 sidebarId 或外链 URL，否则构建报错/告警
    // 这里选择直接 throw 让构建失败，避免线上产生不确定行为。
    throw new Error(
      `[TabModel] Tab 标题映射冲突：group=${groupId}, title="${title}", prev=${prev.kind}:${prevTarget}, next=${next.kind}:${nextTarget}`
    );
  }
}

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



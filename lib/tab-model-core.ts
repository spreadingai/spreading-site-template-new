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

export function normalizeInstanceTabConfig(tab: unknown): NormalizedTabTarget[] {
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



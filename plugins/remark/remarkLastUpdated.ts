import { visit } from "unist-util-visit";

export interface LastUpdatedMetadata {
  entryFilePath: string;
  dates: Map<string, string>;
}

/** Resolve once per page, after all imported MDX files have been compiled. */
export function resolveLastUpdatedDate(metadata: LastUpdatedMetadata): string | null {
  const entryDate = metadata.dates.get(metadata.entryFilePath);
  const importedDates = Array.from(metadata.dates.entries()).filter(
    ([filePath, date]) => filePath !== metadata.entryFilePath && date !== "none"
  );

  // Ambiguous imports disable display even when the entry has its own date.
  if (entryDate === "none" || importedDates.length > 1) return null;
  return entryDate || importedDates[0]?.[1] || null;
}

/** Collect dates; the page's Heading component owns the display position. */
export function remarkLastUpdated(options: { exportRef: LastUpdatedMetadata }) {
  return function transformer(tree: any, file: { path: string }) {
    let dateStr = "";
    visit(tree, "yaml", (node: any) => {
      if (dateStr) return;
      const lines = String(node.value || "").split("\n");
      for (const line of lines) {
        const match = line.match(/^date:\s*(?:"([^"]*)"|'([^']*)'|([^#]*?))\s*(?:#.*)?$/);
        if (match) {
          dateStr = (match[1] ?? match[2] ?? match[3]).trim();
          break;
        }
      }
    });
    if (dateStr) options.exportRef.dates.set(file.path, dateStr);

    // Explicit JSX h1 tags must use the same date slot as Markdown headings.
    visit(tree, (node: any) => {
      if (
        (node.type !== "mdxJsxFlowElement" && node.type !== "mdxJsxTextElement") ||
        node.name !== "h1"
      ) return;
      node.name = "Heading";
      node.attributes = [
        ...(node.attributes || []),
        { type: "mdxJsxAttribute", name: "level", value: "1" },
      ];
    });
  };
}

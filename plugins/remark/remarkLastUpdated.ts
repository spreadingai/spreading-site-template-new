import { visit } from "unist-util-visit";

/**
 * remark 插件：自动在第一个标题后插入 LastUpdated 组件
 * 从 frontmatter 中读取 date 字段，在第一个 h1 标题后插入 <LastUpdated date="..." /> 组件
 */
export function remarkLastUpdated() {
  return function transformer(tree: any) {
    // 1) 从 AST 的 yaml 节点中提取 frontmatter.date
    let dateStr = "";
    visit(tree, "yaml", (node: any) => {
      if (dateStr) return; // 只取第一段 frontmatter
      const yamlContent = String(node.value || "");
      const lines = yamlContent.split("\n");
      for (const line of lines) {
        const match = line.match(/^\s*([^:]+):\s*["']?([^"'\n]+)["']?\s*$/);
        if (match && match[1].trim() === "date") {
          dateStr = match[2].trim();
          break;
        }
      }
    });

    if (!dateStr) return;

    const root = tree as any;
    const rootChildren = Array.isArray(root.children) ? root.children : [];

    // 2) 定位第一个 H1 或 `Heading` 组件（默认视为主标题）
    const isLevelOneHeading = (node: any): boolean => {
      if (!node) return false;
      if (node.type === "heading") return node.depth === 1;
      if (node.type === "mdxJsxFlowElement" && node.name === "Heading") {
        const levelAttr = (node.attributes || []).find((a: any) => a.name === "level");
        const levelVal = typeof levelAttr?.value === "object" ? levelAttr?.value?.value : levelAttr?.value;
        return levelAttr ? String(levelVal) === "1" : true;
      }
      return false;
    };

    const insertNode = {
      type: "mdxJsxFlowElement",
      name: "LastUpdated",
      attributes: [{ type: "mdxJsxAttribute", name: "date", value: dateStr }],
      children: [],
    };

    // 优先：在第一个主标题之后插入
    const h1Index = rootChildren.findIndex(isLevelOneHeading);
    if (h1Index >= 0) {
      rootChildren.splice(h1Index + 1, 0, insertNode);
      return;
    }

    // 兜底：在第一个非 yaml、非 mdxjsEsm 节点后插入
    const firstNormalIndex = rootChildren.findIndex(
      (n: any) => n && n.type !== "yaml" && n.type !== "mdxjsEsm"
    );
    if (firstNormalIndex >= 0) {
      rootChildren.splice(firstNormalIndex + 1, 0, insertNode);
    }
  };
}

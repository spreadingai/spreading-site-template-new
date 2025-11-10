import { visit } from "unist-util-visit";
import path from "path";
import { ignoreNumberPrefix } from "@/lib/utils";

// Standard a tag or tags similar to a (does not contain expression)

// <a href="/xxx">xxx</a> Absolute paths are not supported
// <a href="xxx">xxx</a> Support relative paths
// <Comp href="/xxx">xxx</Comp> Absolute paths are not supported
// <Comp href="xxx">xxx</Comp> Support relative paths

// <a>xxx</a> Filter
// <a href="">xxx</a> Filter
// <a href="http://xxx">xxx</a> Filter
// <a href="https://xxx">xxx</a> Filter
// <a href=":xxx">xxx</a> Filter
// <a href="#xxx">xxx</a> Filter

// <Comp>xxx</Comp> Filter
// <Comp href="">xxx</Comp> Filter
// <Comp href="http://xxx">xxx</Comp> Filter
// <Comp href="https://xxx">xxx</Comp> Filter
// <Comp href=":xxx">xxx</Comp> Filter
// <Comp href="#xxx">xxx</Comp> Filter

export function rehypeA(options: {
  prefix: string;
  rootUrl: string;
  filePath: string;
}) {
  return function updateATag(tree, file) {
    visit(tree, (node, i, parent) => {
      if (!node.attributes) return;
      const tagName = (node as any)?.name;
      if (!['a', 'Button'].includes(tagName)) return;

      const target = node.attributes.find(
        (item) =>
          item.name === "href" && item.type === "mdxJsxAttribute" && item.value
      );
      if (!target || typeof target.value !== "string") return;

      const href = String(target.value);
      if (
        href.startsWith("http") ||
        href.startsWith(":") ||
        href.startsWith("#") ||
        href.startsWith("@") ||
        href.startsWith("!") ||
        href.startsWith("docuo-link@") ||
        href.startsWith("docuo-link!") ||
        href.startsWith("/article/")
      ) {
        return;
      }

      if (!options.rootUrl || !options.filePath) return;

      // 绝对路径：仅在无后缀时补 basePath
      const hasExt = (s: string) => {
        const clean = s.split("#")[0].split("?")[0];
        const last = clean.substring(clean.lastIndexOf("/") + 1);
        return /\.[^./]+$/.test(last);
      };
      if (href.startsWith("/")) {
        // 构建期：对 a/Button 的“/ 开头且无后缀”的链接补上 basePath，避免运行期再依赖 Link
        const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
        const alreadyPrefixed = basePath && href.startsWith(`${basePath}/`);
        if (!hasExt(href) && basePath && !alreadyPrefixed) {
          target.value = `${basePath}${href}`;
        }
        return;
      }

      // 相对路径：沿用原有 prefix 转换
      const parsedPath = path.parse(href);
      let targetHref = `${parsedPath.dir}/${parsedPath.name}`;
      targetHref += parsedPath.ext.replace(/^\.mdx?/gi, "");
      const imagePath = path.resolve(
        path.dirname(options.filePath),
        targetHref
      );
      const publicPath = path.relative(options.rootUrl, imagePath);
      const convertDocID = (str: string) => {
        const result = [];
        const temp = str.split("/");
        temp.forEach((path) => {
          result.push(
            path.toLowerCase().replace(/%20/g, " ").replace(/\s+/g, "-")
          );
        });
        return result.join("/");
      };
      target.value = `${
        options.prefix.startsWith("/") ? options.prefix : "/" + options.prefix
      }/${convertDocID(ignoreNumberPrefix(publicPath))}`;
    });
  };
}

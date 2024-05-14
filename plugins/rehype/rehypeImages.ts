import { visit } from "unist-util-visit";
import path from "path";
import fs from "fs";

export function rehypeImages(options) {
  return function transformer(tree) {
    if (!options.filePath) return;
    let firstImgSrc = "";
    visit(tree, (node) => {
      let finalPath = "";
      if (
        node.type === "element" &&
        node.tagName === "img" &&
        node.properties.src &&
        !node.properties.src.startsWith("http")
      ) {
        // Get the relative file path of the image
        const relativePath = node.properties.src;
        const publicPath = getPublicPath(relativePath, options.filePath);
        finalPath = node.properties.src = getFinalPath(relativePath, publicPath);
      }
      if (node.type === "mdxJsxFlowElement" && node.name === "img") {
        const attributes = node.attributes || [];
        const srcAttribute = attributes.find((attr) => attr.name === "src");
        if (!srcAttribute || srcAttribute.value.startsWith("http")) return;
        // Get the relative file path of the image
        const relativePath = srcAttribute.value;
        const publicPath = getPublicPath(relativePath, options.filePath);
        finalPath = srcAttribute.value = getFinalPath(relativePath, publicPath);
      }
      if (node.type === "mdxJsxFlowElement" && node.name === "Card") {
        const attributes = node.attributes || [];
        const iconAttribute = attributes.find((attr) => attr.name === "icon");
        if (!iconAttribute || typeof iconAttribute.value !== "string" || iconAttribute.value?.startsWith("http"))
          return;
        const relativePath = iconAttribute.value;
        const publicPath = getPublicPath(relativePath, options.filePath);
        finalPath = iconAttribute.value = getFinalPath(relativePath, publicPath);
      }

      if (finalPath && !firstImgSrc) {
        firstImgSrc = finalPath;
      }
    });
    options.exportRef.firstImgSrc = firstImgSrc;
  };
}

function getFinalPath(originalPath, publicPath) {
  if (publicPath) {
    return `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/docs/${path.join(publicPath)}`;
  }
  if (originalPath.startsWith("/")) {
    return `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${originalPath}`;
  }
  return "";
}

/**
 * Function to get the public path of an image relative to the public directory.
 * If the image does not exist, it returns an empty string.
 *
 * @param relativePath - The relative path of the image from the mdx file.
 * @param filePath - The absolute path of the mdx file.
 * @returns The public path of the image relative to the public directory.
 */
function getPublicPath(relativePath, filePath) {
  // Get absolute path of the image
  const imagePath = path.resolve(path.dirname(filePath), relativePath);
  // Determine whether the image exists
  const isExist = fs.existsSync(imagePath);
  // Skip if the image does not exist
  if (!isExist) return "";
  // Get the path relative to the docs directory
  const publicPath = path.relative("docs", imagePath);
  // Create the public directory (if it does not exist)
  fs.mkdirSync("public/docs", { recursive: true });
  // Create the same folder structure in the public directory
  fs.mkdirSync(path.join("public/docs", path.dirname(publicPath)), {
    recursive: true
  });
  // Copy the image to the public directory
  const destPath = path.join("public/docs", publicPath);
  fs.copyFileSync(imagePath, destPath);
  return publicPath;
}

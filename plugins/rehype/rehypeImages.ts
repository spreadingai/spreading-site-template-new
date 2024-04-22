import { visit } from "unist-util-visit";
import path from "path";
import fs from "fs";

export function rehypeImages(options) {
  return function transformer(tree) {
    if (!options.filePath) return;
    let firstImgMarker = false;
    let firstImgSrc = "";
    visit(tree, (node) => {
      if (
        node.type === "element" &&
        node.tagName === "img" &&
        node.properties.src &&
        !node.properties.src.startsWith("http")
      ) {
        // Get the relative file path of the image
        const relativePath = node.properties.src;
        const publicPath = getPublicPath(relativePath, options.filePath);
        if (publicPath === "") {
          if (relativePath.startsWith("/")) {
            // Absolute path
            // Update the image path in the AST
            node.properties.src = `${
              process.env.NEXT_PUBLIC_BASE_PATH || ""
            }${relativePath}`;
          }
        } else {
          // Update the image path in the AST
          node.properties.src = `${
            process.env.NEXT_PUBLIC_BASE_PATH || ""
          }/docs/${path.join(publicPath)}`;
        }

        if (!firstImgMarker && node.properties.src) {
          firstImgSrc = node.properties.src;
          firstImgMarker = true;
        }
      }
      if (node.type === "mdxJsxFlowElement" && node.name === "img") {
        const attributes = node.attributes || [];
        const srcAttribute = attributes.find((attr) => attr.name === "src");
        if (!srcAttribute || srcAttribute.value.startsWith("http")) return;
        // Get the relative file path of the image
        const relativePath = srcAttribute.value;
        const publicPath = getPublicPath(relativePath, options.filePath);
        if (publicPath === "") {
          if (relativePath.startsWith("/")) {
            // Absolute path
            // Update the image path in the AST
            srcAttribute.value = `${
              process.env.NEXT_PUBLIC_BASE_PATH || ""
            }${relativePath}`;
          }
        } else {
          // Update the image path in the AST
          srcAttribute.value = `${
            process.env.NEXT_PUBLIC_BASE_PATH || ""
          }/docs/${path.join(publicPath)}`;
        }

        if (!firstImgMarker && srcAttribute.value) {
          firstImgSrc = srcAttribute.value;
          firstImgMarker = true;
        }
      }
    });
    options.exportRef.firstImgSrc = firstImgSrc;
  };
}

function getPublicPath(relativePath, filePath) {
  // Get the relative path of the image
  const imagePath = path.resolve(path.dirname(filePath), relativePath);
  // Determine whether the image exists
  const isExist = fs.existsSync(imagePath);
  // Skip if the image does not exist
  if (!isExist) return "";
  // Get the relative path of the image and
  const publicPath = path.relative("docs", imagePath);
  // Create the public directory (if it does not exist)
  fs.mkdirSync("public/docs", { recursive: true });
  // Create the same folder structure in the public directory
  fs.mkdirSync(path.join("public/docs", path.dirname(publicPath)), {
    recursive: true,
  });
  // Copy the image to the public directory
  const destPath = path.join("public/docs", publicPath);
  fs.copyFileSync(imagePath, destPath);
  return publicPath;
}

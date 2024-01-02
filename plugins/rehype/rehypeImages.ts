import { visit } from "unist-util-visit";
import path from "path";
import fs from "fs";

export function rehypeImages(options) {
  return function transformer(tree, file) {
    visit(tree, "element", (node) => {
      if(!options.filePath) return
      if (
        node.tagName === "img" &&
        node.properties.src &&
        !node.properties.src.startsWith("http")
      ) {
        // Get the relative file path of the image
        const relativePath = node.properties.src;
        // Get the relative path of the image
        const imagePath = path.resolve(
          path.dirname(options.filePath),
          relativePath
        );
        // Determine whether the image exists
        const isExist = fs.existsSync(imagePath);
        // Skip if the image does not exist
        if (!isExist) return;
        // Get the relative path of the image and
        const publicPath = path.relative("docs", imagePath);
        // Create the public directory (if it does not exist)
        fs.mkdirSync("public", { recursive: true });
        // Create the same folder structure in the public directory
        fs.mkdirSync(path.join("public", path.dirname(publicPath)), {
          recursive: true,
        });
        // Copy the image to the public directory
        const destPath = path.join("public", publicPath);
        fs.copyFileSync(imagePath, destPath);
        // Update the image path in the AST
        node.properties.src = `/${path.join(publicPath)}`;
      }
    });
  };
}

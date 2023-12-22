import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import remarkMdxImages from "remark-mdx-images";
// Just use remarkFrontmatter
import remarkFrontmatter from "remark-frontmatter";
// import remarkMdxFrontmatter from "remark-mdx-frontmatter";

/** @type {import('next').NextConfig} */

const nextConfig = {
  // Configure `pageExtensions` to include MDX files
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  // Optionally, add any other Next.js config below
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [remarkFrontmatter, remarkMdxImages],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);

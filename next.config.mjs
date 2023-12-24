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
  reactStrictMode: true, // Version 13.4 or later is true by default in the app router
  swcMinify: true, // Version 13 or later is true by default
  compress: false, // TODO:Why disable gzip
  experimental: {
    // Defaults to 50MB
    isrMemoryCacheSize: 0,
  },
  output: "standalone",
  basePath: process.env.BASE_PATH || "",
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/home",
      },
      {
        source: "/preview",
        destination: "/home/preview",
      },
    ];
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [remarkFrontmatter, remarkMdxImages],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);

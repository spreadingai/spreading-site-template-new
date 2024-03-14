/** @type {import('next').NextConfig} */

const nextConfig = {
  // Configure `pageExtensions` to include MDX files
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  // Optionally, add any other Next.js config below
  reactStrictMode: true, // Version 13.4 or later is true by default in the app router
  swcMinify: true, // Version 13 or later is true by default
  compress: false, // TODO:Why disable gzip
  experimental: {
    webpackBuildWorker: true,
    // outputFileTracingExcludes: {
    //   "pages/**/*.tsx": [".next/cache/webpack/*"],
    // },
  },
  cacheMaxMemorySize: 0,
  transpilePackages: [
    "antd",
    "rc-util",
    "@babel/runtime",
    "@ant-design/icons",
    "@ant-design/icons-svg",
    "rc-pagination",
    "rc-picker",
    "rc-tree",
    "rc-table",
  ],
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ["@svgr/webpack"],
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
  rewrites() {
    return [
      {
        source: "/",
        destination: "/home",
      },
    ];
  },
};

export default nextConfig;

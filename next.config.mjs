/** @type {import('next').NextConfig} */

import NextBundleAnalyzer from "@next/bundle-analyzer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// import SpeedMeasurePlugin from "speed-measure-webpack-plugin";
// const smp = new SpeedMeasurePlugin({
//   disable: process.env.ANALYZE !== "true",
//   outputFormat: "humanVerbose",
// });

const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

// 复制静态文件函数
function copyStaticFiles() {
  const staticSourcePath = path.resolve('./docs/static');
  const publicTargetPath = path.resolve('./public');

  if (!fs.existsSync(staticSourcePath)) {
    console.log('[Next.js] Static source directory does not exist:', staticSourcePath);
    return;
  }

  function copyRecursive(source, target) {
    if (!fs.existsSync(target)) {
      fs.mkdirSync(target, { recursive: true });
    }

    const files = fs.readdirSync(source);
    files.forEach((file) => {
      const sourcePath = path.join(source, file);
      const targetPath = path.join(target, file);

      if (fs.statSync(sourcePath).isDirectory()) {
        copyRecursive(sourcePath, targetPath);
      } else {
        // 只在目标文件不存在或源文件更新时才复制
        if (!fs.existsSync(targetPath) ||
            fs.statSync(sourcePath).mtime > fs.statSync(targetPath).mtime) {
          console.log(`[Next.js] Copying: ${sourcePath} -> ${targetPath}`);
          fs.copyFileSync(sourcePath, targetPath);
        }
      }
    });
  }

  copyRecursive(staticSourcePath, publicTargetPath);
  console.log('[Next.js] Static files copy check completed');
}

// 在构建时复制静态文件
try {
  copyStaticFiles();
} catch (error) {
  console.warn('[Next.js] Failed to copy static files:', error.message);
}

// 读取 docuo.config.json 中的重定向配置
function getRedirectsFromConfig() {
  try {
    const configPath = path.resolve(process.env.NEXT_PUBLIC_CONFIG_FILE ? `./docs/${process.env.NEXT_PUBLIC_CONFIG_FILE}` : './docs/docuo.config.json');
    const configContent = fs.readFileSync(configPath, "utf8");
    const config = JSON.parse(configContent);

    if (!config.redirects || !Array.isArray(config.redirects)) {
      return [];
    }

    return config.redirects.map(redirect => ({
      source: redirect.source,
      destination: redirect.destination,
      permanent: redirect.permanent !== false, // 默认为 true（永久重定向）
    }));
  } catch (error) {
    console.warn("Failed to load redirects from docuo.config.json:", error.message);
    return [];
  }
}

const nextConfig = {
  // Configure `pageExtensions` to include MDX files
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  // Optionally, add any other Next.js config below
  reactStrictMode: true, // Version 13.4 or later is true by default in the app router
  swcMinify: true, // Version 13 or later is true by default
  compress: true, // TODO:Why disable gzip
  // 开发模式下的性能优化
  ...(process.env.NODE_ENV === 'development' && {
    onDemandEntries: {
      // 页面在内存中保持的时间（毫秒）
      maxInactiveAge: 25 * 1000,
      // 同时保持在内存中的页面数
      pagesBufferLength: 2,
    },
  }),
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    webpackBuildWorker: true,
    // 开发模式下优化
    ...(process.env.NODE_ENV === 'development' && {
      optimizePackageImports: ['antd', '@ant-design/icons'],
    }),
    // outputFileTracingExcludes: {
    //   "pages/**/*.tsx": [".next/cache/webpack/*"],
    // },
  },
  // cacheMaxMemorySize: 0,
  transpilePackages: [
    "antd",
    "rc-util",
    "@babel",
    "@ant-design/icons",
    "@ant-design/icons-svg",
    "rc-input",
    "rc-pagination",
    "rc-picker",
    "rc-tree",
    "rc-table",
    "@ant-design",
    "@ant-design/pro-chat",
    "@ant-design/pro-editor",
    "@ant-design/x",
  ],
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  webpack(config) {
    // 开发模式下的优化
    if (process.env.NODE_ENV === 'development') {
      // 优化缓存
      config.cache = {
        type: 'filesystem',
        buildDependencies: {
          config: [__filename],
        },
      };

      // 减少不必要的优化
      config.optimization = {
        ...config.optimization,
        removeAvailableModules: false,
        removeEmptyChunks: false,
      };
    }

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

    // config.plugins.push(smp);
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
  redirects() {
    return getRedirectsFromConfig();
  },
  staticPageGenerationTimeout: 180,
};

export default withBundleAnalyzer(nextConfig);

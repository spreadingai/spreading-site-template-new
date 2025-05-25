const fs = require('fs');
const path = require('path');

console.log("process.env.SITE_URL", process.env.SITE_URL);

// 读取docuo.config.json配置
let docuoConfig = {};
try {
  const configPath = path.resolve('./docs/docuo.config.json');
  if (fs.existsSync(configPath)) {
    const configContent = fs.readFileSync(configPath, 'utf8');
    docuoConfig = JSON.parse(configContent);
  }
} catch (error) {
  console.warn('Failed to read docuo.config.json:', error.message);
}

// 从配置中获取sitemap设置
const sitemapConfig = docuoConfig.sitemap || {};
const customSiteUrl = sitemapConfig.siteUrl;
const customExclude = sitemapConfig.exclude || [];

// 确定最终的siteUrl
const siteUrl = customSiteUrl || `https://${process.env.SITE_URL}${process.env.NEXT_PUBLIC_BASE_PATH || ""}`;

// 合并exclude数组
const defaultExclude = ["/home"];
const finalExclude = [...defaultExclude, ...customExclude];

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: siteUrl,
  exclude: finalExclude,
  generateIndexSitemap: false,
  generateRobotsTxt: true, // (optional)
  transform: async (config, path) => {
    // 解码URL中的%2F为正常的斜杠
    const decodedPath = decodeURIComponent(path);

    return {
      loc: decodedPath, // 使用解码后的路径
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
  // ...other options
};

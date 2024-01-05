import docuoConfig from "./docs/docuo.config";

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || docuoConfig.url,
  generateRobotsTxt: true, // (optional)
  // ...other options
};

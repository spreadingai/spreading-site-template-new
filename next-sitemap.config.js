/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL,
  exclude: ["/home"],
  generateIndexSitemap: false,
  generateRobotsTxt: true, // (optional)
  // ...other options
};

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://spreading-site-template-new.vercel.app',
  generateRobotsTxt: true, // (optional)
  generateIndexSitemap: false,
  // ...other options
}

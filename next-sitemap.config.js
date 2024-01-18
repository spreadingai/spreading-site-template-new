/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL,
  exclude: ["/home"],
  generateRobotsTxt: true, // (optional)
  // ...other options
};

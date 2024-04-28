console.log("process.env.SITE_URL", process.env.SITE_URL);

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: `https://${process.env.SITE_URL}${process.env.NEXT_PUBLIC_BASE_PATH}`,
  exclude: ["/home"],
  generateIndexSitemap: false,
  generateRobotsTxt: true, // (optional)
  // ...other options
};

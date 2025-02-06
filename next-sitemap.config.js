/** @type {import('next-sitemap').IConfig} */
const siteUrl = process.env.SITE_URL || 'https://www.dar-iwan.shop'

module.exports = {
  siteUrl: siteUrl,
  generateRobotsTxt: true, // (optional)
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000, // Maximum number of URLs per sitemap (Google's limit is 50,000)
  exclude: ['/404', '/500'], // URLs to exclude from the sitemap
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: '*', disallow: ['/admin', '/dashboard'] },
    ],
    additionalSitemaps: [
      `${siteUrl}/books-sitemap.xml`, // Path for books sitemap
      `${siteUrl}/sitemap-0.xml`, // Path for the main sitemap
    ],
  },
  transform: async (config, path) => {
    let priority = config.priority; // Default priority => 0.7
    let changefreq = config.changefreq; // Default changefreq => 'weekly'

    // Adjust priorities and change frequencies based on specific pages
    if (path === '/') {
      priority = 1.0; // Highest priority for the homepage
      changefreq = 'monthly'; // Homepage change frequency
    } else if (path === '/blogs') {
      priority = 0.9; // Higher priority for the index blogs page
      changefreq = 'daily'; // More frequent changes for blog index
    } else if (path.includes('/blogs/')) {
      priority = 0.6; // Lower priority for individual blog pages
      changefreq = 'daily'; // Blogs update frequently
    }

    return {
      loc: path, // This will be exported as http(s)://<config.siteUrl>/<path>
      changefreq: changefreq,
      priority: priority, // Dynamic priority based on the page
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
}

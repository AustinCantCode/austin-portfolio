const SitemapGenerator = require("sitemap-generator");

// create generator
const generator = SitemapGenerator("http://austinsia.com", {
  stripQuerystring: false,
  filepath: "./public/sitemap.xml",
});

// register event listeners
generator.on("done", () => {
  // sitemaps created
});

// start the crawler
generator.start();

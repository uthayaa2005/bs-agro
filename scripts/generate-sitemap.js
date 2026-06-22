/**
 * Generates public/sitemap.xml from product IDs and category routes.
 * Run automatically before production build.
 */
const fs = require("fs");
const path = require("path");

const SITE_URL = "https://bsagroequipments.com";
const ROOT = path.join(__dirname, "..");
const dataPath = path.join(ROOT, "src", "data", "data.js");
const outPath = path.join(ROOT, "public", "sitemap.xml");

const CATEGORIES = [
  "Rotavator",
  "Cultivator",
  "Tiller",
  "Side Disk",
  "Ridger",
  "Accessories",
  "New Items",
];

const data = fs.readFileSync(dataPath, "utf8");
const productIds = [...data.matchAll(/"id":\s*(\d+)/g)].map((m) => m[1]);

const staticRoutes = [
  "/",
  "/products",
  "/about",
  "/reviews",
  "/contact",
];

const categoryRoutes = CATEGORIES.map(
  (cat) => `/products/${encodeURIComponent(cat)}`
);
const productRoutes = productIds.map((id) => `/product/${id}`);
const urls = [...staticRoutes, ...categoryRoutes, ...productRoutes];
const today = new Date().toISOString().slice(0, 10);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((route) => {
    const loc = `${SITE_URL}${route === "/" ? "/" : route}`;
    const priority = route === "/" ? "1.0" : route.includes("/product/") ? "0.7" : "0.8";
    const changefreq = route === "/" ? "weekly" : "monthly";
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join("\n")}
</urlset>
`;

fs.writeFileSync(outPath, xml, "utf8");
console.log(`Sitemap written: ${outPath} (${urls.length} URLs)`);

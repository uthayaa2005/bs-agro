/**
 * After `react-scripts build`, writes route-specific index.html files so Google
 * gets the correct title, canonical URL, and crawlable content per page (not
 * only the homepage shell).
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const BUILD_INDEX = path.join(ROOT, "build", "index.html");
const DATA_PATH = path.join(ROOT, "src", "data", "data.js");
const SITE_URL = "https://www.bsagroequipments.com";

const CATEGORIES = [
  "Rotavator",
  "Cultivator",
  "Tiller",
  "Side Disk",
  "Ridger",
  "Accessories",
  "New Items",
];

const SEO_PAGES = {
  "/": {
    title: "BS Agro Equipments | BS Agro — Official Website | Rotavator Salem",
    description:
      "BS Agro Equipments (BS Agro) — official website. Best rotavator manufacturer in Salem district, Sitheri Attur. Rotavators, cultivators & agri equipment. Call 7603809596.",
    h1: "BS Agro Equipments — Official Rotavator Manufacturer in Salem",
    body:
      "BS Agro Equipments (BS Agro) is an ISO certified rotavator and agricultural equipment manufacturer in Sitheri, Attur, Salem District, Tamil Nadu. Factory-direct rotavators, cultivators, ridgers and spare parts.",
  },
  "/products": {
    title: "BS Agro Products | BS Agro Equipments — Rotavators Salem",
    description:
      "BS Agro Equipments product catalog — rotavators, cultivators, ridgers & tillers. Official BS Agro manufacturer in Sitheri, Attur, Salem district. Factory-direct prices.",
    h1: "BS Agro Products — Rotavators & Agricultural Equipment",
    body:
      "Browse the full BS Agro Equipments catalog: rotavators, cultivators, tillers, ridgers, ploughs and accessories. Direct from our Salem district factory.",
  },
  "/about": {
    title: "About BS Agro | BS Agro Equipments — Salem Manufacturer",
    description:
      "About BS Agro Equipments (BS Agro) — ISO certified rotavator & agricultural machinery manufacturer in Sitheri, Attur, Salem district. Official company profile.",
    h1: "About BS Agro Equipments",
    body:
      "Learn about BS Agro Equipments — ISO certified manufacturer in Salem, Tamil Nadu. CEO M. Sundaram. Direct factory sales and pan-Tamil Nadu delivery.",
  },
  "/reviews": {
    title: "BS Agro Reviews | BS Agro Equipments Customer Ratings",
    description:
      "BS Agro Equipments reviews — farmers & dealers rate BS Agro rotavators. Trusted rotavator company in Salem district, Sitheri, Attur.",
    h1: "BS Agro Customer Reviews",
    body:
      "Read verified BS Agro Equipments reviews from farmers and dealers across Tamil Nadu. Rated 4.4/5 by buyers.",
  },
  "/contact": {
    title: "Contact BS Agro | BS Agro Equipments — Salem Tamil Nadu",
    description:
      "Contact BS Agro Equipments (BS Agro) — Sitheri, Attur, Salem District. Phone/WhatsApp 7603809596. Official rotavator manufacturer enquiry & dealer support.",
    h1: "Contact BS Agro Equipments",
    body:
      "Contact BS Agro Equipments in Salem, Tamil Nadu. Phone & WhatsApp: 7603809596. GST: 33FJKPS8217P1ZC.",
  },
};

const SEO_CATEGORIES = {
  Rotavator: {
    title: "BS Agro Rotavators | BS Agro Equipments Salem",
    description:
      "BS Agro rotavators — buy from BS Agro Equipments, best rotavator manufacturer in Salem district. ISO certified factory-direct price.",
    h1: "BS Agro Rotavators",
    body: "Shop BS Agro rotavators — single speed, multi speed, heavy duty and mini models from Salem manufacturer.",
  },
  Cultivator: {
    title: "BS Agro Cultivators | BS Agro Equipments Salem",
    description:
      "BS Agro cultivators from BS Agro Equipments — agricultural equipment manufacturer in Salem district. Factory price.",
    h1: "BS Agro Cultivators",
    body: "BS Agro spring cultivators, duck feet cultivators, gauge wheels and more from Salem factory.",
  },
  Tiller: {
    title: "BS Agro Tillers | BS Agro Equipments Salem",
    description:
      "BS Agro tiller rotavators from official manufacturer BS Agro Equipments, Sitheri, Attur, Salem district.",
    h1: "BS Agro Tillers",
    body: "Reverse forward tiller rotavators and tiller models from BS Agro Equipments, Salem.",
  },
  "Side Disk": {
    title: "BS Agro Side Disks | BS Agro Equipments Salem",
    description:
      "Rotavator side disks from BS Agro Equipments (BS Agro) — Salem district. Genuine spare parts at factory price.",
    h1: "BS Agro Side Disks",
    body: "Genuine rotavator side disks and spare parts from BS Agro Equipments manufacturer.",
  },
  Ridger: {
    title: "BS Agro Ridgers | BS Agro Equipments Salem",
    description:
      "Agricultural ridgers from BS Agro Equipments — official BS Agro manufacturer in Salem district, Tamil Nadu.",
    h1: "BS Agro Ridgers",
    body: "Agricultural ridgers including 42H MS 2024 RD series from BS Agro Equipments, Salem.",
  },
  Accessories: {
    title: "BS Agro Accessories | BS Agro Equipments Salem",
    description:
      "BS Agro rotavator blades, PTO shafts & accessories from BS Agro Equipments. Official parts from Salem district manufacturer.",
    h1: "BS Agro Accessories",
    body: "Rotavator blades, PTO shafts and accessories from BS Agro Equipments factory, Salem.",
  },
  "New Items": {
    title: "BS Agro New Products | BS Agro Equipments Salem",
    description:
      "New rotavators & equipment from BS Agro Equipments (BS Agro) — latest models from Salem district manufacturer.",
    h1: "BS Agro New Products",
    body: "Latest rotavators and agricultural equipment from BS Agro Equipments, Salem.",
  },
};

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
];

function parseProducts() {
  const data = fs.readFileSync(DATA_PATH, "utf8");
  const products = [];
  const idMatches = [...data.matchAll(/"id":\s*(\d+)/g)];

  for (const match of idMatches) {
    const start = match.index;
    const slice = data.slice(start, start + 2500);
    const nameMatch = slice.match(/"name":\s*"([^"]+)"/);
    const catMatch = slice.match(/"cat":\s*"([^"]+)"/);
    if (nameMatch && catMatch) {
      products.push({ id: match[1], name: nameMatch[1], cat: catMatch[1] });
    }
  }

  return products;
}

function navHtml() {
  const items = NAV_LINKS.map(
    (l) => `<li><a href="${l.href}">${l.label}</a></li>`
  ).join("");
  return `<nav aria-label="BS Agro site pages"><ul>${items}</ul></nav>`;
}

function bodyHtml({ h1, body, extraLinks = "" }) {
  return `<main>
  <h1>${h1}</h1>
  <p>${body}</p>
  <p>Phone &amp; WhatsApp: <a href="tel:+917603809596">7603809596</a></p>
  ${extraLinks}
  ${navHtml()}
</main>`;
}

function replaceTag(html, pattern, replacement) {
  if (pattern.test(html)) return html.replace(pattern, replacement);
  return html;
}

function applySeo(template, route, seo) {
  const canonical = route === "/" ? `${SITE_URL}/` : `${SITE_URL}${route}`;
  let html = template;

  html = replaceTag(html, /<title>[^<]*<\/title>/, `<title>${seo.title}</title>`);
  html = replaceTag(
    html,
    /<meta name="description" content="[^"]*"/,
    `<meta name="description" content="${seo.description}"`
  );
  html = replaceTag(
    html,
    /<link rel="canonical" href="[^"]*"/,
    `<link rel="canonical" href="${canonical}"`
  );
  html = replaceTag(
    html,
    /<meta property="og:title" content="[^"]*"/,
    `<meta property="og:title" content="${seo.title}"`
  );
  html = replaceTag(
    html,
    /<meta property="og:description" content="[^"]*"/,
    `<meta property="og:description" content="${seo.description}"`
  );
  html = replaceTag(
    html,
    /<meta property="og:url" content="[^"]*"/,
    `<meta property="og:url" content="${canonical}"`
  );
  html = replaceTag(
    html,
    /<meta name="twitter:title" content="[^"]*"/,
    `<meta name="twitter:title" content="${seo.title}"`
  );
  html = replaceTag(
    html,
    /<meta name="twitter:description" content="[^"]*"/,
    `<meta name="twitter:description" content="${seo.description}"`
  );

  const main = bodyHtml(seo);
  html = html.replace(
    /<div id="root">[\s\S]*?<\/div>/,
    `<div id="root">${main}</div>`
  );

  return html;
}

function writeRoute(outDir, route, html) {
  if (route === "/") {
    fs.writeFileSync(BUILD_INDEX, html, "utf8");
    return;
  }
  const segments = route.replace(/^\//, "").split("/");
  const dir = path.join(outDir, ...segments);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), html, "utf8");
}

function main() {
  if (!fs.existsSync(BUILD_INDEX)) {
    console.error("generate-seo-shells: run after npm run build (build/index.html missing)");
    process.exit(1);
  }

  const template = fs.readFileSync(BUILD_INDEX, "utf8");
  const routes = [];

  for (const [route, seo] of Object.entries(SEO_PAGES)) {
    routes.push({ route, seo });
  }

  for (const cat of CATEGORIES) {
    const seo = SEO_CATEGORIES[cat];
    routes.push({
      route: `/products/${encodeURIComponent(cat)}`,
      seo,
    });
  }

  const products = parseProducts();
  for (const p of products) {
    routes.push({
      route: `/product/${p.id}`,
      seo: {
        title: `${p.name} | BS Agro Equipments | BS Agro Salem`,
        description: `${p.name} from BS Agro Equipments (BS Agro) — official rotavator manufacturer in Salem district. Enquire now.`,
        h1: p.name,
        body: `${p.name} — ${p.cat} from BS Agro Equipments, Salem district manufacturer.`,
        extraLinks: `<p><a href="/products">All BS Agro products</a></p>`,
      },
    });
  }

  const productLinks = products
    .slice(0, 12)
    .map((p) => `<li><a href="/product/${p.id}">${p.name}</a></li>`)
    .join("");
  const productsRoute = routes.find((r) => r.route === "/products");
  if (productsRoute) {
    productsRoute.seo.extraLinks = `<ul>${productLinks}</ul>`;
  }

  for (const { route, seo } of routes) {
    const html = applySeo(template, route, seo);
    writeRoute(path.join(ROOT, "build"), route, html);
  }

  console.log(`SEO shells written for ${routes.length} routes`);
}

main();

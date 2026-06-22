import {
  SITE_NAME,
  SITE_DESCRIPTION,
  SITE_OG_IMAGE,
  SITE_URL,
  siteUrl,
} from "../constants/site";
import { hashFor } from "./historyNav";

function setMeta(attr, value, attrName = "name") {
  if (!value) return;
  let el = document.querySelector(`meta[${attrName}="${attr}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attrName, attr);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

function setCanonical(href) {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

const PAGE_DEFAULTS = {
  home: {
    title: `${SITE_NAME} – Rotavator Manufacturer, Salem`,
    description: SITE_DESCRIPTION,
  },
  products: {
    title: `Products – ${SITE_NAME}`,
    description:
      "Browse rotavators, cultivators, ridgers, tillers and agricultural equipment from BS Agro Equipments, Salem. Factory-direct manufacturer prices.",
  },
  "product-detail": {
    title: `${SITE_NAME}`,
    description: SITE_DESCRIPTION,
  },
  about: {
    title: `About Us – ${SITE_NAME}`,
    description:
      "Learn about BS Agro Equipments — ISO certified agricultural machinery manufacturer in Salem, Tamil Nadu since factory-direct production.",
  },
  reviews: {
    title: `Customer Reviews – ${SITE_NAME}`,
    description:
      "Read customer reviews for BS Agro rotavators and agricultural equipment. Trusted manufacturer in Salem, Tamil Nadu.",
  },
  contact: {
    title: `Contact – ${SITE_NAME}`,
    description:
      "Contact BS Agro Equipments in Salem for rotavator quotes, dealer enquiries and agricultural equipment support. Call or WhatsApp today.",
  },
};

export function applyPageSeo({ page, product, filter }) {
  const defaults = PAGE_DEFAULTS[page] || PAGE_DEFAULTS.home;
  let title = defaults.title;
  let description = defaults.description;
  let image = SITE_OG_IMAGE;

  if (page === "product-detail" && product) {
    title = `${product.name} – ${SITE_NAME}`;
    description =
      product.desc?.slice(0, 155) ||
      `${product.name} from ${SITE_NAME}, Salem. ${product.price}. Enquire for factory-direct quote.`;
    if (product.img?.startsWith("http")) image = product.img;
  } else if (page === "products" && filter && filter !== "All") {
    title = `${filter} – Products | ${SITE_NAME}`;
    description = `Shop ${filter} from ${SITE_NAME}, Salem. ISO certified agricultural equipment with pan-Tamil Nadu delivery.`;
  }

  const route = { page, productId: product?.id ?? null, filter: filter || "All" };
  const canonical = siteUrl(hashFor(route));

  document.title = title;
  setMeta("description", description);
  setMeta("og:title", title, "property");
  setMeta("og:description", description, "property");
  setMeta("og:image", image, "property");
  setMeta("og:url", canonical, "property");
  setMeta("og:type", page === "product-detail" ? "product" : "website", "property");
  setMeta("og:site_name", SITE_NAME, "property");
  setMeta("twitter:card", "summary_large_image");
  setMeta("twitter:title", title);
  setMeta("twitter:description", description);
  setMeta("twitter:image", image);
  setCanonical(canonical);
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    image: SITE_OG_IMAGE,
    telephone: "+91-7603809596",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Sitheri, Attur",
      addressLocality: "Salem",
      addressRegion: "Tamil Nadu",
      postalCode: "636101",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 11.5384857,
      longitude: 78.813587,
    },
    areaServed: "Tamil Nadu",
    priceRange: "₹₹",
  };
}

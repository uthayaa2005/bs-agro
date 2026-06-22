import {
  BUSINESS_ADDRESS,
  GST_NUMBER,
  GOOGLE_MAPS_URL,
  PHONE_E164,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_OG_IMAGE,
  SITE_SHORT_NAME,
  SITE_TAGLINE,
  SITE_URL,
  siteUrl,
} from "../constants/site";
import { SEO_CATEGORIES, SEO_PAGES, productSeo } from "../constants/seo";
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

function resolveSeo({ page, product, filter }) {
  if (page === "product-detail" && product) {
    return productSeo(product);
  }
  if (page === "products" && filter && filter !== "All" && SEO_CATEGORIES[filter]) {
    return SEO_CATEGORIES[filter];
  }
  return SEO_PAGES[page] || SEO_PAGES.home;
}

export function applyPageSeo({ page, product, filter }) {
  const seo = resolveSeo({ page, product, filter });
  const route = { page, productId: product?.id ?? null, filter: filter || "All" };
  const canonical = siteUrl(hashFor(route));
  const image =
    page === "product-detail" && product?.img?.startsWith("http")
      ? product.img
      : SITE_OG_IMAGE;

  document.title = seo.title;
  setMeta("description", seo.description);
  setMeta("keywords", seo.keywords);
  setMeta("geo.region", "IN-TN");
  setMeta("geo.placename", `${BUSINESS_ADDRESS.city}, ${BUSINESS_ADDRESS.district}`);
  setMeta("geo.position", "11.5384857;78.813587");
  setMeta("ICBM", "11.5384857, 78.813587");

  setMeta("og:title", seo.title, "property");
  setMeta("og:description", seo.description, "property");
  setMeta("og:image", image, "property");
  setMeta("og:url", canonical, "property");
  setMeta("og:type", page === "product-detail" ? "product" : "website", "property");
  setMeta("og:site_name", SITE_NAME, "property");
  setMeta("og:locale", "en_IN", "property");

  setMeta("twitter:card", "summary_large_image");
  setMeta("twitter:title", seo.title);
  setMeta("twitter:description", seo.description);
  setMeta("twitter:image", image);

  setCanonical(canonical);
}

export function buildStructuredData({ page, product } = {}) {
  const graph = [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      alternateName: SITE_SHORT_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: "en-IN",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": ["Organization", "LocalBusiness", "Store"],
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      alternateName: ["BS Agro", "BS Agro Rotavators"],
      description: `${SITE_NAME} — ${SITE_TAGLINE}. ISO certified rotavator & agricultural equipment manufacturer in ${BUSINESS_ADDRESS.district}, ${BUSINESS_ADDRESS.region}.`,
      url: SITE_URL,
      image: SITE_OG_IMAGE,
      logo: SITE_OG_IMAGE,
      telephone: PHONE_E164,
      email: "info@bsagroequipments.com",
      taxID: GST_NUMBER,
      address: {
        "@type": "PostalAddress",
        streetAddress: BUSINESS_ADDRESS.street,
        addressLocality: BUSINESS_ADDRESS.city,
        addressRegion: BUSINESS_ADDRESS.region,
        postalCode: BUSINESS_ADDRESS.postalCode,
        addressCountry: BUSINESS_ADDRESS.country,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 11.5384857,
        longitude: 78.813587,
      },
      areaServed: {
        "@type": "AdministrativeArea",
        name: BUSINESS_ADDRESS.district,
      },
      hasMap: GOOGLE_MAPS_URL,
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "09:00",
          closes: "18:00",
        },
      ],
      priceRange: "₹₹",
      keywords: SITE_KEYWORDS,
    },
  ];

  if (page === "product-detail" && product) {
    graph.push({
      "@type": "Product",
      "@id": `${SITE_URL}/#/product/${product.id}#product`,
      name: product.name,
      description: product.desc,
      image: product.img,
      category: product.cat,
      brand: {
        "@type": "Brand",
        name: SITE_NAME,
      },
      offers: {
        "@type": "Offer",
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
        seller: { "@id": `${SITE_URL}/#organization` },
        url: siteUrl(`#/product/${product.id}`),
      },
      manufacturer: { "@id": `${SITE_URL}/#organization` },
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

/** @deprecated use buildStructuredData */
export function localBusinessJsonLd() {
  return buildStructuredData();
}

/** Canonical site URL — used for SEO, sitemap, and share links */
export const SITE_URL = "https://www.bsagroequipments.com";

export const SITE_NAME = "BS Agro Equipments";
export const SITE_SHORT_NAME = "BS Agro";
export const SITE_TAGLINE = "Best Rotavator Company in Salem";

export const BUSINESS_ADDRESS = {
  line1: "B S Agro Equipments",
  street: "Sitheri, Attur",
  district: "Salem District",
  city: "Salem",
  region: "Tamil Nadu",
  postalCode: "636101",
  country: "IN",
  full: "B S Agro Equipments, Sitheri, Attur, Salem District, Tamil Nadu - 636101",
};

export const SITE_DESCRIPTION =
  "BS Agro Equipments — best rotavator company in Salem district. ISO certified manufacturer at Sitheri, Attur. Rotavators, cultivators, ridgers & agricultural equipment. Factory-direct pricing.";

export const SITE_KEYWORDS =
  "BS Agro, BS Agro Equipments, bs agro, bs agro equipments, B S Agro Equipments, BS Agro Rotavators, bsagroequipments, bsagroequipments.com, best rotavator company Salem, rotavator manufacturer Salem district, BS Agro Sitheri Attur, agricultural equipment Tamil Nadu, rotavator Salem, BS Agro Salem, BS Agro official website";

/** Brand search terms — used in titles, schema & FAQ */
export const BRAND_NAMES = [
  "BS Agro Equipments",
  "BS Agro",
  "B S Agro Equipments",
  "BS Agro Rotavators",
  "bs agro equipments",
  "bs agro",
];

export const SITE_OG_IMAGE = `${SITE_URL}/logo.png`;

export const PHONE_DISPLAY = "+91 76038 09596";
export const PHONE_E164 = "+917603809596";

export const GST_NUMBER = "33FJKPS8217P1ZC";

export const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/place/BS+AGRO+ROTAVATORS/@11.5384857,78.813587,17z/data=!3m1!4b1!4m6!3m5!1s0x3bab7311d046f447:0x410edf7e86ac09d2!8m2!3d11.5384857!4d78.813587!16s%2Fg%2F11r8fkfnzb";

/** Full URL for a path (e.g. "/products" → https://bsagroequipments.com/products) */
export function siteUrl(path = "") {
  const base = SITE_URL.replace(/\/$/, "");
  if (!path || path === "/") return `${base}/`;
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${base}${clean}`;
}

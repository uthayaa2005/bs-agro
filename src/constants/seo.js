import {
  BUSINESS_ADDRESS,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_SHORT_NAME,
  SITE_TAGLINE,
} from "./site";

const LOCATION = `${BUSINESS_ADDRESS.street}, ${BUSINESS_ADDRESS.district}`;
const LOCATION_SHORT = `Salem district, Tamil Nadu`;

/** Per-page and per-category SEO copy */
export const SEO_PAGES = {
  home: {
    title: `${SITE_NAME} | Best Rotavator Company in Salem, Tamil Nadu`,
    description: `${SITE_NAME} — best rotavator manufacturer in Salem district. ISO certified factory at ${LOCATION}. Rotavators, cultivators & agri equipment. Factory-direct price.`,
    keywords: `${SITE_KEYWORDS}, rotavator Salem Attur, best rotavator Salem Tamil Nadu`,
  },
  products: {
    title: `Agricultural Products | ${SITE_NAME} Salem`,
    description: `Browse rotavators, cultivators, ridgers & tillers from ${SITE_SHORT_NAME} — best rotavator company in Salem district. ${LOCATION}. Direct manufacturer prices.`,
    keywords: `BS Agro products, rotavator catalog Salem, agricultural equipment ${BUSINESS_ADDRESS.district}, cultivator Attur`,
  },
  about: {
    title: `About ${SITE_NAME} | Best Rotavator Manufacturer Salem`,
    description: `About ${SITE_NAME} — ISO certified rotavator & agricultural machinery manufacturer in ${LOCATION}, ${LOCATION_SHORT}. Trusted by farmers across Tamil Nadu.`,
    keywords: `about BS Agro, rotavator factory Salem, agricultural manufacturer Attur, ISO certified rotavator Salem`,
  },
  reviews: {
    title: `Customer Reviews | ${SITE_NAME} Salem`,
    description: `Read reviews for ${SITE_NAME} — best rotavator company in Salem district. Farmers & dealers trust our rotavators, cultivators & service from ${BUSINESS_ADDRESS.street}, Attur.`,
    keywords: `BS Agro reviews, rotavator reviews Salem, customer feedback BS Agro Equipments`,
  },
  contact: {
    title: `Contact ${SITE_NAME} | ${BUSINESS_ADDRESS.district}, Tamil Nadu`,
    description: `Contact ${SITE_NAME} at ${BUSINESS_ADDRESS.full}. Best rotavator company in Salem district. Call/WhatsApp for quotes, dealer enquiries & support.`,
    keywords: `contact BS Agro, rotavator enquiry Salem, BS Agro address Sitheri Attur, rotavator dealer Salem district`,
  },
  "product-detail": {
    title: `${SITE_NAME} Salem`,
    description: SITE_DESCRIPTION,
    keywords: SITE_KEYWORDS,
  },
};

export const SEO_CATEGORIES = {
  Rotavator: {
    title: `Rotavators in Salem | ${SITE_NAME}`,
    description: `Buy rotavators from ${SITE_NAME} — best rotavator manufacturer in Salem district. ${LOCATION}, ${LOCATION_SHORT}. ISO certified, factory-direct pricing.`,
    keywords: `rotavator Salem, best rotavator company Salem, BS Agro rotavator, rotavator price Attur, rotavator manufacturer Tamil Nadu`,
  },
  Cultivator: {
    title: `Cultivators in Salem | ${SITE_NAME}`,
    description: `Cultivators from ${SITE_NAME}, best agricultural equipment company in Salem district. ${LOCATION}. Spring cultivator, duck feet & more at factory price.`,
    keywords: `cultivator Salem, BS Agro cultivator, agricultural cultivator Salem district, cultivator Attur`,
  },
  Tiller: {
    title: `Tillers in Salem | ${SITE_NAME}`,
    description: `Tiller rotavators from ${SITE_NAME} — trusted manufacturer in Salem district, ${BUSINESS_ADDRESS.street}, Attur. Reverse forward tiller & multi-speed models.`,
    keywords: `tiller rotavator Salem, BS Agro tiller, tiller manufacturer Salem district`,
  },
  "Side Disk": {
    title: `Side Disks in Salem | ${SITE_NAME}`,
    description: `Rotavator side disks from ${SITE_NAME}, Salem district. ${LOCATION}. Quality spare parts & accessories from the best rotavator company in Salem.`,
    keywords: `rotavator side disk Salem, BS Agro side disk, agricultural spare parts Attur`,
  },
  Ridger: {
    title: `Ridgers in Salem | ${SITE_NAME}`,
    description: `Agricultural ridgers from ${SITE_NAME} — best rotavator & equipment company in Salem district. ${LOCATION}, Tamil Nadu. Factory-direct ridger prices.`,
    keywords: `ridger Salem, agricultural ridger Salem district, BS Agro ridger Attur`,
  },
  Accessories: {
    title: `Rotavator Accessories | ${SITE_NAME} Salem`,
    description: `Rotavator blades, PTO shafts, bolts & accessories from ${SITE_NAME}. Best rotavator company in Salem district — ${LOCATION}. Genuine parts at factory price.`,
    keywords: `rotavator blade Salem, PTO shaft BS Agro, rotavator accessories Attur, spare parts Salem district`,
  },
  "New Items": {
    title: `New Agricultural Equipment | ${SITE_NAME} Salem`,
    description: `New rotavators & agricultural equipment from ${SITE_NAME}, best manufacturer in Salem district. ${LOCATION}, ${LOCATION_SHORT}. Latest models at direct price.`,
    keywords: `new rotavator Salem, new agricultural equipment BS Agro, latest rotavator Salem district`,
  },
};

export function productSeo(product) {
  const name = product.name;
  const cat = product.cat;
  return {
    title: `${name} | ${SITE_NAME} Salem`,
    description:
      `${name} from ${SITE_NAME} — best rotavator company in Salem district. ${BUSINESS_ADDRESS.street}, Attur, Tamil Nadu. ${product.price}. Enquire for factory quote.`,
    keywords: `${name}, ${cat} Salem, BS Agro ${cat}, rotavator ${BUSINESS_ADDRESS.district}, ${SITE_SHORT_NAME} ${BUSINESS_ADDRESS.city}`,
  };
}

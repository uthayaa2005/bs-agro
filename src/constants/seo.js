import {
  BUSINESS_ADDRESS,
  BRAND_NAMES,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_SHORT_NAME,
  SITE_TAGLINE,
  SITE_URL,
} from "./site";

const LOCATION = `${BUSINESS_ADDRESS.street}, ${BUSINESS_ADDRESS.district}`;
const LOCATION_SHORT = `Salem district, Tamil Nadu`;
const BRAND = "BS Agro";

/** Per-page SEO — brand name first for Google searches like "bs agro" */
export const SEO_PAGES = {
  home: {
    title: `BS Agro Equipments | BS Agro — Official Website | Rotavator Salem`,
    description: `BS Agro Equipments (BS Agro) — official website. Best rotavator manufacturer in Salem district, Sitheri Attur. Rotavators, cultivators & agri equipment. Call 7603809596.`,
    keywords: `BS Agro, bs agro, BS Agro Equipments, bs agro equipments, ${SITE_KEYWORDS}`,
  },
  products: {
    title: `BS Agro Products | BS Agro Equipments — Rotavators Salem`,
    description: `BS Agro Equipments product catalog — rotavators, cultivators, ridgers & tillers. Official BS Agro manufacturer in ${LOCATION}, ${LOCATION_SHORT}. Factory-direct prices.`,
    keywords: `BS Agro products, bs agro equipments products, BS Agro rotavator, rotavator catalog Salem, ${SITE_KEYWORDS}`,
  },
  about: {
    title: `About BS Agro | BS Agro Equipments — Salem Manufacturer`,
    description: `About BS Agro Equipments (BS Agro) — ISO certified rotavator & agricultural machinery manufacturer in ${LOCATION}, ${LOCATION_SHORT}. Official company profile.`,
    keywords: `about BS Agro, about bs agro equipments, BS Agro company, rotavator factory Salem, ${SITE_KEYWORDS}`,
  },
  reviews: {
    title: `BS Agro Reviews | BS Agro Equipments Customer Ratings`,
    description: `BS Agro Equipments reviews — farmers & dealers rate BS Agro rotavators. Trusted rotavator company in Salem district, ${BUSINESS_ADDRESS.street}, Attur.`,
    keywords: `BS Agro reviews, bs agro equipments reviews, BS Agro ratings, rotavator reviews Salem, ${SITE_KEYWORDS}`,
  },
  contact: {
    title: `Contact BS Agro | BS Agro Equipments — Salem Tamil Nadu`,
    description: `Contact BS Agro Equipments (BS Agro) — ${BUSINESS_ADDRESS.full}. Phone/WhatsApp 7603809596. Official rotavator manufacturer enquiry & dealer support.`,
    keywords: `contact BS Agro, contact bs agro equipments, BS Agro phone number, BS Agro address Salem, ${SITE_KEYWORDS}`,
  },
  "product-detail": {
    title: `BS Agro Equipments | BS Agro Salem`,
    description: SITE_DESCRIPTION,
    keywords: SITE_KEYWORDS,
  },
};

export const SEO_CATEGORIES = {
  Rotavator: {
    title: `BS Agro Rotavators | BS Agro Equipments Salem`,
    description: `BS Agro rotavators — buy from BS Agro Equipments, best rotavator manufacturer in Salem district. ${LOCATION}, ${LOCATION_SHORT}. ISO certified factory-direct price.`,
    keywords: `BS Agro rotavator, bs agro rotavator, rotavator Salem, BS Agro Equipments rotavator, ${SITE_KEYWORDS}`,
  },
  Cultivator: {
    title: `BS Agro Cultivators | BS Agro Equipments Salem`,
    description: `BS Agro cultivators from BS Agro Equipments — agricultural equipment manufacturer in Salem district. ${LOCATION}. Factory price.`,
    keywords: `BS Agro cultivator, bs agro cultivator, cultivator Salem, ${SITE_KEYWORDS}`,
  },
  Tiller: {
    title: `BS Agro Tillers | BS Agro Equipments Salem`,
    description: `BS Agro tiller rotavators from official manufacturer BS Agro Equipments, ${BUSINESS_ADDRESS.street}, Attur, Salem district.`,
    keywords: `BS Agro tiller, bs agro tiller, tiller rotavator Salem, ${SITE_KEYWORDS}`,
  },
  "Side Disk": {
    title: `BS Agro Side Disks | BS Agro Equipments Salem`,
    description: `Rotavator side disks from BS Agro Equipments (BS Agro) — ${LOCATION}, Salem district. Genuine spare parts at factory price.`,
    keywords: `BS Agro side disk, rotavator side disk Salem, ${SITE_KEYWORDS}`,
  },
  Ridger: {
    title: `BS Agro Ridgers | BS Agro Equipments Salem`,
    description: `Agricultural ridgers from BS Agro Equipments — official BS Agro manufacturer in Salem district, Tamil Nadu.`,
    keywords: `BS Agro ridger, bs agro ridger, ridger Salem, ${SITE_KEYWORDS}`,
  },
  Accessories: {
    title: `BS Agro Accessories | BS Agro Equipments Salem`,
    description: `BS Agro rotavator blades, PTO shafts & accessories from BS Agro Equipments. Official parts from Salem district manufacturer.`,
    keywords: `BS Agro accessories, rotavator blade BS Agro, PTO shaft BS Agro, ${SITE_KEYWORDS}`,
  },
  "New Items": {
    title: `BS Agro New Products | BS Agro Equipments Salem`,
    description: `New rotavators & equipment from BS Agro Equipments (BS Agro) — latest models from Salem district manufacturer at direct price.`,
    keywords: `BS Agro new products, new rotavator BS Agro, ${SITE_KEYWORDS}`,
  },
};

export function productSeo(product) {
  const name = product.name;
  const cat = product.cat;
  return {
    title: `${name} | BS Agro Equipments | BS Agro Salem`,
    description: `${name} from BS Agro Equipments (BS Agro) — official rotavator manufacturer in Salem district. ${BUSINESS_ADDRESS.street}, Attur. ${product.price}. Enquire now.`,
    keywords: `${name}, BS Agro ${cat}, bs agro ${cat}, BS Agro Equipments, ${SITE_KEYWORDS}`,
  };
}

/** FAQ schema — targets "bs agro" / "bs agro equipments" searches */
export const BRAND_FAQ = [
  {
    question: "What is BS Agro Equipments?",
    answer: `BS Agro Equipments (also known as BS Agro or B S Agro Equipments) is an ISO certified rotavator and agricultural equipment manufacturer located in Sitheri, Attur, Salem District, Tamil Nadu. Official website: ${SITE_URL}`,
  },
  {
    question: "Where is BS Agro located?",
    answer: `BS Agro Equipments is at ${BUSINESS_ADDRESS.full}. Salem District, Tamil Nadu, India.`,
  },
  {
    question: "How to contact BS Agro Equipments?",
    answer: "Contact BS Agro Equipments by phone or WhatsApp at +91 7603809596. Visit the official website bsagroequipments.com for product catalog and enquiry form.",
  },
  {
    question: "What does BS Agro manufacture?",
    answer: "BS Agro Equipments manufactures rotavators, cultivators, ridgers, tillers, ploughs, and agricultural equipment spare parts. BS Agro is a direct manufacturer in Salem with pan-Tamil Nadu delivery.",
  },
  {
    question: "Is BS Agro the same as BS Agro Equipments?",
    answer: "Yes. BS Agro is the short name for BS Agro Equipments (B S Agro Equipments), the rotavator manufacturer in Salem, Tamil Nadu. The official website is bsagroequipments.com.",
  },
];

export { BRAND_NAMES, BRAND };

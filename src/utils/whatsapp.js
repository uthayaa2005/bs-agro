import { WHATSAPP_NUMBER } from "../constants/links";

export { WHATSAPP_NUMBER };

const DEFAULT_MESSAGE =
  "Hi BS Agro Equipments, I would like to get a quote from bsagroequipments.com. Please share details.";

export function buildWhatsAppUrl(message = DEFAULT_MESSAGE) {
  const text = encodeURIComponent(message.trim());
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export function openWhatsApp(message) {
  window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
}

export function productQuoteMessage(product) {
  return `Hi BS Agro Equipments, I am interested in:

*${product.name}*
Category: ${product.cat}
Price: ${product.price}

Please share availability and your best quote. Thank you.`;
}

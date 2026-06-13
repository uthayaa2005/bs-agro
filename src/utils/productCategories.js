export const CATEGORY_ORDER = [
  "Rotavator",
  "Cultivator",
  "Tiller",
  "Side Disk",
  "Ridger",
  "Accessories",
  "New Items",
];

export function orderedCategories(products) {
  const present = new Set(products.map((p) => p.cat));
  return ["All", ...CATEGORY_ORDER.filter((cat) => present.has(cat))];
}

export function categoryCounts(products) {
  const counts = { All: products.length };
  for (const p of products) {
    counts[p.cat] = (counts[p.cat] || 0) + 1;
  }
  return counts;
}

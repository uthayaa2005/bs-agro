export const WIDTH_FILTERS = [
  { id: "all", label: "All", min: 0, max: Infinity },
  { id: "3", label: "3 ft", min: 0, max: 3.5 },
  { id: "4", label: "4 ft", min: 3.5, max: 4.5 },
  { id: "5", label: "5 ft", min: 4.5, max: 5.5 },
  { id: "6", label: "6 ft", min: 5.5, max: 6.5 },
  { id: "7", label: "7 ft+", min: 6.5, max: Infinity },
];

export const HP_FILTERS = [
  { id: "all", label: "All HP", min: 0, max: Infinity },
  { id: "20", label: "20", min: 0, max: 25 },
  { id: "30", label: "30", min: 25, max: 35 },
  { id: "40", label: "40", min: 35, max: 45 },
  { id: "50", label: "50", min: 45, max: 52 },
  { id: "55", label: "55+", min: 52, max: Infinity },
];

function parseWidthFeet(product) {
  const w = product.spec?.Width;
  if (!w) return null;
  const match = String(w).match(/([\d.]+)/);
  return match ? parseFloat(match[1]) : null;
}

function parseHP(product) {
  const hp = product.spec?.HP;
  if (!hp) return null;
  const match = String(hp).match(/([\d.]+)/);
  return match ? parseFloat(match[1]) : null;
}

function inRange(value, min, max) {
  if (value == null) return false;
  return value >= min && value < max;
}

export function productMatchesWidthFilter(product, filterId) {
  if (!filterId || filterId === "all") return true;
  const filter = WIDTH_FILTERS.find((f) => f.id === filterId);
  if (!filter) return true;
  return inRange(parseWidthFeet(product), filter.min, filter.max);
}

export function productMatchesHpFilter(product, filterId) {
  if (!filterId || filterId === "all") return true;
  const filter = HP_FILTERS.find((f) => f.id === filterId);
  if (!filter) return true;
  return inRange(parseHP(product), filter.min, filter.max);
}

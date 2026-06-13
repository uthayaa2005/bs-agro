const STOP_WORDS = new Set(["and", "the", "a", "an", "for", "with", "of"]);

const TOKEN_ALIASES = {
  tiller: ["tiller", "rotavator"],
  rotavator: ["rotavator", "tiller"],
  cultivator: ["cultivator", "cultivators"],
  culitivator: ["cultivator", "cultivators"],
};

function normalize(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function queryTokens(query) {
  return normalize(query)
    .split(" ")
    .filter((token) => token.length > 0 && !STOP_WORDS.has(token));
}

function productHaystack(product) {
  return normalize(
    [
      product.name,
      product.cat,
      product.desc,
      ...(product.features || []),
      ...Object.values(product.spec || {}),
      ...(product.searchTerms || []),
    ].join(" ")
  );
}

function tokenMatches(haystack, token) {
  const aliases = TOKEN_ALIASES[token] || [token];
  return aliases.some((alias) => haystack.includes(alias));
}

export function productMatchesSearch(product, query) {
  const trimmed = query.trim();
  if (!trimmed) return true;

  const tokens = queryTokens(trimmed);
  if (tokens.length === 0) return true;

  const haystack = productHaystack(product);
  return tokens.every((token) => tokenMatches(haystack, token));
}

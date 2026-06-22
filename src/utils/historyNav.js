/** Path-based routes for clean URLs (better SEO than #/hash routes). */

function parseRouteFromParts(parts) {
  if (parts.length === 0) {
    return { page: "home", productId: null, filter: "All" };
  }

  if (parts[0] === "products") {
    return {
      page: "products",
      productId: null,
      filter: parts[1] ? decodeURIComponent(parts[1]) : "All",
    };
  }

  if (parts[0] === "product" && parts[1]) {
    const id = parseInt(parts[1], 10);
    return {
      page: "product-detail",
      productId: Number.isNaN(id) ? null : id,
      filter: "All",
    };
  }

  const page = parts[0];
  if (["about", "reviews", "contact", "home"].includes(page)) {
    return { page: page === "home" ? "home" : page, productId: null, filter: "All" };
  }

  return { page: "home", productId: null, filter: "All" };
}

export function parsePath() {
  const raw = window.location.pathname.replace(/^\//, "");
  return parseRouteFromParts(raw.split("/").filter(Boolean));
}

export function pathFor({ page, productId, filter }) {
  switch (page) {
    case "home":
      return "/";
    case "products":
      return filter && filter !== "All"
        ? `/products/${encodeURIComponent(filter)}`
        : "/products";
    case "product-detail":
      return productId ? `/product/${productId}` : "/products";
    case "about":
      return "/about";
    case "reviews":
      return "/reviews";
    case "contact":
      return "/contact";
    default:
      return "/";
  }
}

/** Redirect old #/ links (bookmarks) to clean paths. Returns route if migrated. */
export function migrateHashToPath() {
  const hash = window.location.hash;
  if (!hash || hash === "#" || hash === "#/") return null;

  const raw = hash.slice(1).replace(/^\//, "");
  const route = parseRouteFromParts(raw.split("/").filter(Boolean));
  const path = pathFor(route);
  window.history.replaceState(route, "", path);
  return route;
}

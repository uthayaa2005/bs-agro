import React, { useState, useEffect } from "react";
import { products } from "../data/data";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import { ENQUIRY_FORM_URL, PHONE_NUMBER, PHONE_TEL } from "../constants/links";
import { orderedCategories, categoryCounts } from "../utils/productCategories";
import { productMatchesSearch } from "../utils/productSearch";
import {
  WIDTH_FILTERS,
  HP_FILTERS,
  productMatchesWidthFilter,
  productMatchesHpFilter,
} from "../utils/productSpecFilters";

export default function ProductsPage({
  openProduct,
  initialFilter = "All",
  onFilterChange,
}) {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState(initialFilter);
  const [widthFilter, setWidthFilter] = useState("all");
  const [hpFilter, setHpFilter] = useState("all");
  const [showSpecFilters, setShowSpecFilters] = useState(false);

  useEffect(() => {
    setActiveFilter(initialFilter);
    setSearch("");
    setWidthFilter("all");
    setHpFilter("all");
    setShowSpecFilters(false);
  }, [initialFilter]);

  const cats = orderedCategories(products);
  const counts = categoryCounts(products);

  const clearAllFilters = () => {
    setSearch("");
    setWidthFilter("all");
    setHpFilter("all");
  };

  const handleFilterClick = (cat) => {
    clearAllFilters();
    setActiveFilter(cat);
    onFilterChange?.(cat);
  };

  const filtered = products.filter((p) => {
    const matchCat = activeFilter === "All" || p.cat === activeFilter;
    return (
      matchCat &&
      productMatchesSearch(p, search) &&
      productMatchesWidthFilter(p, widthFilter) &&
      productMatchesHpFilter(p, hpFilter)
    );
  });

  const hasSpecFilters = widthFilter !== "all" || hpFilter !== "all";

  const pillClass = (active) =>
    `shrink-0 min-h-[44px] px-4 py-2.5 rounded-full border text-xs sm:text-sm font-medium transition active:scale-[0.98] ${
      active
        ? "bg-green-800 text-white border-green-800 animate-borderGlow"
        : "bg-white text-gray-700 border-gray-300 hover:bg-green-800 hover:text-white"
    }`;

  return (
    <div className="bg-gray-50 min-h-screen overflow-x-hidden">

      {/* Compact page header */}
      <section className="bg-green-900 border-b border-green-800">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-white leading-tight">
              Our Product Collection
            </h1>
            <p className="text-green-200/80 text-xs sm:text-sm mt-0.5 hidden sm:block">
              Direct from BS Agro factory, Salem
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <div className="bg-white/10 border border-white/15 px-3 py-2 rounded-lg text-center min-w-[72px]">
              <div className="text-base sm:text-xl font-bold text-yellow-400 leading-none">{products.length}+</div>
              <div className="text-[10px] text-green-100">Products</div>
            </div>
            <div className="bg-white/10 border border-white/15 px-3 py-2 rounded-lg text-center min-w-[72px]">
              <div className="text-base sm:text-xl font-bold text-yellow-400 leading-none">4.4★</div>
              <div className="text-[10px] text-green-100">Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky search + filters */}
      <div className="sticky top-[70px] z-[998] bg-gray-50/98 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 sm:py-3">

          <div className="flex gap-2 mb-2">
            <div className="relative flex-1">
              <input
                type="search"
                inputMode="search"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 pr-10 text-sm outline-none focus:ring-2 focus:ring-green-700 bg-white min-h-[44px]"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 text-xl min-w-[40px] min-h-[40px] flex items-center justify-center"
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={clearAllFilters}
              className="shrink-0 bg-green-800 hover:bg-green-900 text-white px-3 sm:px-4 rounded-xl font-semibold text-sm min-h-[44px] transition active:scale-[0.98]"
            >
              Clear
            </button>
          </div>

          <p className="text-[11px] sm:text-sm text-gray-500 mb-2">
            {filtered.length} of {products.length} products
            {activeFilter !== "All" ? ` · ${activeFilter}` : ""}
          </p>

          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {cats.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => handleFilterClick(c)}
                className={pillClass(activeFilter === c)}
              >
                {c} ({counts[c] ?? 0})
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setShowSpecFilters((v) => !v)}
            className="w-full flex items-center justify-between text-sm font-semibold text-green-800 py-1.5 min-h-[40px]"
          >
            <span>
              Size & HP filters
              {hasSpecFilters ? " (active)" : ""}
            </span>
            <span>{showSpecFilters ? "▲" : "▼"}</span>
          </button>

          {showSpecFilters && (
            <div className="space-y-2 pb-1 border-t border-gray-200 pt-2">
              <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar items-center">
                <span className="text-[10px] font-bold text-gray-500 shrink-0 uppercase w-10">Width</span>
                {WIDTH_FILTERS.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setWidthFilter(f.id)}
                    className={pillClass(widthFilter === f.id)}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar items-center">
                <span className="text-[10px] font-bold text-gray-500 shrink-0 uppercase w-10">HP</span>
                {HP_FILTERS.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setHpFilter(f.id)}
                    className={pillClass(hpFilter === f.id)}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* PRODUCTS — starts immediately below filters */}
      <section className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 items-stretch">
            {filtered.map((p, i) => (
              <ProductCard
                key={p.id}
                product={p}
                onClick={() => openProduct(p.id)}
                delay={Math.min(i * 0.04, 0.3)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 sm:py-20 px-4">
            <div className="text-5xl mb-3">🔍</div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-700 mb-2">No Products Found</h3>
            <p className="text-gray-500 text-sm mb-4">Try another category or clear filters.</p>
            <button
              type="button"
              onClick={() => {
                clearAllFilters();
                handleFilterClick("All");
              }}
              className="bg-green-800 text-white px-6 py-3 rounded-xl font-semibold text-sm min-h-[44px] active:scale-[0.98]"
            >
              Show all products
            </button>
          </div>
        )}
      </section>

      <section className="bg-green-900 py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
            Need Help Choosing?
          </h2>
          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-8">
            Call or WhatsApp our Salem team for the right equipment.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
            <a
              href={PHONE_TEL}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3.5 rounded-2xl transition animate-glow min-h-[48px] flex items-center justify-center"
            >
              📞 {PHONE_NUMBER}
            </a>
            <a
              href={ENQUIRY_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/30 hover:bg-white/10 text-white px-8 py-3.5 rounded-2xl transition min-h-[48px] flex items-center justify-center"
            >
              Get Quotation
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { products } from "../data/data";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

export default function ProductsPage({
  openProduct,
  initialFilter = "All",
}) {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState(initialFilter);

  useEffect(() => {
    setActiveFilter(initialFilter);
  }, [initialFilter]);

  const cats = ["All", ...new Set(products.map((p) => p.cat))];

  const filtered = products.filter((p) => {
    const matchCat =
      activeFilter === "All" || p.cat === activeFilter;

    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.cat.toLowerCase().includes(search.toLowerCase());

    return matchCat && matchSearch;
  });

  return (
    <div className="bg-gray-50 min-h-screen overflow-hidden">

      {/* HERO */}
      <section className="relative bg-green-900 overflow-hidden">

        {/* BACKGROUND EFFECTS */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl"></div>

        <div className="absolute bottom-0 left-0 w-60 h-60 bg-green-400/10 rounded-full blur-3xl"></div>

        {/* CONTENT */}
        <div className="max-w-7xl mx-auto px-4 py-10 md:py-14 relative z-10">

          {/* TAG */}
          <div className="inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-400/30 text-yellow-300 px-4 py-1 rounded-full text-sm font-medium mb-4">
            🚜 Premium Agricultural Equipment
          </div>

          {/* TITLE */}
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight max-w-4xl mb-4">
            Our Product Collection
          </h1>

          {/* DESCRIPTION */}
          <p className="text-gray-300 text-sm md:text-base leading-7 max-w-2xl mb-6">
            Explore rotavators, tillers, ridgers, ploughs,
            gear boxes and premium farming equipment
            manufactured for Indian agriculture.
          </p>

          {/* STATS */}
          <div className="flex flex-wrap gap-4">

            <div className="bg-white/10 backdrop-blur-md border border-white/10 px-5 py-4 rounded-2xl min-w-[130px]">
              <div className="text-2xl md:text-3xl font-bold text-yellow-400">
                21+
              </div>

              <div className="text-sm text-gray-300 mt-1">
                Products
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/10 px-5 py-4 rounded-2xl min-w-[130px]">
              <div className="text-2xl md:text-3xl font-bold text-yellow-400">
                4.4★
              </div>

              <div className="text-sm text-gray-300 mt-1">
                Customer Rating
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/10 px-5 py-4 rounded-2xl min-w-[130px]">
              <div className="text-2xl md:text-3xl font-bold text-yellow-400">
                ISO
              </div>

              <div className="text-sm text-gray-300 mt-1">
                Certified
              </div>
            </div>

          </div>

        </div>

        {/* SMALL WAVE */}
        <svg
          className="block w-full"
          viewBox="0 0 1440 70"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#f9fafb"
            d="M0 40L60 44C120 48 240 56 360 53C480 50 600 35 720 35C840 35 960 50 1080 53C1200 56 1320 48 1380 44L1440 40V70H0Z"
          ></path>
        </svg>

      </section>

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-4 py-8">

        {/* SEARCH */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border border-gray-300 rounded-2xl px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-green-700"
          />

          <button className="bg-green-800 hover:bg-green-900 text-white px-8 py-4 rounded-2xl font-semibold transition">
            Search
          </button>

        </div>

        {/* FILTERS */}
        <div className="flex gap-3 overflow-x-auto pb-3 mb-10 scrollbar-hide">

          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setActiveFilter(c)}
              className={`whitespace-nowrap px-5 py-3 rounded-full border text-sm font-medium transition
                ${
                  activeFilter === c
                    ? "bg-green-800 text-white border-green-800"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-green-800 hover:text-white"
                }
              `}
            >
              {c}
            </button>
          ))}

        </div>

        {/* PRODUCTS */}
        {filtered.length > 0 ? (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

            {filtered.map((p, i) => (
              <ProductCard
                key={p.id}
                product={p}
                onClick={() => openProduct(p.id)}
                delay={i * 0.04}
              />
            ))}

          </div>

        ) : (

          <div className="text-center py-20">

            <div className="text-6xl mb-4">
              🔍
            </div>

            <h3 className="text-2xl font-bold text-gray-700 mb-2">
              No Products Found
            </h3>

            <p className="text-gray-500">
              Try searching with another keyword.
            </p>

          </div>

        )}

      </section>

      {/* CTA */}
      <section className="bg-green-900 py-12 mt-10">

        <div className="max-w-7xl mx-auto px-4 text-center">

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Need Help Choosing Equipment?
          </h2>

          <p className="text-gray-300 max-w-2xl mx-auto leading-8 mb-8">
            Our team at BS Agro Equipments will help you
            choose the right machinery for your farming needs.
          </p>

          <div className="flex flex-wrap justify-center gap-4">

            <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-4 rounded-2xl transition">
              📞 Contact Us
            </button>

            <button className="border border-white/30 hover:bg-white/10 text-white px-8 py-4 rounded-2xl transition">
              Get Quotation
            </button>

          </div>

        </div>

      </section>

      <Footer />

    </div>
  );
}
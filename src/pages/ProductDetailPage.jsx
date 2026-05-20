import React, { useRef, useState } from "react";
import { products } from "../data/data";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

export default function ProductDetailPage({
  productId,
  goBack,
  openProduct,
  goPage,
}) {
  const [activeTab, setActiveTab] = useState("desc");
  const tabsRef = useRef(null);

  const scrollToTab = (el) => {
    el?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  const p = products.find((x) => x.id === productId);
  if (!p) return null;

  const related = products
    .filter((x) => x.id !== p.id && x.cat === p.cat)
    .slice(0, 4);

  const TABS = [
    { id: "desc", label: "Description" },
    { id: "specs", label: "Specifications" },
    { id: "features", label: "Features" },
    ...(related.length ? [{ id: "related", label: "Related" }] : []),
  ];

  return (
    <div className="page-enter overflow-x-hidden bg-[#fafaf8]">
      {/* BACK BUTTON */}
      <div className="bg-g1">
        <button
          onClick={goBack}
          className="inline-flex items-center gap-2 text-y1 text-[14px] font-medium px-6 py-3 w-full hover:bg-white/10 transition"
        >
          ← Back to Products
        </button>
      </div>

      {/* HERO */}
      <section className="bg-g1 px-6 md:px-12 py-10">
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* IMAGE */}
          <div className="w-full lg:w-[380px] flex justify-center">
            <div className="relative w-full min-h-[280px] h-[320px] md:h-[380px] rounded-2xl bg-[#eaf5e2] border-2 border-y1/30 overflow-hidden flex items-center justify-center">
              <img
                src={p.img}
                alt={p.name}
                loading="eager"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain p-4"
                onError={(e) => {
                  e.target.style.display = "none";
                  if (e.target.nextSibling) e.target.nextSibling.style.display = "flex";
                }}
              />
              <div
                className="hidden absolute inset-0 items-center justify-center text-[64px] bg-[#eaf5e2]"
                aria-hidden
              >
                {p.icon}
              </div>
            </div>
          </div>

          {/* INFO */}
          <div className="flex-1 text-white">
            <div className="inline-block bg-y1/20 border border-y1/40 text-y1 text-[12px] px-3 py-1 rounded-full mb-3">
              {p.cat}
            </div>

            <h1 className="font-playfair text-[36px] md:text-[44px] font-bold mb-3">
              {p.name}
            </h1>

            <div className="text-white/70 mb-2">
              BS Agro Equipments · Salem, Tamil Nadu
            </div>

            <div className="text-[28px] font-bold text-y1 mb-6">
              {p.price}
            </div>

            {/* SPEC CHIPS */}
            <div className="flex flex-wrap gap-3 mb-6">
              {Object.entries(p.spec).map(([k, v]) => (
                <div
                  key={k}
                  className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 min-w-[120px]"
                >
                  <div className="text-[11px] text-white/60 uppercase">
                    {k}
                  </div>
                  <div className="text-[14px] font-semibold mt-1">{v}</div>
                </div>
              ))}
            </div>

            {/* BUTTONS */}
            <div className="flex gap-4 flex-wrap">
              <button
                onClick={() => goPage("contact")}
                className="bg-y1 text-soil px-6 py-3 rounded-lg font-semibold"
              >
                Get Quote →
              </button>

              <button
                onClick={() => goPage("contact")}
                className="border border-white/40 px-6 py-3 rounded-lg"
              >
                Contact Seller
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* DETAILS / TABS */}
      <section className="px-6 md:px-12 py-14">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-bd p-8">
          {/* TAB BUTTONS - SLIDE LEFT RIGHT */}
          <div
            ref={tabsRef}
            className="flex gap-4 overflow-x-auto no-scrollbar border-b border-bd pb-4 mb-8"
          >
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={(e) => {
                  setActiveTab(tab.id);
                  scrollToTab(e.currentTarget);
                }}
                className={`flex-shrink-0 px-6 py-2 text-[14px] font-semibold rounded-full transition whitespace-nowrap
                  ${
                    activeTab === tab.id
                      ? "bg-g1 text-white"
                      : "bg-gray-100 text-mu hover:bg-gray-200"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* DESCRIPTION */}
          {activeTab === "desc" && (
            <div>
              <h3 className="text-[22px] font-bold text-g2 mb-4">
                Product Description
              </h3>
              <p className="text-[15px] text-[#444] leading-[1.9]">
                {p.desc}
              </p>
            </div>
          )}

          {/* SPECIFICATIONS */}
          {activeTab === "specs" && (
            <div>
              <h3 className="text-[22px] font-bold text-g2 mb-6">
                Technical Specifications
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {Object.entries(p.spec).map(([k, v]) => (
                  <div
                    key={k}
                    className="bg-[#fafafa] border border-bd rounded-lg p-4"
                  >
                    <div className="text-[12px] text-mu uppercase mb-1">{k}</div>
                    <div className="text-[15px] font-semibold text-g2">{v}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FEATURES */}
          {activeTab === "features" && (
            <div>
              <h3 className="text-[22px] font-bold text-g2 mb-6">
                Key Features
              </h3>
              <ul className="grid sm:grid-cols-2 gap-4">
                {p.features.map((f, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 bg-[#fafafa] border border-bd rounded-lg p-4 text-[14px] text-[#444]"
                  >
                    <span className="w-3 h-3 bg-y1 rounded-full mt-1" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* RELATED */}
          {activeTab === "related" && related.length > 0 && (
            <div>
              <h3 className="text-[22px] font-bold text-g2 mb-6">
                Related Products
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {related.map((r) => (
                  <ProductCard
                    key={r.id}
                    product={r}
                    onClick={() => openProduct(r.id)}
                    small
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
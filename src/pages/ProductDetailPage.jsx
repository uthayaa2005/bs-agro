import React, { useState } from "react";
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

  const p = products.find((x) => x.id === productId);

  if (!p) return null;

  const related = products
    .filter((x) => x.id !== p.id && x.cat === p.cat)
    .slice(0, 4);

  const TABS = [
    { id: "desc", label: "Description" },
    { id: "specs", label: "Specifications" },
    { id: "features", label: "Features" },
    ...(related.length
      ? [{ id: "related", label: "Related" }]
      : []),
  ];

  return (
    <div className="page-enter overflow-x-hidden">

      {/* BACK BUTTON */}
      <div className="bg-g1">

        <button
          onClick={goBack}
          className="inline-flex items-center gap-2 text-y1 text-[13px] sm:text-[14px] font-medium px-4 sm:px-6 py-3 bg-white/[0.06] border-b border-white/10 w-full hover:bg-white/10 transition-all duration-200"
        >
          ← Back to Products
        </button>

      </div>

      {/* HERO SECTION */}
      <section className="bg-g1 px-4 sm:px-6 md:px-8 lg:px-12 py-8 md:py-10">

        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* PRODUCT IMAGE */}
          <div className="w-full lg:w-auto flex justify-center">

            <div className="w-full max-w-[320px] sm:max-w-[380px] h-[260px] sm:h-[320px] rounded-2xl bg-[#eaf5e2] border-2 border-y1/30 overflow-hidden animate-scaleIn">

              <img
                src={p.img}
                alt={p.name}
                className="w-full h-full object-cover"
                onError={(e) => (e.target.style.display = "none")}
              />

            </div>

          </div>

          {/* PRODUCT INFO */}
          <div className="flex-1 animate-slideLeft w-full">

            {/* CATEGORY */}
            <div className="inline-block bg-y1/15 border border-y1/35 text-y1 text-[11px] font-medium px-3 py-1 rounded-full mb-3">
              {p.cat}
            </div>

            {/* TITLE */}
            <h1 className="font-playfair text-[28px] sm:text-[36px] md:text-[44px] font-bold text-white leading-[1.2] mb-3">
              {p.name}
            </h1>

            {/* SUBTEXT */}
            <div className="text-[13px] sm:text-[14px] text-white/60 mb-2">
              BS Agro Equipments · Salem, Tamil Nadu
            </div>

            {/* PRICE */}
            <div className="text-[24px] sm:text-[30px] font-bold text-y1 mb-5">
              {p.price}
            </div>

            {/* SPEC CHIPS */}
            <div className="flex flex-wrap gap-3 mb-5">

              {Object.entries(p.spec).map(([k, v]) => (
                <div
                  key={k}
                  className="bg-white/[0.08] border border-white/12 rounded-lg px-4 py-3 min-w-[120px]"
                >

                  <div className="text-[10px] text-white/50 uppercase tracking-wide">
                    {k}
                  </div>

                  <div className="text-[13px] sm:text-[14px] font-semibold text-white mt-1">
                    {v}
                  </div>

                </div>
              ))}

            </div>

            {/* BADGE */}
            <div className="inline-flex items-center gap-2 bg-[#eaf5e2] border border-bd text-g2 text-[11px] font-semibold px-3 py-1 rounded-md">
              ✓ ISO Certified
            </div>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-6">

              <button
                onClick={() => goPage("contact")}
                className="bg-y1 text-soil px-6 py-3 rounded-lg text-[14px] font-semibold hover:-translate-y-1 transition-all duration-200"
              >
                Get Quote →
              </button>

              <button
                onClick={() => goPage("contact")}
                className="border border-white/35 text-white px-6 py-3 rounded-lg text-[14px] hover:bg-white/10 transition-all duration-200"
              >
                Contact Seller
              </button>

            </div>

          </div>
        </div>
      </section>

      {/* TABS SECTION */}
      <section className="px-4 sm:px-6 md:px-8 lg:px-12 py-8">

        {/* TABS */}
        <div className="flex overflow-x-auto whitespace-nowrap border-b border-bd mb-6 scrollbar-hide">

          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-[13px] sm:text-[14px] font-medium border-b-2 transition-all duration-200
                ${
                  activeTab === tab.id
                    ? "text-g2 border-b-g3"
                    : "text-mu border-b-transparent hover:text-g2"
                }
              `}
            >
              {tab.label}
            </button>
          ))}

        </div>

        {/* DESCRIPTION */}
        {activeTab === "desc" && (
          <div className="animate-fadeUp">

            <p className="text-[14px] sm:text-[15px] text-mu leading-[1.9]">
              {p.desc}
            </p>

          </div>
        )}

        {/* SPECIFICATIONS */}
        {activeTab === "specs" && (
          <div className="animate-fadeUp overflow-x-auto">

            <table className="min-w-full border border-bd rounded-lg overflow-hidden">

              <tbody>

                {Object.entries(p.spec).map(([k, v]) => (
                  <tr
                    key={k}
                    className="border-b border-bd"
                  >

                    <td className="px-4 py-3 text-[13px] sm:text-[14px] font-semibold bg-[#f7f7f7] w-[40%]">
                      {k}
                    </td>

                    <td className="px-4 py-3 text-[13px] sm:text-[14px] text-mu">
                      {v}
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>
        )}

        {/* FEATURES */}
        {activeTab === "features" && (
          <div className="animate-fadeUp">

            <ul className="grid gap-3">

              {p.features.map((f, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-[14px] text-mu leading-[1.7]"
                >

                  <span className="w-2 h-2 bg-g4 rounded-full mt-2 shrink-0" />

                  {f}

                </li>
              ))}

            </ul>

          </div>
        )}

        {/* RELATED PRODUCTS */}
        {activeTab === "related" && related.length > 0 && (
          <div className="animate-fadeUp">

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

      </section>

      <Footer />
    </div>
  );
}
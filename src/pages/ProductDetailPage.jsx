import React, { useEffect, useRef, useState } from "react";
import { products } from "../data/data";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import { openWhatsApp, productQuoteMessage } from "../utils/whatsapp";
import { PHONE_NUMBER, PHONE_TEL } from "../constants/links";

export default function ProductDetailPage({
  productId,
  goBack,
  openProduct,
}) {
  const [activeTab, setActiveTab] = useState("desc");
  const [activeImage, setActiveImage] = useState(null);
  const [mediaMode, setMediaMode] = useState("photo");
  const tabsRef = useRef(null);

  const scrollToTab = (el) => {
    el?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  const p = products.find((x) => x.id === productId);

  useEffect(() => {
    setActiveImage(null);
    setMediaMode("photo");
  }, [productId]);

  if (!p) return null;

  const galleryImages = [p.img, ...(p.imgs || [])].filter(Boolean);
  const heroImage = activeImage || p.img;

  const related = products
    .filter((x) => x.id !== p.id && x.cat === p.cat)
    .slice(0, 4);

  const TABS = [
    { id: "desc", label: "Description" },
    ...(p.video ? [{ id: "video", label: "Video" }] : []),
    ...(p.cat !== "Rotavator"
      ? [
          { id: "specs", label: "Specifications" },
          { id: "features", label: "Features" },
        ]
      : []),
    ...(related.length ? [{ id: "related", label: "Related" }] : []),
  ];

  return (
    <div className="page-enter overflow-x-hidden bg-[#fafaf8]">
      {/* BACK BUTTON */}
      <div className="bg-g1">
        <button
          onClick={goBack}
          className="inline-flex items-center gap-2 text-y1 text-[14px] font-medium px-4 sm:px-6 py-3 w-full hover:bg-white/10 transition min-h-[48px]"
        >
          ← Back to Products
        </button>
      </div>

      {/* HERO */}
      <section className="bg-g1 px-4 sm:px-6 md:px-12 py-6 sm:py-10">
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-10 items-start">
          <div className="w-full lg:w-[380px] flex flex-col items-center gap-3">
            {p.video && (
              <div className="flex gap-2 w-full max-w-sm">
                <button
                  type="button"
                  onClick={() => setMediaMode("photo")}
                  className={`flex-1 min-h-[44px] px-4 py-2 rounded-lg text-sm font-semibold transition active:scale-[0.98] ${
                    mediaMode === "photo"
                      ? "bg-y1 text-soil"
                      : "bg-white/10 text-white border border-white/20"
                  }`}
                >
                  Photo
                </button>
                <button
                  type="button"
                  onClick={() => setMediaMode("video")}
                  className={`flex-1 min-h-[44px] px-4 py-2 rounded-lg text-sm font-semibold transition active:scale-[0.98] ${
                    mediaMode === "video"
                      ? "bg-y1 text-soil"
                      : "bg-white/10 text-white border border-white/20"
                  }`}
                >
                  ▶ Video
                </button>
              </div>
            )}
            <div className="relative w-full min-h-[220px] h-[260px] sm:min-h-[280px] sm:h-[320px] md:h-[380px] rounded-xl sm:rounded-2xl bg-[#eaf5e2] border-2 border-y1/30 overflow-hidden flex items-center justify-center">
              {mediaMode === "video" && p.video ? (
                <video
                  controls
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-contain bg-black"
                  src={p.video}
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <>
                  <img
                    src={heroImage}
                    alt={p.name}
                    loading="eager"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain p-3 sm:p-4"
                    onError={(e) => {
                      e.target.style.display = "none";
                      if (e.target.nextSibling) e.target.nextSibling.style.display = "flex";
                    }}
                  />
                  <div
                    className="hidden absolute inset-0 items-center justify-center text-[48px] sm:text-[64px] bg-[#eaf5e2]"
                    aria-hidden
                  >
                    {p.icon}
                  </div>
                </>
              )}
            </div>
            {mediaMode === "photo" && galleryImages.length > 1 && (
              <div className="flex gap-2 w-full justify-center overflow-x-auto no-scrollbar pb-1">
                {galleryImages.map((src) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setActiveImage(src)}
                    className={`shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-lg border-2 overflow-hidden bg-[#eaf5e2] min-h-[44px] ${
                      heroImage === src ? "border-y1" : "border-white/20"
                    }`}
                  >
                    <img src={src} alt="" className="w-full h-full object-contain p-1" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex-1 text-white w-full">
            <div className="inline-block bg-y1/20 border border-y1/40 text-y1 text-[11px] sm:text-[12px] px-3 py-1 rounded-full mb-3">
              {p.cat}
            </div>

            <h1 className="font-playfair text-[26px] sm:text-[36px] md:text-[44px] font-bold mb-2 sm:mb-3 leading-tight">
              {p.name}
            </h1>

            <div className="text-white/70 mb-2 text-sm sm:text-base">
              BS Agro Equipments · Salem, Tamil Nadu
            </div>

            <div className="text-[22px] sm:text-[28px] font-bold text-y1 mb-4 sm:mb-6 flex flex-wrap items-center gap-2">
              {p.price}
              <span className="text-[10px] sm:text-[12px] font-semibold bg-y1/20 border border-y1/40 text-y1 px-2.5 py-1 rounded-full">
                Factory Price
              </span>
            </div>

            {/* SPEC CHIPS — hidden for rotavators */}
            {p.cat !== "Rotavator" && Object.keys(p.spec).length > 0 && (
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
            )}

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => openWhatsApp(productQuoteMessage(p))}
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-3.5 rounded-lg font-semibold hover:bg-[#20bd5a] transition min-h-[48px] active:scale-[0.98] w-full sm:w-auto"
              >
                <span className="text-lg" aria-hidden>💬</span>
                Get Quote on WhatsApp
              </button>

              <a
                href={PHONE_TEL}
                className="inline-flex items-center justify-center border border-white/40 px-6 py-3.5 rounded-lg hover:bg-white/10 transition min-h-[48px] w-full sm:w-auto text-center"
              >
                Call {PHONE_NUMBER}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* DETAILS / TABS */}
      <section className="px-4 sm:px-6 md:px-12 py-8 sm:py-14">
        <div className="max-w-5xl mx-auto bg-white rounded-xl sm:rounded-2xl shadow-sm border border-bd p-4 sm:p-8">
          <div
            ref={tabsRef}
            className="flex gap-2 sm:gap-4 overflow-x-auto no-scrollbar border-b border-bd pb-3 sm:pb-4 mb-6 sm:mb-8"
          >
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={(e) => {
                  setActiveTab(tab.id);
                  scrollToTab(e.currentTarget);
                }}
                className={`flex-shrink-0 px-4 sm:px-6 py-2.5 text-[13px] sm:text-[14px] font-semibold rounded-full transition whitespace-nowrap min-h-[44px] active:scale-[0.98]
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

          {activeTab === "video" && p.video && (
            <div>
              <h3 className="text-[22px] font-bold text-g2 mb-4">
                Product Video
              </h3>
              <video
                controls
                playsInline
                preload="metadata"
                className="w-full max-w-3xl rounded-xl bg-black"
                src={p.video}
              >
                Your browser does not support the video tag.
              </video>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
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
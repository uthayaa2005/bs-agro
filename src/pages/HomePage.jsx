import React, { useEffect, useRef, useState } from "react";
import { products } from "../data/data";
import ProductCard from "../components/ProductCard";
import SectionHeader from "../components/SectionHeader";
import CategoryIcon from "../components/CategoryIcon";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import { ENQUIRY_FORM_URL } from "../constants/links";

const ENQUIRY_LINK = ENQUIRY_FORM_URL;

const LOCATION_LINK =
  "https://www.google.com/maps/place/BS+AGRO+ROTAVATORS/@11.5384857,78.813587,17z/data=!3m1!4b1!4m6!3m5!1s0x3bab7311d046f447:0x410edf7e86ac09d2!8m2!3d11.5384857!4d78.813587!16s%2Fg%2F11r8fkfnzb?hl=en-US&entry=ttu&g_ep=EgoyMDI2MDUwNi4wIKXMDSoASAFQAw%3D%3D";

const CATEGORY_META = [
  { cat: "Rotavator", label: "Rotavators" },
  { cat: "Cultivator", label: "Cultivators" },
  { cat: "Accessories", label: "Accessories" },
  { cat: "Tiller", label: "Tillers" },
  { cat: "Side Disk", label: "Side Disks" },
  { cat: "Ridger", label: "Ridgers" },
  { cat: "New Items", label: "New Items" },
];

const CATEGORIES = CATEGORY_META.map(({ cat, label }) => {
  const n = products.filter((p) => p.cat === cat).length;
  return {
    cat,
    label,
    count: `${n} product${n === 1 ? "" : "s"}`,
  };
});

const WHY_CARDS = [
  {
    icon: "🏭",
    title: "Direct Manufacturer",
    text: "Factory-direct pricing from our Salem facility.",
  },
  {
    icon: "🏅",
    title: "ISO Certified",
    text: "All products meet ISO quality standards.",
  },
  {
    icon: "🚚",
    title: "Pan-TN Delivery",
    text: "Fast delivery across Tamil Nadu.",
  },
  {
    icon: "🤝",
    title: "After-Sales Support",
    text: "1-year warranty & support.",
  },
];

const SAMPLE_REVIEWS = [
  {
    init: "N",
    name: "Naveen Kumar",
    loc: "Hosur, Tamil Nadu",
    stars: 5,
    text: '"Excellent build quality."',
    prod: "Hydraulic Reversible Plough",
  },
  {
    init: "B",
    name: "Balamurugan",
    loc: "Villupuram, Tamil Nadu",
    stars: 5,
    text: '"Very satisfied with the machine."',
    prod: "Rotavator",
  },
  {
    init: "K",
    name: "Karthikeyan",
    loc: "Salem, Tamil Nadu",
    stars: 5,
    text: '"Excellent ridger quality."',
    prod: "42H MS RD Ridger",
  },
];

function useCountUp(target, dec, active) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!active) return;

    let start = 0;
    const step = target / 30;

    const t = setInterval(() => {
      start = Math.min(start + step, target);
      setVal(parseFloat(start.toFixed(dec)));

      if (start >= target) clearInterval(t);
    }, 40);

    return () => clearInterval(t);
  }, [active, target, dec]);

  return val;
}

function StatItem({ target, dec, suffix, label, active }) {
  const val = useCountUp(target, dec, active);

  return (
    <div className="p-4 text-center border-r border-b border-bd last:border-r-0">
      <div className="font-playfair text-[20px] sm:text-[24px] md:text-[28px] font-bold text-g2">
        {val.toFixed(dec)}
        <span className="text-y1">{suffix}</span>
      </div>

      <div className="text-[10px] sm:text-[11px] text-mu uppercase mt-1">
        {label}
      </div>
    </div>
  );
}

export default function HomePage({
  goPage,
  filterProducts,
  openProduct,
}) {
  const [statsActive, setStatsActive] = useState(false);

  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStatsActive(true);
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) observer.observe(statsRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="page-enter overflow-x-hidden">

     {/* HERO */}
<section className="bg-g1 px-4 sm:px-6 md:px-8 lg:px-12 pt-10 sm:pt-12 md:pt-16 pb-0 relative overflow-hidden min-h-[300px]">

  {/* BACKGROUND */}
  <div className="absolute -top-[60px] -right-[80px] w-[280px] h-[280px] rounded-full bg-y1 opacity-[0.06]" />
  <div className="absolute -bottom-[100px] -left-[60px] w-[220px] h-[220px] rounded-full bg-g4 opacity-[0.08]" />

  <div className="relative z-10 max-w-[700px]">

    {/* BADGE */}
    <div className="inline-flex flex-wrap items-center gap-1.5 bg-y1/[0.12] border border-y1/35 text-y1 px-4 py-1 rounded-full text-[11px] sm:text-[12px] font-medium mb-4">
      ⭐ 4.4/5 · 43 Verified Ratings · Salem, Tamil Nadu
    </div>

    {/* TITLE */}
    <h1 className="font-playfair text-[28px] sm:text-[38px] md:text-[48px] lg:text-[56px] font-black text-white leading-[1.2] mb-4">
      Premium <span className="text-y1">Agro Equipment</span>
      <br />
      for Modern Farming
    </h1>

    {/* DESCRIPTION */}
    <p className="text-white/70 text-[13px] sm:text-[14px] md:text-[16px] leading-[1.8] mb-6 max-w-[550px]">
      Rotavators, reversible ploughs, ridgers, gear boxes and
      accessories engineered for Indian farming.
    </p>

    {/* BUTTONS */}
    <div className="flex flex-col sm:flex-row flex-wrap gap-3">

      <button
        onClick={() => goPage("products")}
        className="bg-y1 text-soil px-6 py-3 rounded-lg text-[14px] font-semibold hover:-translate-y-1 transition-all duration-200 animate-glow min-h-[48px]"
      >
        Browse Products
      </button>

      <a
        href={ENQUIRY_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="border border-white/30 text-white px-6 py-3 rounded-lg text-[14px] hover:bg-white/10 transition-all duration-200 text-center"
      >
        Enquiries
      </a>

      <a
        href={LOCATION_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="border border-white/30 text-white px-6 py-3 rounded-lg text-[14px] hover:bg-white/10 transition-all duration-200 text-center"
      >
        📍 Live Location
      </a>

    </div>
  </div>

  {/* FIXED WAVE */}
  <svg
    className="block -mb-1"
    viewBox="0 0 680 60"
    preserveAspectRatio="none"
    height="60"
  >
    <path
      d="M0 40 Q170 0 340 30 Q510 60 680 20 L680 60 L0 60Z"
      fill="#fafaf8"
    />
  </svg>

</section>

      {/* STATS */}
      <div
        ref={statsRef}
        className="bg-white border-b border-bd grid grid-cols-2 md:grid-cols-4"
      >
        <StatItem
          target={43}
          dec={0}
          suffix="+"
          label="Reviews"
          active={statsActive}
        />

        <StatItem
          target={4.4}
          dec={1}
          suffix="/5"
          label="Rating"
          active={statsActive}
        />

        <StatItem
          target={64}
          dec={0}
          suffix="%"
          label="Response"
          active={statsActive}
        />

        <StatItem
          target={products.length}
          dec={0}
          suffix="+"
          label="Products"
          active={statsActive}
        />
      </div>

      {/* CATEGORIES */}
      <Reveal as="section" className="px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-10 bg-white">

        <SectionHeader
          title="Product Categories"
          sub="Click any category to explore"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">

          {CATEGORIES.map((c, i) => (
            <Reveal
              key={c.cat}
              delay={Math.min(i * 0.05, 0.25)}
              onClick={() => filterProducts(c.cat)}
              className="bg-white border border-bd rounded-xl p-3 sm:p-4 text-center cursor-pointer hover:bg-g1 hover:border-g1 group transition-all duration-300 active:scale-[0.98] min-h-[100px]"
            >

              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#eaf5e2] flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover:bg-y1 group-hover:text-soil text-g2 transition-colors animate-float" style={{ animationDelay: `${i * 0.15}s` }}>
                <CategoryIcon category={c.cat} />
              </div>

              <div className="text-[11px] sm:text-[13px] font-semibold group-hover:text-white leading-tight">
                {c.label}
              </div>

              <div className="text-[10px] sm:text-[11px] text-mu mt-1 group-hover:text-y2">
                {c.count}
              </div>

            </Reveal>
          ))}

        </div>
      </Reveal>

      {/* FEATURED PRODUCTS */}
      <Reveal as="section" className="px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-10" delay={0.05}>

        <SectionHeader
          title="Featured Products"
          sub="Click a product to view details"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">

          {products.slice(0, 6).map((p, i) => (
            <ProductCard
              key={p.id}
              product={p}
              onClick={() => openProduct(p.id)}
              delay={Math.min(i * 0.05, 0.3)}
            />
          ))}

        </div>

        <div className="text-center mt-8">

          <button
            onClick={() => goPage("products")}
            className="bg-y1 text-soil px-6 py-3 rounded-lg font-semibold hover:-translate-y-1 transition-all duration-200"
          >
            View All Products
          </button>

        </div>
      </Reveal>

      {/* PROMO */}
      <Reveal as="div" className="bg-g1 px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-10 flex flex-col items-center justify-center gap-5 sm:gap-6 relative overflow-hidden text-center">

        <div className="absolute -right-10 -top-10 w-[160px] h-[160px] rounded-full bg-y1 opacity-[0.06]" />

        <div>

          <h3 className="font-playfair text-[28px] sm:text-[34px] text-white mb-3">
            Need Help Choosing Equipment?
          </h3>

          <p className="text-white/70 text-[14px] sm:text-[16px] leading-[1.8] max-w-[700px] mx-auto">
            Our team at BS Agro Equipments will help you choose the
            right machinery for your farming needs.
          </p>

        </div>

        <div className="flex flex-col sm:flex-row gap-4">

          {/* CALL BUTTON */}
          <a
            href="tel:07942819807"
            className="bg-y1 text-soil px-8 py-4 rounded-2xl font-semibold text-[16px] hover:scale-105 transition-all duration-300"
          >
            📞 Contact Us
          </a>

          {/* ENQUIRY BUTTON */}
          <a
            href={ENQUIRY_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/30 text-white px-8 py-4 rounded-2xl text-[16px] hover:bg-white/10 transition-all duration-300"
          >
            Get Quotation
          </a>

          {/* LOCATION BUTTON */}
          <a
            href={LOCATION_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/30 text-white px-8 py-4 rounded-2xl text-[16px] hover:bg-white/10 transition-all duration-300"
          >
            📍 Location
          </a>

        </div>
      </Reveal>

      {/* WHY CHOOSE */}
      <Reveal as="section" className="px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-10 bg-white">

        <SectionHeader
          title="Why Choose BS Agro?"
          sub="Built for Indian farming conditions"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

          {WHY_CARDS.map((w, i) => (
            <Reveal
              key={w.title}
              delay={Math.min(i * 0.07, 0.28)}
              className="border border-bd rounded-xl p-4 sm:p-5 hover:border-g3 transition-colors"
            >

              <div className="text-[28px] mb-3">
                {w.icon}
              </div>

              <div className="font-semibold text-[15px] mb-2">
                {w.title}
              </div>

              <div className="text-[13px] text-mu leading-[1.8]">
                {w.text}
              </div>

            </Reveal>
          ))}

        </div>
      </Reveal>

      {/* REVIEWS */}
      <Reveal as="section" className="px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-10">

        <SectionHeader title="What Farmers Say" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

          {SAMPLE_REVIEWS.map((r, i) => (
            <Reveal key={i} delay={Math.min(i * 0.08, 0.24)} className="bg-white border border-bd rounded-xl p-4 sm:p-5">

              <div className="flex items-center gap-3 mb-3">

                <div className="w-10 h-10 rounded-full bg-g2 flex items-center justify-center text-y1 font-semibold">
                  {r.init}
                </div>

                <div>

                  <div className="font-semibold text-[14px]">
                    {r.name}
                  </div>

                  <div className="text-[12px] text-mu">
                    {r.loc}
                  </div>

                </div>

              </div>

              <div className="text-y1 mb-2">
                {"★".repeat(r.stars)}
              </div>

              <div className="text-[13px] text-mu leading-[1.8] italic">
                {r.text}
              </div>

              <div className="text-[12px] text-g3 mt-3 font-medium">
                {r.prod}
              </div>

            </Reveal>
          ))}

        </div>
      </Reveal>

      {/* CONTACT STRIP */}
      <div className="bg-y1 px-4 sm:px-6 md:px-8 lg:px-12 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">

        <div>

          <div className="font-playfair text-[20px] font-bold text-soil">
            B S Agro Equipments
          </div>

          <div className="text-[13px] text-soil/70">
            Salem, Tamil Nadu
          </div>

        </div>

        <div className="flex flex-wrap gap-3">

          {/* DIRECT CALL */}
          <a
            href="tel:07942819807"
            className="bg-soil text-y1 px-5 py-3 rounded-lg text-[13px] font-semibold"
          >
            📞 Call Us
          </a>

          {/* ENQUIRY */}
          <a
            href={ENQUIRY_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-soil text-soil px-5 py-3 rounded-lg text-[13px] font-semibold"
          >
            Get Quote
          </a>

          {/* LOCATION */}
          <a
            href={LOCATION_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-soil text-soil px-5 py-3 rounded-lg text-[13px] font-semibold"
          >
            📍 Location
          </a>

        </div>
      </div>

      <Footer />
    </div>
  );
}
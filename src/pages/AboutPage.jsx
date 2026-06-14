import React from "react";
import Footer from "../components/Footer";
import { PHONE_NUMBER } from "../constants/links";

const ABOUT_CARDS = [
  {
    icon: "📍",
    title: "Headquarters",
    text: "4/12 Sitheri, Attur, Salem – 636101, Tamil Nadu, India",
  },
  {
    icon: "👤",
    title: "CEO / Founder",
    text: "M. Sundaram — agriculture equipment expert",
  },
  {
    icon: "⭐",
    title: "Rating & Trust",
    text: "4.4/5 with 43 verified buyer reviews",
  },
  {
    icon: "📞",
    title: "Contact",
    text: `${PHONE_NUMBER} · SMS & Email support`,
  },
  {
    icon: "🏭",
    title: "Nature of Business",
    text: "Direct Manufacturer · ₹1.5–5 Cr turnover",
  },
  {
    icon: "🏅",
    title: "Certifications",
    text: "ISO Certified · GST Registered",
  },
];

const TIMELINE = [
  {
    year: "2019 · Founded",
    text: "BS Agro Equipments established in Salem.",
  },
  {
    year: "2020 · GST Registration",
    text: "Expanded into gear boxes and tillers.",
  },
  {
    year: "2022–2023 · Tamil Nadu Reach",
    text: "Distribution expanded across Tamil Nadu.",
  },
  {
    year: "2024–2026 · RD Series Launch",
    text: "Launched advanced RD agricultural series.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-gray-50 min-h-screen overflow-hidden">

      {/* HERO */}
      <section className="bg-green-900 text-white py-14">

        <div className="max-w-7xl mx-auto px-4">

          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">

            {/* ICON */}
            <div className="w-20 h-20 bg-yellow-400 rounded-2xl flex items-center justify-center text-4xl shrink-0">
              🌾
            </div>

            {/* TEXT */}
            <div>

              <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                About BS Agro Equipments
              </h1>

              <p className="text-gray-200 leading-7 max-w-3xl text-sm md:text-base">
                Established in 2019 in Tamil Nadu, BS Agro Equipments
                has become a trusted agricultural machinery manufacturer
                under the leadership of M. Sundaram.
              </p>

            </div>
          </div>
        </div>
      </section>

      {/* COMPANY DETAILS */}
      <section className="max-w-7xl mx-auto px-4 py-12">

        {/* TITLE */}
        <div className="mb-10">

          <div className="w-16 h-1 bg-yellow-500 mb-4 rounded"></div>

          <h2 className="text-3xl md:text-5xl font-bold text-green-900">
            Company Details
          </h2>

        </div>

        {/* RESPONSIVE CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

          {ABOUT_CARDS.map((card) => (
            <div
              key={card.title}
              className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-lg transition duration-300 w-full"
            >

              <div className="text-4xl mb-4">
                {card.icon}
              </div>

              <h3 className="text-xl font-semibold text-green-800 mb-3">
                {card.title}
              </h3>

              <p className="text-gray-600 leading-7 text-sm">
                {card.text}
              </p>

            </div>
          ))}

        </div>

        {/* TIMELINE */}
        <div className="mt-16">

          <div className="w-16 h-1 bg-yellow-500 mb-4 rounded"></div>

          <h2 className="text-3xl md:text-5xl font-bold text-green-900 mb-10">
            Our Journey
          </h2>

          <div className="relative">

            {TIMELINE.map((item, index) => (
              <div
                key={item.year}
                className="flex gap-4 mb-8"
              >

                {/* DOT */}
                <div className="flex flex-col items-center">

                  <div className="w-4 h-4 rounded-full bg-green-700 mt-2"></div>

                  {index !== TIMELINE.length - 1 && (
                    <div className="w-[2px] flex-1 bg-green-300"></div>
                  )}

                </div>

                {/* CONTENT */}
                <div className="pb-2">

                  <h3 className="text-green-700 font-semibold text-sm md:text-base">
                    {item.year}
                  </h3>

                  <p className="text-gray-600 mt-2 leading-7 text-sm md:text-base">
                    {item.text}
                  </p>

                </div>

              </div>
            ))}

          </div>
        </div>

      </section>

      <Footer />

    </div>
  );
}
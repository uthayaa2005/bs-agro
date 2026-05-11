import React, { useEffect, useRef, useState } from "react";
import { reviews } from "../data/data";
import Footer from "../components/Footer";

const BAR_DATA = [
  { id: "b5", label: "5 ★", pct: "67%", w: "67%" },
  { id: "b4", label: "4 ★", pct: "12%", w: "12%" },
  { id: "b3", label: "3 ★", pct: "9%", w: "9%" },
  { id: "b2", label: "2 ★", pct: "0%", w: "0%" },
  { id: "b1", label: "1 ★", pct: "12%", w: "12%", red: true },
];

export default function ReviewsPage() {
  const [barsActive, setBarsActive] = useState(false);

  const barRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBarsActive(true);
        }
      },
      { threshold: 0.3 }
    );

    if (barRef.current) {
      observer.observe(barRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen overflow-hidden">

      {/* HERO */}
      <section className="bg-green-900 text-white py-14">

        <div className="max-w-7xl mx-auto px-4">

          <div className="inline-block bg-yellow-500/20 border border-yellow-400 text-yellow-300 px-4 py-1 rounded-full text-sm mb-4">
            Customer Reviews
          </div>

          <h1 className="text-3xl md:text-5xl font-bold leading-tight max-w-3xl">
            What Our Customers Say
          </h1>

        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-4 py-10">

        {/* RATING CARD */}
        <div
          ref={barRef}
          className="bg-white rounded-3xl shadow-md p-5 md:p-8 flex flex-col md:flex-row gap-8 mb-8"
        >

          {/* LEFT */}
          <div className="text-center md:w-[180px] shrink-0">

            <div className="text-5xl md:text-6xl font-bold text-green-900 leading-none">
              4.4
            </div>

            <div className="text-yellow-500 text-2xl my-3">
              ★★★★☆
            </div>

            <div className="text-gray-500 text-sm">
              43 ratings
            </div>

          </div>

          {/* RIGHT */}
          <div className="flex-1 w-full">

            {BAR_DATA.map((bar) => (
              <div
                key={bar.id}
                className="flex items-center gap-3 mb-4"
              >

                <div className="w-10 text-sm text-gray-600 shrink-0">
                  {bar.label}
                </div>

                <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">

                  <div
                    className={`h-full transition-all duration-1000 ${
                      bar.red
                        ? "bg-red-400"
                        : "bg-green-700"
                    }`}
                    style={{
                      width: barsActive ? bar.w : "0%",
                    }}
                  ></div>

                </div>

                <div className="w-12 text-right text-sm text-gray-600 shrink-0">
                  {bar.pct}
                </div>

              </div>
            ))}

          </div>

        </div>

        {/* METRICS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">

          {[
            ["86%", "👍 Response"],
            ["85%", "⭐ Quality"],
            ["85%", "🚚 Delivery"],
          ].map(([pct, label]) => (
            <div
              key={label}
              className="bg-white rounded-2xl shadow-sm p-6 text-center hover:shadow-lg transition"
            >

              <div className="text-4xl font-bold text-green-800">
                {pct}
              </div>

              <div className="text-gray-600 mt-2">
                {label}
              </div>

            </div>
          ))}

        </div>

        {/* REVIEWS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-sm p-6 hover:shadow-xl transition duration-300"
            >

              {/* TOP */}
              <div className="flex items-center gap-4 mb-5">

                <div className="w-12 h-12 rounded-full bg-green-800 text-yellow-400 flex items-center justify-center font-bold text-lg shrink-0">
                  {review.init}
                </div>

                <div>

                  <h3 className="font-semibold text-gray-800">
                    {review.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {review.loc}
                  </p>

                </div>

              </div>

              {/* STARS */}
              <div className="text-yellow-500 text-lg mb-3">
                {"★".repeat(review.stars)}
                {"☆".repeat(5 - review.stars)}
              </div>

              {/* REVIEW */}
              <p className="text-gray-600 leading-7 italic text-sm">
                "{review.text}"
              </p>

              {/* PRODUCT */}
              <div className="mt-5 text-sm text-green-700 font-medium">
                {review.prod} · {review.date}
              </div>

            </div>
          ))}

        </div>

      </section>

      <Footer />

    </div>
  );
}
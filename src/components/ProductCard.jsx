import React from "react";

export default function ProductCard({
  product,
  onClick,
  delay = 0,
  small = false,
}) {
  const { name, cat, price, badge, icon, img } = product;

  return (
    <div
      onClick={onClick}
      className="group bg-white border border-bd rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] animate-scaleIn hover:-translate-y-2 hover:border-g3 hover:shadow-[0_14px_35px_rgba(45,138,78,0.12)]"
      style={{
        animationDelay: `${delay}s`,
      }}
    >

      {/* IMAGE */}
      <div
        className={`relative overflow-hidden bg-gradient-to-br from-[#e8f5e0] to-[#d0ecc0]
          ${
            small
              ? "h-[120px] sm:h-[130px]"
              : "h-[180px] sm:h-[220px] md:h-[240px]"
          }
        `}
      >

        {/* SHINE EFFECT */}
        <div className="prod-img-shine absolute inset-0 z-[1]" />

        {/* PRODUCT IMAGE */}
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />

        {/* FALLBACK ICON */}
        <div
          className="absolute inset-0 items-center justify-center text-[40px] sm:text-[50px]"
          style={{ display: "none" }}
        >
          {icon}
        </div>

        {/* BADGE */}
        {badge && (
          <div className="absolute top-3 right-3 bg-y1 text-soil text-[9px] sm:text-[10px] font-bold px-2.5 py-1 rounded-full z-[5] shadow-md">
            {badge}
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-4 sm:p-5">

        {/* PRODUCT NAME */}
        <div
          className={`font-semibold text-tx leading-[1.5] mb-1
            ${
              small
                ? "text-[13px] sm:text-[14px]"
                : "text-[15px] sm:text-[16px]"
            }
          `}
        >
          {name}
        </div>

        {/* CATEGORY */}
        <div className="text-[12px] sm:text-[13px] text-mu mb-3">
          {cat}
        </div>

        {/* PRICE */}
        <div
          className={`font-bold text-g2 mb-4
            ${
              small
                ? "text-[13px] sm:text-[14px]"
                : "text-[16px] sm:text-[18px]"
            }
          `}
        >
          {price}
        </div>

        {/* ACTIONS */}
        {!small ? (
          <div className="flex items-center justify-between gap-3">

            <span className="text-[13px] sm:text-[14px] font-semibold text-g2">
              Get Quote
            </span>

            <button
              className="bg-g2 text-white text-[11px] sm:text-[12px] font-semibold px-4 py-2 rounded-lg hover:bg-g1 transition-all duration-200"
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
            >
              View →
            </button>

          </div>
        ) : (
          <button
            className="w-full mt-2 bg-g2 text-white text-[11px] sm:text-[12px] font-semibold px-4 py-2 rounded-lg hover:bg-g1 transition-all duration-200"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            View →
          </button>
        )}

      </div>
    </div>
  );
}
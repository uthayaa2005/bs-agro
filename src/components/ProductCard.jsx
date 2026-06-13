import React from "react";

export default function ProductCard({
  product,
  onClick,
  delay = 0,
  small = false,
}) {
  const { name, cat, price, icon, img, video } = product;

  return (
    <div
      onClick={onClick}
      className="prod-card group h-full flex flex-col bg-white border border-bd rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] animate-scaleIn hover:-translate-y-1 sm:hover:-translate-y-2 hover:border-g3 hover:shadow-[0_14px_35px_rgba(45,138,78,0.12)] active:scale-[0.99]"
      style={{ animationDelay: `${delay}s` }}
    >
      <div
        className={`relative overflow-hidden bg-gradient-to-br from-[#e8f5e0] to-[#d0ecc0] ${
          small ? "h-[120px] sm:h-[130px]" : "h-[160px] sm:h-[220px] md:h-[240px]"
        }`}
      >
        <div className="prod-img-shine absolute inset-0 z-[1]" />

        <img
          src={img}
          alt={name}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-[1.04]"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />

        <div
          className="absolute inset-0 items-center justify-center text-[40px] sm:text-[50px]"
          style={{ display: "none" }}
        >
          {icon}
        </div>

        {video && (
          <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 z-[5] flex items-center gap-1 bg-soil/90 text-white text-[9px] sm:text-[11px] font-semibold px-2 py-1 sm:px-2.5 rounded-full">
            <span aria-hidden>▶</span> Video
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col p-3 sm:p-5">
        <div
          className={`font-semibold text-tx leading-[1.45] mb-1 line-clamp-3 ${
            small
              ? "min-h-[40px] text-[13px] line-clamp-2"
              : "min-h-[66px] sm:min-h-[72px] text-[14px] sm:text-[16px]"
          }`}
        >
          {name}
        </div>

        <div className="text-[11px] sm:text-[13px] text-mu mb-1.5 sm:mb-2 shrink-0">{cat}</div>

        <div className="shrink-0">
          <div
            className={`font-bold text-g2 ${
              small ? "text-[13px]" : "text-[15px] sm:text-[18px]"
            }`}
          >
            {price}
          </div>
          <div className="text-[9px] sm:text-[11px] text-mu mt-0.5">Factory price · Salem</div>
        </div>

        <button
          type="button"
          className={`w-full mt-auto bg-g2 text-white font-semibold rounded-lg hover:bg-g1 transition-all duration-200 min-h-[44px] active:scale-[0.98] ${
            small ? "mt-3 text-[11px] px-3 py-2" : "mt-3 sm:mt-4 text-[13px] sm:text-[14px] px-4 py-2.5"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          View Details →
        </button>
      </div>
    </div>
  );
}

import React from "react";

export default function TrustStrip() {
  return (
    <div className="bg-g2 border-b border-g3/40 text-white/90 text-[10px] sm:text-[12px] py-2 overflow-x-auto no-scrollbar">
      <div className="flex items-center justify-start sm:justify-center gap-3 px-4 min-w-max sm:min-w-0 sm:flex-wrap sm:gap-x-3">
        <span className="shrink-0">✓ ISO Certified</span>
        <span className="text-y1/50 shrink-0" aria-hidden>·</span>
        <span className="shrink-0">✓ Salem Factory</span>
        <span className="text-y1/50 shrink-0" aria-hidden>·</span>
        <span className="shrink-0 hidden xs:inline">✓ TN Delivery</span>
        <span className="text-y1/50 shrink-0 hidden xs:inline" aria-hidden>·</span>
        <a
          href="tel:07942819807"
          className="shrink-0 font-semibold text-y1 hover:text-y2 transition"
        >
          📞 07942819807
        </a>
      </div>
    </div>
  );
}

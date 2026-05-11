import React from "react";
import { tickItems } from "../data/data";

export default function Ticker() {
  const allItems = [...tickItems, ...tickItems];

  return (
    <div className="bg-y1 overflow-hidden border-b-2 border-g2 h-[38px] sm:h-[42px] flex items-center">

      {/* TICKER WRAPPER */}
      <div className="ticker-inner flex whitespace-nowrap min-w-max">

        {allItems.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-2 sm:gap-3 px-5 sm:px-8 md:px-10 shrink-0"
          >

            {/* DOT */}
            <span className="w-[5px] h-[5px] sm:w-[6px] sm:h-[6px] bg-g2 rounded-full inline-block shrink-0" />

            {/* TEXT */}
            <span className="text-[11px] sm:text-[12px] md:text-[13px] font-semibold text-soil tracking-[0.2px]">
              {item}
            </span>

          </div>
        ))}

      </div>

    </div>
  );
}
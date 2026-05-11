import React from "react";

export default function SectionHeader({ title, sub }) {
  return (
    <div className="mb-6 sm:mb-8">

      {/* TOP LINE */}
      <div className="inline-block w-10 sm:w-12 h-[3px] bg-y1 rounded-full mb-2" />

      {/* TITLE */}
      <h2 className="font-playfair text-[24px] sm:text-[32px] md:text-[38px] font-bold text-g1 leading-[1.2]">
        {title}
      </h2>

      {/* SUBTITLE */}
      {sub && (
        <p className="text-[13px] sm:text-[14px] md:text-[15px] text-mu mt-2 leading-[1.7] max-w-[700px]">
          {sub}
        </p>
      )}

    </div>
  );
}
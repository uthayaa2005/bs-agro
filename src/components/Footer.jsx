import React from "react";

export default function Footer() {
  return (
    <footer className="bg-soil px-4 sm:px-6 md:px-8 py-6 sm:py-7">

      <div className="max-w-[1200px] mx-auto text-center">

        <p className="text-[11px] sm:text-[12px] md:text-[13px] text-white/50 leading-[1.8]">

          © 2026{" "}

          <span className="text-y1 font-medium">
            BS Agro Equipments
          </span>

          <span className="hidden sm:inline">
            {" "}· Salem, Tamil Nadu · GST: 33FJKPS8217P1ZC
          </span>

        </p>

        {/* MOBILE ONLY */}
        <div className="sm:hidden mt-1 text-[10px] text-white/40 leading-[1.6]">
          Salem, Tamil Nadu <br />
          GST: 33FJKPS8217P1ZC
        </div>

      </div>

    </footer>
  );
}
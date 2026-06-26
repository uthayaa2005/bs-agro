import React, { useState } from "react";
import { ENQUIRY_FORM_URL } from "../constants/links";
import { pathFor } from "../utils/historyNav";

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "products", label: "Products" },
  { id: "about", label: "About Us" },
  { id: "reviews", label: "Reviews" },
  { id: "contact", label: "Contact" },
];

function navHref(page) {
  return pathFor({ page, productId: null, filter: "All" });
}

export default function Navbar({ currentPage, goPage }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (page) => {
    goPage(page);
    setMenuOpen(false);
  };

  return (
    <nav className="bg-g1 border-b-[3px] border-y1 sticky top-0 z-[999] animate-navSlide">

      {/* TOP BAR */}
      <div className="h-[70px] px-4 sm:px-6 lg:px-10 flex items-center justify-between">

        {/* LOGO */}
        <a
          href={navHref("home")}
          onClick={(e) => {
            e.preventDefault();
            handleNav("home");
          }}
          className="flex items-center gap-3 cursor-pointer shrink-0"
        >

          <img
            src="https://5.imimg.com/data5/SELLER/Logo/2023/8/337356682/TC/VV/PO/20664883/bs-120x120.jpg"
            alt="BS Agro Logo"
            className="w-10 h-10 rounded-lg object-cover border-2 border-y1"
            onError={(e) => (e.target.style.display = "none")}
          />

          <span className="font-playfair text-[22px] sm:text-[24px] font-black text-white tracking-wide">
            BS <span className="text-y1">Agro</span>
          </span>

        </a>

        {/* DESKTOP MENU */}
        <div className="hidden lg:flex items-center gap-1">

          <ul className="flex items-center list-none gap-1">

            {NAV_LINKS.map((link) => (
              <li key={link.id}>

                <a
                  href={navHref(link.id)}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav(link.id);
                  }}
                  className={`text-[14px] font-medium px-4 h-[70px] flex items-center border-b-[3px] transition-all duration-200
                    ${
                      currentPage === link.id
                        ? "text-y1 border-b-y1 bg-white/[0.05]"
                        : "text-white/80 border-b-transparent hover:text-y1 hover:border-b-y1 hover:bg-white/[0.05]"
                    }
                  `}
                >
                  {link.label}
                </a>

              </li>
            ))}

          </ul>

          {/* CTA */}
          <a
            href={ENQUIRY_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 bg-y1 text-soil px-5 py-2.5 rounded-lg text-[14px] font-semibold hover:scale-[1.05] transition-all duration-200 inline-flex items-center"
          >
            Get Quote
          </a>

        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-white text-[28px] leading-none"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

      </div>

      {/* MOBILE MENU */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          menuOpen
            ? "max-h-[500px] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >

        <div className="px-4 pb-5 border-t border-white/10 bg-g1">

          {/* MOBILE LINKS */}
          <ul className="flex flex-col pt-3">

            {NAV_LINKS.map((link) => (
              <li key={link.id}>

                <a
                  href={navHref(link.id)}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav(link.id);
                  }}
                  className={`block w-full text-left px-4 py-3 rounded-lg text-[14px] transition-all duration-200
                    ${
                      currentPage === link.id
                        ? "bg-white/10 text-y1"
                        : "text-white/80 hover:bg-white/5 hover:text-y1"
                    }
                  `}
                >
                  {link.label}
                </a>

              </li>
            ))}

          </ul>

          {/* MOBILE CTA */}
          <a
            href={ENQUIRY_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="w-full mt-4 bg-y1 text-soil py-3 rounded-xl text-[14px] font-semibold hover:scale-[1.02] transition-all duration-200 text-center block min-h-[48px] flex items-center justify-center"
          >
            Get Quote
          </a>

        </div>

      </div>

    </nav>
  );
}
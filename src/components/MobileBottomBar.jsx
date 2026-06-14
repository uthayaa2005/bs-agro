import React from "react";
import { openWhatsApp } from "../utils/whatsapp";
import { PHONE_TEL } from "../constants/links";

const ITEMS = [
  { id: "home", label: "Home", icon: "🏠" },
  { id: "products", label: "Products", icon: "🚜" },
  { id: "call", label: "Call", icon: "📞", href: PHONE_TEL },
  { id: "whatsapp", label: "Chat", icon: "💬" },
];

export default function MobileBottomBar({ currentPage, goPage }) {
  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-[9998] bg-g1 border-t-2 border-y1 shadow-[0_-4px_20px_rgba(0,0,0,0.25)] pb-[env(safe-area-inset-bottom)]"
      aria-label="Mobile navigation"
    >
      <div className="grid grid-cols-4 h-14">
        {ITEMS.map((item) => {
          const active = currentPage === item.id;
          const base =
            "flex flex-col items-center justify-center gap-0.5 text-[10px] font-semibold min-h-[56px] active:bg-white/10 transition-colors";

          if (item.id === "whatsapp") {
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => openWhatsApp()}
                className={`${base} text-[#25D366]`}
              >
                <span className="text-[20px] leading-none">{item.icon}</span>
                {item.label}
              </button>
            );
          }

          if (item.href) {
            return (
              <a key={item.id} href={item.href} className={`${base} text-white/90`}>
                <span className="text-[20px] leading-none">{item.icon}</span>
                {item.label}
              </a>
            );
          }

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => goPage(item.id)}
              className={`${base} ${active ? "text-y1 bg-white/5" : "text-white/90"}`}
            >
              <span className="text-[20px] leading-none">{item.icon}</span>
              {item.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

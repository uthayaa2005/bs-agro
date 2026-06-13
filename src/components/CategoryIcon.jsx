import React from "react";

const icons = {
  Rotavator: (
    <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" aria-hidden>
      <rect
        x="3"
        y="8"
        width="18"
        height="8"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M8 12h8M6 16v2M18 16v2M12 8V5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  ),
  "Side Disk": (
    <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" aria-hidden>
      <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      <path
        d="M12 5v2M12 17v2M5 12h2M17 12h2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  ),
  Ridger: (
    <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" aria-hidden>
      <path
        d="M4 16c3-4 5-6 8-6s5 2 8 6M4 19h16"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M8 13V8M16 13V8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  ),
  Cultivator: (
    <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" aria-hidden>
      <path
        d="M6 18V8M10 18V6M14 18V8M18 18V6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M4 20h16M8 8l2-3M16 6l2-3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  "New Items": (
    <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" aria-hidden>
      <path
        d="M12 3l1.8 5.5H19l-4.6 3.3 1.8 5.5L12 14l-4.2 3.3 1.8-5.5L5 8.5h5.2L12 3z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

export default function CategoryIcon({ category, className = "text-g2" }) {
  return (
    <span className={`inline-flex items-center justify-center ${className}`}>
      {icons[category] || icons.Rotavator}
    </span>
  );
}

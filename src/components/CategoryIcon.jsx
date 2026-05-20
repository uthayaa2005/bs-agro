import React from "react";

const icons = {
  "Agriculture Rotavator": (
    <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" aria-hidden>
      <path
        d="M4 18h16M7 18V9l3-4h4l3 4v9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 14h6M8 18l-1 3M16 18l1 3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="12" cy="6" r="1.5" fill="currentColor" />
    </svg>
  ),
  "Gear Box": (
    <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" aria-hidden>
      <path
        d="M12 15.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M12 4v2M12 18v2M4 12h2M18 12h2M6.3 6.3l1.4 1.4M16.3 16.3l1.4 1.4M6.3 17.7l1.4-1.4M16.3 7.7l1.4-1.4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  ),
  Accessories: (
    <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" aria-hidden>
      <path
        d="M14.7 6.3a4.5 4.5 0 00-6.4 6.4l-5.5 5.5 2.1 2.1 5.5-5.5a4.5 4.5 0 006.4-6.4l-2.1 2.9-2.9-2.1 2.1-2.9z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  Tiller: (
    <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" aria-hidden>
      <path
        d="M5 17h14M8 17V10l2-2h4l2 2v7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 12h10M6 17l-1 2M18 17l1 2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  ),
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
      {icons[category] || icons["Agriculture Rotavator"]}
    </span>
  );
}

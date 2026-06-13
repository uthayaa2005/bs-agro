import React from "react";
import { useInView } from "../hooks/useInView";

export default function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
  onClick,
}) {
  const [ref, inView] = useInView({ threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

  return (
    <Tag
      ref={ref}
      onClick={onClick}
      className={`reveal-animate transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
      style={{ transitionDelay: inView ? `${delay}s` : "0s" }}
    >
      {children}
    </Tag>
  );
}

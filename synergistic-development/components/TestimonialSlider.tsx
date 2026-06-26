"use client";

import { useState, useRef, useEffect } from "react";
import { TESTIMONIALS } from "@/lib/constants";

const SWIPE_THRESHOLD = 50;

export default function TestimonialSlider() {
  const [index, setIndex] = useState(0);
  const total = TESTIMONIALS.length;

  const touchStartX = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const goTo = (next: number) => {
    setIndex(((next % total) + total) % total);
  };

  const prev = () => goTo(index - 1);
  const next = () => goTo(index + 1);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(document.activeElement)) return;
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > SWIPE_THRESHOLD) {
      if (delta > 0) prev();
      else next();
    }
    touchStartX.current = null;
  };

  return (
    <div
      ref={containerRef}
      className="relative"
      role="region"
      aria-roledescription="carousel"
      aria-label="Client testimonials"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Quote mark */}
      <div
        aria-hidden="true"
        className="text-center font-display"
        style={{
          fontSize: 120,
          lineHeight: 0.6,
          color: "#b8965a",
          opacity: 0.4,
          marginBottom: 16,
        }}
      >
        &ldquo;
      </div>

      {/* Quote */}
      <div className="text-center px-4 lg:px-16">
        {TESTIMONIALS.map((t, i) => (
          <blockquote
            key={i}
            aria-hidden={i !== index}
            className={`transition-opacity duration-500 ${
              i === index ? "opacity-100" : "opacity-0 absolute inset-x-0 pointer-events-none"
            }`}
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(22px, 2.5vw, 26px)",
              lineHeight: 1.5,
              color: "#ffffff",
              maxWidth: 680,
              margin: "0 auto",
            }}
          >
            {t.quote}
          </blockquote>
        ))}
      </div>

      {/* Client */}
      <div className="text-center mt-8" style={{ minHeight: 24 }}>
        {TESTIMONIALS.map((t, i) => (
          <p
            key={i}
            aria-hidden={i !== index}
            className={`text-[13px] font-medium tracking-[0.16em] uppercase transition-opacity duration-500 ${
              i === index ? "opacity-100" : "opacity-0 absolute inset-x-0 pointer-events-none"
            }`}
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            &mdash; {t.name}, {t.neighborhood}
          </p>
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-8 mt-12">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous testimonial"
          className="w-11 h-11 flex items-center justify-center text-white hover:text-[#b8965a] transition-colors duration-300"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="20" y1="12" x2="4" y2="12" />
            <polyline points="10 6 4 12 10 18" />
          </svg>
        </button>

        {/* Dots */}
        <div className="flex items-center gap-3" aria-hidden="true">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                background: i === index ? "#b8965a" : "rgba(255,255,255,0.3)",
              }}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          aria-label="Next testimonial"
          className="w-11 h-11 flex items-center justify-center text-white hover:text-[#b8965a] transition-colors duration-300"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="4" y1="12" x2="20" y2="12" />
            <polyline points="14 6 20 12 14 18" />
          </svg>
        </button>
      </div>
    </div>
  );
}

"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

interface LightboxProps {
  images: string[];
  initialIndex?: number;
  projectName: string;
  neighborhood: string;
  onClose: () => void;
}

export default function Lightbox({
  images,
  initialIndex = 0,
  projectName,
  neighborhood,
  onClose,
}: LightboxProps) {
  const [index, setIndex] = useState(initialIndex);
  const [opacity, setOpacity] = useState(1);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const next = useCallback(() => {
    setOpacity(0);
    setTimeout(() => {
      setIndex((i) => (i + 1) % images.length);
      setOpacity(1);
    }, 200);
  }, [images.length]);

  const prev = useCallback(() => {
    setOpacity(0);
    setTimeout(() => {
      setIndex((i) => (i - 1 + images.length) % images.length);
      setOpacity(1);
    }, 200);
  }, [images.length]);

  // Keyboard handlers
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev, onClose]);

  // Body scroll lock
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  // Touch swipe handlers (mobile)
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX;
    if (delta < -50) next();
    else if (delta > 50) prev();
    setTouchStartX(null);
  };

  if (!images.length) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${projectName} — photo gallery`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(20,20,20,0.95)",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Close button (top-right) */}
      <button
        onClick={onClose}
        aria-label="Close gallery"
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          background: "transparent",
          border: "none",
          color: "#ffffff",
          fontSize: 28,
          fontFamily: "Inter, system-ui, sans-serif",
          fontWeight: 300,
          cursor: "pointer",
          width: 48,
          height: 48,
          lineHeight: 1,
          padding: 0,
        }}
      >
        ×
      </button>

      {/* Image counter (top-right, just under close) */}
      <div
        style={{
          position: "absolute",
          top: 24,
          right: 80,
          color: "rgba(255,255,255,0.6)",
          fontSize: 13,
          fontFamily: "Inter, system-ui, sans-serif",
          letterSpacing: "0.05em",
        }}
      >
        {index + 1} / {images.length}
      </div>

      {/* Left arrow */}
      <button
        onClick={prev}
        aria-label="Previous photo"
        style={{
          position: "absolute",
          left: 20,
          top: "50%",
          transform: "translateY(-50%)",
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.2)",
          color: "#ffffff",
          fontSize: 24,
          fontFamily: "Inter, system-ui, sans-serif",
          fontWeight: 300,
          cursor: "pointer",
          width: 56,
          height: 56,
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        ←
      </button>

      {/* Right arrow */}
      <button
        onClick={next}
        aria-label="Next photo"
        style={{
          position: "absolute",
          right: 20,
          top: "50%",
          transform: "translateY(-50%)",
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.2)",
          color: "#ffffff",
          fontSize: 24,
          fontFamily: "Inter, system-ui, sans-serif",
          fontWeight: 300,
          cursor: "pointer",
          width: 56,
          height: 56,
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        →
      </button>

      {/* Main image */}
      <div
        style={{
          position: "relative",
          maxWidth: "90vw",
          maxHeight: "90vh",
          width: "min(1400px, 90vw)",
          height: "min(90vh, 900px)",
          transition: "opacity 250ms ease",
          opacity,
        }}
      >
        <Image
          key={images[index]}
          src={images[index]}
          alt={`${projectName} photo ${index + 1} of ${images.length}`}
          fill
          sizes="90vw"
          quality={90}
          style={{ objectFit: "contain" }}
          priority
        />
      </div>

      {/* Caption (bottom-left) */}
      <div
        style={{
          position: "absolute",
          left: 32,
          bottom: 32,
          color: "#ffffff",
          maxWidth: "60vw",
        }}
      >
        <div
          style={{
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#b8965a",
            marginBottom: 4,
          }}
        >
          {neighborhood}
        </div>
        <div
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 22,
            fontWeight: 400,
            color: "#ffffff",
            lineHeight: 1.2,
          }}
        >
          {projectName}
        </div>
      </div>
    </div>
  );
}
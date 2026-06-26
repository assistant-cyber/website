"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { galleryPhotos } from "@/lib/imageManifest";

/**
 * Flat image gallery for the portfolio page.
 *
 * - Renders every photo from every project as a uniform grid (3 cols desktop, 2 tablet, 2 mobile)
 * - Click any photo → opens a lightbox with the full set, navigable with arrows / swipe / Esc
 * - Hover shows the project name as a subtle overlay
 * - No neighborhood filter, no project cards, no broken stand-ins — just the actual photos
 */
export default function GalleryGrid() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const close = useCallback(() => setLightboxIndex(null), []);

  const next = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % galleryPhotos.length));
  }, []);

  const prev = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + galleryPhotos.length) % galleryPhotos.length,
    );
  }, []);

  // Keyboard handlers
  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, close, next, prev]);

  // Body scroll lock
  useEffect(() => {
    if (lightboxIndex === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [lightboxIndex]);

  // Touch swipe
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null || lightboxIndex === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX;
    if (delta < -50) next();
    else if (delta > 50) prev();
    setTouchStartX(null);
  };

  if (galleryPhotos.length === 0) {
    return (
      <p
        className="text-center italic"
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 15,
          color: "var(--color-slate)",
          padding: "60px 0",
        }}
      >
        No photos in the portfolio yet.
      </p>
    );
  }

  return (
    <>
      <div
        className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
        style={{ marginTop: 8 }}
      >
        {galleryPhotos.map((photo, i) => {
          const fileName = photo.path.split("/").pop() || "";
          return (
            <button
              key={photo.path}
              type="button"
              onClick={() => setLightboxIndex(i)}
              aria-label={`Open ${photo.project} — ${fileName}`}
              className="group relative overflow-hidden"
              style={{
                position: "relative",
                aspectRatio: "4 / 3",
                background: "var(--color-cream, #f5f0e8)",
                border: "none",
                padding: 0,
                cursor: "pointer",
                borderRadius: 2,
              }}
            >
              <Image
                src={photo.path}
                alt={`${photo.project} — ${fileName}`}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                quality={75}
                loading={i < 6 ? "eager" : "lazy"}
                style={{
                  objectFit: "cover",
                  transition: "transform 400ms ease",
                }}
                className="group-hover:scale-[1.03]"
              />
              {/* Hover overlay with project name */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(20,20,20,0) 50%, rgba(20,20,20,0.75) 100%)",
                  pointerEvents: "none",
                }}
                aria-hidden="true"
              />
              <div
                className="absolute left-0 right-0 bottom-0 text-left opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  padding: "12px 14px",
                  color: "#ffffff",
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  fontWeight: 400,
                  letterSpacing: "0.04em",
                  pointerEvents: "none",
                }}
                aria-hidden="true"
              >
                {photo.project}
              </div>
            </button>
          );
        })}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo gallery"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
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
          {/* Close */}
          <button
            onClick={close}
            aria-label="Close gallery"
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              background: "transparent",
              border: "none",
              color: "#ffffff",
              fontSize: 32,
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

          {/* Counter */}
          <div
            style={{
              position: "absolute",
              top: 26,
              right: 80,
              color: "rgba(255,255,255,0.6)",
              fontSize: 13,
              fontFamily: "Inter, system-ui, sans-serif",
              letterSpacing: "0.05em",
            }}
          >
            {lightboxIndex + 1} / {galleryPhotos.length}
          </div>

          {/* Arrows */}
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
              fontSize: 26,
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
              fontSize: 26,
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

          {/* Image */}
          <div
            style={{
              position: "relative",
              maxWidth: "92vw",
              maxHeight: "85vh",
              width: "min(1500px, 92vw)",
              height: "min(85vh, 1000px)",
            }}
          >
            <Image
              key={galleryPhotos[lightboxIndex].path}
              src={galleryPhotos[lightboxIndex].path}
              alt={`${galleryPhotos[lightboxIndex].project} — photo ${lightboxIndex + 1} of ${galleryPhotos.length}`}
              fill
              sizes="92vw"
              quality={90}
              style={{ objectFit: "contain" }}
              priority
            />
          </div>

          {/* Caption */}
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
              {galleryPhotos[lightboxIndex].project}
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
              Synergistic Development · Portfolio
            </div>
          </div>
        </div>
      )}
    </>
  );
}
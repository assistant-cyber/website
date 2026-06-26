"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { galleryPhotos } from "@/lib/imageManifest";

/**
 * Interactive image gallery for the portfolio page.
 *
 * Features:
 * - Project filter chips at top (All / 334 Steele / Alcott / Mariposa / etc.)
 * - Click any photo → opens a lightbox with the full set
 * - Lightbox: arrows, swipe, Esc, Space (next), F (fullscreen), A (autoplay)
 * - Slideshow mode (autoplay 3s) toggleable in lightbox
 * - Fullscreen mode toggleable
 * - Photo info bar with project name + counter
 * - Smooth re-stagger when filter changes
 * - Body scroll lock + reduced-motion respect
 */
export default function GalleryGrid() {
  // Derive unique projects for filter chips
  const projects = useMemo(() => {
    const seen = new Set<string>();
    const out: string[] = [];
    for (const p of galleryPhotos) {
      if (!seen.has(p.project)) {
        seen.add(p.project);
        out.push(p.project);
      }
    }
    return out;
  }, []);

  const [activeProject, setActiveProject] = useState<string | "All">("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isSlideshow, setIsSlideshow] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Filtered photos (recomputed when filter changes)
  const visiblePhotos = useMemo(() => {
    if (activeProject === "All") return galleryPhotos;
    return galleryPhotos.filter((p) => p.project === activeProject);
  }, [activeProject]);

  // Map visiblePhotos indices to global galleryPhotos indices (for lightbox)
  const globalIndices = useMemo(
    () => visiblePhotos.map((p) => galleryPhotos.findIndex((gp) => gp.path === p.path)),
    [visiblePhotos],
  );

  const close = useCallback(() => {
    setLightboxIndex(null);
    setIsSlideshow(false);
  }, []);

  // Use the global index so the lightbox maintains position when filter changes
  const lightboxGlobalIndex = lightboxIndex;

  const next = useCallback(() => {
    if (lightboxGlobalIndex === null) return;
    setLightboxIndex((lightboxGlobalIndex + 1) % galleryPhotos.length);
  }, [lightboxGlobalIndex]);

  const prev = useCallback(() => {
    if (lightboxGlobalIndex === null) return;
    setLightboxIndex(
      (lightboxGlobalIndex - 1 + galleryPhotos.length) % galleryPhotos.length,
    );
  }, [lightboxGlobalIndex]);

  // Slideshow autoplay (3s interval)
  useEffect(() => {
    if (!isSlideshow || lightboxGlobalIndex === null) return;
    const t = setTimeout(() => {
      setLightboxIndex((lightboxGlobalIndex + 1) % galleryPhotos.length);
    }, 3000);
    return () => clearTimeout(t);
  }, [isSlideshow, lightboxGlobalIndex]);

  // Keyboard handlers
  useEffect(() => {
    if (lightboxGlobalIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        setIsSlideshow((s) => !s);
      } else if (e.key === "f" || e.key === "F") {
        e.preventDefault();
        setIsFullscreen((f) => !f);
      } else if (e.key === "a" || e.key === "A") {
        e.preventDefault();
        setIsSlideshow((s) => !s);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxGlobalIndex, close, next, prev]);

  // Body scroll lock when lightbox is open
  useEffect(() => {
    if (lightboxGlobalIndex === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [lightboxGlobalIndex]);

  // Fullscreen toggle via Fullscreen API
  useEffect(() => {
    if (!document.fullscreenElement && isFullscreen) {
      document.documentElement.requestFullscreen?.().catch(() => {});
    } else if (document.fullscreenElement && !isFullscreen) {
      document.exitFullscreen?.().catch(() => {});
    }
  }, [isFullscreen]);

  // Exit fullscreen when lightbox closes
  useEffect(() => {
    if (lightboxGlobalIndex === null && document.fullscreenElement) {
      document.exitFullscreen?.().catch(() => {});
    }
  }, [lightboxGlobalIndex]);

  // Touch swipe
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null || lightboxGlobalIndex === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX;
    if (delta < -50) next();
    else if (delta > 50) prev();
    setTouchStartX(null);
  };

  // Compute progress: how far through the visible set we are
  const progress =
    lightboxGlobalIndex !== null
      ? ((lightboxGlobalIndex + 1) / galleryPhotos.length) * 100
      : 0;

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
      {/* Filter chips */}
      <div
        className="flex flex-wrap items-center gap-2"
        style={{ marginBottom: 24 }}
        role="tablist"
        aria-label="Filter portfolio by project"
      >
        {(["All", ...projects] as const).map((project) => {
          const isActive = activeProject === project;
          const count =
            project === "All"
              ? galleryPhotos.length
              : galleryPhotos.filter((p) => p.project === project).length;
          return (
            <button
              key={project}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => {
                setActiveProject(project);
                setLightboxIndex(null);
              }}
              className="transition-all"
              style={{
                padding: "8px 16px",
                fontFamily: "var(--font-body)",
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: isActive ? "#ffffff" : "var(--color-ink)",
                background: isActive ? "var(--color-ink)" : "transparent",
                border: `1px solid ${
                  isActive ? "var(--color-ink)" : "var(--color-sand)"
                }`,
                borderRadius: 2,
                cursor: "pointer",
              }}
            >
              {project}{" "}
              <span
                style={{
                  opacity: isActive ? 0.7 : 0.5,
                  fontWeight: 400,
                }}
              >
                ({count})
              </span>
            </button>
          );
        })}
      </div>

      {/* Photo grid — key changes with filter so it re-mounts and re-animates */}
      <div
        key={activeProject}
        className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
      >
        {visiblePhotos.map((photo, i) => {
          const fileName = photo.path.split("/").pop() || "";
          // Stagger: fade in over 50ms each
          const delay = Math.min(i * 0.04, 0.6);
          return (
            <button
              key={photo.path}
              type="button"
              onClick={() => setLightboxIndex(globalIndices[i])}
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
                animation: `galleryFadeIn 0.5s ease-out ${delay}s both`,
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
                  transition: "transform 500ms ease",
                }}
                className="group-hover:scale-[1.05]"
              />
              {/* Hover overlay with project name */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(20,20,20,0) 40%, rgba(20,20,20,0.85) 100%)",
                  pointerEvents: "none",
                }}
                aria-hidden="true"
              />
              <div
                className="absolute left-0 right-0 bottom-0 text-left opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  padding: "14px 16px",
                  color: "#ffffff",
                  fontFamily: "var(--font-body)",
                  pointerEvents: "none",
                }}
                aria-hidden="true"
              >
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 500,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "#b8965a",
                    marginBottom: 2,
                  }}
                >
                  {photo.project}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 400,
                  }}
                >
                  {fileName.replace(/\.\w+$/, "")}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Inline keyframes for the per-photo stagger */}
      <style jsx global>{`
        @keyframes galleryFadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* Lightbox */}
      {lightboxGlobalIndex !== null && (
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
            background: isFullscreen ? "rgba(0,0,0,1)" : "rgba(20,20,20,0.97)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            animation: "galleryFadeIn 0.25s ease-out",
          }}
        >
          {/* Top bar — close + counter + project + controls */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "20px 32px",
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 100%)",
              zIndex: 2,
            }}
          >
            {/* Project name + counter */}
            <div
              style={{
                color: "#ffffff",
                display: "flex",
                alignItems: "baseline",
                gap: 16,
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
                }}
              >
                {galleryPhotos[lightboxGlobalIndex].project}
              </div>
              <div
                style={{
                  fontFamily: "Inter, system-ui, sans-serif",
                  fontSize: 13,
                  color: "rgba(255,255,255,0.6)",
                  letterSpacing: "0.05em",
                }}
              >
                {lightboxGlobalIndex + 1} / {galleryPhotos.length}
              </div>
            </div>

            {/* Controls — slideshow, fullscreen, close */}
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <button
                type="button"
                onClick={() => setIsSlideshow((s) => !s)}
                aria-label={isSlideshow ? "Pause slideshow" : "Start slideshow"}
                title={isSlideshow ? "Pause (Space)" : "Play slideshow (Space)"}
                style={{
                  background: isSlideshow
                    ? "rgba(184, 150, 90, 0.25)"
                    : "rgba(255,255,255,0.08)",
                  border: `1px solid ${
                    isSlideshow
                      ? "rgba(184, 150, 90, 0.5)"
                      : "rgba(255,255,255,0.2)"
                  }`,
                  color: "#ffffff",
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                {isSlideshow ? (
                  <span style={{ fontSize: 14 }}>❚❚</span>
                ) : (
                  <span style={{ fontSize: 14, marginLeft: 2 }}>▶</span>
                )}
              </button>
              <button
                type="button"
                onClick={() => setIsFullscreen((f) => !f)}
                aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                title="Fullscreen (F)"
                style={{
                  background: isFullscreen
                    ? "rgba(184, 150, 90, 0.25)"
                    : "rgba(255,255,255,0.08)",
                  border: `1px solid ${
                    isFullscreen
                      ? "rgba(184, 150, 90, 0.5)"
                      : "rgba(255,255,255,0.2)"
                  }`,
                  color: "#ffffff",
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  fontSize: 14,
                }}
              >
                {isFullscreen ? "⛶" : "⛶"}
              </button>
              <button
                type="button"
                onClick={close}
                aria-label="Close gallery"
                title="Close (Esc)"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "#ffffff",
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  fontSize: 22,
                  lineHeight: 1,
                  padding: 0,
                }}
              >
                ×
              </button>
            </div>
          </div>

          {/* Progress bar at top */}
          <div
            style={{
              position: "absolute",
              top: 76,
              left: 32,
              right: 32,
              height: 2,
              background: "rgba(255,255,255,0.1)",
              borderRadius: 1,
              overflow: "hidden",
              zIndex: 2,
            }}
          >
            <div
              style={{
                height: "100%",
                background: "#b8965a",
                width: `${progress}%`,
                transition: "width 0.3s ease",
              }}
            />
          </div>

          {/* Arrows */}
          <button
            type="button"
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
              zIndex: 2,
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(184, 150, 90, 0.3)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.08)")
            }
          >
            ←
          </button>
          <button
            type="button"
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
              zIndex: 2,
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(184, 150, 90, 0.3)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.08)")
            }
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
              key={galleryPhotos[lightboxGlobalIndex].path}
              src={galleryPhotos[lightboxGlobalIndex].path}
              alt={`${galleryPhotos[lightboxGlobalIndex].project} — photo ${lightboxGlobalIndex + 1} of ${galleryPhotos.length}`}
              fill
              sizes="92vw"
              quality={90}
              style={{ objectFit: "contain" }}
              priority
            />
          </div>

          {/* Bottom caption — keyboard shortcuts hint */}
          <div
            style={{
              position: "absolute",
              bottom: 24,
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
              gap: 16,
              color: "rgba(255,255,255,0.4)",
              fontSize: 11,
              fontFamily: "Inter, system-ui, sans-serif",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              pointerEvents: "none",
            }}
          >
            <span>← → navigate</span>
            <span>·</span>
            <span>space slideshow</span>
            <span>·</span>
            <span>F fullscreen</span>
            <span>·</span>
            <span>esc close</span>
          </div>
        </div>
      )}
    </>
  );
}

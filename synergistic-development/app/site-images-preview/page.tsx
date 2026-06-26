/**
 * INTERNAL PREVIEW PAGE — Site-wide images for client (Shane) review.
 * Not linked from main nav or footer. Remove from production before launch.
 */

import type { Metadata } from "next";
import Image from "next/image";
import { siteImages, siteImageMap } from "@/lib/siteImageManifest";

export const metadata: Metadata = {
  title: "Site Images Review (Internal) | Synergistic Development",
  description: "Internal review page for site-wide image approval.",
  robots: { index: false, follow: false },
};

interface ReviewBlock {
  pageLabel: string;
  locationNote: string;
  imagePath: string;
  fallback: boolean; // true if using a placeholder (still in /projects/ path)
}

const blocks: ReviewBlock[] = [
  {
    pageLabel: "Home — Hero Background",
    locationNote:
      "Full-screen background on the home page hero. (Note: home page hero is in app/page.tsx, currently still using /projects/982-penn/hero/exterior-01 — see report.)",
    imagePath: siteImageMap["home.hero"],
    fallback: false,
  },
  {
    pageLabel: "Services — Hero Background",
    locationNote:
      "Full-screen background on the Services page hero.",
    imagePath: siteImageMap["services.hero"],
    fallback: false,
  },
  {
    pageLabel: "Services — Custom Homes Image",
    locationNote:
      "Sticky right-column image in the Custom Homes section.",
    imagePath: siteImageMap["services.customHomes"],
    fallback: false,
  },
  {
    pageLabel: "Services — Renovations Image",
    locationNote:
      "Sticky left-column image in the Renovations section.",
    imagePath: siteImageMap["services.renovations"],
    fallback: false,
  },
  {
    pageLabel: "Process — Hero Background",
    locationNote: "Full-screen background on the Process page hero.",
    imagePath: siteImageMap["process.hero"],
    fallback: false,
  },
  {
    pageLabel: "Contact — Hero Background",
    locationNote: "Full-screen background on the Contact page hero.",
    imagePath: siteImageMap["contact.hero"],
    fallback: false,
  },
  {
    pageLabel: "About — Hero Background",
    locationNote: "Full-screen background on the About page hero.",
    imagePath: siteImageMap["about.hero"],
    fallback: false,
  },
  {
    pageLabel: "About — Lifestyle / Brand Section",
    locationNote:
      "Available lifestyle interior for the brand or quote section on the About page. Not currently wired in but ready.",
    imagePath: siteImageMap["about.lifestyle"],
    fallback: false,
  },
  {
    pageLabel: "About — Shane Fable Portrait",
    locationNote:
      "PRIORITY — Professional headshot of Shane Fable, Founder. Required before the About page can go live.",
    imagePath: "/projects/982-penn/hero/master_bed-01-982-s-pennsylvania-st-denver-large-021-29-2nd-floor-master-bedroom-1500x1000-72dpi.jpg",
    fallback: true,
  },
];

export default function SiteImagesPreviewPage() {
  const totalImages =
    Object.values(siteImages).reduce((s, arr) => s + arr.length, 0);

  const assignedCount = blocks.filter((b) => !b.fallback).length;
  const placeholderCount = blocks.filter((b) => b.fallback).length;
  const unassigned = totalImages - assignedCount;

  // Collect any images not used in any review block
  const usedPaths = new Set(blocks.map((b) => b.imagePath));
  const unassignedList: string[] = [];
  for (const folder of Object.keys(siteImages)) {
    for (const p of siteImages[folder as keyof typeof siteImages]) {
      if (!usedPaths.has(p)) unassignedList.push(p);
    }
  }

  return (
    <div style={{ background: "#1a1a1a", minHeight: "100vh", color: "#ffffff" }}>
      {/* Top banner */}
      <div style={{ background: "#1a1a1a", padding: "16px 32px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <div
          style={{
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#b8965a",
          }}
        >
          Internal Preview — Site-Wide Images
        </div>
        <div
          style={{
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: 14,
            color: "rgba(255,255,255,0.6)",
            marginTop: 4,
          }}
        >
          For client review only. Not visible on the public website. Review
          each image and confirm it is appropriate for the assigned location.
        </div>
      </div>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ padding: "48px 0 24px" }}>
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
            Photo Review · Step 7
          </div>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 40,
              fontWeight: 400,
              color: "#ffffff",
              margin: "12px 0 8px",
              lineHeight: 1.1,
            }}
          >
            Site-Wide Images
          </h1>
          <p
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: 14,
              color: "rgba(255,255,255,0.6)",
              margin: 0,
            }}
          >
            Every image used on the non-portfolio pages (Home, Services,
            Process, Contact, About) is shown here for review.
          </p>
        </div>

        {/* Review blocks */}
        {blocks.map((block) => {
          const isShane = block.pageLabel.includes("Shane");
          return (
            <section
              key={block.pageLabel}
              style={{
                padding: "32px 0",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div
                style={{
                  fontFamily: "Inter, system-ui, sans-serif",
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: isShane ? "#fcd34d" : "#b8965a",
                  marginBottom: 8,
                }}
              >
                {block.pageLabel}
              </div>
              <div
                style={{
                  fontFamily: "Inter, system-ui, sans-serif",
                  fontSize: 13,
                  color: "rgba(255,255,255,0.6)",
                  marginBottom: 16,
                }}
              >
                {block.locationNote}
              </div>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  maxHeight: 400,
                  aspectRatio: "16 / 9",
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: 2,
                  overflow: "hidden",
                  border: isShane
                    ? "2px solid #fcd34d"
                    : "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <Image
                  src={block.imagePath}
                  alt={block.pageLabel}
                  fill
                  sizes="(max-width: 768px) 100vw, 1400px"
                  quality={75}
                  style={{ objectFit: "cover" }}
                />
                {isShane && (
                  <div
                    style={{
                      position: "absolute",
                      top: 12,
                      left: 12,
                      background: "#fcd34d",
                      color: "#1a1a1a",
                      fontFamily: "Inter, system-ui, sans-serif",
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      padding: "4px 10px",
                      borderRadius: 2,
                    }}
                  >
                    PRIORITY — STILL NEEDED
                  </div>
                )}
              </div>
              <div
                style={{
                  fontFamily: "ui-monospace, monospace",
                  fontSize: 12,
                  color: "rgba(255,255,255,0.4)",
                  marginTop: 8,
                }}
              >
                {block.imagePath}
              </div>
              <div style={{ marginTop: 8 }}>
                <span
                  style={{
                    display: "inline-block",
                    padding: "4px 10px",
                    borderRadius: 2,
                    fontFamily: "Inter, system-ui, sans-serif",
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    background: block.fallback
                      ? "rgba(245,158,11,0.15)"
                      : "rgba(34,197,94,0.15)",
                    color: block.fallback ? "#fcd34d" : "#86efac",
                    border: block.fallback
                      ? "1px solid rgba(245,158,11,0.4)"
                      : "1px solid rgba(34,197,94,0.4)",
                  }}
                >
                  {block.fallback
                    ? "⚠ Using placeholder (bedroom photo)"
                    : "✓ Image loaded"}
                </span>
              </div>
            </section>
          );
        })}

        {/* Unassigned images */}
        {unassignedList.length > 0 && (
          <section style={{ padding: "32px 0" }}>
            <div
              style={{
                fontFamily: "Inter, system-ui, sans-serif",
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#b8965a",
                marginBottom: 16,
              }}
            >
              Unassigned — Available for future use
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: 8,
              }}
            >
              {unassignedList.map((p) => (
                <div
                  key={p}
                  style={{
                    position: "relative",
                    aspectRatio: "4 / 3",
                    background: "rgba(255,255,255,0.05)",
                    borderRadius: 2,
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={p}
                    alt={p.split("/").pop() || ""}
                    fill
                    sizes="200px"
                    quality={70}
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Footer summary */}
        <div
          style={{
            textAlign: "center",
            padding: "48px 32px",
            color: "rgba(255,255,255,0.5)",
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: 14,
          }}
        >
          <div>
            Total site images imported:{" "}
            <strong style={{ color: "#ffffff" }}>{totalImages}</strong>
          </div>
          <div style={{ marginTop: 4 }}>
            Images assigned to pages:{" "}
            <strong style={{ color: "#ffffff" }}>{assignedCount}</strong>
          </div>
          <div style={{ marginTop: 4 }}>
            Unassigned images available:{" "}
            <strong style={{ color: "#ffffff" }}>{unassignedList.length}</strong>
          </div>
          {placeholderCount > 0 && (
            <div style={{ marginTop: 16, color: "#fcd34d" }}>
              ⚠ PRIORITY: Shane Fable professional photo still needed.
              <br />
              This is required before the About page can go live.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
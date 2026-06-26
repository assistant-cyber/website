/**
 * INTERNAL PREVIEW PAGE — Not linked from main nav or footer.
 * This page shows every project photo for client (Shane) review
 * before the public site launches. Remove from production before launch.
 */

import type { Metadata } from "next";
import Image from "next/image";
import { PORTFOLIO } from "@/lib/constants";
import { imageManifest, projectImageMap } from "@/lib/imageManifest";

export const metadata: Metadata = {
  title: "Portfolio Photo Review (Internal) | Synergistic Development",
  description: "Internal review page for client photo approval.",
  robots: { index: false, follow: false },
};

const NEIGHBORHOOD_LABELS: Record<string, string> = {
  "cherry-creek": "Cherry Creek & Cherry Hills Village",
  "washington-park": "Washington Park",
  "highlands": "Highlands",
  "bow-mar": "Bow Mar",
  "lakewood-cc": "Lakewood Country Club",
  "other": "Other",
};

export default function PortfolioPreviewPage() {
  const totalProjects = PORTFOLIO.projects.length;
  const totalPhotos = PORTFOLIO.projects.reduce(
    (sum, p) => sum + (p.images?.length || 0),
    0,
  );
  const awaiting = PORTFOLIO.projects.filter(
    (p) => (p as { photoStatus?: string }).photoStatus === "awaiting-photos",
  );

  return (
    <div style={{ background: "#1a1a1a", minHeight: "100vh", color: "#ffffff" }}>
      {/* Top banner */}
      <div style={{ background: "#b8965a", padding: "16px 32px" }}>
        <div
          style={{
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#ffffff",
          }}
        >
          Internal Preview — Synergistic Development Portfolio Photos
        </div>
        <div
          style={{
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: 13,
            color: "rgba(255,255,255,0.7)",
            marginTop: 4,
          }}
        >
          For client review only. Not linked from the public website. Share
          this URL with Shane to review and approve all project photos.
        </div>
      </div>

      {/* Page body */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 32px" }}>
        {/* Heading */}
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
            Portfolio Photos
          </h1>
          <p
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: 14,
              color: "rgba(255,255,255,0.6)",
              margin: 0,
            }}
          >
            First image of each project is the lead (shown on the public
            portfolio page). Hover any photo to see the filename.
          </p>
        </div>

        {/* Project sections */}
        {PORTFOLIO.projects.map((project, idx) => {
          const nbLabel =
            NEIGHBORHOOD_LABELS[project.neighborhood] || project.neighborhood;
          const photoStatus = (project as { photoStatus?: string })
            .photoStatus;
          const leadFile = project.imageSrc.split("/").pop();
          const isLast = idx === PORTFOLIO.projects.length - 1;

          return (
            <section
              key={project.id}
              style={{
                padding: "48px 0 20px",
                borderBottom: isLast
                  ? "none"
                  : "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {/* Project header */}
              <div style={{ marginBottom: 24 }}>
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
                  {nbLabel}
                </div>
                <h2
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: 32,
                    fontWeight: 400,
                    color: "#ffffff",
                    margin: "8px 0 12px",
                    lineHeight: 1.1,
                  }}
                >
                  {project.name}
                </h2>

                {/* Status badge */}
                <div
                  style={{
                    display: "inline-block",
                    padding: "4px 10px",
                    borderRadius: 2,
                    fontFamily: "Inter, system-ui, sans-serif",
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    background:
                      photoStatus === "complete"
                        ? "rgba(34,197,94,0.15)"
                        : "rgba(245,158,11,0.15)",
                    color:
                      photoStatus === "complete" ? "#86efac" : "#fcd34d",
                    border:
                      photoStatus === "complete"
                        ? "1px solid rgba(34,197,94,0.4)"
                        : "1px solid rgba(245,158,11,0.4)",
                  }}
                >
                  {photoStatus === "complete"
                    ? "✓ Photos loaded"
                    : "⚠ Awaiting photos from Shane"}
                </div>

                {/* Lead image indicator */}
                <div
                  style={{
                    fontFamily: "Inter, system-ui, sans-serif",
                    fontSize: 13,
                    color: "rgba(255,255,255,0.5)",
                    marginTop: 12,
                  }}
                >
                  Lead image (shown on portfolio page card):{" "}
                  <code
                    style={{
                      fontFamily: "ui-monospace, monospace",
                      background: "rgba(255,255,255,0.06)",
                      padding: "2px 6px",
                      borderRadius: 2,
                      color: "rgba(255,255,255,0.85)",
                    }}
                  >
                    {leadFile}
                  </code>
                </div>
              </div>

              {/* Photo grid */}
              {project.images && project.images.length > 0 ? (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: 8,
                  }}
                >
                  {project.images.map((imgSrc, photoIdx) => {
                    const fileName = imgSrc.split("/").pop();
                    const isLead = photoIdx === 0;
                    return (
                      <div
                        key={imgSrc}
                        title={fileName}
                        style={{
                          position: "relative",
                          aspectRatio: "4 / 3",
                          background: "rgba(255,255,255,0.05)",
                          borderRadius: 2,
                          overflow: "hidden",
                          border: isLead
                            ? "2px solid #b8965a"
                            : "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                        <Image
                          src={imgSrc}
                          alt={`${project.name} photo ${photoIdx + 1}`}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          quality={70}
                          style={{ objectFit: "cover" }}
                        />
                        {isLead && (
                          <div
                            style={{
                              position: "absolute",
                              top: 8,
                              left: 8,
                              background: "#b8965a",
                              color: "#ffffff",
                              fontFamily: "Inter, system-ui, sans-serif",
                              fontSize: 10,
                              fontWeight: 500,
                              letterSpacing: "0.1em",
                              padding: "3px 8px",
                              borderRadius: 2,
                            }}
                          >
                            LEAD
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div
                  style={{
                    padding: 24,
                    background: "rgba(255,255,255,0.04)",
                    border: "1px dashed rgba(255,255,255,0.2)",
                    borderRadius: 4,
                    color: "rgba(255,255,255,0.5)",
                    fontFamily: "Inter, system-ui, sans-serif",
                    fontSize: 14,
                    textAlign: "center",
                  }}
                >
                  No photos imported yet. Awaiting delivery from Shane.
                </div>
              )}
            </section>
          );
        })}

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
            Total projects: <strong style={{ color: "#ffffff" }}>{totalProjects}</strong>
          </div>
          <div style={{ marginTop: 4 }}>
            Total photos loaded:{" "}
            <strong style={{ color: "#ffffff" }}>{totalPhotos}</strong>
          </div>
          {awaiting.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <div style={{ marginBottom: 6, color: "#fcd34d" }}>
                Photos still needed:
              </div>
              <div>
                {awaiting.map((p) => p.name).join(" · ")}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
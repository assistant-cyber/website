import { useState } from "react";
import Image from "next/image";
import { WARM_CREAM_BLUR } from "@/lib/blur";
import type { PortfolioProject, ProjectSize } from "@/lib/constants";
import Lightbox from "./Lightbox";

type ProjectCardProps = {
  project: PortfolioProject;
  size: ProjectSize;
  /** Mark the first row of cards (above the fold) for eager loading. */
  priority?: boolean;
};

/**
 * Build the right sizes prop for an image based on its grid span.
 */
function sizesForSize(size: ProjectSize): string {
  switch (size) {
    case "feature":
      return "100vw";
    case "large":
      return "(max-width: 768px) 100vw, 58vw";
    case "standard":
      return "(max-width: 768px) 100vw, 42vw";
  }
}

/**
 * Build the right aspect ratio for a card based on its grid size.
 */
function aspectForSize(size: ProjectSize): string {
  switch (size) {
    case "feature":
      return "16 / 7";
    case "large":
    case "standard":
      return "4 / 3";
  }
}

const NEIGHBORHOOD_LABELS: Record<string, string> = {
  "cherry-creek": "Cherry Creek & Cherry Hills Village",
  "washington-park": "Washington Park",
  "highlands": "Highlands",
  "bow-mar": "Bow Mar",
  "lakewood-cc": "Lakewood Country Club",
  "other": "Other",
};

export default function ProjectCard({
  project,
  size,
  priority = false,
}: ProjectCardProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const hasGallery =
    Array.isArray(project.images) && project.images.length > 0;

  const handleClick = () => {
    if (hasGallery) setLightboxOpen(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (hasGallery) setLightboxOpen(true);
    }
  };

  return (
    <>
      <div
        className="project-card"
        data-neighborhood={project.neighborhood}
        data-size={size}
        aria-label={`${project.name} — ${project.type} in ${project.location}`}
        onClick={hasGallery ? handleClick : undefined}
        onKeyDown={hasGallery ? handleKeyDown : undefined}
        role={hasGallery ? "button" : undefined}
        tabIndex={hasGallery ? 0 : undefined}
        style={{
          cursor: hasGallery ? "pointer" : "default",
        }}
      >
        <div className="project-image-wrap relative w-full h-full">
          <Image
            src={project.imageSrc}
            alt={project.imageAlt}
            fill
            sizes={sizesForSize(size)}
            quality={size === "feature" ? 85 : 80}
            placeholder="blur"
            blurDataURL={WARM_CREAM_BLUR}
            style={{ objectFit: "cover", aspectRatio: aspectForSize(size) }}
            {...(priority
              ? { priority: true, loading: "eager" as const }
              : { loading: "lazy" as const })}
          />
        </div>

        <div className="project-overlay" aria-hidden="true" />

        <div className="project-label">
          <span
            className="block uppercase"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: "0.18em",
              color: "#ffffff",
            }}
          >
            {project.location}
          </span>
          <p
            className="mt-1"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 15,
              fontWeight: 400,
              color: "#ffffff",
              lineHeight: 1.3,
            }}
          >
            {project.name}
          </p>
          <p
            className="mt-0.5"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 13,
              fontWeight: 400,
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.3,
            }}
          >
            {project.type}
          </p>
        </div>
      </div>

      {lightboxOpen && hasGallery && (
        <Lightbox
          images={project.images!}
          projectName={project.name}
          neighborhood={
            NEIGHBORHOOD_LABELS[project.neighborhood] || project.location
          }
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
}

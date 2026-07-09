import type { ReactNode } from "react";

type SectionEyebrowProps = {
  children: ReactNode;
  /** When on a dark background (e.g. ink), keep bronze; otherwise default bronze. */
  onDark?: boolean;
  /** When on a hero with a photographic background, use white + text shadow for legibility. */
  hero?: boolean;
  className?: string;
};

/**
 * Bronze eyebrow label — uppercase, Inter 500/600, letter-spacing 0.16em.
 * Used consistently across every section header.
 *
 * Set `hero` to render in white with a subtle text shadow for legibility
 * against busy photographic hero backgrounds.
 */
export default function SectionEyebrow({
  children,
  hero = false,
  className = "",
}: SectionEyebrowProps) {
  const heroStyle: React.CSSProperties | undefined = hero
    ? {
        color: "#ffffff",
        textShadow:
          "0 1px 2px rgba(0,0,0,0.6), 0 0 12px rgba(0,0,0,0.35)",
      }
    : undefined;

  return (
    <span
      className={`eyebrow block ${className}`}
      aria-hidden={false}
      style={heroStyle}
    >
      {children}
    </span>
  );
}

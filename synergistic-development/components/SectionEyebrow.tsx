import type { ReactNode } from "react";

type SectionEyebrowProps = {
  children: ReactNode;
  /** When on a dark background (e.g. ink), keep bronze; otherwise default bronze. */
  onDark?: boolean;
  className?: string;
};

/**
 * Bronze eyebrow label — uppercase, Inter 500, 11px, letter-spacing 0.18em.
 * Used consistently across every section header.
 */
export default function SectionEyebrow({
  children,
  className = "",
}: SectionEyebrowProps) {
  return (
    <span
      className={`eyebrow block ${className}`}
      aria-hidden={false}
    >
      {children}
    </span>
  );
}

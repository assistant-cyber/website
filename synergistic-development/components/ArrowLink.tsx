import Link from "next/link";

type ArrowLinkProps = {
  href: string;
  children: React.ReactNode;
  /** Bronze variant — used on dark sections for "See The Full Process →". */
  bronze?: boolean;
  /** Mode for light backgrounds (white) vs dark (white text). */
  mode?: "dark" | "light";
  className?: string;
};

/**
 * Inline text arrow link — "Learn More →"
 * Used inside service cards, process section, etc.
 */
export default function ArrowLink({
  href,
  children,
  bronze = false,
  mode = "dark",
  className = "",
}: ArrowLinkProps) {
  const color = bronze
    ? "text-[#b8965a] hover:text-[#8a6e38]"
    : mode === "light"
      ? "text-white hover:text-[#b8965a]"
      : "text-[#1a1a1a] hover:text-[#b8965a]";

  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 font-medium uppercase tracking-[0.12em] text-[12px] transition-colors duration-300 ease-out ${color} ${className}`}
    >
      <span>{children}</span>
      <span aria-hidden="true">→</span>
    </Link>
  );
}

type ServiceListItemProps = {
  children: React.ReactNode;
  /** Visual size variant — page-level lists are larger; card-internal lists are smaller. */
  size?: "default" | "small";
  /** Color treatment — light (default for cream/white sections) or dark (for dark sections). */
  tone?: "light" | "dark";
  className?: string;
};

/**
 * Editorial list item with a thin bronze em-dash prefix.
 * Used across the Services page and reusable on other detail pages.
 */
export default function ServiceListItem({
  children,
  size = "default",
  tone = "light",
  className = "",
}: ServiceListItemProps) {
  const color =
    tone === "dark" ? "rgba(255,255,255,0.85)" : "var(--color-ash)";
  const subColor = tone === "dark" ? "rgba(255,255,255,0.55)" : "var(--color-slate)";

  const styles =
    size === "small"
      ? { fontSize: 13, lineHeight: 2.0, color: subColor }
      : { fontSize: 15, lineHeight: 2.2, color };

  return (
    <li
      className={`flex items-baseline gap-3 ${className}`}
      style={{
        fontFamily: "var(--font-body)",
        ...styles,
      }}
    >
      <span aria-hidden="true" style={{ color: "var(--color-bronze)" }}>
        —
      </span>
      <span>{children}</span>
    </li>
  );
}

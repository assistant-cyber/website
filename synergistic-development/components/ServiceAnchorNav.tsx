type AnchorItem = {
  number: string;
  label: string;
  href: string;
};

type ServiceAnchorNavProps = {
  items: ReadonlyArray<AnchorItem> | AnchorItem[];
};

/**
 * Section 2 anchor-link bar. Three items in a row on desktop,
 * horizontally scrollable on mobile. Bronze underline on hover.
 * Pure CSS hover so this stays a Server Component.
 */
export default function ServiceAnchorNav({ items }: ServiceAnchorNavProps) {
  return (
    <nav
      aria-label="Service sections"
      className="border-b border-[#e0d8cc]"
    >
      <ul
        className="flex items-center justify-center gap-10 lg:gap-16 overflow-x-auto whitespace-nowrap"
        style={{
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {items.map((item) => (
          <li key={item.href} className="shrink-0">
            <a href={item.href} className="anchor-link">
              <span
                className="font-display"
                style={{
                  fontWeight: 400,
                  fontSize: 13,
                  color: "var(--color-slate)",
                }}
              >
                {item.number}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  fontWeight: 500,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                {item.label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

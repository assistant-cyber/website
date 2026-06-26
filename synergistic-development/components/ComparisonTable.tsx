type Row = {
  col1: string;
  col2: string;
};

type ComparisonTableProps = {
  col1Label: string;
  col2Label: string;
  rows: ReadonlyArray<Row> | Row[];
  /** Tone: light (cream/white bg) or dark (for dark sections). */
  tone?: "light" | "dark";
  className?: string;
};

/**
 * Two-column side-by-side comparison table. On mobile, the table
 * collapses to stacked pairs (each row becomes its own labeled card).
 */
export default function ComparisonTable({
  col1Label,
  col2Label,
  rows,
  tone = "dark",
  className = "",
}: ComparisonTableProps) {
  const isDark = tone === "dark";
  const headerColor = "var(--color-bronze)";
  const cellColor = isDark ? "rgba(255,255,255,0.85)" : "var(--color-ash)";
  const cellColorAlt = isDark ? "rgba(255,255,255,0.7)" : "var(--color-ash)";
  const altRowBg = isDark ? "rgba(255,255,255,0.03)" : "var(--color-linen)";
  const dividerColor = isDark ? "rgba(255,255,255,0.1)" : "var(--color-sand)";
  const containerBg = isDark ? "rgba(255,255,255,0.04)" : "var(--color-white)";
  const containerBorder = isDark
    ? "1px solid rgba(255,255,255,0.1)"
    : "1px solid var(--color-sand)";

  return (
    <div
      className={`rounded-[4px] ${className}`}
      style={{
        background: containerBg,
        border: containerBorder,
        padding: "36px 32px",
      }}
    >
      {/* Desktop: two-column grid; Mobile: stacked pairs */}
      <div className="hidden md:block">
        {/* Header */}
        <div
          className="grid grid-cols-2 gap-8 pb-5"
          style={{ borderBottom: `1px solid ${dividerColor}` }}
        >
          <div
            className="uppercase"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.16em",
              color: headerColor,
            }}
          >
            {col1Label}
          </div>
          <div
            className="uppercase"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.16em",
              color: headerColor,
            }}
          >
            {col2Label}
          </div>
        </div>

        {/* Rows */}
        <div>
          {rows.map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-2 gap-8"
              style={{
                paddingTop: 16,
                paddingBottom: 16,
                background: i % 2 === 1 ? altRowBg : "transparent",
                borderBottom:
                  i < rows.length - 1 ? `1px solid ${dividerColor}` : "none",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  lineHeight: 2.0,
                  color: cellColorAlt,
                }}
              >
                {row.col1}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  lineHeight: 2.0,
                  color: cellColor,
                }}
              >
                {row.col2}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: stacked pairs */}
      <div className="md:hidden flex flex-col gap-5">
        {rows.map((row, i) => (
          <div
            key={i}
            className="rounded-[4px] p-4"
            style={{
              background: altRowBg,
            }}
          >
            <div className="flex gap-4 mb-2">
              <span
                className="uppercase flex-1"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 10,
                  fontWeight: 500,
                  letterSpacing: "0.16em",
                  color: headerColor,
                }}
              >
                {col1Label}
              </span>
              <span
                className="uppercase flex-1"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 10,
                  fontWeight: 500,
                  letterSpacing: "0.16em",
                  color: headerColor,
                }}
              >
                {col2Label}
              </span>
            </div>
            <div className="flex gap-4">
              <div
                className="flex-1"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: cellColorAlt,
                }}
              >
                {row.col1}
              </div>
              <div
                className="flex-1"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: cellColor,
                }}
              >
                {row.col2}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

type CredentialBlockProps = {
  label: string;
  lines: ReadonlyArray<string> | string[];
  className?: string;
};

/**
 * Small editorial credential block — bronze uppercase label above
 * a stack of lines. Used in About (Shane bio) and reusable across
 * Services and Process pages.
 */
export default function CredentialBlock({
  label,
  lines,
  className = "",
}: CredentialBlockProps) {
  return (
    <div className={className}>
      <span
        className="block uppercase"
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: "0.16em",
          color: "var(--color-bronze)",
        }}
      >
        {label}
      </span>
      <p
        className="mt-3"
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 14,
          fontWeight: 400,
          lineHeight: 1.6,
          color: "var(--color-ash)",
        }}
      >
        {lines.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </p>
    </div>
  );
}

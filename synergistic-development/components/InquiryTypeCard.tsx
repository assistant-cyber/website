type InquiryTypeCardProps = {
  value: string;
  label: string;
  description: string;
  selected: boolean;
  /** Name shared by all cards in the radio group (e.g. "inquiryType"). */
  name: string;
  onSelect: (value: string) => void;
};

/**
 * Styled radio card — visually hidden native radio, whole card is the click target.
 * 2x2 grid on desktop, single column on mobile (parent controls layout).
 */
export default function InquiryTypeCard({
  value,
  label,
  description,
  selected,
  name,
  onSelect,
}: InquiryTypeCardProps) {
  return (
    <label
      className="inquiry-card"
      data-selected={selected}
      htmlFor={`inquiry-${value}`}
    >
      <input
        type="radio"
        id={`inquiry-${value}`}
        name={name}
        value={value}
        checked={selected}
        onChange={() => onSelect(value)}
      />
      <div className="inquiry-card-content">
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 13,
            fontWeight: 500,
            color: "var(--color-ink)",
            lineHeight: 1.4,
          }}
        >
          {label}
        </div>
        <div
          className="mt-1"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 12,
            fontWeight: 400,
            color: "var(--color-slate)",
            lineHeight: 1.4,
          }}
        >
          {description}
        </div>
      </div>
    </label>
  );
}

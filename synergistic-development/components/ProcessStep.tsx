import Link from "next/link";
import SectionEyebrow from "./SectionEyebrow";
import ServiceListItem from "./ServiceListItem";

type Background = "cream" | "white";

type ProcessStepProps = {
  number: string;
  eyebrow: string;
  /** Headline rendered as eyebrow word(s) + italicized word(s). */
  headlineTop: string;
  headlineEm: string;
  body: ReadonlyArray<string> | string[];
  inThisPhase: ReadonlyArray<string> | string[];
  background: Background;
  /** Optional italic closing note below the detail block. */
  closingNote?: string;
  /** Heading id so anchor links / aria-labelledby can target. */
  id?: string;
};

/**
 * Editorial step layout — enormous decorative number, headline,
 * body paragraphs on left, "In This Phase" detail block on right.
 * Collapses to single column on mobile.
 */
export default function ProcessStep({
  number,
  eyebrow,
  headlineTop,
  headlineEm,
  body,
  inThisPhase,
  background,
  closingNote,
  id,
}: ProcessStepProps) {
  const bg = background === "cream" ? "var(--color-cream)" : "var(--color-white)";

  return (
    <section
      id={id}
      style={{
        background: bg,
        paddingTop: "clamp(80px, 8vw, 120px)",
        paddingBottom: "clamp(80px, 8vw, 120px)",
      }}
    >
      <div
        style={{
          maxWidth: "var(--page-max)",
          margin: "0 auto",
          padding: "0 var(--page-padding)",
        }}
      >
        {/* Decorative number + eyebrow + headline */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-12 mb-12 lg:mb-16">
          <div
            className="font-display shrink-0"
            aria-hidden="true"
            style={{
              fontWeight: 300,
              fontSize: "clamp(80px, 14vw, 180px)",
              lineHeight: 1,
              color: "var(--color-sand)",
              letterSpacing: "-0.02em",
            }}
          >
            {number}
          </div>
          <div className="lg:pt-6">
            <SectionEyebrow>{eyebrow}</SectionEyebrow>
            <h2
              className="font-display mt-3"
              style={{
                fontWeight: 400,
                fontSize: "clamp(32px, 4vw, 48px)",
                lineHeight: 1.1,
                letterSpacing: "-0.015em",
                color: "var(--color-ink)",
                maxWidth: 640,
              }}
            >
              {headlineTop}{" "}
              <em className="italic font-normal">{headlineEm}</em>
            </h2>
          </div>
        </div>

        {/* Two-column content + detail block */}
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-[60px] items-start">
          {/* Body paragraphs */}
          <div
            style={{
              fontSize: 16,
              lineHeight: 1.8,
              color: "var(--color-ash)",
            }}
          >
            {body.map((p, i) => (
              <p key={i} className={i > 0 ? "mt-5" : ""}>
                {p}
              </p>
            ))}
          </div>

          {/* Detail block */}
          <div>
            <div
              className="rounded-[4px]"
              style={{
                background: "var(--color-white)",
                border: "1px solid var(--color-sand)",
                padding: "32px 28px",
              }}
            >
              <span
                className="block uppercase"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.18em",
                  color: "var(--color-bronze)",
                  marginBottom: 16,
                }}
              >
                In This Phase
              </span>
              <ul className="flex flex-col">
                {inThisPhase.map((item) => (
                  <ServiceListItem
                    key={item}
                    size="small"
                    className="!leading-[2.0]"
                  >
                    {item}
                  </ServiceListItem>
                ))}
              </ul>
            </div>

            {closingNote && (
              <p
                className="italic"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  lineHeight: 1.7,
                  color: "var(--color-slate)",
                  marginTop: 20,
                  maxWidth: 480,
                }}
              >
                &ldquo;{closingNote}&rdquo;
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   Step overview list — used in Section 2 right column
   ------------------------------------------------------------------ */
type OverviewStep = {
  number: string;
  name: string;
  description: string;
};

export function ProcessOverviewList({ steps }: { steps: ReadonlyArray<OverviewStep> | OverviewStep[] }) {
  return (
    <div
      className="rounded-[4px]"
      style={{
        background: "var(--color-cream)",
        padding: "48px 40px",
      }}
    >
      <ul className="flex flex-col">
        {steps.map((step, i) => (
          <li
            key={step.number}
            className={`flex items-baseline gap-5 ${i > 0 ? "mt-7 pt-7 border-t border-[#e0d8cc]" : ""}`}
          >
            <span
              className="font-display shrink-0"
              style={{
                fontWeight: 400,
                fontSize: 13,
                letterSpacing: "0.1em",
                color: "var(--color-bronze)",
                minWidth: 28,
              }}
            >
              {step.number}
            </span>
            <div className="flex-1">
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 15,
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--color-ink)",
                }}
              >
                {step.name}
              </p>
              <p
                className="mt-1"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  fontWeight: 400,
                  lineHeight: 1.6,
                  color: "var(--color-slate)",
                }}
              >
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

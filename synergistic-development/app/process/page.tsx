import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PROCESS_PAGE } from "@/lib/constants";
import { WARM_CREAM_BLUR } from "@/lib/blur";
import SectionEyebrow from "@/components/SectionEyebrow";
import Button from "@/components/Button";
import ProcessStep, { ProcessOverviewList } from "@/components/ProcessStep";
import ComparisonTable from "@/components/ComparisonTable";
import Animate from "@/components/Animate";
import { AnimateStagger, AnimateStaggerItem } from "@/components/AnimateStagger";

export const metadata: Metadata = {
  title:
    "The SD Experience | Synergistic Development · Our Process · Denver",
  description:
    "A proven process built on transparency, communication, and accountability. Learn how Synergistic Development guides homeowners from concept through completion across custom homes, renovations, and advisory services.",
};

/* ------------------------------------------------------------------
   Section wrapper — same rhythm as prior pages
   ------------------------------------------------------------------ */
function Section({
  children,
  bg,
  py = "var(--section-gap)",
  className = "",
}: {
  children: React.ReactNode;
  bg?: string;
  py?: string;
  className?: string;
}) {
  return (
    <section
      className={className}
      style={{
        background: bg,
        paddingTop: py,
        paddingBottom: py,
      }}
    >
      <div
        style={{
          maxWidth: "var(--page-max)",
          margin: "0 auto",
          padding: "0 var(--page-padding)",
        }}
      >
        {children}
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 1 — PAGE HERO (bottom-left aligned)
   ================================================================ */
function PageHero() {
  return (
    <section
      className="relative w-full"
      style={{ height: "min(55vh, 720px)", minHeight: 480, marginTop: "-72px" }}
      aria-label="Process hero"
    >
      <div className="absolute inset-0">
        <Image
          src={PROCESS_PAGE.hero.backgroundImage}
          alt={PROCESS_PAGE.hero.backgroundAlt}
          fill
          priority
          quality={85}
          sizes="100vw"
          placeholder="blur"
          blurDataURL={WARM_CREAM_BLUR}
          style={{ objectFit: "cover" }}
        />
        {/* TODO: Replace with atmospheric project photo — construction detail, planning meeting, or quality craftsmanship shot — Shane to provide */}
      </div>

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(20,20,20,0.2) 0%, rgba(20,20,20,0.65) 100%)",
        }}
        aria-hidden="true"
      />

      <div
        className="relative h-full flex flex-col justify-end text-white"
        style={{
          padding:
            "0 var(--page-padding) clamp(48px, 8vw, 80px) var(--page-padding)",
        }}
      >
        <div className="max-w-[640px]">
          <Animate variant="fadeUp" delay={0} duration={0.7}>
            <SectionEyebrow hero>
              {PROCESS_PAGE.hero.eyebrow}
            </SectionEyebrow>
          </Animate>
          <Animate variant="fadeUp" delay={0.15} duration={0.8}>
            <h1
              className="font-display"
              style={{
                fontWeight: 300,
                fontSize: "clamp(40px, 5vw, 72px)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                marginTop: 20,
                color: "#ffffff",
              }}
            >
              {PROCESS_PAGE.hero.headlineTop}
              <br />
              A <em className="italic font-normal">{PROCESS_PAGE.hero.headlineEm}</em>
            </h1>
          </Animate>
          <Animate variant="fadeUp" delay={0.3} duration={0.8}>
            <p
              style={{
                fontSize: "clamp(15px, 1.6vw, 18px)",
                fontWeight: 300,
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.85)",
                maxWidth: 520,
                marginTop: 16,
              }}
            >
              {PROCESS_PAGE.hero.subhead}
            </p>
          </Animate>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 2 — PROCESS INTRO (two columns)
   ================================================================ */
function ProcessIntro() {
  const intro = PROCESS_PAGE.intro;
  return (
    <Section bg="var(--color-white)">
      <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-12 lg:gap-20 items-start">
        {/* Left */}
        <Animate variant="fadeLeft">
          <div>
            <SectionEyebrow>{intro.eyebrow}</SectionEyebrow>
          <h2
            className="font-display"
            style={{
              fontWeight: 400,
              fontSize: "clamp(34px, 4vw, 52px)",
              lineHeight: 1.1,
              letterSpacing: "-0.015em",
              marginTop: 20,
              color: "var(--color-ink)",
            }}
          >
            {intro.headlineTop}
            <br />
            <em className="italic font-normal">{intro.headlineEm}</em>
          </h2>
          <div
            className="mt-6"
            style={{
              fontSize: 16,
              lineHeight: 1.8,
              color: "var(--color-ash)",
              maxWidth: 460,
            }}
          >
            <p>{intro.body1}</p>
            <p className="mt-5">{intro.body2}</p>
          </div>
          </div>
        </Animate>

        {/* Right — overview list */}
        <Animate variant="fadeRight" delay={0.1}>
        <ProcessOverviewList steps={intro.steps} />
        </Animate>
      </div>
    </Section>
  );
}

/* ================================================================
   SECTIONS 3.1–3.5 — Five process steps
   ================================================================ */
function ProcessSteps() {
  return (
    <>
      {PROCESS_PAGE.steps.map((step) => (
        <ProcessStep
          key={step.number}
          id={`step-${step.number}`}
          number={step.number}
          eyebrow={step.eyebrow}
          headlineTop={step.headlineTop}
          headlineEm={step.headlineEm}
          body={step.body}
          inThisPhase={step.inThisPhase}
          background={step.background}
          closingNote={step.closingNote}
        />
      ))}
    </>
  );
}

/* ================================================================
   SECTION 4 — ADVISORY CLIENTS (Build vs Advisory comparison)
   ================================================================ */
function AdvisorySection() {
  const a = PROCESS_PAGE.advisory;
  return (
    <Section bg="var(--color-ink)" className="text-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* Left */}
        <div>
          <SectionEyebrow>{a.eyebrow}</SectionEyebrow>
          <h2
            className="font-display"
            style={{
              fontWeight: 400,
              fontSize: "clamp(32px, 4vw, 48px)",
              lineHeight: 1.1,
              letterSpacing: "-0.015em",
              marginTop: 20,
              color: "#ffffff",
            }}
          >
            {a.headlineTop}
            <br />
            <em className="italic font-normal">{a.headlineEm}</em>
          </h2>
          <div
            className="mt-6"
            style={{
              fontSize: 16,
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.7)",
              maxWidth: 460,
            }}
          >
            <p>{a.body1}</p>
            <p className="mt-5">{a.body2}</p>
            <p className="mt-5">{a.body3}</p>
          </div>
        </div>

        {/* Right — comparison table */}
        <div>
          <ComparisonTable
            col1Label={a.tableCol1}
            col2Label={a.tableCol2}
            rows={a.rows}
            tone="dark"
          />

          <div className="mt-8">
            <Button href="/services" variant="primary" mode="light" fullWidth>
              Learn More About Advisory Services
            </Button>
          </div>

          <div className="mt-4 text-center">
            <Link
              href="/services"
              className="inline-block text-[13px] font-medium uppercase tracking-[0.12em] transition-colors duration-300 hover:text-[#b8965a]"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              ← Back to Services
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ================================================================
   SECTION 5 — DIFFERENTIATORS (3 cards)
   ================================================================ */
function Differentiators() {
  const d = PROCESS_PAGE.differentiators;
  return (
    <Section bg="var(--color-linen)">
      <div className="text-center">
        <SectionEyebrow>{d.eyebrow}</SectionEyebrow>
        <h2
          className="font-display mx-auto"
          style={{
            fontWeight: 400,
            fontSize: "clamp(32px, 4vw, 48px)",
            lineHeight: 1.1,
            letterSpacing: "-0.015em",
            marginTop: 20,
            maxWidth: 760,
            color: "var(--color-ink)",
          }}
        >
          {d.headlineTop}
          <br />
          <em className="italic font-normal">{d.headlineEm}</em>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
        {d.cards.map((card) => (
          <div
            key={card.headline}
            className="bg-white rounded-[4px]"
            style={{
              padding: "36px 30px",
              borderTop: "3px solid var(--color-bronze)",
              border: "1px solid var(--color-sand)",
              borderTopColor: "var(--color-bronze)",
              borderTopWidth: 3,
            }}
          >
            <h3
              className="font-display"
              style={{
                fontWeight: 400,
                fontSize: 24,
                lineHeight: 1.2,
                letterSpacing: "-0.01em",
                color: "var(--color-ink)",
              }}
            >
              {card.headline}
            </h3>
            <p
              className="mt-3.5"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 14,
                lineHeight: 1.75,
                color: "var(--color-ash)",
              }}
            >
              {card.body}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ================================================================
   SECTION 6 — FINAL CTA (dark band, centered)
   ================================================================ */
function FinalCTA() {
  const c = PROCESS_PAGE.cta;
  return (
    <section
      className="text-white"
      style={{
        background: "var(--color-ink)",
        padding: "80px var(--page-padding)",
      }}
    >
      <div className="text-center mx-auto" style={{ maxWidth: 760 }}>
        <SectionEyebrow>{c.eyebrow}</SectionEyebrow>
        <h2
          className="font-display"
          style={{
            fontWeight: 300,
            fontSize: "clamp(34px, 4vw, 56px)",
            lineHeight: 1.1,
            letterSpacing: "-0.015em",
            color: "#ffffff",
            marginTop: 20,
          }}
        >
          {c.headlineTop}
          <br />
          <em className="italic font-normal">{c.headlineEm}</em>
        </h2>
        <p
          className="mx-auto"
          style={{
            fontSize: 17,
            fontWeight: 300,
            lineHeight: 1.8,
            color: "rgba(255,255,255,0.65)",
            maxWidth: 520,
            margin: "20px auto 0",
          }}
        >
          {c.body}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-10">
          <Button href="/contact" variant="primary" mode="light">
            Start Your Project
          </Button>
          <Button href="/contact" variant="ghost" mode="light">
            Schedule a Consultation
          </Button>
        </div>
        <p
          className="text-center mx-auto"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 12,
            color: "rgba(255,255,255,0.35)",
            marginTop: 20,
            maxWidth: 480,
          }}
        >
          {c.caption}
        </p>
      </div>
    </section>
  );
}

/* ================================================================
   PAGE
   ================================================================ */
export default function ProcessPage() {
  return (
    <>
      <PageHero />
      <ProcessIntro />
      <ProcessSteps />
      <AdvisorySection />
      <Differentiators />
      <FinalCTA />
    </>
  );
}

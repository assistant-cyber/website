import type { Metadata } from "next";
import Image from "next/image";
import { SERVICES_PAGE } from "@/lib/constants";
import { WARM_CREAM_BLUR } from "@/lib/blur";
import SectionEyebrow from "@/components/SectionEyebrow";
import Button from "@/components/Button";
import ServiceListItem from "@/components/ServiceListItem";
import ComparisonTable from "@/components/ComparisonTable";
import Animate from "@/components/Animate";
import { AnimateStagger, AnimateStaggerItem } from "@/components/AnimateStagger";

export const metadata: Metadata = {
  title:
    "Independent Construction Advisory Services | Synergistic Development · Denver",
  description:
    "Expert owner's representation and construction advisory services for Denver homeowners. Independent guidance before, during, and after construction — whether or not you hire us to build.", alternates: { canonical: "/services/advisory" },
};

/* ------------------------------------------------------------------
   Section wrapper — matches services page rhythm
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
   PAGE HERO
   ================================================================ */
function PageHero() {
  const ia = SERVICES_PAGE.independentAdvisory;
  return (
    <section
      className="relative w-full"
      style={{ height: "min(55vh, 600px)", minHeight: 480, marginTop: "-72px" }}
      aria-label="Advisory services hero"
    >
      <div className="absolute inset-0">
        <Image
          src="/images/site/heroes/03-hero-bedroom.jpg"
          alt="Refined interior — Synergistic Development, Denver"
          fill
          priority
          quality={85}
          sizes="100vw"
          placeholder="blur"
          blurDataURL={WARM_CREAM_BLUR}
          style={{ objectFit: "cover" }}
        />
      </div>

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(20,20,20,0.25) 0%, rgba(20,20,20,0.6) 100%)",
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
        <div className="max-w-[720px]">
          <Animate variant="fadeUp" delay={0} duration={0.7}>
            <SectionEyebrow hero>{ia.eyebrow}</SectionEyebrow>
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
              {ia.headlineTop}
              <br />
              <em className="italic font-normal">{ia.headlineEm}</em>
            </h1>
          </Animate>
          <Animate variant="fadeUp" delay={0.3} duration={0.8}>
            <p
              style={{
                fontSize: "clamp(15px, 1.6vw, 18px)",
                fontWeight: 300,
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.85)",
                maxWidth: 540,
                marginTop: 16,
              }}
            >
              {ia.subhead}
            </p>
          </Animate>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   INTRO + PULL QUOTE
   ================================================================ */
function IntroAndQuote() {
  const ia = SERVICES_PAGE.independentAdvisory;
  return (
    <>
      <Section bg="var(--color-cream)" py="60px">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — text */}
          <Animate
            variant="fadeLeft"
            className="mx-auto lg:mx-0"
            style={{
              maxWidth: 560,
              color: "var(--color-ash)",
              fontSize: 17,
              lineHeight: 1.8,
            }}
          >
            {ia.introParagraphs.map((p, i) => (
              <p key={i} className={i > 0 ? "mt-5" : ""}>
                {p}
              </p>
            ))}
          </Animate>

          {/* Right — video */}
          <Animate variant="fadeRight" delay={0.1}>
            <div
              className="relative overflow-hidden rounded-[2px]"
              style={{ aspectRatio: "4 / 5" }}
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                poster="/video/advisory-poster.jpg"
                aria-label="Synergistic Development — independent construction advisory, Denver"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              >
                <source src="/video/advisory.mp4" type="video/mp4" />
              </video>
            </div>
          </Animate>
        </div>
      </Section>

      <section
        style={{
          background: "var(--color-ink)",
          padding: "60px var(--page-padding)",
        }}
      >
        <blockquote
          className="font-display mx-auto text-center text-white"
          style={{
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(24px, 3vw, 36px)",
            lineHeight: 1.5,
            maxWidth: 760,
          }}
        >
          &ldquo;Architects represent the design. Builders represent the
          construction. Real estate agents represent the transaction. Who
          represents <em className="not-italic font-normal">you?</em>&rdquo;
        </blockquote>
        <p
          className="text-center mt-7 uppercase"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.18em",
            color: "rgba(255,255,255,0.5)",
          }}
        >
          {ia.quoteAttribution}
        </p>
      </section>
    </>
  );
}

/* ================================================================
   OUR ADVISORY SERVICES — 3 phase cards
   ================================================================ */
function AdvisoryServices() {
  const ia = SERVICES_PAGE.independentAdvisory;
  return (
    <Section bg="var(--color-white)" py="80px">
      <Animate variant="fadeUp" className="text-center">
        <h2
          className="font-display mx-auto"
          style={{
            fontWeight: 400,
            fontSize: "clamp(32px, 4vw, 48px)",
            lineHeight: 1.1,
            letterSpacing: "-0.015em",
            maxWidth: 720,
            color: "var(--color-ink)",
          }}
        >
          {ia.servicesHeader}
        </h2>
      </Animate>

      <AnimateStagger
        staggerDelay={0.12}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
      >
        {ia.phases.map((phase) => (
          <AnimateStaggerItem key={phase.label}>
            <div
              className="bg-white rounded-[4px] border border-[#e0d8cc] transition-shadow duration-300 hover:shadow-[var(--shadow-card)] h-full"
              style={{
                padding: "40px 32px",
                borderTop: "3px solid var(--color-bronze)",
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
                }}
              >
                {phase.label}
              </span>
              <p
                className="mt-3"
                style={{
                  fontSize: 15,
                  lineHeight: 1.7,
                  color: "var(--color-ash)",
                }}
              >
                {phase.intro}
              </p>
              <ul className="mt-5 flex flex-col">
                {phase.items.map((item) => (
                  <ServiceListItem key={item} size="small">
                    {item}
                  </ServiceListItem>
                ))}
              </ul>
            </div>
          </AnimateStaggerItem>
        ))}
      </AnimateStagger>
    </Section>
  );
}

/* ================================================================
   THE SAME PROCESS. A DIFFERENT ROLE.
   ================================================================ */
function SameProcess() {
  const sp = SERVICES_PAGE.sameProcess;
  return (
    <Section bg="var(--color-ink)" className="text-white">
      <Animate variant="fadeUp" className="text-center">
        <SectionEyebrow className="!text-[#b8965a]">{sp.eyebrow}</SectionEyebrow>
        <h2
          className="font-display mx-auto"
          style={{
            fontWeight: 400,
            fontSize: "clamp(34px, 4vw, 52px)",
            lineHeight: 1.1,
            letterSpacing: "-0.015em",
            marginTop: 20,
            maxWidth: 720,
            color: "#ffffff",
          }}
        >
          {sp.headlineTop}
          <br />
          <em className="italic font-normal">{sp.headlineEm}</em>
        </h2>
      </Animate>

      <Animate
        variant="fadeUp"
        delay={0.1}
        className="mx-auto"
        style={{
          maxWidth: 760,
          marginTop: 32,
          fontSize: 16,
          lineHeight: 1.8,
          color: "rgba(255,255,255,0.75)",
        }}
      >
        <p>{sp.body1}</p>
        <p className="mt-5">{sp.body2}</p>
        <p className="mt-5">{sp.body3}</p>
      </Animate>

      <Animate variant="fadeUp" delay={0.15} className="mt-14 max-w-[900px] mx-auto">
        <ComparisonTable
          col1Label={sp.col1Label}
          col2Label={sp.col2Label}
          rows={sp.rows}
          tone="dark"
        />
      </Animate>

      <Animate
        variant="fadeUp"
        delay={0.2}
        className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-12"
      >
        <Button href={sp.primaryCta.href} variant="primary" mode="light">
          {sp.primaryCta.label}
        </Button>
        <Button href={sp.secondaryCta.href} variant="ghost" mode="light">
          {sp.secondaryCta.label}
        </Button>
      </Animate>
    </Section>
  );
}

/* ================================================================
   FINAL CTA
   ================================================================ */
function FinalCTA() {
  return (
    <section
      style={{
        background: "var(--color-bronze)",
        padding: "80px var(--page-padding)",
      }}
    >
      <div
        className="mx-auto text-center text-white"
        style={{ maxWidth: 760 }}
      >
        <h2
          className="font-display"
          style={{
            fontWeight: 300,
            fontSize: "clamp(34px, 4vw, 56px)",
            lineHeight: 1.1,
            letterSpacing: "-0.015em",
            color: "#ffffff",
          }}
        >
          Ready to Have an
          <br />
          <em className="italic font-normal">Advocate on Your Side?</em>
        </h2>
        <p
          className="mx-auto"
          style={{
            fontSize: 17,
            fontWeight: 300,
            lineHeight: 1.8,
            color: "rgba(255,255,255,0.85)",
            maxWidth: 540,
            margin: "20px auto 0",
          }}
        >
          Whether you&rsquo;re evaluating a builder, comparing bids, or already
          mid-project — a confidential consultation costs you nothing and may
          save you a great deal.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-10">
          <Button href="/contact" variant="primary" mode="light">
            Schedule a Consultation
          </Button>
          <Button href="/services" variant="ghost" mode="light">
            ← Back to Services
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   PAGE
   ================================================================ */
export default function AdvisoryPage() {
  return (
    <>
      <PageHero />
      <IntroAndQuote />
      <AdvisoryServices />
      <SameProcess />
      <FinalCTA />
    </>
  );
}

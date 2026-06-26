import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SERVICES_PAGE } from "@/lib/constants";
import { WARM_CREAM_BLUR } from "@/lib/blur";
import SectionEyebrow from "@/components/SectionEyebrow";
import Button from "@/components/Button";
import ArrowLink from "@/components/ArrowLink";
import ServiceAnchorNav from "@/components/ServiceAnchorNav";
import ServiceListItem from "@/components/ServiceListItem";
import Animate from "@/components/Animate";
import { AnimateStagger, AnimateStaggerItem } from "@/components/AnimateStagger";

export const metadata: Metadata = {
  title:
    "Services | Synergistic Development · Custom Homes, Renovations & Advisory · Denver",
  description:
    "Synergistic Development offers luxury custom home building, transformative renovations, and independent owner's representation services throughout Denver's most desirable neighborhoods.",
};

/* ------------------------------------------------------------------
   Section wrapper — same rhythm as prior pages
   ------------------------------------------------------------------ */
function Section({
  id,
  children,
  bg,
  py = "var(--section-gap)",
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  bg?: string;
  py?: string;
  className?: string;
}) {
  return (
    <section
      id={id}
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
      aria-label="Services hero"
    >
      <div className="absolute inset-0">
        <Image
          src={SERVICES_PAGE.hero.backgroundImage}
          alt={SERVICES_PAGE.hero.backgroundAlt}
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
        <div className="max-w-[640px]">
          <Animate variant="fadeUp" delay={0} duration={0.7}>
            <SectionEyebrow className="!text-[#b8965a]">
              {SERVICES_PAGE.hero.eyebrow}
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
              {SERVICES_PAGE.hero.headlineTop1}
              <br />
              <em className="italic font-normal">{SERVICES_PAGE.hero.headlineEm}</em>
            </h1>
          </Animate>
          <Animate variant="fadeUp" delay={0.3} duration={0.8}>
            <p
              style={{
                fontSize: "clamp(15px, 1.6vw, 18px)",
                fontWeight: 300,
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.85)",
                maxWidth: 500,
                marginTop: 16,
              }}
            >
              {SERVICES_PAGE.hero.subhead}
            </p>
          </Animate>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   Shared helper: "What This Includes" label + bronze-dash list
   ------------------------------------------------------------------ */
function IncludesList({ items }: { items: ReadonlyArray<string> }) {
  return (
    <div>
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
        What This Includes
      </span>
      <ul className="flex flex-col">
        {items.map((item) => (
          <ServiceListItem key={item}>{item}</ServiceListItem>
        ))}
      </ul>
    </div>
  );
}

/* ================================================================
   SECTION 3 — CUSTOM HOMES (content left, sticky image right)
   ================================================================ */
function CustomHomes() {
  const ch = SERVICES_PAGE.customHomes;
  return (
    <Section id="custom-homes" bg="var(--color-cream)">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* Content left */}
        <Animate variant="fadeLeft">
          <div className="order-2 lg:order-1">
            <SectionEyebrow>{ch.eyebrow}</SectionEyebrow>
          <h2
            className="font-display"
            style={{
              fontWeight: 400,
              fontSize: "clamp(34px, 4vw, 54px)",
              lineHeight: 1.1,
              letterSpacing: "-0.015em",
              marginTop: 20,
              color: "var(--color-ink)",
              maxWidth: 520,
            }}
          >
            {ch.headlineTop}
            <br />
            <em className="italic font-normal">{ch.headlineEm}</em>
          </h2>
          <div
            className="mt-6"
            style={{
              fontSize: 16,
              lineHeight: 1.8,
              color: "var(--color-ash)",
              maxWidth: 520,
            }}
          >
            <p>{ch.body1}</p>
            <p className="mt-5">{ch.body2}</p>
          </div>

          <div
            aria-hidden="true"
            style={{
              width: 60,
              height: 1,
              background: "var(--color-sand)",
              margin: "36px 0",
            }}
          />

          <IncludesList items={ch.includes} />

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mt-10">
            <Button href="/contact" variant="primary">
              Start Your Project
            </Button>
            <ArrowLink href="/portfolio">View Our Portfolio</ArrowLink>
          </div>
          </div>
        </Animate>

        {/* Image right — sticky on desktop */}
        <Animate variant="scaleUp" delay={0.1}>
        <div className="order-1 lg:order-2 lg:sticky lg:top-[120px] self-start">
          <div
            className="relative overflow-hidden rounded-[2px] mx-auto"
            style={{ aspectRatio: "2 / 3", maxWidth: 700 }}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              poster="/video/custom-homes-poster.jpg"
              aria-label={ch.imageAlt}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                zIndex: 0,
              }}
            >
              <source src="/video/custom-homes.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
        </Animate>
      </div>
    </Section>
  );
}

/* ================================================================
   SECTION 4 — RENOVATIONS (image left, content right — reversed)
   ================================================================ */
function Renovations() {
  const rn = SERVICES_PAGE.renovations;
  return (
    <Section id="renovations" bg="var(--color-white)">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* Image left — sticky on desktop */}
        <Animate variant="scaleUp" delay={0.1}>
        <div className="lg:sticky lg:top-[120px] self-start order-1">
          <div
            className="relative overflow-hidden rounded-[2px] mx-auto"
            style={{ aspectRatio: "2 / 3", maxWidth: 700 }}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              poster="/video/renovations-poster.jpg"
              aria-label={rn.imageAlt}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                zIndex: 0,
              }}
            >
              <source src="/video/renovations.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
        </Animate>

        {/* Content right */}
        <Animate variant="fadeRight" delay={0.1}>
        <div className="order-2">
          <SectionEyebrow>{rn.eyebrow}</SectionEyebrow>
          <h2
            className="font-display"
            style={{
              fontWeight: 400,
              fontSize: "clamp(34px, 4vw, 54px)",
              lineHeight: 1.1,
              letterSpacing: "-0.015em",
              marginTop: 20,
              color: "var(--color-ink)",
              maxWidth: 520,
            }}
          >
            {rn.headlineTop}
            <br />
            <em className="italic font-normal">{rn.headlineEm}</em>
          </h2>
          <div
            className="mt-6"
            style={{
              fontSize: 16,
              lineHeight: 1.8,
              color: "var(--color-ash)",
              maxWidth: 520,
            }}
          >
            <p>{rn.body1}</p>
            <p className="mt-5">{rn.body2}</p>
          </div>

          <div
            aria-hidden="true"
            style={{
              width: 60,
              height: 1,
              background: "var(--color-sand)",
              margin: "36px 0",
            }}
          />

          <IncludesList items={rn.includes} />

          {/* Special note */}
          <div
            className="rounded-[0_4px_4px_0]"
            style={{
              background: "var(--color-linen)",
              borderLeft: "3px solid var(--color-bronze)",
              padding: "20px 24px",
              marginTop: 32,
            }}
          >
            <p
              style={{
                fontSize: 14,
                lineHeight: 1.7,
                color: "var(--color-ash)",
              }}
            >
              {rn.note}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mt-10">
            <Button href="/contact" variant="primary">
              Start Your Project
            </Button>
            <ArrowLink href="/portfolio">View Our Portfolio</ArrowLink>
          </div>
        </div>
        </Animate>
      </div>
    </Section>
  );
}

/* ================================================================
   SECTION 5A — ADVISORY INTRO + pull quote band
   ================================================================ */
function AdvisoryIntro() {
  const intro = SERVICES_PAGE.advisory.intro;
  return (
    <>
      <Section id="advisory" bg="var(--color-cream)" className="!pt-[var(--section-gap)]">
        <Animate variant="fadeUp" className="text-center">
          <SectionEyebrow>{intro.eyebrow}</SectionEyebrow>
          <h2
            className="font-display mx-auto"
            style={{
              fontWeight: 400,
              fontSize: "clamp(34px, 5vw, 64px)",
              lineHeight: 1.1,
              letterSpacing: "-0.015em",
              marginTop: 20,
              maxWidth: 800,
              color: "var(--color-ink)",
            }}
          >
            {intro.headlineTop}
            <br />
            <em className="italic font-normal">{intro.headlineEm}</em>
          </h2>
          <p
            className="mx-auto"
            style={{
              fontSize: 20,
              fontWeight: 300,
              lineHeight: 1.7,
              color: "var(--color-ash)",
              maxWidth: 640,
              margin: "24px auto 0",
            }}
          >
            {intro.subhead}
          </p>
        </Animate>
      </Section>

      {/* Full-bleed dark pull-quote band */}
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
          &ldquo;Architects represent design. Contractors represent construction.
          Real estate agents represent the transaction. Who represents{" "}
          <em className="not-italic font-normal">you?</em>&rdquo;
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
          {intro.quoteAttribution}
        </p>
      </section>
    </>
  );
}

/* ================================================================
   SECTION 5B — ADVISORY 3-CARD BREAKDOWN
   ================================================================ */
function AdvisoryCards() {
  return (
    <Section bg="var(--color-white)" py="80px">
      <div className="text-center">
        <SectionEyebrow>Our Advisory Services</SectionEyebrow>
        <h2
          className="font-display mx-auto"
          style={{
            fontWeight: 400,
            fontSize: "clamp(32px, 4vw, 48px)",
            lineHeight: 1.1,
            letterSpacing: "-0.015em",
            marginTop: 20,
            maxWidth: 720,
            color: "var(--color-ink)",
          }}
        >
          Guidance When You Need It.
          <br />
          Leadership When It <em className="italic font-normal">Matters.</em>
        </h2>
      </div>

      <AnimateStagger staggerDelay={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
        {SERVICES_PAGE.advisory.cards.map((card) => (
          <AnimateStaggerItem key={card.label}>
            <div
              className="bg-white rounded-[4px] border border-[#e0d8cc] transition-shadow duration-300 hover:shadow-[var(--shadow-card)] h-full"
              style={{ padding: "40px 32px", borderTop: "3px solid var(--color-bronze)" }}
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
                {card.label}
              </span>
              <h3
                className="font-display mt-2"
                style={{
                  fontWeight: 400,
                  fontSize: 28,
                  lineHeight: 1.2,
                  letterSpacing: "-0.01em",
                  color: "var(--color-ink)",
                }}
              >
                {card.headline}
              </h3>
              <p
                className="mt-4"
                style={{
                  fontSize: 14,
                  lineHeight: 1.75,
                  color: "var(--color-ash)",
                }}
              >
                {card.body}
              </p>
              <ul className="mt-4 flex flex-col">
                {card.list.map((item) => (
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
   SECTION 5C — WHO THIS IS FOR + CTA
   ================================================================ */
function AdvisoryWhoFor() {
  const wf = SERVICES_PAGE.advisory.whoFor;
  return (
    <Section bg="var(--color-cream)" py="80px">
      <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-16 items-start">
        {/* Left — content + clients */}
        <Animate variant="fadeLeft">
          <div>
            <SectionEyebrow>{wf.eyebrow}</SectionEyebrow>
          <h2
            className="font-display"
            style={{
              fontWeight: 400,
              fontSize: "clamp(32px, 4vw, 48px)",
              lineHeight: 1.1,
              letterSpacing: "-0.015em",
              marginTop: 20,
              color: "var(--color-ink)",
              maxWidth: 480,
            }}
          >
            {wf.headlineTop}
            <br />
            <em className="italic font-normal">{wf.headlineEm}</em>
          </h2>
          <div
            className="mt-6"
            style={{
              fontSize: 16,
              lineHeight: 1.8,
              color: "var(--color-ash)",
              maxWidth: 520,
            }}
          >
            <p>{wf.body1}</p>
            <p className="mt-5">{wf.body2}</p>
          </div>

          <ul className="mt-7 flex flex-col">
            {wf.clients.map((c) => (
              <ServiceListItem key={c}>{c}</ServiceListItem>
            ))}
          </ul>
          </div>
        </Animate>

        {/* Right — quote card */}
        <Animate variant="fadeRight" delay={0.1}>
        <div
          className="rounded-[4px] text-white"
          style={{
            background: "var(--color-ink)",
            padding: "48px 40px",
          }}
        >
          <p
            className="font-display"
            style={{
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: 22,
              lineHeight: 1.6,
              color: "#ffffff",
            }}
          >
            &ldquo;{wf.quoteText}&rdquo;
          </p>
          <p
            className="font-display mt-3"
            style={{
              fontWeight: 300,
              fontSize: 32,
              lineHeight: 1.2,
              color: "var(--color-bronze)",
            }}
          >
            {wf.quoteHighlight}
          </p>

          <div
            aria-hidden="true"
            style={{
              width: "100%",
              height: 1,
              background: "rgba(255,255,255,0.15)",
              margin: "32px 0",
            }}
          />

          <p
            style={{
              fontSize: 14,
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.6)",
            }}
          >
            {wf.quoteBody}
          </p>

          <div className="mt-8">
            <Button href="/contact" variant="primary" mode="light" fullWidth>
              Schedule a Consultation
            </Button>
          </div>

          <p
            className="text-center italic mt-4"
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.4)",
            }}
          >
            {wf.caption}
          </p>
        </div>
        </Animate>
      </div>
    </Section>
  );
}

/* ================================================================
   SECTION 6 — EXPERTISE BEYOND CONSTRUCTION
   ================================================================ */
function ExpertiseSection() {
  const e = SERVICES_PAGE.expertise;
  return (
    <Section bg="var(--color-white)">
      <Animate variant="fadeUp" className="text-center">
        <SectionEyebrow>{e.eyebrow}</SectionEyebrow>
        <h2
          className="font-display mx-auto"
          style={{
            fontWeight: 400,
            fontSize: "clamp(32px, 4vw, 48px)",
            lineHeight: 1.1,
            letterSpacing: "-0.015em",
            marginTop: 20,
            maxWidth: 720,
            color: "var(--color-ink)",
          }}
        >
          {e.headlineTop}
          <br />
          <em className="italic font-normal">{e.headlineEm}</em>
        </h2>
        <p
          className="mx-auto"
          style={{
            fontSize: 18,
            fontWeight: 300,
            lineHeight: 1.6,
            color: "var(--color-slate)",
            maxWidth: 580,
            margin: "16px auto 48px",
          }}
        >
          {e.subhead}
        </p>
      </Animate>

      <AnimateStagger staggerDelay={0.06} className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-[900px] mx-auto">
        <ul
          className="flex flex-col md:pr-10"
          style={{ borderRight: "1px solid var(--color-sand)" }}
        >
          {e.col1.map((item) => (
            <ServiceListItem key={item}>{item}</ServiceListItem>
          ))}
        </ul>
        <ul className="flex flex-col">
          {e.col2.map((item) => (
            <ServiceListItem key={item}>{item}</ServiceListItem>
          ))}
        </ul>
      </AnimateStagger>
    </Section>
  );
}

/* ================================================================
   SECTION 7 — FINAL CTA (bronze band)
   ================================================================ */
function FinalCTA() {
  const c = SERVICES_PAGE.cta;
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
            color: "rgba(255,255,255,0.85)",
            maxWidth: 500,
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
      </div>
    </section>
  );
}

/* ================================================================
   PAGE
   ================================================================ */
export default function ServicesPage() {
  return (
    <>
      <PageHero />

      {/* Section 2 — anchor nav (no padding override; tighter) */}
      <div className="bg-white" style={{ padding: "48px 0" }}>
        <div
          style={{
            maxWidth: "var(--page-max)",
            margin: "0 auto",
            padding: "0 var(--page-padding)",
          }}
        >
          <ServiceAnchorNav items={SERVICES_PAGE.anchorNav} />
        </div>
      </div>

      <CustomHomes />
      <Renovations />
      <AdvisoryIntro />
      <AdvisoryCards />
      <AdvisoryWhoFor />
      <ExpertiseSection />
      <FinalCTA />
    </>
  );
}

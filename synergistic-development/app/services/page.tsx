import type { Metadata } from "next";
import Image from "next/image";
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
    "Services | Synergistic Development Â· Custom Homes, Renovations & Advisory Â· Denver",
  description:
    "Synergistic Development offers luxury custom home building, transformative renovations, and independent owner's representation services throughout Denver's most desirable neighborhoods.",
};

/* ------------------------------------------------------------------
   Section wrapper â same rhythm as prior pages
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
   SECTION 1 â PAGE HERO (bottom-left aligned)
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
            <SectionEyebrow hero>
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
   SECTION 3 â CUSTOM HOMES (content left, sticky image right)
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

        {/* Image right â sticky on desktop */}
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
   SECTION 4 â RENOVATIONS (image left, content right â reversed)
   ================================================================ */
function Renovations() {
  const rn = SERVICES_PAGE.renovations;
  return (
    <Section id="renovations" bg="var(--color-white)">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* Image left â sticky on desktop */}
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
   SECTION 5A â INDEPENDENT CONSTRUCTION ADVISORY SERVICES
   (header + 3 intro paragraphs + Learn More CTA)
   The phase breakdown + comparison live on /services/advisory.
   ================================================================ */
function IndependentAdvisory() {
  const ia = SERVICES_PAGE.independentAdvisory;
  return (
    <Section
      id="independent-advisory"
      bg="var(--color-cream)"
      className="!pt-[var(--section-gap)]"
    >
      <Animate variant="fadeUp" className="text-center">
        <SectionEyebrow>{ia.eyebrow}</SectionEyebrow>
        <h2
          className="font-display mx-auto"
          style={{
            fontWeight: 400,
            fontSize: "clamp(36px, 5vw, 64px)",
            lineHeight: 1.1,
            letterSpacing: "-0.015em",
            marginTop: 20,
            maxWidth: 900,
            color: "var(--color-ink)",
          }}
        >
          {ia.headlineTop}
          <br />
          <em className="italic font-normal">{ia.headlineEm}</em>
        </h2>
        <p
          className="mx-auto"
          style={{
            fontSize: 20,
            fontWeight: 300,
            lineHeight: 1.7,
            color: "var(--color-ash)",
            maxWidth: 680,
            margin: "20px auto 0",
          }}
        >
          {ia.subhead}
        </p>
      </Animate>

      <Animate
        variant="fadeUp"
        delay={0.1}
        className="mx-auto"
        style={{
          marginTop: 48,
          maxWidth: 760,
          color: "var(--color-ash)",
          fontSize: 16,
          lineHeight: 1.8,
        }}
      >
        {ia.introParagraphs.map((p, i) => (
          <p key={i} className={i > 0 ? "mt-5" : ""}>
            {p}
          </p>
        ))}

        <div
          aria-hidden="true"
          style={{
            width: 60,
            height: 1,
            background: "var(--color-sand)",
            margin: "40px auto",
          }}
        />

        <div className="text-center">
          <Button href="/services/advisory" variant="primary">
            Learn More About Advisory Services
          </Button>
        </div>
      </Animate>
    </Section>
  );
}

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
   SECTION 7 â FINAL CTA (bronze band)
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

      {/* Section 2 â anchor nav (no padding override; tighter) */}
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
      <IndependentAdvisory />
      <ExpertiseSection />
      <FinalCTA />
    </>
  );
}

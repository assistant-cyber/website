import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PORTFOLIO } from "@/lib/constants";
import { WARM_CREAM_BLUR } from "@/lib/blur";
import SectionEyebrow from "@/components/SectionEyebrow";
import Button from "@/components/Button";
import GalleryGrid from "@/components/GalleryGrid";
import { galleryPhotos } from "@/lib/imageManifest";
import Animate from "@/components/Animate";
import { AnimateStagger, AnimateStaggerItem } from "@/components/AnimateStagger";

export const metadata: Metadata = {
  title:
    "Portfolio | Synergistic Development · Custom Homes & Renovations · Denver",
  description:
    "Explore Synergistic Development's portfolio of luxury custom homes and transformative renovations across Denver's most desirable neighborhoods — Cherry Creek, Highlands, and Lakewood Country Club.", alternates: { canonical: "/portfolio" },
};

/* ------------------------------------------------------------------
   Section wrapper
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
      style={{ background: bg, paddingTop: py, paddingBottom: py }}
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
   SECTION 1 — PAGE HERO
   ================================================================ */
function PageHero() {
  return (
    <section
      className="relative w-full"
      style={{ height: "min(55vh, 720px)", minHeight: 480, marginTop: "-72px" }}
      aria-label="Portfolio hero"
    >
      <div className="absolute inset-0">
        <Image
          src={PORTFOLIO.hero.backgroundImage}
          alt={PORTFOLIO.hero.backgroundAlt}
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
            "linear-gradient(to bottom, rgba(20,20,20,0.15) 0%, rgba(20,20,20,0.6) 100%)",
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
              {PORTFOLIO.hero.eyebrow}
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
              {PORTFOLIO.hero.headlineTop}
              <br />
              <em className="italic font-normal">{PORTFOLIO.hero.headlineEm}</em>
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
              {PORTFOLIO.hero.subhead}
            </p>
          </Animate>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 2 — GALLERY (flat grid of every photo)
   ================================================================ */
function PortfolioSection() {
  return (
    <section
      style={{
        background: "var(--color-cream)",
        paddingTop: 64,
        paddingBottom: "var(--section-gap)",
      }}
    >
      <div
        style={{
          maxWidth: "var(--page-max)",
          margin: "0 auto",
          padding: "0 var(--page-padding)",
        }}
      >
        {/* Gallery intro */}
        <Animate variant="fadeIn" className="flex" style={{
            alignItems: "baseline",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
            marginBottom: 24,
          }}>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 13,
              color: "var(--color-slate)",
              margin: 0,
            }}
          >
            <strong style={{ color: "var(--color-ink)" }}>
              {galleryPhotos.length} photos
            </strong>{" "}
            · 4 projects · Denver, Colorado
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 12,
              color: "var(--color-slate)",
              margin: 0,
              fontStyle: "italic",
            }}
          >
            Click any photo to open the full gallery
          </p>
        </Animate>

        <Animate variant="fadeUp" delay={0.2}>
          <GalleryGrid />
        </Animate>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 3 — STATS BAND
   ================================================================ */
function StatsBand() {
  return (
    <section
      style={{
        background: "var(--color-white)",
        padding: "60px var(--page-padding)",
      }}
    >
      <AnimateStagger staggerDelay={0.15} className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0" style={{
          maxWidth: 960,
          margin: "0 auto",
        }}>
        {PORTFOLIO.stats.map((stat, i) => (
          <AnimateStaggerItem key={i}>
            <div
              className={`text-center md:px-10 ${
                i > 0 ? "border-t border-[#e0d8cc] pt-10 md:border-t-0 md:pt-0 md:border-l md:border-[#e0d8cc]" : ""
              }`}
            >
              <div
                className="font-display"
                style={{
                  fontWeight: 300,
                  fontSize: 64,
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                  color: "var(--color-ink)",
                }}
              >
                {stat.number}
              </div>
              <div
                className="uppercase mt-4"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.18em",
                  color: "var(--color-slate)",
                }}
              >
                {stat.label}
              </div>
            </div>
          </AnimateStaggerItem>
        ))}
      </AnimateStagger>
    </section>
  );
}

/* ================================================================
   SECTION 4 — CHERRY CREEK FEATURE CALLOUT (dark)
   ================================================================ */
function CherryCreekCallout() {
  const cc = PORTFOLIO.cherryCreek;
  return (
    <Section bg="var(--color-ink)" className="text-white">
      <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-12 lg:gap-16 items-center">
        {/* Left */}
        <Animate variant="fadeLeft">
          <div>
            <SectionEyebrow>{cc.eyebrow}</SectionEyebrow>
          <h2
            className="font-display"
            style={{
              fontWeight: 400,
              fontSize: "clamp(34px, 4vw, 54px)",
              lineHeight: 1.1,
              letterSpacing: "-0.015em",
              marginTop: 20,
              color: "#ffffff",
            }}
          >
            {cc.headlineTop}
            <br />
            <em className="italic font-normal">{cc.headlineEm}</em>
          </h2>
          <div
            className="mt-6"
            style={{
              fontSize: 16,
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.7)",
              maxWidth: 440,
            }}
          >
            <p>{cc.body1}</p>
            <p className="mt-5">{cc.body2}</p>
          </div>
          <div className="mt-9">
            <Link
              href="#"
              className="inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.12em] transition-colors duration-300 text-white hover:text-[#b8965a]"
            >
              View Cherry Creek Projects
              <span aria-hidden="true">→</span>
            </Link>
          </div>
          </div>
        </Animate>

        {/* Right — framed image */}
        <Animate variant="fadeRight" delay={0.1}>
        <div
          className="rounded-[2px]"
          style={{
            border: "1px solid rgba(255,255,255,0.1)",
            padding: 12,
          }}
        >
          <div
            className="relative overflow-hidden rounded-[2px]"
            style={{ aspectRatio: "4 / 3" }}
          >
            <Image
              src={cc.image}
              alt={cc.imageAlt}
              fill
              quality={85}
              sizes="(max-width: 1024px) 100vw, 55vw"
              placeholder="blur"
              blurDataURL={WARM_CREAM_BLUR}
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
        </Animate>
      </div>
    </Section>
  );
}

/* ================================================================
   SECTION 5 — NEIGHBORHOODS TAGS (linen)
   ================================================================ */
function NeighborhoodTags() {
  return (
    <Section bg="var(--color-linen)" py="80px">
      <Animate variant="fadeUp" className="text-center">
        <SectionEyebrow>Where We Work</SectionEyebrow>
        <h2
          className="font-display mx-auto"
          style={{
            fontWeight: 400,
            fontSize: "clamp(28px, 3.5vw, 44px)",
            lineHeight: 1.15,
            letterSpacing: "-0.015em",
            marginTop: 20,
            maxWidth: 720,
            color: "var(--color-ink)",
          }}
        >
          Projects Across Colorado&rsquo;s
          <br />
          <em className="italic font-normal">Premier</em> Communities.
        </h2>
      </Animate>

      <AnimateStagger staggerDelay={0.05} className="flex flex-wrap items-center justify-center gap-2.5 mt-12">
        {PORTFOLIO.neighborhoods.map((n) => (
          <AnimateStaggerItem key={n}>
            <a href="#" className="neighborhood-tag">
              {n}
            </a>
          </AnimateStaggerItem>
        ))}
      </AnimateStagger>
    </Section>
  );
}

/* ================================================================
   SECTION 6 — FINAL CTA (dark)
   ================================================================ */
function FinalCTA() {
  const c = PORTFOLIO.cta;
  return (
    <section
      className="text-white"
      style={{
        background: "var(--color-ink)",
        padding: "80px var(--page-padding)",
      }}
    >
      <Animate variant="fadeUp" className="text-center mx-auto" style={{ maxWidth: 720 }}>
        <SectionEyebrow>{c.eyebrow}</SectionEyebrow>
        <h2
          className="font-display"
          style={{
            fontWeight: 300,
            fontSize: "clamp(34px, 4vw, 52px)",
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
            maxWidth: 480,
            margin: "20px auto 0",
          }}
        >
          {c.body}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-10">
          <Button href="/contact" variant="primary" mode="light">
            Start Your Project
          </Button>
          <Button href="/process" variant="ghost" mode="light">
            View Our Process
          </Button>
        </div>
      </Animate>
    </section>
  );
}

/* ================================================================
   PAGE
   ================================================================ */
export default function PortfolioPage() {
  return (
    <>
      <PageHero />
      <PortfolioSection />
      <StatsBand />
      <CherryCreekCallout />
      <NeighborhoodTags />
      <FinalCTA />
    </>
  );
}

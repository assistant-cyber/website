import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ABOUT } from "@/lib/constants";
import { WARM_CREAM_BLUR } from "@/lib/blur";
import SectionEyebrow from "@/components/SectionEyebrow";
import Button from "@/components/Button";
import CredentialBlock from "@/components/CredentialBlock";
import Animate from "@/components/Animate";
import { AnimateStagger, AnimateStaggerItem } from "@/components/AnimateStagger";

export const metadata: Metadata = {
  title:
    "About | Synergistic Development · Denver's Luxury Home Builder & Advisor",
  description:
    "For more than 20 years, Shane Fable and Synergistic Development have helped Denver homeowners navigate custom homes, renovations, and complex residential projects with confidence.", alternates: { canonical: "/about" },
};

/* ------------------------------------------------------------------
   Section wrapper — same rhythm as home page
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
   SECTION 1 — PAGE HERO (interior photo, 55–60vh)
   ================================================================ */
function PageHero() {
  return (
    <section
      className="relative w-full"
      style={{ height: "min(60vh, 720px)", minHeight: 480, marginTop: "-72px" }}
      aria-label="About hero"
    >
      <div className="absolute inset-0">
        <Image
          src={ABOUT.hero.backgroundImage}
          alt={ABOUT.hero.backgroundAlt}
          fill
          priority
          quality={85}
          sizes="100vw"
          placeholder="blur"
          blurDataURL={WARM_CREAM_BLUR}
          style={{ objectFit: "cover" }}
        />
        {/* TODO: Replace with high-quality interior photo from Cherry Creek or Highlands project — provided by Shane */}
      </div>

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(20,20,20,0.3) 0%, rgba(20,20,20,0.65) 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative h-full flex items-center justify-center text-center text-white px-8 md:px-12">
        <div className="max-w-[720px]">
          <Animate variant="fadeUp" delay={0} duration={0.7}>
            <SectionEyebrow hero>
              {ABOUT.hero.eyebrow}
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
                marginTop: 24,
                color: "#ffffff",
              }}
            >
              {ABOUT.hero.headlineTop}
              <br />
              {ABOUT.hero.headlineEm}
              <em className="italic font-normal">{ABOUT.hero.headlineEmItalic}</em>
            </h1>
          </Animate>
          <Animate variant="fadeUp" delay={0.3} duration={0.8}>
            <p
              className="mx-auto"
              style={{
                fontSize: "clamp(15px, 1.6vw, 18px)",
                fontWeight: 300,
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.85)",
                maxWidth: 560,
                marginTop: 16,
              }}
            >
              {ABOUT.hero.subhead}
            </p>
          </Animate>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 2 — BRAND PHILOSOPHY
   ================================================================ */
function Philosophy() {
  const pullQuoteStyle: React.CSSProperties = {
    background: "var(--color-linen)",
    borderLeft: "4px solid var(--color-bronze)",
    padding: "48px 40px",
  };
  return (
    <Section bg="var(--color-white)">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        <Animate variant="fadeLeft">
          <div>
            <SectionEyebrow data-region="left">{ABOUT.philosophy.eyebrow}</SectionEyebrow>
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
            {ABOUT.philosophy.headlineTop}
            <em className="italic font-normal">{ABOUT.philosophy.headlineEm}</em>
          </h2>
          <div
            className="mt-6"
            style={{ maxWidth: 520, color: "var(--color-ash)", fontSize: 16, lineHeight: 1.8 }}
          >
            <p>{ABOUT.philosophy.body1}</p>
            <p className="mt-5">{ABOUT.philosophy.body2}</p>
            <p className="mt-5">{ABOUT.philosophy.body3}</p>
            <p className="mt-5">{ABOUT.philosophy.body4}</p>
          </div>
          </div>
        </Animate>

        <Animate variant="fadeRight" delay={0.1}>
          <div className="rounded-[4px] self-start" style={pullQuoteStyle}>

          <div
            aria-hidden="true"
            className="font-display"
            style={{
              fontWeight: 300,
              fontSize: 96,
              lineHeight: 0.6,
              color: "var(--color-bronze)",
            }}
          >
            &ldquo;
          </div>
          <blockquote
            className="font-display"
            style={{
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: 26,
              lineHeight: 1.5,
              color: "var(--color-ink)",
              marginTop: 12,
            }}
          >
            {ABOUT.philosophy.quote}
          </blockquote>
          <p
            className="uppercase mt-7"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: "0.16em",
              color: "var(--color-slate)",
            }}
          >
            Synergistic Development
          </p>
          <p
            className="italic mt-1"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 13,
              color: "var(--color-bronze)",
            }}
          >
            {ABOUT.philosophy.tagline}
          </p>
        </div>
        </Animate>
      </div>
    </Section>
  );
}

/* ================================================================
   SECTION 3 — MEET SHANE FABLE
   ================================================================ */
function MeetShane() {
  return (
    <Section bg="var(--color-cream)">
      <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-12 lg:gap-16 items-stretch">
        {/* Portrait — left */}
        <Animate variant="scaleUp">
          <div className="lg:-my-6">
          <div
            className="relative overflow-hidden rounded-[4px]"
            style={{
              aspectRatio: "3 / 4",
            }}
          >
            <Image
              src={ABOUT.shane.portraitImage}
              alt={ABOUT.shane.portraitAlt}
              fill
              quality={85}
              sizes="(max-width: 1024px) 100vw, 40vw"
              placeholder="blur"
              blurDataURL={WARM_CREAM_BLUR}
              style={{ objectFit: "cover" }}
            />
            {/* TODO: Replace with new professional photo of Shane — remove existing unflattering photo per client request */}
          </div>
          </div>
        </Animate>

        <Animate variant="fadeRight" delay={0.1}>
          <div className="lg:pl-12 flex flex-col">
          <SectionEyebrow>{ABOUT.shane.eyebrow}</SectionEyebrow>
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
            {ABOUT.shane.headlineTop}
            <em className="italic font-normal">{ABOUT.shane.headlineEm}</em>
          </h2>
          <p
            className="uppercase mt-2"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 14,
              fontWeight: 400,
              letterSpacing: "0.12em",
              color: "var(--color-slate)",
            }}
          >
            {ABOUT.shane.title}
          </p>

          <div
            aria-hidden="true"
            style={{
              width: 60,
              height: 1,
              background: "var(--color-sand)",
              margin: "24px 0",
            }}
          />

          <div
            style={{
              color: "var(--color-ash)",
              fontSize: 16,
              lineHeight: 1.8,
            }}
          >
            <p>{ABOUT.shane.bio1}</p>
            <p className="mt-5">{ABOUT.shane.bio2}</p>
            <p className="mt-5">{ABOUT.shane.bio3}</p>
          </div>

          {/* Credentials */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">
            {ABOUT.shane.credentials.map((c) => (
              <CredentialBlock
                key={c.label}
                label={c.label}
                lines={c.lines}
              />
            ))}
          </div>

          <div
            aria-hidden="true"
            style={{
              width: 60,
              height: 1,
              background: "var(--color-sand)",
              margin: "32px 0",
            }}
          />

          <p
            className="font-display"
            style={{
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: 20,
              lineHeight: 1.5,
              color: "var(--color-ash)",
            }}
          >
            &ldquo;{ABOUT.shane.closing}&rdquo;
          </p>
        </div>
        </Animate>
      </div>
    </Section>
  );
}

/* ================================================================
   SECTION 4 — THE TEAM
   ================================================================ */
function Team() {
  return (
    <Section bg="var(--color-white)">
      <Animate variant="fadeUp" className="text-center">
        <SectionEyebrow>{ABOUT.team.eyebrow}</SectionEyebrow>
        <h2
          className="font-display mx-auto"
          style={{
            fontWeight: 400,
            fontSize: "clamp(34px, 4vw, 52px)",
            lineHeight: 1.1,
            letterSpacing: "-0.015em",
            marginTop: 20,
            maxWidth: 720,
            color: "var(--color-ink)",
          }}
        >
          {ABOUT.team.headlineTop}
          <br />
          <em className="italic font-normal">Every {ABOUT.team.headlineEm}</em>
        </h2>
        <p
          className="mx-auto"
          style={{
            fontSize: 18,
            fontWeight: 300,
            lineHeight: 1.6,
            color: "var(--color-slate)",
            maxWidth: 560,
            margin: "16px auto 48px",
          }}
        >
          {ABOUT.team.subhead}
        </p>
      </Animate>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Left — body */}
        <Animate variant="fadeLeft">
          <div
            style={{
              color: "var(--color-ash)",
              fontSize: 16,
              lineHeight: 1.8,
            }}
          >
            <p>{ABOUT.team.body}</p>
            <p className="mt-5">{ABOUT.team.body2}</p>
          </div>
        </Animate>

        {/* Right — disciplines */}
        <AnimateStagger staggerDelay={0.05} className="flex flex-col">
          {ABOUT.team.disciplines.map((d) => (
            <AnimateStaggerItem key={d}>
              <li
                className="flex items-baseline gap-3"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  lineHeight: 2,
                  color: "var(--color-ash)",
                }}
              >
                <span style={{ color: "var(--color-bronze)" }}>—</span>
                <span>{d}</span>
              </li>
            </AnimateStaggerItem>
          ))}
        </AnimateStagger>
      </div>

      {/* Note block */}
      <Animate variant="fadeIn" delay={0.2} className="mt-12 text-center rounded-[4px]" style={{
          background: "var(--color-linen)",
          padding: "28px 36px",
        }}>
        <p
          className="mx-auto"
          style={{
            fontSize: 15,
            lineHeight: 1.7,
            color: "var(--color-ash)",
            maxWidth: 720,
          }}
        >
          {ABOUT.team.note.line1}
        </p>
        <p
          className="uppercase mt-3"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: "0.12em",
            color: "var(--color-bronze)",
          }}
        >
          {ABOUT.team.note.line2}
        </p>
      </Animate>
    </Section>
  );
}

/* ================================================================
   SECTION 5 — EXPERTISE GRID
   ================================================================ */
function ExpertiseGrid() {
  return (
    <Section bg="var(--color-cream)">
      <div className="text-center">
        <SectionEyebrow>{ABOUT.expertise.eyebrow}</SectionEyebrow>
        <h2
          className="font-display mx-auto"
          style={{
            fontWeight: 400,
            fontSize: "clamp(34px, 4vw, 52px)",
            lineHeight: 1.1,
            letterSpacing: "-0.015em",
            marginTop: 20,
            maxWidth: 720,
            color: "var(--color-ink)",
          }}
        >
          {ABOUT.expertise.headlineTop}
          <em className="italic font-normal">{ABOUT.expertise.headlineEm}</em>
        </h2>
      </div>

      <AnimateStagger staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
        {ABOUT.expertise.cards.map((card) => (
          <AnimateStaggerItem key={card.headline}>
            <div
              className="bg-white rounded-[4px] border border-[#e0d8cc] transition-colors duration-300 hover:border-[#b8965a] h-full"
              style={{ padding: "32px 28px" }}
            >
              <h3
                className="font-display"
                style={{
                  fontWeight: 400,
                  fontSize: 22,
                  lineHeight: 1.2,
                  letterSpacing: "-0.01em",
                  color: "var(--color-ink)",
                }}
              >
                {card.headline}
              </h3>
              <p
                className="mt-2.5"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  lineHeight: 1.7,
                  color: "var(--color-slate)",
                }}
              >
                {card.body}
              </p>
            </div>
          </AnimateStaggerItem>
        ))}
      </AnimateStagger>
    </Section>
  );
}

/* ================================================================
   SECTION 6 — WHO WE SERVE (dark band)
   ================================================================ */
function WhoWeServe() {
  return (
    <Section bg="var(--color-ink)" className="text-white">
      <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-12 lg:gap-20">
        <Animate variant="fadeLeft">
          <div>
            <SectionEyebrow>{ABOUT.whoWeServe.eyebrow}</SectionEyebrow>
          <h2
            className="font-display"
            style={{
              fontWeight: 400,
              fontSize: "clamp(34px, 4vw, 52px)",
              lineHeight: 1.1,
              letterSpacing: "-0.015em",
              marginTop: 20,
              color: "#ffffff",
            }}
          >
            {ABOUT.whoWeServe.headlineTop}
            <br />
            <em className="italic font-normal">{ABOUT.whoWeServe.headlineEm}</em>
          </h2>
          <div
            aria-hidden="true"
            style={{
              width: 60,
              height: 1,
              background: "rgba(255,255,255,0.15)",
              margin: "28px 0",
            }}
          />
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.7)",
              maxWidth: 400,
            }}
          >
            {ABOUT.whoWeServe.body}
          </p>
          </div>
        </Animate>

        <ul className="flex flex-col self-center">
          <AnimateStagger staggerDelay={0.04}>
            {ABOUT.whoWeServe.clients.map((c) => (
              <AnimateStaggerItem key={c}>
                <li
                  className="flex items-baseline gap-3"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 15,
                    lineHeight: 2.2,
                    color: "rgba(255,255,255,0.85)",
                  }}
                >
                  <span style={{ color: "var(--color-bronze)" }}>—</span>
                  <span>{c}</span>
                </li>
              </AnimateStaggerItem>
            ))}
          </AnimateStagger>
          <Animate variant="fadeIn" delay={0.2}>
            <li
              className="italic mt-7"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 13,
                lineHeight: 1.5,
                color: "rgba(255,255,255,0.4)",
              }}
            >
              {ABOUT.whoWeServe.note}
            </li>
          </Animate>
        </ul>
      </div>
    </Section>
  );
}

/* ================================================================
   SECTION 7 — AREAS WE SERVE
   ================================================================ */
function AreasWeServe() {
  return (
    <Section bg="var(--color-linen)" py="80px">
      <Animate variant="fadeUp" className="text-center">
        <SectionEyebrow>{ABOUT.areas.eyebrow}</SectionEyebrow>
        <h2
          className="font-display mx-auto"
          style={{
            fontWeight: 400,
            fontSize: "clamp(34px, 4vw, 52px)",
            lineHeight: 1.1,
            letterSpacing: "-0.015em",
            marginTop: 20,
            maxWidth: 800,
            color: "var(--color-ink)",
          }}
        >
          {ABOUT.areas.headlineTop}
          <em className="italic font-normal">{ABOUT.areas.headlineEm}</em>
          {ABOUT.areas.headlineBottom}
        </h2>
        <p
          className="mx-auto"
          style={{
            fontSize: 16,
            lineHeight: 1.8,
            color: "var(--color-ash)",
            maxWidth: 600,
            margin: "20px auto 48px",
          }}
        >
          {ABOUT.areas.body}
        </p>
      </Animate>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-2 max-w-[900px] mx-auto">
        {/* Column 1 */}
        <div>
          {ABOUT.areas.col1.map((n) => (
            <p
              key={n}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 15,
                lineHeight: 2.2,
                color: "var(--color-ash)",
              }}
            >
              {n}
            </p>
          ))}
        </div>
        {/* Column 2 */}
        <div>
          {ABOUT.areas.col2.map((n) => (
            <p
              key={n}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 15,
                lineHeight: 2.2,
                color: "var(--color-ash)",
              }}
            >
              {n}
            </p>
          ))}
        </div>
      </div>

      <p
        className="italic text-center mx-auto"
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 13,
          lineHeight: 1.6,
          color: "var(--color-slate)",
          marginTop: 40,
          maxWidth: 600,
        }}
      >
        {ABOUT.areas.note}
      </p>
    </Section>
  );
}

/* ================================================================
   SECTION 8 — FINAL CTA
   ================================================================ */
function FinalCTA() {
  return (
    <Section bg="var(--color-ink)" py="80px" className="text-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left */}
        <Animate variant="fadeLeft">
          <div>
            <SectionEyebrow>{ABOUT.cta.eyebrow}</SectionEyebrow>
          <h2
            className="font-display"
            style={{
              fontWeight: 400,
              fontSize: "clamp(32px, 3.5vw, 48px)",
              lineHeight: 1.1,
              letterSpacing: "-0.015em",
              marginTop: 20,
              color: "#ffffff",
            }}
          >
            {ABOUT.cta.headlineTop}
            <br />
            <em className="italic font-normal">{ABOUT.cta.headlineEm}</em>
          </h2>
          <p
            style={{
              fontSize: 16,
              fontWeight: 300,
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.7)",
              maxWidth: 420,
              marginTop: 20,
            }}
          >
            {ABOUT.cta.body}
          </p>
          </div>
        </Animate>

        {/* Right — card */}
        <Animate variant="fadeRight" delay={0.1}>
        <div
          className="rounded-[4px]"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.12)",
            padding: "40px 36px",
          }}
        >
          <h3
            className="font-display"
            style={{
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: 24,
              lineHeight: 1.2,
              color: "#ffffff",
              marginBottom: 4,
            }}
          >
            {ABOUT.cta.cardHeadline1}
          </h3>
          <h3
            className="font-display"
            style={{
              fontWeight: 400,
              fontSize: 24,
              lineHeight: 1.2,
              color: "#ffffff",
            }}
          >
            {ABOUT.cta.cardHeadline2}
          </h3>

          <div
            aria-hidden="true"
            style={{
              width: "100%",
              height: 1,
              background: "rgba(255,255,255,0.15)",
              margin: "24px 0",
            }}
          />

          <Button href="/contact" variant="primary" mode="light" fullWidth>
            Start Your Project
          </Button>
          <div className="mt-3">
            <Button
              href="/contact"
              variant="ghost"
              mode="light"
              fullWidth
            >
              Schedule a Consultation
            </Button>
          </div>

          <p
            className="text-center"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 12,
              color: "rgba(255,255,255,0.4)",
              marginTop: 20,
            }}
          >
            {ABOUT.cta.caption}
          </p>
        </div>
        </Animate>
      </div>
    </Section>
  );
}

/* ================================================================
   PAGE
   ================================================================ */
export default function AboutPage() {
  return (
    <>
      <PageHero />
      <Philosophy />
      <MeetShane />
      <Team />
      <ExpertiseGrid />
      <WhoWeServe />
      <AreasWeServe />
      <FinalCTA />
    </>
  );
}

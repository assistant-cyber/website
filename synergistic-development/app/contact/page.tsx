import type { Metadata } from "next";
import Image from "next/image";
import { CONTACT } from "@/lib/constants";
import { WARM_CREAM_BLUR } from "@/lib/blur";
import SectionEyebrow from "@/components/SectionEyebrow";
import Button from "@/components/Button";
import ContactForm from "@/components/ContactForm";
import Animate from "@/components/Animate";
import { AnimateStagger, AnimateStaggerItem } from "@/components/AnimateStagger";

export const metadata: Metadata = {
  title:
    "Start Your Project | Synergistic Development · Denver Custom Homes & Advisory",
  description:
    "Ready to start a conversation? Contact Synergistic Development to discuss your custom home, renovation, or owner's representation project in Denver's most desirable neighborhoods.",
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
   SECTION 1 — PAGE HERO (centered, shorter)
   ================================================================ */
function PageHero() {
  return (
    <section
      className="relative w-full"
      style={{ height: "45vh", minHeight: 400, marginTop: "-72px" }}
      aria-label="Contact hero"
    >
      <div className="absolute inset-0">
        <Image
          src={CONTACT.hero.backgroundImage}
          alt={CONTACT.hero.backgroundAlt}
          fill
          priority
          quality={85}
          sizes="100vw"
          placeholder="blur"
          blurDataURL={WARM_CREAM_BLUR}
          style={{ objectFit: "cover" }}
        />
        {/* TODO: Replace with a refined interior detail photo — craftsmanship close-up, architectural detail, or quality finish shot — Shane to provide */}
      </div>

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(20,20,20,0.2) 0%, rgba(20,20,20,0.7) 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative h-full flex items-center justify-center text-center text-white px-6">
        <div className="max-w-[640px]">
          <Animate variant="fadeUp" delay={0} duration={0.7}>
            <SectionEyebrow className="!text-[#b8965a]">
              {CONTACT.hero.eyebrow}
            </SectionEyebrow>
          </Animate>
          <Animate variant="fadeUp" delay={0.15} duration={0.8}>
            <h1
              className="font-display"
              style={{
                fontWeight: 300,
                fontSize: "clamp(38px, 5vw, 68px)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                marginTop: 20,
                color: "#ffffff",
              }}
            >
              {CONTACT.hero.headlineTop}
              <br />
              <em className="italic font-normal">{CONTACT.hero.headlineEm}</em>
            </h1>
          </Animate>
          <Animate variant="fadeUp" delay={0.3} duration={0.8}>
            <p
              className="mx-auto"
              style={{
                fontSize: "clamp(15px, 1.6vw, 17px)",
                fontWeight: 300,
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.85)",
                maxWidth: 480,
                marginTop: 14,
              }}
            >
              {CONTACT.hero.subhead}
            </p>
          </Animate>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 2A — Form (left column)
   ================================================================ */
function FormBlock() {
  return (
    <Animate variant="scaleUp">
      <div
        className="rounded-[4px] bg-white"
        style={{
          border: "1px solid var(--color-sand)",
          padding: "clamp(28px, 4vw, 48px) clamp(24px, 4vw, 44px)",
        }}
      >
        <ContactForm />
      </div>
    </Animate>
  );
}

/* ================================================================
   SECTION 2B — Contact Info + Trust (right column)
   ================================================================ */
function ContactInfoBlock() {
  const info = CONTACT.info;
  return (
    <div className="flex flex-col">
      {/* Direct Contact — dark */}
      <div
        className="rounded-[4px] text-white"
        style={{ background: "var(--color-ink)", padding: "40px 36px" }}
      >
        <SectionEyebrow>Direct Contact</SectionEyebrow>
        <h2
          className="font-display"
          style={{
            fontWeight: 400,
            fontSize: 26,
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
            color: "#ffffff",
            marginTop: 8,
          }}
        >
          Prefer to reach out
          <br />
          <em className="italic font-normal">directly?</em>
        </h2>

        <div
          aria-hidden="true"
          style={{
            width: "100%",
            height: 1,
            background: "rgba(255,255,255,0.12)",
            margin: "24px 0",
          }}
        />

        <div className="mb-5">
          <span
            className="block uppercase"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.16em",
              color: "rgba(255,255,255,0.45)",
            }}
          >
            Email
          </span>
          <p
            className="mt-1"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 15,
              color: "#ffffff",
            }}
          >
            {info.email}
          </p>
        </div>

        <div className="mb-5">
          <span
            className="block uppercase"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.16em",
              color: "rgba(255,255,255,0.45)",
            }}
          >
            Phone
          </span>
          <p
            className="mt-1"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 15,
              color: "#ffffff",
            }}
          >
            {info.phone}
          </p>
        </div>

        <div className="mb-5">
          <span
            className="block uppercase"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.16em",
              color: "rgba(255,255,255,0.45)",
            }}
          >
            Based In
          </span>
          <p
            className="mt-1"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 15,
              color: "#ffffff",
              lineHeight: 1.5,
            }}
          >
            {info.location}
            <br />
            <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>
              {info.locationSub}
            </span>
          </p>
        </div>

        <div
          aria-hidden="true"
          style={{
            width: "100%",
            height: 1,
            background: "rgba(255,255,255,0.12)",
            margin: "28px 0",
          }}
        />

        <p
          className="font-display"
          style={{
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: 18,
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.7)",
          }}
        >
          &ldquo;{info.tagline}&rdquo;
        </p>
      </div>

      {/* What to Expect */}
      <div
        className="rounded-[4px] bg-white"
        style={{
          border: "1px solid var(--color-sand)",
          padding: "32px 28px",
          marginTop: 16,
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
            marginBottom: 20,
          }}
        >
          What to Expect
        </span>
        <ul className="flex flex-col">
          {CONTACT.whatToExpect.map((step, i) => (
            <li
              key={step.number}
              className={i > 0 ? "pt-6 mt-6 border-t border-[#f0ece6]" : ""}
            >
              <div className="flex items-baseline gap-3">
                <span
                  className="font-display shrink-0"
                  style={{
                    fontWeight: 300,
                    fontSize: 20,
                    color: "var(--color-sand)",
                    lineHeight: 1,
                  }}
                >
                  {step.number}
                </span>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 13,
                    fontWeight: 500,
                    letterSpacing: "0.06em",
                    color: "var(--color-ink)",
                  }}
                >
                  {step.title}
                </p>
              </div>
              <p
                className="mt-2 ml-[32px]"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  lineHeight: 1.6,
                  color: "var(--color-slate)",
                }}
              >
                {step.description}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Areas We Serve */}
      <div
        className="rounded-[4px]"
        style={{
          background: "var(--color-linen)",
          padding: "28px 28px",
          marginTop: 16,
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
            marginBottom: 14,
          }}
        >
          Areas We Serve
        </span>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 14,
            lineHeight: 2.0,
            color: "var(--color-ash)",
          }}
        >
          Cherry Creek · Cherry Hills Village · Greenwood Village · Bow Mar ·
          Washington Park · Bonnie Brae · Highlands · Observatory Park ·
          Hilltop · Castle Pines · Evergreen · Boulder + surrounding communities
        </p>
      </div>
    </div>
  );
}

/* ================================================================
   SECTION 3 — Trust band (dark, single testimonial + stats)
   ================================================================ */
function TrustBand() {
  const t = CONTACT.testimonial;
  return (
    <Section bg="var(--color-ink)" py="80px" className="text-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* Left — testimonial */}
        <Animate variant="fadeLeft">
          <div>
          <div
            aria-hidden="true"
            className="font-display"
            style={{
              fontWeight: 300,
              fontSize: 96,
              lineHeight: 0.6,
              color: "var(--color-bronze)",
              opacity: 0.4,
            }}
          >
            &ldquo;
          </div>
          <blockquote
            className="font-display"
            style={{
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: 22,
              lineHeight: 1.6,
              color: "#ffffff",
              maxWidth: 460,
            }}
          >
            {t.quote}
          </blockquote>
          {/* TODO: Replace with real verified testimonial from Shane */}
          <p
            className="uppercase"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: "0.16em",
              color: "rgba(255,255,255,0.5)",
              marginTop: 24,
            }}
          >
            &mdash; {t.attribution}
          </p>
          </div>
        </Animate>

        {/* Right — stats, stacked */}
        <AnimateStagger staggerDelay={0.12} className="flex flex-col self-center">
          {CONTACT.stats.map((s, i) => (
            <AnimateStaggerItem key={i}>
              <div
                className={`py-7 ${i > 0 ? "border-t border-[rgba(255,255,255,0.1)]" : ""} ${
                  i === CONTACT.stats.length - 1 ? "pb-0" : ""
                }`}
              >
                <dt
                  className="font-display"
                  style={{
                    fontWeight: 300,
                    fontSize: 52,
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                    color: "#ffffff",
                  }}
                >
                  {s.number}
                </dt>
                <dd
                  className="uppercase mt-3"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: "0.18em",
                    color: "rgba(255,255,255,0.45)",
                  }}
                >
                  {s.label}
                </dd>
              </div>
            </AnimateStaggerItem>
          ))}
        </AnimateStagger>
      </div>
    </Section>
  );
}

/* ================================================================
   SECTION 4 — Alternate path (Advisory)
   ================================================================ */
function AdvisoryPath() {
  const a = CONTACT.advisory;
  return (
    <Section bg="var(--color-linen)" py="80px">
      <Animate variant="fadeUp" className="text-center mx-auto" style={{ maxWidth: 720 }}>
        <SectionEyebrow>{a.eyebrow}</SectionEyebrow>
        <h2
          className="font-display"
          style={{
            fontWeight: 400,
            fontSize: "clamp(32px, 4vw, 48px)",
            lineHeight: 1.1,
            letterSpacing: "-0.015em",
            marginTop: 20,
            color: "var(--color-ink)",
          }}
        >
          {a.headlineTop}
          <br />
          <em className="italic font-normal">{a.headlineEm}</em>
        </h2>
        <p
          className="mx-auto"
          style={{
            fontSize: 16,
            lineHeight: 1.8,
            color: "var(--color-ash)",
            maxWidth: 580,
            margin: "20px auto 0",
          }}
        >
          {a.body1}
        </p>
        <p
          className="mx-auto"
          style={{
            fontSize: 16,
            lineHeight: 1.8,
            color: "var(--color-ash)",
            maxWidth: 580,
            margin: "16px auto 0",
          }}
        >
          {a.body2}
        </p>

        <div
          aria-hidden="true"
          style={{
            width: 60,
            height: 1,
            background: "var(--color-sand)",
            margin: "32px auto",
          }}
        />

        <Button href="#contact-form" variant="primary">
          Schedule a Consultation
        </Button>
        <p
          className="text-center mx-auto"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 13,
            color: "var(--color-slate)",
            marginTop: 14,
            maxWidth: 480,
          }}
        >
          {a.caption}
        </p>
      </Animate>
    </Section>
  );
}

/* ================================================================
   SECTION 5 — Closing grace note
   ================================================================ */
function ClosingNote() {
  const c = CONTACT.closing;
  return (
    <Section bg="var(--color-white)" py="60px">
      <Animate variant="fadeIn" className="text-center mx-auto" style={{ maxWidth: 600 }}>
        <p
          className="font-display"
          style={{
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: 28,
            lineHeight: 1.5,
            color: "var(--color-ink)",
          }}
        >
          &ldquo;{c.quote}&rdquo;
        </p>
        <p
          className="uppercase"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: "0.16em",
            color: "var(--color-slate)",
            marginTop: 20,
          }}
        >
          {c.attribution}
        </p>
      </Animate>
    </Section>
  );
}

/* ================================================================
   PAGE
   ================================================================ */
export default function ContactPage() {
  return (
    <>
      <PageHero />

      <Section bg="var(--color-cream)">
        <div
          className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-16 items-start"
          id="contact-form"
        >
          <FormBlock />
          <Animate variant="fadeUp" delay={0.1}>
            <ContactInfoBlock />
          </Animate>
        </div>
      </Section>

      <TrustBand />
      <AdvisoryPath />
      <ClosingNote />
    </>
  );
}

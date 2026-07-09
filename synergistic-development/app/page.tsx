import Image from "next/image";
import Link from "next/link";
import {
  SERVICES,
  EXPERTISE_ITEMS,
  PROCESS_STEPS,
  PROJECTS,
  STATS,
  NEIGHBORHOODS,
} from "@/lib/constants";
import { WARM_CREAM_BLUR } from "@/lib/blur";
import SectionEyebrow from "@/components/SectionEyebrow";
import Button from "@/components/Button";
import ArrowLink from "@/components/ArrowLink";
import TestimonialSlider from "@/components/TestimonialSlider";
import Animate from "@/components/Animate";
import { AnimateStagger, AnimateStaggerItem } from "@/components/AnimateStagger";
import AnimatedCounter from "@/components/AnimatedCounter";

/* ------------------------------------------------------------------
   Section helper — wraps each section with consistent vertical
   rhythm using the design system's section gap token.
   ------------------------------------------------------------------ */
function Section({
  id,
  children,
  bg,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  bg?: string;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={className}
      style={{
        background: bg,
        paddingTop: "var(--section-gap)",
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
        {children}
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 1 — HERO
   ================================================================ */
function Hero() {
  return (
    <section
      className="relative w-full"
      style={{
        height: "100vh",
        minHeight: 600,
        marginTop: "-72px", // tuck under fixed nav
      }}
      aria-label="Hero"
    >
      {/* Background video */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/video/hero-poster.jpg"
          aria-label="Luxury custom home — interior film, Synergistic Development"
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
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(20,20,20,0.25) 0%, rgba(20,20,20,0.55) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Text block — lower left */}
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
              Luxury Home Building · Renovation · Consulting
            </SectionEyebrow>
          </Animate>

          <Animate variant="fadeUp" delay={0.1} duration={0.8}>
            <h1
              className="font-display"
              style={{
                fontWeight: 300,
                fontSize: "clamp(44px, 6vw, 84px)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                marginTop: 24,
                color: "#ffffff",
              }}
            >
              For Those Who Expect
              <br />
              More Than a <em className="italic font-normal">Builder.</em>
            </h1>
          </Animate>

          <Animate variant="fadeUp" delay={0.25} duration={0.8}>
            <p
              className="font-light"
              style={{
                fontSize: "clamp(15px, 1.6vw, 18px)",
                lineHeight: 1.6,
                marginTop: 20,
                maxWidth: 480,
                color: "rgba(255,255,255,0.92)",
              }}
            >
              Synergistic Development provides luxury homebuilding, renovation, and
              consulting services for homeowners who value expertise,
              transparency, and exceptional craftsmanship. Serving Denver&rsquo;s
              premier neighborhoods.
            </p>
          </Animate>

          <Animate variant="fadeUp" delay={0.4} duration={0.7}>
            <div className="flex flex-col sm:flex-row gap-4 mt-9">
              <Button href="/contact" variant="primary" mode="light">
                Start Your Project
              </Button>
              <Button href="/portfolio" variant="ghost" mode="light">
                View Our Portfolio
              </Button>
            </div>
          </Animate>
        </div>

        {/* Scroll indicator — hidden on mobile */}
        <div
          aria-hidden="true"
          className="hidden md:flex absolute left-1/2 -translate-x-1/2 flex-col items-center"
          style={{ bottom: 32 }}
        >
          <div
            style={{
              width: 2,
              height: 40,
              background: "rgba(255,255,255,0.6)",
            }}
          />
          <span
            style={{
              fontSize: 10,
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.6)",
              marginTop: 8,
            }}
          >
            SCROLL
          </span>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 2 — WHY HOMEOWNERS CHOOSE SD
   ================================================================ */
function WhyChoose() {
  return (
    <Section bg="var(--color-cream)">
      <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-20 items-start">
        {/* Left */}
        <Animate variant="fadeLeft">
          <div>
            <SectionEyebrow>For Those Who Expect More Than a Builder</SectionEyebrow>
            <h2
              className="font-display"
              style={{
                fontWeight: 400,
                fontSize: "clamp(34px, 4vw, 54px)",
                lineHeight: 1.1,
                letterSpacing: "-0.015em",
                marginTop: 24,
                color: "var(--color-ink)",
              }}
            >
              Building or renovating a home is one of the largest investments
              you&rsquo;ll ever <em className="italic font-normal">make.</em>
            </h2>
            <p
              className="body-prose-narrow"
              style={{ marginTop: 24 }}
            >
              You deserve more than a contractor &mdash; you deserve an experienced
              advisor.
            </p>
            <p
              className="body-prose-narrow"
              style={{ marginTop: 16 }}
            >
              For more than 20 years, Synergistic Development has helped homeowners
              throughout Denver&rsquo;s most desirable communities navigate
              custom homes, transformative renovations, and complex residential
              projects with confidence.
            </p>
            <p
              className="body-prose-narrow"
              style={{ marginTop: 16 }}
            >
              As both builder and consultant, we provide the expertise,
              transparency, and accountability needed to protect your investment
              from concept to completion.
            </p>
          </div>
        </Animate>

        {/* Right — stats */}
        <Animate variant="fadeRight" delay={0.1}>
          <div className="lg:pl-8 lg:border-l lg:border-[#e0d8cc]">
            <AnimateStagger staggerDelay={0.15} className="flex flex-col">
              {STATS.map((stat, i) => (
                <AnimateStaggerItem key={i}>
                  <div
                    className={`py-10 ${
                      i > 0 ? "border-t border-[#e0d8cc]" : ""
                    } ${i === STATS.length - 1 ? "pb-0" : ""}`}
                  >
                    <dt
                      className="font-display"
                      style={{
                        fontWeight: 300,
                        fontSize: 64,
                        lineHeight: 1,
                        letterSpacing: "-0.02em",
                        color: "var(--color-ink)",
                      }}
                    >
                      {stat.value === "20+" ? (
                        <AnimatedCounter value={20} suffix="+" />
                      ) : (
                        stat.value
                      )}
                    </dt>
                    <dd
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
                    </dd>
                    {stat.detail && (
                      <dd
                        className="uppercase mt-2"
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: 11,
                          fontWeight: 400,
                          letterSpacing: "0.15em",
                          color: "var(--color-slate)",
                          opacity: 0.8,
                        }}
                      >
                        {stat.detail}
                      </dd>
                    )}
                  </div>
                </AnimateStaggerItem>
              ))}
            </AnimateStagger>
          </div>
        </Animate>
      </div>
    </Section>
  );
}

/* ================================================================
   SECTION 3 — SERVICES
   ================================================================ */
function ServicesSection() {
  return (
    <Section bg="var(--color-white)">
      <Animate variant="fadeUp" className="text-center">
        <SectionEyebrow>What We Do</SectionEyebrow>
        <h2
          className="font-display mx-auto"
          style={{
            fontWeight: 400,
            fontSize: "clamp(34px, 4vw, 54px)",
            lineHeight: 1.1,
            letterSpacing: "-0.015em",
            marginTop: 20,
            maxWidth: 720,
            color: "var(--color-ink)",
          }}
        >
          Building. Renovation. <em className="italic font-normal">Advisory.</em>
        </h2>
      </Animate>

      <AnimateStagger staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
        {SERVICES.map((service) => (
          <AnimateStaggerItem key={service.number}>
            <div className="bg-white p-10 border border-[#e0d8cc] rounded-[4px] transition-all duration-300 hover:shadow-[var(--shadow-card)] hover:border-[#b8965a] h-full">
              <div
                className="font-display"
                style={{
                  fontWeight: 300,
                  fontSize: 72,
                  lineHeight: 1,
                  color: "var(--color-sand)",
                }}
                aria-hidden="true"
              >
                {service.number}
              </div>
              <h3
                className="font-display mt-8"
                style={{
                  fontWeight: 400,
                  fontSize: 28,
                  lineHeight: 1.2,
                  letterSpacing: "-0.01em",
                  color: "var(--color-ink)",
                }}
              >
                {service.title}
              </h3>
              <p
                className="mt-4"
                style={{
                  fontSize: 15,
                  lineHeight: 1.75,
                  color: "var(--color-ash)",
                }}
              >
                {service.body}
              </p>
              <div className="mt-7">
                <ArrowLink href={service.href}>Learn More</ArrowLink>
              </div>
            </div>
          </AnimateStaggerItem>
        ))}
      </AnimateStagger>
    </Section>
  );
}

/* ================================================================
   SECTION 4 — EXPERTISE BEYOND CONSTRUCTION (dark band)
   ================================================================ */
function ExpertiseSection() {
  return (
    <Section bg="var(--color-ink)" className="text-white">
      <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-12 lg:gap-20">
        {/* Left */}
        <Animate variant="fadeLeft">
          <div>
            <SectionEyebrow>Expertise Beyond Construction</SectionEyebrow>
            <h2
              className="font-display"
              style={{
                fontWeight: 400,
                fontSize: "clamp(34px, 4vw, 54px)",
                lineHeight: 1.1,
                letterSpacing: "-0.015em",
                marginTop: 24,
                color: "#ffffff",
              }}
            >
              We navigate the complexities
              <br />
              others <em className="italic font-normal">can&rsquo;t.</em>
            </h2>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.75,
                marginTop: 24,
                maxWidth: 400,
                color: "rgba(255,255,255,0.7)",
              }}
            >
              Many of our projects involve far more than building. Our experience
              working within highly regulated communities helps clients avoid
              delays, reduce costs, and move projects forward with confidence.
            </p>
          </div>
        </Animate>

        {/* Right — grid of expertise */}
        <AnimateStagger
          staggerDelay={0.06}
          className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3 self-end"
        >
          {EXPERTISE_ITEMS.map((item) => (
            <AnimateStaggerItem key={item}>
              <li
                className="flex items-baseline gap-3"
                style={{
                  fontSize: 13,
                  lineHeight: 1.7,
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                <span style={{ color: "var(--color-bronze)" }}>—</span>
                <span>{item}</span>
              </li>
            </AnimateStaggerItem>
          ))}
        </AnimateStagger>
      </div>
    </Section>
  );
}

/* ================================================================
   SECTION 5 — OUR APPROACH (process preview)
   ================================================================ */
function ApproachSection() {
  return (
    <Section bg="var(--color-linen)">
      <Animate variant="fadeUp" className="text-center">
        <SectionEyebrow>The SD Experience</SectionEyebrow>
        <h2
          className="font-display mx-auto"
          style={{
            fontWeight: 400,
            fontSize: "clamp(34px, 4vw, 54px)",
            lineHeight: 1.1,
            letterSpacing: "-0.015em",
            marginTop: 20,
            maxWidth: 720,
            color: "var(--color-ink)",
          }}
        >
          A Proven Process.
          <br />
          A <em className="italic font-normal">Trusted</em> Advisor.
        </h2>
        <p
          className="mx-auto mt-4"
          style={{
            fontSize: 18,
            fontWeight: 300,
            lineHeight: 1.6,
            color: "var(--color-slate)",
            maxWidth: 520,
          }}
        >
          Every successful project begins long before construction starts.
        </p>
      </Animate>

      <AnimateStagger staggerDelay={0.08} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mt-20">
        {PROCESS_STEPS.map((step) => (
          <AnimateStaggerItem key={step.number}>
            <div>
              <div
                className="font-display"
                style={{
                  fontWeight: 300,
                  fontSize: 80,
                  lineHeight: 1,
                  color: "var(--color-sand)",
                }}
                aria-hidden="true"
              >
                {step.number}
              </div>
              <h3
                className="font-display mt-4"
                style={{
                  fontWeight: 400,
                  fontSize: 24,
                  lineHeight: 1.2,
                  letterSpacing: "-0.01em",
                  color: "var(--color-ink)",
                }}
              >
                {step.name}
              </h3>
              <p
                className="mt-3"
                style={{
                  fontSize: 14,
                  lineHeight: 1.7,
                  color: "var(--color-slate)",
                }}
              >
                {step.description}
              </p>
            </div>
          </AnimateStaggerItem>
        ))}
      </AnimateStagger>

      <Animate variant="fadeIn" delay={0.3} className="text-center mt-16">
        <ArrowLink href="/process" bronze>
          See The Full Process
        </ArrowLink>
      </Animate>
    </Section>
  );
}

/* ================================================================
   SECTION 6 — FEATURED PROJECTS
   ================================================================ */
function FeaturedProjects() {
  const heroProject = PROJECTS.find((p) => p.featured);
  const gridProjects = PROJECTS.filter((p) => !p.featured);
  if (!heroProject) return null;

  return (
    <Section bg="var(--color-white)">
      <Animate variant="fadeUp" className="text-center">
        <SectionEyebrow>Featured Projects</SectionEyebrow>
        <h2
          className="font-display mx-auto"
          style={{
            fontWeight: 400,
            fontSize: "clamp(34px, 4vw, 54px)",
            lineHeight: 1.1,
            letterSpacing: "-0.015em",
            marginTop: 20,
            maxWidth: 800,
            color: "var(--color-ink)",
          }}
        >
          <em className="italic font-normal">Exceptional</em> Work Across
          <br />
          Denver&rsquo;s Premier Neighborhoods
        </h2>
      </Animate>

      {/* Hero project tile */}
      <Animate variant="scaleUp" delay={0.1} duration={0.9}>
        <div
          className="project-tile mt-16 relative rounded-[2px] overflow-hidden"
          style={{ height: "60vh", minHeight: 420 }}
        >
          <Image
            src={heroProject.image}
            alt={heroProject.alt}
            fill
            sizes="(max-width: 768px) 100vw, 1320px"
            quality={85}
            placeholder="blur"
            blurDataURL={WARM_CREAM_BLUR}
            style={{ objectFit: "cover" }}
          />
          <div
            className="project-overlay absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(20,20,20,0.6) 0%, rgba(20,20,20,0.05) 60%)",
            }}
            aria-hidden="true"
          />
          <Link
            href={heroProject.href}
            className="absolute bottom-8 left-8 text-white"
            aria-label={`View ${heroProject.title} in ${heroProject.eyebrow}`}
          >
            <SectionEyebrow hero>{heroProject.eyebrow}</SectionEyebrow>
            <p style={{ fontSize: 16, marginTop: 8 }}>{heroProject.title}</p>
          </Link>
        </div>
      </Animate>

      {/* 3-col grid */}
      <AnimateStagger staggerDelay={0.06} className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {gridProjects.map((project) => (
          <AnimateStaggerItem key={project.id}>
            <Link
              href={project.href}
              className="project-tile relative rounded-[2px] overflow-hidden block"
              style={{ height: 280 }}
              aria-label={`View ${project.title} in ${project.eyebrow}`}
            >
              <Image
                src={project.image}
                alt={project.alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                quality={80}
                placeholder="blur"
                blurDataURL={WARM_CREAM_BLUR}
                style={{ objectFit: "cover" }}
              />
              <div
                className="project-overlay absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(20,20,20,0.55) 0%, rgba(20,20,20,0.05) 60%)",
                }}
                aria-hidden="true"
              />
              <div className="absolute bottom-6 left-6 text-white">
                <SectionEyebrow hero>{project.eyebrow}</SectionEyebrow>
                <p style={{ fontSize: 14, marginTop: 6 }}>{project.title}</p>
              </div>
            </Link>
          </AnimateStaggerItem>
        ))}
      </AnimateStagger>

      <Animate variant="fadeIn" delay={0.2} className="text-center mt-12">
        <Button href="/portfolio" variant="primary">
          View Our Portfolio
        </Button>
      </Animate>
    </Section>
  );
}

/* ================================================================
   SECTION 7 — OWNER'S REPRESENTATION CALLOUT
   ================================================================ */
function OwnerRepCallout() {
  return (
    <Section bg="var(--color-cream)">
      <Animate variant="fadeUp" className="mx-auto text-center" style={{ maxWidth: 760 }}>
        <SectionEyebrow>Owner&rsquo;s Representation &amp; Advisory</SectionEyebrow>
        <h2
          className="font-display"
          style={{
            fontWeight: 400,
            fontSize: "clamp(34px, 4vw, 54px)",
            lineHeight: 1.1,
            letterSpacing: "-0.015em",
            marginTop: 20,
            color: "var(--color-ink)",
          }}
        >
          Need Guidance Before
          <br />
          You <em className="italic font-normal">Build?</em>
        </h2>

        <p
          className="mx-auto"
          style={{
            fontSize: 16,
            lineHeight: 1.75,
            color: "var(--color-ash)",
            marginTop: 20,
          }}
        >
          Many clients engage us before selecting a builder, purchasing a
          property, or beginning the design process. Whether you&rsquo;re
          evaluating a renovation, navigating historic district requirements,
          seeking HOA approval, or planning a custom home &mdash; we provide
          experienced guidance to help you move forward with confidence.
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

        <blockquote
          className="font-display mx-auto"
          style={{
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: 28,
            lineHeight: 1.4,
            color: "var(--color-ash)",
            maxWidth: 640,
          }}
        >
          &ldquo;Architects represent design. Contractors represent
          construction. Real estate agents represent the transaction. Who
          represents <em className="font-normal">you?</em>&rdquo;
        </blockquote>

        <div className="mt-10">
          <Button href="/contact" variant="primary">
            Schedule a Consultation
          </Button>
        </div>
      </Animate>
    </Section>
  );
}

/* ================================================================
   SECTION 8 — CLIENT REFLECTIONS (testimonials, dark)
   ================================================================ */
function ClientReflections() {
  return (
    <Section bg="var(--color-ink)" className="text-white">
      <div className="text-center">
        <SectionEyebrow>Client Reflections</SectionEyebrow>
        <h2
          className="font-display mx-auto"
          style={{
            fontWeight: 400,
            fontSize: "clamp(34px, 4vw, 54px)",
            lineHeight: 1.1,
            letterSpacing: "-0.015em",
            marginTop: 20,
            color: "#ffffff",
          }}
        >
          What Our Clients <em className="italic font-normal">Say</em>
        </h2>
      </div>

      <div className="mt-16">
        <TestimonialSlider />
      </div>

      {/* TODO: Replace placeholder testimonials with real ones from Shane */}
    </Section>
  );
}

/* ================================================================
   SECTION 9 — NEIGHBORHOODS SERVED
   ================================================================ */
function Neighborhoods() {
  return (
    <Section bg="var(--color-linen)">
      <div className="grid grid-cols-1 lg:grid-cols-[30%_70%] gap-12 lg:gap-20">
        <div>
          <SectionEyebrow>Where We Work</SectionEyebrow>
          <h2
            className="font-display"
            style={{
              fontWeight: 400,
              fontSize: 40,
              lineHeight: 1.1,
              letterSpacing: "-0.015em",
              marginTop: 20,
              color: "var(--color-ink)",
            }}
          >
            Denver&rsquo;s Most
            <br />
            <em className="italic font-normal">Desirable</em>
            <br />
            Neighborhoods
          </h2>
        </div>

        <div>
          <p
            style={{
              fontSize: 15,
              lineHeight: 2,
              color: "var(--color-ash)",
            }}
          >
            {NEIGHBORHOODS.map((n, i) => (
              <span key={n}>
                {n}
                {i < NEIGHBORHOODS.length - 1 && (
                  <span style={{ color: "var(--color-slate)" }}> · </span>
                )}
              </span>
            ))}
          </p>
          <p
            style={{
              fontSize: 13,
              lineHeight: 1.6,
              color: "var(--color-slate)",
              marginTop: 20,
              maxWidth: 540,
            }}
          >
            We understand the unique permitting requirements, design review
            processes, HOA standards, and neighborhood character that
            influence successful projects throughout Colorado.
          </p>
        </div>
      </div>
    </Section>
  );
}

/* ================================================================
   SECTION 10 — FINAL CTA BAND (bronze)
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
            fontSize: "clamp(34px, 4.5vw, 52px)",
            lineHeight: 1.1,
            letterSpacing: "-0.015em",
            color: "#ffffff",
          }}
        >
          Ready to Start Your <em className="italic font-normal">Project?</em>
        </h2>
        <p
          className="mx-auto"
          style={{
            fontSize: 16,
            fontWeight: 300,
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.85)",
            maxWidth: 480,
            marginTop: 20,
          }}
        >
          Whether you&rsquo;re building a custom home, planning a major
          renovation, or simply looking for an experienced second opinion
          &mdash; we&rsquo;re here.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-10">
          <Button href="/contact" variant="primary" mode="light">
            Start Your Project
          </Button>
          <Button href="/portfolio" variant="ghost" mode="light">
            View Our Work
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   PAGE
   ================================================================ */
export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyChoose />
      <ServicesSection />
      <ExpertiseSection />
      <ApproachSection />
      <FeaturedProjects />
      <OwnerRepCallout />
      <ClientReflections />
      <Neighborhoods />
      <FinalCTA />
    </>
  );
}

import Link from "next/link";
import { NAV_LINKS, FOOTER_TAGLINE, FOOTER_SERVICES } from "@/lib/constants";
import Button from "./Button";
import SectionEyebrow from "./SectionEyebrow";

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white">
      <div
        className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16"
        style={{
          maxWidth: "var(--page-max)",
          margin: "0 auto",
          padding: "clamp(64px, 8vw, 96px) clamp(20px, 5vw, 80px)",
        }}
      >
        {/* Column 1 — Brand */}
        <div>
          <div className="flex items-baseline gap-1 mb-6">
            <span className="font-medium tracking-[0.22em] text-[13px] uppercase text-white">
              Synergistic
            </span>
            <span className="font-normal tracking-[0.18em] text-[13px] uppercase text-white">
              Development
            </span>
          </div>
          <p
            className="font-display italic text-[20px] leading-[1.4]"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            {FOOTER_TAGLINE}
          </p>
          <p
            className="text-[13px] mt-6"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            {FOOTER_SERVICES}
          </p>
        </div>

        {/* Column 2 — Navigation */}
        <div>
          <SectionEyebrow className="mb-6">Navigation</SectionEyebrow>
          <ul className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="footer-link text-[13px]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 — Contact */}
        <div>
          <SectionEyebrow className="mb-6">Get In Touch</SectionEyebrow>
          <Button href="/contact" variant="primary" mode="light">
            Start Your Project
          </Button>
          <p
            className="text-[13px] mt-6 leading-[1.6]"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            Serving Denver&rsquo;s most desirable neighborhoods.
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-2"
          style={{
            maxWidth: "var(--page-max)",
            margin: "0 auto",
            padding: "24px clamp(20px, 5vw, 80px)",
          }}
        >
          <p
            className="text-[12px]"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            &copy; 2025 Synergistic Development &middot; Denver, Colorado
          </p>
        </div>
      </div>
    </footer>
  );
}

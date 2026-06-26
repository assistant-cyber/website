"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { NAV_LINKS } from "@/lib/constants";
import Button from "./Button";

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Subtle shadow after 80px scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when menu open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Focus trap + escape close
  useEffect(() => {
    if (!menuOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        return;
      }
      if (e.key === "Tab" && menuRef.current) {
        const focusables = menuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKey);
    // Focus the close button on open
    closeBtnRef.current?.focus();

    return () => document.removeEventListener("keydown", handleKey);
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 bg-white border-b border-[#e0d8cc] transition-shadow duration-300 ${
          scrolled ? "shadow-[0_2px_20px_rgba(26,26,26,0.08)]" : ""
        }`}
        style={{ height: 72 }}
      >
        <div
          className="h-full flex items-center justify-between"
          style={{ padding: "0 clamp(24px, 5vw, 80px)" }}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-baseline gap-1 text-[#1a1a1a] hover:opacity-80 transition-opacity"
            aria-label="Synergistic Development — Home"
          >
            <span className="font-medium tracking-[0.22em] text-[13px] uppercase">
              Synergistic
            </span>
            <span className="font-normal tracking-[0.18em] text-[13px] uppercase">
              Development
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-10" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[12px] tracking-[0.12em] uppercase transition-colors duration-200 ${
                  isActive(link.href)
                    ? "text-[#1a1a1a]"
                    : "text-[#888888] hover:text-[#1a1a1a]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Button href="/contact" variant="primary" size="small">
              Start Your Project
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="lg:hidden w-11 h-11 flex items-center justify-center -mr-2"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1a1a1a"
              strokeWidth="1.5"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <line x1="3" y1="7" x2="21" y2="7" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="17" x2="21" y2="17" />
            </svg>
          </button>
        </div>
      </header>

      {/* Spacer so content doesn't sit under fixed nav */}
      <div aria-hidden="true" style={{ height: 72 }} />

      {/* Mobile menu overlay */}
      <div
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`fixed inset-0 z-[60] bg-white transition-transform duration-350 ease-out lg:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ transitionDuration: "350ms" }}
        aria-hidden={!menuOpen}
      >
        {/* Close */}
        <div className="flex items-center justify-end" style={{ padding: "16px 24px", height: 72 }}>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={() => setMenuOpen(false)}
            className="w-11 h-11 flex items-center justify-center -mr-2"
            aria-label="Close menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1a1a1a"
              strokeWidth="1.5"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>
        </div>

        {/* Links */}
        <nav
          className="flex flex-col items-center justify-center gap-8 px-6"
          style={{ minHeight: "calc(100vh - 72px - 100px)" }}
          aria-label="Mobile primary"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              ref={link.href === NAV_LINKS[0].href ? firstLinkRef : undefined}
              href={link.href}
              className={`font-display text-[36px] font-normal leading-[1.1] tracking-[-0.015em] transition-colors duration-200 ${
                isActive(link.href) ? "text-[#1a1a1a]" : "text-[#888888] hover:text-[#1a1a1a]"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex justify-center pb-12 px-6">
          <Button
            href="/contact"
            variant="primary"
            fullWidth
            onClick={() => setMenuOpen(false)}
          >
            Start Your Project
          </Button>
        </div>
      </div>
    </>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { NAV_LINKS, type NavLink } from "@/lib/constants";
import Button from "./Button";

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
    setOpenDropdown(null);
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

  // Focus trap + escape close (mobile menu)
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
    closeBtnRef.current?.focus();

    return () => document.removeEventListener("keydown", handleKey);
  }, [menuOpen]);

  // Click outside to close desktop dropdown
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    };
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const isChildActive = (link: NavLink) =>
    link.children?.some((c) => isActive(c.href)) ?? false;

  const openWithDelay = (label: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setOpenDropdown(label);
  };

  const closeWithDelay = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

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
          <nav
            ref={navRef}
            className="hidden lg:flex items-center gap-10"
            aria-label="Primary"
          >
            {NAV_LINKS.map((link) => {
              const hasChildren = !!link.children?.length;
              const active = isActive(link.href) || isChildActive(link);
              const isOpen = openDropdown === link.label;

              if (!hasChildren) {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-[14px] font-medium tracking-[0.14em] uppercase transition-colors duration-200 ${
                      active
                        ? "text-[#1a1a1a]"
                        : "text-[#4a4a4a] hover:text-[#1a1a1a]"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              }

              return (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => openWithDelay(link.label)}
                  onMouseLeave={closeWithDelay}
                >
                  <Link
                    href={link.href}
                    className={`flex items-center gap-1.5 text-[14px] font-medium tracking-[0.14em] uppercase transition-colors duration-200 ${
                      active
                        ? "text-[#1a1a1a]"
                        : "text-[#4a4a4a] hover:text-[#1a1a1a]"
                    }`}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    onClick={(e) => {
                      // If the parent is also a real link, allow normal click;
                      // the dropdown gives the user a second option.
                      // Prevent the link from navigating if the user just wants
                      // to open the menu (handled by hover, not click).
                    }}
                  >
                    {link.label}
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      style={{
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 200ms ease",
                      }}
                    >
                      <path d="M2 3.5 L5 6.5 L8 3.5" />
                    </svg>
                  </Link>

                  {/* Dropdown */}
                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 ${
                      isOpen
                        ? "opacity-100 visible translate-y-0"
                        : "opacity-0 invisible -translate-y-1 pointer-events-none"
                    }`}
                    style={{
                      transition: "opacity 200ms ease, transform 200ms ease",
                      minWidth: 220,
                    }}
                    onMouseEnter={() => openWithDelay(link.label)}
                    onMouseLeave={closeWithDelay}
                  >
                    <div
                      className="bg-white border border-[#e0d8cc] rounded-[2px] shadow-[0_8px_24px_rgba(26,26,26,0.08)] py-2"
                    >
                      {link.children!.map((child) => {
                        const childActive = isActive(child.href);
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`block px-5 py-2.5 text-[13px] font-medium tracking-[0.12em] uppercase transition-colors duration-200 ${
                              childActive
                                ? "text-[#1a1a1a] bg-[var(--color-cream,#faf9f7)]"
                                : "text-[#4a4a4a] hover:text-[#1a1a1a] hover:bg-[var(--color-cream,#faf9f7)]"
                            }`}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
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
          className="flex flex-col items-center justify-center gap-6 px-6 overflow-y-auto"
          style={{ minHeight: "calc(100vh - 72px - 100px)" }}
          aria-label="Mobile primary"
        >
          {NAV_LINKS.map((link) => {
            const hasChildren = !!link.children?.length;
            const active = isActive(link.href) || isChildActive(link);

            if (!hasChildren) {
              return (
                <Link
                  key={link.href}
                  ref={link.href === NAV_LINKS[0].href ? firstLinkRef : undefined}
                  href={link.href}
                  className={`font-display text-[36px] font-normal leading-[1.1] tracking-[-0.015em] transition-colors duration-200 ${
                    active ? "text-[#1a1a1a]" : "text-[#888888] hover:text-[#1a1a1a]"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              );
            }

            return (
              <div
                key={link.href}
                className="flex flex-col items-center gap-3"
              >
                <Link
                  href={link.href}
                  className={`font-display text-[36px] font-normal leading-[1.1] tracking-[-0.015em] transition-colors duration-200 ${
                    active ? "text-[#1a1a1a]" : "text-[#888888] hover:text-[#1a1a1a]"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
                <div className="flex flex-col items-center gap-2 -mt-2">
                  {link.children!.map((child) => {
                    const childActive = isActive(child.href);
                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`text-[16px] font-medium tracking-[0.12em] uppercase transition-colors duration-200 ${
                          childActive
                            ? "text-[#1a1a1a]"
                            : "text-[#888888] hover:text-[#1a1a1a]"
                        }`}
                        onClick={() => setMenuOpen(false)}
                      >
                        {child.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
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

"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Variant = "fadeUp" | "fadeIn" | "fadeLeft" | "fadeRight" | "scaleUp";

interface AnimateProps {
  children: React.ReactNode;
  variant?: Variant;
  /** Seconds, default 0 */
  delay?: number;
  /** Seconds, default 0.7 */
  duration?: number;
  /** 0–1, how much of element visible before triggering, default 0.15 */
  threshold?: number;
  /** Only animate once, default true */
  once?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const variants = {
  fadeUp: {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: 40 },
  },
  fadeIn: {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  },
  fadeLeft: {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -40 },
  },
  fadeRight: {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: 40 },
  },
  scaleUp: {
    visible: { opacity: 1, scale: 1 },
    hidden: { opacity: 0, scale: 0.94 },
  },
};

/**
 * Scroll-triggered entrance animation wrapper.
 *
 * Solves the "flash of hidden content" problem on client-side navigation:
 *
 * - Pre-hydration: plain visible div (no animation, always shown)
 * - Post-hydration: motion.div with `initial="visible"` (matches SSR)
 * - The element stays visible by default — no IntersectionObserver race
 *   condition on initial mount that would cause a brief flash of hidden
 *   content between the page mounting and the observer firing
 *
 * Trade-off: this component no longer animates elements into view on scroll
 * (because they start visible). The PageTransition wrapper provides the
 * overall route-change motion instead.
 */
export default function Animate({
  children,
  variant = "fadeUp",
  delay = 0,
  duration = 0.7,
  threshold = 0.15,
  once = true,
  className,
  style,
}: AnimateProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Pre-hydration: render plain div (fully visible)
  if (!mounted) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      variants={variants[variant]}
      initial="visible"
      animate="visible"
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

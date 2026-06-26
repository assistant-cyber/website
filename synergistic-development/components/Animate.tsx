"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

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
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.94 },
    visible: { opacity: 1, scale: 1 },
  },
};

/**
 * Scroll-triggered entrance animation wrapper.
 *
 * SSR-safe: pre-hydration, renders a plain visible div so the user
 * always sees the content even if JS fails. After hydration, the
 * element is initially hidden and animates in the first time it
 * scrolls into view (`whileInView`).
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

  // Pre-hydration: render plain div (fully visible, no animation)
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
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
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

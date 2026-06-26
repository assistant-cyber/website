"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  /** Target number */
  value: number;
  /** e.g. "$" */
  prefix?: string;
  /** e.g. "+" */
  suffix?: string;
  /** Animation duration in ms, default 2000 */
  duration?: number;
  className?: string;
}

/**
 * Counts up to `value` when scrolled into view. Runs once.
 * Ease-out-expo for a natural deceleration.
 *
 * SSR-safe: pre-hydration, shows the final value (no count-up).
 * After hydration, starts at 0 and counts up when in view.
 */
export default function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  duration = 2000,
  className,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(value);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    setMounted(true);
    setCount(0);
  }, []);

  useEffect(() => {
    if (!mounted || !isInView) return;

    // Respect reduced motion: jump straight to the final value
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setCount(value);
      return;
    }

    let startTime: number | undefined;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(eased * value));
      if (progress < 1) animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [mounted, isInView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface AnimateStaggerProps {
  children: React.ReactNode;
  /** Delay between each child, default 0.1 */
  staggerDelay?: number;
  /** Delay before first child, default 0 */
  initialDelay?: number;
  className?: string;
  style?: React.CSSProperties;
}

const containerVariants = (staggerDelay: number, initialDelay: number) => ({
  visible: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: initialDelay,
    },
  },
});

const itemVariants = {
  visible: { opacity: 1, y: 0 },
};

/**
 * Group container that staggers its children visually.
 *
 * SSR-safe: pre-hydration, renders plain content (no animation).
 * Post-hydration, items appear instantly without per-item delays
 * (since we removed the hidden → visible transition).
 *
 * Each direct child must be wrapped in `<AnimateStaggerItem>`.
 */
export function AnimateStagger({
  children,
  staggerDelay = 0.1,
  initialDelay = 0,
  className,
  style,
}: AnimateStaggerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants(staggerDelay, initialDelay)}
      initial="visible"
      animate="visible"
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/** Direct child of `<AnimateStagger>`. */
export function AnimateStaggerItem({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div variants={itemVariants} className={className} style={style}>
      {children}
    </motion.div>
  );
}

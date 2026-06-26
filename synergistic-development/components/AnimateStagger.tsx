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
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: initialDelay,
    },
  },
});

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/**
 * Group container that staggers its children.
 * Each direct child must be wrapped in `<AnimateStaggerItem>`.
 *
 * SSR-safe: pre-hydration, renders plain content (no animation).
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
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
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

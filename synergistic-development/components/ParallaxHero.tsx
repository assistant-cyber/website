"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

interface ParallaxHeroProps {
  imageSrc: string;
  imageAlt: string;
  /** CSS height value, default '55vh' */
  height?: string;
  children: React.ReactNode;
  /** CSS gradient string */
  overlay?: string;
}

/**
 * Subtle parallax hero. Background moves at 30% of scroll speed.
 * Disabled on mobile (< 768px) — touch parallax feels jarring.
 */
export default function ParallaxHero({
  imageSrc,
  imageAlt,
  height = "55vh",
  children,
  overlay = "linear-gradient(to bottom, rgba(20,20,20,0.25) 0%, rgba(20,20,20,0.65) 100%)",
}: ParallaxHeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Image moves 30% of scroll distance (disabled on mobile)
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? ["0%", "0%"] : ["0%", "30%"],
  );

  return (
    <div
      ref={ref}
      className="relative overflow-hidden"
      style={{ height, minHeight: 480, marginTop: "-72px" }}
    >
      {/* Image container — slightly oversized so parallax has room to move */}
      <motion.div
        style={{
          y,
          position: "absolute",
          top: "-15%",
          bottom: "-15%",
          left: 0,
          right: 0,
        }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </motion.div>

      {/* Overlay */}
      <div className="absolute inset-0" style={{ background: overlay }} />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end text-white">
        {children}
      </div>
    </div>
  );
}

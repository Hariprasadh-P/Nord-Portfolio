"use client";

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Navigation } from "lucide-react";

export default function NavigationalCompassPath() {
  const { scrollYProgress } = useScroll();
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 pointer-events-none z-0 hidden lg:block overflow-hidden">
      {/* Central Dotted Line SVG */}
      <svg
        className="w-full h-full"
        viewBox="0 0 32 1000"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Static faint lilac guide track */}
        <line
          x1="16"
          y1="0"
          x2="16"
          y2="1000"
          stroke="#E9D5FF"
          strokeWidth="1.5"
          strokeDasharray="4 6"
          strokeOpacity="0.7"
        />

        {/* Scroll-animated Glowing Orchid Trajectory */}
        <motion.line
          x1="16"
          y1="0"
          x2="16"
          y2="1000"
          stroke="url(#compassGlowGradient)"
          strokeWidth="2.5"
          strokeDasharray="5 7"
          style={{ pathLength }}
        />

        <defs>
          <linearGradient id="compassGlowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#A855F7" />
            <stop offset="35%" stopColor="#C084FC" />
            <stop offset="70%" stopColor="#9333EA" />
            <stop offset="100%" stopColor="#A855F7" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export function WaypointBadge({
  bearing,
  label,
  align = "center",
}: {
  bearing: string;
  label: string;
  align?: "center" | "left" | "right";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`inline-flex items-center gap-2 rounded-full border border-purple-200/90 bg-white/90 px-4 py-1.5 text-xs font-mono backdrop-blur-md shadow-sm shadow-purple-500/10 mb-4 ${
        align === "center" ? "mx-auto" : ""
      }`}
    >
      <div className="h-4 w-4 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
        <Navigation className="h-2.5 w-2.5 fill-current rotate-45" />
      </div>
      <span className="font-bold text-slate-900 tracking-wider">{bearing}</span>
      <span className="text-purple-300">•</span>
      <span className="text-purple-700 font-bold uppercase tracking-widest text-[11px]">{label}</span>
    </motion.div>
  );
}

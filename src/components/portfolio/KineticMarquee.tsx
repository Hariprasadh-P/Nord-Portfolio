"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";

interface KineticMarqueeProps {
  baseVelocity?: number;
}

export default function KineticMarquee({ baseVelocity = 2 }: KineticMarqueeProps) {
  const baseX = useRef(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const phrases = [
    "DIGITAL MARKETING",
    "CREATIVE DIRECTION",
    "4K REELS PRODUCTION",
    "META ADS MANAGEMENT",
    "THREE ROUTES TO GROW",
    "FIND YOUR BEARING",
    "NORD MEDIA HOUSE",
  ];

  const content = [...phrases, ...phrases, ...phrases];

  const x = useTransform(velocityFactor, () => {
    return `${baseX.current}%`;
  });

  useAnimationFrame((t, delta) => {
    let moveBy = baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) {
      moveBy += velocityFactor.get() * 0.5;
    } else {
      moveBy += velocityFactor.get() * 0.5;
    }

    baseX.current -= moveBy * 0.15;
    if (baseX.current <= -50) {
      baseX.current = 0;
    }
  });

  return (
    <div className="relative w-full overflow-hidden py-8 border-y border-purple-200/80 bg-white/80 backdrop-blur-md select-none shadow-sm">
      {/* Background Soft Glow */}
      <div className="absolute inset-0 bg-radial-glow opacity-30 pointer-events-none" />

      <motion.div
        style={{ x }}
        className="flex whitespace-nowrap gap-8 items-center"
      >
        {content.map((phrase, idx) => (
          <div key={idx} className="flex items-center gap-8 flex-shrink-0">
            <span className="font-display font-black text-xl sm:text-2xl tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-purple-700 to-purple-500 uppercase opacity-90 hover:opacity-100 transition">
              {phrase}
            </span>
            <span className="h-2 w-2 rounded-full bg-purple-500 shadow-sm shadow-purple-500/50" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface NordIntroSplashProps {
  onComplete: () => void;
}

export default function NordIntroSplash({ onComplete }: NordIntroSplashProps) {
  const [isEngaging, setIsEngaging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleEngage = () => {
    if (isEngaging) return;
    setIsEngaging(true);
    // 550ms smooth cinematic velocity warp
    setTimeout(() => {
      onComplete();
    }, 550);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{
        opacity: isEngaging ? 0 : 1,
        transition: { duration: 0.55, ease: [0.2, 0.8, 0.2, 1] },
      }}
      exit={{
        opacity: 0,
        transition: { duration: 0.55, ease: [0.2, 0.8, 0.2, 1] },
      }}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#07080D] select-none overflow-hidden ${
        isEngaging ? "pointer-events-none" : "cursor-pointer"
      }`}
      onClick={handleEngage}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ambient Cyber Matrix Background Grid */}
      <div className="absolute inset-0 bg-cyber-grid bg-[size:40px_40px] opacity-20 pointer-events-none" />

      {/* Ambient Glowing Aurora Background Glow */}
      <motion.div
        animate={{
          scale: isHovered || isEngaging ? [1.2, 1.4, 1.2] : [1, 1.15, 1],
          opacity: isHovered || isEngaging ? [0.65, 0.9, 0.65] : [0.4, 0.6, 0.4],
        }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[850px] h-[850px] rounded-full bg-gradient-to-tr from-purple-600/35 via-fuchsia-600/30 to-sky-500/25 blur-[180px] pointer-events-none"
      />

      {/* Radiant Hyperspace Light Flash on Click */}
      {isEngaging && (
        <motion.div
          initial={{ scale: 0.2, opacity: 0 }}
          animate={{ scale: 6, opacity: 1 }}
          transition={{ duration: 0.55, ease: "easeIn" }}
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-400 to-sky-400 blur-3xl pointer-events-none z-20"
        />
      )}

      {/* Center Free-Floating Unboxed Logo Container */}
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 15 }}
        animate={{
          scale: isEngaging ? 2.5 : 1,
          opacity: isEngaging ? 0 : 1,
          filter: isEngaging ? "blur(14px)" : "blur(0px)",
          y: 0,
        }}
        transition={{
          duration: isEngaging ? 0.55 : 0.6,
          ease: [0.2, 0.8, 0.2, 1],
        }}
        className="relative z-10 flex flex-col items-center text-center"
      >
        {/* NORD Free Floating Unboxed */}
        <div className="flex items-center justify-center gap-1 sm:gap-3 leading-none">
          
          {/* 'N' in Metallic Silver Chrome */}
          <span className="font-display font-black text-7xl sm:text-9xl lg:text-[11rem] tracking-tight bg-gradient-to-b from-white via-purple-100 to-slate-400 bg-clip-text text-transparent drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]">
            N
          </span>

          {/* 'O' COMPASS ROSE */}
          <div className="relative inline-flex items-center justify-center h-20 w-20 sm:h-32 sm:w-32 lg:h-40 lg:w-40 mx-1 transition-transform group-hover:scale-105">
            {/* Radiant Glow Behind 'O' */}
            <motion.div
              animate={{
                scale: isHovered || isEngaging ? [1.25, 1.55, 1.25] : [1, 1.2, 1],
                opacity: isHovered || isEngaging ? 0.95 : 0.45,
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-600 via-fuchsia-500 to-sky-400 blur-2xl pointer-events-none"
            />

            {/* Orbit Ping Wave */}
            <span className="absolute -inset-4 rounded-full border-2 border-purple-400/80 animate-ping pointer-events-none opacity-60" />
            <span className="absolute -inset-2 rounded-full border border-purple-400/50 pointer-events-none" />

            {/* High-Resolution Compass Dial SVG */}
            <motion.svg
              viewBox="0 0 100 100"
              animate={{
                rotate: isEngaging ? 720 : isHovered ? 360 : 0,
                scale: isEngaging ? 1.35 : isHovered ? 1.15 : 1,
              }}
              transition={{
                type: "spring",
                stiffness: 220,
                damping: 20,
              }}
              className="w-full h-full drop-shadow-[0_0_35px_rgba(168,85,247,0.7)] relative z-10"
            >
              {/* Outer Azimuth Degree Track Ring */}
              <circle
                cx="50"
                cy="50"
                r="47"
                fill="none"
                stroke="#A855F7"
                strokeWidth="3.2"
                strokeDasharray="4 2"
                className="opacity-90"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#C084FC"
                strokeWidth="1.8"
                className="opacity-95"
              />
              <circle
                cx="50"
                cy="50"
                r="34"
                fill="none"
                stroke="#E9D5FF"
                strokeWidth="1"
                className="opacity-80"
              />

              {/* 4 Cardinal Degree Marks */}
              <line x1="50" y1="3" x2="50" y2="10" stroke="#C084FC" strokeWidth="2.5" />
              <line x1="97" y1="50" x2="90" y2="50" stroke="#C084FC" strokeWidth="2.5" />
              <line x1="50" y1="97" x2="50" y2="90" stroke="#C084FC" strokeWidth="2.5" />
              <line x1="3" y1="50" x2="10" y2="50" stroke="#C084FC" strokeWidth="2.5" />

              {/* 4 Secondary Diagonal Faceted Diamond Points */}
              <polygon points="50,50 43,43 50,18 57,43" fill="#C084FC" opacity="0.75" />
              <polygon points="50,50 57,43 82,50 57,57" fill="#C084FC" opacity="0.75" />
              <polygon points="50,50 57,57 50,82 43,57" fill="#C084FC" opacity="0.75" />
              <polygon points="50,50 43,57 18,50 43,43" fill="#C084FC" opacity="0.75" />

              {/* 4 PRIMARY 8-POINT FACETED STAR NEEDLES */}
              {/* NORTH POINT */}
              <polygon points="50,50 42,50 50,2" fill="#FFFFFF" />
              <polygon points="50,50 58,50 50,2" fill="#9333EA" />

              {/* SOUTH POINT */}
              <polygon points="50,50 58,50 50,98" fill="#1E0A3C" />
              <polygon points="50,50 42,50 50,98" fill="#A855F7" />

              {/* EAST POINT */}
              <polygon points="50,50 50,42 98,50" fill="#C084FC" />
              <polygon points="50,50 50,58 98,50" fill="#E9D5FF" />

              {/* WEST POINT */}
              <polygon points="50,50 50,58 2,50" fill="#4C1D95" />
              <polygon points="50,50 50,42 2,50" fill="#FFFFFF" />

              {/* Center Jewel Pivot with Glowing Ring */}
              <circle cx="50" cy="50" r="10" fill="#FFFFFF" stroke="#7E22CE" strokeWidth="3" />
              <circle cx="50" cy="50" r="5" fill="#9333EA" />
            </motion.svg>
          </div>

          {/* 'RD' in Metallic Silver Chrome */}
          <span className="font-display font-black text-7xl sm:text-9xl lg:text-[11rem] tracking-tight bg-gradient-to-b from-white via-purple-100 to-slate-400 bg-clip-text text-transparent drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]">
            RD
          </span>
        </div>

        {/* Luxury Tracked Typography in Crisp White/Violet */}
        <div className="mt-4 flex flex-col items-center gap-1.5">
          <span className="text-base sm:text-2xl font-sans font-black tracking-[0.3em] text-white uppercase drop-shadow-md">
            MEDIA HOUSE
          </span>
          <span className="text-xs sm:text-sm font-mono font-bold text-purple-400 tracking-widest uppercase">
            DIGITAL MARKETING · CREATIVE · GROWTH
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

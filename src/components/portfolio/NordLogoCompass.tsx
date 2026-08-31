"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface NordLogoCompassProps {
  onClick?: () => void;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  showSubtitle?: boolean;
}

export default function NordLogoCompass({
  onClick,
  size = "md",
  className = "",
  showSubtitle = true,
}: NordLogoCompassProps) {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    sm: {
      text: "text-lg",
      compass: "h-5 w-5",
      subtitle: "text-[9px]",
    },
    md: {
      text: "text-xl sm:text-2xl",
      compass: "h-6 w-6 sm:h-7 sm:w-7",
      subtitle: "text-[10px]",
    },
    lg: {
      text: "text-3xl sm:text-4xl",
      compass: "h-9 w-9 sm:h-11 sm:w-11",
      subtitle: "text-xs",
    },
    xl: {
      text: "text-5xl sm:text-7xl",
      compass: "h-14 w-14 sm:h-20 sm:w-20",
      subtitle: "text-sm",
    },
  }[size];

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group flex flex-col items-start text-left cursor-pointer transition-all duration-300 ${className}`}
    >
      <div className="flex items-center gap-1 leading-none font-display font-black tracking-tight text-white">
        {/* 'N' in Metallic Platinum */}
        <span className={`${sizeClasses.text} group-hover:text-purple-400 transition-colors bg-gradient-to-b from-white via-slate-100 to-slate-300 bg-clip-text text-transparent`}>
          N
        </span>

        {/* 'O' COMPASS ROSE */}
        <motion.div
          animate={{
            rotate: isHovered ? 360 : 0,
            scale: isHovered ? 1.15 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 240,
            damping: 18,
          }}
          className={`relative inline-flex items-center justify-center ${sizeClasses.compass} mx-0.5`}
        >
          {/* Glowing Aura Ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500 via-fuchsia-500 to-sky-400 opacity-40 group-hover:opacity-100 blur-[8px] transition-opacity" />

          {/* Compass Dial SVG */}
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full drop-shadow-md transform relative z-10"
          >
            {/* Outer Ring */}
            <circle
              cx="50"
              cy="50"
              r="47"
              fill="none"
              stroke="#C084FC"
              strokeWidth="3.2"
              strokeDasharray="4 2"
              className="opacity-90"
            />
            <circle
              cx="50"
              cy="50"
              r="39"
              fill="none"
              stroke="#E9D5FF"
              strokeWidth="1.8"
              className="opacity-95"
            />

            {/* 4 Secondary Diamond Points */}
            <polygon points="50,50 43,43 50,20 57,43" fill="#C084FC" opacity="0.75" />
            <polygon points="50,50 57,43 80,50 57,57" fill="#C084FC" opacity="0.75" />
            <polygon points="50,50 57,57 50,80 43,57" fill="#C084FC" opacity="0.75" />
            <polygon points="50,50 43,57 20,50 43,43" fill="#C084FC" opacity="0.75" />

            {/* 4 Primary 8-Point Faceted Needles */}
            {/* North Point */}
            <polygon points="50,50 42,50 50,3" fill="#FFFFFF" />
            <polygon points="50,50 58,50 50,3" fill="#9333EA" />

            {/* South Point */}
            <polygon points="50,50 58,50 50,97" fill="#1E0A3C" />
            <polygon points="50,50 42,50 50,97" fill="#A855F7" />

            {/* East Point */}
            <polygon points="50,50 50,42 97,50" fill="#C084FC" />
            <polygon points="50,50 50,58 97,50" fill="#E9D5FF" />

            {/* West Point */}
            <polygon points="50,50 50,58 3,50" fill="#4C1D95" />
            <polygon points="50,50 50,42 3,50" fill="#FFFFFF" />

            {/* Center Jewel Pivot */}
            <circle cx="50" cy="50" r="9" fill="#FFFFFF" stroke="#7E22CE" strokeWidth="2.5" />
            <circle cx="50" cy="50" r="4.5" fill="#9333EA" />
          </svg>
        </motion.div>

        {/* 'RD' in Metallic Platinum */}
        <span className={`${sizeClasses.text} group-hover:text-purple-400 transition-colors bg-gradient-to-b from-white via-slate-100 to-slate-300 bg-clip-text text-transparent`}>
          RD
        </span>

        {/* 'MEDIA HOUSE' Label */}
        <span className={`ml-1.5 font-sans font-extrabold tracking-wider text-white ${sizeClasses.text}`}>
          MEDIA HOUSE
        </span>
      </div>

      {showSubtitle && (
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse" />
          <span className={`font-mono font-bold tracking-widest text-purple-400 uppercase ${sizeClasses.subtitle}`}>
            SPATIAL COMPASS · CLICK TO ZOOM HUB
          </span>
        </div>
      )}
    </button>
  );
}

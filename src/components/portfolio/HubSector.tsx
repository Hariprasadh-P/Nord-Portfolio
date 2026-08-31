"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Film, Package, Info, Mail, Compass } from "lucide-react";
import CompassModel3D, { CardinalDirection } from "@/components/canvas/CompassModel3D";
import TiltCard from "./TiltCard";

interface HubSectorProps {
  agencyName: string;
  motoLine: string;
  subHeadline: string;
  activeDirection: CardinalDirection;
  onSelectDirection: (direction: CardinalDirection) => void;
  hoveredDirection: CardinalDirection | null;
  onHoverDirection: (direction: CardinalDirection | null) => void;
  onOpenVideoModal: (videoUrl: string, title: string) => void;
  featuredVideoUrl?: string;
  onToggleRadarMode?: () => void;
}

export default function HubSector({
  agencyName,
  motoLine,
  subHeadline,
  activeDirection,
  onSelectDirection,
  hoveredDirection,
  onHoverDirection,
}: HubSectorProps) {
  const cardinalCards = [
    {
      id: "north" as CardinalDirection,
      bearing: "000° N",
      title: "Works",
      desc: "4K Showreel & Showcase",
      icon: <Film className="h-3.5 w-3.5" />,
      arrow: "↑",
      accent: "from-sky-600 to-cyan-600",
      accentBorder: "hover:border-sky-500",
      badgeColor: "text-sky-400",
      badgeBg: "bg-sky-950/60",
    },
    {
      id: "east" as CardinalDirection,
      bearing: "090° E",
      title: "Tariff",
      desc: "Rate Card & Retainers",
      icon: <Package className="h-3.5 w-3.5" />,
      arrow: "→",
      accent: "from-emerald-600 to-teal-600",
      accentBorder: "hover:border-emerald-500",
      badgeColor: "text-emerald-400",
      badgeBg: "bg-emerald-950/60",
    },
    {
      id: "south" as CardinalDirection,
      bearing: "180° S",
      title: "About",
      desc: "Creative Strategy & Pillars",
      icon: <Info className="h-3.5 w-3.5" />,
      arrow: "↓",
      accent: "from-amber-600 to-rose-600",
      accentBorder: "hover:border-amber-500",
      badgeColor: "text-amber-400",
      badgeBg: "bg-amber-950/60",
    },
    {
      id: "west" as CardinalDirection,
      bearing: "270° W",
      title: "Contact",
      desc: "Direct Brief Submission",
      icon: <Mail className="h-3.5 w-3.5" />,
      arrow: "←",
      accent: "from-pink-600 to-fuchsia-600",
      accentBorder: "hover:border-pink-500",
      badgeColor: "text-pink-400",
      badgeBg: "bg-pink-950/60",
    },
  ];

  return (
    <div className="h-screen max-h-screen w-full flex flex-col justify-between items-center relative pt-20 sm:pt-24 pb-4 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#07080D] text-white select-none">
      {/* Background Subtle Cyber Grid & Ambient Dark Violet Glow */}
      <div className="absolute inset-0 bg-cyber-grid bg-[size:40px_40px] opacity-25 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[550px] bg-purple-600/15 rounded-full blur-[160px] pointer-events-none" />

      {/* 1. TOP HEADER (Crisp, High-Contrast Dark Mode) */}
      <div className="w-full max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-purple-500/40 bg-slate-950/80 px-3.5 py-0.5 text-[10px] font-mono text-purple-300 font-bold shadow-md mb-1.5 backdrop-blur-md"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse" />
          <span>SPATIAL COMPASS NAVIGATION</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-display font-black text-xl sm:text-2xl lg:text-3xl text-white tracking-tight leading-tight uppercase"
        >
          {motoLine || "FIND YOUR BEARING — 4 ROUTES FOR BRAND PRESENCE"}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto mt-1 font-sans font-medium line-clamp-2"
        >
          {subHeadline ||
            "Interact with the 3D compass rose below or click any bearing to glide into its sector."}
        </motion.p>
      </div>

      {/* 2. CENTERPIECE: 3D COMPASS MODEL (Compact, completely fits viewport) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="w-full max-w-lg mx-auto relative z-10 flex items-center justify-center my-auto"
      >
        <CompassModel3D
          activeDirection={activeDirection}
          onSelectDirection={onSelectDirection}
          hoveredDirection={hoveredDirection}
          onHoverDirection={onHoverDirection}
        />
      </motion.div>

      {/* 3. BOTTOM: 4-CARDINAL DIRECTION QUICK-LAUNCH DOCK (Clean, fully visible without cutoff) */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="w-full max-w-4xl mx-auto relative z-10 flex flex-col items-center gap-2"
      >
        {/* 4 Quadrant Cards Dock */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full" style={{ perspective: 1000 }}>
          {cardinalCards.map((card) => {
            const isHovered = hoveredDirection === card.id;
            return (
              <TiltCard
                key={card.id}
                maxTilt={6}
                glowColor="rgba(168, 85, 247, 0.3)"
                onClick={() => onSelectDirection(card.id)}
                className="w-full"
              >
                <div
                  onMouseEnter={() => onHoverDirection(card.id)}
                  onMouseLeave={() => onHoverDirection(null)}
                  className={`group text-left p-2.5 rounded-2xl border transition-all duration-200 flex items-center justify-between backdrop-blur-xl cursor-pointer ${
                    isHovered
                      ? `bg-gradient-to-r ${card.accent} text-white border-transparent shadow-lg shadow-purple-500/25 scale-[1.03]`
                      : `bg-slate-950/80 border-slate-800/80 text-white ${card.accentBorder} hover:bg-slate-900/90 shadow-md`
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-6 w-6 rounded-lg flex items-center justify-center transition-colors ${
                        isHovered ? "bg-white/20 text-white" : `${card.badgeBg} ${card.badgeColor}`
                      }`}
                    >
                      {card.icon}
                    </div>
                    <div>
                      <div
                        className={`text-[9px] font-mono font-bold uppercase tracking-wider ${
                          isHovered ? "text-purple-100" : card.badgeColor
                        }`}
                      >
                        {card.bearing}
                      </div>
                      <div className="font-display font-bold text-xs leading-tight text-white">
                        {card.title}
                      </div>
                    </div>
                  </div>

                  <span
                    className={`text-xs font-mono font-bold transition-transform group-hover:translate-x-0.5 ${
                      isHovered ? "text-white" : "text-slate-500"
                    }`}
                  >
                    {card.arrow}
                  </span>
                </div>
              </TiltCard>
            );
          })}
        </div>

        {/* Keyboard Helper Footnote */}
        <div className="text-[10px] font-mono text-slate-500 flex items-center gap-2.5 font-semibold">
          <span>NAVIGATE:</span>
          <span className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300 font-bold">
            [↑] [→] [↓] [←]
          </span>
          <span>or click any compass point</span>
        </div>
      </motion.div>
    </div>
  );
}

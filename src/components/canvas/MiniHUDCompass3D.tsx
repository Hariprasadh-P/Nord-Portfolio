"use client";

import React from "react";
import { motion } from "framer-motion";
import { CardinalDirection } from "./CompassModel3D";
import { LayoutGrid, Minimize2 } from "lucide-react";

interface MiniHUDCompassProps {
  activeDirection: CardinalDirection;
  onSelectDirection: (direction: CardinalDirection) => void;
  isRadarMode?: boolean;
  onToggleRadarMode?: () => void;
}

export default function MiniHUDCompass3D({
  activeDirection,
  onSelectDirection,
  isRadarMode = false,
  onToggleRadarMode,
}: MiniHUDCompassProps) {
  const needleRotation = {
    hub: 0,
    north: 0,
    east: 90,
    south: 180,
    west: 270,
  }[activeDirection];

  const directionLabels = {
    hub: "ORIGIN • HUB",
    north: "000° NORTH • WORKS",
    east: "090° EAST • TARIFF",
    south: "180° SOUTH • ABOUT",
    west: "270° WEST • CONTACT",
  };

  const themeColors = {
    hub: {
      border: "border-purple-200/90",
      shadow: "shadow-purple-500/10",
      accentBg: "bg-purple-600",
      accentText: "text-purple-600",
      lightBg: "bg-purple-50",
      lightBorder: "border-purple-200",
      needleTip: "border-b-purple-600 drop-shadow-[0_0_6px_rgba(168,85,247,0.8)]",
    },
    north: {
      border: "border-sky-200/90",
      shadow: "shadow-sky-500/15",
      accentBg: "bg-sky-600",
      accentText: "text-sky-600",
      lightBg: "bg-sky-50",
      lightBorder: "border-sky-200",
      needleTip: "border-b-sky-600 drop-shadow-[0_0_6px_rgba(2,132,199,0.8)]",
    },
    east: {
      border: "border-emerald-200/90",
      shadow: "shadow-emerald-500/15",
      accentBg: "bg-emerald-600",
      accentText: "text-emerald-600",
      lightBg: "bg-emerald-50",
      lightBorder: "border-emerald-200",
      needleTip: "border-b-emerald-600 drop-shadow-[0_0_6px_rgba(5,150,105,0.8)]",
    },
    south: {
      border: "border-amber-200/90",
      shadow: "shadow-amber-500/15",
      accentBg: "bg-amber-600",
      accentText: "text-amber-600",
      lightBg: "bg-amber-50",
      lightBorder: "border-amber-200",
      needleTip: "border-b-amber-600 drop-shadow-[0_0_6px_rgba(217,119,6,0.8)]",
    },
    west: {
      border: "border-pink-200/90",
      shadow: "shadow-pink-500/15",
      accentBg: "bg-pink-600",
      accentText: "text-pink-600",
      lightBg: "bg-pink-50",
      lightBorder: "border-pink-200",
      needleTip: "border-b-pink-600 drop-shadow-[0_0_6px_rgba(219,39,119,0.8)]",
    },
  }[activeDirection];

  return (
    <motion.aside
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      aria-label="Spatial Navigation Compass"
      className="fixed bottom-6 right-6 z-40 select-none font-sans"
    >
      <div
        className={`relative rounded-3xl border ${themeColors.border} bg-white/95 p-3.5 backdrop-blur-2xl shadow-xl ${themeColors.shadow} flex flex-col items-center gap-3 transition-colors duration-500`}
      >
        {/* Top Mini Compass Dial */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          {/* Outer Track */}
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-slate-200 animate-spin-slow pointer-events-none" />
          <div className="absolute inset-1 rounded-full border border-slate-200/80 pointer-events-none" />

          {/* NORTH BUTTON */}
          <button
            onClick={() => onSelectDirection("north")}
            title="Navigate North (000°): Works"
            className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono font-bold transition-all z-10 ${
              activeDirection === "north"
                ? "bg-sky-600 text-white shadow-md shadow-sky-500/50 scale-110"
                : "text-slate-700 hover:text-sky-600 hover:bg-sky-100"
            }`}
          >
            N
          </button>

          {/* EAST BUTTON */}
          <button
            onClick={() => onSelectDirection("east")}
            title="Navigate East (090°): Services & Tariff"
            className={`absolute right-0 top-1/2 translate-x-1 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono font-bold transition-all z-10 ${
              activeDirection === "east"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/50 scale-110"
                : "text-slate-700 hover:text-emerald-600 hover:bg-emerald-100"
            }`}
          >
            E
          </button>

          {/* SOUTH BUTTON */}
          <button
            onClick={() => onSelectDirection("south")}
            title="Navigate South (180°): About & Pillars"
            className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono font-bold transition-all z-10 ${
              activeDirection === "south"
                ? "bg-amber-600 text-white shadow-md shadow-amber-500/50 scale-110"
                : "text-slate-700 hover:text-amber-600 hover:bg-amber-100"
            }`}
          >
            S
          </button>

          {/* WEST BUTTON */}
          <button
            onClick={() => onSelectDirection("west")}
            title="Navigate West (270°): Contact & Brief"
            className={`absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono font-bold transition-all z-10 ${
              activeDirection === "west"
                ? "bg-pink-600 text-white shadow-md shadow-pink-500/50 scale-110"
                : "text-slate-700 hover:text-pink-600 hover:bg-pink-100"
            }`}
          >
            W
          </button>

          {/* Center Hub Button */}
          <button
            onClick={() => onSelectDirection("hub")}
            title="Return to Center Hub"
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs transition-all z-20 ${
              activeDirection === "hub"
                ? "bg-slate-900 text-white shadow-md"
                : "bg-purple-100 text-purple-700 hover:bg-purple-200"
            }`}
          >
            ✛
          </button>

          {/* Rotating Compass Needle */}
          <motion.div
            animate={{ rotate: needleRotation }}
            transition={{ type: "spring", stiffness: 150, damping: 18 }}
            className="absolute inset-0 pointer-events-none flex items-center justify-center"
          >
            <div className="w-1 h-20 relative flex flex-col items-center justify-between">
              {/* Dynamic Theme Needle Tip */}
              <div
                className={`w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[18px] ${themeColors.needleTip}`}
              />
              {/* South tip */}
              <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[12px] border-t-slate-400" />
            </div>
          </motion.div>
        </div>

        {/* Current Bearing Status Banner */}
        <div className="w-full text-center px-1">
          <div
            className={`text-[9px] font-mono font-bold uppercase tracking-wider ${themeColors.accentText} ${themeColors.lightBg} rounded-lg py-1 px-2 border ${themeColors.lightBorder} transition-colors duration-500`}
          >
            {directionLabels[activeDirection]}
          </div>
        </div>

        {/* Quick Nav Bar & Radar Toggle */}
        <div className="w-full flex items-center justify-between gap-1.5 pt-1 border-t border-slate-100">
          <button
            onClick={() => onSelectDirection("hub")}
            className={`flex-1 py-1 px-2 rounded-lg text-[10px] font-mono font-bold transition ${
              activeDirection === "hub"
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            Hub
          </button>

          {onToggleRadarMode && (
            <button
              onClick={onToggleRadarMode}
              title={isRadarMode ? "Zoom into Active Sector" : "Bird's Eye Spatial Radar Map"}
              className={`p-1.5 rounded-lg border transition ${
                isRadarMode
                  ? `${themeColors.accentBg} text-white border-transparent shadow-sm`
                  : "border-slate-200 text-slate-700 hover:bg-slate-100"
              }`}
            >
              {isRadarMode ? <Minimize2 className="h-3.5 w-3.5" /> : <LayoutGrid className="h-3.5 w-3.5" />}
            </button>
          )}
        </div>
      </div>
    </motion.aside>
  );
}

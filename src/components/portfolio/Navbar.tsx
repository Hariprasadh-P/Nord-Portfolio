"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Lock, Compass, Film, Package, Info, Mail } from "lucide-react";
import { CardinalDirection } from "@/components/canvas/CompassModel3D";
import NordLogoCompass from "./NordLogoCompass";

interface NavbarProps {
  agencyName?: string;
  logoUrl?: string;
  activeDirection?: CardinalDirection;
  onSelectDirection?: (direction: CardinalDirection) => void;
}

export default function Navbar({
  activeDirection = "hub",
  onSelectDirection,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    {
      label: "Hub",
      dir: "hub" as CardinalDirection,
      code: "✛ ORIGIN",
      activeBg: "bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-purple-500/30",
    },
    {
      label: "Works",
      dir: "north" as CardinalDirection,
      code: "000° N",
      activeBg: "bg-gradient-to-r from-sky-600 via-cyan-600 to-blue-600 text-white shadow-sky-500/30",
    },
    {
      label: "Services & Tariff",
      dir: "east" as CardinalDirection,
      code: "090° E",
      activeBg: "bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white shadow-emerald-500/30",
    },
    {
      label: "About",
      dir: "south" as CardinalDirection,
      code: "180° S",
      activeBg: "bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 text-white shadow-amber-500/30",
    },
    {
      label: "Contact",
      dir: "west" as CardinalDirection,
      code: "270° W",
      activeBg: "bg-gradient-to-r from-pink-600 via-rose-600 to-fuchsia-600 text-white shadow-pink-500/30",
    },
  ];

  const handleNavClick = (dir: CardinalDirection) => {
    onSelectDirection?.(dir);
    setMobileMenuOpen(false);
  };

  const getBearingColor = () => {
    switch (activeDirection) {
      case "north":
        return "text-sky-400 border-sky-500/50 bg-sky-950/60";
      case "east":
        return "text-emerald-400 border-emerald-500/50 bg-emerald-950/60";
      case "south":
        return "text-amber-400 border-amber-500/50 bg-amber-950/60";
      case "west":
        return "text-pink-400 border-pink-500/50 bg-pink-950/60";
      case "hub":
      default:
        return "text-purple-400 border-purple-500/50 bg-purple-950/60";
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300 bg-[#07080D]/80 backdrop-blur-2xl border-b border-slate-800/80 py-3 shadow-md shadow-black/40 select-none font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Bespoke NORD Logo with Compass Rose 'O' */}
        <NordLogoCompass
          onClick={() => handleNavClick("hub")}
          size="md"
          showSubtitle={true}
        />

        {/* Desktop Nav Links (4 Cardinal Directions + Hub) */}
        <nav className="hidden lg:flex items-center gap-1 rounded-full border border-slate-800 bg-slate-950/90 px-3 py-1 backdrop-blur-md shadow-inner">
          {navLinks.map((link) => {
            const isActive = activeDirection === link.dir;
            return (
              <button
                key={link.dir}
                onClick={() => handleNavClick(link.dir)}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  isActive
                    ? `${link.activeBg} font-bold shadow-md`
                    : "text-slate-400 hover:text-white hover:bg-slate-900"
                }`}
              >
                <span>{link.label}</span>
                <span
                  className={`text-[9px] font-mono px-1.5 py-0.5 rounded-md ${
                    isActive
                      ? "bg-white/20 text-white font-bold"
                      : "bg-slate-900 text-slate-500 font-normal border border-slate-800"
                  }`}
                >
                  {link.code}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Action Controls & Bearing HUD */}
        <div className="hidden md:flex items-center gap-3">
          {/* Active Bearing Coordinate Indicator */}
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-[11px] font-mono font-bold transition-all shadow-md ${getBearingColor()}`}
          >
            <span className="h-2 w-2 rounded-full bg-current animate-pulse" />
            <span>
              BEARING:{" "}
              {activeDirection === "hub"
                ? "ORIGIN"
                : activeDirection === "north"
                ? "000° N"
                : activeDirection === "east"
                ? "090° E"
                : activeDirection === "south"
                ? "180° S"
                : "270° W"}
            </span>
          </div>

          <Link
            href="/admin"
            className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-1.5 text-xs font-mono font-bold text-slate-300 hover:text-white hover:border-purple-500/50 transition shadow-sm"
          >
            <Lock className="h-3 w-3 text-purple-400" />
            <span>Admin</span>
          </Link>

          <button
            onClick={() => handleNavClick("west")}
            className="group flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-700 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider text-white shadow-md shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105 transition"
          >
            <span>Book Strategy</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-slate-800 bg-slate-950/95 backdrop-blur-2xl px-4 py-4 space-y-2"
          >
            {navLinks.map((link) => (
              <button
                key={link.dir}
                onClick={() => handleNavClick(link.dir)}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold font-mono transition ${
                  activeDirection === link.dir
                    ? link.activeBg
                    : "bg-slate-900 text-slate-300 border border-slate-800"
                }`}
              >
                <span>{link.label}</span>
                <span>{link.code}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

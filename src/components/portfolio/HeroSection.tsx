"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, CheckCircle2, Compass } from "lucide-react";
import HeroCanvas3D from "@/components/canvas/HeroCanvas3D";

interface HeroSectionProps {
  motoLine: string;
  subHeadline: string;
  agencyName: string;
  onOpenContact: () => void;
  onOpenVideoModal: (videoUrl: string, title: string) => void;
  featuredVideoUrl?: string;
}

export default function HeroSection({
  motoLine,
  subHeadline,
  agencyName,
  onOpenContact,
  onOpenVideoModal,
  featuredVideoUrl,
}: HeroSectionProps) {
  return (
    <section className="relative min-h-screen pt-24 pb-16 lg:pt-28 lg:pb-24 overflow-hidden flex flex-col items-center justify-center">
      {/* Background Soft Lilac and Ambient Orbs matching reference image */}
      <div className="absolute inset-0 bg-cyber-grid bg-[size:40px_40px] opacity-35 pointer-events-none" />
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[850px] h-[650px] bg-purple-200/50 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-[550px] h-[550px] bg-fuchsia-100/50 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/4 -left-20 w-[450px] h-[450px] bg-purple-100/60 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center text-center">
        
        {/* 1. TOP ANCHOR: 3D COMPASS ANIMATION */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="w-full max-w-xl mx-auto mb-2 relative"
        >
          {/* Circular Orchid Halo (matching circular profile glow in reference) */}
          <div className="absolute inset-0 bg-radial-glow pointer-events-none opacity-80" />
          
          <div className="relative rounded-3xl overflow-hidden">
            <HeroCanvas3D />
          </div>

          <div className="text-[10px] font-mono text-purple-700 font-bold tracking-widest uppercase -mt-4 mb-4 flex items-center justify-center gap-2">
            <Compass className="h-3.5 w-3.5 text-purple-600" />
            <span>Interactive 4-Point Compass • Click Any Bearing to Navigate</span>
          </div>
        </motion.div>

        {/* 2. Brand Positioning Pill (matching "Available for freelance work" pill from reference image) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2.5 rounded-full border border-purple-200 bg-white/90 px-4 py-1.5 backdrop-blur-md shadow-sm shadow-purple-500/10 mb-6"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-600"></span>
          </span>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
            DIGITAL MARKETING · CREATIVE · GROWTH
          </span>
        </motion.div>

        {/* 3. Main Company Moto Headline in Charcoal & Orchid (matching "Hi, iam Kazi" in reference image) */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.3 }}
          className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl max-w-5xl tracking-tight leading-[1.14] text-slate-900"
        >
          {motoLine ? (
            <span>{motoLine}</span>
          ) : (
            <>
              FIND YOUR BEARING — THREE ROUTES TO GROW YOUR{" "}
              <span className="bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-500 bg-clip-text text-transparent underline decoration-purple-300 decoration-wavy">
                BRAND&apos;S PRESENCE
              </span>
            </>
          )}
        </motion.h1>

        {/* 4. Subheadline Description (matching "MOTION DESIGNER | VIDEO EDITOR" style) */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base sm:text-lg text-slate-600 max-w-2xl mt-5 leading-relaxed font-sans font-medium"
        >
          {subHeadline ||
            "We engineer high-impact commercials, viral creator campaigns, bespoke 3D brand experiences, and scalable acquisition engines for premier brands."}
        </motion.p>

        {/* 5. Proof Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-6 py-4 mt-2"
        >
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-700">
            <CheckCircle2 className="h-4 w-4 text-purple-600 flex-shrink-0" />
            <span>4K Cinema Production</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-700">
            <CheckCircle2 className="h-4 w-4 text-purple-600 flex-shrink-0" />
            <span>Viral Creator UGC</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-700">
            <CheckCircle2 className="h-4 w-4 text-purple-600 flex-shrink-0" />
            <span>Bespoke 3D CGI</span>
          </div>
        </motion.div>

        {/* 6. Action CTA Buttons (matching "View my work" styled pill) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-2 w-full sm:w-auto font-sans"
        >
          <button
            onClick={onOpenContact}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-700 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/35 hover:scale-[1.03] active:scale-[0.98]"
          >
            <span>Initiate Project Consultation</span>
            <ArrowRight className="h-4 w-4 text-white" />
          </button>

          <button
            onClick={() => {
              if (featuredVideoUrl) {
                onOpenVideoModal(featuredVideoUrl, "Nord Media Showreel");
              } else {
                const el = document.getElementById("showreel");
                el?.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl border border-purple-200 bg-white hover:bg-purple-50/60 px-6 py-4 text-sm font-mono font-bold text-slate-800 transition-all duration-200 hover:border-purple-400 shadow-sm group"
          >
            <div className="h-7 w-7 rounded-full bg-purple-100 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <Play className="h-3.5 w-3.5 fill-current ml-0.5 text-purple-700 group-hover:text-white" />
            </div>
            <span>Watch Showreel</span>
          </button>
        </motion.div>

        {/* 7. Trust Ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="pt-10 border-t border-purple-200/60 w-full max-w-4xl mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8"
        >
          <span className="text-xs font-mono text-slate-500 font-bold uppercase tracking-widest">
            Trusted by Category Leaders:
          </span>
          <div className="flex items-center gap-8 font-display">
            <span className="font-bold text-sm tracking-widest text-slate-600 hover:text-slate-900 transition">NORDIC LUXE</span>
            <span className="font-bold text-sm tracking-widest text-slate-600 hover:text-slate-900 transition">LUMINARY</span>
            <span className="font-bold text-sm tracking-widest text-slate-600 hover:text-slate-900 transition">VELOCE</span>
            <span className="font-bold text-sm tracking-widest text-slate-600 hover:text-slate-900 transition">NEOBANK</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

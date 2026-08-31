"use client";

import React from "react";
import { motion } from "framer-motion";
import { Compass, Film, TrendingUp, Layers, Palette, ArrowRight, ShieldCheck } from "lucide-react";
import TiltCard from "./TiltCard";

interface AboutSectionProps {
  agencyName?: string;
  aboutText?: string;
  location?: string;
  onOpenContact?: () => void;
}

export default function AboutSection({
  agencyName = "NORD MEDIA HOUSE",
  aboutText,
  location,
  onOpenContact,
}: AboutSectionProps) {
  const pillars = [
    {
      icon: <Film className="h-6 w-6 text-amber-400" />,
      title: "Cinematic Visual Storytelling",
      desc: "We engineer 4K commercials, high-velocity Reels, and bespoke visual content that stops thumbs and commands premium brand valuation.",
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-orange-400" />,
      title: "Precision Paid Media & Scaling",
      desc: "Full-funnel Meta and Google advertising management designed to scale qualified leads and customer acquisitions with clear attribution.",
    },
    {
      icon: <Layers className="h-6 w-6 text-amber-300" />,
      title: "Turnkey Social Media Engine",
      desc: "End-to-end content production, caption architecture, and posting consistency that builds authority across your brand channels.",
    },
    {
      icon: <Palette className="h-6 w-6 text-rose-400" />,
      title: "Brand Identity & Design Add-ons",
      desc: "From iconic logo designs to bespoke menu cards and brand collateral, we craft the visual hallmarks that make brands unforgettable.",
    },
  ];

  return (
    <section id="about" className="relative py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Navigational Waypoint & Header in Sunset Amber */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-slate-950/80 px-4 py-1 text-xs font-mono backdrop-blur-md shadow-md mb-3 text-amber-400 font-bold">
            <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
            <span>180° SOUTH</span>
            <span className="text-amber-600">•</span>
            <span className="uppercase tracking-widest text-[11px]">CORE STRATEGY & PILLARS</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
            How We Guide Your{" "}
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">
              Brand Journey
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3 font-sans font-medium leading-relaxed">
            At {agencyName}, we act as your true compass in the digital landscape. We bridge high-fashion creative direction with disciplined performance marketing to build category-defining brands.
          </p>
        </div>

        {/* Pillars Grid in Amber & Rose */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12" style={{ perspective: 1200 }}>
          {pillars.map((pillar, idx) => (
            <TiltCard
              key={idx}
              maxTilt={8}
              glowColor="rgba(245, 158, 11, 0.25)"
              className="rounded-3xl border border-slate-800/90 bg-slate-950/85 p-8 hover:border-amber-500/60 hover:shadow-2xl hover:shadow-amber-500/15 shadow-md transition-all group"
            >
              <div
                style={{ transform: "translateZ(30px)" }}
                className="h-12 w-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm"
              >
                {pillar.icon}
              </div>
              <h3 className="font-display font-bold text-xl text-white mb-2 group-hover:text-amber-300 transition-colors">
                {pillar.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 font-sans font-medium leading-relaxed">
                {pillar.desc}
              </p>
            </TiltCard>
          ))}
        </div>

        {/* Strategic Guarantee Box */}
        <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-r from-slate-950 via-amber-950/30 to-slate-950 p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <div>
              <h4 className="font-display font-bold text-lg text-white">
                Our Non-Negotiable Principle: Quality Over Volume
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                We strictly limit our active retainer roster to 10 clients simultaneously to guarantee obsessive attention to detail, rapid turnarounds, and executive-level creative oversight.
              </p>
            </div>
          </div>

          {onOpenContact && (
            <button
              onClick={onOpenContact}
              className="shrink-0 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-lg shadow-amber-500/25 transition flex items-center gap-2 hover:scale-105"
            >
              <span>CHART YOUR TRAJECTORY</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

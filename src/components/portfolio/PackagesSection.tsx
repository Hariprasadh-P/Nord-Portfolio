"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Sparkles,
  Calculator,
  TrendingUp,
  Zap,
  Box,
} from "lucide-react";
import TiltCard from "./TiltCard";
import { soundFx } from "@/lib/soundFx";

export interface PackageItemData {
  id: string;
  name: string;
  tier: string;
  priceMonthly: number;
  priceQuarterly: number;
  description: string;
  features: string[];
  isPopular?: boolean;
  badge?: string | null;
  ctaText?: string;
  order?: number;
}

interface PackagesSectionProps {
  packages: PackageItemData[];
  onSelectPackage?: (packageName: string) => void;
}

export default function PackagesSection({
  packages,
  onSelectPackage,
}: PackagesSectionProps) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "quarterly">("monthly");

  // Interactive Scope Calculator state
  const [reelsCount, setReelsCount] = useState<number>(16);
  const [adSpendTier, setAdSpendTier] = useState<string>("scale");
  const [includeAdManagement, setIncludeAdManagement] = useState<boolean>(true);
  const [include3D, setInclude3D] = useState<boolean>(false);

  // Dynamic scope calculation
  const calculatedEstimate = React.useMemo(() => {
    let base = 2500;
    base += reelsCount * 220;
    if (includeAdManagement) {
      if (adSpendTier === "starter") base += 1200;
      else if (adSpendTier === "scale") base += 2400;
      else base += 4500;
    }
    if (include3D) {
      base += 1500;
    }
    const finalMonthly = Math.round(base / 50) * 50;
    return {
      monthly: finalMonthly,
      quarterly: Math.round(finalMonthly * 3 * 0.9),
    };
  }, [reelsCount, adSpendTier, includeAdManagement, include3D]);

  const handleApplyCalculatedScope = () => {
    soundFx.playSuccessChime();
    const scopeLabel = `Custom Retainer (${reelsCount} Reels/mo${includeAdManagement ? " + Meta Ads" : ""}${include3D ? " + 3D CGI" : ""} — ~$${calculatedEstimate.monthly.toLocaleString()}/mo)`;
    onSelectPackage?.(scopeLabel);
  };

  return (
    <section id="packages" className="relative py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Navigational Waypoint & Header in Emerald Jade */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-slate-950/80 px-4 py-1 text-xs font-mono backdrop-blur-md shadow-md mb-3 text-emerald-400 font-bold">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>090Â° EAST</span>
            <span className="text-emerald-600">â€¢</span>
            <span className="uppercase tracking-widest text-[11px]">RATE CARD & RETAINER TIERS</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
            Our{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 bg-clip-text text-transparent">
              Tariff
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 font-display italic font-medium">
            &ldquo;Find your bearing â€” scalable creative production and growth partnerships&rdquo;
          </p>

          {/* Billing Cycle Switcher in Emerald */}
          <div className="mt-6 inline-flex items-center rounded-2xl bg-slate-950/90 p-1.5 border border-slate-800 shadow-sm">
            <button
              onClick={() => {
                soundFx.playHoverTick();
                setBillingCycle("monthly");
              }}
              className={`px-5 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                billingCycle === "monthly"
                  ? "bg-slate-800 text-white shadow-md"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              Monthly Retainer
            </button>
            <button
              onClick={() => {
                soundFx.playHoverTick();
                setBillingCycle("quarterly");
              }}
              className={`px-5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                billingCycle === "quarterly"
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              <span>Quarterly Partnership</span>
              <span className="rounded-full bg-emerald-500/20 text-emerald-300 px-2 py-0.5 text-[9px] font-mono font-bold">
                -10% OFF
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-16" style={{ perspective: 1200 }}>
          {packages.map((pkg) => {
            const price =
              billingCycle === "monthly" ? pkg.priceMonthly : pkg.priceQuarterly;

            return (
              <TiltCard
                key={pkg.id}
                maxTilt={8}
                glowColor={pkg.isPopular ? "rgba(16, 185, 129, 0.35)" : "rgba(16, 185, 129, 0.18)"}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                  pkg.isPopular
                    ? "bg-slate-950/95 border-2 border-emerald-500 shadow-2xl shadow-emerald-500/25 md:-translate-y-2"
                    : "bg-slate-950/80 border border-slate-800/90 shadow-lg hover:border-emerald-500/50 hover:shadow-xl"
                }`}
              >
                {/* Popular Highlight Badge */}
                {pkg.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 text-xs font-mono font-extrabold shadow-lg shadow-emerald-500/30">
                      <Sparkles className="h-3 w-3 fill-slate-950" />
                      <span>{pkg.badge}</span>
                    </span>
                  </div>
                )}

                <div>
                  {/* Tier & Name */}
                  <div className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                    {pkg.tier}
                  </div>
                  <h3 className="font-display font-black text-2xl text-white mt-1">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 font-sans font-medium line-clamp-3">
                    {pkg.description}
                  </p>

                  {/* Price Tag */}
                  <div className="my-6 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-baseline gap-2">
                    <span className="font-display font-black text-4xl text-white">
                      ${price.toLocaleString()}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {billingCycle === "monthly" ? "/ month" : "/ quarter"}
                    </span>
                  </div>

                  {/* Features Checklist */}
                  <div className="space-y-3">
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-bold">
                      DELIVERABLES INCLUDED:
                    </div>
                    {pkg.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <div className="mt-0.5 h-4 w-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                          <Check className="h-2.5 w-2.5 stroke-[3]" />
                        </div>
                        <span className="font-medium">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Call to Action Button */}
                <div className="mt-8 pt-6 border-t border-slate-800">
                  <button
                    onClick={() => {
                      soundFx.playSuccessChime();
                      onSelectPackage?.(`${pkg.name} (${pkg.tier})`);
                    }}
                    className={`w-full py-3.5 px-6 rounded-2xl text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      pkg.isPopular
                        ? "bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-slate-950 font-black shadow-lg shadow-emerald-500/30 hover:scale-105"
                        : "bg-slate-900 hover:bg-emerald-600 text-white border border-slate-700 hover:border-emerald-500"
                    }`}
                  >
                    <span>{pkg.ctaText || "Select Retainer"}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </TiltCard>
            );
          })}
        </div>

        {/* ============================================================== */}
        {/* INTERACTIVE SCOPE & RETAINER CALCULATOR */}
        {/* ============================================================== */}
        <div className="rounded-3xl border border-emerald-500/40 bg-slate-950/90 p-8 sm:p-10 shadow-2xl relative overflow-hidden backdrop-blur-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-bold">
                <Calculator className="h-3.5 w-3.5 text-emerald-400" />
                <span>INTERACTIVE SCOPE ESTIMATOR</span>
              </div>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
                Customize Your Dedicated Creative Engine
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 font-medium">
                Adjust required vertical video volume, 3D CGI assets, and ad spend scale to dynamically estimate your custom retainer investment.
              </p>
            </div>

            {/* Price Output Display */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-emerald-500/50 flex flex-col items-center justify-center min-w-[240px] text-center shadow-lg">
              <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                ESTIMATED MONTHLY INVESTMENT
              </span>
              <div className="font-display font-black text-3xl sm:text-4xl text-white my-1">
                ${calculatedEstimate.monthly.toLocaleString()}
                <span className="text-xs font-mono text-slate-400 font-normal">/mo</span>
              </div>
              <button
                onClick={handleApplyCalculatedScope}
                className="mt-3 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-mono font-black text-xs uppercase tracking-wider shadow-md hover:scale-105 transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Transfer to Brief</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive Sliders & Toggles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 pt-8 border-t border-slate-800">
            {/* Slider: 9:16 Reels per month */}
            <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-white">
                <span className="flex items-center gap-1.5 text-emerald-300">
                  <Zap className="h-3.5 w-3.5" />
                  <span>Vertical Reels / Month</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-md bg-emerald-950 border border-emerald-500/50 text-emerald-400 font-mono">
                  {reelsCount} Assets
                </span>
              </div>
              <input
                type="range"
                min="8"
                max="32"
                step="4"
                value={reelsCount}
                onChange={(e) => setReelsCount(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>8 Reels</span>
                <span>16 Reels</span>
                <span>24 Reels</span>
                <span>32 Reels</span>
              </div>
            </div>

            {/* Toggle: 3D CGI / Product Animations */}
            <div
              onClick={() => {
                soundFx.playHoverTick();
                setInclude3D(!include3D);
              }}
              className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                include3D
                  ? "bg-emerald-950/30 border-emerald-500/70 shadow-md shadow-emerald-500/10"
                  : "bg-slate-900/70 border-slate-800 hover:border-slate-700"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-white">
                  <Box className="h-3.5 w-3.5 text-emerald-400" />
                  <span>3D CGI Product Visuals</span>
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                    include3D
                      ? "bg-emerald-500 text-slate-950"
                      : "bg-slate-800 text-slate-400"
                  }`}
                >
                  {include3D ? "ENABLED" : "OFF"}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-sans mt-2">
                Photorealistic 3D render pipelines and holographic simulated loops.
              </p>
            </div>

            {/* Toggle & Tier: Meta Paid Ad Management */}
            <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-white">
                  <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Meta / TikTok Ad Media</span>
                </span>
                <button
                  onClick={() => {
                    soundFx.playHoverTick();
                    setIncludeAdManagement(!includeAdManagement);
                  }}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                    includeAdManagement
                      ? "bg-emerald-500 text-slate-950"
                      : "bg-slate-800 text-slate-400"
                  }`}
                >
                  {includeAdManagement ? "ACTIVE" : "OFF"}
                </button>
              </div>

              {includeAdManagement && (
                <div className="grid grid-cols-3 gap-1.5 pt-1">
                  {[
                    { id: "starter", label: "< $10k" },
                    { id: "scale", label: "$10k-$50k" },
                    { id: "enterprise", label: "$50k+" },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        soundFx.playHoverTick();
                        setAdSpendTier(t.id);
                      }}
                      className={`py-1 rounded text-[10px] font-mono font-bold transition ${
                        adSpendTier === t.id
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400"
                          : "bg-slate-800 text-slate-400 hover:text-white"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


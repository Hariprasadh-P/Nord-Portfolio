"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Compass, Check, Sparkles, Shield } from "lucide-react";
import TiltCard from "./TiltCard";

export interface PackageItemData {
  id: string;
  name: string;
  tier: string;
  priceMonthly: number;
  priceQuarterly: number;
  description: string;
  features: string[];
  isPopular: boolean;
  badge?: string | null;
  ctaText: string;
  order: number;
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

  return (
    <section id="packages" className="relative py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Navigational Waypoint & Header in Emerald Jade */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-slate-950/80 px-4 py-1 text-xs font-mono backdrop-blur-md shadow-md mb-3 text-emerald-400 font-bold">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>090° EAST</span>
            <span className="text-emerald-600">•</span>
            <span className="uppercase tracking-widest text-[11px]">RATE CARD & PLANS</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
            Our{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 bg-clip-text text-transparent">
              Tariff
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 font-display italic font-medium">
            &ldquo;Find your bearing — three routes to grow your brand&apos;s presence&rdquo;
          </p>

          {/* Billing Cycle Switcher in Emerald */}
          <div className="mt-6 inline-flex items-center rounded-2xl bg-slate-950/90 p-1.5 border border-slate-800 shadow-sm">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-5 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                billingCycle === "monthly"
                  ? "bg-slate-800 text-white shadow-md"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              Monthly Retainer
            </button>
            <button
              onClick={() => setBillingCycle("quarterly")}
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch" style={{ perspective: 1200 }}>
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
                {/* Popular Badge */}
                {pkg.isPopular && (
                  <div
                    style={{ transform: "translateZ(30px)" }}
                    className="absolute -top-3.5 left-1/2 -translate-x-1/2"
                  >
                    <span className="inline-flex items-center gap-1 px-4 py-1 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-[10px] font-mono font-bold uppercase tracking-widest shadow-md shadow-emerald-500/30">
                      <Sparkles className="h-3 w-3 text-emerald-200" />
                      <span>MOST POPULAR</span>
                    </span>
                  </div>
                )}

                <div>
                  {/* Bearing Subtitle */}
                  <div className="text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-widest mb-1">
                    {pkg.tier === "growth"
                      ? "090° EAST"
                      : pkg.tier === "basic"
                      ? "000° NORTH"
                      : "180° SOUTH"}
                  </div>

                  <h3 className="font-display font-black text-2xl text-white">
                    {pkg.name}
                  </h3>

                  <p className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider mt-0.5 mb-6">
                    {pkg.description}
                  </p>

                  {/* Price Block */}
                  <div className="flex items-baseline gap-1 py-4 border-y border-slate-800/80 mb-6">
                    <span className="font-display font-bold text-lg text-emerald-400">₹</span>
                    <span className="font-display font-black text-4xl sm:text-5xl text-white tracking-tight">
                      {price.toLocaleString()}
                    </span>
                    <span className="text-xs font-mono text-slate-400 ml-1">
                      / {billingCycle === "monthly" ? "month" : "quarter"}
                    </span>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3 mb-8">
                    <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                      INCLUDED DELIVERABLES:
                    </div>
                    {pkg.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-200">
                        <div className="h-4 w-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="h-2.5 w-2.5" />
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Action Button */}
                <button
                  onClick={() => onSelectPackage?.(pkg.name)}
                  className={`w-full py-3.5 rounded-2xl font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    pkg.isPopular
                      ? "bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02]"
                      : "bg-slate-900 hover:bg-emerald-950/60 text-slate-200 hover:text-emerald-300 border border-slate-800 hover:border-emerald-500/50"
                  }`}
                >
                  <span>{pkg.ctaText || "Select Plan & Brief"}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </TiltCard>
            );
          })}
        </div>

        {/* Enterprise Retainer Custom Brief Callout */}
        <div className="mt-12 rounded-3xl p-6 sm:p-8 bg-slate-950/90 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-display font-bold text-lg text-white">
                Need a Custom Omnichannel Trajectory?
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                We design tailored multi-city production crews, influencer seeding, and dedicated media spend management.
              </p>
            </div>
          </div>

          <button
            onClick={() => onSelectPackage?.("Custom Enterprise")}
            className="shrink-0 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs font-bold border border-slate-700 hover:border-emerald-500/50 transition flex items-center gap-2"
          >
            <Compass className="h-3.5 w-3.5 text-emerald-400" />
            <span>CUSTOM ENTERPRISE BRIEF</span>
          </button>
        </div>
      </div>
    </section>
  );
}

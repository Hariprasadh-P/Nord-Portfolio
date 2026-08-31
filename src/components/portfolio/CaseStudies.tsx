"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, TrendingUp, Sparkles } from "lucide-react";

import { CaseStudyItem } from "@/data/portfolioData";

export type CaseStudyData = CaseStudyItem;

interface CaseStudiesProps {
  caseStudies: CaseStudyItem[];
  onOpenContact?: () => void;
}

export default function CaseStudies({ caseStudies, onOpenContact }: CaseStudiesProps) {
  return (
    <section id="cases" className="relative py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-neon/30 bg-brand-neon/10 px-3.5 py-1 text-xs font-mono text-brand-neon mb-3">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Verified Case Studies</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
              Featured Client <span className="bg-gradient-to-r from-brand-neon to-cyan-neon bg-clip-text text-transparent">Transformations</span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-xl">
              Discover how we architected full-funnel paid media campaigns, 3D interactive experiences, and CRO engines to scale revenue.
            </p>
          </div>

          <button
            onClick={onOpenContact}
            className="inline-flex items-center gap-2 rounded-xl border border-surface-border bg-surface hover:bg-surface-elevated px-5 py-3 text-xs font-mono text-white transition hover:border-brand-neon/50"
          >
            <span>See Your Potential ROI</span>
            <ArrowUpRight className="h-4 w-4 text-brand-neon" />
          </button>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {caseStudies.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              className="group rounded-3xl border border-surface-border bg-surface-subtle overflow-hidden flex flex-col justify-between hover:border-brand-neon/50 transition-all hover:shadow-neon-green/10"
            >
              <div>
                {/* Image / Visual Header */}
                <div className="aspect-[16/10] relative overflow-hidden bg-zinc-950">
                  {item.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-85"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-surface to-surface-elevated" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-subtle via-transparent to-transparent" />

                  {/* Top Floating Category */}
                  <div className="absolute top-4 left-4">
                    <span className="rounded-lg bg-black/70 backdrop-blur-md px-3 py-1 text-[11px] font-mono font-medium text-white border border-white/10">
                      {item.category}
                    </span>
                  </div>

                  {/* Bottom Metric Badge */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="rounded-2xl border border-brand-neon/40 bg-surface/90 backdrop-blur-md p-3 shadow-lg flex items-center justify-between">
                      <div>
                        <div className="font-display font-black text-2xl text-brand-neon leading-none">
                          {item.roiMetric}
                        </div>
                        <div className="text-[10px] font-mono text-zinc-300 mt-1 uppercase">
                          {item.metricLabel}
                        </div>
                      </div>
                      <div className="h-8 w-8 rounded-full bg-brand-neon/20 flex items-center justify-center text-brand-neon">
                        <TrendingUp className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="text-xs font-mono font-semibold text-brand-neon uppercase tracking-wider mb-1">
                    {item.clientName}
                  </div>
                  <h3 className="font-display font-extrabold text-xl text-white group-hover:text-cyan-neon transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-3 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {item.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="rounded-md bg-surface px-2.5 py-1 text-[10px] font-mono text-zinc-400 border border-surface-border"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div className="p-6 pt-0 border-t border-surface-border/40 mt-4 flex items-center justify-between">
                <span className="text-[11px] font-mono text-zinc-500">
                  VERIFIED AUDIT DATA
                </span>
                <button
                  onClick={onOpenContact}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-brand-neon hover:text-white transition"
                >
                  <span>Replicate Results</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

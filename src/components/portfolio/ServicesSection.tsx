"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Sparkles,
  Globe,
  TrendingUp,
  Cpu,
  Layers,
  CheckCircle2,
  ArrowRight,
  Zap,
} from "lucide-react";

export interface ServiceItemData {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  deliverables: string[];
  metrics: { label: string; value: string }[];
  isFeatured: boolean;
  order: number;
}

interface ServicesSectionProps {
  services: ServiceItemData[];
  onSelectService?: (serviceTitle: string) => void;
}

export default function ServicesSection({
  services,
  onSelectService,
}: ServicesSectionProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeService = services[activeIdx] || services[0];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Target":    return <Target className="h-5 w-5" />;
      case "Sparkles":  return <Sparkles className="h-5 w-5" />;
      case "Globe":     return <Globe className="h-5 w-5" />;
      case "TrendingUp":return <TrendingUp className="h-5 w-5" />;
      case "Cpu":       return <Cpu className="h-5 w-5" />;
      case "Layers":    return <Layers className="h-5 w-5" />;
      default:          return <Zap className="h-5 w-5" />;
    }
  };

  return (
    <section id="services" className="relative py-24 bg-background overflow-hidden">
      {/* Background ambient */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-neon/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-neon/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-neon/30 bg-brand-neon/10 px-4 py-1 text-xs font-mono text-brand-neon mb-3">
            <Zap className="h-3.5 w-3.5" />
            <span>Growth Architecture</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
            Services Engineered for{" "}
            <span className="bg-gradient-to-r from-brand-neon via-cyan-neon to-purple-glow bg-clip-text text-transparent">
              Market Dominance
            </span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-3">
            Full-funnel growth infrastructure designed to acquire customers profitably and multiply lifetime value.
          </p>
        </div>

        {/* Interactive Services Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Service Selector Tabs */}
          <div className="lg:col-span-5 flex flex-col space-y-3">
            {services.map((service, idx) => {
              const isActive = activeIdx === idx;
              return (
                <motion.div
                  key={service.id}
                  onClick={() => setActiveIdx(idx)}
                  whileHover={{ x: 4 }}
                  className={`cursor-pointer rounded-2xl p-5 border transition-all duration-300 relative overflow-hidden ${
                    isActive
                      ? "bg-surface-subtle border-brand-neon/60 shadow-neon-green/20"
                      : "bg-surface/40 border-surface-border hover:border-surface-border/80 hover:bg-surface/80"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeServiceGlow"
                      className="absolute inset-0 bg-gradient-to-r from-brand-neon/10 via-transparent to-transparent pointer-events-none"
                    />
                  )}
                  <div className="flex items-start gap-4 relative z-10">
                    <div className={`p-3 rounded-xl transition-colors ${isActive ? "bg-gradient-to-br from-brand-neon to-cyan-neon text-black font-bold shadow-neon-green" : "bg-surface-elevated text-zinc-400"}`}>
                      {getIcon(service.icon)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className={`font-display font-bold text-base transition-colors ${isActive ? "text-white" : "text-zinc-300"}`}>
                          {service.title}
                        </h3>
                        <span className="text-[10px] font-mono text-zinc-500">0{idx + 1}</span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-1 line-clamp-2">{service.shortDescription}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: Active Service Detail */}
          {activeService && (
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-3xl border border-brand-neon/30 bg-surface-subtle/80 backdrop-blur-xl p-6 sm:p-8 relative overflow-hidden shadow-2xl"
                >
                  {/* Top Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-surface-border">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-widest text-brand-neon">
                        SERVICE SPECIFICATION
                      </span>
                      <h3 className="font-display font-black text-2xl sm:text-3xl text-white mt-1">
                        {activeService.title}
                      </h3>
                    </div>
                    <button
                      onClick={() => onSelectService?.(activeService.title)}
                      className="inline-flex items-center gap-2 rounded-xl bg-brand-neon px-4 py-2 text-xs font-bold uppercase tracking-wider text-black transition hover:shadow-neon-green"
                    >
                      <span>Inquire This Service</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* Description & Metrics */}
                  <div className="my-6 space-y-4">
                    <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                      {activeService.fullDescription}
                    </p>

                    {activeService.metrics && activeService.metrics.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                        {activeService.metrics.map((metric, i) => (
                          <div key={i} className="rounded-xl border border-surface-border bg-surface p-3 text-center">
                            <div className="font-display font-black text-xl text-brand-neon">{metric.value}</div>
                            <div className="text-[10px] font-mono text-zinc-400 uppercase mt-0.5">{metric.label}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Deliverables */}
                  <div className="pt-4 border-t border-surface-border">
                    <h4 className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider mb-3">
                      Included Deliverables:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {activeService.deliverables.map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-zinc-300 font-sans">
                          <CheckCircle2 className="h-4 w-4 text-brand-neon flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

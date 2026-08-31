"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TrendingUp, Award, DollarSign, Eye, ShieldCheck } from "lucide-react";

export default function ResultsMetrics() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stat1Ref = useRef<HTMLSpanElement>(null);
  const stat2Ref = useRef<HTMLSpanElement>(null);
  const stat3Ref = useRef<HTMLSpanElement>(null);
  const stat4Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const counters = [
        { ref: stat1Ref, end: 48, prefix: "$", suffix: "M+" },
        { ref: stat2Ref, end: 4.8, prefix: "", suffix: "x", decimals: 1 },
        { ref: stat3Ref, end: 140, prefix: "", suffix: "M+" },
        { ref: stat4Ref, end: 98.4, prefix: "", suffix: "%", decimals: 1 },
      ];

      counters.forEach((item) => {
        if (!item.ref.current) return;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: item.end,
          duration: 2.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            if (item.ref.current) {
              const formatted = item.decimals
                ? obj.val.toFixed(item.decimals)
                : Math.floor(obj.val).toString();
              item.ref.current.textContent = `${item.prefix}${formatted}${item.suffix}`;
            }
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    {
      ref: stat1Ref,
      defaultText: "$48M+",
      label: "Revenue Generated for Clients",
      sub: "Blended attributable sales across e-commerce & high-ticket tech.",
      icon: <DollarSign className="h-5 w-5 text-brand-neon" />,
      glow: "hover:shadow-neon-green/30",
    },
    {
      ref: stat2Ref,
      defaultText: "4.8x",
      label: "Average Portfolio ROAS",
      sub: "Sustained return across Meta, Google & TikTok Paid channels.",
      icon: <TrendingUp className="h-5 w-5 text-cyan-neon" />,
      glow: "hover:shadow-neon-cyan/30",
    },
    {
      ref: stat3Ref,
      defaultText: "140M+",
      label: "Organic & Paid Video Views",
      sub: "Viral creative hooks, 3D CGI visuals & direct response UGC.",
      icon: <Eye className="h-5 w-5 text-purple-neon" />,
      glow: "hover:shadow-neon-purple/30",
    },
    {
      ref: stat4Ref,
      defaultText: "98.4%",
      label: "Client Retention Rate",
      sub: "Long-term scaling partnerships averaging over 24+ months.",
      icon: <ShieldCheck className="h-5 w-5 text-brand-neon" />,
      glow: "hover:shadow-neon-green/30",
    },
  ];

  return (
    <section
      id="results"
      ref={sectionRef}
      className="relative py-24 bg-surface/50 border-y border-surface-border/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-neon/30 bg-purple-neon/10 px-4 py-1 text-xs font-mono text-purple-neon mb-3">
            <Award className="h-3.5 w-3.5" />
            <span>Verifiable Track Record</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
            Numbers That Speak{" "}
            <span className="bg-gradient-to-r from-brand-neon via-cyan-neon to-purple-neon bg-clip-text text-transparent">
              Louder Than Words
            </span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-3">
            Real data from real campaigns. We optimize for bottom-line profit, cash-flow velocity, and long-term brand equity.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`rounded-3xl border border-surface-border bg-surface-subtle/80 backdrop-blur-md p-6 flex flex-col justify-between transition-all duration-300 hover:border-brand-neon/40 hover:-translate-y-1 ${stat.glow}`}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="p-2.5 rounded-xl bg-surface-elevated border border-surface-border">
                  {stat.icon}
                </div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                  METRIC // 0{i + 1}
                </span>
              </div>

              <div>
                <div className="font-display font-black text-4xl sm:text-5xl text-white tracking-tight">
                  <span ref={stat.ref}>{stat.defaultText}</span>
                </div>
                <h3 className="font-display font-bold text-base text-zinc-200 mt-2">
                  {stat.label}
                </h3>
                <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed font-sans">
                  {stat.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

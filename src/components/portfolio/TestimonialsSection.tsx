"use client";

import React from "react";
import { Star, Quote, Sparkles } from "lucide-react";

export interface TestimonialData {
  id: string;
  author: string;
  role: string;
  company: string;
  quote: string;
  avatarUrl?: string | null;
  metric?: string | null;
  rating: number;
  isFeatured: boolean;
  order: number;
}

interface TestimonialsSectionProps {
  testimonials?: TestimonialData[];
}

export default function TestimonialsSection({
  testimonials = [],
}: TestimonialsSectionProps) {
  // If empty, keep clean and minimal without fake placeholder content
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section className="relative py-24 bg-background border-t border-surface-border/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1 text-xs font-mono text-brand-neon mb-3">
            <Star className="h-3.5 w-3.5 fill-current" />
            <span>Client Endorsements & Praises</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
            Endorsed by Premier{" "}
            <span className="bg-gradient-to-r from-brand-neon via-brand-glow to-purple-300 bg-clip-text text-transparent">
              Brand Executives
            </span>
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl border border-surface-border bg-surface-subtle p-8 flex flex-col justify-between relative hover:border-brand-500/40 transition-all hover:shadow-neon-purple/20"
            >
              <div className="absolute top-6 right-6 text-zinc-700 pointer-events-none">
                <Quote className="h-10 w-10 opacity-30 text-brand-neon" />
              </div>

              <div>
                {/* Stars */}
                <div className="flex items-center gap-1 text-brand-neon mb-4">
                  {[...Array(item.rating || 5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic font-sans">
                  &ldquo;{item.quote}&rdquo;
                </p>

                {/* Metric pill */}
                {item.metric && (
                  <div className="mt-4 inline-block rounded-lg bg-brand-500/10 border border-brand-500/30 px-2.5 py-1 text-[11px] font-mono text-brand-neon">
                    {item.metric}
                  </div>
                )}
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3 pt-6 border-t border-surface-border mt-6">
                {item.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.avatarUrl}
                    alt={item.author}
                    className="h-11 w-11 rounded-full object-cover border border-brand-500/40"
                  />
                ) : (
                  <div className="h-11 w-11 rounded-full bg-surface-elevated border border-brand-500/40 flex items-center justify-center font-display font-bold text-brand-neon">
                    {item.author.charAt(0)}
                  </div>
                )}
                <div>
                  <h4 className="font-display font-bold text-sm text-white">
                    {item.author}
                  </h4>
                  <p className="text-xs text-zinc-400 font-sans">
                    {item.role} {item.company ? `• ${item.company}` : ""}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

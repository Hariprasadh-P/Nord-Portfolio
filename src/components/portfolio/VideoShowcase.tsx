"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Film,
  Play,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Clock,
  Building2,
  Tag,
  Eye,
} from "lucide-react";
import UniversalVideoPlayer from "./UniversalVideoPlayer";
import TiltCard from "./TiltCard";
import { soundFx } from "@/lib/soundFx";

export interface VideoItemData {
  id: string;
  title: string;
  description?: string | null;
  videoUrl: string;
  posterUrl?: string | null;
  category: string;
  clientName?: string | null;
  duration?: string;
  isFeatured?: boolean;
  order?: number;
}

interface VideoShowcaseProps {
  videos: VideoItemData[];
}

export default function VideoShowcase({ videos = [] }: VideoShowcaseProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [modalVideo, setModalVideo] = useState<VideoItemData | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const categories = [
    "All",
    "Brand Commercials",
    "9:16 Vertical Reels",
    "3D Motion / CGI",
    "Performance Ads",
  ];

  const filteredVideos =
    selectedCategory === "All"
      ? videos
      : videos.filter((v) => v.category === selectedCategory);

  const scrollLeft = () => {
    soundFx.playHoverTick();
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -360, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    soundFx.playHoverTick();
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 360, behavior: "smooth" });
    }
  };

  const handleOpenVideo = (video: VideoItemData) => {
    soundFx.playSuccessChime();
    setModalVideo(video);
  };

  return (
    <section id="showreel" className="relative py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Header & 3D Spatial Waypoint */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/40 bg-slate-950/80 px-4 py-1 text-xs font-mono backdrop-blur-md shadow-md mb-3 text-sky-400 font-bold">
              <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse" />
              <span>000° NORTH</span>
              <span className="text-sky-600">•</span>
              <span className="uppercase tracking-widest text-[11px]">CINEMATIC GALLERY & SHOWCASE</span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
              Vertical Reels &{" "}
              <span className="bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Commercials
              </span>
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-xl font-sans font-medium">
              Explore 4K brand commercials, high-velocity viral short-form assets, and photorealistic 3D ray-traced simulations.
            </p>
          </div>

          {/* Navigation Scroll Chevrons */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={scrollLeft}
              className="p-2.5 rounded-2xl bg-slate-950/90 border border-slate-800 text-slate-400 hover:text-white hover:border-sky-500/50 hover:bg-slate-900 transition shadow-sm"
              title="Scroll Left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={scrollRight}
              className="p-2.5 rounded-2xl bg-slate-950/90 border border-slate-800 text-slate-400 hover:text-white hover:border-sky-500/50 hover:bg-slate-900 transition shadow-sm"
              title="Scroll Right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 p-1.5 rounded-2xl bg-slate-950/90 border border-slate-800/80 w-fit backdrop-blur-xl">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  soundFx.playHoverTick();
                  setSelectedCategory(cat);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? "bg-gradient-to-r from-sky-600 via-cyan-600 to-blue-600 text-white shadow-md shadow-sky-500/30 scale-[1.02]"
                    : "text-slate-400 hover:text-white hover:bg-slate-900"
                }`}
              >
                {cat === "All" ? <Film className="h-3.5 w-3.5" /> : <Tag className="h-3.5 w-3.5" />}
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* 2.5D Horizontal Horizontal Scroll Carousel */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-8 pt-2 scrollbar-none snap-x snap-mandatory"
          style={{ perspective: 1200 }}
        >
          {filteredVideos.map((video) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={video.id}
              className="flex-shrink-0 w-[300px] sm:w-[360px] snap-start"
            >
              <TiltCard
                maxTilt={8}
                glowColor="rgba(56, 189, 248, 0.25)"
                className="group relative rounded-3xl overflow-hidden bg-slate-950/90 border border-slate-800/80 hover:border-sky-500/60 shadow-xl transition-all duration-300 flex flex-col justify-between h-full"
              >
                {/* Video Card Poster & Play Trigger */}
                <div
                  onClick={() => handleOpenVideo(video)}
                  className="relative aspect-[9/14] w-full overflow-hidden bg-slate-900 cursor-pointer"
                >
                  {video.posterUrl ? (
                    <img
                      src={video.posterUrl}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-900">
                      <Film className="h-12 w-12 text-slate-700" />
                    </div>
                  )}

                  {/* Dark Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* Category & Duration Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className="px-3 py-1 rounded-full bg-slate-950/90 border border-sky-500/40 text-sky-300 text-[10px] font-mono font-bold backdrop-blur-md">
                      {video.category}
                    </span>
                    {video.duration && (
                      <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-950/90 border border-slate-700 text-slate-300 text-[10px] font-mono font-bold backdrop-blur-md">
                        <Clock className="h-3 w-3 text-sky-400" />
                        <span>{video.duration}</span>
                      </span>
                    )}
                  </div>

                  {/* Centered Glowing Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-14 w-14 rounded-full bg-sky-500/90 text-white flex items-center justify-center shadow-lg shadow-sky-500/40 group-hover:scale-115 transition-transform duration-300">
                      <Play className="h-6 w-6 fill-white translate-x-0.5" />
                    </div>
                  </div>

                  {/* Client Name Stamp */}
                  {video.clientName && (
                    <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center gap-1.5 text-xs font-mono text-sky-300 font-bold">
                      <Building2 className="h-3.5 w-3.5 text-sky-400" />
                      <span>{video.clientName}</span>
                    </div>
                  )}
                </div>

                {/* Bottom Details Footer */}
                <div className="p-5 bg-slate-950/90 border-t border-slate-800/80 space-y-2">
                  <h3 className="font-display font-bold text-base text-white group-hover:text-sky-300 transition-colors line-clamp-1">
                    {video.title}
                  </h3>
                  {video.description && (
                    <p className="text-xs text-slate-400 font-sans line-clamp-2 font-medium">
                      {video.description}
                    </p>
                  )}
                  <button
                    onClick={() => handleOpenVideo(video)}
                    className="pt-2 w-full flex items-center justify-between text-xs font-mono font-bold text-sky-400 hover:text-sky-300 transition"
                  >
                    <span>Play 4K Theater Reel</span>
                    <Eye className="h-3.5 w-3.5" />
                  </button>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* 4K Modal Player */}
        <AnimatePresence>
          {modalVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 sm:p-8"
              onClick={() => setModalVideo(null)}
            >
              <div
                className="relative w-full max-w-5xl rounded-3xl overflow-hidden border border-sky-500/50 bg-slate-950 shadow-2xl shadow-sky-500/20"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse" />
                    <span className="font-display font-bold text-sm text-white">
                      {modalVideo.title}
                    </span>
                  </div>
                  <button
                    onClick={() => setModalVideo(null)}
                    className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition"
                  >
                    ✕
                  </button>
                </div>

                <div className="aspect-video w-full bg-black">
                  <UniversalVideoPlayer
                    url={modalVideo.videoUrl}
                    title={modalVideo.title}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

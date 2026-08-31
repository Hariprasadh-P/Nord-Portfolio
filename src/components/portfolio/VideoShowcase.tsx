"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Film,
  X,
  Sparkles,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Smartphone,
  Play,
  Volume2,
} from "lucide-react";
import UniversalVideoPlayer from "./UniversalVideoPlayer";
import TiltCard from "./TiltCard";

export interface VideoItemData {
  id: string;
  title: string;
  description?: string | null;
  videoUrl: string;
  posterUrl?: string | null;
  category: string;
  clientName?: string | null;
  isFeatured: boolean;
  order: number;
}

interface VideoShowcaseProps {
  videos: VideoItemData[];
}

export default function VideoShowcase({ videos = [] }: VideoShowcaseProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [modalVideo, setModalVideo] = useState<VideoItemData | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const categories = ["All", ...Array.from(new Set(videos.map((v) => v.category)))];

  const filteredVideos =
    selectedCategory === "All"
      ? videos
      : videos.filter((v) => v.category === selectedCategory);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -340, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 340, behavior: "smooth" });
    }
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
              <span className="uppercase tracking-widest text-[11px]">3D REELS GALLERY</span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
              Vertical Reels &{" "}
              <span className="bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Commercials
              </span>
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-xl font-sans font-medium">
              Interact and scroll horizontally in 2.5D perspective to explore our high-impact vertical showcase.
            </p>
          </div>

          {/* Categories & Scroll Navigation Buttons */}
          <div className="flex items-center gap-3">
            {categories.length > 1 && (
              <div className="flex flex-wrap gap-1.5 rounded-2xl bg-slate-950/90 p-1.5 border border-slate-800 shadow-sm">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? "bg-gradient-to-r from-sky-600 via-cyan-600 to-blue-600 text-white shadow-md shadow-sky-500/30"
                        : "text-slate-400 hover:text-white hover:bg-slate-900"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}

            {/* Left / Right Chevron Arrows */}
            <div className="hidden sm:flex items-center gap-2 pl-2">
              <button
                onClick={scrollLeft}
                className="p-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-sky-500/50 text-slate-300 hover:text-white transition-all shadow-md active:scale-95 cursor-pointer"
                title="Scroll Left"
                aria-label="Previous Reels"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={scrollRight}
                className="p-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-sky-500/50 text-slate-300 hover:text-white transition-all shadow-md active:scale-95 cursor-pointer"
                title="Scroll Right"
                aria-label="Next Reels"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* 3D PERSPECTIVE HORIZONTAL REELS TRACK */}
        {filteredVideos.length > 0 ? (
          <div className="relative" style={{ perspective: 1200 }}>
            <div
              ref={scrollContainerRef}
              className="flex items-stretch gap-8 overflow-x-auto pb-10 pt-4 px-2 scroll-smooth snap-x snap-mandatory scrollbar-none"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none", transformStyle: "preserve-3d" }}
            >
              {filteredVideos.map((video, idx) => (
                <div
                  key={video.id}
                  className="w-[280px] sm:w-[320px] lg:w-[330px] shrink-0 snap-center"
                >
                  <TiltCard
                    maxTilt={10}
                    glowColor="rgba(56, 189, 248, 0.35)"
                    className="w-full aspect-[9/16] rounded-[36px] overflow-hidden border-2 border-slate-800 bg-slate-950 shadow-2xl hover:border-sky-400 hover:shadow-[0_20px_50px_rgba(2,132,199,0.3)] transition-all duration-300 flex flex-col justify-between relative group"
                  >
                    {/* Top Bar on Reel Card with 3D Pop */}
                    <div
                      style={{ transform: "translateZ(25px)" }}
                      className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between bg-gradient-to-b from-black/90 via-black/40 to-transparent z-20 pointer-events-none"
                    >
                      <span className="px-2.5 py-1 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-700/80 text-sky-400 text-[10px] font-mono font-bold">
                        {video.category}
                      </span>

                      <button
                        onClick={() => setModalVideo(video)}
                        className="p-2 rounded-xl bg-slate-950/80 hover:bg-sky-600 text-slate-300 hover:text-white border border-slate-800 transition pointer-events-auto cursor-pointer"
                        title="Fullscreen 4K"
                      >
                        <Maximize2 className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    {/* Direct 9:16 Video Player */}
                    <div className="w-full h-full relative bg-black">
                      <UniversalVideoPlayer
                        key={video.id + video.videoUrl}
                        url={video.videoUrl}
                        title={video.title}
                        posterUrl={video.posterUrl}
                        autoPlay={false}
                        controls={true}
                        loop={true}
                        muted={false}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Bottom Overlay with 3D Depth */}
                    <div
                      style={{ transform: "translateZ(25px)" }}
                      className="absolute bottom-0 left-0 right-0 p-4 pt-10 bg-gradient-to-t from-black/95 via-black/70 to-transparent z-20 pointer-events-none"
                    >
                      {video.clientName && (
                        <div className="text-[10px] font-mono font-bold text-sky-400 uppercase tracking-wider mb-0.5">
                          {video.clientName}
                        </div>
                      )}
                      <h4 className="font-display font-bold text-base text-white drop-shadow-md line-clamp-1">
                        {video.title}
                      </h4>
                      {video.description && (
                        <p className="text-[11px] text-slate-300 line-clamp-2 mt-1 font-sans leading-snug">
                          {video.description}
                        </p>
                      )}
                    </div>
                  </TiltCard>
                </div>
              ))}
            </div>

            {/* Gradient Edge Fade */}
            <div className="absolute top-0 bottom-10 right-0 w-16 bg-gradient-to-l from-[#050B14] to-transparent pointer-events-none hidden sm:block opacity-80" />
          </div>
        ) : (
          <div className="p-12 rounded-3xl border border-dashed border-slate-800 bg-slate-950/80 text-center">
            <Film className="h-12 w-12 text-sky-400 mx-auto mb-3 opacity-60" />
            <h3 className="font-display font-bold text-xl text-white">No Reels Found</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
              Upload 9:16 vertical video reels via the Admin Console.
            </p>
          </div>
        )}

        {/* Bottom Horizontal Swipe Guide */}
        <div className="mt-2 flex items-center justify-between text-xs font-mono text-slate-500">
          <span className="flex items-center gap-1.5">
            <Smartphone className="h-3.5 w-3.5 text-sky-400" />
            <span>2.5D Interactive Reel Deck ({filteredVideos.length} Project Reels)</span>
          </span>
          <span className="hidden sm:inline">Hover for 3D tilt · Scroll horizontally to browse →</span>
        </div>
      </div>

      {/* 9:16 VERTICAL FULLSCREEN MODAL */}
      <AnimatePresence>
        {modalVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl"
            onClick={() => setModalVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, rotateX: 10 }}
              animate={{ scale: 1, rotateX: 0 }}
              exit={{ scale: 0.9, rotateX: -10 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[360px] sm:max-w-[390px] aspect-[9/16] max-h-[90vh] rounded-[36px] overflow-hidden border-2 border-sky-500/50 bg-black shadow-[0_0_90px_rgba(2,132,199,0.4)] flex flex-col justify-between"
            >
              {/* Modal Top Bar */}
              <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between bg-gradient-to-b from-black/90 via-black/50 to-transparent z-20">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-sky-500/20 text-sky-400 text-xs font-mono font-bold">
                    {modalVideo.category}
                  </span>
                  <h3 className="font-display font-bold text-white text-xs sm:text-sm truncate max-w-[180px]">
                    {modalVideo.title}
                  </h3>
                </div>
                <button
                  onClick={() => setModalVideo(null)}
                  className="p-1.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* 9:16 Video Player Stream */}
              <div className="w-full h-full relative bg-black">
                <UniversalVideoPlayer
                  key={"modal_" + modalVideo.id + modalVideo.videoUrl}
                  url={modalVideo.videoUrl}
                  title={modalVideo.title}
                  posterUrl={modalVideo.posterUrl}
                  autoPlay={true}
                  controls={true}
                  loop={true}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

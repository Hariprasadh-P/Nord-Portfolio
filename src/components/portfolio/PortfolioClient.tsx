"use client";

import React, { useState } from "react";
import Navbar from "@/components/portfolio/Navbar";
import SpatialWorld from "@/components/portfolio/SpatialWorld";
import NordIntroSplash from "@/components/portfolio/NordIntroSplash";
import UniversalVideoPlayer from "@/components/portfolio/UniversalVideoPlayer";
import { VideoItemData } from "@/components/portfolio/VideoShowcase";
import { PackageItemData } from "@/components/portfolio/PackagesSection";
import { TestimonialData } from "@/components/portfolio/TestimonialsSection";
import { CardinalDirection } from "@/components/canvas/CompassModel3D";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface PortfolioData {
  settings: {
    agencyName: string;
    logoUrl?: string;
    motoLine: string;
    subHeadline: string;
    aboutText: string;
    contactEmail: string;
    contactPhone: string;
    location: string;
    instagramUrl?: string | null;
    linkedinUrl?: string | null;
    twitterUrl?: string | null;
    youtubeUrl?: string | null;
    accentColor: string;
  };
  videos: VideoItemData[];
  packages: PackageItemData[];
  testimonials?: TestimonialData[];
}

export default function PortfolioClient({ data }: { data: PortfolioData }) {
  const [showSplash, setShowSplash] = useState(true);
  const [activeDirection, setActiveDirection] = useState<CardinalDirection>("hub");
  const [selectedPackage, setSelectedPackage] = useState("");
  const [videoModal, setVideoModal] = useState<{ isOpen: boolean; url: string; title: string }>({
    isOpen: false,
    url: "",
    title: "",
  });

  const handleSelectPackage = (name: string) => {
    setSelectedPackage(name);
    setActiveDirection("west"); // West is Contact sector
  };

  const handleOpenVideoModal = (url: string, title: string) => {
    setVideoModal({ isOpen: true, url, title });
  };

  return (
    <main className="h-screen w-screen bg-[#07080D] text-zinc-100 selection:bg-purple-900 selection:text-purple-200 relative overflow-hidden">
      {/* Top Navbar with Spatial Bearing Indicator and Nord Logo Compass */}
      <Navbar
        agencyName={data.settings?.agencyName}
        logoUrl={data.settings?.logoUrl}
        activeDirection={activeDirection}
        onSelectDirection={setActiveDirection}
      />

      {/* Spatial 4-Direction World Canvas */}
      <SpatialWorld
        settings={data.settings}
        videos={data.videos}
        packages={data.packages}
        testimonials={data.testimonials}
        activeDirection={activeDirection}
        onSelectDirection={setActiveDirection}
        onOpenVideoModal={handleOpenVideoModal}
        selectedPackage={selectedPackage}
        onSelectPackage={handleSelectPackage}
      />

      {/* Intro Loading Splash with Nord Compass Logo */}
      <AnimatePresence>
        {showSplash && (
          <NordIntroSplash onComplete={() => setShowSplash(false)} />
        )}
      </AnimatePresence>

      {/* Standalone 4K Video Player Modal */}
      <AnimatePresence>
        {videoModal.isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 sm:p-8"
            onClick={() => setVideoModal({ isOpen: false, url: "", title: "" })}
          >
            <div
              className="relative w-full max-w-5xl rounded-3xl overflow-hidden border border-purple-500/50 bg-slate-950 shadow-2xl shadow-purple-500/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-purple-400 animate-pulse" />
                  <span className="font-display font-bold text-sm text-white">
                    {videoModal.title}
                  </span>
                </div>
                <button
                  onClick={() => setVideoModal({ isOpen: false, url: "", title: "" })}
                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="aspect-video w-full bg-black">
                <UniversalVideoPlayer
                  url={videoModal.url}
                  title={videoModal.title}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

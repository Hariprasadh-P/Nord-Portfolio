"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/portfolio/Navbar";
import SpatialWorld from "@/components/portfolio/SpatialWorld";
import NordIntroSplash from "@/components/portfolio/NordIntroSplash";
import UniversalVideoPlayer from "@/components/portfolio/UniversalVideoPlayer";
import { CardinalDirection } from "@/components/canvas/CompassModel3D";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { PortfolioData } from "@/data/portfolioData";
import { soundFx } from "@/lib/soundFx";

export default function PortfolioClient({ data: initialData }: { data: PortfolioData }) {
  const [data, setData] = useState<PortfolioData>(initialData);
  const [showSplash, setShowSplash] = useState(true);
  const [activeDirection, setActiveDirection] = useState<CardinalDirection>("hub");
  const [selectedPackage, setSelectedPackage] = useState("");
  const [videoModal, setVideoModal] = useState<{ isOpen: boolean; url: string; title: string }>({
    isOpen: false,
    url: "",
    title: "",
  });

  // Hydrate with live DB data on mount
  useEffect(() => {
    async function fetchLiveData() {
      try {
        const res = await fetch("/api/public/content");
        const json = await res.json();
        if (json.success && json.data) {
          setData((prev) => ({
            ...prev,
            ...json.data,
            // Preserve static fallbacks for any missing fields
            settings: json.data.settings || prev.settings,
            videos: json.data.videos?.length ? json.data.videos : prev.videos,
            packages: json.data.packages?.length ? json.data.packages : prev.packages,
            testimonials: json.data.testimonials?.length ? json.data.testimonials : prev.testimonials,
            services: json.data.services?.length ? json.data.services : prev.services,
            caseStudies: json.data.caseStudies?.length ? json.data.caseStudies : prev.caseStudies,
          }));
        }
      } catch {
        // Silently keep static data on error
      }
    }
    fetchLiveData();
  }, []);

  const handleSelectPackage = (name: string) => {
    setSelectedPackage(name);
    setActiveDirection("west");
    soundFx.playCoordinateWarp();
  };

  const handleOpenVideoModal = (url: string, title: string) => {
    soundFx.playSuccessChime();
    setVideoModal({ isOpen: true, url, title });
  };

  return (
    <main className="h-screen w-screen bg-[#07080D] text-zinc-100 selection:bg-purple-900 selection:text-purple-200 relative overflow-hidden">
      <Navbar
        agencyName={data.settings?.agencyName}
        logoUrl={data.settings?.logoUrl}
        activeDirection={activeDirection}
        onSelectDirection={setActiveDirection}
      />

      <SpatialWorld
        settings={data.settings}
        videos={data.videos}
        packages={data.packages}
        caseStudies={data.caseStudies}
        testimonials={data.testimonials}
        services={data.services}
        activeDirection={activeDirection}
        onSelectDirection={setActiveDirection}
        onOpenVideoModal={handleOpenVideoModal}
        selectedPackage={selectedPackage}
        onSelectPackage={handleSelectPackage}
      />

      <AnimatePresence>
        {showSplash && (
          <NordIntroSplash onComplete={() => setShowSplash(false)} />
        )}
      </AnimatePresence>

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

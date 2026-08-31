"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { CardinalDirection } from "@/components/canvas/CompassModel3D";
import MiniHUDCompass3D from "@/components/canvas/MiniHUDCompass3D";
import HubSector from "./HubSector";
import VideoShowcase, { VideoItemData } from "./VideoShowcase";
import PackagesSection, { PackageItemData } from "./PackagesSection";
import ServicesSection, { ServiceItemData } from "./ServicesSection";
import AboutSection from "./AboutSection";
import ContactSection from "./ContactSection";
import CaseStudies, { CaseStudyData } from "./CaseStudies";
import TestimonialsSection, { TestimonialData } from "./TestimonialsSection";
import Footer from "./Footer";
import {
  ArrowUp,
  ArrowRight,
  ArrowDown,
  ArrowLeft,
  Home,
  Compass,
  X,
  Navigation,
  Layers,
} from "lucide-react";
import { soundFx } from "@/lib/soundFx";

interface SpatialWorldProps {
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
    whatsappNumber?: string;
    calendlyUrl?: string;
    accentColor: string;
  };
  videos: VideoItemData[];
  packages: PackageItemData[];
  services?: ServiceItemData[];
  caseStudies?: CaseStudyData[];
  testimonials?: TestimonialData[];
  activeDirection: CardinalDirection;
  onSelectDirection: (direction: CardinalDirection) => void;
  onOpenVideoModal: (url: string, title: string) => void;
  selectedPackage: string;
  onSelectPackage: (name: string) => void;
}

export default function SpatialWorld({
  settings,
  videos,
  packages,
  services,
  caseStudies,
  testimonials,
  activeDirection,
  onSelectDirection,
  onOpenVideoModal,
  selectedPackage,
  onSelectPackage,
}: SpatialWorldProps) {
  const [hoveredDirection, setHoveredDirection] = useState<CardinalDirection | null>(null);
  const [isRadarMode, setIsRadarMode] = useState(false);
  const [transitLabel, setTransitLabel] = useState<string | null>(null);
  const [transitAltitude, setTransitAltitude] = useState<string | null>(null);

  // Touch swipe handling for mobile/tablets
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  // Sector scroll container refs
  const northRef = useRef<HTMLDivElement>(null);
  const eastRef = useRef<HTMLDivElement>(null);
  const southRef = useRef<HTMLDivElement>(null);
  const westRef = useRef<HTMLDivElement>(null);

  // 2.5D Mouse Parallax on Background Grid & Particles
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const bgMoveX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-25, 25]), { stiffness: 120, damping: 20 });
  const bgMoveY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-25, 25]), { stiffness: 120, damping: 20 });
  const bgTiltX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 20 });
  const bgTiltY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 120, damping: 20 });

  const handleGlobalMouseMove = (e: React.MouseEvent) => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    mouseX.set(e.clientX / w - 0.5);
    mouseY.set(e.clientY / h - 0.5);
  };

  // Touch Swipe Listeners for mobile/touch screens
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current || e.changedTouches.length === 0) return;
    const diffX = e.changedTouches[0].clientX - touchStartRef.current.x;
    const diffY = e.changedTouches[0].clientY - touchStartRef.current.y;
    const threshold = 60;

    // Only swipe between sectors if horizontal swipe is dominant and starting from hub
    if (activeDirection === "hub") {
      if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > threshold) {
          // Swipe Right -> West (Contact)
          soundFx.playCoordinateWarp();
          onSelectDirection("west");
        } else if (diffX < -threshold) {
          // Swipe Left -> East (Tariff)
          soundFx.playCoordinateWarp();
          onSelectDirection("east");
        }
      } else {
        if (diffY > threshold) {
          // Swipe Down -> North (Works)
          soundFx.playCoordinateWarp();
          onSelectDirection("north");
        } else if (diffY < -threshold) {
          // Swipe Up -> South (About)
          soundFx.playCoordinateWarp();
          onSelectDirection("south");
        }
      }
    }
    touchStartRef.current = null;
  };

  // 3D Physical Spatial Topology & Altitude Metrics
  const sectorElevations = {
    hub: {
      altitude: "+160m (APEX SUMMIT)",
      title: "ORIGIN — 3D COMPASS SUMMIT",
      zPos: 160,
    },
    north: {
      altitude: "0m (FLIGHT DECK)",
      title: "000° NORTH — 4K REELS GALLERY",
      zPos: 0,
    },
    east: {
      altitude: "-120m (MATRIX VAULT)",
      title: "090° EAST — SERVICES & TARIFF",
      zPos: -120,
    },
    south: {
      altitude: "-240m (MONOLITH PLAZA)",
      title: "180° SOUTH — ABOUT & STRATEGY",
      zPos: -240,
    },
    west: {
      altitude: "-80m (TELEPORT DECK)",
      title: "270° WEST — DIRECT BRIEF & BOOKING",
      zPos: -80,
    },
  };

  // Trigger smooth transit toast on direction change
  useEffect(() => {
    const elev = sectorElevations[activeDirection] || sectorElevations.hub;
    setTransitLabel(elev.title);
    setTransitAltitude(elev.altitude);
    const t = setTimeout(() => {
      setTransitLabel(null);
      setTransitAltitude(null);
    }, 1500);
    return () => clearTimeout(t);
  }, [activeDirection]);

  // Scroll to top of sector when navigated to
  useEffect(() => {
    if (activeDirection === "north" && northRef.current) northRef.current.scrollTop = 0;
    if (activeDirection === "east" && eastRef.current) eastRef.current.scrollTop = 0;
    if (activeDirection === "south" && southRef.current) southRef.current.scrollTop = 0;
    if (activeDirection === "west" && westRef.current) westRef.current.scrollTop = 0;
  }, [activeDirection]);

  // Dynamic Global Atmospheric Aura Configs
  const atmosphereThemes = {
    hub: {
      bg: "bg-[#07080D]",
      glowColor: "#A855F7",
      orb1: "bg-purple-600/30",
      orb2: "bg-fuchsia-600/25",
    },
    north: {
      bg: "bg-[#050B14]",
      glowColor: "#38BDF8",
      orb1: "bg-sky-600/30",
      orb2: "bg-cyan-500/25",
    },
    east: {
      bg: "bg-[#04120C]",
      glowColor: "#10B981",
      orb1: "bg-emerald-600/30",
      orb2: "bg-teal-500/25",
    },
    south: {
      bg: "bg-[#140A04]",
      glowColor: "#F59E0B",
      orb1: "bg-amber-600/30",
      orb2: "bg-orange-500/25",
    },
    west: {
      bg: "bg-[#14040E]",
      glowColor: "#EC4899",
      orb1: "bg-pink-600/30",
      orb2: "bg-rose-500/25",
    },
  }[activeDirection];

  // Keyboard spatial navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA" ||
        document.activeElement?.tagName === "SELECT"
      ) {
        return;
      }

      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          e.preventDefault();
          soundFx.playCoordinateWarp();
          onSelectDirection("north");
          setIsRadarMode(false);
          break;
        case "ArrowRight":
        case "d":
        case "D":
          e.preventDefault();
          soundFx.playCoordinateWarp();
          onSelectDirection("east");
          setIsRadarMode(false);
          break;
        case "ArrowDown":
        case "s":
        case "S":
          e.preventDefault();
          soundFx.playCoordinateWarp();
          onSelectDirection("south");
          setIsRadarMode(false);
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          e.preventDefault();
          soundFx.playCoordinateWarp();
          onSelectDirection("west");
          setIsRadarMode(false);
          break;
        case "Escape":
        case "Home":
        case "h":
        case "H":
          e.preventDefault();
          soundFx.playCoordinateWarp();
          onSelectDirection("hub");
          setIsRadarMode(false);
          break;
        case "r":
        case "R":
        case "m":
        case "M":
          e.preventDefault();
          setIsRadarMode((prev) => !prev);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onSelectDirection]);

  // Compute 3D multi-altitude camera transformations
  const getTransform = () => {
    if (isRadarMode) {
      return {
        x: "0vw",
        y: "0vh",
        scale: 0.35,
        rotateX: 38,
        rotateY: 0,
        rotateZ: -8,
        z: -260,
      };
    }

    switch (activeDirection) {
      case "north":
        return { x: "0vw", y: "100vh", scale: 1, rotateX: 0, rotateY: 0, rotateZ: 0, z: 0 };
      case "east":
        return { x: "-100vw", y: "0vh", scale: 1, rotateX: 0, rotateY: 0, rotateZ: 0, z: 120 };
      case "south":
        return { x: "0vw", y: "-100vh", scale: 1, rotateX: 0, rotateY: 0, rotateZ: 0, z: 240 };
      case "west":
        return { x: "100vw", y: "0vh", scale: 1, rotateX: 0, rotateY: 0, rotateZ: 0, z: 80 };
      case "hub":
      default:
        return { x: "0vw", y: "0vh", scale: 1, rotateX: 0, rotateY: 0, rotateZ: 0, z: -160 };
    }
  };

  const transform = getTransform();

  const handleSelectPackageAndNavigate = (pkgName: string) => {
    soundFx.playSuccessChime();
    onSelectPackage(pkgName);
    onSelectDirection("west");
    setIsRadarMode(false);
  };

  const featuredVideo = videos.find((v) => v.isFeatured) || videos[0];

  return (
    <div
      onMouseMove={handleGlobalMouseMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{ perspective: 1500 }}
      className={`relative w-screen h-screen overflow-hidden ${atmosphereThemes.bg} transition-colors duration-700 text-slate-100 select-none`}
    >
      {/* 2.5D Ambient Background Grid with Parallax Tilt */}
      <motion.div
        style={{
          x: bgMoveX,
          y: bgMoveY,
          rotateX: bgTiltX,
          rotateY: bgTiltY,
        }}
        className="absolute -inset-10 pointer-events-none overflow-hidden z-0 will-change-transform"
      >
        <div className="absolute inset-0 bg-cyber-grid bg-[size:40px_40px] opacity-25" />
        
        {/* Dynamic Glowing Aurora Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute -top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[650px] rounded-full blur-[160px] ${atmosphereThemes.orb1} transition-colors duration-700`}
        />
        <motion.div
          animate={{
            scale: [1.15, 0.95, 1.15],
            opacity: [0.35, 0.65, 0.35],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute -bottom-1/4 right-1/4 w-[750px] h-[550px] rounded-full blur-[180px] ${atmosphereThemes.orb2} transition-colors duration-700`}
        />

        {/* 3D Perspective Base World Floor */}
        <div
          style={{
            transform: "perspective(600px) rotateX(70deg) translateZ(-100px)",
            transformOrigin: "bottom center",
          }}
          className="absolute bottom-0 left-0 right-0 h-[50vh] bg-gradient-to-t from-purple-500/15 via-sky-500/5 to-transparent border-b border-purple-500/30 pointer-events-none opacity-50"
        />
      </motion.div>

      {/* 3D Spatial Altitude & Gliding Toast Indicator */}
      <AnimatePresence>
        {transitLabel && (
          <motion.div
            initial={{ opacity: 0, y: -25, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none flex flex-col sm:flex-row items-center gap-2 rounded-full bg-slate-950/95 border border-purple-500/80 px-6 py-2 text-xs font-mono font-bold text-white shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-center gap-2">
              <Navigation className="h-3.5 w-3.5 text-purple-400 animate-spin-slow" />
              <span>{transitLabel}</span>
            </div>
            {transitAltitude && (
              <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] border border-purple-400/40">
                {transitAltitude}
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating 3D Isometric Radar Map Banner */}
      <AnimatePresence>
        {isRadarMode && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 rounded-full bg-slate-950/95 border border-purple-500 px-6 py-2.5 backdrop-blur-xl shadow-2xl flex items-center gap-3 text-xs font-mono text-white font-bold"
          >
            <Layers className="h-4 w-4 text-purple-400 animate-bounce" />
            <span>3D MULTI-ALTITUDE ISOMETRIC TOPOLOGY: Notice Hub elevated at +160m Summit</span>
            <button
              onClick={() => setIsRadarMode(false)}
              className="p-1 rounded-full hover:bg-white/20 text-zinc-300 hover:text-white cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D SPATIAL MULTI-ALTITUDE UNIVERSE CONTAINER */}
      <motion.div
        animate={{
          x: transform.x,
          y: transform.y,
          scale: transform.scale,
          rotateX: transform.rotateX,
          rotateY: transform.rotateY,
          rotateZ: transform.rotateZ,
          z: transform.z,
        }}
        transition={{
          x: { type: "spring", stiffness: 38, damping: 13, mass: 0.8 },
          y: { type: "spring", stiffness: 38, damping: 13, mass: 0.8 },
          scale: { type: "spring", stiffness: 45, damping: 14, mass: 0.8 },
          rotateX: { type: "spring", stiffness: 40, damping: 13 },
          rotateY: { type: "spring", stiffness: 40, damping: 13 },
          rotateZ: { type: "spring", stiffness: 40, damping: 13 },
          z: { type: "spring", stiffness: 40, damping: 13 },
        }}
        style={{
          transformOrigin: "center center",
          transformStyle: "preserve-3d",
        }}
        className="w-full h-full relative will-change-transform z-10"
      >
        {/* ============================================================== */}
        {/* 1. ELEVATED APEX SUMMIT: (0, 0, Z = +160px) - Obsidian Compass Hub */}
        {/* ============================================================== */}
        <div
          onClick={() => isRadarMode && onSelectDirection("hub")}
          style={{
            transform: "translateZ(160px)",
            transformStyle: "preserve-3d",
          }}
          className={`absolute top-0 left-0 w-screen h-screen overflow-hidden select-none transition-all duration-500 ${
            isRadarMode
              ? "cursor-pointer rounded-[2.5rem] border-4 border-purple-400 shadow-[0_30px_90px_rgba(168,85,247,0.5)] hover:border-purple-300 hover:scale-[1.03] bg-[#07080D]/95"
              : ""
          }`}
        >
          {isRadarMode && (
            <div className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-purple-600 text-white font-mono text-[10px] font-black tracking-widest shadow-lg">
              APEX SUMMIT: +160m
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: activeDirection === "hub" || isRadarMode ? 1 : 0.85,
              scale: activeDirection === "hub" ? 1 : 0.97,
            }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full"
          >
            <HubSector
              agencyName={settings.agencyName}
              motoLine={settings.motoLine}
              subHeadline={settings.subHeadline}
              activeDirection={activeDirection}
              onSelectDirection={(dir) => {
                soundFx.playCoordinateWarp();
                onSelectDirection(dir);
                setIsRadarMode(false);
              }}
              hoveredDirection={hoveredDirection}
              onHoverDirection={setHoveredDirection}
              onOpenVideoModal={onOpenVideoModal}
              featuredVideoUrl={featuredVideo?.videoUrl}
              onToggleRadarMode={() => setIsRadarMode(!isRadarMode)}
            />
          </motion.div>
        </div>

        {/* ============================================================== */}
        {/* 2. NORTH FLIGHT DECK: (0, -100vh, Z = 0px) - 000° Works & Reels */}
        {/* ============================================================== */}
        <div
          ref={northRef}
          onClick={() => isRadarMode && onSelectDirection("north")}
          style={{
            transform: "translateZ(0px)",
            transformStyle: "preserve-3d",
          }}
          className={`absolute top-[-100vh] left-0 w-screen h-screen overflow-y-auto overscroll-y-contain bg-[#050B14] transition-all duration-500 ${
            isRadarMode
              ? "cursor-pointer rounded-[2.5rem] border-4 border-sky-500/90 shadow-[0_20px_70px_rgba(56,189,248,0.4)] hover:border-sky-400 hover:scale-[1.02]"
              : ""
          }`}
        >
          {isRadarMode && (
            <div className="absolute top-4 left-6 px-3 py-1 rounded-full bg-sky-600 text-white font-mono text-[10px] font-black tracking-widest shadow-lg z-20">
              FLIGHT DECK: 0m
            </div>
          )}

          <div className="min-h-screen flex flex-col justify-between pt-24 pb-20">
            <VideoShowcase videos={videos} />
            <Footer
              agencyName={settings.agencyName}
              logoUrl={settings.logoUrl}
              motoLine={settings.motoLine}
              contactEmail={settings.contactEmail}
              instagramUrl={settings.instagramUrl}
              linkedinUrl={settings.linkedinUrl}
              twitterUrl={settings.twitterUrl}
              youtubeUrl={settings.youtubeUrl}
            />
          </div>
        </div>

        {/* ============================================================== */}
        {/* 3. EAST MATRIX VAULT: (100vw, 0, Z = -120px) - 090° Tariff */}
        {/* ============================================================== */}
        <div
          ref={eastRef}
          onClick={() => isRadarMode && onSelectDirection("east")}
          style={{
            transform: "translateZ(-120px)",
            transformStyle: "preserve-3d",
          }}
          className={`absolute top-0 left-[100vw] w-screen h-screen overflow-y-auto overscroll-y-contain bg-[#04120C] transition-all duration-500 ${
            isRadarMode
              ? "cursor-pointer rounded-[2.5rem] border-4 border-emerald-500/90 shadow-[0_20px_70px_rgba(16,185,129,0.4)] hover:border-emerald-400 hover:scale-[1.02]"
              : ""
          }`}
        >
          {isRadarMode && (
            <div className="absolute top-4 left-6 px-3 py-1 rounded-full bg-emerald-600 text-white font-mono text-[10px] font-black tracking-widest shadow-lg z-20">
              MATRIX VAULT: -120m
            </div>
          )}

          <div className="min-h-screen flex flex-col justify-between pt-24 pb-20">
            <div className="space-y-0">
              <PackagesSection
                packages={packages}
                onSelectPackage={handleSelectPackageAndNavigate}
              />
              {services && services.length > 0 && (
                <ServicesSection
                  services={services}
                  onSelectService={(title) => {
                    onSelectDirection("west");
                  }}
                />
              )}
            </div>
            <Footer
              agencyName={settings.agencyName}
              logoUrl={settings.logoUrl}
              motoLine={settings.motoLine}
              contactEmail={settings.contactEmail}
              instagramUrl={settings.instagramUrl}
              linkedinUrl={settings.linkedinUrl}
              twitterUrl={settings.twitterUrl}
              youtubeUrl={settings.youtubeUrl}
            />
          </div>
        </div>

        {/* ============================================================== */}
        {/* 4. SOUTH MONOLITH PLAZA: (0, 100vh, Z = -240px) - 180° Strategy */}
        {/* ============================================================== */}
        <div
          ref={southRef}
          onClick={() => isRadarMode && onSelectDirection("south")}
          style={{
            transform: "translateZ(-240px)",
            transformStyle: "preserve-3d",
          }}
          className={`absolute top-[100vh] left-0 w-screen h-screen overflow-y-auto overscroll-y-contain bg-[#140A04] transition-all duration-500 ${
            isRadarMode
              ? "cursor-pointer rounded-[2.5rem] border-4 border-amber-500/90 shadow-[0_20px_70px_rgba(245,158,11,0.4)] hover:border-amber-400 hover:scale-[1.02]"
              : ""
          }`}
        >
          {isRadarMode && (
            <div className="absolute top-4 left-6 px-3 py-1 rounded-full bg-amber-600 text-white font-mono text-[10px] font-black tracking-widest shadow-lg z-20">
              SUNKEN MONOLITH: -240m
            </div>
          )}

          <div className="min-h-screen flex flex-col justify-between pt-24 pb-20">
            <div className="space-y-16">
              <AboutSection
                aboutText={settings.aboutText}
                agencyName={settings.agencyName}
                location={settings.location}
              />
              {caseStudies && caseStudies.length > 0 && (
                <CaseStudies
                  caseStudies={caseStudies}
                  onOpenContact={() => onSelectDirection("west")}
                />
              )}
              {testimonials && testimonials.length > 0 && (
                <TestimonialsSection testimonials={testimonials} />
              )}
            </div>
            <Footer
              agencyName={settings.agencyName}
              logoUrl={settings.logoUrl}
              motoLine={settings.motoLine}
              contactEmail={settings.contactEmail}
              instagramUrl={settings.instagramUrl}
              linkedinUrl={settings.linkedinUrl}
              twitterUrl={settings.twitterUrl}
              youtubeUrl={settings.youtubeUrl}
            />
          </div>
        </div>

        {/* ============================================================== */}
        {/* 5. WEST TELEPORT DECK: (-100vw, 0, Z = -80px) - 270° Contact */}
        {/* ============================================================== */}
        <div
          ref={westRef}
          onClick={() => isRadarMode && onSelectDirection("west")}
          style={{
            transform: "translateZ(-80px)",
            transformStyle: "preserve-3d",
          }}
          className={`absolute top-0 left-[-100vw] w-screen h-screen overflow-y-auto overscroll-y-contain bg-[#14040E] transition-all duration-500 ${
            isRadarMode
              ? "cursor-pointer rounded-[2.5rem] border-4 border-pink-500/90 shadow-[0_20px_70px_rgba(236,72,153,0.4)] hover:border-pink-400 hover:scale-[1.02]"
              : ""
          }`}
        >
          {isRadarMode && (
            <div className="absolute top-4 left-6 px-3 py-1 rounded-full bg-pink-600 text-white font-mono text-[10px] font-black tracking-widest shadow-lg z-20">
              TELEPORT DECK: -80m
            </div>
          )}

          <div className="min-h-screen flex flex-col justify-between pt-24 pb-20">
            <ContactSection
              contactEmail={settings.contactEmail}
              contactPhone={settings.contactPhone}
              location={settings.location}
              selectedPackage={selectedPackage}
              whatsappNumber={settings.whatsappNumber}
              calendlyUrl={settings.calendlyUrl}
            />
            <Footer
              agencyName={settings.agencyName}
              logoUrl={settings.logoUrl}
              motoLine={settings.motoLine}
              contactEmail={settings.contactEmail}
              instagramUrl={settings.instagramUrl}
              linkedinUrl={settings.linkedinUrl}
              twitterUrl={settings.twitterUrl}
              youtubeUrl={settings.youtubeUrl}
            />
          </div>
        </div>
      </motion.div>

      {/* ============================================================== */}
      {/* FLOATING GLASSMORPHIC "RETURN TO 3D COMPASS HUB" PILL */}
      {/* ============================================================== */}
      <AnimatePresence>
        {activeDirection !== "hub" && !isRadarMode && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3"
          >
            <button
              onClick={() => {
                soundFx.playCoordinateWarp();
                onSelectDirection("hub");
              }}
              className="group flex items-center gap-2.5 px-6 py-3 rounded-full bg-slate-950/90 hover:bg-gradient-to-r hover:from-purple-600 hover:via-fuchsia-600 hover:to-purple-700 text-white border border-purple-500/60 hover:border-purple-300 shadow-2xl shadow-purple-500/30 backdrop-blur-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer font-mono font-bold text-xs"
            >
              <div className="h-2 w-2 rounded-full bg-purple-400 animate-ping" />
              <Home className="h-4 w-4 text-purple-300 group-hover:text-white" />
              <span>RETURN TO COMPASS HUB</span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] border border-slate-700 group-hover:bg-white/20 group-hover:text-white">
                [Esc]
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FIXED 3D MINI HUD COMPASS & QUICK SECTOR JUMP */}
      {activeDirection !== "hub" && (
        <MiniHUDCompass3D
          activeDirection={activeDirection}
          onSelectDirection={(dir) => {
            soundFx.playCoordinateWarp();
            onSelectDirection(dir);
            setIsRadarMode(false);
          }}
          isRadarMode={isRadarMode}
          onToggleRadarMode={() => setIsRadarMode(!isRadarMode)}
        />
      )}

      {/* Floating 3D Spatial Navigation Directional Buttons (on Hub) */}
      {!isRadarMode && activeDirection === "hub" && (
        <>
          {/* North Button */}
          <button
            onClick={() => {
              soundFx.playCoordinateWarp();
              onSelectDirection("north");
            }}
            aria-label="Navigate North"
            className="fixed top-20 left-1/2 -translate-x-1/2 z-40 p-2 sm:px-4 sm:py-2 rounded-full bg-slate-900/90 hover:bg-sky-600 text-sky-400 hover:text-white border border-sky-500/50 shadow-xl shadow-sky-500/20 backdrop-blur-xl flex items-center gap-1.5 text-xs font-mono font-bold transition-all hover:scale-110 active:scale-95 cursor-pointer"
          >
            <ArrowUp className="h-4 w-4" />
            <span className="hidden sm:inline">000° WORKS (0m)</span>
          </button>

          {/* East Button */}
          <button
            onClick={() => {
              soundFx.playCoordinateWarp();
              onSelectDirection("east");
            }}
            aria-label="Navigate East"
            className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 p-2 sm:px-4 sm:py-2 rounded-full bg-slate-900/90 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/50 shadow-xl shadow-emerald-500/20 backdrop-blur-xl flex items-center gap-1.5 text-xs font-mono font-bold transition-all hover:scale-110 active:scale-95 cursor-pointer"
          >
            <span className="hidden sm:inline">090° TARIFF (-120m)</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          {/* South Button */}
          <button
            onClick={() => {
              soundFx.playCoordinateWarp();
              onSelectDirection("south");
            }}
            aria-label="Navigate South"
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 p-2 sm:px-4 sm:py-2 rounded-full bg-slate-900/90 hover:bg-amber-600 text-amber-400 hover:text-white border border-amber-500/50 shadow-xl shadow-amber-500/20 backdrop-blur-xl flex items-center gap-1.5 text-xs font-mono font-bold transition-all hover:scale-110 active:scale-95 cursor-pointer"
          >
            <ArrowDown className="h-4 w-4" />
            <span className="hidden sm:inline">180° ABOUT (-240m)</span>
          </button>

          {/* West Button */}
          <button
            onClick={() => {
              soundFx.playCoordinateWarp();
              onSelectDirection("west");
            }}
            aria-label="Navigate West"
            className="fixed left-4 sm:left-6 top-1/2 -translate-y-1/2 z-40 p-2 sm:px-4 sm:py-2 rounded-full bg-slate-900/90 hover:bg-pink-600 text-pink-400 hover:text-white border border-pink-500/50 shadow-xl shadow-pink-500/20 backdrop-blur-xl flex items-center gap-1.5 text-xs font-mono font-bold transition-all hover:scale-110 active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">270° CONTACT (-80m)</span>
          </button>
        </>
      )}
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Lock, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

interface FooterProps {
  agencyName?: string | null;
  logoUrl?: string | null;
  motoLine?: string | null;
  contactEmail?: string | null;
  instagramUrl?: string | null;
  linkedinUrl?: string | null;
  twitterUrl?: string | null;
  youtubeUrl?: string | null;
}

export default function Footer({
  agencyName = "NORD MEDIA HOUSE",
  logoUrl = "/uploads/logos/nord-media-house.jpg",
  motoLine = "FIND YOUR BEARING — THREE ROUTES TO GROW YOUR BRAND'S PRESENCE",
  contactEmail = "nordmediahouse@gmail.com",
  instagramUrl = "https://instagram.com",
  linkedinUrl = "https://linkedin.com",
  twitterUrl = "https://x.com",
  youtubeUrl = "https://youtube.com",
}: FooterProps) {
  const [istTime, setIstTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setIstTime(
        now.toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-slate-950/90 backdrop-blur-md border-t border-slate-800 pt-16 pb-12 relative overflow-hidden text-slate-400">
      {/* Soft Ambient Lilac Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-slate-800">
          
          {/* Brand & Moto */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl overflow-hidden bg-slate-900 p-1 border border-slate-700 shadow-sm flex items-center justify-center">
                {logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={logoUrl} alt={agencyName || "Agency Logo"} className="h-full w-full object-contain" />
                ) : (
                  <span className="font-display font-black text-sm text-purple-400">N</span>
                )}
              </div>
              <span className="font-display font-bold text-lg tracking-wider text-white">
                {agencyName}
              </span>
            </Link>

            <p className="text-xs font-mono text-slate-400 max-w-sm uppercase tracking-wide leading-relaxed font-semibold">
              {motoLine}
            </p>

            <div className="pt-2 flex items-center gap-3 text-purple-400">
              {instagramUrl && (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-slate-900 hover:text-white hover:bg-purple-600 border border-slate-800 transition"
                  aria-label="Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              )}
              {linkedinUrl && (
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-slate-900 hover:text-white hover:bg-purple-600 border border-slate-800 transition"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              )}
              {twitterUrl && (
                <a
                  href={twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-slate-900 hover:text-white hover:bg-purple-600 border border-slate-800 transition"
                  aria-label="Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </a>
              )}
              {youtubeUrl && (
                <a
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-slate-900 hover:text-white hover:bg-purple-600 border border-slate-800 transition"
                  aria-label="YouTube"
                >
                  <Youtube className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Sectors & Bearings
            </h4>
            <ul className="space-y-2 text-xs font-mono font-semibold text-slate-400">
              <li>
                <span className="text-sky-400">000° NORTH</span> — 4K Commercial Showreel
              </li>
              <li>
                <span className="text-emerald-400">090° EAST</span> — Tariff & Retainer Plans
              </li>
              <li>
                <span className="text-amber-400">180° SOUTH</span> — Creative Strategy & Pillars
              </li>
              <li>
                <span className="text-pink-400">270° WEST</span> — Direct Brief Consultation
              </li>
            </ul>
          </div>

          {/* Studio Operating Hours & IST */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Studio Operating Hours
            </h4>
            <div className="space-y-2 text-xs font-mono text-slate-400">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-300">Live Indian Standard Time:</span>
                <span className="font-bold text-purple-400 font-mono">{istTime || "10:30:00 AM"} IST</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-[11px]">
                <span className="text-slate-400">Working Schedule:</span>
                <span className="font-bold text-emerald-400">Mon – Sat (10 AM – 7 PM)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © {new Date().getFullYear()} {agencyName}. All Rights Reserved.
          </div>

          <div className="flex items-center gap-4">
            <a
              href={process.env.NEXT_PUBLIC_ADMIN_URL || "http://localhost:3001"}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400 transition flex items-center gap-1"
            >
              <Lock className="h-3 w-3" />
              <span>Agency Console</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

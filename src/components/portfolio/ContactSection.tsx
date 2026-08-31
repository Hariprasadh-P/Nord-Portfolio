"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  ShieldCheck,
  MessageSquare,
  Calendar,
  Sparkles,
  ArrowUpRight,
  Clock,
  DollarSign,
  Layers,
} from "lucide-react";
import confetti from "canvas-confetti";
import { soundFx } from "@/lib/soundFx";

interface ContactSectionProps {
  initialPackage?: string;
  selectedPackage?: string;
  contactEmail?: string;
  contactPhone?: string;
  location?: string;
  whatsappNumber?: string;
  calendlyUrl?: string;
}

export default function ContactSection({
  initialPackage = "",
  selectedPackage = "",
  contactEmail = "hello@nordmediahouse.com",
  contactPhone = "+1 (415) 890-3200",
  location = "Los Angeles • New York • London • Stockholm",
  whatsappNumber = "+14158903200",
  calendlyUrl = "https://calendly.com",
}: ContactSectionProps) {
  const activeInitialPkg = selectedPackage || initialPackage;
  
  const [formData, setFormData] = useState({
    clientName: "",
    email: "",
    phone: "",
    company: "",
    serviceNeeded: activeInitialPkg || "PERFORMANCE CATALYST (Growth Retainer)",
    budgetRange: "$5k - $10k / mo",
    timeline: "1 - 2 Months",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (selectedPackage) {
      setFormData((prev) => ({
        ...prev,
        serviceNeeded: selectedPackage,
      }));
    }
  }, [selectedPackage]);

  const routeOptions = [
    "CREATOR FOUNDATION (Starter Retainer)",
    "PERFORMANCE CATALYST (Growth Retainer)",
    "ENTERPRISE MONOLITH (Custom Retainer)",
    "4K Hero Commercial Brand Film",
    "3D CGI & Kinetic Motion Graphics",
    "Omnichannel Paid Ads Media Scaling",
  ];

  const budgetChips = [
    "$3k - $5k / mo",
    "$5k - $10k / mo",
    "$10k - $25k / mo",
    "$25k+ / mo",
    "Custom Project",
  ];

  const timelineChips = [
    "Urgent (< 2 Wks)",
    "1 - 2 Months",
    "Quarterly Retainer",
    "Long-Term Multi-Year",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/public/inquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to submit inquiry. Please try again.");
      }

      soundFx.playSuccessChime();
      
      // Trigger luxury confetti shower
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#A855F7", "#EC4899", "#38BDF8", "#10B981"],
        });
      } catch {
        // Fallback if confetti blocked
      }

      setSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    `Hello Nord Media House, I would like to inquire about project partnership (${formData.serviceNeeded}).`
  )}`;

  return (
    <section id="contact" className="relative py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Navigational Waypoint Badge in Cyber Magenta */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-pink-500/40 bg-slate-950/80 px-4 py-1 text-xs font-mono backdrop-blur-md shadow-md mb-3 text-pink-400 font-bold">
            <span className="h-2 w-2 rounded-full bg-pink-400 animate-pulse" />
            <span>270° WEST</span>
            <span className="text-pink-600">•</span>
            <span className="uppercase tracking-widest text-[11px]">DIRECT PROJECT BRIEF & BOOKING</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
            Initiate{" "}
            <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-fuchsia-400 bg-clip-text text-transparent">
              Brief
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2 font-display italic font-medium">
            &ldquo;We select 4 new marquee brand partners per quarter to ensure cinematic mastery.&rdquo;
          </p>
        </div>

        {/* Quick Connect Floating Bar: WhatsApp & Calendly */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundFx.playHoverTick()}
            className="flex items-center justify-between p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/50 hover:border-emerald-400 text-emerald-300 hover:text-white transition group backdrop-blur-xl shadow-lg"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                  Instant Executive Access
                </div>
                <div className="font-display font-bold text-sm text-white">
                  Chat Directly via WhatsApp
                </div>
              </div>
            </div>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 text-emerald-400" />
          </a>

          <a
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundFx.playHoverTick()}
            className="flex items-center justify-between p-4 rounded-2xl bg-purple-950/40 border border-purple-500/50 hover:border-purple-400 text-purple-300 hover:text-white transition group backdrop-blur-xl shadow-lg"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400">
                  Discovery Session
                </div>
                <div className="font-display font-bold text-sm text-white">
                  Schedule 15-Min Strategy Call
                </div>
              </div>
            </div>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 text-purple-400" />
          </a>
        </div>

        {/* Main Form & Contact Info Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Brief Submission Form */}
          <div className="lg:col-span-8 rounded-3xl bg-slate-950/90 border border-slate-800/90 p-6 sm:p-10 shadow-2xl relative backdrop-blur-2xl">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-4"
              >
                <div className="h-16 w-16 rounded-full bg-pink-500/20 border border-pink-500/50 text-pink-400 mx-auto flex items-center justify-center shadow-lg shadow-pink-500/20">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
                  Brief Transmitted Successfully
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto font-medium">
                  Thank you, <span className="text-white font-bold">{formData.clientName}</span>. Our Executive Creative Directors and Performance Leads are reviewing your scope and will connect within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      clientName: "",
                      email: "",
                      phone: "",
                      company: "",
                      serviceNeeded: "PERFORMANCE CATALYST (Growth Retainer)",
                      budgetRange: "$5k - $10k / mo",
                      timeline: "1 - 2 Months",
                      message: "",
                    });
                  }}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition"
                >
                  Submit Another Inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* 1. Client Identity */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-2">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Julian Vance"
                      value={formData.clientName}
                      onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                      className="w-full rounded-xl bg-slate-900 border border-slate-800 px-4 py-3 text-xs font-sans text-white placeholder-slate-500 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-2">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="julian@brand.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-xl bg-slate-900 border border-slate-800 px-4 py-3 text-xs font-sans text-white placeholder-slate-500 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500 transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-2">
                      Company / Brand Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. AURA Luxury Corp"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full rounded-xl bg-slate-900 border border-slate-800 px-4 py-3 text-xs font-sans text-white placeholder-slate-500 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-2">
                      Phone / WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (415) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded-xl bg-slate-900 border border-slate-800 px-4 py-3 text-xs font-sans text-white placeholder-slate-500 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500 transition"
                    />
                  </div>
                </div>

                {/* 2. Route Selection Dropdown */}
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-2 flex items-center gap-1.5">
                    <Layers className="h-3.5 w-3.5 text-pink-400" />
                    <span>Selected Strategic Route</span>
                  </label>
                  <select
                    value={formData.serviceNeeded}
                    onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value })}
                    className="w-full rounded-xl bg-slate-900 border border-slate-800 px-4 py-3 text-xs font-mono text-white focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500 transition"
                  >
                    {routeOptions.map((opt, idx) => (
                      <option key={idx} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 3. Interactive Budget Range Chips */}
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-2 flex items-center gap-1.5">
                    <DollarSign className="h-3.5 w-3.5 text-pink-400" />
                    <span>Estimated Monthly Budget</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {budgetChips.map((chip) => {
                      const isSelected = formData.budgetRange === chip;
                      return (
                        <button
                          key={chip}
                          type="button"
                          onClick={() => {
                            soundFx.playHoverTick();
                            setFormData({ ...formData, budgetRange: chip });
                          }}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                            isSelected
                              ? "bg-pink-500 text-slate-950 shadow-md shadow-pink-500/30 scale-105"
                              : "bg-slate-900 text-slate-400 border border-slate-800 hover:border-pink-500/50 hover:text-white"
                          }`}
                        >
                          {chip}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Interactive Timeline Chips */}
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-2 flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-pink-400" />
                    <span>Desired Production Timeline</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {timelineChips.map((chip) => {
                      const isSelected = formData.timeline === chip;
                      return (
                        <button
                          key={chip}
                          type="button"
                          onClick={() => {
                            soundFx.playHoverTick();
                            setFormData({ ...formData, timeline: chip });
                          }}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                            isSelected
                              ? "bg-pink-500 text-slate-950 shadow-md shadow-pink-500/30 scale-105"
                              : "bg-slate-900 text-slate-400 border border-slate-800 hover:border-pink-500/50 hover:text-white"
                          }`}
                        >
                          {chip}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 5. Project Brief Details */}
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-2">
                    Project Vision & Objectives *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us about your brand goals, target metrics, or links to reference work..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-xl bg-slate-900 border border-slate-800 p-4 text-xs font-sans text-white placeholder-slate-500 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500 transition resize-none"
                  />
                </div>

                {errorMessage && (
                  <div className="p-3 rounded-xl bg-red-950/50 border border-red-500/50 text-red-300 text-xs font-mono text-center">
                    {errorMessage}
                  </div>
                )}

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-600 text-white font-mono font-black text-xs uppercase tracking-wider shadow-xl shadow-pink-500/25 hover:shadow-pink-500/40 hover:scale-[1.01] active:scale-95 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                  <span>{loading ? "Transmitting Brief..." : "Transmit Project Brief"}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Agency Coordinates & Assurances */}
          <div className="lg:col-span-4 space-y-6">
            {/* Studio Headquarters Card */}
            <div className="rounded-3xl bg-slate-950/80 border border-slate-800 p-6 space-y-5 backdrop-blur-xl">
              <h4 className="font-display font-bold text-base text-white">
                Studio Coordinates
              </h4>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-pink-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-mono text-slate-400 font-bold uppercase text-[10px]">
                      Global Locations
                    </div>
                    <div className="text-white font-medium mt-0.5">{location}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-4 w-4 text-pink-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-mono text-slate-400 font-bold uppercase text-[10px]">
                      Executive Contact
                    </div>
                    <a
                      href={`mailto:${contactEmail}`}
                      className="text-pink-300 hover:text-white font-mono font-medium transition mt-0.5 block"
                    >
                      {contactEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-4 w-4 text-pink-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-mono text-slate-400 font-bold uppercase text-[10px]">
                      Studio Line
                    </div>
                    <a
                      href={`tel:${contactPhone}`}
                      className="text-pink-300 hover:text-white font-mono font-medium transition mt-0.5 block"
                    >
                      {contactPhone}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quality & Security Assurance Box */}
            <div className="rounded-3xl bg-pink-950/20 border border-pink-500/30 p-6 space-y-3">
              <div className="flex items-center gap-2 text-pink-400 font-mono text-xs font-bold">
                <ShieldCheck className="h-4 w-4" />
                <span>NORD GUARANTEE</span>
              </div>
              <p className="text-xs text-slate-300 font-medium leading-relaxed">
                All client engagements include strict non-disclosure agreements (NDA), guaranteed revision turnarounds, and master broadcast file ownership.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

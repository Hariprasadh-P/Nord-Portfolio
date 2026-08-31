"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle, ShieldCheck } from "lucide-react";

interface ContactSectionProps {
  initialPackage?: string;
  selectedPackage?: string;
  contactEmail?: string;
  contactPhone?: string;
  location?: string;
}

export default function ContactSection({
  initialPackage = "",
  selectedPackage = "",
  contactEmail = "nordmediahouse@gmail.com",
  contactPhone = "+91 93635 42725",
  location = "India",
}: ContactSectionProps) {
  const activeInitialPkg = selectedPackage || initialPackage;
  const [formData, setFormData] = useState({
    clientName: "",
    email: "",
    phone: "",
    company: "",
    serviceNeeded: activeInitialPkg || "Growth Route (₹28,000/mo)",
    budgetRange: "₹20,000 - ₹28,000 / mo",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (initialPackage) {
      setFormData((prev) => ({
        ...prev,
        serviceNeeded: `${initialPackage} Route`,
      }));
    }
  }, [initialPackage]);

  const serviceOptions = [
    "Basic Route (₹20,000/mo - 8 Posts, 12 Reels)",
    "Growth Route (₹28,000/mo - 10 Posts, 16 Reels, Meta Ads)",
    "Premium Route (₹36,000/mo - 12 Posts, 20 Reels, Full Social + Meta Ads)",
    "4K Commercial Showreel & Video Production",
    "Performance Paid Ads & Growth Consultation",
    "Brand Identity & Menu Card Design Add-on",
  ];

  const budgetOptions = [
    "< ₹20,000 / mo",
    "₹20,000 - ₹28,000 / mo",
    "₹28,000 - ₹36,000 / mo",
    "₹36,000 - ₹50,000 / mo",
    "₹50,000+ / mo",
    "One-time Custom Project",
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
        throw new Error("Failed to send inquiry. Please try again or email us directly.");
      }

      setSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Navigational Waypoint Badge in Cyber Magenta */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-pink-500/40 bg-slate-950/80 px-4 py-1 text-xs font-mono backdrop-blur-md shadow-md mb-3 text-pink-400 font-bold">
            <span className="h-2 w-2 rounded-full bg-pink-400 animate-pulse" />
            <span>270° WEST</span>
            <span className="text-pink-600">•</span>
            <span className="uppercase tracking-widest text-[11px]">DIRECT BRIEF & CONSULTATION</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Contacts */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight">
                Ready to Chart Your{" "}
                <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-fuchsia-400 bg-clip-text text-transparent">
                  Brand&apos;s Trajectory?
                </span>
              </h2>
              <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed font-sans font-medium">
                Tell us your target milestone. Nord Media House will act as your true compass, designing the creative direction and paid media framework for profitable growth.
              </p>
            </div>

            {/* Direct Info Cards in Rose / Magenta */}
            <div className="space-y-3.5 font-sans">
              <div className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-950/80 p-4 shadow-sm">
                <div className="p-3 rounded-xl bg-pink-500/20 text-pink-400">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-pink-400 font-bold uppercase">Direct Email</div>
                  <a href={`mailto:${contactEmail}`} className="text-sm font-bold text-white hover:text-pink-400 transition">
                    {contactEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-950/80 p-4 shadow-sm">
                <div className="p-3 rounded-xl bg-pink-500/20 text-pink-400">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-pink-400 font-bold uppercase">Direct Line / WhatsApp</div>
                  <a href={`tel:${contactPhone}`} className="text-sm font-bold text-white hover:text-pink-400 transition">
                    {contactPhone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-950/80 p-4 shadow-sm">
                <div className="p-3 rounded-xl bg-pink-500/20 text-pink-400">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-pink-400 font-bold uppercase">Studio Hubs</div>
                  <div className="text-sm font-bold text-white">{location}</div>
                </div>
              </div>
            </div>

            {/* SLA Guarantee */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 flex items-center gap-3 shadow-sm">
              <ShieldCheck className="h-6 w-6 text-pink-400 flex-shrink-0" />
              <div className="text-xs text-slate-400 font-sans font-medium">
                <span className="font-bold text-white">24-Hour SLA Guarantee:</span> All tariff inquiries receive a bespoke creative breakdown and campaign timeline within 24 hours.
              </div>
            </div>
          </div>

          {/* Right Column: Lead Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-6 sm:p-10 shadow-2xl shadow-pink-500/10 relative overflow-hidden ring-1 ring-pink-500/20">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12 space-y-4"
                  >
                    <div className="h-20 w-20 rounded-full bg-pink-500/20 text-pink-400 flex items-center justify-center mx-auto shadow-sm border border-pink-500/30">
                      <CheckCircle className="h-10 w-10 text-pink-400" />
                    </div>
                    <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
                      Bearing Confirmed & Request Received!
                    </h3>
                    <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed font-sans font-medium">
                      Thank you for submitting your project brief. A producer from Nord Media House will reach out to <span className="text-pink-400 font-mono font-bold">{formData.email}</span> within 24 hours.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          clientName: "",
                          email: "",
                          phone: "",
                          company: "",
                          serviceNeeded: "Growth Route (₹28,000/mo)",
                          budgetRange: "₹20,000 - ₹28,000 / mo",
                          message: "",
                        });
                      }}
                      className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 border border-slate-700 px-6 py-2.5 text-xs font-mono font-bold text-white hover:bg-slate-800 transition"
                    >
                      Submit Another Inquiry
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div>
                      <h3 className="font-display font-bold text-2xl text-white">
                        Book Your Strategy Consultation
                      </h3>
                      <p className="text-xs text-pink-400 font-semibold mt-1 font-sans">
                        Select your preferred tariff route and tell us about your brand goals.
                      </p>
                    </div>

                    {errorMessage && (
                      <div className="rounded-xl border border-red-500/40 bg-red-950/60 p-3 text-xs font-mono font-bold text-red-300">
                        {errorMessage}
                      </div>
                    )}

                    {/* Row 1: Name & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-slate-400 font-bold mb-1.5 uppercase">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.clientName}
                          onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                          placeholder="e.g. Rahul Sharma"
                          className="w-full rounded-xl border border-slate-800 bg-slate-900/90 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-pink-500 focus:bg-slate-900 focus:outline-none transition font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-400 font-bold mb-1.5 uppercase">
                          Business Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="rahul@brand.com"
                          className="w-full rounded-xl border border-slate-800 bg-slate-900/90 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-pink-500 focus:bg-slate-900 focus:outline-none transition font-medium"
                        />
                      </div>
                    </div>

                    {/* Row 2: Company Website & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-slate-400 font-bold mb-1.5 uppercase">
                          Brand Name / Instagram Handle
                        </label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="@yourbrand"
                          className="w-full rounded-xl border border-slate-800 bg-slate-900/90 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-pink-500 focus:bg-slate-900 focus:outline-none transition font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-400 font-bold mb-1.5 uppercase">
                          Phone / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98000 00000"
                          className="w-full rounded-xl border border-slate-800 bg-slate-900/90 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-pink-500 focus:bg-slate-900 focus:outline-none transition font-medium"
                        />
                      </div>
                    </div>

                    {/* Row 3: Service Focus */}
                    <div>
                      <label className="block text-xs font-mono text-slate-400 font-bold mb-1.5 uppercase">
                        Select Tariff Route *
                      </label>
                      <select
                        value={formData.serviceNeeded}
                        onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value })}
                        className="w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-white focus:border-pink-500 focus:outline-none transition cursor-pointer font-medium"
                      >
                        {serviceOptions.map((svc) => (
                          <option key={svc} value={svc} className="bg-slate-900 text-white">
                            {svc}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Row 4: Monthly Budget */}
                    <div>
                      <label className="block text-xs font-mono text-slate-400 font-bold mb-1.5 uppercase">
                        Target Monthly Budget (INR) *
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                        {budgetOptions.map((option) => (
                          <button
                            type="button"
                            key={option}
                            onClick={() => setFormData({ ...formData, budgetRange: option })}
                            className={`px-3 py-2 rounded-xl text-xs font-mono font-bold text-left transition border ${
                              formData.budgetRange === option
                                ? "bg-gradient-to-r from-pink-600 to-fuchsia-600 border-transparent text-white shadow-md shadow-pink-500/25"
                                : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800"
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Row 5: Message */}
                    <div>
                      <label className="block text-xs font-mono text-slate-400 font-bold mb-1.5 uppercase">
                        Project Overview & Objectives *
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us what you're aiming to accomplish..."
                        className="w-full rounded-xl border border-slate-800 bg-slate-900/90 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-pink-500 focus:bg-slate-900 focus:outline-none transition resize-none font-sans font-medium"
                      />
                    </div>

                    {/* Submit Button in Magenta Fuchsia */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-pink-600 via-rose-600 to-fuchsia-600 text-white font-bold uppercase tracking-wider text-xs shadow-lg shadow-pink-500/30 hover:shadow-xl hover:shadow-pink-500/45 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          <span>Submitting Consultation Brief...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Brief & Start Journey</span>
                          <Send className="h-3.5 w-3.5 text-white" />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

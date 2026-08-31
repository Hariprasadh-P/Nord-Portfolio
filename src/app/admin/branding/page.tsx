"use client";

import React, { useState, useEffect, useRef } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import { Save, Check, RefreshCw, Sparkles, Upload, Image, Globe, Palette, CheckCircle2 } from "lucide-react";

export default function AdminBrandingPage() {
  const [form, setForm] = useState({
    agencyName: "",
    logoUrl: "",
    motoLine: "",
    subHeadline: "",
    aboutText: "",
    contactEmail: "",
    contactPhone: "",
    location: "",
    instagramUrl: "",
    linkedinUrl: "",
    twitterUrl: "",
    youtubeUrl: "",
    accentColor: "#A855F7",
    colorScheme: "lilac-orchid",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const colorSchemes = [
    { id: "lilac-orchid", name: "Lilac Cloud & Orchid (Default)", hex: "#A855F7", glow: "#FAF6FF" },
    { id: "electric-violet", name: "Electric Violet & White", hex: "#9333EA", glow: "#FDF4FF" },
    { id: "nord-plum", name: "Nord Royal Plum", hex: "#8B1E82", glow: "#FDF2F8" },
    { id: "cyber-emerald", name: "Cyber Emerald", hex: "#059669", glow: "#ECFDF5" },
    { id: "electric-cyan", name: "Electric Cyan", hex: "#0284C7", glow: "#F0F9FF" },
    { id: "sunset-gold", name: "Luxury Champagne Gold", hex: "#D97706", glow: "#FFFBEB" },
  ];

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch("/api/admin/settings");
        const json = await res.json();
        if (json.success && json.data) {
          setForm({
            agencyName: json.data.agencyName || "",
            logoUrl: json.data.logoUrl || "",
            motoLine: json.data.motoLine || "",
            subHeadline: json.data.subHeadline || "",
            aboutText: json.data.aboutText || "",
            contactEmail: json.data.contactEmail || "",
            contactPhone: json.data.contactPhone || "",
            location: json.data.location || "",
            instagramUrl: json.data.instagramUrl || "",
            linkedinUrl: json.data.linkedinUrl || "",
            twitterUrl: json.data.twitterUrl || "",
            youtubeUrl: json.data.youtubeUrl || "",
            accentColor: json.data.accentColor || "#A855F7",
            colorScheme: json.data.colorScheme || "lilac-orchid",
          });
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingLogo(true);
    setErrorMsg("");

    try {
      const data = new FormData();
      data.append("file", file);
      data.append("type", "logos");

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: data,
      });

      const json = await res.json();
      if (json.success && json.url) {
        setForm((prev) => ({ ...prev, logoUrl: json.url }));
      } else {
        setErrorMsg(json.error || "Failed to upload logo from local device.");
      }
    } catch {
      setErrorMsg("Network error uploading logo image.");
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg("");
    setSavedSuccess(false);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const json = await res.json();
      if (json.success) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
      } else {
        setErrorMsg(json.error || "Failed to update branding settings");
      }
    } catch {
      setErrorMsg("Network error saving settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center p-12">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-purple-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-background">
      <AdminHeader
        title="Branding & Company Moto"
        subtitle="Manage brand identity, local logo image uploads, color scheme, and slogan"
      />

      <main className="p-6 sm:p-8 max-w-5xl space-y-8">
        {savedSuccess && (
          <div className="rounded-2xl border border-purple-200 bg-purple-50 p-4 text-xs font-mono font-bold text-slate-900 flex items-center gap-2 shadow-sm">
            <Check className="h-4 w-4 text-purple-600" />
            <span>Branding & Logo updated and synchronized with public portfolio!</span>
          </div>
        )}

        {errorMsg && (
          <div className="rounded-2xl border border-red-300 bg-red-50 p-4 text-xs font-mono font-bold text-red-700">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-8">
          
          {/* Section 1: Logo & Visual Identity */}
          <div className="rounded-3xl border border-purple-200 bg-white/90 p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center gap-2 pb-4 border-b border-purple-100">
              <Sparkles className="h-4 w-4 text-purple-600" />
              <h3 className="font-display font-bold text-base text-slate-900 uppercase tracking-wider">
                Logo & Visual Identity
              </h3>
            </div>

            {/* Logo Upload Section */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              <div className="sm:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-purple-50/50 border border-purple-200">
                <div className="h-24 w-24 rounded-2xl overflow-hidden bg-white p-2 border border-purple-200 shadow-sm flex items-center justify-center mb-3">
                  {form.logoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={form.logoUrl} alt="Agency Logo" className="h-full w-full object-contain" />
                  ) : (
                    <Image className="h-10 w-10 text-purple-400" />
                  )}
                </div>
                <span className="text-[11px] font-mono font-bold text-slate-600">Current Logo Mark</span>
              </div>

              <div className="sm:col-span-8 space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-700 font-bold mb-1.5 uppercase">
                    Upload Logo From Local Device (PNG, JPG, SVG, WebP)
                  </label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleLogoUpload}
                    accept="image/*,.svg"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingLogo}
                    className="inline-flex items-center gap-2 rounded-xl bg-purple-50 hover:bg-purple-100 px-5 py-3 text-xs font-mono font-bold text-slate-900 border border-purple-200 transition hover:scale-[1.01] active:scale-[0.99]"
                  >
                    {uploadingLogo ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin text-purple-600" />
                        <span>Uploading Logo from Local Device...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4 text-purple-600" />
                        <span>Choose Local Image File</span>
                      </>
                    )}
                  </button>
                  <span className="block text-[11px] font-mono text-slate-500 font-medium mt-1.5">
                    Select any logo file from your computer. It is stored directly in your app&apos;s public uploads.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-700 font-bold mb-1 uppercase">
                    Or Direct Logo URL / Asset Path
                  </label>
                  <input
                    type="text"
                    value={form.logoUrl}
                    onChange={(e) => setForm({ ...form, logoUrl: e.target.value })}
                    placeholder="/uploads/logos/nord-media-house.jpg"
                    className="w-full rounded-xl border border-purple-200 bg-purple-50/30 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-purple-500 focus:bg-white focus:outline-none transition font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Agency Name */}
            <div>
              <label className="block text-xs font-mono text-slate-700 font-bold mb-1.5 uppercase">
                Agency Name *
              </label>
              <input
                type="text"
                required
                value={form.agencyName}
                onChange={(e) => setForm({ ...form, agencyName: e.target.value })}
                placeholder="e.g. NORD MEDIA HOUSE"
                className="w-full rounded-xl border border-purple-200 bg-purple-50/30 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-purple-500 focus:bg-white focus:outline-none transition font-display font-bold text-lg"
              />
            </div>

            {/* Company Moto Line */}
            <div>
              <label className="block text-xs font-mono text-slate-900 mb-1.5 uppercase font-bold flex items-center justify-between">
                <span>Company Moto Line (Hero Headline) *</span>
                <span className="text-[10px] text-purple-600 font-normal">Displayed prominently across hero & footer</span>
              </label>
              <input
                type="text"
                required
                value={form.motoLine}
                onChange={(e) => setForm({ ...form, motoLine: e.target.value })}
                placeholder="e.g. FIND YOUR BEARING — THREE ROUTES TO GROW YOUR BRAND'S PRESENCE"
                className="w-full rounded-xl border border-purple-200 bg-purple-50/30 px-4 py-3.5 text-sm text-slate-900 font-semibold placeholder-slate-400 focus:border-purple-500 focus:bg-white focus:outline-none transition"
              />
            </div>

            {/* Subheadline */}
            <div>
              <label className="block text-xs font-mono text-slate-700 font-bold mb-1.5 uppercase">
                Hero Subheadline & Positioning
              </label>
              <textarea
                rows={3}
                value={form.subHeadline}
                onChange={(e) => setForm({ ...form, subHeadline: e.target.value })}
                placeholder="We engineer high-impact commercials, viral creator campaigns, bespoke 3D brand experiences..."
                className="w-full rounded-xl border border-purple-200 bg-purple-50/30 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-purple-500 focus:bg-white focus:outline-none transition resize-none font-medium"
              />
            </div>
          </div>

          {/* Section 2: Color Scheme Matching Logo */}
          <div className="rounded-3xl border border-purple-200 bg-white/90 p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center gap-2 pb-4 border-b border-purple-100">
              <Palette className="h-4 w-4 text-purple-600" />
              <h3 className="font-display font-bold text-base text-slate-900 uppercase tracking-wider">
                Color Scheme & Brand Accents
              </h3>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-700 font-bold mb-3 uppercase">
                Select Matching Brand Palette Preset
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {colorSchemes.map((scheme) => (
                  <button
                    key={scheme.id}
                    type="button"
                    onClick={() => setForm({ ...form, colorScheme: scheme.id, accentColor: scheme.hex })}
                    className={`p-3.5 rounded-2xl border text-left transition flex items-center justify-between ${
                      form.colorScheme === scheme.id
                        ? "border-purple-500 bg-purple-50/80 shadow-sm"
                        : "border-purple-200 bg-white hover:border-purple-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="h-6 w-6 rounded-full border border-black/10 shadow-sm"
                        style={{ backgroundColor: scheme.hex }}
                      />
                      <span className="text-xs font-mono font-bold text-slate-900">{scheme.name}</span>
                    </div>
                    {form.colorScheme === scheme.id && (
                      <CheckCircle2 className="h-4 w-4 text-purple-600" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <label className="text-xs font-mono text-slate-700 font-bold uppercase">
                Custom Accent Color Hex:
              </label>
              <input
                type="color"
                value={form.accentColor}
                onChange={(e) => setForm({ ...form, accentColor: e.target.value })}
                className="h-9 w-12 rounded-lg bg-white border border-purple-200 cursor-pointer"
              />
              <input
                type="text"
                value={form.accentColor}
                onChange={(e) => setForm({ ...form, accentColor: e.target.value })}
                className="w-28 rounded-xl border border-purple-200 bg-purple-50/30 px-3 py-1.5 text-xs font-mono font-bold text-slate-900"
              />
            </div>
          </div>

          {/* Section 3: Contact & Global Operations */}
          <div className="rounded-3xl border border-purple-200 bg-white/90 p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center gap-2 pb-4 border-b border-purple-100">
              <Globe className="h-4 w-4 text-purple-600" />
              <h3 className="font-display font-bold text-base text-slate-900 uppercase tracking-wider">
                Contact Details & Operations
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-mono text-slate-700 font-bold mb-1.5 uppercase">
                  Contact Email
                </label>
                <input
                  type="email"
                  value={form.contactEmail}
                  onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
                  placeholder="nordmediahouse@gmail.com"
                  className="w-full rounded-xl border border-purple-200 bg-purple-50/30 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-purple-500 focus:bg-white focus:outline-none transition font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-700 font-bold mb-1.5 uppercase">
                  Contact Phone
                </label>
                <input
                  type="text"
                  value={form.contactPhone}
                  onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
                  placeholder="+91 93635 42725"
                  className="w-full rounded-xl border border-purple-200 bg-purple-50/30 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-purple-500 focus:bg-white focus:outline-none transition font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-700 font-bold mb-1.5 uppercase">
                  Global Hubs / Locations
                </label>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  placeholder="Mumbai • Bengaluru • London • Los Angeles"
                  className="w-full rounded-xl border border-purple-200 bg-purple-50/30 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-purple-500 focus:bg-white focus:outline-none transition font-medium"
                />
              </div>
            </div>
          </div>

          {/* Submit / Save Button */}
          <div className="flex items-center justify-end gap-4 pt-4">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-700 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-purple-500/25 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition disabled:opacity-50"
            >
              {saving ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin text-white" />
                  <span>Saving Changes...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 text-white" />
                  <span>Save Branding & Color Scheme</span>
                </>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

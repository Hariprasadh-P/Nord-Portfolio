"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import AdminHeader from "@/components/admin/AdminHeader";
import {
  Palette,
  Film,
  Package,
  Star,
  Inbox,
  ArrowRight,
  Sparkles,
  ExternalLink,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    packagesCount: 0,
    videosCount: 0,
    praisesCount: 0,
    inquiriesCount: 0,
    agencyName: "NORD MEDIA HOUSE",
    motoLine: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [contentRes, inqRes, praiseRes] = await Promise.all([
          fetch("/api/public/content"),
          fetch("/api/admin/inquiries"),
          fetch("/api/admin/praises"),
        ]);
        const content = await contentRes.json();
        const inquiries = await inqRes.json();
        const praises = await praiseRes.json();

        if (content.success && content.data) {
          setStats({
            packagesCount: content.data.packages?.length || 0,
            videosCount: content.data.videos?.length || 0,
            praisesCount: praises.success ? praises.data?.length || 0 : 0,
            inquiriesCount: inquiries.success ? inquiries.data?.length || 0 : 0,
            agencyName: content.data.settings?.agencyName || "NORD MEDIA HOUSE",
            motoLine: content.data.settings?.motoLine || "",
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const cards = [
    {
      title: "Branding & Logo",
      count: stats.agencyName,
      sub: "Upload logo from local device, select palette, and edit company motto line.",
      href: "/admin/branding",
      icon: <Palette className="h-5 w-5 text-purple-600" />,
      tag: "Live Sync",
    },
    {
      title: "Showcase Videos",
      count: `${stats.videosCount} Videos`,
      sub: "Upload local videos (MP4/WebM), set 4K showreels and commercial clips.",
      href: "/admin/videos",
      icon: <Film className="h-5 w-5 text-fuchsia-600" />,
      tag: "Active",
    },
    {
      title: "Packages & Pricing",
      count: `${stats.packagesCount} Tiers`,
      sub: "Edit monthly/quarterly rates, features checklist, and highlight badges.",
      href: "/admin/packages",
      icon: <Package className="h-5 w-5 text-purple-600" />,
      tag: "Active",
    },
    {
      title: "Client Praises & Endorsements",
      count: `${stats.praisesCount} Praises`,
      sub: "Add and manage executive endorsements and 5-star client quotes.",
      href: "/admin/praises",
      icon: <Star className="h-5 w-5 text-purple-500" />,
      tag: "Dynamic",
    },
    {
      title: "Inbound Leads Inbox",
      count: `${stats.inquiriesCount} Inquiries`,
      sub: "Manage client leads and project requests from the website.",
      href: "/admin/inquiries",
      icon: <Inbox className="h-5 w-5 text-purple-600" />,
      tag: "CRM",
    },
  ];

  return (
    <div className="flex-1 flex flex-col bg-background">
      <AdminHeader
        title="Dashboard Overview"
        subtitle="Centralized management for Nord Media House assets and public content"
      />

      <main className="p-6 sm:p-8 space-y-8 max-w-7xl">
        {/* Live Banner */}
        <div className="rounded-3xl border border-purple-200 bg-white/90 p-6 sm:p-8 shadow-sm relative overflow-hidden">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-purple-600 font-bold">
              <Sparkles className="h-4 w-4" />
              <span>NORD MEDIA HOUSE DATABASE SYNCED</span>
            </div>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-slate-900">
              {stats.agencyName}
            </h3>
            <p className="text-xs sm:text-sm font-mono text-slate-600 font-medium">
              &ldquo;{stats.motoLine || "FIND YOUR BEARING — THREE ROUTES TO GROW YOUR BRAND'S PRESENCE"}&rdquo;
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/admin/branding"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-700 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-purple-500/25 hover:shadow-lg transition"
            >
              <span>Edit Branding & Logo</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-xl bg-purple-50 border border-purple-200 px-4 py-2.5 text-xs font-mono font-bold text-slate-700 hover:text-slate-900 hover:bg-purple-100 transition"
            >
              <span>Preview Public Website</span>
              <ExternalLink className="h-3.5 w-3.5 text-purple-600" />
            </Link>
          </div>
        </div>

        {/* CMS Modules Grid */}
        <div>
          <h3 className="font-display font-bold text-lg text-slate-900 mb-4">
            Content & Section Controllers
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card, idx) => (
              <Link
                key={idx}
                href={card.href}
                className="group rounded-3xl border border-purple-200 bg-white/90 p-6 hover:border-purple-300 hover:shadow-md transition-all flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-2xl bg-purple-50 border border-purple-200 group-hover:border-purple-300 transition">
                      {card.icon}
                    </div>
                    <span className="rounded-full bg-purple-50 px-3 py-1 text-[10px] font-mono font-bold text-purple-700 border border-purple-200">
                      {card.tag}
                    </span>
                  </div>

                  <h4 className="font-display font-bold text-base text-slate-900 group-hover:text-purple-600 transition-colors">
                    {card.title}
                  </h4>
                  <div className="font-display font-extrabold text-xl text-slate-900 mt-1">
                    {loading ? "..." : card.count}
                  </div>
                  <p className="text-xs text-slate-600 mt-2 font-sans font-medium">{card.sub}</p>
                </div>

                <div className="pt-4 border-t border-purple-100 mt-4 flex items-center justify-between text-xs font-mono font-bold text-purple-600 group-hover:text-purple-800">
                  <span>Manage Section</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

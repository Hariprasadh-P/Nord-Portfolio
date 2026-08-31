"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Palette,
  Film,
  Package,
  Star,
  Inbox,
  ArrowLeft,
  Shield,
  LogOut,
} from "lucide-react";

interface AdminSidebarProps {
  onLogout: () => void;
}

export default function AdminSidebar({ onLogout }: AdminSidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard Overview", href: "/admin", icon: <LayoutDashboard className="h-4 w-4" /> },
    { label: "Branding & Moto", href: "/admin/branding", icon: <Palette className="h-4 w-4" /> },
    { label: "Showcase Videos", href: "/admin/videos", icon: <Film className="h-4 w-4" /> },
    { label: "Packages & Pricing", href: "/admin/packages", icon: <Package className="h-4 w-4" /> },
    { label: "Client Praises", href: "/admin/praises", icon: <Star className="h-4 w-4" /> },
    { label: "Leads & Inquiries", href: "/admin/inquiries", icon: <Inbox className="h-4 w-4" /> },
  ];

  return (
    <aside className="w-64 bg-white/90 backdrop-blur-xl border-r border-purple-200 flex flex-col justify-between p-4 min-h-screen shadow-sm">
      <div>
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-2 py-4 mb-4 border-b border-purple-100">
          <div className="h-9 w-9 rounded-xl bg-purple-100 p-1 flex items-center justify-center text-purple-600 shadow-sm border border-purple-200">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-display font-bold text-sm text-slate-900 tracking-wide">
              NORD CMS
            </h1>
            <span className="text-[10px] font-mono text-purple-600 font-bold">STUDIO PORTAL</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1.5 font-sans">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-mono transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-700 text-white font-bold shadow-md shadow-purple-500/25"
                    : "text-slate-700 hover:text-purple-600 hover:bg-purple-50 font-semibold"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Footer Actions */}
      <div className="pt-4 border-t border-purple-100 space-y-2">
        <Link
          href="/"
          className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold text-slate-700 hover:text-slate-950 bg-purple-50 hover:bg-purple-100 border border-purple-200 transition shadow-sm"
        >
          <span className="flex items-center gap-2">
            <ArrowLeft className="h-3.5 w-3.5 text-purple-600" />
            <span>Back to Portfolio</span>
          </span>
        </Link>

        <button
          onClick={onLogout}
          className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold text-red-600 hover:bg-red-50 transition"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span>Exit Admin & Return</span>
        </button>
      </div>
    </aside>
  );
}

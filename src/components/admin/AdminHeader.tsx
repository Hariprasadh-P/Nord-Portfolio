"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default function AdminHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="h-16 border-b border-purple-200 bg-white/90 backdrop-blur-md px-6 flex items-center justify-between shadow-sm">
      <div>
        <h2 className="font-display font-bold text-lg text-slate-900">{title}</h2>
        {subtitle && <p className="text-[11px] font-mono text-slate-500 font-medium">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-[11px] font-mono font-bold text-purple-700 shadow-sm">
          <CheckCircle2 className="h-3 w-3 text-purple-600" />
          <span>Prisma DB Synced</span>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-700 hover:opacity-95 px-3.5 py-1.5 text-xs font-mono font-bold text-white shadow-sm shadow-purple-500/20 transition"
        >
          <ArrowLeft className="h-3.5 w-3.5 text-purple-200" />
          <span>Go to Portfolio</span>
        </Link>
      </div>
    </header>
  );
}

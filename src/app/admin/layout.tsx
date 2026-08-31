"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Lock, KeyRound, ArrowRight, ArrowLeft } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [passcode, setPasscode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("hp_admin_token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode }),
      });

      const data = await res.json();
      if (data.success && data.token) {
        localStorage.setItem("hp_admin_token", data.token);
        setIsAuthenticated(true);
      } else {
        setErrorMsg(data.error || "Invalid Passcode. Please try again.");
      }
    } catch {
      setErrorMsg("Authentication request failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("hp_admin_token");
    setIsAuthenticated(false);
    // Directly navigate back to public portfolio
    window.location.href = "/";
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-purple-600 border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background text-slate-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Top return back button */}
        <div className="absolute top-6 left-6 z-20">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-2xl bg-white/90 border border-purple-200 px-4 py-2 text-xs font-mono font-bold text-slate-700 hover:text-purple-600 hover:border-purple-400 transition shadow-sm"
          >
            <ArrowLeft className="h-4 w-4 text-purple-600" />
            <span>Return to Portfolio (Home)</span>
          </Link>
        </div>

        <div className="absolute inset-0 bg-cyber-grid bg-[size:30px_30px] opacity-40 pointer-events-none" />
        <div className="w-full max-w-md rounded-3xl border border-purple-200 bg-white/95 p-8 shadow-xl shadow-purple-500/10 relative z-10">
          <div className="text-center mb-6">
            <div className="h-14 w-14 rounded-2xl bg-purple-100 mx-auto mb-4 flex items-center justify-center text-purple-600 shadow-sm border border-purple-200">
              <Lock className="h-7 w-7" />
            </div>
            <h2 className="font-display font-bold text-2xl text-slate-900">
              Nord CMS Portal
            </h2>
            <p className="text-xs font-mono text-slate-500 font-semibold mt-1">
              Enter admin security passcode to manage portfolio content.
            </p>
          </div>

          {errorMsg && (
            <div className="mb-4 rounded-xl border border-red-300 bg-red-50 p-3 text-xs font-mono font-bold text-red-700 text-center">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-700 font-bold mb-1.5 uppercase">
                Admin Passcode
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter passcode (Default: admin1234)"
                  className="w-full rounded-xl border border-purple-200 bg-purple-50/30 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-purple-500 focus:bg-white focus:outline-none transition font-medium"
                />
                <KeyRound className="absolute right-3.5 top-3.5 h-4 w-4 text-purple-400" />
              </div>
              <div className="text-[11px] font-mono text-slate-500 mt-1.5 flex items-center gap-1 font-semibold">
                <span>Default Passcode:</span>
                <span className="text-purple-700 font-bold">admin1234</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-700 text-white font-bold uppercase tracking-wider text-xs shadow-md shadow-purple-500/25 hover:shadow-lg hover:scale-[1.01] transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <span>Verifying...</span>
              ) : (
                <>
                  <span>Access CMS Dashboard</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>

            <div className="pt-3 text-center">
              <Link
                href="/"
                className="text-xs font-mono font-bold text-slate-500 hover:text-purple-600 transition underline decoration-dotted"
              >
                ← Or Go Back to Customer Portfolio (localhost:3000)
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-slate-900 flex">
      <AdminSidebar onLogout={handleLogout} />
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto max-h-screen">
        {children}
      </div>
    </div>
  );
}

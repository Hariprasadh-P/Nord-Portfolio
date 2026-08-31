"use client";

import React, { useState, useEffect } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import { Plus, Edit2, Trash2, Package, Check, X, Star } from "lucide-react";
import { PackageItemData } from "@/components/portfolio/PackagesSection";
import { formatCurrency } from "@/lib/utils";

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<PackageItemData[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPackage, setEditingPackage] = useState<Partial<PackageItemData> | null>(null);
  const [featuresInput, setFeaturesInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const loadPackages = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/packages");
      const json = await res.json();
      if (json.success) {
        setPackages(json.data || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPackages();
  }, []);

  const handleOpenEdit = (pkg: PackageItemData) => {
    setEditingPackage(pkg);
    setFeaturesInput(pkg.features?.join("\n") || "");
  };

  const handleOpenNew = () => {
    setEditingPackage({
      name: "",
      tier: "000° NORTH",
      priceMonthly: 20000,
      priceQuarterly: 54000,
      description: "",
      features: [],
      isPopular: false,
      badge: "Route",
      ctaText: "Select Route",
      order: packages.length + 1,
    });
    setFeaturesInput("");
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPackage) return;
    setSaving(true);
    setErrorMsg("");

    const parsedFeatures = featuresInput
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      ...editingPackage,
      features: parsedFeatures,
    };

    try {
      const isNew = !editingPackage.id;
      const res = await fetch("/api/admin/packages", {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();

      if (json.success) {
        setEditingPackage(null);
        await loadPackages();
      } else {
        setErrorMsg(json.error || "Failed to save package");
      }
    } catch {
      setErrorMsg("Network error saving package");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this package?")) return;
    try {
      const res = await fetch(`/api/admin/packages?id=${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        await loadPackages();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-background">
      <AdminHeader
        title="Packages & Pricing We Offer"
        subtitle="Manage sprint & retainer pricing tiers in INR (₹), features checklist, and highlight badges"
      />

      <main className="p-6 sm:p-8 max-w-7xl space-y-6">
        {/* Actions bar */}
        <div className="flex items-center justify-between">
          <div className="text-xs font-mono text-slate-700 font-bold">
            Active Packages: <span className="text-slate-900 font-extrabold">{packages.length}</span>
          </div>
          <button
            onClick={handleOpenNew}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-700 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-purple-500/25 hover:shadow-lg transition"
          >
            <Plus className="h-4 w-4" />
            <span>Add New Package (INR)</span>
          </button>
        </div>

        {/* Packages List */}
        {loading ? (
          <div className="flex items-center justify-center p-12">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-purple-600 border-t-transparent" />
          </div>
        ) : packages.length === 0 ? (
          <div className="rounded-3xl border border-purple-200 bg-white/90 p-12 text-center text-slate-700 shadow-sm">
            <Package className="h-10 w-10 mx-auto mb-3 text-purple-400" />
            <p className="text-sm font-mono font-bold">No packages configured yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`rounded-3xl border p-6 flex flex-col justify-between shadow-sm transition ${
                  pkg.isPopular
                    ? "border-purple-400 bg-white shadow-lg shadow-purple-500/10"
                    : "border-purple-200 bg-white/90 hover:border-purple-300"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono uppercase text-purple-600 font-bold">
                      {pkg.tier}
                    </span>
                    {pkg.isPopular && (
                      <span className="rounded-md bg-gradient-to-r from-purple-600 to-fuchsia-600 px-2 py-0.5 text-[10px] font-mono font-bold text-white shadow-sm">
                        POPULAR
                      </span>
                    )}
                  </div>

                  <h4 className="font-display font-bold text-xl text-slate-900">{pkg.name}</h4>
                  <p className="text-xs text-purple-700 mt-1 line-clamp-2 font-medium">{pkg.description}</p>

                  <div className="my-4 p-3 rounded-2xl bg-purple-50/60 border border-purple-200">
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs font-mono text-slate-700 font-bold">Monthly:</span>
                      <span className="font-display font-bold text-lg text-slate-900">
                        {formatCurrency(pkg.priceMonthly)}/mo
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline mt-1">
                      <span className="text-xs font-mono text-slate-700 font-bold">Quarterly:</span>
                      <span className="font-display font-bold text-sm text-purple-600">
                        {formatCurrency(pkg.priceQuarterly)}/qtr
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-[11px] font-mono text-slate-600 font-medium">
                      Features: <span className="text-slate-900 font-bold">{pkg.features?.length || 0}</span> items
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-purple-100 mt-6 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-purple-600 font-bold">Order: {pkg.order}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEdit(pkg)}
                      className="p-2 rounded-lg bg-purple-50 hover:bg-purple-100 text-slate-900 transition border border-purple-200"
                      title="Edit Package"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(pkg.id)}
                      className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition border border-red-200"
                      title="Delete Package"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {editingPackage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
            <div className="w-full max-w-2xl rounded-3xl border border-purple-200 bg-white p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-purple-100 mb-6">
                <h3 className="font-display font-bold text-lg text-slate-900">
                  {editingPackage.id ? "Edit Pricing Package" : "Create New Pricing Package"}
                </h3>
                <button
                  onClick={() => setEditingPackage(null)}
                  className="p-1 rounded-lg text-slate-500 hover:text-slate-900"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {errorMsg && (
                <div className="mb-4 rounded-xl border border-red-300 bg-red-50 p-3 text-xs font-mono font-bold text-red-700">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-700 font-bold mb-1 uppercase">
                      Package Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingPackage.name || ""}
                      onChange={(e) => setEditingPackage({ ...editingPackage, name: e.target.value })}
                      placeholder="e.g. Growth"
                      className="w-full rounded-xl border border-purple-200 bg-purple-50/40 px-4 py-2.5 text-sm text-slate-900 focus:border-purple-500 focus:bg-white focus:outline-none font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-700 font-bold mb-1 uppercase">
                      Bearing / Tier (e.g. 000° NORTH, 090° EAST)
                    </label>
                    <input
                      type="text"
                      value={editingPackage.tier || "090° EAST"}
                      onChange={(e) => setEditingPackage({ ...editingPackage, tier: e.target.value })}
                      placeholder="090° EAST"
                      className="w-full rounded-xl border border-purple-200 bg-purple-50/40 px-4 py-2.5 text-sm text-slate-900 focus:border-purple-500 focus:bg-white focus:outline-none font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-700 font-bold mb-1 uppercase">
                      Monthly Price (₹ INR) *
                    </label>
                    <input
                      type="number"
                      required
                      value={editingPackage.priceMonthly ?? ""}
                      onChange={(e) =>
                        setEditingPackage({
                          ...editingPackage,
                          priceMonthly: Number(e.target.value),
                          priceQuarterly: Math.round(Number(e.target.value) * 3 * 0.9),
                        })
                      }
                      placeholder="28000"
                      className="w-full rounded-xl border border-purple-200 bg-purple-50/40 px-4 py-2.5 text-sm text-slate-900 focus:border-purple-500 focus:bg-white focus:outline-none font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-700 font-bold mb-1 uppercase">
                      Quarterly Price (₹ INR) *
                    </label>
                    <input
                      type="number"
                      required
                      value={editingPackage.priceQuarterly ?? ""}
                      onChange={(e) =>
                        setEditingPackage({ ...editingPackage, priceQuarterly: Number(e.target.value) })
                      }
                      placeholder="75600"
                      className="w-full rounded-xl border border-purple-200 bg-purple-50/40 px-4 py-2.5 text-sm text-slate-900 focus:border-purple-500 focus:bg-white focus:outline-none font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-700 font-bold mb-1 uppercase">
                    Description
                  </label>
                  <input
                    type="text"
                    value={editingPackage.description || ""}
                    onChange={(e) => setEditingPackage({ ...editingPackage, description: e.target.value })}
                    placeholder="e.g. For scaling up"
                    className="w-full rounded-xl border border-purple-200 bg-purple-50/40 px-4 py-2.5 text-sm text-slate-900 focus:border-purple-500 focus:bg-white focus:outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-700 mb-1 uppercase font-bold">
                    Features Checklist (One per line)
                  </label>
                  <textarea
                    rows={4}
                    value={featuresInput}
                    onChange={(e) => setFeaturesInput(e.target.value)}
                    placeholder={"Posts: 10\nReels: 16\nMeta Ads Management: Included\nAdd-ons available: Menu Card Designing, Logo Designing"}
                    className="w-full rounded-xl border border-purple-200 bg-purple-50/40 px-4 py-2 text-sm text-slate-900 font-mono focus:border-purple-500 focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-700 font-bold mb-1 uppercase">
                      Badge Text (Optional)
                    </label>
                    <input
                      type="text"
                      value={editingPackage.badge || ""}
                      onChange={(e) => setEditingPackage({ ...editingPackage, badge: e.target.value })}
                      placeholder="e.g. MOST POPULAR"
                      className="w-full rounded-xl border border-purple-200 bg-purple-50/40 px-4 py-2.5 text-sm text-slate-900 focus:border-purple-500 focus:bg-white focus:outline-none font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-700 font-bold mb-1 uppercase">
                      CTA Button Label
                    </label>
                    <input
                      type="text"
                      value={editingPackage.ctaText || "Select Route"}
                      onChange={(e) => setEditingPackage({ ...editingPackage, ctaText: e.target.value })}
                      placeholder="Select Route"
                      className="w-full rounded-xl border border-purple-200 bg-purple-50/40 px-4 py-2.5 text-sm text-slate-900 focus:border-purple-500 focus:bg-white focus:outline-none font-medium"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-mono font-bold text-slate-700">
                    <input
                      type="checkbox"
                      checked={Boolean(editingPackage.isPopular)}
                      onChange={(e) =>
                        setEditingPackage({ ...editingPackage, isPopular: e.target.checked })
                      }
                      className="rounded text-purple-600 focus:ring-0"
                    />
                    <span>Mark as Highlighted / Most Popular Tier</span>
                  </label>
                </div>

                <div className="flex items-center justify-end gap-3 pt-6 border-t border-purple-100">
                  <button
                    type="button"
                    onClick={() => setEditingPackage(null)}
                    className="px-4 py-2 rounded-xl border border-purple-200 text-xs font-mono font-bold text-slate-600 hover:text-slate-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-700 text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-purple-500/25 hover:scale-[1.02] transition"
                  >
                    {saving ? "Saving..." : "Save Package"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

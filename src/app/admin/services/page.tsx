"use client";

import React, { useState, useEffect } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import { Plus, Edit2, Trash2, Zap, CheckCircle2, X } from "lucide-react";
import { ServiceItemData } from "@/components/portfolio/ServicesSection";

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceItemData[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState<Partial<ServiceItemData> | null>(null);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [deliverablesInput, setDeliverablesInput] = useState("");
  const [metricsInput, setMetricsInput] = useState<{ label: string; value: string }[]>([]);

  const loadServices = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/services");
      const json = await res.json();
      if (json.success) {
        setServices(json.data || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleOpenEdit = (svc: ServiceItemData) => {
    setEditingService(svc);
    setDeliverablesInput(svc.deliverables?.join("\n") || "");
    setMetricsInput(svc.metrics || []);
  };

  const handleOpenNew = () => {
    setEditingService({
      title: "",
      slug: "",
      shortDescription: "",
      fullDescription: "",
      icon: "Zap",
      deliverables: [],
      metrics: [],
      isFeatured: true,
      order: services.length + 1,
    });
    setDeliverablesInput("");
    setMetricsInput([{ label: "Avg ROAS", value: "4.5x" }]);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;
    setSaving(true);
    setErrorMsg("");

    const parsedDeliverables = deliverablesInput
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      ...editingService,
      deliverables: parsedDeliverables,
      metrics: metricsInput.filter((m) => m.label && m.value),
    };

    try {
      const isNew = !editingService.id;
      const res = await fetch("/api/admin/services", {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();

      if (json.success) {
        setEditingService(null);
        await loadServices();
      } else {
        setErrorMsg(json.error || "Failed to save service");
      }
    } catch {
      setErrorMsg("Network error saving service");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    try {
      const res = await fetch(`/api/admin/services?id=${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        await loadServices();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const icons = ["Target", "Sparkles", "Globe", "TrendingUp", "Cpu", "Layers", "Zap"];

  return (
    <div className="flex-1 flex flex-col bg-background">
      <AdminHeader
        title="Services We Provide"
        subtitle="Manage marketing service capabilities, deliverables, and ROI stats"
      />

      <main className="p-6 sm:p-8 max-w-7xl space-y-6">
        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="text-xs font-mono text-brand-800 font-bold">
            Total Active Services: <span className="text-brand-950 font-extrabold">{services.length}</span>
          </div>
          <button
            onClick={handleOpenNew}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-950 via-brand-900 to-brand-800 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:scale-[1.02] transition"
          >
            <Plus className="h-4 w-4" />
            <span>Add New Service</span>
          </button>
        </div>

        {/* Services List */}
        {loading ? (
          <div className="flex items-center justify-center p-12">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-700 border-t-transparent" />
          </div>
        ) : services.length === 0 ? (
          <div className="rounded-3xl border border-brand-200 bg-white p-12 text-center text-brand-800 shadow-sm">
            <Zap className="h-10 w-10 mx-auto mb-3 text-brand-400" />
            <p className="text-sm font-mono font-bold">No services configured yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc) => (
              <div
                key={svc.id}
                className="rounded-3xl border border-brand-200 bg-white p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-2xl bg-brand-50 text-brand-700 border border-brand-200">
                      <Zap className="h-5 w-5" />
                    </div>
                    <span className="text-[11px] font-mono text-brand-700 font-bold">
                      Icon: {svc.icon}
                    </span>
                  </div>

                  <h4 className="font-display font-bold text-base text-brand-950">{svc.title}</h4>
                  <p className="text-xs text-brand-800/80 mt-1 line-clamp-2 font-medium">{svc.shortDescription}</p>

                  <div className="mt-4 pt-3 border-t border-brand-100 space-y-1">
                    <div className="text-[11px] font-mono text-brand-800 font-medium">
                      Deliverables: <span className="text-brand-950 font-bold">{svc.deliverables?.length || 0}</span> items
                    </div>
                    <div className="text-[11px] font-mono text-brand-700 font-semibold">
                      Slug: <span className="text-brand-950 font-bold">{svc.slug}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-brand-100 mt-6 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-brand-700 font-bold">Order: {svc.order}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEdit(svc)}
                      className="p-2 rounded-lg bg-brand-50 hover:bg-brand-100 text-brand-900 transition border border-brand-200"
                      title="Edit Service"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(svc.id)}
                      className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition border border-red-200"
                      title="Delete Service"
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
        {editingService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
            <div className="w-full max-w-2xl rounded-3xl border border-brand-200 bg-white p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-brand-100 mb-6">
                <h3 className="font-display font-bold text-lg text-brand-950">
                  {editingService.id ? "Edit Service" : "Create New Marketing Service"}
                </h3>
                <button
                  onClick={() => setEditingService(null)}
                  className="p-1 rounded-lg text-brand-700 hover:text-brand-950"
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
                    <label className="block text-xs font-mono text-brand-800 font-bold mb-1 uppercase">
                      Service Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingService.title || ""}
                      onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                      placeholder="e.g. Meta & Paid Acquisition"
                      className="w-full rounded-xl border border-brand-200 bg-brand-50/40 px-4 py-2.5 text-sm text-brand-950 focus:border-brand-600 focus:bg-white focus:outline-none font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-brand-800 font-bold mb-1 uppercase">
                      Icon Name
                    </label>
                    <select
                      value={editingService.icon || "Zap"}
                      onChange={(e) => setEditingService({ ...editingService, icon: e.target.value })}
                      className="w-full rounded-xl border border-brand-200 bg-brand-50/40 px-3 py-2.5 text-sm text-brand-950 focus:border-brand-600 focus:bg-white focus:outline-none font-medium"
                    >
                      {icons.map((ic) => (
                        <option key={ic} value={ic}>
                          {ic}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-brand-800 font-bold mb-1 uppercase">
                    Short Hook Description *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingService.shortDescription || ""}
                    onChange={(e) => setEditingService({ ...editingService, shortDescription: e.target.value })}
                    placeholder="Brief 1-sentence hook for tab cards..."
                    className="w-full rounded-xl border border-brand-200 bg-brand-50/40 px-4 py-2.5 text-sm text-brand-950 focus:border-brand-600 focus:bg-white focus:outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-brand-800 font-bold mb-1 uppercase">
                    Full In-Depth Description
                  </label>
                  <textarea
                    rows={3}
                    value={editingService.fullDescription || ""}
                    onChange={(e) => setEditingService({ ...editingService, fullDescription: e.target.value })}
                    placeholder="Comprehensive description of strategy, execution, and tech..."
                    className="w-full rounded-xl border border-brand-200 bg-brand-50/40 px-4 py-2 text-sm text-brand-950 focus:border-brand-600 focus:bg-white focus:outline-none resize-none font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-brand-800 mb-1 uppercase font-bold">
                    Deliverables (One per line)
                  </label>
                  <textarea
                    rows={4}
                    value={deliverablesInput}
                    onChange={(e) => setDeliverablesInput(e.target.value)}
                    placeholder={"Full-funnel Meta Ads\nWeekly Creative Velocity\nReal-Time Performance Dashboard"}
                    className="w-full rounded-xl border border-brand-200 bg-brand-50/40 px-4 py-2 text-sm text-brand-950 font-mono focus:border-brand-600 focus:bg-white focus:outline-none"
                  />
                </div>

                {/* Metrics */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-mono text-brand-800 font-bold uppercase">
                      ROI & Metric Highlights
                    </label>
                    <button
                      type="button"
                      onClick={() => setMetricsInput([...metricsInput, { label: "", value: "" }])}
                      className="text-[11px] font-mono text-brand-700 font-bold hover:underline"
                    >
                      + Add Metric
                    </button>
                  </div>
                  <div className="space-y-2">
                    {metricsInput.map((metric, i) => (
                      <div key={i} className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Label (e.g. Avg ROAS)"
                          value={metric.label}
                          onChange={(e) => {
                            const copy = [...metricsInput];
                            copy[i].label = e.target.value;
                            setMetricsInput(copy);
                          }}
                          className="flex-1 rounded-xl border border-brand-200 bg-brand-50/40 px-3 py-1.5 text-xs text-brand-950 font-medium"
                        />
                        <input
                          type="text"
                          placeholder="Value (e.g. 4.8x)"
                          value={metric.value}
                          onChange={(e) => {
                            const copy = [...metricsInput];
                            copy[i].value = e.target.value;
                            setMetricsInput(copy);
                          }}
                          className="w-28 rounded-xl border border-brand-200 bg-brand-50/40 px-3 py-1.5 text-xs text-brand-950 font-bold"
                        />
                        <button
                          type="button"
                          onClick={() => setMetricsInput(metricsInput.filter((_, idx) => idx !== i))}
                          className="p-1.5 text-brand-400 hover:text-red-500"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-6 border-t border-brand-100">
                  <button
                    type="button"
                    onClick={() => setEditingService(null)}
                    className="px-4 py-2 rounded-xl border border-brand-200 text-xs font-mono font-bold text-brand-700 hover:text-brand-950"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2 rounded-xl bg-gradient-to-r from-brand-950 via-brand-900 to-brand-800 text-white text-xs font-bold uppercase tracking-wider shadow-md hover:scale-[1.02] transition"
                  >
                    {saving ? "Saving..." : "Save Service"}
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

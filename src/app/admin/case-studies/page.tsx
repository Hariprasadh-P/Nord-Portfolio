"use client";

import React, { useState, useEffect } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import { Plus, Edit2, Trash2, TrendingUp, X } from "lucide-react";
import { CaseStudyData } from "@/components/portfolio/CaseStudies";

export default function AdminCaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState<CaseStudyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCase, setEditingCase] = useState<Partial<CaseStudyData> | null>(null);
  const [tagsInput, setTagsInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const loadCases = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/case-studies");
      const json = await res.json();
      if (json.success) {
        setCaseStudies(json.data || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCases();
  }, []);

  const handleOpenEdit = (item: CaseStudyData) => {
    setEditingCase(item);
    setTagsInput(item.tags?.join(", ") || "");
  };

  const handleOpenNew = () => {
    setEditingCase({
      clientName: "",
      title: "",
      category: "Growth Scaling",
      roiMetric: "+420%",
      metricLabel: "ROAS Growth in 60 Days",
      description: "",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
      videoUrl: "",
      tags: [],
      isFeatured: true,
      order: caseStudies.length + 1,
    });
    setTagsInput("Meta Ads, Video Direction, Scaling");
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCase) return;
    setSaving(true);
    setErrorMsg("");

    const parsedTags = tagsInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      ...editingCase,
      tags: parsedTags,
    };

    try {
      const isNew = !editingCase.id;
      const res = await fetch("/api/admin/case-studies", {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();

      if (json.success) {
        setEditingCase(null);
        await loadCases();
      } else {
        setErrorMsg(json.error || "Failed to save case study");
      }
    } catch {
      setErrorMsg("Network error saving case study");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this case study?")) return;
    try {
      const res = await fetch(`/api/admin/case-studies?id=${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        await loadCases();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-background">
      <AdminHeader
        title="Case Studies & Client Results"
        subtitle="Manage client growth transformations, ROI stats, and campaign breakdowns"
      />

      <main className="p-6 sm:p-8 max-w-7xl space-y-6">
        {/* Actions bar */}
        <div className="flex items-center justify-between">
          <div className="text-xs font-mono text-brand-800 font-bold">
            Total Case Studies: <span className="text-brand-950 font-extrabold">{caseStudies.length}</span>
          </div>
          <button
            onClick={handleOpenNew}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-950 via-brand-900 to-brand-800 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:scale-[1.02] transition"
          >
            <Plus className="h-4 w-4" />
            <span>Add Case Study</span>
          </button>
        </div>

        {/* List */}
        {loading ? (
          <div className="flex items-center justify-center p-12">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-700 border-t-transparent" />
          </div>
        ) : caseStudies.length === 0 ? (
          <div className="rounded-3xl border border-brand-200 bg-white p-12 text-center text-brand-800 shadow-sm">
            <TrendingUp className="h-10 w-10 mx-auto mb-3 text-brand-400" />
            <p className="text-sm font-mono font-bold">No case studies found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseStudies.map((item) => (
              <div
                key={item.id}
                className="rounded-3xl border border-brand-200 bg-white overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition"
              >
                <div>
                  <div className="aspect-[16/9] relative bg-zinc-950">
                    {item.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <TrendingUp className="h-8 w-8 text-brand-400" />
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <span className="rounded-md bg-brand-950 px-2 py-0.5 text-[10px] font-mono text-white font-bold">
                        {item.roiMetric}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="text-[11px] font-mono text-brand-700 font-bold mb-1">{item.clientName}</div>
                    <h4 className="font-display font-bold text-base text-brand-950">{item.title}</h4>
                    {item.description && (
                      <p className="text-xs text-brand-800/80 mt-1 line-clamp-2 font-medium">{item.description}</p>
                    )}
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-brand-100 mt-4 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-brand-700 font-bold">Order: {item.order}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="p-2 rounded-lg bg-brand-50 hover:bg-brand-100 text-brand-900 transition border border-brand-200"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition border border-red-200"
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
        {editingCase && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
            <div className="w-full max-w-2xl rounded-3xl border border-brand-200 bg-white p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-brand-100 mb-6">
                <h3 className="font-display font-bold text-lg text-brand-950">
                  {editingCase.id ? "Edit Case Study" : "Create Case Study"}
                </h3>
                <button
                  onClick={() => setEditingCase(null)}
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
                      Client / Brand Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingCase.clientName || ""}
                      onChange={(e) => setEditingCase({ ...editingCase, clientName: e.target.value })}
                      placeholder="e.g. Luminary Audio"
                      className="w-full rounded-xl border border-brand-200 bg-brand-50/40 px-4 py-2.5 text-sm text-brand-950 focus:border-brand-600 focus:bg-white focus:outline-none font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-brand-800 font-bold mb-1 uppercase">
                      Category
                    </label>
                    <input
                      type="text"
                      value={editingCase.category || ""}
                      onChange={(e) => setEditingCase({ ...editingCase, category: e.target.value })}
                      placeholder="D2C / Hardware"
                      className="w-full rounded-xl border border-brand-200 bg-brand-50/40 px-4 py-2.5 text-sm text-brand-950 focus:border-brand-600 focus:bg-white focus:outline-none font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-brand-800 font-bold mb-1 uppercase">
                    Headline Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingCase.title || ""}
                    onChange={(e) => setEditingCase({ ...editingCase, title: e.target.value })}
                    placeholder="e.g. Scaling Luxury Audio Tech to ₹1.2 Cr Revenue"
                    className="w-full rounded-xl border border-brand-200 bg-brand-50/40 px-4 py-2.5 text-sm text-brand-950 focus:border-brand-600 focus:bg-white focus:outline-none font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-brand-800 mb-1 uppercase font-bold">
                      Key ROI Metric *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingCase.roiMetric || ""}
                      onChange={(e) => setEditingCase({ ...editingCase, roiMetric: e.target.value })}
                      placeholder="+716% or 5.4x"
                      className="w-full rounded-xl border border-brand-200 bg-brand-50/40 px-4 py-2.5 text-sm text-brand-950 font-bold focus:border-brand-600 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-brand-800 font-bold mb-1 uppercase">
                      Metric Label *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingCase.metricLabel || ""}
                      onChange={(e) => setEditingCase({ ...editingCase, metricLabel: e.target.value })}
                      placeholder="Net Revenue Growth in 90 Days"
                      className="w-full rounded-xl border border-brand-200 bg-brand-50/40 px-4 py-2.5 text-sm text-brand-950 focus:border-brand-600 focus:bg-white focus:outline-none font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-brand-800 font-bold mb-1 uppercase">
                    Cover Image URL
                  </label>
                  <input
                    type="url"
                    value={editingCase.imageUrl || ""}
                    onChange={(e) => setEditingCase({ ...editingCase, imageUrl: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full rounded-xl border border-brand-200 bg-brand-50/40 px-4 py-2.5 text-sm text-brand-950 focus:border-brand-600 focus:bg-white focus:outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-brand-800 font-bold mb-1 uppercase">
                    Case Summary & Execution Story
                  </label>
                  <textarea
                    rows={3}
                    value={editingCase.description || ""}
                    onChange={(e) => setEditingCase({ ...editingCase, description: e.target.value })}
                    placeholder="Strategy breakdown and execution metrics..."
                    className="w-full rounded-xl border border-brand-200 bg-brand-50/40 px-4 py-2 text-sm text-brand-950 focus:border-brand-600 focus:bg-white focus:outline-none resize-none font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-brand-800 font-bold mb-1 uppercase">
                    Tags (Comma separated)
                  </label>
                  <input
                    type="text"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="Meta Ads, Video Direction, Growth"
                    className="w-full rounded-xl border border-brand-200 bg-brand-50/40 px-4 py-2.5 text-sm text-brand-950 focus:border-brand-600 focus:bg-white focus:outline-none font-medium"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-6 border-t border-brand-100">
                  <button
                    type="button"
                    onClick={() => setEditingCase(null)}
                    className="px-4 py-2 rounded-xl border border-brand-200 text-xs font-mono font-bold text-brand-700 hover:text-brand-950"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2 rounded-xl bg-gradient-to-r from-brand-950 via-brand-900 to-brand-800 text-white text-xs font-bold uppercase tracking-wider shadow-md hover:scale-[1.02] transition"
                  >
                    {saving ? "Saving..." : "Save Case Study"}
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

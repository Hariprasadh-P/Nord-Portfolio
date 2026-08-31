"use client";

import React, { useState, useEffect, useRef } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import { Plus, Edit2, Trash2, Star, Quote, Upload, RefreshCw, X, Check } from "lucide-react";
import { TestimonialData } from "@/components/portfolio/TestimonialsSection";

export default function AdminPraisesPage() {
  const [praises, setPraises] = useState<TestimonialData[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPraise, setEditingPraise] = useState<Partial<TestimonialData> | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const loadPraises = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/praises");
      const json = await res.json();
      if (json.success) {
        setPraises(json.data || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPraises();
  }, []);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingAvatar(true);
    setErrorMsg("");

    try {
      const data = new FormData();
      data.append("file", file);
      data.append("type", "images");

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: data,
      });

      const json = await res.json();
      if (json.success && json.url) {
        setEditingPraise((prev) => ({ ...prev, avatarUrl: json.url }));
      } else {
        setErrorMsg(json.error || "Failed to upload author avatar image.");
      }
    } catch {
      setErrorMsg("Network error uploading avatar.");
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPraise) return;
    setSaving(true);
    setErrorMsg("");

    try {
      const isNew = !editingPraise.id;
      const res = await fetch("/api/admin/praises", {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingPraise),
      });
      const json = await res.json();

      if (json.success) {
        setEditingPraise(null);
        await loadPraises();
      } else {
        setErrorMsg(json.error || "Failed to save praise item");
      }
    } catch {
      setErrorMsg("Network error saving praise item");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this client endorsement?")) return;
    try {
      const res = await fetch(`/api/admin/praises?id=${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        await loadPraises();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-background">
      <AdminHeader
        title="Client Endorsements & Praises"
        subtitle="Manage executive reviews, ratings, and quotes displayed on the public portfolio"
      />

      <main className="p-6 sm:p-8 max-w-7xl space-y-6">
        {/* Actions bar */}
        <div className="flex items-center justify-between">
          <div className="text-xs font-mono text-slate-700 font-bold">
            Total Endorsements: <span className="text-slate-900 font-extrabold">{praises.length}</span>
          </div>
          <button
            onClick={() =>
              setEditingPraise({
                author: "",
                role: "",
                company: "",
                quote: "",
                avatarUrl: "",
                metric: "",
                rating: 5,
                isFeatured: true,
                order: praises.length + 1,
              })
            }
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-700 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-purple-500/25 hover:shadow-lg transition"
          >
            <Plus className="h-4 w-4" />
            <span>Add Client Praise</span>
          </button>
        </div>

        {/* Praises List */}
        {loading ? (
          <div className="flex items-center justify-center p-12">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-purple-600 border-t-transparent" />
          </div>
        ) : praises.length === 0 ? (
          <div className="rounded-3xl border border-purple-200 bg-white/90 p-12 text-center text-slate-700 shadow-sm">
            <Quote className="h-10 w-10 mx-auto mb-3 text-purple-400" />
            <p className="text-sm font-mono font-bold">No client praises in database yet.</p>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              Click &quot;Add Client Praise&quot; above to create endorsements that will appear dynamically on your portfolio.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {praises.map((item) => (
              <div
                key={item.id}
                className="rounded-3xl border border-purple-200 bg-white/90 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1 text-purple-600">
                      {[...Array(item.rating || 5)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-current" />
                      ))}
                    </div>
                    {item.metric && (
                      <span className="rounded-md bg-purple-50 px-2 py-0.5 text-[10px] font-mono text-purple-700 border border-purple-200 font-bold">
                        {item.metric}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-700 font-sans line-clamp-4 leading-relaxed font-medium">
                    &ldquo;{item.quote}&rdquo;
                  </p>

                  <div className="flex items-center gap-3 pt-4 border-t border-purple-100 mt-4">
                    {item.avatarUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.avatarUrl}
                        alt={item.author}
                        className="h-10 w-10 rounded-full object-cover border border-purple-200"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center font-display font-bold text-purple-700 border border-purple-200">
                        {item.author.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h4 className="font-display font-bold text-sm text-slate-900">{item.author}</h4>
                      <p className="text-[11px] text-purple-600 font-mono font-medium">
                        {item.role} {item.company ? `• ${item.company}` : ""}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-purple-100 mt-4 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-purple-600 font-bold">Order: {item.order}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingPraise(item)}
                      className="p-2 rounded-lg bg-purple-50 hover:bg-purple-100 text-slate-900 transition border border-purple-200"
                      title="Edit Praise"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition border border-red-200"
                      title="Delete Praise"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal for Add / Edit */}
        {editingPraise && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
            <div className="w-full max-w-xl rounded-3xl border border-purple-200 bg-white p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-purple-100 mb-6">
                <h3 className="font-display font-bold text-lg text-slate-900">
                  {editingPraise.id ? "Edit Client Praise" : "Add New Client Praise"}
                </h3>
                <button
                  onClick={() => setEditingPraise(null)}
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
                      Client Author Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingPraise.author || ""}
                      onChange={(e) => setEditingPraise({ ...editingPraise, author: e.target.value })}
                      placeholder="e.g. Marcus Sterling"
                      className="w-full rounded-xl border border-purple-200 bg-purple-50/40 px-4 py-2.5 text-sm text-slate-900 focus:border-purple-500 focus:bg-white focus:outline-none font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-700 font-bold mb-1 uppercase">
                      Role / Position
                    </label>
                    <input
                      type="text"
                      value={editingPraise.role || ""}
                      onChange={(e) => setEditingPraise({ ...editingPraise, role: e.target.value })}
                      placeholder="Founder & CEO"
                      className="w-full rounded-xl border border-purple-200 bg-purple-50/40 px-4 py-2.5 text-sm text-slate-900 focus:border-purple-500 focus:bg-white focus:outline-none font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-700 font-bold mb-1 uppercase">
                      Company / Brand Name
                    </label>
                    <input
                      type="text"
                      value={editingPraise.company || ""}
                      onChange={(e) => setEditingPraise({ ...editingPraise, company: e.target.value })}
                      placeholder="Luminary Audio"
                      className="w-full rounded-xl border border-purple-200 bg-purple-50/40 px-4 py-2.5 text-sm text-slate-900 focus:border-purple-500 focus:bg-white focus:outline-none font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-700 font-bold mb-1 uppercase">
                      Key Result Metric (Optional)
                    </label>
                    <input
                      type="text"
                      value={editingPraise.metric || ""}
                      onChange={(e) => setEditingPraise({ ...editingPraise, metric: e.target.value })}
                      placeholder="e.g. +716% Revenue Scaled"
                      className="w-full rounded-xl border border-purple-200 bg-purple-50/40 px-4 py-2.5 text-sm text-slate-900 focus:border-purple-500 focus:bg-white focus:outline-none font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-700 mb-1 uppercase font-bold">
                    Praise Quote Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={editingPraise.quote || ""}
                    onChange={(e) => setEditingPraise({ ...editingPraise, quote: e.target.value })}
                    placeholder="Enter the client's testimonial or praise statement..."
                    className="w-full rounded-xl border border-purple-200 bg-purple-50/40 px-4 py-2.5 text-sm text-slate-900 focus:border-purple-500 focus:bg-white focus:outline-none resize-none font-sans font-medium"
                  />
                </div>

                {/* Avatar upload */}
                <div>
                  <label className="block text-xs font-mono text-slate-700 font-bold mb-1 uppercase">
                    Author Avatar (Upload Local Photo or URL)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editingPraise.avatarUrl || ""}
                      onChange={(e) => setEditingPraise({ ...editingPraise, avatarUrl: e.target.value })}
                      placeholder="https://images.unsplash.com/... or /uploads/images/..."
                      className="flex-1 rounded-xl border border-purple-200 bg-purple-50/40 px-4 py-2 text-xs text-slate-900 focus:border-purple-500 focus:bg-white focus:outline-none font-medium"
                    />
                    <input
                      type="file"
                      ref={avatarInputRef}
                      onChange={handleAvatarUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => avatarInputRef.current?.click()}
                      disabled={uploadingAvatar}
                      className="px-3 py-2 rounded-xl bg-purple-50 border border-purple-200 text-xs font-mono font-bold text-slate-700 hover:bg-purple-100"
                    >
                      {uploadingAvatar ? "..." : "Upload"}
                    </button>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-purple-100">
                  <button
                    type="button"
                    onClick={() => setEditingPraise(null)}
                    className="px-4 py-2 rounded-xl border border-purple-200 text-xs font-mono font-bold text-slate-600 hover:text-slate-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-700 text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-purple-500/25 hover:scale-[1.02] transition"
                  >
                    {saving ? "Saving..." : "Save Endorsement"}
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

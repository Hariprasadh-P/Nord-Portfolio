"use client";

import React, { useState, useEffect, useRef } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import {
  Plus,
  Edit2,
  Trash2,
  Film,
  Upload,
  RefreshCw,
  X,
  Star,
  CheckCircle2,
  AlertCircle,
  FileVideo,
} from "lucide-react";
import { VideoItemData } from "@/components/portfolio/VideoShowcase";
import UniversalVideoPlayer from "@/components/portfolio/UniversalVideoPlayer";

export default function AdminVideosPage() {
  const [videos, setVideos] = useState<VideoItemData[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingVideo, setEditingVideo] = useState<Partial<VideoItemData> | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [uploadProgressText, setUploadProgressText] = useState("");
  const [uploadingPoster, setUploadingPoster] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const videoFileInputRef = useRef<HTMLInputElement>(null);
  const posterFileInputRef = useRef<HTMLInputElement>(null);

  const loadVideos = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/videos");
      const json = await res.json();
      if (json.success) {
        setVideos(json.data || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVideos();
  }, []);

  const uploadVideoFile = async (file: File) => {
    setUploadingVideo(true);
    setErrorMsg("");
    setUploadProgressText(`Uploading ${file.name} (${(file.size / (1024 * 1024)).toFixed(1)} MB)...`);

    try {
      const data = new FormData();
      data.append("file", file);
      data.append("type", "videos");

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: data,
      });

      const json = await res.json();
      if (json.success && json.url) {
        setEditingVideo((prev) => ({
          ...prev,
          videoUrl: json.url,
          title: prev?.title || file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
        }));
        setUploadProgressText(`✓ Successfully uploaded: ${json.fileName} (${json.formattedSize})`);
      } else {
        setErrorMsg(json.error || "Failed to upload video from local device.");
      }
    } catch (err: unknown) {
      const e = err as Error;
      setErrorMsg(`Network error during video upload: ${e?.message || "Check file size"}`);
    } finally {
      setUploadingVideo(false);
    }
  };

  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadVideoFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      uploadVideoFile(file);
    }
  };

  const handlePosterUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingPoster(true);
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
        setEditingVideo((prev) => ({ ...prev, posterUrl: json.url }));
      } else {
        setErrorMsg(json.error || "Failed to upload poster image.");
      }
    } catch {
      setErrorMsg("Network error uploading poster thumbnail.");
    } finally {
      setUploadingPoster(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVideo) return;
    if (!editingVideo.videoUrl) {
      setErrorMsg("Please upload a video or provide a valid video URL first.");
      return;
    }

    setSaving(true);
    setErrorMsg("");

    try {
      const isNew = !editingVideo.id;
      const res = await fetch("/api/admin/videos", {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingVideo),
      });
      const json = await res.json();

      if (json.success) {
        setSuccessMsg("Video saved successfully and updated on the public showcase!");
        setEditingVideo(null);
        await loadVideos();
        setTimeout(() => setSuccessMsg(""), 4000);
      } else {
        setErrorMsg(json.error || "Failed to save video");
      }
    } catch {
      setErrorMsg("Network error saving video record");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this showcase video?")) return;
    try {
      const res = await fetch(`/api/admin/videos?id=${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        await loadVideos();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-background">
      <AdminHeader
        title="Showcase Videos & Reels"
        subtitle="Upload 4K commercials and video reels directly from your local device storage"
      />

      <main className="p-6 sm:p-8 max-w-7xl space-y-6">
        {/* Success Alert */}
        {successMsg && (
          <div className="rounded-2xl border border-purple-200 bg-purple-50 p-4 text-xs font-mono font-bold text-slate-900 flex items-center gap-2 shadow-sm">
            <CheckCircle2 className="h-4 w-4 text-purple-600" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Actions bar */}
        <div className="flex items-center justify-between">
          <div className="text-xs font-mono text-slate-700 font-bold">
            Showcase Videos in Database:{" "}
            <span className="text-slate-900 font-extrabold">{videos.length}</span>
          </div>
          <button
            onClick={() => {
              setEditingVideo({
                title: "",
                description: "",
                videoUrl: "",
                posterUrl: "",
                category: "Showreel",
                clientName: "",
                isFeatured: videos.length === 0,
                order: videos.length + 1,
              });
              setUploadProgressText("");
              setErrorMsg("");
            }}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-700 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-purple-500/25 hover:shadow-lg transition"
          >
            <Plus className="h-4 w-4" />
            <span>Upload New Video</span>
          </button>
        </div>

        {/* Video List */}
        {loading ? (
          <div className="flex items-center justify-center p-12">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-purple-600 border-t-transparent" />
          </div>
        ) : videos.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-purple-200 bg-white/90 p-12 text-center text-slate-700 space-y-4 shadow-sm">
            <div className="h-16 w-16 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center mx-auto text-purple-600 shadow-sm">
              <Film className="h-8 w-8" />
            </div>
            <div>
              <h4 className="font-display font-bold text-lg text-slate-900">No Videos Uploaded Yet</h4>
              <p className="text-xs font-sans text-slate-600 max-w-md mx-auto mt-1 font-medium">
                All placeholder videos have been removed. Click the button below to upload your own video from your computer (MP4, WebM, MOV).
              </p>
            </div>
            <button
              onClick={() => {
                setEditingVideo({
                  title: "",
                  description: "",
                  videoUrl: "",
                  posterUrl: "",
                  category: "Showreel",
                  clientName: "",
                  isFeatured: true,
                  order: 1,
                });
                setUploadProgressText("");
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-700 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:scale-105 transition"
            >
              <Upload className="h-4 w-4" />
              <span>Upload Your First Video</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((vid) => (
              <div
                key={vid.id}
                className="rounded-3xl border border-purple-200 bg-white/90 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition"
              >
                <div>
                  <div className="aspect-video relative bg-zinc-950">
                    <video
                      src={vid.videoUrl}
                      poster={vid.posterUrl || undefined}
                      controls
                      className="w-full h-full object-cover"
                    />
                    {vid.isFeatured && (
                      <div className="absolute top-3 left-3 pointer-events-none">
                        <span className="inline-flex items-center gap-1 rounded-md bg-purple-600 px-2 py-0.5 text-[10px] font-mono font-bold text-white shadow-md">
                          <Star className="h-3 w-3 fill-current" />
                          <span>FEATURED SHOWCASE</span>
                        </span>
                      </div>
                    )}
                    <div className="absolute top-3 right-3 pointer-events-none">
                      <span className="rounded-md bg-black/80 px-2 py-0.5 text-[10px] font-mono text-zinc-300">
                        {vid.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="text-[11px] font-mono text-purple-600 mb-1 font-bold">
                      {vid.clientName || "Showcase Reel"}
                    </div>
                    <h4 className="font-display font-bold text-base text-slate-900">{vid.title}</h4>
                    {vid.description && (
                      <p className="text-xs text-slate-600 mt-1 line-clamp-2 font-medium">{vid.description}</p>
                    )}
                    <div className="mt-3 p-2 rounded-lg bg-purple-50 border border-purple-200 text-[11px] font-mono text-slate-700 truncate font-semibold">
                      {vid.videoUrl}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-purple-100 mt-4 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-purple-600 font-bold">Order: {vid.order}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingVideo(vid)}
                      className="p-2 rounded-lg bg-purple-50 hover:bg-purple-100 text-slate-900 transition border border-purple-200"
                      title="Edit Video"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(vid.id)}
                      className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition border border-red-200"
                      title="Delete Video"
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
        {editingVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
            <div className="w-full max-w-2xl rounded-3xl border border-purple-200 bg-white p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-purple-100 mb-6">
                <h3 className="font-display font-bold text-lg text-slate-900">
                  {editingVideo.id ? "Edit Video Item" : "Upload Video to Showcase"}
                </h3>
                <button
                  onClick={() => setEditingVideo(null)}
                  className="p-1 rounded-lg text-slate-500 hover:text-slate-900"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {errorMsg && (
                <div className="mb-4 rounded-xl border border-red-300 bg-red-50 p-3 text-xs font-mono font-bold text-red-700 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleSave} className="space-y-5">
                {/* Drag & Drop Upload Zone */}
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`p-6 rounded-2xl border-2 border-dashed transition-all text-center ${
                    isDragging
                      ? "border-purple-600 bg-purple-50"
                      : editingVideo.videoUrl
                      ? "border-purple-300 bg-purple-50/40"
                      : "border-purple-200 bg-purple-50/20 hover:border-purple-300"
                  }`}
                >
                  <input
                    type="file"
                    ref={videoFileInputRef}
                    onChange={handleVideoFileChange}
                    accept="video/mp4,video/webm,video/quicktime,video/mov,video/*"
                    className="hidden"
                  />

                  {uploadingVideo ? (
                    <div className="py-4 space-y-2">
                      <RefreshCw className="h-8 w-8 animate-spin text-purple-600 mx-auto" />
                      <div className="text-xs font-mono text-slate-900 font-bold">
                        {uploadProgressText || "Uploading video file..."}
                      </div>
                      <div className="text-[11px] font-mono text-slate-500 font-medium">
                        Writing file buffer to server...
                      </div>
                    </div>
                  ) : editingVideo.videoUrl ? (
                    <div className="space-y-3">
                      <div className="aspect-video w-full max-w-md mx-auto rounded-xl overflow-hidden bg-black border border-purple-200">
                        <UniversalVideoPlayer
                          url={editingVideo.videoUrl}
                          posterUrl={editingVideo.posterUrl}
                          autoPlay={false}
                        />
                      </div>
                      <div className="flex items-center justify-center gap-2 text-xs font-mono font-bold text-purple-700">
                        <CheckCircle2 className="h-4 w-4 text-purple-600" />
                        <span>Video Ready: {editingVideo.videoUrl}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => videoFileInputRef.current?.click()}
                        className="text-xs font-mono font-bold text-purple-600 hover:text-purple-800 underline"
                      >
                        Choose a different video file
                      </button>
                    </div>
                  ) : (
                    <div className="py-4 space-y-3">
                      <div className="h-12 w-12 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center mx-auto text-purple-600">
                        <FileVideo className="h-6 w-6" />
                      </div>
                      <div>
                        <button
                          type="button"
                          onClick={() => videoFileInputRef.current?.click()}
                          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-700 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-purple-500/25 hover:scale-105 transition"
                        >
                          <Upload className="h-4 w-4" />
                          <span>Select Video File from Computer</span>
                        </button>
                      </div>
                      <p className="text-xs text-slate-500 font-sans font-medium">
                        or drag and drop MP4, MOV, WebM files directly here
                      </p>
                    </div>
                  )}
                </div>

                {/* Direct Video URL */}
                <div>
                  <label className="block text-xs font-mono text-slate-700 font-bold mb-1 uppercase">
                    Video Stream / File Path *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingVideo.videoUrl || ""}
                    onChange={(e) => setEditingVideo({ ...editingVideo, videoUrl: e.target.value })}
                    placeholder="/uploads/videos/... or https://..."
                    className="w-full rounded-xl border border-purple-200 bg-purple-50/40 px-4 py-2 text-xs text-slate-900 focus:border-purple-500 focus:bg-white focus:outline-none font-medium"
                  />
                </div>

                {/* Video Title */}
                <div>
                  <label className="block text-xs font-mono text-slate-700 font-bold mb-1 uppercase">
                    Video Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingVideo.title || ""}
                    onChange={(e) => setEditingVideo({ ...editingVideo, title: e.target.value })}
                    placeholder="e.g. 2026 Global Brand Commercial"
                    className="w-full rounded-xl border border-purple-200 bg-purple-50/40 px-4 py-2.5 text-sm text-slate-900 focus:border-purple-500 focus:bg-white focus:outline-none font-medium"
                  />
                </div>

                {/* Poster Thumbnail Upload */}
                <div>
                  <label className="block text-xs font-mono text-slate-700 font-bold mb-1 uppercase">
                    Poster Thumbnail Image (Optional)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editingVideo.posterUrl || ""}
                      onChange={(e) => setEditingVideo({ ...editingVideo, posterUrl: e.target.value })}
                      placeholder="https://... or /uploads/images/..."
                      className="flex-1 rounded-xl border border-purple-200 bg-purple-50/40 px-4 py-2 text-xs text-slate-900 focus:border-purple-500 focus:bg-white focus:outline-none font-medium"
                    />
                    <input
                      type="file"
                      ref={posterFileInputRef}
                      onChange={handlePosterUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => posterFileInputRef.current?.click()}
                      disabled={uploadingPoster}
                      className="px-4 py-2 rounded-xl bg-purple-50 border border-purple-200 text-xs font-mono font-bold text-slate-700 hover:bg-purple-100"
                    >
                      {uploadingPoster ? "..." : "Upload Poster"}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-700 font-bold mb-1 uppercase">
                      Category
                    </label>
                    <select
                      value={editingVideo.category || "Showreel"}
                      onChange={(e) => setEditingVideo({ ...editingVideo, category: e.target.value })}
                      className="w-full rounded-xl border border-purple-200 bg-purple-50/40 px-3 py-2.5 text-sm text-slate-900 focus:border-purple-500 focus:bg-white focus:outline-none font-medium"
                    >
                      <option value="Showreel">Showreel</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Paid Ads">Paid Ads</option>
                      <option value="3D CGI">3D CGI</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-700 font-bold mb-1 uppercase">
                      Client / Campaign Name
                    </label>
                    <input
                      type="text"
                      value={editingVideo.clientName || ""}
                      onChange={(e) => setEditingVideo({ ...editingVideo, clientName: e.target.value })}
                      placeholder="e.g. Nordic Luxe"
                      className="w-full rounded-xl border border-purple-200 bg-purple-50/40 px-4 py-2.5 text-sm text-slate-900 focus:border-purple-500 focus:bg-white focus:outline-none font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-700 font-bold mb-1 uppercase">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    value={editingVideo.description || ""}
                    onChange={(e) => setEditingVideo({ ...editingVideo, description: e.target.value })}
                    placeholder="Brief summary of creative direction and commercial impact..."
                    className="w-full rounded-xl border border-purple-200 bg-purple-50/40 px-4 py-2 text-sm text-slate-900 focus:border-purple-500 focus:bg-white focus:outline-none resize-none font-medium"
                  />
                </div>

                <div className="flex items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-mono font-bold text-slate-700">
                    <input
                      type="checkbox"
                      checked={Boolean(editingVideo.isFeatured)}
                      onChange={(e) => setEditingVideo({ ...editingVideo, isFeatured: e.target.checked })}
                      className="rounded text-purple-600 focus:ring-0"
                    />
                    <span>Set as Featured Hero Showcase</span>
                  </label>

                  <div className="flex items-center gap-2">
                    <label className="text-xs font-mono text-slate-700 font-bold">Order:</label>
                    <input
                      type="number"
                      value={editingVideo.order || 0}
                      onChange={(e) => setEditingVideo({ ...editingVideo, order: Number(e.target.value) })}
                      className="w-16 rounded-lg border border-purple-200 bg-purple-50/40 px-2 py-1 text-xs text-slate-900 text-center font-bold"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-purple-100">
                  <button
                    type="button"
                    onClick={() => setEditingVideo(null)}
                    className="px-4 py-2 rounded-xl border border-purple-200 text-xs font-mono font-bold text-slate-600 hover:text-slate-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving || uploadingVideo}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-700 text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-purple-500/25 hover:scale-[1.02] transition disabled:opacity-50"
                  >
                    {saving ? "Saving Video..." : "Save Video to Showcase"}
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

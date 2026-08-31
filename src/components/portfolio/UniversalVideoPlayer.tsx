"use client";

import React, { useMemo, useState, useRef, useEffect } from "react";
import { Film, AlertCircle, RefreshCw, Play, Volume2, VolumeX } from "lucide-react";

interface UniversalVideoPlayerProps {
  url: string;
  title?: string;
  posterUrl?: string | null;
  autoPlay?: boolean;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  className?: string;
}

export function parseVideoUrl(rawUrl: string): {
  type: "direct" | "youtube" | "vimeo" | "embed";
  embedUrl: string;
} {
  if (!rawUrl) {
    return { type: "direct", embedUrl: "" };
  }

  const url = rawUrl.trim();

  // 1. YouTube Matchers
  const youtubeMatch =
    url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|v\/))([\w-]{11})/i);

  if (youtubeMatch && youtubeMatch[1]) {
    const videoId = youtubeMatch[1];
    return {
      type: "youtube",
      embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`,
    };
  }

  // 2. Vimeo Matchers
  const vimeoMatch = url.match(/(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/i);
  if (vimeoMatch && vimeoMatch[1]) {
    const videoId = vimeoMatch[1];
    return {
      type: "vimeo",
      embedUrl: `https://player.vimeo.com/video/${videoId}?autoplay=1&dnt=1`,
    };
  }

  // 3. Direct Video File (.mp4, .webm, .mov, .m4v, or local /uploads/...)
  const isDirectFile =
    url.startsWith("/uploads/") ||
    url.startsWith("blob:") ||
    url.startsWith("data:") ||
    /\.(mp4|webm|mov|m4v|ogg|ogv)(\?.*)?$/i.test(url);

  if (isDirectFile) {
    return { type: "direct", embedUrl: url };
  }

  // 4. Default / Fallback
  return { type: "embed", embedUrl: url };
}

export default function UniversalVideoPlayer({
  url,
  title = "Video Player",
  posterUrl,
  autoPlay = true,
  controls = true,
  loop = true,
  muted = false,
  className = "w-full h-full",
}: UniversalVideoPlayerProps) {
  const [hasError, setHasError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const parsed = useMemo(() => parseVideoUrl(url), [url]);

  useEffect(() => {
    setHasError(false);
    if (parsed.type === "direct" && videoRef.current) {
      if (autoPlay) {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => setIsPlaying(true))
            .catch(() => {
              // Autoplay with sound might require user gesture in some browsers
              setIsPlaying(false);
            });
        }
      }
    }
  }, [url, autoPlay, parsed.type]);

  if (!url) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-slate-950 text-slate-500 p-4">
        <Film className="h-12 w-12 mb-2 opacity-50" />
        <span className="text-xs font-mono">No video stream available</span>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-slate-950 text-slate-400 p-6 text-center space-y-3">
        <AlertCircle className="h-10 w-10 text-sky-400 mx-auto" />
        <div className="text-xs font-mono font-bold text-white">{title}</div>
        <p className="text-[11px] font-sans text-slate-400 max-w-sm">
          Unable to decode this video stream in current browser profile.
        </p>
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={() => {
              setHasError(false);
              videoRef.current?.load();
              videoRef.current?.play();
            }}
            className="px-4 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono font-bold text-white hover:bg-slate-800 transition flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="h-3 w-3" />
            <span>Retry</span>
          </button>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1.5 rounded-xl bg-sky-600 text-xs font-mono font-bold text-white hover:bg-sky-500 transition"
          >
            Direct Stream Link →
          </a>
        </div>
      </div>
    );
  }

  // Native HTML5 Video for local /uploads/ or direct MP4/WebM/MOV files
  if (parsed.type === "direct") {
    return (
      <div className={`relative flex items-center justify-center bg-black ${className}`}>
        <video
          ref={videoRef}
          key={url}
          src={url}
          poster={posterUrl || undefined}
          controls={controls}
          autoPlay={autoPlay}
          playsInline
          loop={loop}
          muted={muted}
          preload="auto"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onError={() => setHasError(true)}
          className="w-full h-full object-contain max-h-[85vh] bg-black cursor-pointer"
        />

        {/* Play overlay button if paused/blocked by browser gesture policy */}
        {!isPlaying && !controls && (
          <button
            onClick={() => {
              videoRef.current?.play();
              setIsPlaying(true);
            }}
            className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/20 transition cursor-pointer"
          >
            <div className="h-16 w-16 rounded-full bg-sky-600/90 text-white flex items-center justify-center shadow-lg shadow-sky-500/40 scale-100 hover:scale-110 transition-transform">
              <Play className="h-8 w-8 fill-white ml-1 text-white" />
            </div>
          </button>
        )}
      </div>
    );
  }

  // Iframe for YouTube, Vimeo, or external embeds
  return (
    <iframe
      key={parsed.embedUrl}
      src={parsed.embedUrl}
      title={title}
      className={`${className} border-0 bg-black`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    />
  );
}

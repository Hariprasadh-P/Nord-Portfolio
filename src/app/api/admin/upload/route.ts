import { NextResponse } from "next/server";
import { writeFile, mkdir, stat } from "fs/promises";
import path from "path";
import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 180; // Allow sufficient time for large 4K video uploads & transcoding

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const uploadType = (formData.get("type") as string) || "general"; // "videos", "logos", "images"

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file was selected for upload." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize filename and create unique name
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e4);
    const fileName = `${uniqueSuffix}-${originalName}`;

    // Target directory under public/uploads/<type>
    const subDir = uploadType === "videos" ? "videos" : uploadType === "logos" ? "logos" : "images";
    const uploadDir = path.join(process.cwd(), "public", "uploads", subDir);

    await mkdir(uploadDir, { recursive: true });
    const rawFilePath = path.join(uploadDir, fileName);
    await writeFile(rawFilePath, buffer);

    let finalFileName = fileName;
    let finalPublicUrl = `/uploads/${subDir}/${fileName}`;
    let finalSize = file.size;

    // If it's a video file, ensure it's transcoded to a 100% web-compatible H.264 MP4 with fast-start
    if (uploadType === "videos" || /\.(mov|mp4|m4v|avi|mkv|webm|wmv|flv)$/i.test(originalName)) {
      const ext = path.extname(fileName);
      const baseWithoutExt = fileName.substring(0, fileName.length - ext.length);
      const convertedMp4Name = `${baseWithoutExt}.mp4`;
      const convertedMp4Path = path.join(uploadDir, convertedMp4Name);

      try {
        // Run macOS hardware-accelerated avconvert to generate browser-compatible 1080p/4K fast-start MP4
        await execFileAsync("/usr/bin/avconvert", [
          "-s",
          rawFilePath,
          "-p",
          "Preset1920x1080",
          "-o",
          convertedMp4Path,
          "--replace",
        ]);

        const fileStats = await stat(convertedMp4Path);
        finalFileName = convertedMp4Name;
        finalPublicUrl = `/uploads/${subDir}/${convertedMp4Name}`;
        finalSize = fileStats.size;
      } catch (convErr) {
        console.warn("avconvert notice (using direct file stream):", convErr);
        // Fallback to original saved file
      }
    }

    return NextResponse.json({
      success: true,
      url: finalPublicUrl,
      fileName: finalFileName,
      size: finalSize,
      type: "video/mp4",
      formattedSize: `${(finalSize / (1024 * 1024)).toFixed(2)} MB`,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Local file upload error:", err);
    return NextResponse.json(
      {
        success: false,
        error: `Failed to upload file: ${err?.message || "Unknown error"}`,
      },
      { status: 500 }
    );
  }
}

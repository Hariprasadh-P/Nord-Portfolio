import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const videos = await prisma.videoItem.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json({ success: true, data: videos });
  } catch (error) {
    console.error("Fetch videos error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch videos" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, videoUrl, posterUrl, category, clientName, isFeatured, order } = body;

    if (!title || !videoUrl) {
      return NextResponse.json(
        { success: false, error: "Title and video URL are required." },
        { status: 400 }
      );
    }

    const newVideo = await prisma.videoItem.create({
      data: {
        title,
        description: description || "",
        videoUrl,
        posterUrl: posterUrl || "",
        category: category || "Showreel",
        clientName: clientName || "",
        isFeatured: Boolean(isFeatured),
        order: Number(order) || 0,
      },
    });

    return NextResponse.json({ success: true, data: newVideo });
  } catch (error) {
    console.error("Create video error:", error);
    return NextResponse.json({ success: false, error: "Failed to create video" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, title, description, videoUrl, posterUrl, category, clientName, isFeatured, order } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Video ID is required" }, { status: 400 });
    }

    const updated = await prisma.videoItem.update({
      where: { id },
      data: {
        title,
        description,
        videoUrl,
        posterUrl,
        category,
        clientName,
        isFeatured: Boolean(isFeatured),
        order: Number(order) || 0,
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Update video error:", error);
    return NextResponse.json({ success: false, error: "Failed to update video" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Video ID is required" }, { status: 400 });
    }

    await prisma.videoItem.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Video deleted successfully" });
  } catch (error) {
    console.error("Delete video error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete video" }, { status: 500 });
  }
}

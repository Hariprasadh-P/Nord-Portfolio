import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const cases = await prisma.caseStudy.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json({
      success: true,
      data: cases.map((c) => ({
        ...c,
        tags: JSON.parse(c.tags || "[]"),
      })),
    });
  } catch (error) {
    console.error("Fetch case studies error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch case studies" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { clientName, title, category, roiMetric, metricLabel, description, imageUrl, videoUrl, tags, isFeatured, order } = body;

    if (!clientName || !title) {
      return NextResponse.json(
        { success: false, error: "Client name and title are required." },
        { status: 400 }
      );
    }

    const newCase = await prisma.caseStudy.create({
      data: {
        clientName,
        title,
        category: category || "Growth Case Study",
        roiMetric: roiMetric || "+300%",
        metricLabel: metricLabel || "ROAS Growth",
        description: description || "",
        imageUrl: imageUrl || "",
        videoUrl: videoUrl || "",
        tags: typeof tags === "string" ? tags : JSON.stringify(tags || []),
        isFeatured: isFeatured !== undefined ? Boolean(isFeatured) : true,
        order: Number(order) || 0,
      },
    });

    return NextResponse.json({ success: true, data: newCase });
  } catch (error) {
    console.error("Create case study error:", error);
    return NextResponse.json({ success: false, error: "Failed to create case study" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, clientName, title, category, roiMetric, metricLabel, description, imageUrl, videoUrl, tags, isFeatured, order } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Case study ID is required" }, { status: 400 });
    }

    const updated = await prisma.caseStudy.update({
      where: { id },
      data: {
        clientName,
        title,
        category,
        roiMetric,
        metricLabel,
        description,
        imageUrl,
        videoUrl,
        tags: typeof tags === "string" ? tags : JSON.stringify(tags || []),
        isFeatured: Boolean(isFeatured),
        order: Number(order) || 0,
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Update case study error:", error);
    return NextResponse.json({ success: false, error: "Failed to update case study" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Case study ID is required" }, { status: 400 });
    }

    await prisma.caseStudy.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Case study deleted successfully" });
  } catch (error) {
    console.error("Delete case study error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete case study" }, { status: 500 });
  }
}

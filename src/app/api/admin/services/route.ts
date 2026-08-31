import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const services = await prisma.serviceItem.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json({
      success: true,
      data: services.map((s) => ({
        ...s,
        deliverables: JSON.parse(s.deliverables || "[]"),
        metrics: JSON.parse(s.metrics || "[]"),
      })),
    });
  } catch (error) {
    console.error("Fetch services error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch services" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, slug, shortDescription, fullDescription, icon, deliverables, metrics, isFeatured, order } = body;

    if (!title || !shortDescription) {
      return NextResponse.json(
        { success: false, error: "Title and short description are required." },
        { status: 400 }
      );
    }

    const calculatedSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const newService = await prisma.serviceItem.create({
      data: {
        title,
        slug: calculatedSlug,
        shortDescription,
        fullDescription: fullDescription || shortDescription,
        icon: icon || "Zap",
        deliverables: typeof deliverables === "string" ? deliverables : JSON.stringify(deliverables || []),
        metrics: typeof metrics === "string" ? metrics : JSON.stringify(metrics || []),
        isFeatured: isFeatured !== undefined ? Boolean(isFeatured) : true,
        order: Number(order) || 0,
      },
    });

    return NextResponse.json({ success: true, data: newService });
  } catch (error) {
    console.error("Create service error:", error);
    return NextResponse.json({ success: false, error: "Failed to create service" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, title, slug, shortDescription, fullDescription, icon, deliverables, metrics, isFeatured, order } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Service ID is required" }, { status: 400 });
    }

    const updated = await prisma.serviceItem.update({
      where: { id },
      data: {
        title,
        slug,
        shortDescription,
        fullDescription,
        icon,
        deliverables: typeof deliverables === "string" ? deliverables : JSON.stringify(deliverables || []),
        metrics: typeof metrics === "string" ? metrics : JSON.stringify(metrics || []),
        isFeatured: Boolean(isFeatured),
        order: Number(order) || 0,
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Update service error:", error);
    return NextResponse.json({ success: false, error: "Failed to update service" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Service ID is required" }, { status: 400 });
    }

    await prisma.serviceItem.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Service deleted successfully" });
  } catch (error) {
    console.error("Delete service error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete service" }, { status: 500 });
  }
}

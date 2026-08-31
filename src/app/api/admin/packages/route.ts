import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const packages = await prisma.packageItem.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json({
      success: true,
      data: packages.map((p) => ({
        ...p,
        features: JSON.parse(p.features || "[]"),
      })),
    });
  } catch (error) {
    console.error("Fetch packages error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch packages" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, tier, priceMonthly, priceQuarterly, description, features, isPopular, badge, ctaText, order } = body;

    if (!name || priceMonthly === undefined) {
      return NextResponse.json(
        { success: false, error: "Package name and monthly price are required." },
        { status: 400 }
      );
    }

    const newPackage = await prisma.packageItem.create({
      data: {
        name,
        tier: tier || "Growth",
        priceMonthly: Number(priceMonthly),
        priceQuarterly: Number(priceQuarterly) || Number(priceMonthly) * 3,
        description: description || "",
        features: typeof features === "string" ? features : JSON.stringify(features || []),
        isPopular: Boolean(isPopular),
        badge: badge || null,
        ctaText: ctaText || "Get Started",
        order: Number(order) || 0,
      },
    });

    return NextResponse.json({ success: true, data: newPackage });
  } catch (error) {
    console.error("Create package error:", error);
    return NextResponse.json({ success: false, error: "Failed to create package" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, name, tier, priceMonthly, priceQuarterly, description, features, isPopular, badge, ctaText, order } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Package ID is required" }, { status: 400 });
    }

    const updated = await prisma.packageItem.update({
      where: { id },
      data: {
        name,
        tier,
        priceMonthly: Number(priceMonthly),
        priceQuarterly: Number(priceQuarterly),
        description,
        features: typeof features === "string" ? features : JSON.stringify(features || []),
        isPopular: Boolean(isPopular),
        badge,
        ctaText,
        order: Number(order) || 0,
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Update package error:", error);
    return NextResponse.json({ success: false, error: "Failed to update package" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Package ID is required" }, { status: 400 });
    }

    await prisma.packageItem.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Package deleted successfully" });
  } catch (error) {
    console.error("Delete package error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete package" }, { status: 500 });
  }
}

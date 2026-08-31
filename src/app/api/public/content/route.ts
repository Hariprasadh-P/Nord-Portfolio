import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [settings, videos, packages, testimonials] = await Promise.all([
      prisma.agencySettings.findUnique({ where: { id: "default" } }),
      prisma.videoItem.findMany({ orderBy: { order: "asc" } }),
      prisma.packageItem.findMany({ orderBy: { order: "asc" } }),
      prisma.testimonialItem.findMany({ where: { isFeatured: true }, orderBy: { order: "asc" } }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        settings: settings || {
          agencyName: "NORD MEDIA HOUSE",
          logoUrl: "/uploads/logos/nord-media-house.jpg",
          motoLine: "ELEVATING VISUAL CULTURE THROUGH CINEMATIC DIRECTION & PERFORMANCE MEDIA",
          subHeadline:
            "We engineer high-impact commercials, viral creator campaigns, bespoke 3D brand experiences, and scalable acquisition engines for premier global brands.",
          aboutText:
            "Nord Media House is a premier creative production and digital growth studio specializing in cinematic visual storytelling.",
          contactEmail: "hello@nordmediahouse.com",
          contactPhone: "+1 (415) 890-3200",
          location: "Los Angeles • New York • London • Stockholm",
          accentColor: "#A82BA0",
          colorScheme: "nord-plum",
        },
        videos: videos || [],
        packages: packages.map((p) => ({
          ...p,
          features: JSON.parse(p.features || "[]"),
        })),
        testimonials: testimonials || [],
      },
    });
  } catch (error) {
    console.error("Public content fetch error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch public content" },
      { status: 500 }
    );
  }
}

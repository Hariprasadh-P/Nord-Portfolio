import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const settings = await prisma.agencySettings.findUnique({
      where: { id: "default" },
    });
    return NextResponse.json({ success: true, data: settings });
  } catch (error) {
    console.error("Fetch settings error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const {
      agencyName,
      logoUrl,
      motoLine,
      subHeadline,
      aboutText,
      contactEmail,
      contactPhone,
      location,
      instagramUrl,
      linkedinUrl,
      twitterUrl,
      youtubeUrl,
      accentColor,
    } = body;

    const updated = await prisma.agencySettings.upsert({
      where: { id: "default" },
      update: {
        agencyName: agencyName ?? undefined,
        logoUrl: logoUrl ?? undefined,
        motoLine: motoLine ?? undefined,
        subHeadline: subHeadline ?? undefined,
        aboutText: aboutText ?? undefined,
        contactEmail: contactEmail ?? undefined,
        contactPhone: contactPhone ?? undefined,
        location: location ?? undefined,
        instagramUrl: instagramUrl ?? undefined,
        linkedinUrl: linkedinUrl ?? undefined,
        twitterUrl: twitterUrl ?? undefined,
        youtubeUrl: youtubeUrl ?? undefined,
        accentColor: accentColor ?? undefined,
      },
      create: {
        id: "default",
        agencyName: agencyName || "HYPERION DIGITAL",
        logoUrl: logoUrl || "",
        motoLine: motoLine || "ENGINEERING EXPONENTIAL GROWTH FOR HIGH-VELOCITY DIGITAL BRANDS",
        subHeadline: subHeadline || "",
        aboutText: aboutText || "",
        contactEmail: contactEmail || "hello@hyperiondigital.agency",
        contactPhone: contactPhone || "+1 (415) 890-3200",
        location: location || "Silicon Valley • New York",
        instagramUrl,
        linkedinUrl,
        twitterUrl,
        youtubeUrl,
        accentColor: accentColor || "#00FFA3",
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Update settings error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update settings" },
      { status: 500 }
    );
  }
}

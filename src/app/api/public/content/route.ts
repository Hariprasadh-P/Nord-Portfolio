import { NextResponse } from "next/server";
import { initialPortfolioData } from "@/data/portfolioData";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const prismaModule = await import("@/lib/prisma");
    const prisma = prismaModule.default;

    if (prisma && prisma.agencySettings) {
      const [settings, videos, packages, testimonials, services, caseStudies] = await Promise.all([
        prisma.agencySettings.findUnique({ where: { id: "default" } }).catch(() => null),
        prisma.videoItem.findMany({ orderBy: { order: "asc" } }).catch(() => null),
        prisma.packageItem.findMany({ orderBy: { order: "asc" } }).catch(() => null),
        prisma.testimonialItem.findMany({ where: { isFeatured: true }, orderBy: { order: "asc" } }).catch(() => null),
        prisma.serviceItem.findMany({ where: { isFeatured: true }, orderBy: { order: "asc" } }).catch(() => null),
        prisma.caseStudy.findMany({ where: { isFeatured: true }, orderBy: { order: "asc" } }).catch(() => null),
      ]);

      return NextResponse.json(
        {
          success: true,
          data: {
            settings: settings
              ? {
                  ...initialPortfolioData.settings,
                  ...settings,
                }
              : initialPortfolioData.settings,
            videos:
              videos !== null
                ? videos
                : initialPortfolioData.videos,
            packages:
              packages !== null
                ? packages.map((p) => ({
                    ...p,
                    features:
                      typeof p.features === "string"
                        ? JSON.parse(p.features || "[]")
                        : p.features,
                  }))
                : initialPortfolioData.packages,
            testimonials:
              testimonials !== null
                ? testimonials
                : initialPortfolioData.testimonials,
            services:
              services !== null
                ? services.map((s) => ({
                    ...s,
                    deliverables:
                      typeof s.deliverables === "string"
                        ? JSON.parse(s.deliverables || "[]")
                        : s.deliverables,
                    metrics:
                      typeof s.metrics === "string"
                        ? JSON.parse(s.metrics || "[]")
                        : s.metrics,
                  }))
                : initialPortfolioData.services,
            caseStudies:
              caseStudies !== null
                ? caseStudies.map((c) => ({
                    ...c,
                    tags:
                      typeof c.tags === "string"
                        ? JSON.parse(c.tags || "[]")
                        : c.tags,
                  }))
                : initialPortfolioData.caseStudies,
          },
        },
        {
          headers: {
            "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
          },
        }
      );
    }
  } catch {
    // Fallback cleanly to static dataset
  }

  return NextResponse.json(
    {
      success: true,
      data: initialPortfolioData,
    },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
      },
    }
  );
}

import PortfolioClient from "@/components/portfolio/PortfolioClient";
import prisma from "@/lib/prisma";
import { initialPortfolioData, PortfolioData } from "@/data/portfolioData";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getPortfolioData(): Promise<PortfolioData> {
  try {
    const [settings, videos, packages, testimonials, services, caseStudies] = await Promise.all([
      prisma.agencySettings.findUnique({ where: { id: "default" } }).catch(() => null),
      prisma.videoItem.findMany({ orderBy: { order: "asc" } }).catch(() => null),
      prisma.packageItem.findMany({ orderBy: { order: "asc" } }).catch(() => null),
      prisma.testimonialItem.findMany({ where: { isFeatured: true }, orderBy: { order: "asc" } }).catch(() => null),
      prisma.serviceItem.findMany({ where: { isFeatured: true }, orderBy: { order: "asc" } }).catch(() => null),
      prisma.caseStudy.findMany({ where: { isFeatured: true }, orderBy: { order: "asc" } }).catch(() => null),
    ]);

    return {
      settings: settings
        ? {
            ...initialPortfolioData.settings,
            ...settings,
          }
        : initialPortfolioData.settings,
      videos:
        videos && videos.length > 0
          ? (videos as unknown as PortfolioData["videos"])
          : initialPortfolioData.videos,
      packages:
        packages && packages.length > 0
          ? packages.map((p) => ({
              ...p,
              features:
                typeof p.features === "string"
                  ? JSON.parse(p.features || "[]")
                  : (p.features as unknown as string[]),
            }))
          : initialPortfolioData.packages,
      testimonials:
        testimonials && testimonials.length > 0
          ? (testimonials as unknown as PortfolioData["testimonials"])
          : initialPortfolioData.testimonials,
      services:
        services && services.length > 0
          ? services.map((s) => ({
              ...s,
              deliverables:
                typeof s.deliverables === "string"
                  ? JSON.parse(s.deliverables || "[]")
                  : (s.deliverables as unknown as string[]),
              metrics:
                typeof s.metrics === "string"
                  ? JSON.parse(s.metrics || "[]")
                  : (s.metrics as unknown as { label: string; value: string }[]),
            }))
          : initialPortfolioData.services,
      caseStudies:
        caseStudies && caseStudies.length > 0
          ? caseStudies.map((c) => ({
              ...c,
              tags:
                typeof c.tags === "string"
                  ? JSON.parse(c.tags || "[]")
                  : (c.tags as unknown as string[]),
            }))
          : initialPortfolioData.caseStudies,
    };
  } catch (error) {
    console.error("Error fetching live portfolio data:", error);
    return initialPortfolioData;
  }
}

export default async function HomePage() {
  const data = await getPortfolioData();
  return <PortfolioClient data={data} />;
}

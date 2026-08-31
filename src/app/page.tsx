import prisma from "@/lib/prisma";
import PortfolioClient from "@/components/portfolio/PortfolioClient";

export const revalidate = 0; // Fresh dynamic data on every request

async function getPortfolioData() {
  try {
    const [settings, videos, packages, testimonials] = await Promise.all([
      prisma.agencySettings.findUnique({ where: { id: "default" } }),
      prisma.videoItem.findMany({ orderBy: { order: "asc" } }),
      prisma.packageItem.findMany({ orderBy: { order: "asc" } }),
      prisma.testimonialItem.findMany({ where: { isFeatured: true }, orderBy: { order: "asc" } }),
    ]);

    return {
      settings: settings || {
        agencyName: "NORD MEDIA HOUSE",
        logoUrl: "/uploads/logos/nord-media-house.jpg",
        motoLine: "ELEVATING VISUAL CULTURE THROUGH CINEMATIC DIRECTION & PERFORMANCE MEDIA",
        subHeadline:
          "We engineer high-impact commercials, viral creator campaigns, bespoke 3D brand experiences, and scalable acquisition engines for premier global brands.",
        aboutText:
          "Nord Media House is a premier creative production and digital growth studio specializing in cinematic visual storytelling and performance media.",
        contactEmail: "hello@nordmediahouse.com",
        contactPhone: "+1 (415) 890-3200",
        location: "Los Angeles • New York • London • Stockholm",
        instagramUrl: "https://instagram.com",
        linkedinUrl: "https://linkedin.com",
        twitterUrl: "https://x.com",
        youtubeUrl: "https://youtube.com",
        accentColor: "#A82BA0",
      },
      videos: videos || [],
      packages: packages.map((p) => ({
        ...p,
        features: JSON.parse(p.features || "[]"),
      })),
      testimonials: testimonials || [],
    };
  } catch (error) {
    console.error("Error fetching portfolio database records:", error);
    return {
      settings: {
        agencyName: "NORD MEDIA HOUSE",
        logoUrl: "/uploads/logos/nord-media-house.jpg",
        motoLine: "ELEVATING VISUAL CULTURE THROUGH CINEMATIC DIRECTION & PERFORMANCE MEDIA",
        subHeadline:
          "We engineer high-impact commercials, viral creator campaigns, and scalable acquisition engines.",
        aboutText: "Nord Media House is a premier creative production studio.",
        contactEmail: "hello@nordmediahouse.com",
        contactPhone: "+1 (415) 890-3200",
        location: "Los Angeles • New York • London",
        accentColor: "#A82BA0",
      },
      videos: [],
      packages: [],
      testimonials: [],
    };
  }
}

export default async function HomePage() {
  const data = await getPortfolioData();
  return <PortfolioClient data={data} />;
}

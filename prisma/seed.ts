import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Nord Media House with official Tariff and Contact details...");

  // 1. Agency Settings
  await prisma.agencySettings.upsert({
    where: { id: "default" },
    update: {
      agencyName: "NORD MEDIA HOUSE",
      logoUrl: "/uploads/logos/nord-media-house.jpg",
      motoLine: "FIND YOUR BEARING — THREE ROUTES TO GROW YOUR BRAND'S PRESENCE",
      subHeadline:
        "Digital Marketing · Creative · Growth. We act as your brand's true compass, charting the highest-impact visual and paid media trajectory.",
      aboutText:
        "Nord Media House is a premier creative production and digital growth studio specializing in cinematic visual storytelling and performance media.",
      contactEmail: "nordmediahouse@gmail.com",
      contactPhone: "+91 93635 42725",
      location: "Mumbai • Bengaluru • London • Los Angeles",
      accentColor: "#8B5CF6",
      colorScheme: "violet-fade-white",
    },
    create: {
      id: "default",
      agencyName: "NORD MEDIA HOUSE",
      logoUrl: "/uploads/logos/nord-media-house.jpg",
      motoLine: "FIND YOUR BEARING — THREE ROUTES TO GROW YOUR BRAND'S PRESENCE",
      subHeadline:
        "Digital Marketing · Creative · Growth. We act as your brand's true compass, charting the highest-impact visual and paid media trajectory.",
      aboutText:
        "Nord Media House is a premier creative production and digital growth studio specializing in cinematic visual storytelling and performance media.",
      contactEmail: "nordmediahouse@gmail.com",
      contactPhone: "+91 93635 42725",
      location: "Mumbai • Bengaluru • London • Los Angeles",
      instagramUrl: "https://instagram.com",
      linkedinUrl: "https://linkedin.com",
      twitterUrl: "https://x.com",
      youtubeUrl: "https://youtube.com",
      accentColor: "#8B5CF6",
      colorScheme: "violet-fade-white",
    },
  });

  // 2. Packages with exact official Tariff
  await prisma.packageItem.deleteMany();
  await prisma.packageItem.createMany({
    data: [
      {
        name: "Basic",
        tier: "000° NORTH",
        priceMonthly: 20000,
        priceQuarterly: 54000,
        description: "For getting started",
        features: JSON.stringify([
          "Posts: 8",
          "Reels: 12",
          "Caption Writing: Included"
        ]),
        isPopular: false,
        badge: "000° NORTH",
        ctaText: "Select Basic Route",
        order: 1,
      },
      {
        name: "Growth",
        tier: "090° EAST",
        priceMonthly: 28000,
        priceQuarterly: 75600,
        description: "For scaling up",
        features: JSON.stringify([
          "Posts: 10",
          "Reels: 16",
          "Meta Ads Management: Included",
          "Add-ons available: Menu Card Designing, Logo Designing"
        ]),
        isPopular: true,
        badge: "MOST POPULAR",
        ctaText: "Select Growth Route",
        order: 2,
      },
      {
        name: "Premium",
        tier: "180° SOUTH",
        priceMonthly: 36000,
        priceQuarterly: 97200,
        description: "For full-service growth",
        features: JSON.stringify([
          "Posts: 12",
          "Reels: 20",
          "Social Media Handling: Included",
          "Meta Ads Management: Included",
          "Add-ons available: Menu Card Designing, Logo Designing"
        ]),
        isPopular: false,
        badge: "180° SOUTH",
        ctaText: "Select Premium Route",
        order: 3,
      },
    ],
  });

  console.log("✅ Seed completed with official Nord Tariff!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

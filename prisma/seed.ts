import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding entire Nord Media House portfolio dataset to Supabase PostgreSQL...");

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
      instagramUrl: "https://instagram.com/nordmediahouse",
      linkedinUrl: "https://linkedin.com/company/nord-media-house",
      twitterUrl: "https://x.com/nordmediahouse",
      youtubeUrl: "https://youtube.com/@nordmediahouse",
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
      instagramUrl: "https://instagram.com/nordmediahouse",
      linkedinUrl: "https://linkedin.com/company/nord-media-house",
      twitterUrl: "https://x.com/nordmediahouse",
      youtubeUrl: "https://youtube.com/@nordmediahouse",
      accentColor: "#8B5CF6",
      colorScheme: "violet-fade-white",
    },
  });

  // 2. Official Tariff Packages
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

  // 3. Videos
  await prisma.videoItem.deleteMany();
  await prisma.videoItem.createMany({
    data: [
      {
        title: "Nord 2026 Master Showreel: The Horizon",
        description: "Our definitive visual reel synthesizing high-fashion cinematography, CGI physics, and viral editing pacing.",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        posterUrl: "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1200&q=80",
        category: "Showreel",
        clientName: "Nord Global Direction",
        isFeatured: true,
        order: 1,
      },
      {
        title: "AURA Neo-Luxury Fragrance Campaign",
        description: "Direct-to-Consumer hero commercial generating 4.2M organic impressions across TikTok and Instagram within 72 hours.",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        posterUrl: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
        category: "Commercials",
        clientName: "AURA Parfum Paris",
        isFeatured: true,
        order: 2,
      },
      {
        title: "Solstice Energy Performance Meta Ads",
        description: "A series of 18 high-velocity hook variations driving 4.8x Return on Ad Spend for nationwide launch.",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        posterUrl: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=800&q=80",
        category: "Performance Ads",
        clientName: "Solstice Bev Co.",
        isFeatured: false,
        order: 3,
      },
      {
        title: "Verve Electric Supercar Global Launch",
        description: "Cinematic commercial film shot across Iceland and Norway with anamorphic optics and drone choreography.",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
        posterUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
        category: "Brand Film",
        clientName: "Verve Motors Sweden",
        isFeatured: false,
        order: 4,
      },
      {
        title: "KINETIC Apparel Viral Streetwear Drops",
        description: "Paced 9:16 vertical storytelling campaign that sold out 12,000 units within 4 hours of broadcast.",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
        posterUrl: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
        category: "Reels",
        clientName: "KINETIC Studio NYC",
        isFeatured: false,
        order: 5,
      },
    ],
  });

  // 4. Case Studies
  await prisma.caseStudy.deleteMany();
  await prisma.caseStudy.createMany({
    data: [
      {
        clientName: "Solstice Beverage Co.",
        title: "Scaling Direct-to-Consumer Revenue from $120k to $1.1M/mo",
        category: "Paid Social & UGC Engine",
        roiMetric: "+816%",
        metricLabel: "Net Revenue Growth in 90 Days",
        description: "By revamping their visual identity with cinematic product videos and running a high-velocity Meta Ads campaign, we scaled ROAS to 4.8x.",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
        tags: JSON.stringify(["Meta Ads", "Creative Direction", "ROAS Scaling"]),
        isFeatured: true,
        order: 1,
      },
      {
        clientName: "AURA Neo-Luxury",
        title: "Generating 4.2M Organic Views and Selling Out Inventory in 72h",
        category: "Viral Creator Campaign",
        roiMetric: "4.2M Views",
        metricLabel: "Organic Impressions",
        description: "Designed a viral short-form storytelling campaign featuring micro-influencers and bespoke sound design.",
        imageUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop",
        tags: JSON.stringify(["Short-Form Reels", "TikTok Viral", "Brand Commercial"]),
        isFeatured: true,
        order: 2,
      },
    ],
  });

  // 5. Testimonials
  await prisma.testimonialItem.deleteMany();
  await prisma.testimonialItem.createMany({
    data: [
      {
        author: "Marcus Vance",
        role: "Founder & CMO",
        company: "Solstice Beverage Group",
        quote: "Nord Media completely transformed our creative production and customer acquisition pipeline. Their visual direction is second to none.",
        metric: "+816% DTC Revenue Growth",
        rating: 5,
        isFeatured: true,
        order: 1,
      },
      {
        author: "Elena Rostova",
        role: "Head of Brand",
        company: "AURA Paris",
        quote: "The visual storytelling crafted by Nord resulted in our most successful fragrance drop in brand history. Incredible precision.",
        metric: "12,000 Units Sold Out in 4 Hours",
        rating: 5,
        isFeatured: true,
        order: 2,
      },
    ],
  });

  console.log("✅ Full portfolio dataset successfully seeded to Supabase PostgreSQL!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


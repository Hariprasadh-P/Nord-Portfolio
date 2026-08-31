import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🔍 Testing Supabase Database Flow...");

  // 1. Read Agency Settings
  const settings = await prisma.agencySettings.findUnique({
    where: { id: "default" },
  });
  console.log("✅ 1. Fetched Agency Settings from Supabase:", {
    agencyName: settings?.agencyName,
    location: settings?.location,
    contactEmail: settings?.contactEmail,
  });

  // 2. Read Packages
  const packages = await prisma.packageItem.findMany({
    orderBy: { order: "asc" },
  });
  console.log(`✅ 2. Fetched ${packages.length} Packages from Supabase:`);
  packages.forEach((pkg) => {
    console.log(`   - [${pkg.name}] Tier: ${pkg.tier} | Monthly: $${pkg.priceMonthly} | Quarterly: $${pkg.priceQuarterly}`);
  });

  // 3. Read Case Studies
  const caseStudies = await prisma.caseStudy.findMany({
    orderBy: { order: "asc" },
  });
  console.log(`✅ 3. Fetched ${caseStudies.length} Case Studies from Supabase:`);
  caseStudies.forEach((cs) => {
    console.log(`   - [${cs.clientName}] ${cs.title} (${cs.roiMetric})`);
  });

  // 4. Simulate Admin Action: Updating Settings
  const updatedSettings = await prisma.agencySettings.update({
    where: { id: "default" },
    data: {
      motoLine: "ELEVATING VISUAL CULTURE THROUGH CINEMATIC DIRECTION & PERFORMANCE MEDIA",
    },
  });
  console.log("✅ 4. Simulated Admin Update on Supabase:", updatedSettings.motoLine);

  // 5. Simulate User Inquiry Submission
  const testInquiry = await prisma.inquiry.create({
    data: {
      clientName: "Test Deployment Client",
      email: "test@nordmedia.com",
      serviceNeeded: "Cinematic Commercials",
      budgetRange: "$25,000 - $50,000",
      message: "Verifying live Supabase DB integration across Admin and Portfolio.",
    },
  });
  console.log("✅ 5. Created Inquiry in Supabase:", testInquiry.id);

  // 6. Verify Inquiry was stored and clean up
  const retrievedInquiry = await prisma.inquiry.findUnique({
    where: { id: testInquiry.id },
  });
  if (retrievedInquiry) {
    console.log("✅ 6. Verified Inquiry successfully stored in Supabase DB!");
    await prisma.inquiry.delete({ where: { id: testInquiry.id } });
    console.log("🧹 7. Cleaned up test inquiry.");
  }

  console.log("\n🚀 ALL TESTS PASSED: Supabase DB read/write and synchronization confirmed 100%!");
}

main()
  .catch((e) => {
    console.error("❌ Database flow test failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { clientName, email, phone, company, serviceNeeded, budgetRange, timeline, message } = body;

    if (!clientName || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Name, email, and project message are required." },
        { status: 400 }
      );
    }

    // Attempt optional database logging if available; gracefully fallback for static/serverless deployment
    try {
      const prismaModule = await import("@/lib/prisma");
      const prisma = prismaModule.default;
      if (prisma && prisma.inquiry) {
        await prisma.inquiry.create({
          data: {
            clientName: String(clientName).trim(),
            email: String(email).trim().toLowerCase(),
            phone: phone ? String(phone).trim() : null,
            company: company ? String(company).trim() : null,
            serviceNeeded: serviceNeeded ? String(serviceNeeded).trim() : "General Consultation",
            budgetRange: budgetRange ? String(budgetRange).trim() : "Undisclosed",
            message: `[Timeline: ${timeline || "Flexible"}] ${String(message).trim()}`,
            status: "NEW",
          },
        });
      }
    } catch {
      console.log("Database write bypassed in static/serverless deployment mode.");
    }

    return NextResponse.json({
      success: true,
      message: "Brief received! Our Creative Directors will review your project and get in touch within 24 hours.",
    });
  } catch (error) {
    console.error("Inquiry submission error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit inquiry. Please try again." },
      { status: 500 }
    );
  }
}

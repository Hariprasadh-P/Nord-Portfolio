import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { clientName, email, phone, company, serviceNeeded, budgetRange, message } = body;

    if (!clientName || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const inquiry = await prisma.inquiry.create({
      data: {
        clientName: String(clientName).trim(),
        email: String(email).trim().toLowerCase(),
        phone: phone ? String(phone).trim() : null,
        company: company ? String(company).trim() : null,
        serviceNeeded: serviceNeeded ? String(serviceNeeded).trim() : "General Consultation",
        budgetRange: budgetRange ? String(budgetRange).trim() : "Undisclosed",
        message: String(message).trim(),
        status: "NEW",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Inquiry submitted successfully! Our growth directors will contact you within 24 hours.",
      inquiryId: inquiry.id,
    });
  } catch (error) {
    console.error("Inquiry submission error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit inquiry. Please try again." },
      { status: 500 }
    );
  }
}

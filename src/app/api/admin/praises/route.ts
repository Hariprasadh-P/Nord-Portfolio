import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const testimonials = await prisma.testimonialItem.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json({ success: true, data: testimonials });
  } catch (error) {
    console.error("Fetch testimonials error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch testimonials" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { author, role, company, quote, avatarUrl, metric, rating, isFeatured, order } = body;

    if (!author || !quote) {
      return NextResponse.json(
        { success: false, error: "Author name and praise quote are required." },
        { status: 400 }
      );
    }

    const newTestimonial = await prisma.testimonialItem.create({
      data: {
        author,
        role: role || "",
        company: company || "",
        quote,
        avatarUrl: avatarUrl || "",
        metric: metric || null,
        rating: Number(rating) || 5,
        isFeatured: isFeatured !== undefined ? Boolean(isFeatured) : true,
        order: Number(order) || 0,
      },
    });

    return NextResponse.json({ success: true, data: newTestimonial });
  } catch (error) {
    console.error("Create testimonial error:", error);
    return NextResponse.json({ success: false, error: "Failed to create testimonial" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, author, role, company, quote, avatarUrl, metric, rating, isFeatured, order } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Testimonial ID is required" }, { status: 400 });
    }

    const updated = await prisma.testimonialItem.update({
      where: { id },
      data: {
        author,
        role,
        company,
        quote,
        avatarUrl,
        metric,
        rating: Number(rating) || 5,
        isFeatured: Boolean(isFeatured),
        order: Number(order) || 0,
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Update testimonial error:", error);
    return NextResponse.json({ success: false, error: "Failed to update testimonial" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Testimonial ID is required" }, { status: 400 });
    }

    await prisma.testimonialItem.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Testimonial deleted successfully" });
  } catch (error) {
    console.error("Delete testimonial error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete testimonial" }, { status: 500 });
  }
}

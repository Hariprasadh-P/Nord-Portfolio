import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { passcode } = await req.json();
    const serverPasscode = process.env.ADMIN_PASSCODE || "admin1234";

    if (passcode === serverPasscode) {
      // In a full production setup, you can set an encrypted HTTP-only cookie or JWT.
      // Here we provide a verified session token response.
      return NextResponse.json({
        success: true,
        token: "admin_session_" + Buffer.from(Date.now().toString()).toString("base64"),
      });
    }

    return NextResponse.json(
      { success: false, error: "Invalid admin passcode" },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Authentication error" },
      { status: 500 }
    );
  }
}

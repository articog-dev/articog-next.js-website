import { NextResponse } from "next/server";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let data: { email?: string; interests?: string[]; unsubscribeAll?: boolean };

  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request body." }, { status: 400 });
  }

  const email = data.email?.trim() || "";
  if (!isValidEmail(email)) {
    return NextResponse.json(
      { success: false, error: "Please provide a valid email address." },
      { status: 400 }
    );
  }

  return NextResponse.json(
    {
      success: false,
      error: "Email preference changes are not configured yet. Please email info@articog.com so the team can process this request.",
    },
    { status: 503 }
  );
}

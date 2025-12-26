import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getAllowedCodes(): string[] {
  const raw = process.env.KATOKI_RADIO_ACCESS_CODES || "";
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const code = typeof body.code === "string" ? body.code.trim() : "";

    const allowed = getAllowedCodes();

    if (!code || allowed.length === 0) {
      return NextResponse.json(
        { ok: false, message: "Access code system not configured." },
        { status: 400 }
      );
    }

    const isValid = allowed.includes(code);

    if (!isValid) {
      return NextResponse.json(
        { ok: false, message: "Invalid access code." },
        { status: 401 }
      );
    }

    const res = NextResponse.json({ ok: true });

    // 7 days cookie
    res.cookies.set("katoki_radio_access", "ok", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch {
    return NextResponse.json(
      { ok: false, message: "Server error." },
      { status: 500 }
    );
  }
}

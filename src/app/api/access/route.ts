import { NextResponse } from "next/server";

export const runtime = "nodejs";

const COOKIE_NAME = "katoki_radio_access";

function normalize(s: string) {
  return (s || "").trim();
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const input = normalize(body?.code);

    // Option A (simple): one master code in env
    const master = normalize(process.env.RADIO_ACCESS_CODE || "");

    // Option B (still simple): a small list in env (comma-separated)
    const listRaw = process.env.RADIO_ACCESS_CODES || "";
    const list = listRaw
      .split(",")
      .map((x) => normalize(x))
      .filter(Boolean);

    const ok =
      (master && input === master) || (list.length > 0 && list.includes(input));

    if (!ok) {
      return NextResponse.json(
        { ok: false, error: "Invalid access code." },
        { status: 401 }
      );
    }

    const res = NextResponse.json({ ok: true });

    // Cookie valid for 30 days
    res.cookies.set({
      name: COOKIE_NAME,
      value: "1",
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    return res;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Server error." },
      { status: 500 }
    );
  }
}

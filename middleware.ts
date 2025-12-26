import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow Next internals + static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/robots.txt") ||
    pathname.startsWith("/sitemap.xml") ||
    pathname.startsWith("/icons") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/public")
  ) {
    return NextResponse.next();
  }

  // Allow access + API route needed to validate
  if (pathname === "/access" || pathname.startsWith("/api/access")) {
    return NextResponse.next();
  }

  // Already authorised?
  const hasAccess = req.cookies.get("katoki_radio_access")?.value === "ok";
  if (hasAccess) return NextResponse.next();

  // Otherwise redirect to /access
  const url = req.nextUrl.clone();
  url.pathname = "/access";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};

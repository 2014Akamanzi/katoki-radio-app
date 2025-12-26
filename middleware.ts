import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "katoki_radio_access";

// Only allow public paths without a code:
function isPublicPath(pathname: string) {
  if (pathname === "/access") return true;
  if (pathname.startsWith("/api/access")) return true;

  // Next internals + static assets
  if (pathname.startsWith("/_next")) return true;
  if (pathname === "/favicon.ico") return true;

  // allow public assets from /public (images, etc.)
  if (pathname.startsWith("/")) {
    const isAsset =
      pathname.match(/\.(png|jpg|jpeg|webp|svg|ico|css|js|map)$/i) !== null;
    if (isAsset) return true;
  }

  return false;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (isPublicPath(pathname)) return NextResponse.next();

  const hasAccess = req.cookies.get(COOKIE_NAME)?.value === "1";
  if (hasAccess) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = "/access";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};

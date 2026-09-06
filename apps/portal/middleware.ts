import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySessionToken, AUTH_COOKIE_NAME } from "@script2scale/auth";

export function middleware(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const session = token ? verifySessionToken(token) : null;
  const path = request.nextUrl.pathname;

  // Protected Portal Routes
  const isProtectedRoute = path.startsWith("/dashboard") || path.startsWith("/projects");

  if (isProtectedRoute && !session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", path);
    return NextResponse.redirect(loginUrl);
  }

  // If already logged in, prevent visiting /login
  if (path === "/login" && session) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/projects/:path*", "/login"]
};

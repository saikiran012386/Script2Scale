import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySessionToken, AUTH_COOKIE_NAME } from "@script2scale/auth";

export function middleware(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const session = token ? verifySessionToken(token) : null;
  const path = request.nextUrl.pathname;

  // Protected Admin Routes (Requires OWNER role)
  const isProtectedRoute =
    path.startsWith("/dashboard") ||
    path.startsWith("/clients") ||
    path.startsWith("/projects") ||
    path.startsWith("/inquiries") ||
    path.startsWith("/cms");

  if (isProtectedRoute) {
    if (!session || session.role !== "OWNER") {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("from", path);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If logged in as OWNER, redirect away from /login
  if (path === "/login" && session?.role === "OWNER") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/clients/:path*", "/projects/:path*", "/inquiries/:path*", "/cms/:path*", "/login"]
};

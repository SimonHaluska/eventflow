import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["sk", "en"];
const defaultLocale = "sk";

function getLocale(request: NextRequest): string {
  const acceptLang = request.headers.get("accept-language") ?? "";
  const preferred = acceptLang
    .split(",")
    .map((part) => part.split(";")[0].trim().substring(0, 2).toLowerCase());

  for (const lang of preferred) {
    if (locales.includes(lang)) return lang;
  }
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip internal Next.js paths, static files, API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") // static files
  ) {
    return NextResponse.next();
  }

  // Check if the path already has a supported locale
  const pathnameHasLocale = locales.some(
    (locale) =>
      pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (pathnameHasLocale) {
    // Set x-locale header so root layout can read it
    const locale = pathname.split("/")[1];
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-locale", locale);
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // Redirect bare paths to locale-prefixed paths
  const locale = getLocale(request);
  const newPath = `/${locale}${pathname === "/" ? "" : pathname}`;
  const url = request.nextUrl.clone();
  url.pathname = newPath;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|logo.png|.*\\..*).*)"],
};

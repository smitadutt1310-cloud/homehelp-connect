import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (process.env.NEXT_PUBLIC_DEMO_AUTOFILL !== "true") {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname !== "/") {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/worker";
  url.searchParams.set("demo", "1");
  url.searchParams.set("autorun", "1");

  return NextResponse.redirect(url);
}

export const config = {
  matcher: "/",
};

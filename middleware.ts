import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const admin = cookies().get("admin");

    if (!admin) {
      return NextResponse.rewrite(new URL("/login", request.url));
    }
  }
}

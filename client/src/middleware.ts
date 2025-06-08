import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 拦截以 /admin 开头的路径
  if (
    pathname.startsWith("/admin") &&
    pathname !== "/admin/login" &&
    pathname !== "/admin/statistics"
  ) {
    const collapsed = request.cookies.get("collapsed")?.value;
    if (!collapsed) {
      let cookie = await cookies();
      cookie.set("x-collapsed", "false");
    }
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-collapsed", collapsed || "false");
    requestHeaders.set("x-pathname", pathname);
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  return NextResponse.next();
}

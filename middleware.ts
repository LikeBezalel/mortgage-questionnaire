import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    return new NextResponse("Admin credentials are not configured.", {
      status: 500,
    });
  }

  const authHeader = req.headers.get("authorization");

  if (authHeader) {
    const [scheme, encoded] = authHeader.split(" ");

    if (scheme === "Basic" && encoded) {
      const decoded = Buffer.from(encoded, "base64").toString("utf8");
      const [user, pass] = decoded.split(":");

      if (user === username && pass === password) {
        return NextResponse.next();
      }
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Secure Area"',
    },
  });
}

export const config = {
  matcher: ["/admin/:path*"],
};
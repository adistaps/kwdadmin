import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { updateSession } from "./lib/supabase/middleware";
import { NextRequest } from "next/server";

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  // /admin lives outside the [locale] segment — not translated,
  // internal-only tool. Just guard it with Supabase auth.
  if (request.nextUrl.pathname.startsWith("/admin")) {
    return updateSession(request);
  }

  // Everything else (the public site) goes through next-intl locale routing.
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!_next|_vercel|.*\\..*).*)"],
};

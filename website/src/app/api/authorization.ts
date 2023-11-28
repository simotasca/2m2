import { NextRequest } from "next/server";

export function isAuthorized(req: NextRequest) {
  return (
    req.nextUrl.searchParams.get("API_ROUTE_SECRET") ===
    process.env.API_ROUTE_SECRET
  );
}

import { checkEnvVariable } from "@/lib/shared/env";
import { NextRequest } from "next/server";

checkEnvVariable("API_ROUTE_SECRET");

export function isAuthorized(req: NextRequest) {
  return req.nextUrl.searchParams.get("API_ROUTE_SECRET") === process.env.API_ROUTE_SECRET;
}

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const requestUrl = request.nextUrl;
  // URL to redirect to after sign in process completes
  return new NextResponse(JSON.stringify(Array.from(requestUrl.searchParams.entries())));
}

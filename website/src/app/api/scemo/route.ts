import { createServerSideClient } from "@/lib/server/supabase";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = createServerSideClient({ cookies });
  const { data, error } = await supabase.auth.signInWithPassword({
    email: "simo.tasca@gmail.com",
    password: "passwd",
  });
  console.log("DEMO ROUTE", data, error);
  return new NextResponse("ECCO CHE FUNCZA");
}

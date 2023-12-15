import { Database } from "@/database.types";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const supabase = createRouteHandlerClient<Database>({ cookies });
  const customer = (await supabase.auth.getUser()).data.user;

  try {
    if (!!customer) {
      supabase.from("cart").delete().eq("customer_id", customer.id);
    } else {
      cookies().delete("cart");
    }
  } catch (e: any) {
    console.log("ERROR: could not delete cart products", e.message);
    return new Response(e.message, { status: 500 });
  }

  console.log("DELEtEDDDD");

  return new Response("ok", { status: 200 });
}

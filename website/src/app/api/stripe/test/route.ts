import { NextRequest, NextResponse } from "next/server";
import { stripeInstance } from "../init-stripe";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { handleSupaError } from "@/lib/shared/error";
import { Database } from "@/database.types";

export async function GET(req: NextRequest) {
  const stripe = stripeInstance();
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const { data } = await supabase.auth.getUser();
  // handleSupaError(error, "Error in demo route");

  if (!data?.user) {
    return new Response("not logged in!");
  }

  const { data: customer } = await supabase
    .from("customers")
    .select("stripe_customer")
    .eq("id", data.user.id)
    .single();

  if (!customer?.stripe_customer) return new Response("strange");

  const stripeCustomer = await stripe.customers.retrieve(
    customer.stripe_customer
  );

  return new NextResponse(JSON.stringify(stripeCustomer), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

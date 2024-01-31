import { Database } from "@/database.types";
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { isAuthorized } from "../../authorization";
import { stripeInstance } from "../init-stripe";

export async function POST(req: NextRequest) {
  // WARN: this is a service role supabase client!!!
  if (!isAuthorized(req)) {
    return new NextResponse("Not authorized!", { status: 401 });
  }

  const { record } = await req.json();

  // TODO: if customer already exists (either on supabase or in stripe) stop the creation;

  const stripe = stripeInstance();

  const customer = await stripe.customers.create({
    email: record.email,
    name: record.email,
  });

  // WARN: this is a service role supabase client!!!
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? ""
  );

  const { error } = await supabase
    .from("customers")
    .update({
      stripe_customer: customer.id,
    })
    .eq("id", record.id);

  if (error) {
    // TODO: manage error
    console.log("Error", error);
  }

  return new NextResponse(`Created new customer ${customer.id}`, {
    status: 200,
  });
}

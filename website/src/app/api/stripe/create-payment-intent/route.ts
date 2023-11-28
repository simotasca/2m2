import { NextRequest } from "next/server";
import { stripeInstance } from "../init-stripe";

export async function POST(req: NextRequest) {
  const stripe = stripeInstance();
  const paymentIntent = await stripe.paymentIntents.create({
    currency: "eur",
    amount: 3000,
    automatic_payment_methods: { enabled: true },
  });
  console.log("CIAAASO", paymentIntent);
  return new Response(paymentIntent.client_secret);
}

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripeInstance } from "../init-stripe";
import PaymentManager from "./PaymentManager";

const endpointSecret = "whsec_2151H2weXnxbxL61soAAJN3uKTXNtGiO";

export async function POST(req: NextRequest) {
  const stripe = stripeInstance();

  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return new NextResponse(`Webhook Error: no signature provided`, {
      status: 400,
    });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      await req.text(),
      signature,
      endpointSecret
    );
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, {
      status: 400,
    });
  }

  // solo chiamate asincrone senza await per mandare subito conferma a stripe
  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object;
      handlePaymentIntentSucceeded(paymentIntent);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return new NextResponse(JSON.stringify({ received: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function handlePaymentIntentSucceeded(paymentIntent: any) {
  console.log(`PAYMENT RECEIVED ${paymentIntent.id}: ${paymentIntent.amount}€`);
  console.log("ocho:", paymentIntent);
  PaymentManager.add(paymentIntent);
}

import { NextRequest } from "next/server";
import { stripeInstance } from "../init-stripe";
import type Stripe from "stripe";

export async function POST(req: NextRequest) {
  const stripe = stripeInstance();

  const body = await req.json();
  const amount = Number(body.amount);
  const metadata = body.metadata || {};

  if (!amount) {
    return new Response("missing valid payment intent amount", {
      status: 400,
    });
  }

  if (!checkMetadata(metadata)) {
    return new Response("invalid payment metadata", {
      status: 400,
    });
  }

  let paymentIntent: Stripe.Response<Stripe.PaymentIntent>;
  try {
    paymentIntent = await stripe.paymentIntents.create({
      currency: "eur",
      amount,
      automatic_payment_methods: { enabled: true },
      metadata,
    });
  } catch (e: any) {
    return new Response("Error creating payment intent", { status: 500 });
  }

  return new Response(
    JSON.stringify({
      secret: paymentIntent.client_secret,
      amount,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

function checkMetadata(meta: any) {
  const prodIds = meta.products
    ?.split(";")
    ?.map((id) => Number(id))
    ?.filter((id) => !Number.isNaN(id));

  return !!prodIds?.length && !!meta.email;
}

/**
 * meta: {
    number: '8',
    surname: 's',
    province: 'i',
    street: '8',
    country: 'i',
    products: '11',
    zip: '8',
    email: 'simo.tasca@gmail.com',
    city: 'i',
    name: 's'
  }
  */

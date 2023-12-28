import { NextRequest } from "next/server";
import { stripeInstance } from "../init-stripe";
import type Stripe from "stripe";

export async function POST(req: NextRequest) {
  const stripe = stripeInstance();

  const body = await req.json();
  const amount = Number(body.amount);
  const metadata = body.metadata || {};

  if (!amount) {
    return errorResponse(400, "missing valid payment intent amount");
  }

  if (!checkMetadata(metadata)) {
    return errorResponse(400, "invalid payment metadata");
  }

  let paymentIntent: Stripe.Response<Stripe.PaymentIntent>;
  try {
    paymentIntent = await stripe.paymentIntents.create({
      currency: "eur",
      amount: amount * 100,
      automatic_payment_methods: { enabled: true },
      metadata,
    });
  } catch (e: any) {
    return errorResponse(500, "Error creating payment intent", e);
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
    ?.map((id: string) => Number(id))
    ?.filter((id: number) => !Number.isNaN(id));

  const commonFieldsValid =
    !!meta.name &&
    !!meta.email &&
    !!meta.cf &&
    !!meta.street &&
    !!meta.number &&
    !!meta.city &&
    !!meta.zip &&
    !!meta.countryCode &&
    !!meta.provinceCode &&
    !!meta.istat;

  let businessPrivateValid = false;
  if (meta.type === "business") {
    businessPrivateValid = !!meta.piva;
  } else {
    businessPrivateValid = !!meta.surname;
  }

  return !!prodIds?.length && commonFieldsValid && businessPrivateValid;
}

function errorResponse(code: number, msg: string, e?: any) {
  e && console.error(e.message);
  return new Response(msg, {
    status: code,
    statusText: msg,
  });
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

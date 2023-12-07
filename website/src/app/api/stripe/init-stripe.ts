import Stripe from "stripe";

export function stripeInstance() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Env variable STRIPE_SECRET_KEY is required");
  }

  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-08-16",
  });
}

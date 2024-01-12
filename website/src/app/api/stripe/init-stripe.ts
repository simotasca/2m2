import { checkEnvVariable } from "@/lib/shared/env";
import Stripe from "stripe";

export function stripeInstance() {
  checkEnvVariable("STRIPE_SECRET_KEY");

  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2023-08-16",
  });
}

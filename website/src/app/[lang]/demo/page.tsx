"use client";

import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY ?? "");

export default function DemoPage() {
  const [clientSecret, setClientSecret] = useState<string>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // fetch("/api/stripe/create-payment-intent", {
    //   method: "POST",
    // })
    //   .then((res) => res.text())
    //   .then((data) => {
    //     console.log("data:", data);
    //     setClientSecret(data);
    //   });
    setClientSecret(
      "pi_3OD9GTJoX5bBhFKS0mC0bftN_secret_74pdKUZlxTDIBS4SHm6EyLD5s"
    );
  }, []);

  if (!clientSecret || !stripePromise) return <div>not worksh</div>;

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm clientSecret={clientSecret} />
    </Elements>
  );
}

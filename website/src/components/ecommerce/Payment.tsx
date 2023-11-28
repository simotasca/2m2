"use client";

import { stripePromise } from "@/lib/stripe";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { FormEventHandler } from "react";

// const secret = await fetch("/api/create-payment-intent", {
//   method: "POST",
//   body: JSON.stringify({ amount: 1000 }),
// }).then((res) => res.text());

export default function Payment({ clientSecret }: { clientSecret?: string }) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: "https://example.com/order/123/complete" },
    });

    if (result.error) {
      console.log(result.error.message);
    }
  };

  if (!clientSecret) return <div>payment form loading</div>;
  
  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <button>Submit</button>
      </form>
    </Elements>
  );
}

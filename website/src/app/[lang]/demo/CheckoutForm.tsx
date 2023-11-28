import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";

export default function CheckoutForm({ clientSecret }) {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/`,
      },
    });

    if (error) {
      // handle
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white max-w-sm mx-auto mt-10 rounded p-3">
      <p className="mb-4">
        <b>SCEGLI LA TUA CARTAH</b>
      </p>
      <PaymentElement />
      <button className="bg-indigo-600 text-white rounded px-3 py-1 font-semibold mt-4">
        PAGA
      </button>
    </form>
  );
}

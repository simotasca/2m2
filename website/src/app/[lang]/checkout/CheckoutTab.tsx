import iconPayment from "@/images/icons/payment.svg";
import { stripePromise } from "@/lib/stripe";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import type {
  Appearance,
  CssFontSource,
  CustomFontSource,
} from "@stripe/stripe-js";
import Image from "next/image";
import {
  Dispatch,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import WizTabHandle from "./WizTabHandle";

export interface CheckoutParams {
  clientSecret?: string;
  setClientSecret: Dispatch<string>;
  email?: string;
}

export const CheckoutTab = forwardRef<WizTabHandle, CheckoutParams>(
  ({ clientSecret, setClientSecret, email }, ref) => {
    const [showErrors, setShowErrors] = useState(false);
    const tabRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(
      ref,
      () => {
        return {
          validate: () => {
            setShowErrors(true);
            return true;
          },
          focus: () => tabRef.current?.querySelector("input")?.focus(),
        };
      },
      []
    );

    return (
      <div ref={tabRef} className="mb-2.5">
        <div className="flex items-start gap-2 mb-2">
          <Image className="w-5 -translate-y-px" src={iconPayment} alt="" />
          <h4 className="text-xl leading-[0.9] font-bold uppercase">
            Checkout
          </h4>
        </div>
        <ElementsWrapper
          clientSecret={clientSecret}
          setClientSecret={setClientSecret}
          email={email}
        />
      </div>
    );
  }
);

function ElementsWrapper({
  clientSecret,
  setClientSecret,
  email,
}: CheckoutParams) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!setClientSecret) return;
    if (clientSecret != undefined) return;

    setLoading(true);
    console.log("CIAO");

    fetch("/api/stripe/create-payment-intent", {
      method: "POST",
    })
      .then((res) => res.text())
      .then((data) => {
        console.log("CLIENT SECRET:", data);
        setClientSecret(data);
      });
  }, [setClientSecret]);

  if (!clientSecret || !stripePromise) return <div>not worksh</div>;

  const appearance: Appearance = {
    disableAnimations: true,
    theme: "stripe",
    labels: "above",
    variables: {
      fontFamily: "Poppins",
      fontSizeBase: "14px",
      spacingUnit: "2px",
      borderRadius: "2px",
    },
  };

  const fonts: (CssFontSource | CustomFontSource)[] = [
    { cssSrc: "https://fonts.googleapis.com/css2?family=Poppins&display=swap" },
  ];

  return (
    <Elements
      stripe={stripePromise}
      options={{ clientSecret, appearance, fonts }}>
      <CheckoutForm clientSecret={clientSecret} email={email} />
    </Elements>
  );
}

function CheckoutForm({
  clientSecret,
  email,
}: {
  clientSecret: string;
  email?: string;
}) {
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
        return_url: window.location.origin + "/payment-success?email=" + email,
      },
    });

    if (error) {
      // handle
      alert("ERROR: " + error.message);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button className="bg-[linear-gradient(135deg,#DB5F06_30%,#D20404_140%)] text-white rounded px-8 py-1 font-semibold mt-4">
        PAGA
      </button>
    </form>
  );
}

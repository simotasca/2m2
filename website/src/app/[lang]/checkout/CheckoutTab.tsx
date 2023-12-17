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
import useTranslation from "@/context/lang/useTranslation";

export interface CheckoutParams {
  clientSecret?: string;
  setClientSecret: Dispatch<string>;
  email?: string;
  metadata?: any;
  amount: number;
}

export const CheckoutTab = forwardRef<WizTabHandle, CheckoutParams>(
  (forwardProps, ref) => {
    const [showErrors, setShowErrors] = useState(false);
    const tabRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(
      ref,
      () => ({
        validate: () => {
          setShowErrors(true);
          return true;
        },
        focus: () => tabRef.current?.querySelector("input")?.focus(),
      }),
      []
    );

    const { t, r } = useTranslation("page.checkout");

    return (
      <div ref={tabRef} className="mb-2.5">
        <div className="flex items-start gap-2 mb-2">
          <Image className="w-5 -translate-y-px" src={iconPayment} alt="" />
          <h4 className="text-xl leading-[0.9] font-bold uppercase">
            Checkout
          </h4>
        </div>
        <ElementsWrapper {...forwardProps} />
      </div>
    );
  }
);

function ElementsWrapper({
  clientSecret,
  setClientSecret,
  email,
  metadata,
  amount,
}: CheckoutParams) {
  const [totalPrice, setTotalPrice] = useState<number>();

  useEffect(() => {
    if (!setClientSecret) return;
    if (clientSecret != undefined) return;
    if (!amount) return;
    if (!metadata) return;

    console.log("SENDIN:", metadata);

    fetch("/api/stripe/create-payment-intent", {
      method: "POST",
      body: JSON.stringify({
        amount: amount,
        metadata: metadata,
      }),
    })
      .then((res) => {
        switch (res.status) {
          case 400:
            throw new Error("Bad Request: " + res.statusText);
          case 500:
            throw new Error("Internal Server Error: " + res.statusText);
          default:
            return res.json();
        }
      })
      .then((data) => {
        console.log(data);
        setTotalPrice(data.amount);
        setClientSecret(data.secret);
      })
      .catch((err) =>
        console.error("ERROR: could not generate payment intent:", err)
      );
  }, [setClientSecret, amount, metadata]);

  if (!clientSecret || !stripePromise) return <LoadingSpinner />;

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

  const locale = "en";

  return (
    <Elements
      stripe={stripePromise}
      options={{ clientSecret, appearance, fonts, locale }}
    >
      <CheckoutForm email={email} totalPrice={totalPrice} />
    </Elements>
  );
}

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center ">
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-8 w-8"></div>
    </div>
  );
};

function CheckoutForm({
  email,
  totalPrice,
}: {
  email?: string;
  totalPrice?: number;
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
        return_url: window.location.origin + "/checkout/success?email=" + email,
      },
    });

    if (error) {
      // handle
      alert("ERROR: " + error.message);
    }

    setLoading(false);
  };

  const { t } = useTranslation("page.checkout");

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />

      {totalPrice && (
        <button className="bg-[linear-gradient(135deg,#DB5F06_30%,#D20404_140%)] text-white rounded px-8 py-1 font-semibold mt-4">
          {t("pay")} $
          {totalPrice != undefined ? totalPrice.toFixed(2) + "€" : ""}
        </button>
      )}
    </form>
  );
}

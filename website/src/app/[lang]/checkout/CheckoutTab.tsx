import LoadingScreen from "@/components/ui/LoadingScreen";
import useTranslation from "@/context/lang/useTranslation";
import iconPayment from "@/images/icons/payment.svg";
import { stripePromise } from "@/lib/stripe";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import type { StripeElementsOptions } from "@stripe/stripe-js";
import Image from "next/image";
import {
  FormEvent,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import WizTabHandle from "./WizTabHandle";
import { useRouter } from "next/navigation";

export interface CheckoutParams {
  email?: string;
  metadata?: any;
  amount: number;
}

export const CheckoutTab = forwardRef<WizTabHandle, CheckoutParams>(
  (forwardProps, ref) => {
    const tabRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(
      ref,
      () => ({
        validate: () => true,
        focus: () => tabRef.current?.querySelector("input")?.focus(),
      }),
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
        <ElementsWrapper {...forwardProps} />
      </div>
    );
  }
);

function ElementsWrapper({ email, metadata, amount }: CheckoutParams) {
  if (!stripePromise || !amount || !metadata) return <LoadingSpinner />;

  const options: StripeElementsOptions = {
    mode: "payment",
    amount: amount * 100,
    currency: "eur",
    paymentMethodCreation: "manual",
    appearance: {
      disableAnimations: true,
      theme: "stripe",
      labels: "above",
      variables: {
        fontFamily: "Poppins",
        fontSizeBase: "14px",
        spacingUnit: "2px",
        borderRadius: "2px",
      },
    },
    fonts: [
      {
        cssSrc: "https://fonts.googleapis.com/css2?family=Poppins&display=swap",
      },
    ],
    // TODO non necessario
    // locale: "en",
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm metadata={metadata} email={email} totalPrice={amount} />
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
  metadata,
}: {
  email?: string;
  totalPrice?: number;
  metadata: any;
}) {
  const [loading, setLoading] = useState(false);
  // TODO: display
  const [errorMessage, setErrorMessage] = useState<string>();
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const handleError = (error) => {
    setLoading(false);
    console.log(error.message);
    setErrorMessage("Error processing payment... retry later");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(undefined);

    if (!stripe || !elements) return;

    setLoading(true);

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError) {
      handleError(submitError);
      return;
    }

    const { error: paymentMethodError, paymentMethod } =
      await stripe.createPaymentMethod({
        elements,
        params: { metadata },
      });

    if (paymentMethodError) {
      // This point is only reached if there's an immediate error when
      // creating the PaymentMethod. Show the error to your customer (for example, payment details incomplete)
      handleError(paymentMethodError);
      return;
    }

    // https://docs.stripe.com/payments/finalize-payments-on-the-server?platform=web&type=payment
    const res = await fetch("/api/stripe/confirm-payment", {
      method: "POST",
      body: JSON.stringify({
        paymentMethodId: paymentMethod.id,
        amount: Number(totalPrice),
        metadata,
      }),
    });

    if (res.status != 200) {
      handleError({ message: await res.text() });
      return;
    }

    const data = await res.json();

    if (data.status === "requires_action") {
      console.log("IT REQUIRES AN ACTION");

      // Use Stripe.js to handle the required next action
      const { error } = await stripe.handleNextAction({
        clientSecret: data.client_secret,
      });

      if (error) {
        // Show error from Stripe.js in payment form
        handleError(error);
        return;
      }

      console.log("WHAT SHOULD I DO WITH PAYMENT INTENT???");
    }

    router.push(
      process.env.NEXT_PUBLIC_WEBSITE_HOST! +
        "/checkout/success?email=" +
        metadata.email
    );
  };

  const { t } = useTranslation("page.checkout");

  return (
    <>
      {/* TODO tradurre */}
      <LoadingScreen loading={loading} message={"processing payment"} />

      <form onSubmit={handleSubmit}>
        <PaymentElement />

        {errorMessage && <p className=" my-2 text-red-400">{errorMessage}</p>}

        {totalPrice && (
          <button className="bg-[linear-gradient(135deg,#DB5F06_30%,#D20404_140%)] text-white rounded px-8 py-1 font-semibold m4-2">
            {t("pay")} $
            {totalPrice != undefined ? totalPrice.toFixed(2) + "€" : ""}
          </button>
        )}
      </form>
    </>
  );
}

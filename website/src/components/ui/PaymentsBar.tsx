import iconAmex from "@/images/icons/payment-methods/amex.svg";
import iconMcard from "@/images/icons/payment-methods/mastercard.svg";
import iconUpay from "@/images/icons/payment-methods/unionpay.svg";
import iconVisa from "@/images/icons/payment-methods/visa.svg";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

export function PaymentsBar({ className }: { className?: string }) {
  return (
    <div className={twMerge("flex gap-1.5 items-center", className)}>
      <Image src={iconVisa} alt="" className="w-5 md:w-7"></Image>
      <Image src={iconMcard} alt="" className="w-5 md:w-7"></Image>
      <Image src={iconAmex} alt="" className="w-5 md:w-7"></Image>
      <Image src={iconUpay} alt="" className="w-5 md:w-7"></Image>
    </div>
  );
}

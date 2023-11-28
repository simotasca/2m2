"use client";

import ProductsGrid from "@/components/product/ProductsGrid";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import PageLayout from "@/layouts/PageLayout";
import { EcodatArticle } from "@/lib/shared/ecodat";
import Hero from "./Hero";
import ContactsSection from "./ContactsSection";
import iconAmex from "@/images/icons/payment-methods/amex.svg";
import iconMcard from "@/images/icons/payment-methods/mastercard.svg";
import iconUpay from "@/images/icons/payment-methods/unionpay.svg";
import iconVisa from "@/images/icons/payment-methods/visa.svg";
import Image from "next/image";

interface Props {
  latestProducts: EcodatArticle[];
}

export default function ClientPage({ latestProducts }: Props) {
  return (
    <PageLayout>
      <Hero />

      <MaxWidthContainer className="bg-neutral-100">
        <ProductsGrid
          hidePartialRows={true}
          products={latestProducts}
          className="py-6"
        />
      </MaxWidthContainer>

      <div className="h-8"></div>

      <div className="bg-white">
        <MaxWidthContainer className="pt-20 pb-10">
          <ContactsSection />
        </MaxWidthContainer>

        <div className="bg-slate-300 py-1">
          <MaxWidthContainer className="flex gap-4 items-center">
            <p className="uppercase font-bold text-slate-800">PAGAMENTI</p>
            <div className="flex gap-1.5 items-center">
              <Image src={iconVisa} alt="" className="w-7"></Image>
              <Image src={iconMcard} alt="" className="w-7"></Image>
              <Image src={iconAmex} alt="" className="w-7"></Image>
              <Image src={iconUpay} alt="" className="w-7"></Image>
            </div>
          </MaxWidthContainer>
        </div>
      </div>
    </PageLayout>
  );
}

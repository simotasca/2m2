import PageLayout from "@/layouts/PageLayout";

import Image from "next/image";
import iconSuccess from "@/images/icons/success.svg";
import routes from "@/lib/shared/routes";
import CookieKiller from "./CookieKiller";
import { generateTranslations } from "@/lib/server/lang";
import TranslationClientComponent from "@/context/lang/TranslationClientComponent";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Checkout Success",
    robots: { index: false },
  };
}

export default async function CheckoutSuccessPage({ searchParams }) {
  const [translations] = await generateTranslations({});

  return (
    <TranslationClientComponent value={translations}>
      <PageLayout headerSmall>
        <CookieKiller />

        <div className="flex flex-col bg-neutral-100 items-center justify-center pt-28 pb-36">
          <div className="mx-auto mb-2">
            <Image className="w-10" src={iconSuccess} alt="icon success" />
          </div>
          <h1 className="text-center text-2xl font-bold">Successful payment</h1>
          <div className="h-2"></div>
          <p className="text-center leading-tight">
            <span>Abbiamo inviato una mail di conferma pagamento a</span>
            <br />
            <b className="font-medium">{searchParams.email}</b>
          </p>
          <a href={routes.home()}>
            <div className=" px-4 py-2 bg-red-gradient text-white rounded-lg mt-6">
              TORNA ALLA HOME
            </div>
          </a>
        </div>
      </PageLayout>
    </TranslationClientComponent>
  );
}

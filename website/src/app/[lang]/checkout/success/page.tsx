import PageLayout from "@/layouts/PageLayout";
import ServerLayout from "@/layouts/base/ServerLayout";
import Image from "next/image";

import iconSuccess from "@/images/icons/success.svg";
import Button from "@/components/ui/Button";
import routes from "@/lib/shared/routes";

export default function CheckoutSuccessPage({ searchParams }) {
  // let params = new URL(window.location.toString()).searchParams;

  return (
    <ServerLayout>
      <PageLayout headerSmall>
        <div className="flex flex-col bg-neutral-100 items-center justify-center pt-28 pb-36">
          <div className="mx-auto mb-2">
            <Image
              className="w-10"
              src={iconSuccess}
              alt="icon success"
            ></Image>
          </div>
          <h1 className="text-center text-2xl font-bold">Successful payment</h1>
          <div className="h-2"></div>
          <p className="text-center leading-tight">
            Abbiamo inviato una mail di conferma pagamento a <br />
            <b className="font-medium">{searchParams.email}</b>
          </p>
          <a href={routes.home()}>
            <div className=" px-4 py-2 bg-red-gradient text-white rounded-lg mt-6">
              TORNA ALLA HOME
            </div>
          </a>
        </div>
      </PageLayout>
    </ServerLayout>
  );
}

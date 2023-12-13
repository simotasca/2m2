import Image from "next/image";
import imgLogo from "@/images/logo-dark.svg";

export default function GuaranteedUsed() {
  return (
    <div className="bg-neutral-100 border-y border-neutral-200 py-6 px-4 md:px-2 lg:px-0 ">
      <div className="mx-auto w-fit flex [@media(max-width:383px)]:flex-col gap-y-3 items-start md:items-center gap-x-4 lg:gap-x-8">
        <Image
          src={imgLogo}
          alt=""
          className="w-12 md:w-16 [@media(max-width:383px)]:mx-auto"
        />
        <h4 className="font-semibold leading-tight text-base sm:text-lg md:text-xl max-md:text-center">
          Tutto il nostro usato è selezionato, testato e garantito!
        </h4>
        <Image
          src={imgLogo}
          alt=""
          className="w-12 md:w-16 [@media(max-width:383px)]:hidden"
        />
      </div>
    </div>
  );
}

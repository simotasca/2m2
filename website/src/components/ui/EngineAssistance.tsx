"use client";

import Image from "next/image";
import wrenchPng from "@/images/wrench.png";
import useTranslation from "@/context/lang/useTranslation";
import Link from "../navigation/Link";
import Button from "./Button";

export default function EngineAssistance() {
  const { t } = useTranslation();
  return (
    <section className=" [background-image:linear-gradient(to_left,#F03B3B_30%,#9D2A2A_100%)] full-bleed px-6 xs:px-10">
      <div className="max-sm-contents flex max-sm:flex-col gap-x-8 md:gap-x-14 items-center max-w-2xl mx-auto  text-white">
        <div className="mx-auto max-sm:order-2">
          <div className="w-24 sm:w-36 md:w-32 pt-6 sm:pt-10">
            <Image src={wrenchPng} alt="wrench"></Image>
          </div>
        </div>
        <div className="max-sm:text-center pt-16 xs:pt-12 sm:pt-10 sm:pb-10  max-sm:order-1">
          <h2 className="text-2xl font-bold text-shadow leading-[1.2]">
            <span className="md:whitespace-nowrap ">
              Stai cercando un motore per la tua auto?
            </span>{" "}
            <br className="max-md:hidden"></br>
            <span>Te lo montiamo noi!</span>
          </h2>
          <div className="h-[17px] sm:h-[10px]"></div>
          <Link href="#contacts">
            <Button className="group  bg-white text-red-600 border-red-900h-fit px-12 py-1 tracking-wide  shadow-sm max-sm:mx-auto">
              <span className="font-oswald">RICHIEDI UN PREVENTIVO</span>
            </Button>
          </Link>
          <div className="h-[22px]"></div>
          <div className="bg-white h-px w-full mb-1"></div>
          <p className="text-sm leading-[1.1] ">
            I motori vengono montati presso i nostri uffici da un team di
            tecnici specializzati, in ambienti dotati di strutture
            all'avanguardia
          </p>
        </div>
      </div>
    </section>
  );
}

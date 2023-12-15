import Image from "next/image";
import iconEmail from "@/images/icons/mail-red.svg";
import iconPhone from "@/images/icons/phone-red.svg";
import iconWhatsapp from "@/images/icons/whatsapp.svg";
import iconTime from "@/images/icons/time.svg";
import Button from "@/components/ui/Button";
import settings from "@/settings";

export default function ContactsSection() {
  return (
    <div className="grid md:grid-cols-[3fr_2fr] lg:grid-cols-2 gap-x-12 gap-y-6 max-xs:-ml-2">
      <div>
        <h3 className="text-2xl font-bold mb-1">Come possiamo aiutarti?</h3>
        <p className="leading-tight">
          Scegli il metodo di contatto che preferisci: Numero verde,Whatsapp,
          Email. Siamo a tua disposizione.
        </p>
      </div>
      <br />
      <div className="md:pl-6">
        <ul className="grid grid-cols-[auto_1fr_auto] gap-x-4 gap-y-2 items-center">
          <li className="contents">
            <Image className="max-xs:hidden" src={iconEmail} alt=""></Image>
            <div className=" leading-tight">
              <p>
                <span className="text-sm leading-tight">Email: </span>
                <span className="font-medium leading-tight">
                  {settings.info.email}
                </span>
              </p>
              <p className="text-sm text-neutral-500 leading-tight">
                Ti risponderemo a breve
              </p>
            </div>
            <Button className="w-full max-xs:max-w-[30vw] uppercase bg-orange-500 text-white max-xs:text-sm rounded-full px-10 py-1.5">
              Scrivici
            </Button>
          </li>
          <li className="col-span-3 h-px bg-orange-200"></li>
          <li className="contents">
            <Image className="max-xs:hidden" src={iconPhone} alt=""></Image>
            <div className=" leading-tight">
              <p>
                <span className="text-sm leading-tight">Telefono: </span>
                <br className="xs:hidden md:block lg:hidden" />
                <span className="font-medium leading-tight">
                  {settings.info.phone}
                </span>
              </p>
              <p className="text-sm text-neutral-500 leading-tight">
                Parla con un operatore
              </p>
            </div>
            <Button className="w-full max-xs:max-w-[30vw] uppercase bg-orange-500 text-white max-xs:text-sm rounded-full px-10 py-1.5">
              Chiama
            </Button>
          </li>
          <li className="col-span-3 h-px bg-orange-200"></li>
          <li className="contents">
            <Image className="max-xs:hidden" src={iconWhatsapp} alt=""></Image>
            <div className=" leading-tight">
              <p>
                <span className="text-sm leading-tight">Whatsapp: </span>
                <br className="xs:hidden md:block lg:hidden" />
                <span className="font-medium leading-tight">
                  {settings.info.phone}
                </span>
              </p>
              <p className="text-sm text-neutral-500 leading-tight">
                Ti risponderemo appena possibile
              </p>
            </div>
            <Button className="w-full max-xs:max-w-[30vw] uppercase bg-orange-500 text-white max-xs:text-sm rounded-full px-6 xs:px-10 py-1.5 ">
              CHAT
            </Button>
          </li>
        </ul>
      </div>
      <div>
        <p className="font-bold mt-2 md:-mt-4 mb-5 max-xs:max-w-[85vw]">
          Siamo disponibili nei seguenti orari:
        </p>

        <ul className="flex flex-col gap-2">
          <li className="flex gap-3 items-center">
            <Image
              src={iconTime}
              className="opacity-70 w-6 aspect-square translate-y-px"
              alt=""
            />
            <p>
              Da <b className="font-medium">Lunedì</b>
              <span> a </span>
              <b className="font-medium">Venerdì</b>
              <span className="text-neutral-600">
                <span>: </span>
                <br className="xs:hidden md:block lg:hidden" />
                <span>{settings.info.openings.monTue}</span>
              </span>
            </p>
          </li>
          <li className="flex gap-3 items-center">
            <Image
              src={iconTime}
              className="opacity-70 w-6 aspect-square translate-y-px"
              alt=""
            />
            <p>
              <b className="font-medium">Sabato</b>
              <span>: </span>
              <br className="xs:hidden md:block lg:hidden" />
              <span>{settings.info.openings.sat}</span>
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}

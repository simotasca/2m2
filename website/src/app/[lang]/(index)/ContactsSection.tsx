import Image from "next/image";
import iconEmail from "@/images/icons/payment.svg";
import iconTime from "@/images/icons/time.svg";
import Button from "@/components/ui/Button";

export default function ContactsSection() {
  return (
    <div className="grid grid-cols-2 gap-y-6 gap-x-12">
      <div>
        <h3 className="text-2xl font-bold mb-1">Come possiamo aiutarti?</h3>
        <p className="leading-tight">
          Scegli il metodo di contatto che preferisci: Numero verde,Whatsapp,
          Email. Siamo a tua disposizione.
        </p>
      </div>
      <br />
      <div className="pl-6">
        <ul className="grid grid-cols-[auto_1fr_auto] gap-x-4 gap-y-2 items-center">
          <li className="contents">
            <Image src={iconEmail} alt=""></Image>
            <div className="leading-tight">
              <p>
                <span className="text-sm leading-tight">Email: </span>
                <span className="font-medium leading-tight">
                  assistenza@2m2.com
                </span>
              </p>
              <p className="text-sm text-neutral-500 leading-tight">
                Ti risponderemo a breve
              </p>
            </div>
            <Button className="w-full uppercase bg-orange-500 text-white rounded-full px-10 py-1.5">
              Scrivici
            </Button>
          </li>
          <li className="col-span-3 h-px bg-orange-200"></li>
          <li className="contents">
            <Image src={iconEmail} alt=""></Image>
            <div className="leading-tight">
              <p>
                <span className="text-sm leading-tight">Telefono: </span>
                <span className="font-medium leading-tight">
                  +39 374 9284720
                </span>
              </p>
              <p className="text-sm text-neutral-500 leading-tight">
                Parla con un operatore
              </p>
            </div>
            <Button className="w-full uppercase bg-orange-500 text-white rounded-full px-10 py-1.5">
              Chiama
            </Button>
          </li>
          <li className="col-span-3 h-px bg-orange-200"></li>
          <li className="contents">
            <Image src={iconEmail} alt=""></Image>
            <div className="leading-tight">
              <p>
                <span className="text-sm leading-tight">Whatsapp: </span>
                <span className="font-medium leading-tight">
                  +39 374 9284720
                </span>
              </p>
              <p className="text-sm text-neutral-500 leading-tight">
                Ti risponderemo appena possibile
              </p>
            </div>
            <Button className="w-full uppercase bg-orange-500 text-white rounded-full px-10 py-1.5">
              CHAT
            </Button>
          </li>
        </ul>
      </div>
      <div>
        <p className="font-bold -mt-4 mb-5">
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
                : 08:30-12:30 / 14:40-17:30
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
              <span className="text-neutral-600">: 08:30-12:30</span>
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}

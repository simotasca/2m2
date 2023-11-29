import Button from "@/components/ui/Button";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import imgBackground from "@/images/about-background.jpg";
import imgMap from "@/images/europe.svg";
import PageLayout from "@/layouts/PageLayout";
import imgGarage from "@/images/officina.jpg";
import imgSkew from "@/images/skew-dark.svg";
import Image from "next/image";

export default function ClientPage() {
  return (
    <PageLayout headerSmall={true}>
      <Hero />
      <MapSection />
      <History />
    </PageLayout>
  );
}

function Hero() {
  return (
    <div className="relative">
      <Image
        src={imgBackground}
        alt=""
        className="absolute inset-0 w-full h-full object-cover -z-20"
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-[#000000f0] via-[#000000d0] to-[#00000020] -z-10"></div>
      <div className="min-h-[70vh] text-white grid items-end">
        <MaxWidthContainer className="py-12">
          <h1 className="text-4xl font-semibold max-w-2xl [text-shadow:0px_1px_8px_#00000099]">
            Da <span className="text-red-600">50 anni</span> lavoriamo per
            guadagnare la vostra fiducia
          </h1>
          <div className="h-3"></div>
          <p className="max-w-3xl [text-shadow:0px_1px_8px_black]">
            <span>
              Ci impegniamo a semplificare la tua esperienza nella ricerca di
              autoricambi di alta qualità a
            </span>
            <b> prezzi convenienti. </b>
            <span>
              Grazie al nostro sistemi di ricerca, ti offriamo un servizio
              rapido e affidabile, mettendo a tua disposizione una
            </span>
            <b> vasta selezione di prodotti </b>
            <span>
              per la tua auto. Trova ciò di cui hai bisogno con facilità,
              velocità e la sicurezza di fare una scelta informata per il tuo
              veicolo.
            </span>
          </p>
          <Button className="bg-red-gradient px-10 py-1.5 mt-8 text-lg">
            FAI LA TUA RICERCA
          </Button>
        </MaxWidthContainer>
      </div>
    </div>
  );
}

function MapSection() {
  return (
    <div className="relative">
      <div className="absolute w-[200%] h-full z-10 pointer-events-none [box-shadow:inset_0px_0px_12px_#000000f0] -translate-x-1/2"></div>
      <div className="bg-slate-100  py-10">
        <MaxWidthContainer>
          <div className="grid grid-cols-3">
            <div className="pt-10">
              <h2 className="uppercase font-oswald text-5xl -translate-x-0.5">
                Dove siamo
              </h2>
              <p className="mt-1 mb-8 text-lg">
                Riforniamo clienti in tutta Europa
              </p>
              <div className="pl-2">
                <div className="bg-neutral-50 rounded shadow-md border border-neutral-300">
                  <ul className="px-6 py-2">
                    <li className="py-5 font-bold text-xl uppercase leading-[1]">
                      <span>Fino a </span>
                      <span className="bg-red-gradient bg-clip-text text-transparent">
                        10.912
                      </span>
                      <span> ordini al giorno</span>
                    </li>
                    <li className="h-px bg-neutral-300"></li>
                    <li className="py-5 font-bold text-xl uppercase leading-[1]">
                      <span className="bg-red-gradient bg-clip-text text-transparent">
                        + 10.912
                      </span>
                      <span> clienti soddisfatti</span>
                    </li>
                    <li className="h-px bg-neutral-300"></li>
                    <li className="py-5 font-bold text-xl uppercase leading-[1]">
                      <span className="bg-red-gradient bg-clip-text text-transparent">
                        + 2.500.000
                      </span>
                      <span> ricambi di tutte le marche</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="relative col-span-2 pl-8">
              <Image alt="2m2 europe distribution" src={imgMap} />
            </div>
          </div>
        </MaxWidthContainer>
      </div>
    </div>
  );
}

function History() {
  return (
    <div className="relative">
      <div className="absolute inset-0 grid grid-cols-10 -z-10">
        <div className="relative col-span-6 bg-dark">
          <Image
            src={imgSkew}
            alt=""
            className="absolute w-auto max-w-none h-full top-0 left-full object-cover -translate-x-px"
          />
        </div>
        <div className="relative col-span-4">
          <Image
            src={imgGarage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover -z-20"
          />
        </div>
      </div>

      <MaxWidthContainer className="grid grid-cols-10">
        <div className="text-white px-10 py-24 col-span-6">
          <h2 className="uppercase text-2xl font-bold mb-3">
            LA NOSTRA STORIA
          </h2>
          <p>
            Ci impegniamo a semplificare la tua esperienza nella ricerca di
            autoricambi di alta qualità a prezzi convenienti. Grazie ai nostri
            avanzati sistemi di ricerca, ti offriamo una scoperta rapida e
            affidabile, mettendo a tua disposizione una vasta selezione di
            prodotti per la tua auto. Trova ciò di cui hai bisogno con facilità,
            velocità e la sicurezza di fare una scelta informata per il tuo
            veicolo.
          </p>
        </div>
      </MaxWidthContainer>
    </div>
  );
}

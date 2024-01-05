import SearchModalToggle from "@/components/search/SearchModalToggle";
import Button from "@/components/ui/Button";
import ContactsSection from "@/components/ui/ContactsSection";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import TranslationClientComponent from "@/context/lang/TranslationClientComponent";
import imgBackground from "@/images/about-background.jpg";
import imgMap from "@/images/europe.svg";
import imgGarage from "@/images/officina.jpg";
import imgSkew from "@/images/skew-dark.svg";
import PageLayout from "@/layouts/PageLayout";
import ClientLayout from "@/layouts/base/ClientLayout";
import { getServerData } from "@/layouts/base/ServerLayout";

import { TranslationFactories, generateTranslations } from "@/lib/server/lang";
import Image from "next/image";

export default async function AboutPage() {
  const [translations, { t, r }] = await generateTranslations(
    {
      header: "misc/header",
      "mobile-panel": "misc/mobile-panel",
      search: "misc/search",
      footer: "misc/footer",
      errors: "misc/errors",
      page: "pages/about",
      contacts: "misc/contacts",
      auth: "auth",
    },
    true
  );

  const { cart, favs } = await getServerData();

  return (
    <TranslationClientComponent value={translations}>
      <ClientLayout cart={cart} favourites={favs}>
        <PageLayout headerSmall={true}>
          <Hero t={t} r={r} />
          <MapSection t={t} r={r} />
          <History t={t} r={r} />
          <div className="bg-neutral-100 py-12 px-3 xs:px-6 [@media(min-width:847px)]:px-16 lg:px-24">
            <ContactsSection />
          </div>
        </PageLayout>
      </ClientLayout>
    </TranslationClientComponent>
  );
}

function Hero({ t, r }: TranslationFactories) {
  return (
    <div className="relative max-sm:px-2">
      <Image
        src={imgBackground}
        alt=""
        className="absolute inset-0 w-full h-full object-cover -z-20"
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-[#000000f0] via-[#000000d0] to-[#00000020] -z-10"></div>
      <div className="min-h-[70vh] text-white grid items-end">
        <MaxWidthContainer className="py-12 ">
          <h1 className="text-4xl font-semibold max-w-2xl [text-shadow:0px_1px_8px_#00000099]">
            {r("page.hero.title")}
          </h1>
          <div className="h-3"></div>
          <p className="max-w-3xl [text-shadow:0px_1px_8px_black]">
            {r("page.hero.subtitle")}
          </p>
          <SearchModalToggle
            as="button"
            className="bg-red-gradient px-10 py-1.5 mt-8 text-lg uppercase"
          >
            {r("page.hero.button")}{" "}
          </SearchModalToggle>
        </MaxWidthContainer>
      </div>
    </div>
  );
}

function MapSection({ t, r }: TranslationFactories) {
  return (
    <div className="relative">
      <div className="absolute w-[200%] h-full z-10 pointer-events-none [box-shadow:inset_0px_0px_12px_#000000f0] -translate-x-1/2"></div>
      <div className="bg-slate-100 py-10">
        <MaxWidthContainer>
          <div className="grid grid-cols-3 max-sm:py-6 max-sm:px-2">
            <div className="max-lg:contents">
              <div className="[@media(max-width:700px)]:col-span-3 md:mt-auto md:mb-0 lg:my-0">
                <h2 className="uppercase font-oswald text-5xl lg:-translate-x-0.5 md:ml-7 lg:ml-0">
                  {r("page.map-section.title")}
                </h2>
                <p className="mt-1 mb-8 text-lg leading-tight md:ml-7 lg:ml-0">
                  {r("page.map-section.subtitle")}
                </p>
              </div>

              <div className=" bottom-0 w-full max-lg:order-3 max-lg:col-span-full pt-8 xs:pt-4 px-2">
                <div className="bg-neutral-50 rounded shadow-md border border-neutral-300">
                  <ul className="grid md:grid-cols-3 lg:grid-cols-1 items-stretch px-6 py-2">
                    <li className="py-5 md:pr-4 font-bold text-lg xs:text-xl uppercase leading-[1] md:border-r border-r-px lg:border-r-0 border-r-bg-neutral-300">
                      {r("page.map-section.numbers.orders")}
                    </li>
                    <li className="md:hidden lg:block h-px bg-neutral-300 md:my-4 lg:my-0"></li>
                    <li className="py-5 md:pl-4 lg:pl-0 md:pr-2 font-bold text-lg xs:text-xl uppercase leading-[1] md:border-r  border-r-px lg:border-r-0 border-r-bg-neutral-300">
                      {r("page.map-section.numbers.clients")}
                    </li>
                    <li className="md:hidden lg:block h-px bg-neutral-300 md:my-4 lg:my-0"></li>
                    <li className="py-5 md:pl-4 lg:pl-0 font-bold text-lg xs:text-xl uppercase leading-[1]">
                      {r("page.map-section.numbers.car-parts")}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="relative col-span-3 [@media(min-width:700px)]:col-span-2 pl-8">
              <Image alt="2m2 europe distribution" src={imgMap} />
            </div>
          </div>
        </MaxWidthContainer>
      </div>
    </div>
  );
}

function History({ t, r }: TranslationFactories) {
  return (
    <div className="relative">
      <div className="sm:absolute inset-0 grid grid-cols-10 -z-10">
        <div className="relative col-span-10 sm:col-span-4 lg:col-span-6 max-sm:order-2 bg-dark">
          <MaxWidthContainer className="sm:hidden">
            <div className="text-white px-4 sm:px-10 max-sm:py-12 ">
              <h2 className="uppercase text-2xl font-bold mb-3">
                {t("page.history.title")}
              </h2>
              <p>{t("page.history.paragraph")}</p>
            </div>
          </MaxWidthContainer>
          <Image
            src={imgSkew}
            alt=""
            className="max-sm:hidden absolute w-auto max-w-none h-full top-0 left-full object-cover -translate-x-px"
          />
        </div>
        <div className="sm:relative col-span-10 sm:col-span-6 lg:col-span-4">
          <Image
            src={imgGarage}
            alt=""
            className="sm:absolute inset-0 w-full h-full object-cover -z-20"
          />
        </div>
      </div>

      <MaxWidthContainer className="max-sm:hidden grid sm:grid-cols-10 top-0">
        <div className="text-white px-10 py-24 col-span-5 lg:col-span-6 sm:mt-[20%] lg:my-0">
          <h2 className="uppercase text-2xl font-bold mb-3">
            {t("page.history.title")}
          </h2>
          <p>{t("page.history.paragraph")}</p>
        </div>
      </MaxWidthContainer>
    </div>
  );
}

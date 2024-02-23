"use client";

import Button from "@/components/ui/Button";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import useTranslation from "@/context/lang/useTranslation";
import iconBrand from "@/images/icons/sell.svg";
import iconSend from "@/images/icons/send.svg";
import iconGuaranteed from "@/images/icons/white/guaranteed.svg";
import iconSecurity from "@/images/icons/white/lock.svg";
import iconLowPrices from "@/images/icons/white/low-prices.svg";
import iconShipping from "@/images/icons/white/shipping.svg";
import iconSupport from "@/images/icons/white/support.svg";
import iconUsedTest from "@/images/icons/white/testing-eye.svg";
import iconCategory from "@/images/icons/widgets.svg";
import imgLogoEsteso from "@/images/logo-esteso.svg";
import mainBg from "@/images/main-background-engine.jpg";
import imgSkew from "@/images/skew.svg";
import { ecodatData } from "@/lib/client/filters";
import routes from "@/lib/shared/routes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import SearchFilter from "./SearchFilter";
import Link from "@/components/navigation/Link";

export default function Hero() {
  const { t } = useTranslation("page.hero");
  return (
    <div className="relative max-md:flex flex-col">
      <HeroBg />
      <div className="max-md:order-5">
        <QualitiesBar />
      </div>

      <MaxWidthContainer className="flex flex-col md:grid md:grid-cols-[13fr_12fr] lg:grid-cols-[4fr_3fr] pb-10">
        <div className="max-md:order-2 max-md:pt-8 ">
          <HeroFilters />
        </div>

        <main className="sm:flex md:block gap-6 items-end text-white px-4 [@media(min-width:500px)]:px-16 sm:px-4 md:px-8 max-sm:py-12 sm:pt-6 sm:pb-0 md:pt-4 lg:pt-0">
          <div>
            <Image
              src={imgLogoEsteso}
              alt="Logo 2emme2 autoricambi"
              className="w-full sm:w-[90%] md:w-full md:max-w-sm [filter:drop-shadow(0px_2px_1px_#000000cc)_drop-shadow(2px_0px_1px_#000000cc)] md:[filter:drop-shadow(0px_2px_2px_black)]"
            />
            <p className="sm:max-w-md md:max-w-none text-lg [@media(min-width:347px)]:text-xl  [@media(min-width:420px)]:text-2xl sm:text-xl [@media(min-width:347px)]:leading-tight [@media(min-width:420px)]:leading-tight md:leading-tight [text-shadow:0_2px_4px_black] max-sm:text-center sm:pt-2 ">
              {t("subtitle.line1")}
              <br className="sm:hidden md:block" />
              {t("subtitle.line2")}
            </p>
          </div>
          <Link href="#contacts">
            <Button className="group mt-2 sm:mt-6 bg-white text-red-600 h-fit pl-12 sm:pl-8 pr-10 sm:pr-7 py-1.5 sm:py-[8px] md:py-1.5 tracking-wide max-sm:mx-auto sm:ml-auto sm:mr-0 md:mx-0">
              <span>{t("button")}</span>
              <Image
                src={iconSend}
                alt=""
                className="w-5 -translate-y-px -rotate-[30deg] transition-transform group-hover:-translate-y-0.5"
              />
            </Button>
          </Link>
        </main>
      </MaxWidthContainer>
    </div>
  );
}

function HeroFilters() {
  const { t, r } = useTranslation("page.hero.filters");

  const router = useRouter();

  // the contents of the dropdowns
  const [content, setContent] = useState<any>(null);

  // the selected content
  const [category, setCategory] = useState<any>(null);
  const [typology, setTypology] = useState<any>(null);
  const [brand, setBrand] = useState<any>(null);
  const [model, setModel] = useState<any>(null);

  const mapFilterData = (
    filterData: any[] | undefined,
    displayProp: string
  ) => {
    if (!filterData) return [];
    return filterData.map((fd) => ({
      key: fd.id,
      value: fd,
      display: fd[displayProp],
    }));
  };

  useEffect(() => {
    ecodatData.then((res) => {
      res && setContent(res);
    });
  }, []);

  const doSearch = () => {
    if (!category && !brand) {
      return;
    }

    if (!category) {
      if (!model) {
        router.push(routes.brand(brand.name));
        return;
      }
      router.push(routes.model(brand.name, model.name));
      return;
    }

    if (!brand) {
      if (!typology) {
        router.push(routes.category(category.name));
        return;
      }
      router.push(routes.type(category.name, typology.name));
      return;
    }

    // to generic results page
    router.push(
      routes.products({
        brandId: brand?.id,
        modelId: model?.id,
        categoryId: category?.id,
        typeId: typology?.id,
      })
    );
  };

  return (
    <div>
      <div className="bg-white rounded max-sm:flex flex-col sm:grid md:flex lg:grid grid-cols-2 gap-x-8 gap-y-2 px-9 py-7">
        <div className="flex items-start gap-1 lg:order-1">
          <Image className="w-8" src={iconCategory} alt="" />
          <h4 className="text-xl leading-[0.9] font-bold uppercase">
            {r("category.title")}
          </h4>
        </div>
        <div className="flex items-start gap-1 max-sm:order-2 md:order-2 lg:order-2  max-sm:pt-4 md:pt-4 lg:pt-0">
          <Image className="w-8" src={iconBrand} alt="" />
          <h4 className="text-xl leading-[0.9] font-bold uppercase">
            {r("brand.title")}
          </h4>
        </div>
        <div className="flex flex-col gap-2 lg:order-3">
          <SearchFilter
            label="category"
            placeholder="Select the category"
            data={mapFilterData(content?.categories, "name")}
            onChange={(v) => setCategory(v)}
          />
          <SearchFilter
            label="typology"
            placeholder={category ? "Select the typology" : ". . ."}
            data={mapFilterData(category?.typologies, "name")}
            disabled={!category}
            onChange={(t) => setTypology(t)}
          />
        </div>
        <div className="flex flex-col gap-2 max-sm:order-2 md:order-2 lg:order-4">
          <SearchFilter
            label="brand"
            placeholder="Select the brand"
            data={mapFilterData(content?.brands, "name")}
            onChange={(b) => setBrand(b)}
          />
          <SearchFilter
            label="model"
            placeholder={brand ? "Select the typology" : ". . ."}
            data={mapFilterData(brand?.models, "name")}
            disabled={!brand}
            onChange={(m) => setModel(m)}
          />
        </div>
        <div className="col-span-full pt-2 order-3 lg:order-5">
          <Button
            disabled={!brand && !category}
            onClick={doSearch}
            className={twMerge(
              "text-white text-lg w-full bg-gradient-to-br from-red-700 to-red-500",
              !brand && !category && "opacity-70"
            )}
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}

function HeroBg() {
  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full grid grid-cols-1 sm:grid-cols-[1fr_3fr] md:grid-cols-[1fr_2fr] lg:grid-cols-[6fr_7fr] -z-10">
        <div className="relative z-10 [background-image:linear-gradient(to_left,#F03B3B_30%,#9D2A2A_100%)] h-full max-sm:order-2 max-sm:border-t-2 max-sm:border-neutral-400">
          <Image
            className="absolute left-full -translate-x-px top-0 h-full w-auto object-cover object-left max-w-none max-sm:hidden"
            src={imgSkew}
            alt=""
          />
          <div className="absolute w-full h-full overflow-hidden">
            <div className="absolute bottom-0 translate-y-1/2 md:right-0 w-px h-[400%] bg-white opacity-[16%] -rotate-[22deg] -z-10"></div>
            <div className="absolute bottom-0 translate-y-1/2 md:right-[32%] w-px h-[400%] bg-white opacity-[16%] -rotate-[22deg] -z-10"></div>
            <div className="absolute bottom-0 translate-y-1/2 md:right-[64%] w-px h-[400%] bg-white opacity-[16%] -rotate-[22deg] -z-10"></div>
            <div className="absolute bottom-0 translate-y-1/2 md:right-[96%] w-px h-[400%] bg-white opacity-[16%] -rotate-[22deg] -z-10"></div>
            <div className="absolute bottom-0 translate-y-1/2 md:right-[128%] w-px h-[400%] bg-white opacity-[16%] -rotate-[22deg] -z-10"></div>
          </div>
        </div>
        <div className="relative">
          <Image
            src={mainBg}
            alt="backgroud engine"
            className="absolute inset-0 w-full h-full object-cover"
          ></Image>
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
      </div>
    </>
  );
}

function QualitiesBar() {
  const { r } = useTranslation("page.hero.qualities");

  return (
    <MaxWidthContainer className="grid md:grid-cols-2 gap-x-12 px-4 xs:px-12 pb-8 md:pt-6 md:pb-4 lg:py-8 text-white uppercase font-semibold leading-[1] mx-auto">
      <div className="grid grid-cols-3 sm:flex gap-6 xs:gap-12 items-start">
        <div className="flex max-xs:flex-col gap-2 lg:gap-3 items-center">
          <Image className="w-6 lg:w-full" src={iconGuaranteed} alt="" />
          <p className="max-xs:text-center text-sm lg:text-md leading-3 xs:leading-4">
            {r("reliability")}
          </p>
        </div>
        <div className="flex max-xs:flex-col gap-2 lg:gap-3 items-center">
          <Image className="w-6 lg:w-full" src={iconShipping} alt="" />
          <p className="max-xs:text-center text-sm lg:text-md leading-3 xs:leading-4">
            {r("speed")}
          </p>
        </div>
        <div className="flex max-xs:flex-col gap-2 lg:gap-3 items-center">
          <Image className="w-6 lg:w-full" src={iconLowPrices} alt="" />
          <p className="max-xs:text-center text-sm lg:text-md leading-3 xs:leading-4">
            {r("low-prices")}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:flex gap-6 xs:gap-12 max-xs:items-start max-md:items-end md:items-start md:place-self-end sm:ml-auto md:ml-0 sm:mr-0 mt-6 mb-2 xs:mt-4 md:mt-0">
        <div className="flex max-xs:flex-col gap-2 lg:gap-3 items-center">
          <Image className="w-6 lg:w-full" src={iconSupport} alt="" />
          <p className="max-xs:text-center text-sm lg:text-md leading-3 xs:leading-4">
            {r("support")}
          </p>
        </div>
        <div className="flex max-xs:flex-col gap-2 lg:gap-3 items-center">
          <Image className="w-6 lg:w-full" src={iconUsedTest} alt="" />
          <p className="max-xs:text-center text-sm lg:text-md leading-3 xs:leading-4">
            {r("test")}
          </p>
        </div>
        <div className="flex max-xs:flex-col gap-2 lg:gap-3 items-center">
          <Image className="w-4 lg:w-fit" src={iconSecurity} alt="" />
          <p className="max-xs:text-center text-sm lg:text-md leading-3 xs:leading-4">
            {r("security")}
          </p>
        </div>
      </div>
    </MaxWidthContainer>
  );
}

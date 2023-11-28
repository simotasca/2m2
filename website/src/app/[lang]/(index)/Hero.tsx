import Button from "@/components/ui/Button";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import useTranslation from "@/context/lang/useTranslation";
import iconBrand from "@/images/icons/sell.svg";
import iconSend from "@/images/icons/send.svg";
import iconCategory from "@/images/icons/widgets.svg";
import imgLogoEsteso from "@/images/logo-esteso.svg";
import mainBg from "@/images/main-background-engine.jpg";
import imgSkew from "@/images/skew.svg";
import Image from "next/image";
import iconGuaranteed from "@/images/icons/white/guaranteed.svg";
import iconShipping from "@/images/icons/white/shipping.svg";
import iconLowPrices from "@/images/icons/white/low-prices.svg";
import iconUsedTest from "@/images/icons/white/testing-eye.svg";
import iconSecurity from "@/images/icons/white/lock.svg";
import iconSupport from "@/images/icons/white/support.svg";
import { Fragment, useEffect, useState } from "react";
import SearchFilter from "./SearchFilter";
import { useRouter } from "next/navigation";
import QueryString from "qs";
import { encodeQueryParam } from "@/lib/shared/search";

function qs(obj: any) {
  return QueryString.stringify(obj, { addQueryPrefix: true });
}

export default function Hero() {
  return (
    <div className="relative">
      <HeroBg />

      <QualitiesBar />

      <MaxWidthContainer className="grid grid-cols-[4fr_3fr] pb-10">
        <HeroFilters />

        <main className="text-white px-8">
          <Image
            src={imgLogoEsteso}
            alt="Logo 2emme2 autoricambi"
            className="w-full max-w-sm [filter:drop-shadow(0px_2px_2px_black)]"
          />
          <p className="text-xl leading-tight [text-shadow:0_2px_2px_black] mt-4">
            Assistenza garantita su tutto.
            <br />
            Puoi contare su di noi.
          </p>
          <Button className="group mt-6 bg-white text-red-600 pl-12 pr-10 py-1.5 tracking-wide">
            <span>Contattaci</span>
            <Image
              src={iconSend}
              alt=""
              className="w-5 -translate-y-px -rotate-[30deg] transition-transform group-hover:-translate-y-0.5"
            />
          </Button>
        </main>
      </MaxWidthContainer>
    </div>
  );
}

function HeroFilters() {
  const { t, rich } = useTranslation("page.hero.filters");

  const router = useRouter();

  // the contents of the dropdowns
  const [filters, setFilters] = useState<any>(null);

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
    fetch("/api/ecodat/filters")
      .then((res) => res.json())
      .then((data) => {
        setFilters(data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  const doSearch = () => {
    if (!category && !brand) {
      alert("empty filters");
    }

    const qsObject = {
      brandId: brand?.id,
      modelId: model?.id,
      categoryId: category?.id,
      typeId: typology?.id,
    };

    if (!category) {
      if (!model) {
        // to brand page
        router.push(
          `/brand/${encodeQueryParam(brand.name.toLowerCase())}${qs({
            ...qsObject,
            brandId: undefined,
          })}`
        );
        return;
      }
      // to model page
      router.push(
        `/brand/` +
          encodeQueryParam(brand.name.toLowerCase()) +
          "/" +
          encodeQueryParam(model.name.toLowerCase()) +
          qs({
            ...qsObject,
            brandId: undefined,
            modelId: undefined,
          })
      );
      return;
    }

    if (!brand) {
      if (!typology) {
        // to category page
        router.push(
          `/category/${encodeQueryParam(category.name.toLowerCase())}${qs({
            ...qsObject,
            categoryId: undefined,
          })}`
        );
        return;
      }
      // to model page
      router.push(
        `/category/` +
          encodeQueryParam(category.name.toLowerCase()) +
          "/" +
          encodeQueryParam(typology.name.toLowerCase()) +
          qs({
            ...qsObject,
            categoryId: undefined,
            typeId: undefined,
          })
      );
      return;
    }

    // to generic results page
    // router.push(`/products${qs}`);
  };

  return (
    <div>
      <div className="bg-white rounded grid grid-cols-2 gap-x-8 gap-y-2 px-9 py-7">
        <div className="flex items-start gap-1">
          <Image className="w-8" src={iconCategory} alt="" />
          <h4 className="text-xl leading-[0.9] font-bold uppercase">
            {rich("category.title", {
              b: (b) => <span className="text-red-500">{b}</span>,
            })}
          </h4>
        </div>
        <div className="flex items-start gap-1">
          <Image className="w-8" src={iconBrand} alt="" />
          <h4 className="text-xl leading-[0.9] font-bold uppercase">
            {rich("brand.title", {
              b: (b) => <span className="text-red-500">{b}</span>,
            })}
          </h4>
        </div>
        <div className="flex flex-col gap-2">
          <SearchFilter
            label="category"
            placeholder="Select the category"
            data={mapFilterData(filters?.categories, "name")}
            onChange={(v) => setCategory(v)}
          />
          <SearchFilter
            label="typology"
            placeholder={category ? "Select the typology" : "..."}
            data={mapFilterData(category?.typologies, "name")}
            disabled={!category}
            onChange={(t) => setTypology(t)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <SearchFilter
            label="brand"
            placeholder="Select the brand"
            data={mapFilterData(filters?.brands, "name")}
            onChange={(b) => setBrand(b)}
          />
          <SearchFilter
            label="model"
            placeholder="Select the model"
            data={mapFilterData(brand?.models, "name")}
            disabled={!brand}
            onChange={(m) => setModel(m)}
          />
        </div>
        <div className="col-span-full pt-3">
          <Button
            onClick={doSearch}
            className="text-white text-lg w-full bg-gradient-to-br from-red-700 to-red-500">
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
      <div className="absolute top-0 left-0 w-full h-full grid grid-cols-[6fr_7fr] -z-10">
        <div className="relative z-10 [background-image:linear-gradient(to_left,#F03B3B_30%,#9D2A2A_100%)]">
          <Image
            className="absolute left-full -translate-x-px top-0 h-full w-auto object-cover object-left"
            src={imgSkew}
            alt=""
          />
          <div className="absolute w-full h-full overflow-hidden">
            <div className="absolute bottom-0 translate-y-1/2 right-0 w-px h-[400%] bg-white opacity-[16%] -rotate-[22deg] -z-10"></div>
            <div className="absolute bottom-0 translate-y-1/2 right-[32%] w-px h-[400%] bg-white opacity-[16%] -rotate-[22deg] -z-10"></div>
            <div className="absolute bottom-0 translate-y-1/2 right-[64%] w-px h-[400%] bg-white opacity-[16%] -rotate-[22deg] -z-10"></div>
            <div className="absolute bottom-0 translate-y-1/2 right-[96%] w-px h-[400%] bg-white opacity-[16%] -rotate-[22deg] -z-10"></div>
            <div className="absolute bottom-0 translate-y-1/2 right-[128%] w-px h-[400%] bg-white opacity-[16%] -rotate-[22deg] -z-10"></div>
          </div>
        </div>
        <div className="relative">
          <Image
            src={mainBg}
            alt="backgroud engine"
            className="absolute inset-0 w-full h-full object-cover"></Image>
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
      </div>
    </>
  );
}

function QualitiesBar() {
  const { t } = useTranslation("page.hero.qualities");
  // const { t: asasd } = useTranslation("page.hero");

  const mapQuality = (name: string) => {
    const arr: string[] = t(name);

    // console.log("ARRAY:", asasd("qualities"));

    return (
      arr &&
      arr.map((p, i) => (
        <Fragment key={i}>
          <span>{p}</span>
          {i != arr.length && <br />}
        </Fragment>
      ))
    );
  };

  return (
    <MaxWidthContainer className="grid grid-cols-2 gap-x-12 px-12 py-8 text-white uppercase font-semibold leading-[1]">
      <div className="flex gap-12">
        <div className="flex gap-3 items-center">
          <Image src={iconGuaranteed} alt="" />
          <p>{mapQuality("reliability")}</p>
        </div>
        <div className="flex gap-3 items-center">
          <Image src={iconShipping} alt="" />
          <p>{mapQuality("speed")}</p>
        </div>
        <div className="flex gap-3 items-center">
          <Image src={iconLowPrices} alt="" />
          <p>{mapQuality("low-prices")}</p>
        </div>
      </div>
      <div className="flex gap-12 place-self-end">
        <div className="flex gap-3 items-center">
          <Image src={iconSupport} alt="" />
          <p>{mapQuality("support")}</p>
        </div>
        <div className="flex gap-3 items-center">
          <Image src={iconUsedTest} alt="" />
          <p>{mapQuality("test")}</p>
        </div>
        <div className="flex gap-3 items-center">
          <Image src={iconSecurity} alt="" />
          <p>{mapQuality("security")}</p>
        </div>
      </div>
    </MaxWidthContainer>
  );
}

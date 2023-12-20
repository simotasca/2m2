"use client";

import ProductsGrid from "@/components/product/ProductsGrid";
import Button from "@/components/ui/Button";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import imgCarbonFiber from "@/images/carbon-fiber.png";
import iconRight from "@/images/icons/right.svg";
import PageLayout from "@/layouts/PageLayout";
import { EcodatArticle, knownCategories } from "@/lib/shared/ecodat";
import routes from "@/lib/shared/routes";
import Image from "next/image";
import Link from "next/link";
import { twJoin, twMerge } from "tailwind-merge";
import ContactsSection from "@/components/ui/ContactsSection";
import Hero from "./Hero";
import { PaymentsBar } from "@/components/ui/PaymentsBar";
import { Fragment, useEffect, useRef, useState } from "react";
import BrandsCarousel from "@/components/ui/BrandsCarousel";
import useTranslation from "@/context/lang/useTranslation";

interface Props {
  latestProducts: EcodatArticle[];
  categories: string[];
}

export default function ClientPage({ latestProducts, categories }: Props) {
  const { t, r } = useTranslation("page");
  return (
    <PageLayout>
      <Hero />

      <CategoriesSection categories={categories} />

      <MaxWidthContainer className="bg-neutral-100 pt-10 pb-10">
        <div className="flex gap-8 items-end">
          <h2 className="font-oswald text-3xl font-semibold uppercase">
            <span className="text-gray-400">{r("products-title")}</span>
          </h2>
          <Link href={routes.products()}>
            <Button className="group text-sm bg-transparent border border-slate-500 bg-neutral-50">
              {t("products-button")}
              <Image
                className="-translate-y-px group-hover:translate-x-0.5 transition-transform duration-100"
                alt=""
                src={iconRight}
              ></Image>
            </Button>
          </Link>
        </div>

        <ProductsGrid
          hidePartialRows={true}
          products={latestProducts}
          className="py-6"
        />
        <div className="mt-10 mb-6">
          <Link href={routes.products()}>
            <button className="block w-fit px-16 py-4 mx-auto bg-neutral-200 underline underline-offset-4">
              {t("products-button")}
            </button>
          </Link>
        </div>
      </MaxWidthContainer>

      <div className="h-8"></div>

      <div className="bg-white">
        <MaxWidthContainer className="pt-20 pb-20">
          <ContactsSection />
        </MaxWidthContainer>
      </div>

      <div className="bg-slate-300 py-1">
        <MaxWidthContainer>
          <div className="flex gap-4 items-center">
            <p className="uppercase font-bold text-slate-800">
              {t("payments")}
            </p>
            <PaymentsBar />
          </div>
        </MaxWidthContainer>
      </div>
      <div className="py-4 bg-neutral-100">
        <BrandsCarousel></BrandsCarousel>
      </div>
    </PageLayout>
  );
}

function CategoriesSection({ categories }: { categories: string[] }) {
  return (
    <div className="bg-neutral-700 shadow-[0px_3px_5px_#00000030] z-10">
      <div className="max-w-screen-3xl mx-auto overflow-hidden">
        <div
          className={twJoin(
            "w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8"
          )}
        >
          {categories.map((key) => (
            <Fragment key={key}>
              <CategoryCard name={key} />
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

/** si può fare meglio? */
const cardColors = [
  "max-md:[&:nth-child(4n)]:bg-[#292929]", // grey
  "max-md:[&:nth-child(4n-1)]:bg-[#131313]", // black
  "max-md:[&:nth-child(4n-2)]:bg-[#E1E1E1] max-md:[&:nth-child(4n-2)]:text-dark", // white
  "max-md:[&:nth-child(4n-3)]:bg-[#B30A0A]", // red

  "md:max-lg:[&:nth-child(3n)]:bg-[#292929]", // grey
  "md:max-lg:[&:nth-child(3n-1)]:bg-[#B30A0A]", // red
  "md:max-lg:[&:nth-child(3n-2)]:bg-[#E1E1E1] md:max-lg:[&:nth-child(3n-2)]:text-dark", // white

  "lg:max-2xl:[&:nth-child(4n)]:bg-[#292929]", // grey
  "lg:max-2xl:[&:nth-child(4n-1)]:bg-[#131313]", // black
  "lg:max-2xl:[&:nth-child(4n-2)]:bg-[#E1E1E1] lg:max-2xl:[&:nth-child(4n-2)]:text-dark", // white
  "lg:max-2xl:[&:nth-child(4n-3)]:bg-[#B30A0A]", // red

  "2xl:[&:nth-child(3n)]:bg-[#292929]", // grey
  "2xl:[&:nth-child(3n-1)]:bg-[#B30A0A]", // red
  "2xl:[&:nth-child(3n-2)]:bg-[#E1E1E1] 2xl:[&:nth-child(3n-2)]:text-dark", // white
];

function CategoryCard({ name }: { name: string }) {
  const { t } = useTranslation("categories");
  return (
    <Link
      data-category-card
      href={routes.category(name)}
      className={twMerge(
        "group relative text-left text-white aspect-video overflow-hidden",
        "max-sm:[&:nth-child(n+5)]:hidden",
        "sm:max-md:[&:nth-child(n+7)]:hidden",
        "md:max-lg:[&:nth-child(n+9)]:hidden",
        "lg:max-xl:[&:nth-child(n+11)]:hidden",
        "xl:max-2xl:[&:nth-child(n+13)]:hidden",
        "2xl:[&:nth-child(n+17)]:hidden",
        cardColors
      )}
      key={name}
    >
      <img
        src={knownCategories[name].image || undefined}
        className={twMerge(
          "absolute bottom-0 right-0 w-full h-full object-contain object-right-bottom z-10",
          "origin-bottom-right scale-95 transition-transform group-hover:scale-100"
        )}
      />
      <Image
        src={imgCarbonFiber}
        alt=""
        className="absolute bottom-0 w-full h-full object-contain object-right-bottom mix-blend-color-dodge"
      />
      <div className="relative h-full p-4 pb-8 pr-[20%] flex flex-col justify-between uppercase leading-[1.1] z-20">
        <p className="font-bold opacity-90 text-lg leading-[1]">
          {t(name) || name}
        </p>
        <p className="text-xs group-hover:underline underline-offset-4">
          view more
        </p>
      </div>
    </Link>
  );
}

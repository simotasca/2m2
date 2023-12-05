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
import { twMerge } from "tailwind-merge";
import ContactsSection from "@/components/ui/ContactsSection";
import Hero from "./Hero";
import { PaymentsBar } from "@/components/ui/PaymentsBar";
import BrandsCarousel from "@/components/ui/BrandsCarousel";

interface Props {
  latestProducts: EcodatArticle[];
  categories: string[];
}

export default function ClientPage({ latestProducts, categories }: Props) {
  return (
    <PageLayout>
      <Hero />

      <CategoriesSection categories={categories} />

      <MaxWidthContainer className="bg-neutral-100 pt-10 pb-10">
        <div className="flex gap-8 items-end">
          <h2 className="font-oswald text-3xl font-semibold uppercase">
            <span className="text-red-700">Featured</span>
            <span className="text-gray-400"> Products</span>
          </h2>
          <Button className="group text-sm bg-transparent border border-slate-500 bg-neutral-50">
            More Products
            <Image
              className="-translate-y-px group-hover:translate-x-0.5 transition-transform duration-100"
              alt=""
              src={iconRight}
            ></Image>
          </Button>
        </div>

        <ProductsGrid
          hidePartialRows={true}
          products={latestProducts}
          className="py-6"
        />
        <div className="mt-10 mb-6">
          <button className="block w-fit px-16 py-4 mx-auto bg-neutral-200 underline underline-offset-4">
            See more Products
          </button>
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
            <p className="uppercase font-bold text-slate-800">PAGAMENTI</p>
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
    <div className="relative grid grid-cols-6 shadow-[0px_3px_5px_#00000030] z-10">
      {categories.slice(0, 12).map((key) => (
        <CategoryCard key={key} name={key} />
      ))}
    </div>
  );
}

const cardColors = [
  "[&:nth-child(4n)]:bg-[#292929]", // grey
  "[&:nth-child(4n-1)]:bg-[#131313]", // black
  "[&:nth-child(4n-2)]:bg-[#E1E1E1] [&:nth-child(4n-2)]:text-dark", // white
  "[&:nth-child(4n-3)]:bg-[#B30A0A]", // red
];

function CategoryCard({ name }: { name: string }) {
  return (
    <Link
      href={routes.category(name)}
      className={twMerge(
        "group relative text-left text-white aspect-video overflow-hidden",
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
      <div className="relative h-full p-4 pb-8 pr-[50%] flex flex-col justify-between uppercase leading-[1.1] z-20">
        <p className="font-bold opacity-90 text-lg leading-[1]">{name}</p>
        <p className="text-xs group-hover:underline underline-offset-4">
          view more
        </p>
      </div>
    </Link>
  );
}

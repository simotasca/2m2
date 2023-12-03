"use client";

import ProductsGrid from "@/components/product/ProductsGrid";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import useTranslation from "@/context/lang/useTranslation";
import PageLayout from "../PageLayout";
import { SearchLayoutProps } from "./props";
import Button from "@/components/ui/Button";
import iconRight from "@/images/icons/right.svg";
import Image from "next/image";
import Breadcrumbs from "@/components/search/Breadcrumbs";

import { Dispatch, useState } from "react";
import { twMerge } from "tailwind-merge";

export default function SearchClientLayout({
  products,
  titleSection,
  children,
}: SearchLayoutProps) {
  const t = useTranslation("");

  const [page, setPage] = useState(1);
  const isLast = page == 10;
  return (
    <PageLayout headerSmall>
      <MaxWidthContainer className="bg-neutral-100">
        {titleSection}

        <div className="h-6"></div>

        <div className="flex justify-start ">
          <Pagination
            isLast={isLast}
            currentPage={page}
            setCurrentPage={setPage}
          />
        </div>

        <ProductsGrid products={products} className="py-6" />

        <div className="flex justify-end pr-4">
          <Pagination
            isLast={isLast}
            currentPage={page}
            setCurrentPage={setPage}
          />
        </div>

        <div className="h-6"></div>

        {children}
      </MaxWidthContainer>
    </PageLayout>
  );
}

function Pagination({
  currentPage,
  setCurrentPage,
  isLast,
}: {
  currentPage: number;
  setCurrentPage: Dispatch<number>;
  isLast: boolean;
}) {
  return (
    <div className="flex gap-2 items-center">
      <Button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage <= 1}
        className={twMerge(
          "group text-sm bg-transparent border border-slate-500 bg-neutral-50 px-1 py-1",
          currentPage <= 1 &&
            "group text-sm bg-transparent border border-slate-400 bg-neutral-50 px-1 py-1"
        )}>
        <Image
          className={twMerge(
            "w-5 -translate-y-px group-hover:-translate-x-0.5 transition-transform duration-100 -scale-x-100 my-auto ",
            currentPage <= 1 && "opacity-70"
          )}
          alt=""
          src={iconRight}
        />
      </Button>
      <span className="oswald text-lg">{currentPage}</span>
      <Button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={isLast}
        className={twMerge(
          "group text-sm bg-transparent border border-slate-500 bg-neutral-50 px-1 py-1",
          isLast &&
            "group text-sm bg-transparent border border-slate-300 bg-neutral-50 px-1 py-1"
        )}>
        <Image
          className={twMerge(
            "w-5 -translate-y-px group-hover:translate-x-0.5 transition-transform duration-100 my-auto ",
            isLast && "opacity-70"
          )}
          alt=""
          src={iconRight}></Image>
      </Button>
    </div>
  );
}

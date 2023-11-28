"use client";

import ProductsGrid from "@/components/product/ProductsGrid";
import Button from "@/components/ui/Button";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import useTranslation from "@/context/lang/useTranslation";
import iconFilters from "@/images/icons/filters.svg";
import { allowedParams } from "@/lib/shared/search";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import PageLayout from "../PageLayout";
import { SearchLayoutProps } from "./props";

export default function SearchClientLayout({
  title,
  products,
}: SearchLayoutProps) {
  const t = useTranslation("");

  const headerExtension = <SearchPageHeader title={title} />;

  return (
    <PageLayout headerSmall headerExtension={headerExtension}>
      <MaxWidthContainer className="bg-neutral-100">
        <ProductsGrid products={products} className="py-6" />
      </MaxWidthContainer>
    </PageLayout>
  );
}

function SearchPageHeader({ title }: any) {
  const searchParams = useSearchParams();
  const filters = () => {
    const params: Map<string, string> = new Map();
    const add = (name: string) => {
      searchParams.has(name) && params.set(name, searchParams.get(name)!);
    };
    allowedParams.forEach(add);
    return Array.from(params);
  };

  return (
    <div className="bg-white shadow shadow-neutral-300">
      <MaxWidthContainer className="pt-2 pb-2 flex items-start gap-4">
        <div className="flex items-end gap-6">
          <h1 className="uppercase font-oswald text-4xl flex gap-2">
            <span className="font-semibold text-red-700">{title[0]}</span>
            <span className="text-neutral-500">{title[1]}</span>
          </h1>
          <Button className="bg-neutral-200 border border-slate-400 font-medium gap-1 mb-0.5">
            <span className="text-sm">Edit Filters</span>
            <Image src={iconFilters} alt="icon filters" className="w-4" />
          </Button>
        </div>
        <div className="flex-1 flex flex-wrap items-start gap-x-2 gap-y-1 justify-end pt-2">
          {filters().map(([key, val], idx) => (
            <div
              key={idx}
              className="rounded border border-neutral-300 px-2.5 py-px font-semibold whitespace-nowrap">
              <span className="text-sm text-neutral-500">{key}: </span>
              <span className="">{val}</span>
            </div>
          ))}
        </div>
      </MaxWidthContainer>
    </div>
  );
}

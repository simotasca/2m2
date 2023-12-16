"use client";

import PaginatedProductsGrid from "@/components/search/PaginatedProductsGrid";
import SearchModalToggle from "@/components/search/SearchModalToggle";
import ContactsSection from "@/components/ui/ContactsSection";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import Title from "@/components/ui/Title";
import useTranslation from "@/context/lang/useTranslation";
import { GenericSearchParams } from "@/lib/server/search";
import { SearchParams } from "@/lib/shared/search";

interface Props {
  searchParams: GenericSearchParams;
  filters: SearchParams;
}

export function ProductsClientPage({ searchParams, filters }: Props) {
  const { t, r } = useTranslation("page");

  return (
    <div className="bg-white pb-4 xs:px-2">
      <MaxWidthContainer className="pt-4">
        <div className="pt-4 max-sm:pt-3 pb-2">
          <div className="flex items-center justify-between gap-x-4 gap-y-2 max-sm:flex-col max-sm:items-start max-sm:justify-start">
            <div />
            <SearchModalToggle />
          </div>
        </div>

        <Title as="h1">
          <Title.Gray>OUR</Title.Gray>
          <Title.Red> PRODUCTS</Title.Red>
        </Title>

        <div className="h-4"></div>

        <PaginatedProductsGrid
          className="py-2"
          searchParams={searchParams}
          query={filters}
        />

        <div className="h-10"></div>

        <div className="max-sm:px-3">
          <ContactsSection />
        </div>

        <div className="h-4"></div>
      </MaxWidthContainer>
    </div>
  );
}

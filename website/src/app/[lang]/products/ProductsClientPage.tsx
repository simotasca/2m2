"use client";

import PaginatedProductsGrid from "@/components/search/PaginatedProductsGrid";
import StyledSearchModalToggle from "@/components/search/StyledSearchModalToggle";
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
    
  );
}

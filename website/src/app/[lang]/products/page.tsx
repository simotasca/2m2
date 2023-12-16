import PaginatedProductsGrid from "@/components/search/PaginatedProductsGrid";
import SearchModalToggle from "@/components/search/SearchModalToggle";
import ContactsSection from "@/components/ui/ContactsSection";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import Title from "@/components/ui/Title";
import PageLayout from "@/layouts/PageLayout";
import ServerLayout from "@/layouts/base/ServerLayout";
import { GenericSearchParams } from "@/lib/server/search";
import { parseSearchParams } from "@/lib/shared/search";
import { ProductsClientPage } from "./ProductsClientPage";

interface Props {
  searchParams: GenericSearchParams;
}

export default async function ProductsPage({ searchParams }: Props) {
  const filters = parseSearchParams(searchParams);
  const translations = {
    page: "pages/products",
    product: "misc/product",
  };

  return (
    <ServerLayout translations={translations}>
      <PageLayout headerSmall>
        <ProductsClientPage searchParams={searchParams} filters={filters} />
      </PageLayout>
    </ServerLayout>
  );
}

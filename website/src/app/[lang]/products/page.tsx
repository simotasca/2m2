import PaginatedProductsGrid from "@/components/search/PaginatedProductsGrid";
import SearchModal from "@/components/search/SearchModal";
import StyledSearchModalToggle from "@/components/search/StyledSearchModalToggle";
import ContactsSection from "@/components/ui/ContactsSection";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import Title from "@/components/ui/Title";
import TranslationClientComponent from "@/context/lang/TranslationClientComponent";
import PageLayout from "@/layouts/PageLayout";
import ClientLayout from "@/layouts/base/ClientLayout";
import { getServerData } from "@/layouts/base/ServerLayout";

import { generateTranslations } from "@/lib/server/lang";
import { GenericSearchParams } from "@/lib/server/search";
import { parseSearchParams } from "@/lib/shared/search";

interface Props {
  searchParams: GenericSearchParams;
}

export default async function ProductsPage({ searchParams }: Props) {
  const filters = parseSearchParams(searchParams);
  const [translations, { t, r }] = await generateTranslations(
    {
      page: "pages/products",
      product: "misc/product",
      contacts: "misc/contacts",
      auth: "auth",
      header: "misc/header",
      "mobile-panel": "misc/mobile-panel",
      search: "misc/search",
      footer: "misc/footer",
      errors: "misc/errors",
    },
    true
  );

  const { cart, favs } = await getServerData();

  return (
    <TranslationClientComponent value={translations}>
      <ClientLayout cart={cart} favourites={favs}>
        <SearchModal></SearchModal>
        <PageLayout headerSmall>
          <div className="bg-white pb-4 xs:px-2">
            <MaxWidthContainer className="max-sm:pt-2 pt-4">
              <div className="pt-4 max-sm:pt-0 pb-2">
                <div className="flex items-center justify-between gap-x-4 gap-y-2 max-sm:flex-col max-sm:items-start max-sm:justify-start">
                  <div />
                  <StyledSearchModalToggle />
                </div>
              </div>

              <div className="max-sm:h-3"></div>

              <Title as="h1">
                <Title.Gray>{r("page.title")}</Title.Gray>
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
        </PageLayout>
      </ClientLayout>
    </TranslationClientComponent>
  );
}

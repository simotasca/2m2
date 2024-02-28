import PaginatedProductsGrid from "@/components/search/PaginatedProductsGrid";
import SearchModal from "@/components/search/SearchModal";
import StyledSearchModalToggle from "@/components/search/StyledSearchModalToggle";
import ContactsSection from "@/components/ui/ContactsSection";
import EngineAssistance from "@/components/ui/EngineAssistance";
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
      "engine-assistance": "misc/engine-assistance",
      errors: "misc/errors",
    },
    true
  );

  const { cart, favs } = await getServerData();

  return (
    <TranslationClientComponent value={translations}>
      <ClientLayout cart={cart} favourites={favs}>
        <SearchModal />

        <PageLayout headerSmall>
          <div className="bg-white pb-4 xs:px-2">
            <MaxWidthContainer className="pt-4">
              <div className="pt-4 max-sm:pt-0 pb-2">
                <div className="flex justify-between flex-wrap-reverse gap-x-4 gap-y-2">
                  <Title as="h1">
                    <Title.Gray>{r("page.title")}</Title.Gray>
                  </Title>
                  <div className="pt-1">
                    <StyledSearchModalToggle />
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <EngineAssistance />
              </div>

              <div className="h-4"></div>

              {/* @ts-expect-error Server Component */}
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

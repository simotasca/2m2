import Breadcrumbs from "@/components/search/Breadcrumbs";
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

import {
  fetchEcodatCategories,
  fetchEcodatItems,
  fetchEcodatTypologies,
} from "@/lib/server/ecodat";
import { generateTranslations } from "@/lib/server/lang";
import type { GenericSearchParams } from "@/lib/server/search";
import { itemName } from "@/lib/shared/ecodat";
import routes from "@/lib/shared/routes";
import { decodeQueryParam } from "@/lib/shared/search";
import { notFound } from "next/navigation";

interface Props {
  params: {
    category: string;
    typology: string;
    item: string;
  };
  searchParams?: GenericSearchParams;
}

export default async function ItemPage({
  params: { category: urlCategory, typology: urlTypology, item: urlItem },
  searchParams,
}: Props) {
  const categories = await fetchEcodatCategories();
  const category = categories.find(
    (c) => c.name.toLowerCase() === decodeQueryParam(urlCategory).toLowerCase()
  );
  if (!category) return notFound();

  const types = await fetchEcodatTypologies(category.id);
  const typology = types.find(
    (t) => t.name.toLowerCase() === decodeQueryParam(urlTypology).toLowerCase()
  );
  if (!typology) return notFound();

  const items = await fetchEcodatItems(category.id, typology.id);
  const item = items.find((i) => {
    return (
      itemName(i).toLowerCase() === decodeQueryParam(urlItem).toLowerCase()
    );
  });
  if (!item) return notFound();

  const [translations, { t }] = await generateTranslations(
    {
      product: "misc/product",
      header: "misc/header",
      "mobile-panel": "misc/mobile-panel",
      search: "misc/search",
      footer: "misc/footer",
      errors: "misc/errors",
      page: "pages/category/typology/item",
      categories: "misc/categories",
      typologies: "misc/typologies",
      contacts: "misc/contacts",
      auth: "auth",
    },
    true
  );

  const bread = [
    {
      text: t(["categories", category.name], category.name),
      href: routes.category(category.name),
      dropdown: categories.map((c) => ({
        text: t(["categories", c.name], c.name),
        href: routes.category(c.name),
      })),
    },
    {
      text: t(["typologies", typology.name], typology.name),
      href: routes.type(category.name, typology.name),
      dropdown: types.map((ty) => ({
        text: t(["typologies", ty.name], ty.name),
        href: routes.type(category.name, ty.name),
      })),
    },
    {
      text: item.name,
      // href: routes.type(category.name, item.name),
      dropdown: items.map((i) => ({
        text: i.name,
        href: routes.item(category.name, typology.name, i.name),
      })),
    },
  ];

  const { cart, favs } = await getServerData();
  return (
    <TranslationClientComponent value={translations}>
      <ClientLayout cart={cart} favourites={favs}>
        <PageLayout headerSmall>
          <SearchModal />

          <div className="bg-white pb-4 xs:px-2g">
            <MaxWidthContainer>
              <div className="pt-4 max-sm:pt-3 pb-2">
                <div className="flex items-center justify-between gap-x-4 gap-y-2 max-sm:flex-col max-sm:items-start max-sm:justify-start">
                  <Breadcrumbs items={bread} />
                  <StyledSearchModalToggle />
                </div>
              </div>

              <div className="max-sm:h-3"></div>

              <Title as="h1">
                <Title.Gray>{t("page.title")}</Title.Gray>
                <Title.Red> {itemName(item)}</Title.Red>
              </Title>

              {category.name === "MOTORE" && (
                <div className="pt-6">
                  <EngineAssistance />
                </div>
              )}

              <div className="h-4"></div>

              <PaginatedProductsGrid
                className="py-2"
                searchParams={searchParams}
                query={{
                  categoryId: category.id,
                  typeId: typology.id,
                  itemId: item.id,
                }}
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

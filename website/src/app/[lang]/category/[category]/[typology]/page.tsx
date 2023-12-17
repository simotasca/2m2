import Breadcrumbs from "@/components/search/Breadcrumbs";
import PaginatedProductsGrid from "@/components/search/PaginatedProductsGrid";
import SearchModal from "@/components/search/SearchModal";
import StyledSearchModalToggle from "@/components/search/StyledSearchModalToggle";
import ContactsSection from "@/components/ui/ContactsSection";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import Title from "@/components/ui/Title";
import PageLayout from "@/layouts/PageLayout";
import ServerLayout from "@/layouts/base/ServerLayout";
import {
  fetchEcodatCategories,
  fetchEcodatItems,
  fetchEcodatTypologies,
} from "@/lib/server/ecodat";
import { generateTranslations } from "@/lib/server/lang";
import { GenericSearchParams } from "@/lib/server/search";
import { itemName } from "@/lib/shared/ecodat";
import routes from "@/lib/shared/routes";
import { decodeQueryParam } from "@/lib/shared/search";
import { notFound } from "next/navigation";

interface Props {
  params: {
    category: string;
    typology: string;
  };
  searchParams: GenericSearchParams;
}

export default async function TypologyPage({
  params: { category: qsCategory, typology: qsTypology },
  searchParams,
}: Props) {
  const categories = await fetchEcodatCategories();
  const category = categories.find(
    (c) => c.name.toLowerCase() === decodeQueryParam(qsCategory).toLowerCase()
  );
  if (!category) return notFound();

  const types = await fetchEcodatTypologies(category.id);
  const typology = types.find(
    (t) => t.name.toLowerCase() === decodeQueryParam(qsTypology).toLowerCase()
  );
  if (!typology) return notFound();

  const items = await fetchEcodatItems(category.id, typology.id);

  const [translations, { t }] = await generateTranslations(
    {
      product: "misc/product",
      header: "misc/header",
      footer: "misc/footer",
      page: "pages/category/typology",
      contacts: "misc/contacts",
      categories: "misc/categories",

      typologies: "misc/typologies",
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
      dropdown: items.map((i) => ({
        text: i.name,
        href: routes.item(category.name, typology.name, itemName(i)),
      })),
    },
  ];

  return (
    <ServerLayout translations={translations}>
      <PageLayout headerSmall>
        <SearchModal />

        <div className="bg-white pb-4 xs:px-2">
          <MaxWidthContainer>
            <div className="pt-4 max-sm:pt-3 pb-2">
              <div className="flex items-center justify-between gap-x-4 gap-y-2 max-sm:flex-col max-sm:items-start max-sm:justify-start">
                <Breadcrumbs items={bread} />
                <StyledSearchModalToggle />
              </div>
            </div>

            <Title as="h1">
              <Title.Gray>{t("page.title")}</Title.Gray>
              <Title.Red>
                {" "}
                {t(["typologies", typology.name], typology.name)}
              </Title.Red>
            </Title>

            <div className="h-4"></div>

            <PaginatedProductsGrid
              className="py-2"
              searchParams={searchParams}
              query={{
                categoryId: category.id,
                typeId: typology.id,
              }}
            />
            <div className="h-10"></div>
            <div className="max-sm:px-3">
              <ContactsSection></ContactsSection>
            </div>
            <div className="h-4"></div>
          </MaxWidthContainer>
        </div>
      </PageLayout>
    </ServerLayout>
  );
}

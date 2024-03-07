import Breadcrumbs from "@/components/search/Breadcrumbs";
import PaginatedProductsGrid from "@/components/search/PaginatedProductsGrid";
import SearchModal from "@/components/search/SearchModal";
import StyledSearchModalToggle from "@/components/search/StyledSearchModalToggle";
import ContactsSection from "@/components/ui/ContactsSection";
import EngineAssistance from "@/components/ui/EngineAssistance";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import Title from "@/components/ui/Title";
import TranslationClientComponent from "@/context/lang/TranslationClientComponent";
import i18n from "@/i18n";
import PageLayout from "@/layouts/PageLayout";
import ClientLayout from "@/layouts/base/ClientLayout";
import { getServerData } from "@/layouts/base/ServerLayout";

import {
  fetchEcodatCategories,
  fetchEcodatItems,
  fetchEcodatTypologies,
} from "@/lib/server/ecodat";
import { generateTranslations, getCurrentLang } from "@/lib/server/lang";
import { GenericSearchParams } from "@/lib/server/search";
import { itemName } from "@/lib/shared/ecodat";
import routes from "@/lib/shared/routes";
import { decodeQueryParam } from "@/lib/shared/search";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface Props {
  params: {
    category: string;
    typology: string;
  };
  searchParams: GenericSearchParams;
}

async function getCategory(qsCategory: string) {
  const categories = await fetchEcodatCategories();
  const category = categories.find(
    (c) => c.name.toLowerCase() === decodeQueryParam(qsCategory).toLowerCase()
  );
  return { categories, category };
}

async function getTypology(qsTypology: string, categoryId: number) {
  const typologies = await fetchEcodatTypologies(categoryId);
  const typology = typologies.find(
    (c) => c.name.toLowerCase() === decodeQueryParam(qsTypology).toLowerCase()
  );
  return { typologies, typology };
}

export async function generateMetadata({
  params: { category: qsCategory, typology: qsTypology },
}: Props): Promise<Metadata> {
  const title = "Tipologie | 2M2 Autoricambi";
  const { category } = await getCategory(qsCategory);
  const { typology } = await getTypology(qsTypology, category!.id);
  const description = "Tipologia:" + typology?.name + category?.name;
  const lang = getCurrentLang();
  const ogImage = "/opengraph.jpg";

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_WEBSITE_HOST!),
    title: title,
    description: description,
    applicationName: "2M2 autoricambi",
    icons: {
      icon: "/favicon.svg",
    },
    openGraph: {
      title: title,
      description: description,
      url: "/",
      siteName: "Next.js",
      images: [ogImage],
      locale: i18n.values.get(lang),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [ogImage], // Must be an absolute URL
    },
  };
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
      "mobile-panel": "misc/mobile-panel",
      search: "misc/search",
      footer: "misc/footer",
      "engine-assistance": "misc/engine-assistance",
      errors: "misc/errors",
      page: "pages/category/typology",
      contacts: "misc/contacts",
      auth: "auth",
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

  const { cart, favs } = await getServerData();

  return (
    <TranslationClientComponent value={translations}>
      <ClientLayout cart={cart} favourites={favs}>
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

              <div className="max-sm:h-3"></div>

              <Title as="h1">
                <Title.Gray>{t("page.title")}</Title.Gray>
                <Title.Red>
                  {" "}
                  {t(["typologies", typology.name], typology.name)}
                </Title.Red>
              </Title>

              {category.name === "MOTORE" && (
                <div className="pt-6">
                  <EngineAssistance />
                </div>
              )}

              <div className="h-4"></div>

              {/* @ts-expect-error Server Component */}
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
      </ClientLayout>
    </TranslationClientComponent>
  );
}

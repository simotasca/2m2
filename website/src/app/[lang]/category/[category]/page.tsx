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
  fetchEcodatTypologies,
} from "@/lib/server/ecodat";
import { generateTranslations } from "@/lib/server/lang";
import { GenericSearchParams } from "@/lib/server/search";
import routes from "@/lib/shared/routes";
import { decodeQueryParam } from "@/lib/shared/search";
import { notFound } from "next/navigation";

interface Props {
  params: {
    category: string;
  };
  searchParams: GenericSearchParams;
}

export default async function CategoryPage({
  params: { category: qsCategory },
  searchParams,
}: Props) {
  const categories = await fetchEcodatCategories();
  const category = categories.find(
    (c) => c.name.toLowerCase() === decodeQueryParam(qsCategory).toLowerCase()
  );
  if (!category) return notFound();

  const types = await fetchEcodatTypologies(category.id);

  const [translations, { t }] = await generateTranslations(
    {
      product: "misc/product",
      header: "misc/header",
search: "misc/search",
      footer: "misc/footer",
      page: "pages/category",
      categories: "misc/categories",
      contacts: "misc/contacts",
auth:"auth",,
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
      dropdown: types.map((t) => ({
        text: t.name,
        href: routes.type(category.name, t.name),
      })),
    },
  ];

  return (
    <ServerLayout translations={translations}>
      <PageLayout headerSmall>
        <SearchModal category={category} />

        <div className="bg-white pb-4">
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
                {t(["categories", category.name], category.name)}
              </Title.Red>
            </Title>

            <div className="h-4"></div>

            <PaginatedProductsGrid
              className="py-2"
              searchParams={searchParams}
              query={{
                categoryId: category.id,
              }}
            />

            <div className="h-10"></div>

            <ContactsSection />

            <div className="h-4"></div>
          </MaxWidthContainer>
        </div>
      </PageLayout>
    </ServerLayout>
  );
}

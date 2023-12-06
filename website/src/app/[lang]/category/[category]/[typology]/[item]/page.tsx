import Breadcrumbs from "@/components/search/Breadcrumbs";
import PaginatedProductsGrid from "@/components/search/PaginatedProductsGrid";
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
import type { SearchParams } from "@/lib/server/search";
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
  searchParams?: SearchParams;
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

  const bread = [
    {
      text: category.name,
      href: routes.category(category.name),
      dropdown: categories.map((c) => ({
        text: c.name,
        href: routes.category(c.name),
      })),
    },
    {
      text: typology.name,
      href: routes.type(category.name, typology.name),
      dropdown: types.map((t) => ({
        text: t.name,
        href: routes.type(category.name, t.name),
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

  return (
    <ServerLayout>
      <PageLayout headerSmall>
        <div className="bg-white pb-4 xs:px-2g">
          <MaxWidthContainer>
            <Breadcrumbs className="py-4" items={bread} />

            <Title as="h1">
              <Title.Gray>Item</Title.Gray>
              <Title.Red> {itemName(item)}</Title.Red>
            </Title>

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
              <ContactsSection></ContactsSection>
            </div>
            <div className="h-4"></div>
          </MaxWidthContainer>
        </div>
      </PageLayout>
    </ServerLayout>
  );
}

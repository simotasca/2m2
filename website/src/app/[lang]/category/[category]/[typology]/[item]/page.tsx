import ProductsGrid from "@/components/product/ProductsGrid";
import Breadcrumbs from "@/components/search/Breadcrumbs";
import Pagination from "@/components/search/Pagination";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import PageLayout from "@/layouts/PageLayout";
import ServerLayout from "@/layouts/base/ServerLayout";
import {
  fetchEcodatArticles,
  fetchEcodatCategories,
  fetchEcodatItems,
  fetchEcodatTypologies,
} from "@/lib/server/ecodat";
import routes from "@/lib/shared/routes";
import { decodeQueryParam } from "@/lib/shared/search";
import { notFound } from "next/navigation";

interface Props {
  params: {
    category: string;
    typology: string;
    item: string;
  };
}

export default async function ItemPage({
  params: { category: urlCategory, typology: urlTypology, item: urlItem },
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
    console.log(
      i.name.toLowerCase() === decodeQueryParam(urlItem).toLowerCase(),
      i.name.toLowerCase(),
      decodeQueryParam(urlItem).toLowerCase()
    );
    return i.name.toLowerCase() === decodeQueryParam(urlItem).toLowerCase();
  });
  if (!item) return notFound();

  const products = await fetchEcodatArticles({
    fetchRow: { nRows: 10, lastRow: 0 },
    categoryId: category.id,
    typeId: typology.id,
    itemId: item.id,
  });

  const breads = [
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
        <div className="bg-white pb-4">
          <MaxWidthContainer>
            <Breadcrumbs items={breads} />

            <h1 className="font-oswald text-3xl font-semibold uppercase">
              <span className="text-gray-500 font-medium">Item</span>
              <span className="text-red-700"> {item.name}</span>
            </h1>

            <div className="h-4"></div>

            <Pagination />
            <ProductsGrid className="py-2" products={products} />
            <Pagination />
          </MaxWidthContainer>
        </div>
      </PageLayout>
    </ServerLayout>
  );
}

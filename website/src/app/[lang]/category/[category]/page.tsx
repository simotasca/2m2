import Button from "@/components/ui/Button";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import iconRight from "@/images/icons/right.svg";
import SearchServerLayout from "@/layouts/search/SearchServerLayout";
import {
  fetchEcodatArticles,
  fetchEcodatCategories,
  fetchEcodatTypologies,
} from "@/lib/server/ecodat";
import { decodeQueryParam } from "@/lib/shared/search";
import Image from "next/image";
import { notFound } from "next/navigation";
import CategoryTypologyProducts from "./CategoryTypologyProducts";
import Breadcrumbs from "@/components/search/Breadcrumbs";
import routes from "@/lib/shared/routes";

interface Props {
  params: {
    category: string;
  };
}

export default async function CategoryPage({
  params: { category: qsCategory },
}: Props) {
  const categories = await fetchEcodatCategories();
  const category = categories.find(
    (c) => c.name.toLowerCase() === decodeQueryParam(qsCategory).toLowerCase()
  );
  if (!category) return notFound();

  const types = await fetchEcodatTypologies(category.id);

  const products = await fetchEcodatArticles({
    fetchRow: { nRows: 10, lastRow: 0 },
    categoryId: category.id,
  });

  return (
    <SearchServerLayout
      products={products}
      titleSection={
        <MaxWidthContainer>
          <Breadcrumbs
            items={[
              {
                text: category.name,
                href: routes.category(category.name),
                dropdown: categories.map((c) => ({
                  text: c.name,
                  href: routes.category(c.name),
                })),
              },
              {
                dropdown: types.map((t) => ({
                  text: t.name,
                  href: routes.type(category.name, t.name),
                })),
              },
            ]}
          />
          <TitleSection category={category} types={types} />
        </MaxWidthContainer>
      }>
      {types.map((t) => (
        <CategoryTypologyProducts categoryId={category.id} type={t} />
      ))}
    </SearchServerLayout>
  );
}

function TitleSection({ category, types }) {
  return (
    <MaxWidthContainer>
      <div className="flex gap-6 pt-2 pb-1">
        <h2 className="font-oswald text-3xl font-semibold uppercase">
          <span className="text-red-700">category</span>
          <span className="text-gray-400"> {category.name}</span>
        </h2>
        <Button className="group text-sm bg-transparent border border-slate-500 bg-neutral-50">
          Filters
          <Image
            className="-translate-y-px group-hover:translate-x-0.5 transition-transform duration-100"
            alt=""
            src={iconRight}></Image>
        </Button>
        <ul className="flex gap-8  items-center font-poppins font-medium mt-auto mb-[2px] ml-auto mr-0">
          {types.map((t) => (
            <li>{t.name}</li>
          ))}
        </ul>
      </div>
    </MaxWidthContainer>
  );
}

function ProductsLine() {
  return (
    <section>
      <h2>Titolo a caso</h2>
    </section>
  );
}

import SearchServerLayout from "@/layouts/search/SearchServerLayout";
import {
  fetchEcodatArticles,
  fetchEcodatCategories,
  fetchEcodatTypologies,
} from "@/lib/server/ecodat";
import { decodeQueryParam } from "@/lib/shared/search";
import { notFound } from "next/navigation";

interface Props {
  params: {
    category: string;
    typology: string;
  };
}

export default async function TypologyPage({
  params: { category: qsCategory, typology: qsTypology },
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

  const products = await fetchEcodatArticles({
    fetchRow: { nRows: 10, lastRow: 0 },
    categoryId: category.id,
    typeId: typology.id,
  });

  return (
    <SearchServerLayout products={products} title={["type", typology.name]} />
  );
}

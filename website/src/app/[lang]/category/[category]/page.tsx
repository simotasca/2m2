import SearchServerLayout from "@/layouts/search/SearchServerLayout";
import {
  fetchEcodatArticles,
  fetchEcodatCategories,
} from "@/lib/server/ecodat";
import { decodeQueryParam } from "@/lib/shared/search";
import { notFound } from "next/navigation";

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

  const products = await fetchEcodatArticles({
    fetchRow: { nRows: 10, lastRow: 0 },
    categoryId: category.id,
  });

  return (
    <SearchServerLayout
      products={products}
      title={["category", category.name]}
    />
  );
}

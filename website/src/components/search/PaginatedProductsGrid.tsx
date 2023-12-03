import { fetchEcodatArticles } from "@/lib/server/ecodat";
import { SearchParams, getCurrentPage } from "@/lib/server/search";
import { RESULTS_PER_PAGE } from "@/lib/shared/search";
import ProductsGrid from "../product/ProductsGrid";
import Pagination from "./Pagination";

interface Props {
  searchParams?: SearchParams;
  query: Omit<Parameters<Awaited<typeof fetchEcodatArticles>>[0], "fetchRow">;
  className?: string;
}

export default async function PaginatedProductsGrid({
  searchParams,
  query,
  className,
}: Props) {
  const currentPage = getCurrentPage(searchParams);

  const products = await fetchEcodatArticles({
    fetchRow: {
      nRows: RESULTS_PER_PAGE + 1,
      lastRow: (currentPage - 1) * RESULTS_PER_PAGE,
    },
    ...query,
  });

  const isLast = products.length <= RESULTS_PER_PAGE;

  return (
    <>
      <Pagination isLast={isLast} />
      <ProductsGrid
        className={className}
        products={products.slice(0, RESULTS_PER_PAGE)}
      />
      <Pagination isLast={isLast} />
    </>
  );
}

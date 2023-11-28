import SearchServerLayout from "@/layouts/search/SearchServerLayout";
import { fetchEcodatArticles } from "@/lib/server/ecodat";
import { allowedParams } from "@/lib/shared/search";

interface Props {
  searchParams: { [key: string]: string };
}

export default async function ProductsPage({ searchParams }: Props) {
  console.log("SEARCH", searchParams);
  const filters = parseSearchParams(searchParams);

  const products = await fetchEcodatArticles({
    fetchRow: { nRows: 10, lastRow: 0 },
    ...filters,
  });

  return (
    <SearchServerLayout products={products} title={["search", "results"]} />
  );
}

function parseSearchParams(params: { [key: string]: string }) {
  let filters: any = {};
  for (const allowed of allowedParams) {
    if (allowed in params) {
      const toInt = parseInt(params[allowed]);
      if (!Number.isNaN(toInt)) {
        filters[allowed] = toInt;
      }
    }
  }
  return filters;
}

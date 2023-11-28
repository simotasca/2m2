import SearchServerLayout from "@/layouts/search/SearchServerLayout";
import { fetchEcodatArticles, fetchEcodatBrands } from "@/lib/server/ecodat";
import { allowedParams, decodeQueryParam } from "@/lib/shared/search";
import { notFound } from "next/navigation";

interface Props {
  params: {
    brand: string;
  };
}

export default async function BrandPage({ params: { brand: qsBrand } }: Props) {
  const brands = await fetchEcodatBrands();

  const brand = brands.find(
    (b) => b.name.toLowerCase() === decodeQueryParam(qsBrand).toLowerCase()
  );

  if (!brand) return notFound();

  const products = await fetchEcodatArticles({
    fetchRow: { nRows: 10, lastRow: 0 },
    brandId: brand.id,
  });

  return (
    <SearchServerLayout products={products} title={["brand", brand.name]} />
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

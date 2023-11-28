import SearchServerLayout from "@/layouts/search/SearchServerLayout";
import {
  fetchEcodatArticles,
  fetchEcodatBrands,
  fetchEcodatModels,
} from "@/lib/server/ecodat";
import { decodeQueryParam } from "@/lib/shared/search";
import { notFound } from "next/navigation";

interface Props {
  params: {
    brand: string;
    model: string;
  };
}

export default async function ModelPage({
  params: { brand: qsBrand, model: qsModel },
}: Props) {
  const brands = await fetchEcodatBrands();
  const brand = brands.find(
    (b) => b.name.toLowerCase() === decodeQueryParam(qsBrand).toLowerCase()
  );
  if (!brand) return notFound();

  const models = await fetchEcodatModels(brand.id);
  const model = models.find(
    (m) => m.name.toLowerCase() === decodeQueryParam(qsModel).toLowerCase()
  );
  if (!model) return notFound();

  const products = await fetchEcodatArticles({
    fetchRow: { nRows: 10, lastRow: 0 },
    brandId: brand.id,
    modelId: model.id,
  });

  return (
    <SearchServerLayout
      products={products}
      title={["model", brand.name + " " + model.name]}
    />
  );
}

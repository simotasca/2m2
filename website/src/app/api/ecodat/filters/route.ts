import {
  fetchEcodatBrands,
  fetchEcodatCategories,
  fetchEcodatModels,
  fetchEcodatTypologies,
} from "@/lib/server/ecodat";
import {
  EcodatBrand,
  EcodatCategory,
  EcodatModel,
  EcodatTypology,
} from "@/lib/shared/ecodat";
import { NextResponse } from "next/server";

// if something throws throws everything
export async function GET() {
  const categoriesWithTypologies: (EcodatCategory & {
    typologies?: EcodatTypology[];
  })[] = await fetchEcodatCategories();

  for (const cat of categoriesWithTypologies) {
    cat.typologies = await fetchEcodatTypologies(cat.id);
  }

  const brandsWithModels: (EcodatBrand & { models?: EcodatModel[] })[] =
    await fetchEcodatBrands();

  for (const brand of brandsWithModels) {
    brand.models = await fetchEcodatModels(brand.id);
  }

  const resBody = JSON.stringify({
    categories: categoriesWithTypologies,
    brands: brandsWithModels,
  });

  return new NextResponse(resBody);
}

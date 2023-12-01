"use server";

import ClientPage from "./ClientPage";
import ServerLayout from "@/layouts/base/ServerLayout";
import { fetchEcodatArticles } from "@/lib/server/ecodat";
import { shuffle } from "@/lib/shared/array";
import { knownCategories } from "@/lib/shared/ecodat";

export default async function HomePage() {
  const latestProducts = await fetchEcodatArticles({
    fetchRow: { nRows: 10, lastRow: 0 },
  });

  const translations = { product: "misc/product", page: "pages/home" };
  const categories = shuffle(shuffle(Object.keys(knownCategories)));

  return (
    <ServerLayout translations={translations}>
      <ClientPage latestProducts={latestProducts} categories={categories} />
    </ServerLayout>
  );
}

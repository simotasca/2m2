"use server";

import ClientPage from "./ClientPage";
import ServerLayout from "@/layouts/base/ServerLayout";
import { fetchEcodatArticles } from "@/lib/server/ecodat";
import { generateTranslations } from "@/lib/server/lang";
import { shuffle } from "@/lib/shared/array";
import { knownCategories } from "@/lib/shared/ecodat";

export default async function HomePage() {
  const latestProducts = await fetchEcodatArticles({
    fetchRow: { nRows: 10, lastRow: 0 },
  });

  const categories = shuffle(shuffle(Object.keys(knownCategories)));

  const [translations] = await generateTranslations({
    product: "misc/product",
    page: "pages/home",
    categories: "misc/categories",
    header: "misc/header",
    contacts: "misc/contacts",
  });

  return (
    <ServerLayout translations={translations}>
      <ClientPage latestProducts={latestProducts} categories={categories} />
    </ServerLayout>
  );
}

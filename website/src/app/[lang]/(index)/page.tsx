"use server";

import { getServerData } from "@/layouts/base/ServerLayout";
import ClientPage from "./ClientPage";
import { fetchEcodatArticles } from "@/lib/server/ecodat";
import { generateTranslations } from "@/lib/server/lang";
import { shuffle } from "@/lib/shared/array";
import { knownCategories } from "@/lib/shared/ecodat";
import TranslationClientComponent from "@/context/lang/TranslationClientComponent";
import ClientLayout from "@/layouts/base/ClientLayout";

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
    "mobile-panel": "misc/mobile-panel",
    search: "misc/search",
    footer: "misc/footer",
    errors: "misc/errors",
    contacts: "misc/contacts",
    auth: "auth",
  });

  const { cart, favs } = await getServerData();

  return (
    <TranslationClientComponent value={translations}>
      <ClientLayout cart={cart} favourites={favs}>
        <ClientPage latestProducts={latestProducts} categories={categories} />
      </ClientLayout>
    </TranslationClientComponent>
  );
}

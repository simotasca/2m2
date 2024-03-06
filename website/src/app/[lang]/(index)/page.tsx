"use server";

import TranslationClientComponent from "@/context/lang/TranslationClientComponent";
import ClientLayout from "@/layouts/base/ClientLayout";
import { getServerData } from "@/layouts/base/ServerLayout";
import { fetchEcodatArticles } from "@/lib/server/ecodat";
import { generateTranslations } from "@/lib/server/lang";
import { knownCategories } from "@/lib/shared/ecodat";
import ClientPage from "./ClientPage";

export default async function HomePage() {
  const latestProducts = await fetchEcodatArticles({
    fetchRow: { nRows: 10, lastRow: 0 },
    disponibile: "disponibile"
  });

  const categories = Object.keys(knownCategories);

  const [translations] = await generateTranslations({
    product: "misc/product",
    page: "pages/home",
    categories: "misc/categories",
    header: "misc/header",
    "mobile-panel": "misc/mobile-panel",
    search: "misc/search",
    footer: "misc/footer",
    "engine-assistance": "misc/engine-assistance",
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

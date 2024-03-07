"use server";

import TranslationClientComponent from "@/context/lang/TranslationClientComponent";
import ClientLayout from "@/layouts/base/ClientLayout";
import { getServerData } from "@/layouts/base/ServerLayout";
import { fetchEcodatArticles } from "@/lib/server/ecodat";
import { generateTranslations, getCurrentLang } from "@/lib/server/lang";
import { knownCategories } from "@/lib/shared/ecodat";
import ClientPage from "./ClientPage";

import { Metadata } from "next";
import i18n from "@/i18n";

export async function generateMetadata() : Promise<Metadata> {
  const title = "2M2 Autoricambi";
  
  const description = "Il migliori ricambi per la tua auto. Semplice, facile e veloce";
  const lang = getCurrentLang();
  const ogImage = "/opengraph.jpg";

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_WEBSITE_HOST!),
    title: title,
    description: description,
    applicationName: "2M2 autoricambi",
    icons: {
      icon: "/favicon.svg",
    },
    openGraph: {
      title: title,
      description: description,
      url: "/",
      siteName: "Next.js",
      images: [ogImage],
      locale: i18n.values.get(lang),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [ogImage], // Must be an absolute URL
    },
  };
}

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

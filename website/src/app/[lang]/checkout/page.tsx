import CheckoutClientPage from "./CheckoutClientPage";
import { notFound } from "next/navigation";
import { fetchEcodatArticle } from "@/lib/server/ecodat";
import { EcodatArticle } from "@/lib/shared/ecodat";
import TranslationClientProvider from "@/context/lang/TranslationClientProvider";
import { generateTranslations, getCurrentLang } from "@/lib/server/lang";
import TranslationClientComponent from "@/context/lang/TranslationClientComponent";
import AuthProvider from "@/context/auth/AuthContext";
import i18n from "@/i18n";
import { Metadata } from "next";

interface Props {
  searchParams: { [key: string]: string };
}

export async function generateMetadata(): Promise<Metadata> {
  const title = "Checkout | 2M2 Autoricambi";
  
  const description = "Checkout 2m2 autoricambi";
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

export default async function CheckoutPage({ searchParams }: Props) {
  const productIds = decodeURIComponent(searchParams["p"])
    ?.split(",")
    .filter((id) => !!id)
    ?.map((id) => parseInt(id));

  if (!searchParams["p"] || !productIds[0]) {
    return notFound();
  }

  const products: EcodatArticle[] = [];
  for (const id of productIds) {
    const product = await fetchEcodatArticle(id).catch(() => null);
    if (!product) continue;
    products.push(product);
  }

  if (!products.length) {
    return notFound();
  }

  const [translations] = await generateTranslations({
    product: "misc/product",
    header: "misc/header",
    "mobile-panel": "misc/mobile-panel",
    search: "misc/search",
    footer: "misc/footer",
    "engine-assistance": "misc/engine-assistance",
    errors: "misc/errors",
    page: "pages/checkout",
  });

  return (
    <TranslationClientComponent value={translations}>
      <AuthProvider>
        <CheckoutClientPage products={products} />
      </AuthProvider>
    </TranslationClientComponent>
  );
}

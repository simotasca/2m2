import AuthProvider from "@/context/auth/AuthContext";
import TranslationClientComponent from "@/context/lang/TranslationClientComponent";
import { fetchEcodatArticle } from "@/lib/server/ecodat";
import { generateTranslations } from "@/lib/server/lang";
import { EcodatArticle } from "@/lib/shared/ecodat";
import { notFound } from "next/navigation";
import CheckoutClientPage from "./CheckoutClientPage";

interface Props {
  searchParams: { [key: string]: string };
}

export async function generateMetadata() {
  return {
    title: "Checkout",
    robots: { index: false },
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

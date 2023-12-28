import CheckoutClientPage from "./CheckoutClientPage";
import { notFound } from "next/navigation";
import { fetchEcodatArticle } from "@/lib/server/ecodat";
import { EcodatArticle } from "@/lib/shared/ecodat";
import TranslationClientProvider from "@/context/lang/TranslationClientProvider";
import { generateTranslations } from "@/lib/server/lang";
import TranslationClientComponent from "@/context/lang/TranslationClientComponent";
import AuthProvider from "@/context/auth/AuthContext";

interface Props {
  searchParams: { [key: string]: string };
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
    const product = await fetchEcodatArticle(id);
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

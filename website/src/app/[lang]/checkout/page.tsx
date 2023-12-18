import CheckoutClientPage from "./CheckoutClientPage";
import { notFound } from "next/navigation";
import { fetchEcodatArticle } from "@/lib/server/ecodat";
import { EcodatArticle } from "@/lib/shared/ecodat";
import TranslationClientProvider from "@/context/lang/TranslationClientProvider";
import { generateTranslations } from "@/lib/server/lang";
import TranslationClientComponent from "@/context/lang/TranslationClientComponent";

interface Props {
  searchParams: { [key: string]: string };
}

export default async function CheckoutPage({ searchParams }: Props) {
  const productIds = decodeURIComponent(searchParams["p"])
    ?.split(",")
    ?.map((i) => parseInt(i));

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
    search: "misc/search",
    footer: "misc/footer",
    page: "pages/checkout",
    errors: "misc/errors",
  });

  return (
    <TranslationClientComponent value={translations}>
      <CheckoutClientPage products={products} />
    </TranslationClientComponent>
  );
}

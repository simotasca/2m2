import CheckoutClientPage from "./CheckoutClientPage";
import { notFound } from "next/navigation";
import { fetchEcodatArticle } from "@/lib/server/ecodat";
import { EcodatArticle } from "@/lib/shared/ecodat";

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

  return <CheckoutClientPage products={products} />;
}

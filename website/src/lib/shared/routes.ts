import { EcodatArticle, productName } from "./ecodat";
import { encodeQueryParam } from "./search";

type UrlProduct = Pick<EcodatArticle, "item" | "brand" | "model" | "id">;

const routes = {
  home: () => "/",
  about: () => "/about",
  brand: (name: string) => `/brand/` + encodeQueryParam(name.toLowerCase()),
  category: (name: string) =>
    `/category/${encodeQueryParam(name.toLowerCase())}`,
  product: (product: UrlProduct) =>
    `/products/${encodeQueryParam(productName(product))}-${product.id}`,
} as const;

export default routes;

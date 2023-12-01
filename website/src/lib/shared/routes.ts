import { EcodatArticle, productName } from "./ecodat";
import { encodeQueryParam } from "./search";

type UrlProduct = Pick<EcodatArticle, "item" | "brand" | "model" | "id">;

const routes = {
  home: () => "/",
  about: () => "/about",
  brand: (name: string) => `/brand/` + encodeQueryParam(name.toLowerCase()),
  category: (name: string) =>
    `/category/${encodeQueryParam(name.toLowerCase())}`,
  type: (category: string, name: string) =>
    `/category/${encodeQueryParam(category.toLowerCase())}/${encodeQueryParam(
      name.toLowerCase()
    )}`,
  /** TODO: manage filters */
  products: () => "/products",
  product: (product: UrlProduct) =>
    `/products/${encodeQueryParam(productName(product).toLowerCase())}-${
      product.id
    }`,
} as const;

export default routes;

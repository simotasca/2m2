import type { EcodatArticle } from "./ecodat";
import { productName } from "./ecodat";
import type { SearchParams } from "./search";
import { encodeQueryParam, searchQueryString } from "./search";

type UrlProduct = Pick<EcodatArticle, "item" | "brand" | "model" | "id">;

const routes = {
  home: () => "/",
  about: () => "/about",

  products: (filters?: SearchParams) =>
    "/products" + searchQueryString(filters),
  product: (product: UrlProduct) =>
    `/products/${enc(productName(product))}-${product.id}`,

  brand: (name: string) => `/brand/${enc(name)}`,
  model: (brand: string, name: string) => `/brand/${enc(brand)}/${enc(name)}`,

  category: (name: string) => `/category/${enc(name)}`,
  type: (category: string, name: string) =>
    `/category/${enc(category)}/${enc(name)}`,
  item: (category: string, type: string, name: string) =>
    `/category/${enc(category)}/${enc(type)}/${enc(name)}`,

  login: () => "/login",
  register: () => "/register",
  passwordReset: () => "/reset-password",
  reserved: () => "/reserved",
  terms: () => "/conditions/terms-and-conditions",
  privacy: () => "/conditions/privacy",
  cookie: () => "/conditions/cookie-policy",
} as const;

export default routes;

function enc(val: string) {
  return encodeQueryParam(val.toLowerCase());
}

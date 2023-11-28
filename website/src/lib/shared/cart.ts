import { EcodatArticle } from "./ecodat";

export type CartProduct = Pick<
  EcodatArticle,
  "id" | "item" | "brand" | "model" | "price" | "oeCode"
>;

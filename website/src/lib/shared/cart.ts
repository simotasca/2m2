import { EcodatArticle } from "./ecodat";

export type CartProduct = Pick<
  EcodatArticle,
  "id" | "item" | "brand" | "model" | "price" | "oeCode"
>;

export function toCartProduct(p: EcodatArticle) {
  return {
    id: p.id,
    item: p.item,
    brand: p.brand,
    model: p.model,
    price: p.price,
    oeCode: p.oeCode,
  };
}

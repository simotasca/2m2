export interface EcodatArticle {
  id: number;
  price: number;
  description: string;
  notes: string;
  category: string;
  categoryId: number;
  type: string;
  typeId: number;
  item: string;
  itemId: number;
  brand: string;
  brandId: number;
  model: string;
  modelId: number;
  version: string;
  new: boolean;
  available: boolean;
  altDescription: string;
  oeCode: string;
  engine: string;
  yearFrom: number;
  yearTo: number;
  displacement?: string;
  power?: string;
  nPorte?: string;
  Km?: string;
}

export interface EcodatCategory {
  id: number;
  name: string;
}

export interface EcodatTypology {
  id: number;
  name: string;
}

export interface EcodatBrand {
  id: number;
  name: string;
}

export interface EcodatModel {
  id: number;
  name: string;
}

export function productName(
  product: Pick<EcodatArticle, "item" | "brand" | "model">
) {
  return [product.item, product.brand, product.model].join(" ");
}

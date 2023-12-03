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
  psYear?: string;
  /** Cilindrata */
  displacement?: string;
  /** Alimentazione */
  power?: string;
  nDoors?: number;
  Km?: number;
}

export interface EcodatCategory {
  id: number;
  name: string;
}

export interface EcodatTypology {
  id: number;
  name: string;
}

export interface EcodatItem {
  id: number;
  name: string;
  /** Ap: post/ant */
  position?: string;
  side?: string;
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

export function itemName(item: Pick<EcodatItem, "name" | "position" | "side">) {
  return [item.name, item.position, item.side].join(" ");
}

export const knownCategories = {
  "Allestimenti interni": { image: "/assets/category-images/allestimenti.png" },
  Assale: { image: "/assets/category-images/assale.png" },
  "Cambio e Trasmissione": { image: "/assets/category-images/cambio.png" },
  Cristalli: { image: "/assets/category-images/cristalli.png" },
  Fanaleria: { image: "/assets/category-images/fanaleria.png" },
  "Impianto elettrico": { image: "/assets/category-images/batteria.png" },
  "Impianto frenante": { image: "/assets/category-images/freni.png" },
  "Lamierati esterni": {
    image: "/assets/category-images/lamierati-esterni.png",
  },
  "Lamierati interni": {
    image: "/assets/category-images/lamierati-interni.png",
  },
  "Manutazione Ordinaria": {
    image: "/assets/category-images/manutenzione.png",
  },
  Motore: { image: "/assets/category-images/motore.png" },
  "Scarico e Iniezione": { image: "/assets/category-images/scarico.png" },
  Selleria: { image: "/assets/category-images/selleria.png" },
  Sicurezza: { image: "/assets/category-images/sicurezza.png" },
  Sterzo: { image: "/assets/category-images/sterzo.png" },
  Termico: { image: "/assets/category-images/termico.png" },
} as const;

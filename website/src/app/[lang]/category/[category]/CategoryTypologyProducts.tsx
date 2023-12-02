"use client";

import ProductsGrid from "@/components/product/ProductsGrid";
import { EcodatArticle, EcodatTypology } from "@/lib/shared/ecodat";
import { useEffect, useState } from "react";

export default function CategoryTypologyProducts({
  categoryId,
  type,
}: {
  categoryId: number;
  type: EcodatTypology;
}) {
  const [products, setProducts] = useState<EcodatArticle[]>([]);

  useEffect(() => {
    fetch(`/api/ecodat/products/by-type/${categoryId}/${type.id}`)
      .then((res) => res.json())
      .then(setProducts)
      .catch((err) =>
        console.error("Error fetching ecodat articles by typology", err.message)
      );
  }, []);

  if (products.length === 0) return <></>;

  return (
    <div>
      <h3>{type.name}</h3>
      <ProductsGrid products={products} />
    </div>
  );
}

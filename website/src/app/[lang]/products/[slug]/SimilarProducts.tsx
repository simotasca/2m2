"use client";

import ProductsGrid from "@/components/product/ProductsGrid";
import { EcodatArticle } from "@/lib/shared/ecodat";
import { useEffect, useState } from "react";

export default function SimilarProducts({
  product,
}: {
  product: EcodatArticle;
}) {
  const [sameItem, setSameItem] = useState<EcodatArticle[]>([]);
  const [sameBrand, setSameBrand] = useState<EcodatArticle[]>([]);

  useEffect(() => {
    fetch("/api/ecodat/products", {
      method: "POST",
      body: JSON.stringify({
        categoryId: product.categoryId,
        typeId: product.typeId,
        itemId: product.itemId,
        fetchRow: {
          lastRow: 0,
          nRows: 5,
        },
      }),
    })
      .then((res) => res.json())
      .then((prods: EcodatArticle[]) =>
        prods.filter((p) => p.id !== product.id).slice(0, 4)
      )
      .then(setSameItem)
      .catch((e) =>
        console.error(
          "Error fetching similar products by itemId, for product " +
            product.id +
            ":",
          e.message
        )
      );

    fetch("/api/ecodat/products", {
      method: "POST",
      body: JSON.stringify({
        brandId: product.brandId,
        modelId: product.modelId,
        fetchRow: {
          lastRow: 0,
          nRows: 5,
        },
      }),
    })
      .then((res) => res.json())
      .then((prods: EcodatArticle[]) =>
        prods.filter((p) => p.id !== product.id).slice(0, 4)
      )
      .then(setSameBrand)
      .catch((e) =>
        console.error(
          "Error fetching similar products by modelId, for product " +
            product.id +
            ":",
          e.message
        )
      );
  }, []);
  return (
    <div>
      <h3>{product.item}</h3>
      <ProductsGrid products={sameItem} />
      <h3>{product.model}</h3>
      <ProductsGrid products={sameBrand} />
    </div>
  );
}

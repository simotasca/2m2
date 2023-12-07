"use client";

import iconRight from "@/images/icons/right.svg";
import ProductsGrid from "@/components/product/ProductsGrid";
import { EcodatArticle, itemName } from "@/lib/shared/ecodat";
import { useEffect, useState } from "react";
import iconBrand from "@/images/icons/sell.svg";
import iconCategory from "@/images/icons/widgets.svg";
import Image from "next/image";
import Button from "@/components/ui/Button";
import routes from "@/lib/shared/routes";

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
    <div className="flex flex-col gap-12">
      {!!sameItem.length && (
        <div>
          <div className="grid grid-cols-[auto_auto_1fr] sm:flex items-center gap-2 mb-4">
            <Image className="w-7 -mb-0.5" src={iconBrand} alt="" />
            <h3 className="text-xl leading-[0.9] font-bold uppercase">
              <span>Altri ricambi in</span>
              <span className="text-red-500">{product.item}</span>
            </h3>

            <a href={routes.item(product.category, product.type, product.item)}>
              <Button className="group text-sm bg-transparent border border-slate-500 bg-neutral-50 ml-8 py-0.5">
                spanSee All
                <Image
                  className="-translate-y-px group-hover:translate-x-0.5 transition-transform duration-100"
                  alt=""
                  src={iconRight}
                ></Image>
              </Button>
            </a>
          </div>
          <ProductsGrid products={sameBrand} />
        </div>
      )}
      {!!sameBrand.length && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Image className="w-7 -mb-0.5" src={iconBrand} alt="" />
            <h3 className="text-xl leading-[0.9] font-bold uppercase">
              <span>Altro da</span>
              <span className="text-red-500">{` ${product.brand} + ${product.model}`}</span>
            </h3>
            <a href={routes.model(product.brand, product.model)}>
              <Button className="max-xs:hidden group text-sm bg-transparent border border-slate-500 bg-neutral-50 flex-shrink-0 ml-8 py-0.5">
                <span className="flex-shrink-0">See All</span>
                <Image
                  className="max-sm:hidden -translate-y-px group-hover:translate-x-0.5 transition-transform duration-100"
                  alt=""
                  src={iconRight}
                ></Image>
              </Button>
            </a>
          </div>
          <a href={routes.model(product.brand, product.model)}>
            <Button className="xs:hidden group text-sm bg-transparent border border-slate-500 bg-neutral-50 flex-shrink-0 ml-auto mr-0 py-0.5 mb-2 -mt-2">
              <span className="flex-shrink-0">See All</span>
              <Image
                className="max-sm:hidden -translate-y-px group-hover:translate-x-0.5 transition-transform duration-100"
                alt=""
                src={iconRight}
              ></Image>
            </Button>
          </a>
          <ProductsGrid products={sameBrand} />
        </div>
      )}
    </div>
  );
}

"use client";

import ProductsGrid from "@/components/product/ProductsGrid";
import Button from "@/components/ui/Button";
import useTranslation from "@/context/lang/useTranslation";
import iconRight from "@/images/icons/right.svg";
import iconBrand from "@/images/icons/sell.svg";
import { EcodatArticle } from "@/lib/shared/ecodat";
import routes from "@/lib/shared/routes";
import Image from "next/image";
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
        disponibile: "disponibile",
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
        disponibile: "disponibile",
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

  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-12">
      {!!sameItem.length && (
        <div>
          <div className="flex items-center max-sm:flex-wrap gap-2 mb-4">
            <div className="flex items-center gap-2">
              <Image className="w-7 -mb-0.5" src={iconBrand} alt="" />

              <h3 className="text-xl leading-[1] max-xs:text-lg max-xs:leading-[1] max-xs:mb-1 font-bold uppercase">
                <span>{t("page.similar-products.other-item")} </span>
                <span className="text-red-500">{product.item}</span>
              </h3>
            </div>

            <a
              className="flex-shrink-0 max-xs:pl-1"
              href={routes.item(product.category, product.type, product.item)}>
              <Button className="group text-sm bg-transparent border border-slate-500 bg-neutral-50 ml-8 py-0.5">
                <span className="flex-shrink-0">
                  {t("page.similar-products.see-all")}
                </span>
                <Image
                  className="-translate-y-px group-hover:translate-x-0.5 transition-transform duration-100"
                  alt=""
                  src={iconRight}></Image>
              </Button>
            </a>
          </div>

          <ProductsGrid products={sameBrand} />
        </div>
      )}
      {!!sameBrand.length && (
        <div>
          <div className="flex items-center max-sm:flex-wrap gap-2 mb-4">
            <div className="flex items-center gap-2">
              <Image className="w-7 -mb-0.5" src={iconBrand} alt="" />

              <h3 className="text-xl leading-[1] max-xs:text-lg max-xs:leading-[1] max-xs:mb-1 font-bold uppercase">
                <span>{t("page.similar-products.other-product")} </span>
                <span className="text-red-500">{` ${product.brand} + ${product.model}`}</span>
              </h3>
            </div>

            <a
              className="flex-shrink-0 max-xs:pl-1"
              href={routes.model(product.brand, product.model)}>
              <Button className="group text-sm bg-transparent border border-slate-500 bg-neutral-50 ml-8 py-0.5">
                <span className="flex-shrink-0">
                  {t("page.similar-products.see-all")}
                </span>
                <Image
                  className="-translate-y-px group-hover:translate-x-0.5 transition-transform duration-100"
                  alt=""
                  src={iconRight}></Image>
              </Button>
            </a>
          </div>

          <ProductsGrid products={sameBrand} />
        </div>
      )}
    </div>
  );
}

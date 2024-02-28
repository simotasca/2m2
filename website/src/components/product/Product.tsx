"use client";

import Link from "@/components/navigation/Link";
import useCart from "@/context/cart/useCart";
import useFavourites from "@/context/favourites/useFavourites";
import useTranslation from "@/context/lang/useTranslation";
import iconLoader from "@/images/icons/loader.svg";
import iconCart from "@/images/icons/white/cart.svg";
import iconFavourite from "@/images/icons/white/favourite.svg";
import iconNotFavourite from "@/images/icons/white/not-favourite.svg";
import { CartProduct } from "@/lib/shared/cart";
import { productName } from "@/lib/shared/ecodat";
import routes from "@/lib/shared/routes";
import Image from "next/image";
import { twJoin, twMerge } from "tailwind-merge";
import Button from "../ui/Button";
import FavouritesToggle from "./FavouritesToggle";
import ProductImage from "./ProductImage";
import { useMemo } from "react";

interface Props {
  product: CartProduct;
}

export default function Product({ product }: Props) {
  const { t } = useTranslation("product");
  const { addProduct, removeProduct, hasProduct, loading } = useCart();
  const { isFavourite } = useFavourites();
  const hasPrice = product.price > 0;

  return (
    <Link
      href={routes.product(product)}
      className="group focus:outline-none cursor-pointer">
      <div className="flex flex-col h-full px-3 pt-2 pb-4 bg-white shadow-md border border-neutral-300 group-hover:border-[rgb(180,180,180)] rounded group-focus:border-red-400">
        <span className="text-xs font-semibold capitalize">
          {t("code")} {"#" + (product.oeCode || "")}
        </span>
        <ProductImage
          photo={product && { productId: product?.id }}
          className="-mx-3"
        />
        <b className="font-bold mt-2 leading-[1.2] text-center group-hover:underline">
          {productName(product)}
        </b>
        <div className="my-auto text-center">
          <p
            className={twJoin(
              "pb-2.5 pt-2 text-red-600 leading-[1]",
              hasPrice ? "text-xl font-bold" : "font-semibold"
            )}>
            {hasPrice
              ? String(product.price.toFixed(2)) + "€"
              : "richiedi un preventivo"}
          </p>
        </div>
        <div className="flex gap-1">
          {!hasPrice ? (
            <Button
              onClick={(e) => {
                e.preventDefault();
                location.hash = "contacts";
              }}
              className="w-full rounded-sm py-0 text-sm bg-red-gradient text-white border-0">
              Contattaci
            </Button>
          ) : (
            <Button
              disabled={loading}
              onClick={(e) => {
                e.preventDefault();
                hasProduct(product)
                  ? removeProduct(product)
                  : addProduct(product);
              }}
              className={twJoin(
                "w-full rounded-sm py-0 text-sm",
                hasProduct(product)
                  ? "bg-white text-red-600 border-2 border-red-600"
                  : "bg-red-gradient text-white border-0"
              )}>
              {hasProduct(product) ? (
                <span>Remove</span>
              ) : (
                <>
                  {loading ? (
                    <Image
                      className="w-5 animate-spin invert"
                      src={iconLoader}
                      alt=""
                    />
                  ) : (
                    <Image
                      className="w-5 translate-y-px"
                      src={iconCart}
                      alt=""
                    />
                  )}
                  <span>{t("addToCart")}</span>
                </>
              )}
            </Button>
          )}

          <FavouritesToggle
            product={product}
            className="bg-red-600 rounded-sm aspect-square relative">
            <Image
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[calc(50%-1px)] w-[55%]"
              src={isFavourite(product) ? iconFavourite : iconNotFavourite}
              alt=""
            />
          </FavouritesToggle>
        </div>
      </div>
    </Link>
  );
}

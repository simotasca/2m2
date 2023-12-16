"use client";

import useCart from "@/context/cart/useCart";
import useTranslation from "@/context/lang/useTranslation";
import iconCart from "@/images/icons/white/cart.svg";
import iconFavourite from "@/images/icons/white/favourite.svg";
import { CartProduct } from "@/lib/shared/cart";
import { productName } from "@/lib/shared/ecodat";
import { encodeQueryParam } from "@/lib/shared/search";
import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import Button from "../ui/Button";
import ProductImage from "./ProductImage";
import routes from "@/lib/shared/routes";

interface Props {
  product: CartProduct;
}

export default function Product({ product }: Props) {
  const { t } = useTranslation("product");
  const { addProduct, removeProduct, hasProduct, loading } = useCart();

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
        <div className="text-red-600 text-xl font-bold my-auto text-center">
          <p className="pb-2.5 pt-2">{product.price.toFixed(2)}€</p>
        </div>
        <div className="flex gap-1">
          <Button
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              hasProduct(product)
                ? removeProduct(product)
                : addProduct(product);
            }}
            className={twMerge(
              "w-full rounded-sm border-2 py-0 text-sm",
              hasProduct(product)
                ? "bg-white text-red-600 border-red-600"
                : "bg-red-gradient text-white border-0"
            )}>
            {hasProduct(product) ? (
              <span>Remove</span>
            ) : (
              <>
                <Image className="w-5 translate-y-px" src={iconCart} alt="" />
                <span>{t("addToCart")}</span>
              </>
            )}
          </Button>
          <Button
            onClick={(e) => e.preventDefault()}
            className="bg-red-600 rounded-sm aspect-square relative">
            <Image
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[calc(50%-1px)] w-[55%]"
              src={iconFavourite}
              alt=""
            />
          </Button>
        </div>
      </div>
    </Link>
  );
}

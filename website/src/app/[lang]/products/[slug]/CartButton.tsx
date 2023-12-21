"use client";

import Button from "@/components/ui/Button";
import Image from "next/image";
import iconCart from "@/images/icons/white/cart.svg";
import useCart from "@/context/cart/useCart";
import useTranslation from "@/context/lang/useTranslation";
import { CartProduct } from "@/lib/shared/cart";

interface Props {
  product: CartProduct;
}

export default function CartButton({ product }: Props) {
  const { hasProduct, addProduct, removeProduct } = useCart();
  const { t } = useTranslation();
  return (
    <Button
      onClick={() =>
        hasProduct(product) ? removeProduct(product) : addProduct(product)
      }
      className="w-full text-sm bg-gradient-to-br from-red-700 to-red-500 text-white py-2 pb-1.5"
    >
      <div className="child:-translate-x-2 contents">
        <Image className="w-6 translate-y-px" src={iconCart} alt="icon-cart" />
        <span>
          {hasProduct(product) ? "rimuovi" : t("page.buy-section.add-to-cart")}
        </span>
      </div>
    </Button>
  );
}

"use client";

import iconClose from "@/images/icons/close.svg";
import useCart from "@/context/cart/useCart";
import { productName } from "@/lib/shared/ecodat";
import Image from "next/image";

export default function CartList() {
  const { count, cart, removeProduct } = useCart();
  return (
    <>
      <div className="flex flex-col gap-2">
        {count === 0 && (
          <p className="text-sm text-neutral-600 ml-1">your cart is empty</p>
        )}
        {cart.map((product) => (
          <div
            key={product.id}
            className="group grid grid-cols-[1fr_auto_auto] gap-2 pr-3">
            <div>
              <p className="font-semibold text-sm leading-[1.1]">
                {productName(product)}
              </p>
              <p className="leading-[1] text-neutral-600 text-xs">
                #{product.oeCode}
              </p>
            </div>
            <p className="text-neutral-700 text-sm leading-[1.2] font-bold pr-2">
              {product.price.toFixed(2)} €
            </p>
            <div className="pr-1">
              <button onClick={() => removeProduct(product)}>
                <Image
                  src={iconClose}
                  alt="close icon"
                  className="w-4 opacity-60"
                />
              </button>
            </div>
            <div className="group-last:hidden col-span-full h-px bg-neutral-300"></div>
          </div>
        ))}
      </div>
    </>
  );
}

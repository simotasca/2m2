"use client";

import useCart from "@/context/cart/useCart";
import iconClose from "@/images/icons/close.svg";
import { productName } from "@/lib/shared/ecodat";
import Image from "next/image";
import qs from "qs";
import { useEffect } from "react";
import { twMerge } from "tailwind-merge";
import Button from "../ui/Button";
import CartList from "./CartList";

export default function CartPanel() {
  const { isOpen, setIsOpen, count, total, cart, removeProduct, loading } =
    useCart();

  useEffect(() => {
    if (isOpen) {
      document.documentElement.classList.add("cart-is-open");
    } else {
      document.documentElement.classList.remove("cart-is-open");
    }
  }, [isOpen]);

  return (
    <>
      <div
        onClick={() => setIsOpen(false)}
        className={twMerge(
          "fixed inset-0 w-screen h-screen bg-black bg-opacity-40 z-[51]",
          !isOpen && "hidden"
        )}></div>
      <div
        className={twMerge(
          "fixed top-0 left-full z-[52] bg-white w-80 h-screen transition-transform shadow-md shadow-neutral-800",
          isOpen ? "-translate-x-full" : "translate-x-0"
        )}>
        {/* il pr-4 viene messo negli elementi all'interno per evitare sovrapposizioni con la scrollbar di firefox */}
        <div className="flex flex-col max-h-full text-dark pl-4 pt-4 pb-3 overflow-hidden">
          <div className="pr-4 mb-1">
            <div className="flex items-center gap-2">
              <p className="font-bold uppercase text-lg">CART</p>
              <p className="font-medium text-sm text-neutral-500 translate-y-px">
                <span className="text-xs">(</span>
                <span>{count} products</span>
                <span className="text-xs">)</span>
              </p>
              <div
                className="ml-auto cursor-pointer"
                onClick={() => setIsOpen(false)}>
                <Image src={iconClose} alt="close icon" className="w-6" />
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto mt-2">
            <CartList />
          </div>

          <div className="pr-4 w-full mt-1">
            <p className="text-right font-bold">
              <span className="font-medium text-sm mr-1 text-neutral-600">
                total:
              </span>
              {total.toFixed(2)} €
            </p>
            {count > 0 && (
              <a
                href={
                  "/checkout?p=" +
                  encodeURIComponent([cart.map((p) => p.id)].join(","))
                }>
                <Button className="block mt-2 bg-red-gradient text-white w-full uppercase">
                  CHECKOUT
                </Button>
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

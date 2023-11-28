"use client";

import Header from "@/components/header/Header";
import CartProvider from "@/context/cart/CartProvider";
import { EcodatArticle } from "@/lib/shared/ecodat";
import { PropsWithChildren } from "react";

interface CartInit {
  products: EcodatArticle[];
  id?: number;
}

type Props = PropsWithChildren<{ cart: CartInit }>;

export default function ClientLayout({ cart, children }: Props) {
  return (
    <>
      <CartProvider cartId={cart.id} cartProducts={cart.products}>
        {children}
      </CartProvider>
    </>
  );
}

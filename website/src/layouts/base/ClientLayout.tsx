"use client";

import AuthProvider from "@/context/auth/AuthContext";
import CartProvider from "@/context/cart/CartProvider";
import FavouritesProvider from "@/context/favourites/FavouritesContext";
import SearchProvider from "@/context/search/SearchProvider";
import { PropsWithChildren } from "react";

interface CartInit {
  products: string[];
  id?: number;
}

type Props = PropsWithChildren<{ cart: CartInit; favourites: number[] }>;

export default function ClientLayout({ cart, children, favourites }: Props) {
  return (
    <AuthProvider>
      <CartProvider cartId={cart.id} cartProductIds={cart.products}>
        <FavouritesProvider initialFavourites={favourites}>
          <SearchProvider>{children}</SearchProvider>
        </FavouritesProvider>
      </CartProvider>
    </AuthProvider>
  );
}

"use client";

import CartProvider from "@/context/cart/CartProvider";
import FavouritesProvider, {
  FavouritesContext,
} from "@/context/favourites/FavouritesProvider";
import SearchProvider from "@/context/search/SearchProvider";
import { EcodatArticle } from "@/lib/shared/ecodat";
import { PropsWithChildren } from "react";

interface CartInit {
  products: EcodatArticle[];
  id?: number;
}

type Props = PropsWithChildren<{ cart: CartInit; favourites: number[] }>;

export default function ClientLayout({ cart, children, favourites }: Props) {
  return (
    <>
      <CartProvider cartId={cart.id} cartProducts={cart.products}>
        <FavouritesProvider initialFavourites={favourites}>
          <SearchProvider>{children}</SearchProvider>
        </FavouritesProvider>
      </CartProvider>
    </>
  );
}

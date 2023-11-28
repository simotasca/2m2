"use client";

import { Database } from "@/database.types";
import { CookieCart } from "@/lib/client/cart";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { PropsWithChildren, useEffect, useState } from "react";
import { CartContext } from ".";
import { CartProduct } from "@/lib/shared/cart";

/**
 * NOTA!
 * Il carrello verifica se un utente è loggato all'inizializzazione della pagina
 * e non imposta dei listener per vedere se ci sono dei cambiamenti di stato.
 * Ciò significa che non possono essere eseguiti login senza refresh della pagina!!
 * Per valutare un comportamento differente capire come funzionano gli hook di supabase
 * (se è una websocket eviterei)
 */
function CartProvider({
  children,
  cartProducts,
  cartId,
}: PropsWithChildren<{ cartId?: number; cartProducts: CartProduct[] }>) {
  const supabase = createClientComponentClient<Database>();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState<CartProduct[]>(cartProducts);
  const isLogged = cartId !== undefined;

  const hasProduct = (product: CartProduct) => {
    return !!cart.find((c) => c.id === product.id);
  };

  const addProduct = async (p: CartProduct) => {
    setLoading(true);
    let failed = false;
    if (!isLogged) {
      CookieCart.addProduct(p);
    } else {
      const { error } = await supabase.from("cart_products").insert({
        id_cart: cartId,
        id_product: String(p.id),
      });
      if (error) {
        console.error(error.message);
        failed = true;
      }
    }
    setLoading(false);
    if (!failed) {
      setCart((prev) => [...prev, p]);
      setIsOpen(true);
    }
  };

  const removeProduct = async (p: CartProduct) => {
    setLoading(true);
    let failed = false;
    if (!isLogged) {
      CookieCart.removeProduct(p);
    } else {
      const { error } = await supabase
        .from("cart_products")
        .delete()
        .eq("id_product", String(p.id));
      if (error) {
        console.error(error.message);
        failed = true;
      }
    }
    !failed && setCart((prev) => prev.filter((f) => f.id !== p.id));
    setLoading(false);
  };
  const count = cart.length;
  const total = cart.reduce((a, b) => a + b.price, 0);

  return (
    <CartContext.Provider
      value={{
        isOpen,
        setIsOpen,
        total,
        count,
        hasProduct,
        addProduct,
        removeProduct,
        loading,
        setLoading,
        cart,
        setCart,
      }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;

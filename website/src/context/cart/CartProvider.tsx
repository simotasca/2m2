"use client";

import { CookieCart } from "@/lib/client/cart";
import { createClientSideClient } from "@/lib/client/supabase";
import { CartProduct } from "@/lib/shared/cart";
import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { CartContext } from ".";

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
  cartProductIds,
  cartId,
}: PropsWithChildren<{ cartId?: number; cartProductIds: string[] }>) {
  const [cart, setCart] = useState<string[]>(cartProductIds);
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const isLogged = cartId !== undefined;
  const count = initialized ? cartProducts.length : 0
  const total = useMemo(
    () =>
      initialized
        ? cartProducts.reduce((subtotal, p) => subtotal + p.price, 0)
        : 0,
    [initialized, cartProducts]
  );

  const hasProduct = useCallback(
    (product: CartProduct) => {
      return !!cart.find((c) => c === product.id.toString());
    },
    [cart]
  );

  const addProduct = useCallback(
    async (p: CartProduct) => {
      setLoading(true);
      let failed = false;
      if (!isLogged) {
        CookieCart.addProduct(p);
      } else {
        const supabase = createClientSideClient();
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
        setCart((prev) => [...prev, p.id.toString()]);
        setCartProducts((prev) => [...prev, p]);
        setIsOpen(true);
      }
    },
    [isLogged, setLoading, setCart, setCartProducts, setIsOpen]
  );

  const removeProduct = useCallback(
    async (p: Pick<CartProduct, "id">) => {
      setLoading(true);
      let failed = false;
      if (!isLogged) {
        CookieCart.removeProduct(p);
      } else {
        const supabase = createClientSideClient();
        const { error } = await supabase
          .from("cart_products")
          .delete()
          .eq("id_product", String(p.id));
        if (error) {
          console.error(error.message);
          failed = true;
        }
      }
      if (!failed) {
        setCart((prev) => prev.filter((f) => f !== p.id.toString()));
        setCartProducts((prev) => prev.filter((f) => f.id !== p.id));
      }
      setLoading(false);
    },
    [isLogged, setLoading, setCart, setCartProducts]
  );

  const reload = useCallback(async () => {
    setInitialized(false);
    fetch("/api/cart")
      .then((res) => res.json())
      .then(({ products }: { products: any[] }) => {
        setCartProducts(products.filter((p) => cart.includes(p.id.toString())));
        setInitialized(true);
      })
      .catch((e) => {
        console.error("ERROR: loading cart", e.message);
      });
  }, [setInitialized, setCartProducts, setInitialized, cart]);

  useEffect(() => {
    reload();
  }, []);

  return (
    <CartContext.Provider
      value={{
        isOpen,
        setIsOpen,
        total,
        count,
        cart,
        cartProducts,
        hasProduct,
        addProduct,
        removeProduct,
        loading,
        isInitialized: initialized,
        setLoading,
        reload,
      }}>
      {children}
    </CartContext.Provider>
  );
}

/**
 * NOTA!
 * Il carrello verifica se un utente è loggato all'inizializzazione della pagina
 * e non imposta dei listener per vedere se ci sono dei cambiamenti di stato.
 * Ciò significa che non possono essere eseguiti login senza refresh della pagina!!
 * Per valutare un comportamento differente capire come funzionano gli hook di supabase
 * (se è una websocket eviterei)
 */
// function CartProvider2({
//   children,
//   cartProducts,
//   cartId,
// }: PropsWithChildren<{ cartId?: number; cartProducts: CartProduct[] }>) {
//   const supabase = createClientComponentClient<Database>();
//   const [isOpen, setIsOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [cart, setCart] = useState<CartProduct[]>(cartProducts);
//   const isLogged = cartId !== undefined;

//   const hasProduct = (product: CartProduct) => {
//     return !!cart.find((c) => c.id === product.id);
//   };

//   const addProduct = async (p: CartProduct) => {
//     setLoading(true);
//     let failed = false;
//     if (!isLogged) {
//       CookieCart.addProduct(p);
//     } else {
//       const { error } = await supabase.from("cart_products").insert({
//         id_cart: cartId,
//         id_product: String(p.id),
//       });
//       if (error) {
//         console.error(error.message);
//         failed = true;
//       }
//     }
//     setLoading(false);
//     if (!failed) {
//       setCart((prev) => [...prev, p]);
//       setIsOpen(true);
//     }
//   };

//   const removeProduct = async (p: Pick<CartProduct, "id">) => {
//     setLoading(true);
//     let failed = false;
//     if (!isLogged) {
//       CookieCart.removeProduct(p);
//     } else {
//       const { error } = await supabase
//         .from("cart_products")
//         .delete()
//         .eq("id_product", String(p.id));
//       if (error) {
//         console.error(error.message);
//         failed = true;
//       }
//     }
//     !failed && setCart((prev) => prev.filter((f) => f.id !== p.id));
//     setLoading(false);
//   };

//   const removeAll = async () => {
//     for (const id of Array.from(CookieCart.get())) {
//       await removeProduct({ id: parseInt(id) });
//     }
//   };

//   const reload = async () => {
//     fetch("/api/cart")
//       .then((res) => res.json())
//       .then((cart) => {
//         setCart(cart.products);
//       });
//   };

//   const count = cart.length;
//   const total = cart.reduce((a, b) => a + b.price, 0);

//   return (
//     <CartContext.Provider
//       value={{
//         isOpen,
//         setIsOpen,
//         total,
//         count,
//         hasProduct,
//         addProduct,
//         removeProduct,
//         removeAll,
//         loading,
//         setLoading,
//         cart,
//         setCart,
//         reload,
//       }}>
//       {children}
//     </CartContext.Provider>
//   );
// }

export default CartProvider;

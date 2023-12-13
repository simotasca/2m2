import { CartProduct } from "@/lib/shared/cart";
import { EcodatArticle, productName } from "@/lib/shared/ecodat";
import { SetStateAction, createContext, Dispatch } from "react";

interface CartContext {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  total: number;
  count: number;
  cart: CartProduct[];
  setCart: Dispatch<SetStateAction<any[]>>;
  hasProduct: (p: CartProduct) => boolean;
  addProduct: (p: CartProduct) => Promise<void>;
  removeProduct: (p: CartProduct) => void;
  removeAll: () => Promise<void>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export const CartContext = createContext<CartContext>({
  isOpen: false,
  setIsOpen: () => {},
  total: 0,
  count: 0,
  cart: [],
  setCart: () => {},
  hasProduct: () => false,
  addProduct: async () => {},
  removeProduct: () => {},
  removeAll: async () => {},
  loading: false,
  setLoading: () => {},
});

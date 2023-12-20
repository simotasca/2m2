import { CartProduct } from "@/lib/shared/cart";
import { EcodatArticle, productName } from "@/lib/shared/ecodat";
import { SetStateAction, createContext, Dispatch } from "react";

interface CartContext {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  total: number;
  count: number;
  cart: string[];
  cartProducts: CartProduct[];
  // setCart: Dispatch<SetStateAction<any[]>>;
  hasProduct: (p: CartProduct) => boolean;
  addProduct: (p: CartProduct) => Promise<void>;
  removeProduct: (p: CartProduct) => void;
  // removeAll: () => Promise<void>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  isInitialized: boolean;
  reload: () => Promise<void>;
}

export const CartContext = createContext<CartContext>({
  isOpen: false,
  setIsOpen: () => {},
  total: 0,
  count: 0,
  cart: [],
  cartProducts: [],
  // setCart: () => {},
  hasProduct: () => false,
  addProduct: async () => {},
  removeProduct: () => {},
  // removeAll: async () => {},
  loading: false,
  setLoading: () => {},
  isInitialized: false,
  reload: async () => {},
});

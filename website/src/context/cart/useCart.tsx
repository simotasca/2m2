import { useContext } from "react";
import { CartContext } from ".";

export default function useCart() {
  return useContext(CartContext);
}

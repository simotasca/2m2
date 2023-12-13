"use client";

import useCart from "@/context/cart/useCart";
import { useEffect } from "react";

export default function () {
  const { removeAll: removeAllCartProducts } = useCart();
  useEffect(() => {
    let params = new URL(window.location.toString()).searchParams;
    if (params.get("redirect_status") === "succeeded") {
      removeAllCartProducts();
    }
  }, []);

  return <></>;
}

"use client";

import useCart from "@/context/cart/useCart";
import { useEffect } from "react";

export default function () {
  const { reload } = useCart();
  useEffect(() => {
    console.log("CIASCOAHSOCIH");
    let params = new URL(window.location.toString()).searchParams;
    if (params.get("redirect_status") === "succeeded") {
      fetch("/api/cart/clear").then(() => {
        reload();
      });
    }
  }, []);

  return <div></div>;
}

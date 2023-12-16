"use client";

import Button from "@/components/ui/Button";
import { PaymentsBar } from "@/components/ui/PaymentsBar";
import iconAvailable from "@/images/icons/available.svg";
import iconFavorite from "@/images/icons/favorite.svg";
import iconShare from "@/images/icons/share.svg";
import iconCart from "@/images/icons/white/cart.svg";
import { EcodatArticle } from "@/lib/shared/ecodat";
import Image from "next/image";

export default function BuySection({ product }: { product: EcodatArticle }) {
  return (
    <aside className="font-sans order-2 row-span-2">
      <div className="flex gap-1 items-center -mb-1">
        <span className="text-[#5F5C5C] text-sm sm:text-xs md:text-sm mb-[2px]">
          Disponibile
        </span>
        <Image
          className="w-4 sm:w-3 md:w-4"
          src={iconAvailable}
          alt="available icon"
        />
      </div>
      <span className="font-semibold text-4xl sm:text-3xl md:text-4xl">
        {product.price.toFixed(2)}€
      </span>
      <p className="text-[#5F5C5C] text-sm sm:text-xs md:text-sm">
        Tutti i prezzi includono l'IVA
      </p>
      <p className="font-bold text-lg sm:text-base md:text-lg uppercase -mt-[6px] whitespace-nowrap">
        <span>SPEDIZIONE IN </span>
        <span className="text-[#F03B3B]">
          24<span className="text-sm">/</span>48 ORE
        </span>
      </p>
      <div className="h-3"></div>
      <div className="grid grid-cols-[auto_auto] leading-3">
        <div className="flex items-center gap-2 sm:gap-1 md:gap-2 max-w-[80%]">
          <Image
            className="w-9 sm:w-5 md:w-7"
            src={iconFavorite}
            alt="favorite icon"
          />
          <span className=" text-xs leading-[1.1]">Aggiungi ai preferiti</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-1 md:gap-2 max-w-[80%]">
          <Image
            className="w-6 sm:w-5 md:w-6"
            src={iconShare}
            alt="share icon"
          />
          <span className="text-xs leading-[1.1]">Condividi</span>
        </div>
      </div>
      <div className="h-[10px]"></div>
      <Button className="w-full text-sm bg-gradient-to-br from-red-700 to-red-500 text-white py-2 pb-1.5">
        <div className="child:-translate-x-2 contents">
          <Image
            className="w-6 translate-y-px"
            src={iconCart}
            alt="icon-cart"
          />
          <span>AGGIUNGI</span>
        </div>
      </Button>
      <div className="pt-2 flex justify-end pr-2 gap-2">
        <span className="text-sm sm:text-xs md:text-sm">pagamenti:</span>
        <PaymentsBar className="w-fit" />
      </div>
      {/* <p className="text-[#2e2d2d] underline text-xs">
        puoi pagarlo alla consegna*
      </p> */}
    </aside>
  );
}

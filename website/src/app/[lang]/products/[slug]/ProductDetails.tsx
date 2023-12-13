"use client";

import { EcodatArticle } from "@/lib/shared/ecodat";
import routes from "@/lib/shared/routes";
import { useState } from "react";
import { twJoin } from "tailwind-merge";

interface Props {
  product: EcodatArticle;
}

export default function ProductDetails({ product }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <main className="relative max-lg:order-3 max-lg:col-span-full">
      <p className="font-bold text-lg leading-[1.1]">PRODUCT DETAILS</p>

      <div className="grid grid-cols-[auto_1fr] max-lg:col-span-2 max-lg:order-4 text-sm ">
        <PropertyRow name="codice OEM" value={product.oeCode} />
        <PropertyRow
          name="marca"
          value={product.brand}
          href={routes.brand(product.brand)}
        />
        <PropertyRow
          name="modello"
          value={product.model}
          href={routes.model(product.brand, product.model)}
        />
        <PropertyRow name="versione" value={product.version} />
        {(product.yearFrom || product.yearTo) && (
          <PropertyRow
            name="anno"
            value={[product.yearFrom, product.yearTo]
              .filter((y) => !!y)
              .join(" - ")}
          />
        )}

        {/** expandible */}
        {!expanded ? (
          <button
            className="text-start p-1 col-span-full text-red-700"
            onClick={() => setExpanded(true)}>
            <span className="underline">more </span>
            <span>+</span>
          </button>
        ) : (
          <>
            <PropertyRow name="tipo motore" value={product.engine} />
            {product.displacement && (
              <PropertyRow name="cilindrata" value={product.displacement} />
            )}
            {product.power && (
              <PropertyRow name="alimentazione" value={product.power} />
            )}
            <PropertyRow name="note" value={product.notes} />
          </>
        )}
      </div>
    </main>
  );
}

function PropertyRow({
  name,
  value,
  href,
}: {
  name: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="contents child:even:bg-neutral-200 child:px-1 child:py-1">
      <span>{name}:</span>
      <a
        href={href}
        className={twJoin(
          "max-lg:text-left max-lg:pl-6 text-right font-medium",
          href && "underline hover:text-red-600"
        )}>
        {value}
      </a>
    </div>
  );
}

"use client";

import { EcodatArticle } from "@/lib/shared/ecodat";
import { useState } from "react";

interface Props {
  product: EcodatArticle;
}

export default function ProductDetails({ product }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <main className="relative">
      {product.new && (
        <p className="absolute bottom-full text-xs text-red-500 font-medium">
          NUOVO!
        </p>
      )}
      <h1 className="font-bold text-xl leading-[1.1]">{product.description}</h1>
      <p className="text-sm mb-1 mt-0.5">
        <span className="font-semibold">Codice OEM:</span>
        <span> {product.oeCode}</span>
      </p>

      <div className="grid grid-cols-[auto_1fr] text-sm">
        <PropertyRow name="marca" value={product.brand} />
        <PropertyRow name="modello" value={product.model} />
        <PropertyRow name="versione" value={product.version} />
        {(product.yearFrom || product.yearTo) && (
          <PropertyRow
            name="anno"
            value={[product.yearFrom, product.yearTo]
              .filter((y) => !!y)
              .join(" - ")}
          />
        )}
        <PropertyRow name="tipo motore" value={product.engine} />

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

function PropertyRow({ name, value }: { name: string; value: string }) {
  return (
    <div className="contents child:even:bg-neutral-200 child:px-1 child:py-1">
      <span>{name}:</span>
      <span className="text-right font-medium">{value}</span>
    </div>
  );
}

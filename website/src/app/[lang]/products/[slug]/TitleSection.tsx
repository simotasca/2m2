"use client";

import { EcodatArticle } from "@/lib/shared/ecodat";

type Props = { product: EcodatArticle };

export default function TitleSection({ product }: Props) {
  return (
    <div>
      <h1 className="font-bold text-2xl leading-[1.1] max-w-screen-md">
        <span className="text-red-500">{product.item} </span>
        <span>{product.brand + " " + product.model}</span>
      </h1>
      <p className="mb-1 mt-0.5 text-sm max-w-screen-md">
        <span className="font-medium">description:</span>
        <span className="text-neutral-600"> {product.description}</span>
      </p>
    </div>
  );
}

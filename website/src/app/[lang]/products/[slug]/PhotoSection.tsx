"use client";

import ProductImage from "@/components/product/ProductImage";
import useAsynEffect from "@/hooks/useAsyncEffect";
import { type EcodatArticle } from "@/lib/shared/ecodat";
import { useEffect, useState } from "react";

export default function PhotoSection({ product }: { product: EcodatArticle }) {
  const [photoIds, setPhotoIds] = useState<number[]>([]);
  const [current, setCurrent] = useState(0);
  const mainPhoto = { imageId: photoIds[current] };

  useAsynEffect(async () => {
    const photoIdsList: number[] = await fetch(
      `/api/ecodat/product-image/list?product-id=${product.id}`
    )
      .then((res) => {
        if (res.status !== 200) throw new Error(res.statusText);
        return res.json();
      })
      .catch((e) => {
        console.error(
          "Error fetching photo list, for product",
          product.id,
          ":",
          e
        );
        return [];
      });
    setPhotoIds(photoIdsList);
  }, []);

  useEffect(() => {
    console.log("CURRENT PHOTO", mainPhoto);
  }, [mainPhoto]);

  if (photoIds.length === 0)
    return (
      <div className="aspect-[3/2] bg-slate-200">
        <img
          src="/assets/placeholder-image.png"
          className="w-full h-full object-cover"
        />
      </div>
    );

  return (
    <div>
      <div className="grid xs:grid-cols-[4rem_1fr] sm:max-md:grid-cols-1 md:grid-cols-[5rem_1fr] gap-1">
        <div className="relative h-full max-xs:order-2 sm:max-md:order-2 max-xs:mb-14 sm:max-md:mb-14">
          <div className="absolute w-full xs:h-full sm:max-md:h-auto top-0 left-0 max-xs:bottom-0 overflow-x-auto overflow-y-hidden xs:overflow-y-auto xs:overflow-x-hidden">
            <div className="flex flex-col gap-1 max-xs:flex-row sm:max-md:flex-row max-xs:order-2 sm:max-md:order-2">
              {photoIds.map((imageId, i) => (
                <div
                  onClick={() => setCurrent(i)}
                  key={imageId}
                  className="p-0.5 border border-slate-300 rounded-sm cursor-pointer">
                  <ProductImage
                    className="max-xs:h-12 sm:max-md:h-12 xs:w-full sm:max-md:w-auto"
                    photo={{ imageId }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full p-0.5 border border-slate-300 rounded-sm">
          <ProductImage big photo={mainPhoto} />
        </div>
      </div>
    </div>
  );
}

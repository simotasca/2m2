"use client";

import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  photo?: { productId: number } | { imageId: number };
  big?: boolean;
  className?: string;
}

const imagePlaceholder = "/assets/placeholder-image.png";

export default function ProductImage({ photo, big, className }: Props) {
  const ref = useRef<HTMLImageElement>(null);
  const [image, setImage] = useState<string | undefined>();
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ref.current) return;
    if (!photo) return;
    if (image !== undefined) return;

    let qs = "";
    if ("productId" in photo) {
      qs += "product-id=" + photo.productId;
    } else {
      qs += "photo-id=" + photo.imageId;
    }

    if (big) {
      qs += "&big=true";
    }

    fetch("/api/ecodat/product-image?" + qs)
      .then((res) => (res.status === 404 ? undefined : res.text()))
      .then((src) => setImage(src))
      .catch(() => setImage(undefined))
      .finally(() => setFetching(false));
  }, [ref, photo]);

  return (
    <div
      className={twMerge(
        "relative bg-slate-300 aspect-[3/2] overflow-hidden",
        className,
        loading && "animate-pulse",
        !loading && !image && "opacity-60"
      )}>
      <img
        ref={ref}
        className="absolute w-full h-full object-cover blur-3xl opacity-0 transition-all duration-500"
        src={!fetching ? image || imagePlaceholder : undefined}
        onLoad={(e) => {
          (e.target as HTMLImageElement).classList.remove(
            "opacity-0",
            "blur-3xl"
          );
          setLoading(false);
        }}
      />
    </div>
  );
}

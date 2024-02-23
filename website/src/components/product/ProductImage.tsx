"use client";

import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import usePrevious from "@/hooks/usePrevious";

const imagePlaceholder = "/assets/placeholder-image.png";

class ProductImagePool {
  private queue = new Map<
    string,
    {
      signal: ((res: string | null) => void)[];
      done: boolean;
      result: string | null;
    }
  >();
  private fetching = false;

  constructor(private size: number = 4) {
    if (this.size < 1)
      throw new Error("ProductImagePool size cannot be less than 1");
  }

  private async loop() {
    if (this.fetching) return;
    this.fetching = true;
    let undone = this.nextUndone();
    while (undone.length > 0) {
      const promises = undone.slice(0, this.size).map((v) =>
        fetch(v.url)
          .then((res) => (res.status === 404 ? undefined : res.text()))
          .then((res) => (v.val.result = res || null))
          .catch(() => {})
          .finally(() => {
            v.val.done = true;
            console.log("POOL FINISHED", v);
            v.val.signal.forEach((sig) => sig(v.val.result));
          })
      );
      await Promise.all(promises);
      undone = this.nextUndone();
    }
    this.fetching = false;
  }

  private nextUndone() {
    return Array.from(this.queue)
      .filter(([, val]) => !val.done)
      .map(([url, val]) => ({ url, val }));
  }

  public queueImage(url: string, signal: (res: string | null) => void) {
    if (this.queue.has(url)) {
      const queued = this.queue.get(url)!;
      queued.signal.push(signal);
      if (queued.result) return signal(queued.result);
    } else {
      this.queue.set(url, { signal: [signal], done: false, result: null });
    }
    this.loop();
  }
}

const pool = new ProductImagePool();

interface Props {
  photo?: { productId: number } | { imageId: number };
  big?: boolean;
  className?: string;
}

export default function ProductImage({ photo, big, className }: Props) {
  const [image, setImage] = useState<string | undefined>();
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!photo) return;

    console.log("FETCHING IMAGE");

    setFetching(true);

    let qs = "";
    if ("productId" in photo) {
      qs += "product-id=" + photo.productId;
    } else {
      qs += "photo-id=" + photo.imageId;
    }

    if (big) {
      qs += "&big=true";
    }

    pool.queueImage("/api/ecodat/product-image?" + qs, (src) => {
      setImage(src || undefined);
      setFetching(false);
    });

    // fetch("/api/ecodat/product-image?" + qs)
    //   .then((res) => (res.status === 404 ? undefined : res.text()))
    //   .then((src) => setImage(src))
    //   .catch(() => setImage(undefined))
    //   .finally(() => setFetching(false));
    /** @ts-ignore */
  }, [photo?.productId, photo?.imageId]);

  return (
    <div
      className={twMerge(
        "relative bg-slate-300 aspect-[3/2] overflow-hidden",
        className,
        loading && "animate-pulse",
        !loading && !image && "opacity-60"
      )}>
      {!fetching && (
        <Image
          className="absolute w-full h-full object-cover blur-3xl opacity-0 transition-all duration-500"
          src={image || imagePlaceholder}
          width={300}
          height={200}
          alt=""
          onLoad={(e) => {
            (e.target as HTMLImageElement).classList.remove(
              "opacity-0",
              "blur-3xl"
            );
            setLoading(false);
          }}
        />
      )}
    </div>
  );
}

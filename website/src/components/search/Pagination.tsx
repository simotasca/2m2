"use client";

import iconRight from "@/images/icons/right.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { twJoin, twMerge } from "tailwind-merge";

function changePage(op: (val: number) => number) {
  const currentUrl = window.location.href;

  // Parse the current URL
  const url = new URL(currentUrl);
  const queryParams = new URLSearchParams(url.search);

  // Get the current page value and increase it by one
  let currentPage = parseInt(queryParams.get("page")!, 10) || 1;
  const nextPage = op(currentPage);

  // Update the 'page' query parameter
  queryParams.set("page", nextPage.toString());

  // Set the updated search parameters back to the URL
  url.search = queryParams.toString();

  // Create the updated URL
  return url.toString();
}

export default function Pagination({ isLast }: { isLast?: boolean }) {
  const [page, setPage] = useState<number>();

  useEffect(() => {
    const qs = new URLSearchParams(window.location.search);
    let p = parseInt(qs.get("page") || "1");
    setPage(Number.isNaN(p) || p < 1 ? 1 : p);
  });

  if (!page || (isLast && page === 1)) return <></>;

  return (
    <div className="flex gap-3 items-center">
      <a
        href={page === 1 ? undefined : changePage((v) => v - 1)}
        className={twJoin(
          "text-sm bg-transparent border border-slate-500 bg-neutral-50 w-6 px-1 aspect-square grid place-items-center rounded-sm",
          page === 1 && "opacity-50"
        )}>
        <Image
          className={twJoin(
            "w-full -translate-y-px transition-transform duration-100 -scale-x-100 my-auto "
          )}
          alt=""
          src={iconRight}
        />
      </a>
      <span className="oswald text-lg">{page}</span>
      <a
        href={isLast ? undefined : changePage((v) => v + 1)}
        className={twMerge(
          "text-sm bg-transparent border border-slate-500 bg-neutral-50 w-6 px-1 aspect-square grid place-items-center rounded-sm",
          isLast && "opacity-50"
        )}>
        <Image
          className={twMerge(
            "w-full -translate-y-px transition-transform duration-100 my-auto "
          )}
          alt=""
          src={iconRight}></Image>
      </a>
    </div>
  );
}

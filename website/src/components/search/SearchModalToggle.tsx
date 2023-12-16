"use client";

import useSearchModal from "@/context/search/useSearchModal";
import iconSearch from "@/images/icons/search.svg";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

export default function SearchModalToggle({
  className,
}: {
  className?: string;
}) {
  const { open: openSearchModal } = useSearchModal();
  return (
    <div className="relative cursor-pointer" onClick={openSearchModal}>
      <input
        type="text"
        placeholder="search here . . ."
        className={twMerge(
          "text-sm outline-none border border-neutral-500 max-w-[200px] w-full py-px pl-1.5 pr-6 rounded-sm",
          className
        )}
      />
      <Image
        alt=""
        src={iconSearch}
        className="absolute top-1.5 -translate-y-px right-1 w-4 opacity-80"
      />
    </div>
  );
}

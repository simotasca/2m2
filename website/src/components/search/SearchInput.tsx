"use client";

import useSearch from "@/hooks/useSearch";
import imgLoad from "@/images/icons/loader.svg";
import Image from "next/image";
import { useState } from "react";

export default function SearchInput() {
  const [value, setValue] = useState("");
  const [searchResult, isLoading] = useSearch(value);

  return (
    <div className="bg-white p-8">
      <div className="relative w-fit">
        <input
          className="border border-dark pr-6"
          value={value}
          onChange={(evt) => setValue(evt.target.value)}
        />
        {isLoading && (
          <div className="absolute h-full top-0 right-1 flex items-center">
            <Image
              alt=""
              src={imgLoad}
              className="w-4 aspect-square object-contain animate-spin"
            />
          </div>
        )}
      </div>
      <ul className="list-disc">
        {searchResult.map((r, i) => (
          <li key={i}>{r.description}</li>
        ))}
      </ul>
    </div>
  );
}

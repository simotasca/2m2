"use client";

import useTranslation from "@/context/lang/useTranslation";
import useSearchModal from "@/context/search/useSearchModal";
import iconFilters from "@/images/icons/filters.svg";
import iconSearch from "@/images/icons/search.svg";
import iconDown from "@/images/icons/white/down.svg";
import Image from "next/image";

export default function SearchBar() {
  const { t } = useTranslation();
  const { open: openSearchModal } = useSearchModal();
  return (
    <div className="h-full rounded border border-neutral-500 bg-white flex items-stretch">
      <label
        htmlFor="header-search-bar"
        className="flex-shrink-0 flex items-center h-full [@media(max-width:930px)]:hidden">
        <Image src={iconSearch} alt="search icon" className="w-5 mx-3 mt-0.5" />
      </label>
      <div className="relative flex items-center flex-1 mr-2 md:mr-4">
        <div className="absolute top-1/2 translate-y-3 w-full h-px bg-neutral-300 max-md:hidden"></div>
        <input
          id="header-search-bar"
          type="text"
          className=" w-full focus:outline-none placeholder:text-neutral-500 text-neutral-700 max-md:ml-2 max-sm:py-0.5 max-sm:placeholder:text-sm [@media(max-width:930px)]:ml-2"
          placeholder={t("header.search-bar.placeholder")}
        />
      </div>
      <button className="flex items-center px-3 [@media(min-width:930px)]:px-6 bg-gradient-to-br from-red-700 to-red-500 text-white font-bold">
        <Image
          src={iconSearch}
          alt=""
          className="w-5 translate-y-px translate-x-px filter invert brightness-0 opacity-90"
        />
        <span className="[@media(max-width:930px)]:hidden">
          {t("header.search-bar.search")}
        </span>
      </button>
      <button
        onClick={openSearchModal}
        className="h-full outline-none flex items-center px-3 [@media(min-width:930px)]:px-6 bg-neutral-800 text-white font-medium">
        <Image
          src={iconFilters}
          alt=""
          className="[@media(min-width:930px)]:hidden filters invert w-5"
        />
        <span className="[@media(max-width:930px)]:hidden">
          {t("header.search-bar.filters.title")}
        </span>
        <Image
          src={iconDown}
          alt="dropdown icon"
          className="w-4 ml-1 translate-y-px [@media(max-width:930px)]:hidden"
        />
      </button>
    </div>
  );
}

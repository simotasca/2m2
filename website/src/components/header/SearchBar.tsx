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
    <div
      onClick={openSearchModal}
      className="flex max-sm:hidden rounded border border-neutral-500 bg-white"
    >
      <Image
        src={iconSearch}
        alt="search icon"
        className="w-5 mx-3 mt-0.5 max-lg:hidden"
      />

      <div className="relative flex items-center flex-1 mr-2 md:mr-4">
        <div className="absolute top-1/2 translate-y-3 w-full h-px bg-neutral-300 max-md:hidden max-lg:ml-2"></div>
        <input
          id="header-search-bar"
          type="text"
          className="w-full focus:outline-none placeholder:text-neutral-500 text-neutral-700 max-lg:ml-2 max-xs:py-0.5 xs:py-1 md:py-0 max-sm:placeholder:text-sm"
          placeholder={t("header.search-bar.placeholder")}
        />
      </div>

      <button className="flex items-center px-3 lg:px-6 bg-gradient-to-br from-red-700 to-red-500 text-white font-bold">
        <Image
          src={iconSearch}
          alt=""
          className="w-5 translate-y-px translate-x-px filter invert brightness-0 opacity-90 lg:hidden"
        />
        <span className="max-lg:hidden">{t("header.search-bar.search")}</span>
      </button>

      <button className="h-full outline-none flex items-center px-3 lg:px-6 bg-neutral-800 text-white font-medium">
        <Image
          src={iconFilters}
          alt=""
          className="lg:hidden filters invert w-5"
        />
        <span className="max-lg:hidden">
          {t("header.search-bar.filters.title")}
        </span>
        <Image
          src={iconDown}
          alt="dropdown icon"
          className="w-4 ml-1 translate-y-px max-lg:hidden"
        />
      </button>
    </div>
  );
}

"use client";

import useTranslation from "@/context/lang/useTranslation";
import iconSearch from "@/images/icons/search.svg";
import iconFilters from "@/images/icons/filters.svg";
import iconDown from "@/images/icons/white/down.svg";
import { Popover, Transition } from "@headlessui/react";
import Image from "next/image";
import { openSearchModal } from "../search/SearchModal";

export default function SearchBar() {
  const { t } = useTranslation();
  return (
    <div className="h-full rounded border border-neutral-500 bg-white flex items-stretch">
      <label
        htmlFor="header-search-bar"
        className="flex-shrink-0 flex items-center h-full [@media(max-width:930px)]:hidden"
      >
        <Image src={iconSearch} alt="search icon" className="w-5 mx-3 mt-0.5" />
      </label>
      <div className="relative flex items-center flex-1 mr-2 md:mr-4">
        <div className="absolute top-1/2 translate-y-3 w-full h-px bg-neutral-300 [@media(max-width:766px)]:hidden"></div>
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
      {/* <DropdownSearchFilters /> */}
      <button
        onClick={() => openSearchModal()}
        className="h-full outline-none flex items-center px-3 [@media(min-width:930px)]:px-6 bg-neutral-800 text-white font-medium"
      >
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

function DropdownSearchFilters() {
  const { t } = useTranslation("header.search-bar.filters");

  return (
    <Popover className={"relative h-full"}>
      {({ open }) => (
        <>
          <Popover.Button
            as="button"
            className="h-full outline-none flex items-center px-6 bg-neutral-800 text-white font-medium"
          >
            <span>{t("title")}</span>
            <Image
              src={iconDown}
              alt="dropdown icon"
              className="w-4 ml-1 translate-y-px"
            />
          </Popover.Button>
          <Transition
            show={open}
            className="absolute right-0 w-screen top-full flex justify-end pointer-events-none"
            enter="transition duration-100 ease-out"
            enterFrom="transform -translate-y-2 opacity-0"
            enterTo="transform translate-y-0 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform translate-y-0 opacity-100"
            leaveTo="transform -translate-y-2 opacity-0"
          >
            <Popover.Panel className="pt-2 z-10 min-w-fit ">
              <div className="grid grid-cols-2 bg-white border border-slate-400 rounded-md text-black p-4  gap-y-1">
                <a href="#">Analytics</a>
                <a href="#">Engagement</a>
                <a href="#">Security</a>
                <a href="#">Integrations</a>
                <a href="#">Integrations</a>
                <a href="#">Integrations</a>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}

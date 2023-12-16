"use client";

import iconDown from "@/images/icons/expand.svg";
import iconReload from "@/images/icons/refresh.svg";
import iconLoading from "@/images/icons/loader.svg";
import { Listbox } from "@headlessui/react";
import Image from "next/image";
import { Dispatch, Fragment } from "react";
import { twJoin } from "tailwind-merge";

export interface WizSelectItem {
  key: string;
  val: string;
}

type SelectParams = {
  value: WizSelectItem | undefined;
  onChange: (value: WizSelectItem) => void;
  label?: string;
  placeholder: string;
  errorMessage?: string;
  required?: boolean;
  className?: string;
  items: WizSelectItem[];
  loadingError: boolean;
  onReload?: () => void;
  loading: boolean;
};

export default function WizSelect({
  items,
  value,
  onChange,
  label,
  errorMessage,
  required,
  placeholder,
  loadingError,
  loading,
  onReload,
}: SelectParams) {
  return (
    <Listbox
      disabled={!items.length}
      as={"div"}
      value={value}
      onChange={onChange}>
      {label && (
        <Listbox.Label as="p" className="text-xs pb-px">
          {label}
          {!!errorMessage && !loadingError && (
            <span className="text-red-500 pl-1">s{errorMessage}</span>
          )}
          {required && <span className="text-red-500 pl-0.5">*</span>}
          {!loading && loadingError && (
            <span className="text-red-500 pl-1">error loading data</span>
          )}
        </Listbox.Label>
      )}
      <div className="relative">
        {!loading && loadingError && (
          <button
            className="group absolute w-full h-full flex items-center justify-between bg-white border border-red-300 text-sm text-left px-2 py-1 rounded-sm z-10"
            onClick={onReload && onReload}>
            <span className="text-xs text-red-500 font-medium group-hover:underline underline-offset-2">
              reload
            </span>
            <Image alt="" src={iconReload} className="w-4 translate-y-px" />
          </button>
        )}
        <Listbox.Button
          className={twJoin(
            "w-full flex items-center justify-between border border-neutral-300 outline-none text-sm text-left px-2 py-1 rounded-sm",
            !value && "text-neutral-500",
            errorMessage !== undefined &&
              "outline outline-1 outline-red-500 -outline-offset-1"
          )}>
          <span className="block truncate">
            {loading ? "loading" : value?.val || placeholder}
          </span>
          {loading ? (
            <div className="translate-y-px">
              <Image alt="" src={iconLoading} className="w-4 animate-spin" />
            </div>
          ) : (
            <Image
              alt=""
              src={iconDown}
              className="w-4 opacity-60 translate-y-px"
            />
          )}
        </Listbox.Button>
        <Listbox.Options className="absolute top-full left-0 w-full z-10 outline-none">
          <div className="mt-1 bg-white border border-neutral-300 rounded-sm max-h-40 overflow-y-auto">
            {items.map((item) => (
              <Listbox.Option
                key={item.key}
                value={item}
                className={({ active }) =>
                  `relative cursor-default select-none text-sm py-0.5 px-1.5 ${
                    active ? "bg-stone-200" : ""
                  }`
                }>
                {({ selected }) => <>{item.val}</>}
              </Listbox.Option>
            ))}
          </div>
        </Listbox.Options>
      </div>
    </Listbox>
  );
}

"use client";

import Link from "@/components/navigation/Link";
import useTranslation from "@/context/lang/useTranslation";
import useSearchModal from "@/context/search/useSearchModal";
import useSearch from "@/hooks/useSearch";
import iconClose from "@/images/icons/close.svg";
import imgLoad from "@/images/icons/loader.svg";
import imgGoTo from "@/images/icons/open_in_new.svg";
import iconSearch from "@/images/icons/search.svg";
import type { EcodatData } from "@/lib/client/filters";
import { getEcodatData } from "@/lib/client/filters";
import {
  EcodatBrand,
  EcodatCategory,
  EcodatModel,
  EcodatTypology,
} from "@/lib/shared/ecodat";
import routes from "@/lib/shared/routes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { Dispatch, MouseEventHandler, PropsWithChildren } from "react";
import { useEffect, useRef, useState } from "react";
import { twJoin, twMerge } from "tailwind-merge";

interface Props {
  category?: EcodatCategory;
}

export default function SearchModal({ category: baseCategory }: Props) {
  const input = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const { close, isOpen } = useSearchModal();

  const [value, setValue] = useState("");
  const [filters, setFilters] = useState<EcodatData>();

  // the selected content
  const [category, setCategory] = useState<EcodatCategory | undefined>(
    baseCategory
  );
  const [typology, setTypology] = useState<EcodatTypology | undefined>();
  const [brand, setBrand] = useState<EcodatBrand | undefined>();
  const [model, setModel] = useState<EcodatModel | undefined>();

  const [selection, setSelection] = useState<{
    message: string;
    setter: Dispatch<any>;
    data: { key: any; val: string }[];
  }>();

  const [result, loading] = useSearch(value, {
    query: {
      categoryId: category?.id,
      typeId: typology?.id,
      brandId: brand?.id,
      modelId: model?.id,
    },
    active: isOpen,
  });

  const typologies =
    category &&
    filters?.categories?.find((c) => c.id === category.id)?.typologies;

  const models =
    brand && filters?.brands?.find((c) => c.id === brand.id)?.models;

  const productsPageLink = routes.products({
    categoryId: category?.id,
    typeId: typology?.id,
    brandId: brand?.id,
    modelId: model?.id,
    description: value || undefined,
  });

  useEffect(() => {
    getEcodatData().then(setFilters);
  }, []);

  useEffect(() => {
    if (!input.current) return;

    if (isOpen) {
      input.current.focus();
    } else {
      setValue("");
      setSelection(undefined);
      setCategory(baseCategory);
      setTypology(undefined);
      setBrand(undefined);
      setModel(undefined);
    }
  }, [isOpen, input]);

  useEffect(() => {
    if (!category) setTypology(undefined);
  }, [category]);

  useEffect(() => {
    if (!brand) setModel(undefined);
  }, [brand]);

  const { t } = useTranslation();

  return (
    <>
      <div
        onClick={close}
        className={twJoin(
          "fixed inset-0 w-screen h-screen bg-black bg-opacity-40 z-[53]",
          !isOpen && "hidden"
        )}></div>
      <div
        className={twJoin(
          "pointer-events-none fixed w-[800px] max-w-[95vw] max-h-[70vh] top-[15vh] left-1/2 -translate-x-1/2 z-[54]",
          isOpen ? "pointer-events-auto opacity-100" : "opacity-0"
        )}>
        <div
          className={twJoin(
            "text-dark bg-white w-full h-full max-h-[70vh] rounded-md shadow-md shadow-neutral-500 transition-all duration-300 ease-out",
            isOpen ? "translate-y-0" : "-translate-y-10"
          )}>
          <div className="flex flex-col h-full max-h-[70vh]">
            <div className="flex-shrink-0 flex-grow-0">
              <div className="flex items-center relative">
                <div>
                  <div
                    className={twJoin(
                      "scale-[0.8] translate-y-px",
                      !loading && "hidden"
                    )}>
                    <Image
                      alt=""
                      src={imgLoad}
                      className="ml-4 w-5 aspect-square object-contain animate-spin z-10"
                    />
                  </div>
                  <Image
                    alt=""
                    src={iconSearch}
                    className={twJoin(
                      loading && "hidden",
                      "ml-4 w-5 aspect-square object-contain translate-y-0.5"
                    )}
                  />
                </div>
                <input
                  ref={input}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={(e) => {
                    e.key === "Enter" && router.push(productsPageLink);
                    e.key === "Escape" && close();
                  }}
                  id="search-modal-input"
                  type="text"
                  className="w-full outline-none pl-3 pt-4 pb-3 pr-6 text-sm"
                  placeholder={t("search.placeholder")}
                />
              </div>

              <hr className="border-neutral-300" />

              <div className="px-5 py-2">
                <div className="flex flex-wrap items-center gap-2 gap-y-0.5">
                  <SearchBadge
                    text={t("search.category")}
                    value={category}
                    setter={setCategory}
                    displayProp="name"
                    filters={filters?.categories}
                    setSelection={setSelection}
                  />

                  {category && typologies?.length && typologies.length > 1 && (
                    <SearchBadge
                      text={t("search.typology")}
                      value={typology}
                      setter={setTypology}
                      displayProp="name"
                      filters={typologies}
                      setSelection={setSelection}
                    />
                  )}

                  <SearchBadge
                    text={t("search.brand")}
                    value={brand}
                    setter={setBrand}
                    displayProp="name"
                    filters={filters?.brands}
                    setSelection={setSelection}
                  />

                  {brand && models?.length && models.length > 1 && (
                    <SearchBadge
                      text={"search.model"}
                      value={model}
                      setter={setModel}
                      displayProp="name"
                      filters={models}
                      setSelection={setSelection}
                    />
                  )}
                </div>

                {!!selection?.data.length && (
                  <>
                    <p className="text-xs text-neutral-500 pt-1">
                      {selection.message} :
                    </p>
                    <div className="flex flex-wrap items-center gap-1 gap-y-0.5 mt-1 ml-1">
                      {selection?.data?.map((s, i) => (
                        <Badge
                          key={i}
                          onClick={() => {
                            selection.setter(s.key);
                            setSelection(undefined);
                          }}
                          className="bg-orange-500 hover:bg-gradient-to-b from-orange-600 via-orange-500 to-orange-500 text-white whitespace-nowrap">
                          {s.val}
                        </Badge>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="px-5 max-h-full h-full flex-1 overflow-y-scroll">
              {!!value && !loading && !result.length && (
                <p className="text-sm text-neutral-600 pb-2">
                  {t("search.no-result")}
                </p>
              )}

              {!!result.length && (
                <ul className="-mx-5">
                  {result.map((r, i) => (
                    <li
                      className="group hover:bg-stone-200 hover:bg-opacity-80 px-5 first:-mt-2"
                      key={i}>
                      <a href={routes.product(r)}>
                        <p
                          className="text-sm leading-tight pt-2"
                          dangerouslySetInnerHTML={{
                            __html: highlightSearch(r.description, value),
                          }}
                        />
                        <p
                          className="text-xs text-neutral-500 pb-2"
                          dangerouslySetInnerHTML={{
                            __html: highlightSearch(r.oeCode, value),
                          }}
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="group flex-shrink-0 flex-grow-0 px-5 py-1 bg-slate-100 rounded-b-md border-t border-slate-300">
              <Link href={productsPageLink}>
                <div className="flex items-center gap-1.5 pb-0.5">
                  <Image src={imgGoTo} alt="" className="w-3 translate-y-px" />
                  <span className="text-xs text-slate-700 translate-y-px group-hover:underline">
                    {t("search.go-products")}
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function highlightSearch(val: string, search: string) {
  if (!val || !search) return val;

  const valLow = val.toLowerCase();
  const searchLow = search.toLowerCase();

  let i = -1;
  let indexes: number[] = [];
  do {
    i = valLow.indexOf(searchLow, i + 1);
    if (i == -1) {
      break;
    }
    indexes.push(i);
  } while (i != -1);

  let pointer = 0;
  let chunks: string[] = [];
  indexes.forEach((i) => {
    chunks.push(val.slice(pointer, i));
    chunks.push(
      `<span style="background: rgb(251 146 60 / 0.5);">${val.slice(
        i,
        i + search.length
      )}</span>`
    );
    pointer = i + search.length;
  });
  chunks.push(val.slice(pointer));

  console.log("ALL");
  return chunks.join("");
}

function SearchBadge({
  text,
  value,
  displayProp,
  setter,
  setSelection,
  filters,
}) {
  return (
    <Badge
      className={
        value
          ? "bg-red-gradient text-white"
          : "outline outline-1 -outline-offset-1 outline-red-700 text-red-600"
      }
      onClick={() => {
        if (value) {
          setter(undefined);
          setSelection(undefined);
        } else {
          !!filters?.length &&
            setSelection((p) =>
              p != undefined && p.setter === setter
                ? undefined
                : {
                    message: "select " + text,
                    setter,
                    data: filters.map((c) => ({
                      key: c,
                      val: c.name,
                    })),
                  }
            );
        }
      }}>
      {value ? (
        <div className="flex items-center gap-1">
          <Image
            src={iconClose}
            alt=""
            className="filter invert brightness-0 w-3 translate-y-px"
          />
          <p>{value[displayProp]}</p>
        </div>
      ) : (
        text
      )}
    </Badge>
  );
}

function Badge({
  className,
  onClick,
  children,
}: PropsWithChildren<{
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}>) {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        "text-xs font-medium px-2.5 pb-1 pt-0.5 rounded",
        className
      )}>
      {children}
    </button>
  );
}

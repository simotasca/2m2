import iconClose from "@/images/icons/close.svg";
import iconSearch from "@/images/icons/search.svg";
import { Combobox } from "@headlessui/react";
import Image from "next/image";
import { PropsWithChildren, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

interface SearchFilterItem<T> {
  key: string | number;
  value: T;
  display: string;
}

type Props<T> = PropsWithChildren<{
  label: string;
  placeholder: string;
  data: SearchFilterItem<T>[];
  disabled?: boolean;
  onChange?: (curr: T | null) => void;
}>;

export default function SearchFilterInner<T>({
  label,
  placeholder,
  data,
  disabled,
  onChange,
}: Props<T>) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<SearchFilterItem<T> | null>(null);
  const isDisabled = disabled === true;

  const clear = () => {
    setSelected(null);
    setQuery("");
  };

  const filtered =
    query === ""
      ? data
      : data.filter((d) => {
          return d.display.toLowerCase().includes(query.toLowerCase());
        });

  useEffect(() => {
    onChange && onChange(selected?.value || null);
  }, [selected]);

  useEffect(() => {
    !data.length && clear();
  }, [data]);

  return (
    <Combobox
      disabled={disabled}
      value={selected}
      onChange={setSelected}
      nullable>
      <Combobox.Button className="block text-left">
        <p
          className={twMerge(
            "font-semibold text-xs mb-0.5",
            isDisabled && "text-neutral-500"
          )}>
          {label}
        </p>
        <div className="relative flex gap-2 py-1 pl-2 border border-neutral-400 focus-within:border-red-400 rounded">
          <Image
            src={iconSearch}
            alt=""
            className="w-5 opacity-70 translate-y-px"
          />
          <Combobox.Input
            displayValue={(d: any) => d?.display}
            className="w-full outline-none text-sm"
            placeholder={placeholder}
            onChange={(event) => setQuery(event.target.value)}
          />
          {!!filtered.length && (
            <div className="absolute top-full left-0 pt-1 z-50 min-w-[80%]">
              <Combobox.Options className="bg-white rounded border border-slate-300 py-1 max-h-36 overflow-y-auto">
                {filtered.map((f) => (
                  <Combobox.Option key={f.key} value={f}>
                    {({ active, selected }) => (
                      <div
                        className={twMerge(
                          "text-sm px-3 py-0.5 hover:bg-zinc-200 border-b last:border-b-0 border-slate-100",
                          active && "bg-zinc-200",
                          selected && "font-medium"
                        )}>
                        {f.display}
                      </div>
                    )}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </div>
          )}
          {!!selected && (
            <div
              onClick={(e) => {
                clear();
                e.stopPropagation();
              }}
              className="px-3 flex items-center">
              <Image
                src={iconClose}
                alt="close icon"
                className="w-3 opacity-70 translate-y-px"
              />
            </div>
          )}
        </div>
      </Combobox.Button>
    </Combobox>
  );
}

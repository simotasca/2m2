"use client";

import routes from "@/lib/shared/routes";
import { twMerge } from "tailwind-merge";

interface Params {
  category: string;
  categories?: string[];
  type?: string;
  /** should be the types of the specified category */
  types?: string[];
  item?: string;
}

export default function Breadcrumbs({
  category,
  categories,
  type,
  types,
  item,
}: Params) {
  categories = categories?.filter((t) => t !== category);
  types = types?.filter((t) => t !== type);

  return (
    <div className="flex gap-3 py-4 text-neutral-500 text-sm">
      <Breadcrumb
        href={routes.category(category)}
        text={category}
        dropdown={categories?.map((c) => ({
          text: c,
          href: routes.category(c),
        }))}
        bold={!type && !item}
      />

      {type && (
        <>
          <Separator />
          <Breadcrumb
            href={routes.type(category, type)}
            text={type}
            dropdown={types?.map((t) => ({
              text: t,
              href: routes.type(category, t),
            }))}
            bold={!item}
          />
        </>
      )}

      {type && item && (
        <>
          <Separator />
          <Breadcrumb text={item} bold={true} />
        </>
      )}
    </div>
  );
}

interface LinkItem {
  text: string;
  href?: string;
  bold?: boolean;
}

function Breadcrumb({
  text,
  href,
  dropdown,
  bold,
}: LinkItem & { dropdown?: LinkItem[] }) {
  return (
    <div className="relative group">
      <a
        href={href}
        className={twMerge(
          bold
            ? "font-semibold text-neutral-800"
            : "underline-offset-[3px] hover:underline hover:text-red-600 cursor-pointer"
        )}>
        {text}
      </a>
      <div className="absolute pt-2 hidden group-hover:block top-full left-1 z-50">
        {!!dropdown?.length && (
          <div className="bg-white rounded border border-slate-300 p-4 w-fit">
            <ul className="flex flex-col gap-2 text-sm leading-[1] whitespace-nowrap pr-1">
              <li className="font-medium text-neutral-800">{text}</li>
              {dropdown.map((dd) => (
                <>
                  <li>
                    <hr />
                  </li>
                  <a href={dd.href}>
                    <li className="hover:text-red-500">{dd.text}</li>
                  </a>
                </>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

function Separator() {
  return <p className="translate-y-px">{">"}</p>;
}

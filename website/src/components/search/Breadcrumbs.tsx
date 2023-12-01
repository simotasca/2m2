"use client";

import routes from "@/lib/shared/routes";

interface Params {
  category: string;
  categories?: string[];
  type?: string;
  /** should be the types of the category specified */
  types?: string[];
  item?: string;
}

export default function Breadcrumbs(params: Params) {
  return (
    <div className="flex gap-3 py-4 text-neutral-500 text-sm">
      <Breadcrumb
        href={routes.category(params.category)}
        text={params.category}
        dropdown={params.categories?.map((c) => ({
          text: c,
          href: routes.category(c),
        }))}
      />

      {params.type && (
        <Breadcrumb
          href={routes.type(params.category, params.type)}
          text={params.type}
          dropdown={params.types?.map((t) => ({
            text: t,
            href: routes.type(params.category, t),
          }))}
        />
      )}

      {params.type && params.item && (
        <>
          <span>{">"}</span>
          <span className="font-medium text-dark">{params.item}</span>
        </>
      )}
    </div>
  );
}

interface LinkItem {
  text: string;
  href: string;
}

function Breadcrumb({
  text,
  href,
  dropdown,
}: LinkItem & { dropdown?: LinkItem[] }) {
  return (
    <div className="relative group">
      <a
        href={href}
        className="underline-offset-[3px] hover:underline hover:text-red-600 cursor-pointer">
        {text}
      </a>
      <div className="absolute pt-2 hidden group-hover:block top-full left-1 z-50">
        {dropdown && (
          <div className="bg-white rounded border border-slate-300 p-4 w-fit">
            <ul className="flex flex-col gap-2">
              {dropdown.map((dd) => (
                <li className="hover:text-red-500 text-sm leading-[1]">
                  <a href={dd.href}>{dd.text}</a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { Fragment } from "react";
import { twJoin, twMerge } from "tailwind-merge";

interface LinkItem {
  text?: string;
  href?: string;
}

export type Breadcrumb = (LinkItem & { dropdown?: LinkItem[] })[];

interface Params {
  items: Breadcrumb;
  className?: string;
}

export default function Breadcrumbs({ items, className }: Params) {
  let lastIdx = items.findIndex((i) => !i.text) - 1;
  if (lastIdx < 0) lastIdx = items.length - 1;

  const filtered = items.map((i) => ({
    ...i,
    dropdown: i.dropdown?.filter((d) => d.text !== i.text),
  }));

  if (!filtered.length) return <></>;

  return (
    <div className={className}>
      <div className="flex flex-wrap gap-y-0 gap-3 text-neutral-500 text-sm">
        {filtered.map((item, idx) => (
          <div className="group flex gap-1.5" key={idx}>
            <div className="group-first:hidden translate-y-px">{">"}</div>
            <div className="relative">
              {item.text ? (
                <a
                  href={item.href}
                  className={twMerge(
                    "whitespace-nowrap max-md:text-xs underline-offset-[3px] group-hover:underline",
                    lastIdx === idx
                      ? "font-semibold text-neutral-800"
                      : "group-hover:text-red-600 cursor-pointer"
                  )}
                >
                  {item.text}
                </a>
              ) : (
                <p className="w-10 cursor-default">. . .</p>
              )}
              <div
                className={twJoin(
                  "absolute pt-2 hidden group-hover:block top-full z-50 ",
                  !!item.text && "left-1"
                )}
              >
                {!!item.dropdown?.length && (
                  <div className="bg-white rounded border border-slate-300 p-4 w-fit">
                    <ul className="flex flex-col gap-2 text-sm leading-[1] whitespace-nowrap pr-1">
                      {item.text && (
                        <li className="font-medium text-neutral-800">
                          {item.text}
                        </li>
                      )}
                      {item.dropdown.map((dd, idx) => (
                        <Fragment key={idx}>
                          <li className="first:hidden">
                            <hr />
                          </li>
                          <a href={dd.href}>
                            <li className="hover:text-red-500 underline-offset-[3px] hover:underline">
                              {dd.text}
                            </li>
                          </a>
                        </Fragment>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

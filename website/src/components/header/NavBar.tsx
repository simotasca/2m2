"use client";

import { useTranslation } from "@/context/lang/client";
import iconDown from "@/images/icons/white/down.svg";
import type { EcodatData } from "@/lib/client/filters";
import { ecodatData } from "@/lib/client/filters";
import routes from "@/lib/shared/routes";
import Image from "next/image";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { twJoin, twMerge } from "tailwind-merge";
import Link from "../navigation/Link";

export default function Navbar({ small }: { small: boolean }) {
  const { t } = useTranslation();
  return (
    <nav
      className={twMerge(
        "flex items-center justify-center gap-x-4 font-medium max-md:text-sm",
        small ? "translate-y-px lg:gap-x-8" : "md:gap-x-8"
      )}>
      <Link href={routes.home()}>{t("header.navbar.home")}</Link>
      <DropdownCarParts small={small} />
      <DropdownModels small={small} />
      <Link href={routes.about()}>{t("header.navbar.about")}</Link>
      <NextLink className={twJoin(small && "max-md:hidden")} href="#contacts">
        {t("header.navbar.contacts")}
      </NextLink>
    </nav>
  );
}

function DropdownCarParts({ small }) {
  const { t } = useTranslation();
  const { t: tCat } = useTranslation("categories");

  const [content, setContent] = useState<EcodatData>();

  useEffect(() => {
    ecodatData.then((f) => setContent(f));
  }, []);

  return (
    <button
      className={twMerge(
        "group relative outline-none flex items-center gap-1 border border-[#DA8D6C] bg-[linear-gradient(180deg,#DB5F06_30%,#D20404_180%)] rounded pl-3 pr-1.5 sm:pl-5 sm:pr-4 py-1",
        !small && "md:py-2"
      )}>
      <span>{t("header.navbar.parts.title")}</span>
      <Image src={iconDown} alt="dropdown icon" className="w-4 mt-0.5" />
      <div className="absolute hidden group-hover:block top-full left-0 text-left">
        <div className="bg-white rounded-md text-black mt-2 py-6 px-8 border">
          <div className="max-h-[60vh] overflow-y-auto">
            <ul className="grid grid-cols-[repeat(3,auto)] gap-x-7 gap-y-3">
              {content?.categories?.map((c) => (
                <li
                  key={c.id}
                  className="flex flex-col text-sm leading-4  whitespace-nowrap">
                  <a
                    className="hover:underline underline-offset-2"
                    href={routes.category(c.name)}>
                    {tCat(c.name, c.name)}
                  </a>
                  {!!c.typologies?.length && (
                    <ul className="mt-1 flex flex-wrap">
                      {c.typologies.map((t) => (
                        <li key={t.id} className="group font-light text-sm">
                          <span className="lowercase">
                            <a
                              className="hover:underline underline-offset-2"
                              href={routes.type(c.name, t.name)}>
                              {t.name}
                            </a>
                          </span>
                          <span className="group-last:hidden mr-1.5">,</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </button>
  );
}

function DropdownModels({ small }) {
  const { t } = useTranslation();

  const [content, setContent] = useState<EcodatData>();

  useEffect(() => {
    ecodatData.then((f) => setContent(f));
  }, []);

  return (
    <button
      className={twMerge(
        "group relative outline-none flex items-center gap-1 px-1 py-1",
        small ? "relative max-md:hidden" : "relative md:py-2"
      )}>
      <span>{t("header.navbar.models.title")}</span>
      <Image src={iconDown} alt="dropdown icon" className="w-4 mt-0.5" />
      <div className="absolute hidden group-hover:block top-full left-0 text-left">
        <div className="bg-white rounded-md text-black mt-2 py-6 px-8 border">
          <div className="max-h-[60vh] overflow-y-auto">
            <ul className="grid grid-cols-[repeat(3,auto)] gap-x-7 gap-y-3">
              {content?.brands?.map((b) => (
                <li
                  key={b.id}
                  className="flex flex-col text-sm leading-4  whitespace-nowrap">
                  <a
                    className="hover:underline underline-offset-2"
                    href={routes.brand(b.name)}>
                    {b.name}
                  </a>
                  {!!b.models?.length && (
                    <ul className="mt-1 flex flex-wrap">
                      {b.models.map((m) => (
                        <li key={m.id} className="group font-light text-sm">
                          <span className="lowercase">
                            <a
                              className="hover:underline underline-offset-2"
                              href={routes.model(b.name, m.name)}>
                              {m.name}
                            </a>
                          </span>
                          <span className="group-last:hidden mr-1.5">,</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </button>
  );
}

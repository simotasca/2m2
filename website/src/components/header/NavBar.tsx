"use client";

import { useTranslation } from "@/context/lang/client";
import iconDown from "@/images/icons/white/down.svg";
import routes from "@/lib/shared/routes";
import { Popover, Transition } from "@headlessui/react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

export default function Navbar({ small }: { small: boolean }) {
  const { t } = useTranslation();
  return (
    <nav
      className={twMerge(
        "flex items-center justify-between sm:justify-center gap-x-4 sm:gap-x-8 font-medium max-sm:text-sm max-sm:pl-2",
        small && "translate-y-px"
      )}>
      <a href={routes.home()} className="">
        {t("header.navbar.home")}
      </a>
      <DropdownCarParts small={small} />
      <div className="max-sm:hidden contents">
        <DropdownModels small={small} />
      </div>
      <a href={routes.about()}>{t("header.navbar.about")}</a>
      <a href="#" className="max-sm:hidden">
        {t("header.navbar.contacts")}
      </a>
    </nav>
  );
}

function DropdownCarParts({ small }) {
  const { t } = useTranslation();
  return (
    <Popover>
      {({ open }) => (
        <>
          <Popover.Button
            as="button"
            className={twMerge(
              "outline-none flex items-center gap-1 rounded pl-3 pr-1.5 sm:pl-5 sm:pr-4 border border-[#DA8D6C] bg-[linear-gradient(180deg,#DB5F06_30%,#D20404_180%);]",
              small ? "py-1" : "py-0.5 sm:py-2"
            )}>
            <span>{t("header.navbar.parts.title")}</span>
            <Image src={iconDown} alt="dropdown icon" className="w-4 mt-0.5" />
          </Popover.Button>
          <Transition
            show={open}
            className="absolute"
            enter="transition duration-100 ease-out"
            enterFrom="transform -translate-y-2 opacity-0"
            enterTo="transform translate-y-0 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform translate-y-0 opacity-100"
            leaveTo="transform -translate-y-2 opacity-0">
            <Popover.Panel className="pt-2 z-10 min-w-fit">
              <div className="grid grid-cols-2 bg-white border border-slate-400 rounded-md text-black p-4  gap-y-1">
                <a href="#">Analytics</a>
                <a href="#">Engagement</a>
                <a href="#">Security</a>
                <a href="#">Integrations</a>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}

function DropdownModels({ small }) {
  const { t } = useTranslation();
  return (
    <Popover>
      {({ open }) => (
        <>
          <Popover.Button
            as="button"
            className={twMerge(
              "outline-none flex items-center gap-1 py-2",
              small && "py-1"
            )}>
            <span>{t("header.navbar.models.title")}</span>
            <Image src={iconDown} alt="dropdown icon" className="w-4 mt-0.5" />
          </Popover.Button>
          <Transition
            show={open}
            className="absolute"
            enter="transition duration-100 ease-out"
            enterFrom="transform -translate-y-2 opacity-0"
            enterTo="transform translate-y-0 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform translate-y-0 opacity-100"
            leaveTo="transform -translate-y-2 opacity-0">
            <Popover.Panel className="-translate-x-3 pt-2 z-10 min-w-fit">
              <div className="grid grid-cols-2 bg-white border border-slate-400 rounded-md text-black p-4  gap-y-1">
                <a href="#">Analytics</a>
                <a href="#">Engagement</a>
                <a href="#">Security</a>
                <a href="#">Integrations</a>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}

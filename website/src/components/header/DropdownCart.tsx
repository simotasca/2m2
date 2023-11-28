"use client";

import useTranslation from "@/context/lang/useTranslation";
import iconCart from "@/images/icons/cart-active.svg";
import iconDown from "@/images/icons/white/down.svg";
import { Popover, Transition } from "@headlessui/react";
import Image from "next/image";

function DropdownCart() {
  const { t } = useTranslation();
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            as="button"
            className="flex items-center h-full px-3 rounded-l outline-none hover:outline hover:outline-[#e0c4393a] -outline-offset-1">
            <div className="h-fit text-right translate-y-px">
              <p className="font-semibold text-sm leading-[1.1]">1200.00€</p>
              <p className="text-neutral-400 text-xs leading-[1]">
                2 {t("header.cart.products.many")}
              </p>
            </div>
            <Image
              src={iconCart}
              alt="search icon"
              className="flex-shrink-0 w-6 ml-2"
            />
            <Image src={iconDown} alt="dropdown icon" className="w-4 -ml-1.5" />
          </Popover.Button>
          <Transition
            show={open}
            className="absolute -right-3 w-screen flex justify-end pointer-events-none"
            enter="transition duration-100 ease-out"
            enterFrom="transform -translate-y-2 opacity-0"
            enterTo="transform translate-y-0 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform translate-y-0 opacity-100"
            leaveTo="transform -translate-y-2 opacity-0">
            <Popover.Panel className="pt-2 z-10 pointer-events-auto">
              <div className="grid grid-cols-2 w-fit bg-white border border-slate-400 rounded-md text-black p-4  gap-y-1">
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

export default DropdownCart;

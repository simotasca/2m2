"use client";

import useAuth from "@/context/auth/useAuth";
import useCart from "@/context/cart/useCart";
import useTranslation from "@/context/lang/useTranslation";
import iconCart from "@/images/icons/cart-active.svg";
import iconDown from "@/images/icons/white/down.svg";
import iconUser from "@/images/icons/white/user.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { twJoin } from "tailwind-merge";
import { LoginModal } from "../auth/LoginModal";

export function UserData({ small }: { small: boolean }) {
  const { setIsOpen, total, count } = useCart();
  const { t } = useTranslation();
  return (
    <div
      className={twJoin(
        "rounded flex -mr-1 justify-self-end",
        small
          ? "lg:border lg:border-neutral-500  lg:bg-neutral-800 lg:mr-0 lg:justify-self-auto"
          : "md:border md:border-neutral-500  md:bg-neutral-800 md:mr-0 md:justify-self-auto"
      )}>
      <button
        onClick={() => setIsOpen(true)}
        className={twJoin(
          "flex items-center h-full px-1 rounded-l outline-none hover:outline hover:outline-[#e0c4393a] -outline-offset-1",
          small ? "lg:px-3" : "md:px-3"
        )}>
        <div
          className={twJoin(
            "h-fit text-right translate-y-px hidden",
            small ? "lg:block" : "md:block"
          )}>
          <p className="font-semibold text-sm leading-[1.1]">
            {total ? total.toFixed(2) + "€" : "---"}
          </p>
          <p className="text-neutral-400 text-xs leading-[1]">
            {count} {t("header.cart.products.many")}
          </p>
        </div>
        <Image
          src={iconCart}
          alt="search icon"
          className={twJoin(
            "max-w-none flex-shrink-0 w-6",
            small ? "lg:ml-2" : "md:ml-2"
          )}
        />
        <Image
          src={iconDown}
          alt="dropdown icon"
          className={twJoin(
            "max-w-none flex-shrink-0 w-4 -ml-1.5 hidden",
            small ? "lg:block" : "md:block"
          )}
        />
      </button>

      <div className={twJoin("py-2.5 hidden", small ? "lg:block" : "md:block")}>
        <div className="w-px h-full bg-neutral-500"></div>
      </div>

      <DropdownLogin small={small} />
    </div>
  );
}

function DropdownLogin({ small }: { small: boolean }) {
  const { t, r } = useTranslation();
  const router = useRouter();
  const { session } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="relative h-full">
        <button
          onClick={() =>
            session?.user ? router.push("/reserved") : setOpen((o) => !o)
          }
          className={twJoin(
            "h-full flex items-center outline-none",
            small ? "lg:px-3" : "md:px-3"
          )}>
          <p
            className={twJoin(
              "overflow-hidden font-semibold text-sm max-w-[9rem] whitespace-nowrap overflow-ellipsis text-right hidden",
              small ? "lg:block" : "md:block"
            )}>
            {session?.user?.email || t("header.login")}
          </p>
          <Image
            src={iconUser}
            alt="user icon"
            className={twJoin(
              "max-w-none w-7 ml-1",
              small ? "lg:ml-2" : "md:ml-2"
            )}
          />
        </button>

        {open && (
          <div
            className="fixed z-[49] w-screen h-screen inset-0"
            onClick={() => setOpen(false)}></div>
        )}

        <div
          className={twJoin(
            "absolute right-0 w-screen flex justify-end pointer-events-none z-50",
            open
              ? "translate-y-0 opacity-100 transition-all"
              : "-translate-y-2 opacity-0"
          )}>
          <div className={twJoin("pt-2 z-10", open && "pointer-events-auto")}>
            <LoginModal
              title={
                <p className="text-dark text-sm font-medium text-right leading-[1.1]">
                  <span>{r("auth.login.title")}</span>
                  <br />
                  <span className="font-normal text-neutral-500">
                    {t("auth.login.enter-details")}
                  </span>
                </p>
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}

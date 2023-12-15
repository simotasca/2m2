"use client";

import useCart from "@/context/cart/useCart";
import useTranslation from "@/context/lang/useTranslation";
import { Database } from "@/database.types";
import iconCart from "@/images/icons/cart-active.svg";
import iconDown from "@/images/icons/white/down.svg";
import iconUser from "@/images/icons/white/user.svg";
import gifLoader from "@/images/loader.gif";
import imgLogo from "@/images/logo-dark.svg";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEventHandler, useEffect, useState } from "react";
import { twJoin } from "tailwind-merge";
import Button from "../ui/Button";
import Link from "next/link";
import routes from "@/lib/shared/routes";
import LoadingScreen from "../ui/LoadingScreen";

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
  const { t } = useTranslation();
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();
  const [user, setUser] = useState<string>();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [pwInputType, setPwInputType] = useState<"password" | "text">(
    "password"
  );

  const togglePasswordVisibility = () => {
    setPwInputType(pwInputType === "password" ? "text" : "password");
  };

  useEffect(() => {
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user?.user_metadata?.username);
    })();
  }, []);

  useEffect(() => {
    if (loading) {
      document.body.classList.add("login-is-loading");
    } else {
      document.body.classList.remove("login-is-loading");
    }
  }, [loading]);

  const handleLogin: FormEventHandler = async (e) => {
    e.preventDefault();

    setPwInputType("password");

    const data = new FormData(e.target as HTMLFormElement);

    const email = data.get("email")?.toString();
    const password = data.get("password")?.toString();

    if (!email || !password) {
      // TODO: i18n
      setErrorMessage("Inserire email e password");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      // TODO: display better error message
      setErrorMessage(error.message + " (" + error.status + ")");
      setLoading(false);
      return;
    }

    router.push("/reserved");
  };

  return (
    <>
      <LoadingScreen message="Login in corso" loading={loading} />

      <div className="relative h-full">
        <button
          onClick={() => (user ? router.push("/reserved") : setOpen((o) => !o))}
          className={twJoin(
            "h-full flex items-center outline-none",
            small ? "lg:px-3" : "md:px-3"
          )}>
          <p
            className={twJoin(
              "overflow-hidden font-semibold text-sm max-w-[9rem] whitespace-nowrap overflow-ellipsis text-right hidden",
              small ? "lg:block" : "md:block"
            )}>
            {user || t("header.login")}
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
            <div className="w-80 bg-white border border-slate-400 rounded-md text-black p-4 gap-y-1">
              <div className="flex items-start justify-between">
                <Image src={imgLogo} alt="logo 2m2" className="w-12 -mt-px" />
                <p className="text-dark text-sm font-medium text-right leading-[1.1]">
                  <span>Welcome back!</span>
                  <br />
                  <span className="font-normal text-neutral-500">
                    Please enter details.
                  </span>
                </p>
              </div>

              <form onSubmit={handleLogin} className="flex flex-col gap-3 mt-2">
                <div className="border border-neutral-500 bg-stone-100">
                  <input
                    className="placeholder:text-neutral-500 py-0.5 px-2 text-sm outline-none"
                    type="email"
                    name="email"
                    placeholder="email"
                  />
                </div>
                <div className="border border-neutral-500 grid grid-cols-[1fr_auto] px-2 gap-x-2 bg-stone-100 -mt-1">
                  <input
                    className={twJoin(
                      "py-0.5 outline-none bg-stone-100 w-full",
                      "placeholder:text-neutral-500 placeholder:text-sm placeholder:leading-normal placeholder:tracking-normal text-sm"
                    )}
                    type={pwInputType}
                    name="password"
                    placeholder="password"
                  />
                  <button
                    className="text-xs text-neutral-500"
                    onClick={(e) => {
                      e.preventDefault();
                      togglePasswordVisibility();
                    }}>
                    {pwInputType === "text" ? "hide" : "show"}
                  </button>
                </div>

                <Link
                  className="underline text-xs -mt-1.5 text-neutral-500"
                  href="#">
                  Forgot your password?
                  {/* TODO */}
                </Link>

                {errorMessage && (
                  <p className="text-red-500 text-sm">{errorMessage}</p>
                )}
                <Button
                  type="submit"
                  className="w-full font-normal text-sm bg-red-500 text-white">
                  Login
                </Button>
              </form>

              <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center text-center px-2 text-neutral-500">
                <hr className="translate-y-px border-neutral-400" />
                <span>or</span>
                <hr className="translate-y-px border-neutral-400" />
              </div>

              <Link href={routes.register()}>
                <Button className="w-full font-medium text-sm bg-red-gradient text-white">
                  Register
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

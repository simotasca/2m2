"use client";

import useCart from "@/context/cart/useCart";
import useTranslation from "@/context/lang/useTranslation";
import { Database } from "@/database.types";
import iconCart from "@/images/icons/cart-active.svg";
import iconDown from "@/images/icons/white/down.svg";
import iconUser from "@/images/icons/white/user.svg";
import iconClose from "@/images/icons/close.svg";
import gifLoader from "@/images/loader.gif";
import { Popover, Transition } from "@headlessui/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEventHandler, useEffect, useRef, useState } from "react";
import useRefState from "../../hooks/useRefState";
import { productName } from "@/lib/shared/ecodat";
import Button from "../ui/Button";

export function UserData() {
  const { setIsOpen, total, count } = useCart();
  const { t } = useTranslation();
  return (
    <div className="rounded sm:border sm:border-neutral-500 sm:bg-neutral-800 flex -mr-1 sm:mr-0 justify-self-end sm:justify-self-auto">
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center h-full px-1 sm:px-3 rounded-l outline-none hover:outline hover:outline-[#e0c4393a] -outline-offset-1">
        <div className="h-fit text-right translate-y-px hidden sm:block">
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
          className="flex-shrink-0 w-6 sm:ml-2"
        />
        <Image
          src={iconDown}
          alt="dropdown icon"
          className="hidden sm:block w-4 -ml-1.5"
        />
      </button>

      <div className="py-2.5 hidden sm:block">
        <div className="w-px h-full bg-neutral-500"></div>
      </div>

      <DropdownLogin />
    </div>
  );
}

function DropdownLogin() {
  const { t } = useTranslation();
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();
  const [user, setUser] = useState<string>();
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
      {loading && (
        <div className="fixed inset-0 w-screen h-screen grid place-items-center bg-black bg-opacity-60 z-50">
          <div className="pb-20 flex flex-col items-center">
            <Image src={gifLoader} alt="loader" className="w-12" />
            <p className="font-semibold [text-shadow:0_0_4px_black]">
              Login in corso...
            </p>
          </div>
        </div>
      )}

      <Popover className="relative h-full">
        {({ open }) => (
          <>
            <Popover.Button
              onClick={() => user && router.push("/reserved")}
              as="button"
              className="h-full flex items-center sm:px-3 outline-none">
              <p className="overflow-hidden font-semibold text-sm max-w-[9rem] whitespace-nowrap overflow-ellipsis text-right hidden sm:block">
                {user || t("header.login")}
              </p>
              <Image
                src={iconUser}
                alt="search icon"
                className="flex-shrink-0 w-7 ml-1 sm:ml-2"
              />
            </Popover.Button>
            {!user && (
              <Transition
                show={open}
                className="absolute right-0 w-screen flex justify-end pointer-events-none"
                enter="transition duration-100 ease-out"
                enterFrom="transform -translate-y-2 opacity-0"
                enterTo="transform translate-y-0 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform translate-y-0 opacity-100"
                leaveTo="transform -translate-y-2 opacity-0">
                <Popover.Panel className="pt-2 z-10 pointer-events-auto">
                  <div className="w-80 bg-white border border-slate-400 rounded-md text-black p-4  gap-y-1">
                    <p className="text-neutral-500 text-sm text-right">
                      Welcome back! Please enter details.
                    </p>

                    <form
                      onSubmit={handleLogin}
                      className="flex flex-col gap-3 mt-2">
                      <div className="border border-neutral-500 bg-slate-100">
                        <input
                          className="placeholder:text-neutral-500 py-0.5 px-2 text-sm outline-none"
                          type="email"
                          name="email"
                          placeholder="email"
                        />
                      </div>
                      <div className="border border-neutral-500 grid grid-cols-[1fr_auto] px-2 gap-x-2 bg-slate-100 -mt-1">
                        <input
                          className="placeholder:text-neutral-500 py-0.5 text-sm outline-none bg-white w-full"
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

                      <a
                        className="underline text-xs -mt-1.5 text-neutral-500"
                        href="#">
                        Forgot your password?
                        {/* TODO */}
                      </a>

                      {errorMessage && (
                        <p className="text-red-500 text-sm">{errorMessage}</p>
                      )}
                      <Button
                        type="submit"
                        className="w-full font-normal text-sm bg-red-500 text-white">
                        Login
                      </Button>
                    </form>
                    <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center text-center px-2 my-1.5 text-neutral-500">
                      <hr className="translate-y-px border-neutral-400" />
                      <span>or</span>
                      <hr className="translate-y-px border-neutral-400" />
                    </div>
                    <a href="/register">
                      <Button className="w-full font-medium text-sm bg-red-gradient text-white">
                        Register
                      </Button>
                    </a>
                  </div>
                </Popover.Panel>
              </Transition>
            )}
          </>
        )}
      </Popover>
    </>
  );
}

function DropdownCart() {
  const { t } = useTranslation();
  const { count, total, cart: products, removeProduct, loading } = useCart();
  const [open, setOpen, openRef] = useRefState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { current } = ref;
    if (!current) return;

    const closeListener = (e: MouseEvent) => {
      if (!openRef.current) return;
      let parent = (e.target as HTMLElement | null)?.parentElement;
      while (parent != null) {
        if (parent == current) {
          return;
        }
        parent = parent.parentElement;
      }
      setOpen(false);
    };

    window.removeEventListener("click", closeListener);
    window.addEventListener("click", closeListener);

    return () => {
      window.removeEventListener("click", closeListener);
    };
  }, [ref]);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => {
          products.length && !loading && setOpen(!open);
        }}
        className="flex items-center h-full px-3 rounded-l outline-none hover:outline hover:outline-[#e0c4393a] -outline-offset-1">
        <div className="h-fit text-right translate-y-px">
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
          className="flex-shrink-0 w-6 ml-2"
        />
        <Image src={iconDown} alt="dropdown icon" className="w-4 -ml-1.5" />
      </button>
      <Transition
        show={!loading && open}
        className="absolute -right-3 w-screen flex justify-end pointer-events-none z-50"
        enter="transition duration-100 ease-out"
        enterFrom="transform -translate-y-2 opacity-0"
        enterTo="transform translate-y-0 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform translate-y-0 opacity-100"
        leaveTo="transform -translate-y-2 opacity-0">
        <div className="pt-2 pointer-events-auto">
          <div className="flex flex-col w-fit max-w-xs bg-white border border-dark rounded text-dark pl-4 pt-4 pb-3 overflow-hidden">
            <div className="max-h-[50vh] overflow-y-auto flex flex-col gap-2">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="grid grid-cols-[1fr_auto_auto] gap-2 pr-4">
                  <div>
                    <p className="font-semibold text-sm leading-[1]">
                      {productName(p).slice(0, 50) + " . . ."}
                    </p>
                    <p className="leading-[1] text-neutral-600 text-xs">
                      #{p.oeCode}
                    </p>
                  </div>
                  <p className="text-neutral-700 text-sm leading-[1.2] font-bold pr-2">
                    {p.price} €
                  </p>
                  <div className="pr-1">
                    <button onClick={() => removeProduct(p)}>
                      <Image
                        src={iconClose}
                        alt="close icon"
                        className="w-4 opacity-60"></Image>
                    </button>
                  </div>
                  <div className="col-span-full h-px bg-neutral-300"></div>
                </div>
              ))}
            </div>
            <div className="pr-4">
              <button className="mt-2 bg-red-500 text-white text-center w-full py-1 px-8 font-semibold uppercase">
                CHECKOUT
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  );
}

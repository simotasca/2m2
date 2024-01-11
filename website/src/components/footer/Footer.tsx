"use client";

import useCart from "@/context/cart/useCart";
import useTranslation from "@/context/lang/useTranslation";
import iconTime from "@/images/icons/time.svg";
import gifLoader from "@/images/loader.gif";
import logo2m2 from "@/images/logo.svg";
import type { EcodatData } from "@/lib/client/filters";
import { ecodatData } from "@/lib/client/filters";
import { createClientSideClient } from "@/lib/client/supabase";
import routes from "@/lib/shared/routes";
import Image from "next/image";
import Link from "@/components/navigation/Link";
import { useRouter } from "next/navigation";
import type { FormEventHandler } from "react";
import { useEffect, useState } from "react";
import Button from "../ui/Button";
import MaxWidthContainer from "../ui/MaxWidthContainer";
import useAuth from "@/context/auth/useAuth";

export default function Footer() {
  const { setIsOpen } = useCart();

  const { t } = useTranslation("footer");
  const { t: tCat } = useTranslation("categories");
  const { t: tHead } = useTranslation("header");

  const [filters, setFilters] = useState<EcodatData>();

  useEffect(() => {
    ecodatData.then((f) => setFilters(f));
  }, []);

  return (
    <div className="bg-[#363636] text-white px-2 py-8 sm:py-14">
      <MaxWidthContainer className="bg-neutral-500 h-px mb-8 mx-auto max-w-[95%]"></MaxWidthContainer>

      <MaxWidthContainer className="grid xs:grid-cols-2 sm:grid-cols-[auto_1fr_auto] lg:grid-cols-[minmax(5rem,auto)_auto_1fr_auto] gap-4 sm:gap-16 gap-y-10 lg:px-20">
        <div className="max-lg:col-span-full">
          <Image className="w-20" src={logo2m2} alt="" />
        </div>

        <div className="sm:max-md:row-span-2">
          <h3 className="uppercase font-bold mb-2 leading-5 whitespace-nowrap">
            {t("categories.title")}
          </h3>

          <ul className="flex flex-col gap-2">
            {filters?.categories?.map((c) => (
              <li
                key={c.id}
                className="flex flex-col text-sm leading-4  whitespace-nowrap"
              >
                <a
                  className="hover:underline underline-offset-2"
                  href={routes.category(c.name)}
                >
                  {tCat(c.name, c.name)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="uppercase font-bold mb-2 leading-5 whitespace-nowrap">
            {t("conditions.title")}
          </h3>
          <ul className="flex flex-col gap-2 text-sm">
            <li className="leading-4 whitespace-nowrap hover:underline underline-offset-4 cursor-pointer">
              <Link href={routes.terms()}>
                {t("conditions.terms-and-conditions")}
              </Link>
            </li>
            <li className="leading-4 whitespace-nowrap hover:underline underline-offset-4 cursor-pointer">
              <Link href={routes.cookie()}>Cookie Policy</Link>
            </li>
            <li className="leading-4 whitespace-nowrap hover:underline underline-offset-4 cursor-pointer">
              <Link href={routes.privacy()}>Privacy Policy</Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-1 max-md:col-span-full">
          <h3 className="uppercase font-bold">Login / {t("signup")}</h3>
          <div className="max-w-[400px]">
            <DropdownLogin />
          </div>
        </div>
      </MaxWidthContainer>

      <MaxWidthContainer className="bg-neutral-500 h-px mt-9 mb-3 mx-auto max-w-[95%]"></MaxWidthContainer>

      <MaxWidthContainer className="lg:px-20">
        <div className="flex max-xs:col-span-4 ">
          <ul className="flex flex-wrap gap-y-2 gap-x-10 text-sm uppercase">
            <li>
              <Link
                href={routes.home()}
                className="hover:underline underline-offset-4 cursor-pointer"
              >
                {tHead("navbar.home")}
              </Link>
            </li>
            <li>
              <Link
                href={routes.about()}
                className="hover:underline underline-offset-4 cursor-pointer"
              >
                {tHead("navbar.about")}
              </Link>
            </li>
            <li>
              <Link
                href={routes.products()}
                className="hover:underline underline-offset-4 cursor-pointer"
              >
                {tHead("search-bar.search")}
              </Link>
            </li>
            <li>
              <button
                onClick={() => setIsOpen(true)}
                className="hover:underline underline-offset-4 cursor-pointer"
              >
                {t("your-cart")}
              </button>
            </li>
          </ul>
          <ul className="max-sm:hidden text-sm ml-auto mr-0">
            <li>© 2023 2M2 Ricambi. All rights reserved.</li>
          </ul>
        </div>
      </MaxWidthContainer>

      <div className="h-12"></div>

      <ContactsSection />
    </div>
  );
}

function DropdownLogin() {
  const { t } = useTranslation();
  const router = useRouter();
  const { session } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [pwInputType, setPwInputType] = useState<"password" | "text">(
    "password"
  );

  const togglePasswordVisibility = () => {
    setPwInputType(pwInputType === "password" ? "text" : "password");
  };

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
      setErrorMessage(t("errors.required-mail-and-password"));
      return;
    }

    setLoading(true);

    const supabase = createClientSideClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMessage(error.message + " (" + error.status + ")");
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
              {t("auth.login.logging-in")}
            </p>
          </div>
        </div>
      )}

      <section className="pointer-events-auto [&_*]:[min-width:0_!important]">
        <div className="bg-[#363636] text-black">
          <form onSubmit={handleLogin} className="flex flex-col gap-3 mt-2">
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
                className="placeholder:text-neutral-500 py-0.5 text-sm outline-none bg-white w-ful"
                type={pwInputType}
                name="password"
                placeholder="password"
              />
              <button
                className="text-xs text-neutral-500"
                onClick={(e) => {
                  e.preventDefault();
                  togglePasswordVisibility();
                }}
              >
                {pwInputType === "text"
                  ? t("auth.login.hide-password")
                  : t("auth.login.show-password")}
              </button>
            </div>

            <Link
              className="underline text-xs -mt-1.5 text-neutral-200"
              href={routes.passwordReset()}
            >
              {t("auth.login.forgot-password")}
              {/* TODO */}
            </Link>

            {errorMessage && (
              <p className="text-red-500 text-sm">{errorMessage}</p>
            )}

            <Button
              type="submit"
              className="w-full font-normal text-sm bg-red-500 text-white"
            >
              Login
            </Button>
          </form>
          <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center text-center px-2 my-1.5 text-neutral-500">
            <hr className="translate-y-px border-neutral-500" />
            <span className="text-neutral-400">or</span>
            <hr className="translate-y-px border-neutral-500" />
          </div>
          <Link href={routes.register()}>
            <Button className="w-full font-medium text-sm bg-red-gradient text-white">
              {t("auth.login.signup")}
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}

function ContactsSection() {
  const { t, r } = useTranslation();

  return (
    <MaxWidthContainer className="grid md:grid-cols-[3fr_2fr] lg:grid-cols-2 gap-x-12 gap-y-6 max-xs:-ml-2 max-xs:px-6 lg:px-20">
      <div>
        <ul className="flex flex-col gap-1 text-white">
          <li className="contents">
            <div className=" leading-tight">
              <p>
                <span className="text-xs leading-tight">Email: </span>
                <span className="font-medium text-sm leading-tight">
                  assistenza@2m2.com
                </span>
              </p>
            </div>
          </li>
          <li className=" h-px bg-neutral-600"></li>
          <li className="contents">
            <div className=" leading-tight">
              <p>
                <span className="text-xs leading-tight">
                  {t("contacts.telephone.title")}{" "}
                </span>
                <br className="xs:hidden md:block lg:hidden" />
                <span className="font-medium text-sm leading-tight">
                  +39 374 9284720
                </span>
              </p>
            </div>
          </li>
          <li className="col-span-3 h-px bg-neutral-600"></li>
          <li className="contents">
            <div className=" leading-tight">
              <p>
                <span className="text-xs leading-tight">Whatsapp: </span>
                <br className="xs:hidden md:block lg:hidden" />
                <span className="font-medium text-sm leading-tight">
                  +39 374 9284720
                </span>
              </p>
            </div>
          </li>
        </ul>
      </div>
      <div>
        <ul className="flex flex-col gap-2 text-white text-sm">
          <li className="flex gap-2 items-center">
            <Image
              src={iconTime}
              className="opacity-70 w-4 aspect-square translate-y-px filter invert"
              alt=""
            />
            <p>
              {r("contacts.timetables.monday-friday")}
              <span className="">
                <br className="xs:hidden md:block lg:hidden" /> 08:30-12:30 /
                14:40-17:30
              </span>
            </p>
          </li>
          <li className="flex gap-2 items-center">
            <Image
              src={iconTime}
              className="opacity-70 w-4 aspect-square translate-y-px filter invert"
              alt=""
            />
            <p>
              <b className="font-medium">{r("contacts.timetables.saturday")}</b>
              <span className="">
                <br className="xs:hidden md:block lg:hidden" /> 08:30-12:30
              </span>
            </p>
          </li>
        </ul>
      </div>
    </MaxWidthContainer>
  );
}

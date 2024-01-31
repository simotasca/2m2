"use client";

import useTranslation from "@/context/lang/useTranslation";
import imgLogo from "@/images/logo-dark.svg";
import { createClientSideClient } from "@/lib/client/supabase";
import routes from "@/lib/shared/routes";
import Image from "next/image";
import Link from "@/components/navigation/Link";
import { useRouter } from "next/navigation";
import { FormEventHandler, useEffect, useState } from "react";
import { twJoin } from "tailwind-merge";
import Button from "../ui/Button";
import LoadingScreen from "../ui/LoadingScreen";

export function LoginModal({ title }: { title: JSX.Element }) {
  const router = useRouter();

  const { t, r } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const [pwInputType, setPwInputType] = useState<"password" | "text">(
    "password"
  );

  useEffect(() => {
    if (loading) {
      document.body.classList.add("login-is-loading");
    } else {
      document.body.classList.remove("login-is-loading");
    }
  }, [loading]);

  const togglePasswordVisibility = () => {
    setPwInputType(pwInputType === "password" ? "text" : "password");
  };

  const handleLogin: FormEventHandler = async (e) => {
    e.preventDefault();

    setPwInputType("password");

    const data = new FormData(e.target as HTMLFormElement);

    const email = data.get("email")?.toString();
    const password = data.get("password")?.toString();

    if (!email || !password) {
      // TODO: i18n
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
      // TODO: display better error message
      setErrorMessage(error.message);
      return;
    }

    router.push("/reserved");
  };

  return (
    <>
      <LoadingScreen message={t("auth.login.logging-in")} loading={loading} />

      <div className="w-80 bg-white border border-slate-400 rounded-md text-black p-4 gap-y-1">
        <div className="flex items-start justify-between gap-4">
          <Image src={imgLogo} alt="logo 2m2" className="w-12 -mt-px" />
          {title}
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
              }}
            >
              {pwInputType === "text"
                ? t("auth.login.hide-password")
                : t("auth.login.show-password")}
            </button>
          </div>

          <Link
            className="underline text-xs -mt-1.5 text-neutral-500"
            href={routes.passwordReset()}
          >
            {t("auth.login.forgot-password")}
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

        <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center text-center px-2 text-neutral-500">
          <hr className="translate-y-px border-neutral-400" />
          <span>or</span>
          <hr className="translate-y-px border-neutral-400" />
        </div>

        <Link href={routes.register()}>
          <Button className="w-full font-medium text-sm bg-red-gradient text-white">
            {t("auth.login.signup")}
          </Button>
        </Link>
      </div>
    </>
  );
}

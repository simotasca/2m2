"use client";

import Button from "@/components/ui/Button";
import LoadingScreen from "@/components/ui/LoadingScreen";
import useTranslation from "@/context/lang/useTranslation";
import AuthLayout from "@/layouts/AuthLayout";
import routes from "@/lib/shared/routes";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  DetailedHTMLProps,
  FormEventHandler,
  InputHTMLAttributes,
  PropsWithChildren,
  useState,
} from "react";
import { twJoin } from "tailwind-merge";

export default function LoginForm() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [wrongCredentials, setWrongCredentials] = useState(false);

  const onSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    // setPwInputType("password");

    const { t } = useTranslation("errors");

    const data = new FormData(e.target as HTMLFormElement);

    const email = data.get("email")?.toString();
    const password = data.get("password")?.toString();

    if (!email || !password) {
      setErrorMessage(t("required-mail-and-password"));
      setWrongCredentials(true);
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      switch (error.name) {
        case "AuthApiError":
          setErrorMessage(t("control-credentials"));
          setWrongCredentials(true);
          break;
        case "AuthRetryableFetchError":
          setErrorMessage(t("unexpected-error"));
          break;
        default:
          setErrorMessage(JSON.stringify(error));
          break;
      }
      setLoading(false);
      return;
    }

    router.push("/reserved");
  };

  const { t, r } = useTranslation("auth");

  return (
    <>
      <LoadingScreen loading={loading} message={t("login.logging-in")} />

      <AuthLayout>
        <AuthLayout.Image />

        <AuthLayout.Title>{r("login.title")}</AuthLayout.Title>

        <form onSubmit={onSubmit} className="flex flex-col gap-2">
          <Label text="email" required>
            <Input
              placeholder="email"
              name="email"
              type="email"
              disabled={loading}
              error={wrongCredentials}
              onInput={() => setWrongCredentials(false)}
            />
          </Label>

          <Label text="password" required>
            <Input
              placeholder="password"
              name="password"
              type="password"
              disabled={loading}
              error={wrongCredentials}
              onInput={() => setWrongCredentials(false)}
            />
          </Label>

          <Link
            className="underline text-sm text-neutral-500"
            href={routes.passwordReset()}
          >
            {t("login.forgot-password")}
          </Link>

          <div className="w-full mt-2">
            <Button
              type="submit"
              className="bg-red-500 text-white w-full font-medium gap-2"
              disabled={loading}
            >
              <span>Login</span>
            </Button>

            {errorMessage && (
              <p className="text-red-500 mt-2 pl-px leading-tight text-sm">
                {errorMessage}
              </p>
            )}

            <p className="text-sm text-center mt-4 mb-1">
              <span className="text-neutral-600">
                {t("login.new-account")}{" "}
              </span>
              <Link
                href={routes.register()}
                className="font-semibold hover:text-red-500 hover:underline underline-offset-[3px]"
              >
                {t("login.signup")}
              </Link>
            </p>
          </div>
        </form>
      </AuthLayout>
    </>
  );
}

function Label({
  children,
  className,
  text,
  required,
}: PropsWithChildren<{
  className?: string;
  text: string;
  required?: boolean;
}>) {
  return (
    <div className={className}>
      <label>
        <p className="text-xs font-semibold pb-0.5 pl-0.5">
          <span>{text}</span>
          {required && <span className="text-red-500 pl-px">*</span>}
        </p>
        {children}
      </label>
    </div>
  );
}

type InputParams = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & { error?: boolean; required?: boolean };

function Input({ className, error, required, ...params }: InputParams) {
  return (
    <input
      className={twJoin(
        "w-full border border-neutral-300 outline-none px-2 py-1 placeholder:text-neutral-500 rounded-sm text-sm",
        error && "outline outline-1 outline-red-500 -outline-offset-1"
      )}
      {...params}
    />
  );
}

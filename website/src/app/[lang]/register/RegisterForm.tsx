"use client";

import Button from "@/components/ui/Button";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import iconLogo from "@/images/logo-dark.svg";
import imgBg from "@/images/main-background-engine.jpg";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  DetailedHTMLProps,
  FormEventHandler,
  InputHTMLAttributes,
  PropsWithChildren,
  useState,
} from "react";
import { twJoin } from "tailwind-merge";

export default function RegisterForm() {
  const [mode, setMode] = useState<"private" | "agency">("private");

  const router = useRouter();
  const supabase = createClientComponentClient();
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    supabase.auth
      .signUp({
        email: "simo.tasca@gmail.com",
        password: "asdfghjkl",
        options: {
          emailRedirectTo: `${location.origin}/api/auth/callback`,
          data: {
            username: `simo_tasca`,
          },
        },
      })
      .then(({ error }) => {
        if (error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("");
          setMessage("Check your email address!");
        }
      });
  };

  return (
    <div className="p-4 sm:p-8 z-10">
      <Image
        src={imgBg}
        alt="backgorund cover"
        className="fixed inset-0 w-full h-full object-cover -z-20"
      />
      <div className="fixed inset-0 w-full h-full bg-black bg-opacity-30 -z-10"></div>

      <MaxWidthContainer className="max-w-sm z-20 bg-white p-4 rounded [box-shadow:0px_0px_100px_black]">
        <Image
          src={iconLogo}
          alt="logo 2m2 autoricambi"
          className="w-16 mx-auto"
        />

        <h1 className="text-xl text-center font-bold mt-4 mb-2 uppercase">
          Create your <span className="text-red-500">Account</span>
        </h1>

        <div className="grid grid-cols-2 gap-2 pt-2 pb-4">
          <button
            onClick={() => setMode("private")}
            className={twJoin(
              "uppercase text-sm py-1 rounded border hover:bg-stone-200",
              mode === "private"
                ? "bg-red-gradient text-white font-medium border-transparent"
                : "bg-stone-100"
            )}>
            private
          </button>
          <button
            onClick={() => setMode("agency")}
            className={twJoin(
              "uppercase text-sm py-1 rounded border hover:bg-stone-200",
              mode === "agency"
                ? "bg-red-gradient text-white font-medium border-transparent"
                : "bg-stone-100"
            )}>
            business
          </button>
        </div>

        <form onSubmit={handleRegister} className="flex flex-col gap-2">
          <p className="uppercase font-bold mt-2 -mb-1">
            <span className="text-red-500">ACCESS</span>
            <span> DETAILS</span>
          </p>

          <Label text="username">
            <Input placeholder="username" name="username" type="text" />
          </Label>

          <Label text="email" required>
            <Input placeholder="email" name="email" type="email" />
          </Label>

          <Label text="password" required>
            <Input placeholder="password" name="password" type="password" />
          </Label>

          <p className="uppercase font-bold mt-2 -mb-1">
            <span className="text-red-500">
              {mode === "private" ? "user" : "business"}
            </span>
            <span> INFO</span>
          </p>

          {mode === "private" && (
            <>
              <Label text="name">
                <Input placeholder="name" name="name" type="text" />
              </Label>

              <Label text="surname">
                <Input placeholder="surname" name="surname" type="text" />
              </Label>

              <Label text="tax ID">
                <Input placeholder="tax ID" name="tax-id" type="text" />
              </Label>

              <Label text="phone">
                <Input placeholder="phone" name="phone" type="text" />
              </Label>
            </>
          )}

          {mode === "agency" && (
            <>
              <Label text="business name">
                <Input
                  placeholder="business name"
                  name="business-name"
                  type="text"
                />
              </Label>

              <Label text="tax ID">
                <Input placeholder="tax ID" name="tax ID" type="text" />
              </Label>

              <Label text="phone">
                <Input placeholder="phone" name="phone" type="text" />
              </Label>

              <p className="uppercase text-sm font-bold mt-2 -mb-1 text-neutral-600">
                Electronic billing data
              </p>

              <Label text="pec">
                <Input placeholder="pec" name="pec" type="email" />
              </Label>

              <Label text="sdi code">
                <Input placeholder="sdi code" name="sdi" type="email" />
              </Label>
            </>
          )}

          <div className="w-full mt-3">
            <div className="flex gap-2 mb-2">
              <input type="checkbox" className="accent-red-500" />
              <p className="text-sm">
                <span>Accept the </span>
                <a
                  href="#"
                  className="font-semibold hover:underline underline-offset-[3px]">
                  terms and conditions
                </a>
              </p>
            </div>

            <Button
              type="submit"
              className="bg-red-500 text-white w-full font-medium">
              submit
            </Button>

            {message && <p className="mt-2">{message}</p>}
            {errorMessage && (
              <p className="text-red-500 mt-2 leading-tight text-sm">
                {errorMessage}
              </p>
            )}

            <p className="text-sm text-center mt-4 mb-1">
              <span className="text-neutral-600">Already registered? </span>
              <a
                href="/login"
                className="font-semibold hover:underline underline-offset-[3px]">
                Login to account
              </a>
            </p>
          </div>
        </form>
      </MaxWidthContainer>
    </div>
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
> & { errorMessage?: string; required?: boolean };

function Input({
  className,
  errorMessage,
  required,
  type,
  ...params
}: InputParams) {
  return (
    <input
      className={twJoin(
        "w-full border border-neutral-300 outline-none px-2 py-1 placeholder:text-neutral-500 rounded-sm text-sm",
        errorMessage !== undefined &&
          "outline outline-1 outline-red-500 -outline-offset-1"
      )}
      type={type}
      {...params}
    />
  );
}

"use client";

import imgBg from "@/images/main-background-engine.jpg";
import Button from "@/components/ui/Button";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import imgLoad from "@/images/icons/loader.svg";
import iconLogo from "@/images/logo-dark.svg";
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

export default function LoginForm() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [wrongCredentials, setWrongCredentials] = useState(false);

  const onSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    // setPwInputType("password");

    const data = new FormData(e.target as HTMLFormElement);

    const email = data.get("email")?.toString();
    const password = data.get("password")?.toString();

    if (!email || !password) {
      // TODO: i18n
      setErrorMessage("Inserire email e password");
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
          setErrorMessage("Errore: controlla le tue credenziali");
          setWrongCredentials(true);
          break;
        case "AuthRetryableFetchError":
          setErrorMessage("Errore imprevisto: Riprova!");
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

  return (
    <>
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

          <h1 className="text-xl text-center font-bold mt-3 mb-2 uppercase">
            WELCOME <span className="text-red-500">BACK</span>
          </h1>

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

            <div className="w-full mt-3">
              <Button
                type="submit"
                className="bg-red-500 text-white w-full font-medium gap-2"
                disabled={loading}
              >
                <span>Login</span>
                {loading && (
                  <div className="translate-y-px">
                    <Image
                      alt=""
                      src={imgLoad}
                      className="w-4 aspect-square object-contain animate-spin filter invert"
                    />
                  </div>
                )}
              </Button>

              {errorMessage && (
                <p className="text-red-500 mt-2 pl-px leading-tight text-sm">
                  {errorMessage}
                </p>
              )}

              <p className="text-sm text-center mt-4 mb-1">
                <span className="text-neutral-600">Dont have an account? </span>
                <a
                  href="#"
                  className="font-semibold hover:underline underline-offset-[3px]"
                >
                  Register
                </a>
              </p>
            </div>
          </form>
        </MaxWidthContainer>
      </div>
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

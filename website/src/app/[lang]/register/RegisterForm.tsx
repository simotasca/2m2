"use client";

import Button from "@/components/ui/Button";
import LoadingScreen from "@/components/ui/LoadingScreen";
import iconLogo from "@/images/logo-dark.svg";
import AuthLayout from "@/layouts/AuthLayout";
import { isEmail } from "@/lib/shared/object";
import routes from "@/lib/shared/routes";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import Link from "next/link";
import {
  DetailedHTMLProps,
  Dispatch,
  FormEventHandler,
  InputHTMLAttributes,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { twJoin } from "tailwind-merge";

interface AccessDetails {
  email: string;
  password: string;
}

interface SharedInfo {
  phone: string;
  taxId: string;
}

interface PrivateInfo {
  name: string;
  surname: string;
}

interface BusinessInfo {
  name: string;
  piva: string;
  pec: string;
  sdi: string;
}

const initialAccessDetails: AccessDetails = {
  email: "",
  password: "",
};

const initialSharedInfo: SharedInfo = {
  phone: "",
  taxId: "",
};

const initialPrivateInfo: PrivateInfo = {
  name: "",
  surname: "",
};

const initialBusinessInfo: BusinessInfo = {
  name: "",
  piva: "",
  pec: "",
  sdi: "",
};

export default function RegisterForm() {
  const supabase = createClientComponentClient();

  const [mode, setMode] = useState<"private" | "business">("private");
  const [errorMessage, setErrorMessage] = useState<string>();
  const [loading, setLoding] = useState(false);
  const [success, setSuccess] = useState(false);

  const [conditionsAccepted, setConditionsAccepted] = useState(false);
  const [access, setAccess] = useState<AccessDetails>(initialAccessDetails);
  const [sharedInfo, setSharedInfo] = useState<SharedInfo>(initialSharedInfo);
  const [privateInfo, setPrivateInfo] =
    useState<PrivateInfo>(initialPrivateInfo);
  const [businessInfo, setBusinessInfo] =
    useState<BusinessInfo>(initialBusinessInfo);

  const set = <T, K extends keyof T>(
    setter: Dispatch<SetStateAction<T>>,
    key: K,
    val: T[K]
  ) => {
    setter((prev) => ({ ...prev, [key]: val }));
  };

  const handleRegister: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!access.email || !access.password) {
      setErrorMessage("email and password are required");
      return;
    }

    if (!isEmail(access.email)) {
      setErrorMessage("invalid email");
      return;
    }

    if (!conditionsAccepted) {
      setErrorMessage("You must accept the terms and conditions");
      return;
    }

    let metadata: any = { ...sharedInfo };
    if (mode === "business") {
      metadata = { ...metadata, ...businessInfo, type: "business" };
    } else {
      metadata = { ...metadata, ...privateInfo, type: "private" };
    }

    setLoding(true);
    setErrorMessage(undefined);

    supabase.auth
      .signUp({
        email: access.email,
        password: access.password,
        options: {
          emailRedirectTo: `${location.origin}/api/auth/callback`,
          data: metadata,
        },
      })
      .then(({ error }) => {
        if (error) {
          console.error(e);
          setErrorMessage(error.message);
        } else {
          setErrorMessage(undefined);
          setSuccess(true);
        }
      })
      .catch((e) => {
        console.error(e);
        setErrorMessage("something went wrong");
      })
      .finally(() => setLoding(false));
  };

  useEffect(() => set(setSharedInfo, "taxId", ""), [mode]);

  return (
    <>
      <LoadingScreen message="Loading" loading={loading} />

      <AuthLayout>
        <Image
          src={iconLogo}
          alt="logo 2m2 autoricambi"
          className="w-16 mx-auto"
        />

        <h1 className="text-xl text-center font-bold mt-4 mb-2 uppercase">
          {success ? (
            <>
              <span className="text-red-500">Email </span>
              <span>Sent</span>
            </>
          ) : (
            <>
              <span>Create your </span>
              <span className="text-red-500">Account</span>
            </>
          )}
        </h1>

        {success && (
          <p className="leading-5 mb-3 text-center">
            <span>An email has been sent to </span>
            <b className="font-semibold">{access.email}</b>
            <span> with the confirmation link</span>
          </p>
        )}

        {!success && (
          <>
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
                onClick={() => setMode("business")}
                className={twJoin(
                  "uppercase text-sm py-1 rounded border hover:bg-stone-200",
                  mode === "business"
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

              <Label text="email" required>
                <Input
                  errorMessage={
                    access.email && isEmail(access.email)
                      ? undefined
                      : errorMessage
                  }
                  value={access.email}
                  onChange={(e) => set(setAccess, "email", e.target.value)}
                  placeholder="email"
                  name="email"
                  type="email"
                />
              </Label>

              <Label text="password" required>
                <Input
                  errorMessage={access.password ? undefined : errorMessage}
                  value={access.password}
                  onChange={(e) => set(setAccess, "password", e.target.value)}
                  placeholder="password"
                  name="password"
                  type="password"
                />
              </Label>

              <p className="text-xs leading-3 text-neutral-500 mt-2">
                fields below are optional
              </p>

              <p className="uppercase font-bold -mb-1">
                <span className="text-red-500">
                  {mode === "private" ? "user" : "business"}
                </span>
                <span> INFO</span>
              </p>

              {mode === "private" && (
                <>
                  <Label text="name">
                    <Input
                      value={privateInfo.name}
                      onChange={(e) =>
                        set(setPrivateInfo, "name", e.target.value)
                      }
                      placeholder="name"
                      name="name"
                      type="text"
                    />
                  </Label>

                  <Label text="surname">
                    <Input
                      value={privateInfo.surname}
                      onChange={(e) =>
                        set(setPrivateInfo, "surname", e.target.value)
                      }
                      placeholder="surname"
                      name="surname"
                      type="text"
                    />
                  </Label>

                  <Label text="tax ID">
                    <Input
                      value={sharedInfo.taxId}
                      onChange={(e) =>
                        set(setSharedInfo, "taxId", e.target.value)
                      }
                      placeholder="tax ID"
                      name="tax-id"
                      type="text"
                    />
                  </Label>

                  <Label text="phone">
                    <Input
                      value={sharedInfo.phone}
                      onChange={(e) =>
                        set(setSharedInfo, "phone", e.target.value)
                      }
                      placeholder="phone"
                      name="phone"
                      type="text"
                    />
                  </Label>
                </>
              )}

              {mode === "business" && (
                <>
                  <Label text="business name">
                    <Input
                      value={businessInfo.name}
                      onChange={(e) =>
                        set(setBusinessInfo, "name", e.target.value)
                      }
                      placeholder="business name"
                      name="business-name"
                      type="text"
                    />
                  </Label>

                  <Label text="tax ID">
                    <Input
                      value={sharedInfo.taxId}
                      onChange={(e) =>
                        set(setSharedInfo, "taxId", e.target.value)
                      }
                      placeholder="tax ID"
                      name="tax-id"
                      type="text"
                    />
                  </Label>

                  <Label text="p. IVA">
                    <Input
                      value={businessInfo.piva}
                      onChange={(e) =>
                        set(setBusinessInfo, "piva", e.target.value)
                      }
                      placeholder="partita iva"
                      name="piva"
                      type="text"
                    />
                  </Label>

                  <Label text="phone">
                    <Input
                      value={sharedInfo.phone}
                      onChange={(e) =>
                        set(setSharedInfo, "phone", e.target.value)
                      }
                      placeholder="phone"
                      name="phone"
                      type="text"
                    />
                  </Label>

                  <div className="mt-2 -mb-1">
                    <p className="uppercase text-sm font-bold text-neutral-600 leading-4">
                      Electronic billing data
                    </p>
                    <p className="text-xs leading-3 text-neutral-500">
                      these are used to send you electronic billing for your
                      orders
                    </p>
                  </div>

                  <Label text="pec">
                    <Input
                      value={businessInfo.pec}
                      onChange={(e) =>
                        set(setBusinessInfo, "pec", e.target.value)
                      }
                      placeholder="pec"
                      name="pec"
                      type="email"
                    />
                  </Label>

                  <Label text="sdi code">
                    <Input
                      value={businessInfo.sdi}
                      onChange={(e) =>
                        set(setBusinessInfo, "sdi", e.target.value)
                      }
                      placeholder="sdi code"
                      name="sdi"
                      type="email"
                    />
                  </Label>
                </>
              )}

              <div className="w-full mt-3">
                <div className="flex gap-2 mb-2">
                  <input
                    type="checkbox"
                    checked={conditionsAccepted}
                    onChange={(e) => setConditionsAccepted(e.target.checked)}
                    className="accent-red-500"
                  />
                  <p className="text-sm">
                    <span>I accept the </span>
                    <Link
                      href="#"
                      className="font-semibold hover:text-red-500 hover:underline underline-offset-[3px]">
                      terms and conditions
                    </Link>
                  </p>
                </div>

                <Button
                  type="submit"
                  className="bg-red-500 text-white w-full font-medium">
                  submit
                </Button>

                {errorMessage && (
                  <p className="text-red-500 mt-2 leading-tight text-sm">
                    {errorMessage}
                  </p>
                )}

                <p className="text-sm text-center mt-4 mb-1">
                  <span className="text-neutral-600">Already registered? </span>
                  <Link
                    href={routes.login()}
                    className="font-semibold hover:text-red-500 hover:underline underline-offset-[3px]">
                    Login to account
                  </Link>
                </p>
              </div>
            </form>
          </>
        )}
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

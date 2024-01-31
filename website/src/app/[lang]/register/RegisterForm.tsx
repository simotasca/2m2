"use client";

import Button from "@/components/ui/Button";
import LoadingScreen from "@/components/ui/LoadingScreen";
import useTranslation from "@/context/lang/useTranslation";
import AuthLayout from "@/layouts/AuthLayout";
import { createClientSideClient } from "@/lib/client/supabase";
import { isEmail } from "@/lib/shared/object";
import routes from "@/lib/shared/routes";
import Link from "@/components/navigation/Link";
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
  cf: string;
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

// auth
const initialAccessDetails: AccessDetails = {
  email: "",
  password: "",
};

const initialSharedInfo: SharedInfo = {
  phone: "",
  cf: "",
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
      setErrorMessage(t("misc.errors.required-mail-and-password"));
      return;
    }

    if (!isEmail(access.email)) {
      setErrorMessage(t("misc.errors.invalid-email"));
      return;
    }

    if (!conditionsAccepted) {
      setErrorMessage(t("misc.errors.terms-and-conditions-error"));
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

    const supabase = createClientSideClient();
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

  useEffect(() => set(setSharedInfo, "cf", ""), [mode]);

  const { t, r } = useTranslation();

  return (
    <>
      <LoadingScreen message="Loading" loading={loading} />

      <AuthLayout>
        <AuthLayout.Image />

        <AuthLayout.Title>
          {success ? (
            <>{r("auth.email.email-sent")}</>
          ) : (
            <>{r("auth.register.title")}</>
          )}
        </AuthLayout.Title>

        {success && (
          <p className="leading-5 mb-3 text-center">
            <span>{r("auth.email.email-sent-to")} </span>
            <b className="font-semibold">{access.email}</b>
            <span> {r("auth.email.confirmation-link")}</span>
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
                )}
              >
                {t("auth.register.private")}
              </button>
              <button
                onClick={() => setMode("business")}
                className={twJoin(
                  "uppercase text-sm py-1 rounded border hover:bg-stone-200",
                  mode === "business"
                    ? "bg-red-gradient text-white font-medium border-transparent"
                    : "bg-stone-100"
                )}
              >
                {t("auth.register.business")}
              </button>
            </div>

            <form onSubmit={handleRegister} className="flex flex-col gap-2">
              <p className="uppercase font-bold mt-2 -mb-1">
                {r("auth.register.access-details.title")}
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
                {r("auth.register.access-details.optional-fields")}
              </p>

              <p className="uppercase font-bold -mb-1">
                {mode === "private"
                  ? r("auth.register.info.info-user.user")
                  : r("auth.register.info.info-business.business")}
              </p>

              {mode === "private" && (
                <>
                  <Label text={t("auth.register.info.info-user.name.label")}>
                    <Input
                      value={privateInfo.name}
                      onChange={(e) =>
                        set(setPrivateInfo, "name", e.target.value)
                      }
                      placeholder={t(
                        "auth.register.info.info-user.name.placeholder"
                      )}
                      name="name"
                      type="text"
                    />
                  </Label>

                  <Label text={t("auth.register.info.info-user.surname.label")}>
                    <Input
                      value={privateInfo.surname}
                      onChange={(e) =>
                        set(setPrivateInfo, "surname", e.target.value)
                      }
                      placeholder={t(
                        "auth.register.info.info-user.surname.placeholder"
                      )}
                      name="surname"
                      type="text"
                    />
                  </Label>

                  <Label text={t("auth.register.info.info-user.cf.label")}>
                    <Input
                      value={sharedInfo.cf}
                      onChange={(e) => set(setSharedInfo, "cf", e.target.value)}
                      placeholder={t(
                        "auth.register.info.info-user.cf.placeholder"
                      )}
                      name="cf"
                      type="text"
                    />
                  </Label>

                  <Label text={t("auth.register.info.info-user.phone.label")}>
                    <Input
                      value={sharedInfo.phone}
                      onChange={(e) =>
                        set(setSharedInfo, "phone", e.target.value)
                      }
                      placeholder={t(
                        "auth.register.info.info-user.phone.placeholder"
                      )}
                      name="phone"
                      type="text"
                    />
                  </Label>
                </>
              )}

              {mode === "business" && (
                <>
                  <Label
                    text={t("auth.register.info.info-business.name.label")}
                  >
                    <Input
                      value={businessInfo.name}
                      onChange={(e) =>
                        set(setBusinessInfo, "name", e.target.value)
                      }
                      placeholder={t(
                        "auth.register.info.info-business.name.placeholder"
                      )}
                      name="business-name"
                      type="text"
                    />
                  </Label>

                  <Label text={t("auth.register.info.info-business.cf.label")}>
                    <Input
                      value={sharedInfo.cf}
                      onChange={(e) => set(setSharedInfo, "cf", e.target.value)}
                      placeholder={t(
                        "auth.register.info.info-business.cf.placeholder"
                      )}
                      name="tax-id"
                      type="text"
                    />
                  </Label>

                  <Label
                    text={t("auth.register.info.info-business.piva.label")}
                  >
                    <Input
                      value={businessInfo.piva}
                      onChange={(e) =>
                        set(setBusinessInfo, "piva", e.target.value)
                      }
                      placeholder={t(
                        "auth.register.info.info-business.piva.placeholder"
                      )}
                      name="piva"
                      type="text"
                    />
                  </Label>

                  <Label
                    text={t("auth.register.info.info-business.phone.label")}
                  >
                    <Input
                      value={sharedInfo.phone}
                      onChange={(e) =>
                        set(setSharedInfo, "phone", e.target.value)
                      }
                      placeholder={t(
                        "auth.register.info.info-business.phone.placeholder"
                      )}
                      name="phone"
                      type="text"
                    />
                  </Label>

                  <div className="mt-2 -mb-1">
                    <p className="uppercase text-sm font-bold text-neutral-600 leading-4">
                      {t(
                        "auth.register.info.info-business.electronic-data.title"
                      )}
                    </p>
                    <p className="text-xs leading-3 text-neutral-500">
                      {t(
                        "auth.register.info.info-business.electronic-data.paragraph"
                      )}
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

                  <Label
                    text={t(
                      "auth.register.info.info-business.electronic-data.sdi-code.label"
                    )}
                  >
                    <Input
                      value={businessInfo.sdi}
                      onChange={(e) =>
                        set(setBusinessInfo, "sdi", e.target.value)
                      }
                      placeholder={t(
                        "auth.register.info.info-business.electronic-data.sdi-code.placeholder"
                      )}
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
                  <span className="text-[13px] leading-[1.2]">
                    {r("auth.register.conditions", {
                      link: (l) => (
                        <Link
                          href={routes.terms()}
                          target="_blank"
                          className="font-semibold hover:text-red-500 hover:underline underline-offset-[3px]"
                        >
                          {l}
                        </Link>
                      ),
                    })}
                    &nbsp;<span>e la</span>{" "}
                    <Link
                      href={routes.privacy()}
                      target="_blank"
                      className="font-semibold hover:text-red-500 hover:underline underline-offset-[3px]"
                    >
                      <b className="font-semibold"> privacy policy</b>
                    </Link>
                  </span>
                </div>

                <Button
                  type="submit"
                  className="bg-red-500 text-white w-full font-medium"
                >
                  {t("auth.register.submit")}
                </Button>

                {errorMessage && (
                  <p className="text-red-500 mt-2 leading-tight text-sm">
                    {errorMessage}
                  </p>
                )}

                <p className="text-[13px] text-center mt-4 mb-1">
                  <span className="text-neutral-600">
                    {t("auth.register.already-registered")}{" "}
                  </span>
                  <Link
                    href={routes.login()}
                    className="font-semibold hover:text-red-500 hover:underline underline-offset-[3px]"
                  >
                    {t("auth.register.login-account")}
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

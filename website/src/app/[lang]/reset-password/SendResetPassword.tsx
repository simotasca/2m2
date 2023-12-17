"use client";

import Button from "@/components/ui/Button";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { Database } from "@/database.types";
import AuthLayout from "@/layouts/AuthLayout";
import { isEmail } from "@/lib/shared/object";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { Input } from "./Input";
import useTranslation from "@/context/lang/useTranslation";

export function SendResetPassword() {
  const supabase = createClientComponentClient<Database>();

  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const onclick = async () => {
    if (!email) {
      setError("Please insert your email");
      return;
    }

    if (!isEmail(email)) {
      setError("Invalid email");
      return;
    }

    setLoading(true);
    setError(undefined);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://96b8-5-179-178-59.ngrok-free.app/reset-password",
    });

    if (error) {
      console.error(error);
      setError(error.message);
    } else {
      setSent(true);
    }

    setLoading(false);
  };

  const { t, r } = useTranslation();

  return (
    <>
      <LoadingScreen message="Loading" loading={loading} />

      <AuthLayout>
        <AuthLayout.Image />

        <AuthLayout.Title>
          {sent ? (
            <>{r("auth.password.send-password.check-email")}</>
          ) : (
            <>{r("auth.password.send-password.reset-password")}</>
          )}
        </AuthLayout.Title>

        <p className="leading-5 mb-3 text-center">
          {sent ? (
            <span>
              {r("auth.password.send-password.sent-email", {
                email: () => <b className="font-semibold">{email}</b>,
              })}
            </span>
          ) : (
            "enter the email address for which you want to recover the password"
          )}
        </p>

        {!sent && (
          <>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
              type="email"
              errorMessage={error}
            />

            {error && (
              <p className="text-red-500 pl-1 leading-5 mt-2">{error}</p>
            )}

            <Button
              className="bg-red-gradient text-white font-medium mt-3 ml-auto"
              onClick={() => onclick()}
            >
              {t("auth.password.next")}
            </Button>
          </>
        )}
      </AuthLayout>
    </>
  );
}

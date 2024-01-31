"use client";

import Button from "@/components/ui/Button";
import LoadingScreen from "@/components/ui/LoadingScreen";
import useTranslation from "@/context/lang/useTranslation";
import AuthLayout from "@/layouts/AuthLayout";
import { createClientSideClient } from "@/lib/client/supabase";
import { useState } from "react";
import { Input } from "./Input";

export function SelectNewPassword() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [retry, setRetry] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState(false);

  const update = async () => {
    if (!password) setError("Insert a password");

    setLoading(true);
    setError(undefined);

    const supabase = createClientSideClient();
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      console.error(error);
      switch (error.status) {
        case 400:
          setError("This link has expired");
          setRetry(true);
          break;
        default:
          setError(error.message);
          break;
      }
    } else {
      setUpdated(true);
    }

    setLoading(false);
  };

  const { t, r } = useTranslation();

  return (
    <>
      <LoadingScreen message="updating" loading={loading} />

      <AuthLayout>
        <AuthLayout.Image />

        <AuthLayout.Title>{t("auth.password.title")}</AuthLayout.Title>

        {updated ? (
          <p className="leading-5 mb-3 text-center">
            {t("auth.password.updated")}
          </p>
        ) : (
          <>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="new password"
              type="password"
              errorMessage={error}
            />

            {error && (
              <p className="text-red-500 pl-1 leading-5 mt-3">
                <span>{error} </span>
                {retry && (
                  <a
                    className="hover:text-dark underline underline-offset-1"
                    href={new URL(
                      window.location.pathname,
                      window.origin
                    ).toString()}>
                    {t("auth.password.try-again")}
                  </a>
                )}
              </p>
            )}

            <Button
              className="bg-red-gradient text-white font-medium mt-3 ml-auto"
              onClick={() => update()}>
              {t("auh.password.confirm")}
            </Button>
          </>
        )}
      </AuthLayout>
    </>
  );
}

"use client";

import Button from "@/components/ui/Button";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { Database } from "@/database.types";
import iconLogo from "@/images/logo-dark.svg";
import AuthLayout from "@/layouts/AuthLayout";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { useState } from "react";
import { Input } from "./Input";

export function SelectNewPassword() {
  const supabase = createClientComponentClient<Database>();

  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [retry, setRetry] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState(false);

  const update = async () => {
    if (!password) setError("Insert a password");

    setLoading(true);
    setError(undefined);

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

  return (
    <>
      <LoadingScreen message="updating" loading={loading} />

      <AuthLayout>
        <Image
          src={iconLogo}
          alt="logo 2m2 autoricambi"
          className="w-16 mx-auto"
        />

        <h1 className="text-xl text-center font-bold mt-4 mb-3 uppercase">
          Choose your new password
        </h1>

        {updated ? (
          <p className="leading-5 mb-3 text-center">updated!</p>
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
                    ).toString()}
                  >
                    try again
                  </a>
                )}
              </p>
            )}

            <Button
              className="bg-red-gradient text-white font-medium mt-3 ml-auto"
              onClick={() => update()}
            >
              Confirm
            </Button>
          </>
        )}
      </AuthLayout>
    </>
  );
}

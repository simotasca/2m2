"use client";

import Button from "@/components/ui/Button";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { Database } from "@/database.types";
import iconLogo from "@/images/logo-dark.svg";
import AuthLayout from "@/layouts/AuthLayout";
import { isEmail } from "@/lib/shared/object";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { useState } from "react";
import { Input } from "./Input";

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
      redirectTo: "https://b04f-217-171-67-176.ngrok-free.app/reset-password",
    });

    if (error) {
      console.error(error);
      setError(error.message);
    } else {
      setSent(true);
    }

    setLoading(false);
  };

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
          {sent ? (
            <>
              <span>Check your </span>
              <span className="text-red-500">Email</span>
            </>
          ) : (
            <>
              <span>Reset your </span>
              <span className="text-red-500">Password</span>
            </>
          )}
        </h1>

        <p className="leading-5 mb-3 text-center">
          {sent ? (
            <span>
              An email has been sent to <b className="font-semibold">{email}</b>{" "}
              with the password reset link
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
              Next
            </Button>
          </>
        )}
      </AuthLayout>
    </>
  );
}

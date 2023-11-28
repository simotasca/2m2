"use client";

import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { FormEvent, FormEventHandler, useState } from "react";

export default function RegisterForm() {
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
    <MaxWidthContainer className="bg-white min-h-screen">
      {message && <p className="mt-2">{message}</p>}
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      <form onSubmit={handleRegister}>
        <p>register</p>
        <label>
          <p>username</p>
          <input name="username" type="text" />
        </label>
        <label>
          <p>email</p>
          <input name="email" type="email" />
        </label>
        <label>
          <p>password</p>
          <input name="password" type="password" />
        </label>
        <br />
        <button type="submit">submit</button>
      </form>
    </MaxWidthContainer>
  );
}

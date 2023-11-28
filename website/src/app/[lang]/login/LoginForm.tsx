"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import DemoWrapper from "@/components/DemoWrapper";
import { useRouter } from "next/navigation";
import { MouseEventHandler, useEffect, useState } from "react";

function LoginForm() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    const { error } = await supabase.auth.signUp({
      email: "simo.tasca@gmail.com",
      password: "asdfghjkl",
      options: {
        emailRedirectTo: `${location.origin}/api/auth/callback`,
        data: {
          username: `simo_tasca`,
        },
      },
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      setErrorMessage("");
      setMessage("Check your email address!");
    }
  };

  const ciao = function () {
    return "saluti";
  };

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: "simo.tasca@gmail.com",
      password: "asdfghjkl",
    });
    if (error) {
      setErrorMessage(error.message);
    } else {
      router.refresh();
    }
  };

  return (
    <DemoWrapper>
      <div className="w-fit mx-auto border border-neutral-400 rounded-2xl px-4">
        <div className="flex gap-2 justify-center">
          <button onClick={handleRegister}>register</button>
          <button onClick={handleLogin}>login</button>
        </div>
      </div>
      {message && <p className="mt-2">{message}</p>}
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
    </DemoWrapper>
  );
}

export default LoginForm;

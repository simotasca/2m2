"use client";

import Button from "@/components/ui/Button";
import { supabaseClient } from "@/lib/client/supabase";
import { useEffect, useState } from "react";

export default function DemoClient() {
  const [state, setState] = useState("ancora nada...");

  useEffect(() => {
    supabaseClient.auth.getSession().then((data) => {
      setState(JSON.stringify(data.data.session, null, 2));
    });

    supabaseClient.auth.onAuthStateChange((evt, session) => {
      alert(evt);
      setState(JSON.stringify(session, null, 2));
    });
  }, []);

  const onClick = async () => {
    await fetch("/api/scemo");
  };

  const logout = () => {
    supabaseClient.auth.signOut();
  };

  return (
    <>
      <h2>io sono client:</h2>
      <Button onClick={() => onClick()} className="my-3">
        CIAO
      </Button>
      <Button onClick={() => logout()} className="my-3">
        LOGOUT
      </Button>
      <pre>{state}</pre>
    </>
  );
}

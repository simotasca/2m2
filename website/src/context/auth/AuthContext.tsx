"use client";

import { createClientSideClient } from "@/lib/client/supabase";
import { Session } from "@supabase/supabase-js";
import { PropsWithChildren, createContext, useEffect, useState } from "react";

export const AuthContext = createContext<{
  session: Session | null;
  isLogged: boolean;
  loading: boolean;
}>({
  session: null,
  isLogged: false,
  loading: true,
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const isLogged = !!session?.user;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClientSideClient();
    supabase.auth.getSession().then(({ data, error }) => {
      setLoading(false);
      if (error) {
        console.error("ERROR: couldnt get supabase session: ", error.message);
        return;
      }
      setSession(data.session);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ session, isLogged, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

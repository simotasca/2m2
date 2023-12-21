import { createClientSideClient } from "@/lib/client/supabase";
import { Session } from "@supabase/supabase-js";
import { PropsWithChildren, createContext, useEffect, useState } from "react";

export const AuthContext = createContext<{
  session: Session | null;
  isLogged: boolean;
}>({
  session: null,
  isLogged: false,
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const isLogged = !!session?.user;

  useEffect(() => {
    const supabase = createClientSideClient();
    supabase.auth.getSession().then(({ data, error }) => {
      if (error) {
        console.error("ERROR: couldnt get supabase session: ", error.message);
        return;
      }
      setSession(data.session);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ session, isLogged }}>
      {children}
    </AuthContext.Provider>
  );
}

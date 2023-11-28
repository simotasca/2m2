"use client";

import { Database } from "@/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function LogoutForm() {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  const handleSignOut = async function () {
    await supabase.auth.signOut();
    router.push("/");
  };

  return <button onClick={handleSignOut}>Sign out</button>;
}

"use client";

import { Database } from "@/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

export default function LogoutButton({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  const handleSignOut = async function () {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <button className={className} onClick={handleSignOut}>
      {children}
    </button>
  );
}

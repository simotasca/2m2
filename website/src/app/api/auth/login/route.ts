import { Database } from "@/database.types";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  const supabase = createRouteHandlerClient<Database>({ cookies: cookies });
  const { error } = await supabase.auth.signInWithPassword({
    email: "simo.tasca@gmail.com",
    password: "asdfghjkl",
  });
  return new Response("OK");
}

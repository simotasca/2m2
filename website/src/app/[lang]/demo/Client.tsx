"use client";

import { createClient } from "@supabase/supabase-js";
import { Database } from "@/database.types";
import { supabaseClient } from "@/lib/demo";
import { useEffect } from "react";

export default function Client() {
  const asjdhakjsdj = async () => {
    await supabaseClient.auth.signInWithPassword({
      email: "simo.tasca@gmail.com",
      password: "pass",
    });

    const session = await supabaseClient.auth.getSession();

    console.log("RESULTO ", session.data.session);
  };

  useEffect(() => {
    console.log("EFFECT");
    asjdhakjsdj();
  }, []);

  return <div className="bg-white">ciao</div>;
}

"use client";

import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import imgLogo from "@/images/logo-dark.svg";
import { createClientSideClient } from "@/lib/client/supabase";
import { User } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "@/components/navigation/Link";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

export default function Header({ user }: { user: User }) {
  return (
    <div className="sticky top-0 bg-white shadow-md shadow-[#00000012] z-10">
      <MaxWidthContainer className="flex gap-6 py-2 items-center">
        <Link href="/">
          <Image src={imgLogo} alt="logo 2emme2 autoricambi" className="w-16" />
        </Link>
        <nav className="pt-1.5">
          <ul className="flex gap-6 items-center text-sm font-medium">
            <li className="leading-4 hover:underline hover:text-red-500 underline-offset-2">
              <Link href="/">Back to website</Link>
            </li>
            <HighlightHashLink id="favourites">Preferiti</HighlightHashLink>
            <HighlightHashLink id="cart">Carrello</HighlightHashLink>
            {/*
              <HighlightHashLink id="orders">Elenco ordini</HighlightHashLink>
             */}
            <HighlightHashLink id="user-data">Dati utente</HighlightHashLink>
            <HighlightHashLink id="contacts">Contatti</HighlightHashLink>
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-3 text-sm pt-1.5">
          <span>{user?.email}</span>
          <LogoutButton className="font-medium hover:underline underline-offset-2">
            Logout
          </LogoutButton>
        </div>
      </MaxWidthContainer>
    </div>
  );
}

function HighlightHashLink({
  id,
  children,
}: PropsWithChildren<{ id: string }>) {
  return (
    <li>
      <button
        className="leading-4 hover:underline hover:text-red-500 underline-offset-2"
        onClick={() => {
          window.location.hash = id;
          document
            .querySelectorAll<HTMLDivElement>("[data-box]")
            .forEach((box) => box.classList.remove("highlight"));
          setTimeout(() => {
            document
              .querySelector<HTMLDivElement>(`#${id}[data-box]`)
              ?.classList.add("highlight");
          }, 10);
        }}
      >
        {children}
      </button>
    </li>
  );
}

function LogoutButton({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  const router = useRouter();

  const handleSignOut = async function () {
    const supabase = createClientSideClient();
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <button className={className} onClick={handleSignOut}>
      {children}
    </button>
  );
}

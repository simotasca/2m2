"use server";

import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import { Database } from "@/database.types";
import {
  User,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import imgLogo from "@/images/logo-dark.svg";
import LogoutButton from "./LogoutButton";
import TopBar from "@/components/header/TopBar";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { PropsWithChildren } from "react";
import CartList from "@/components/cart/CartList";
import CartProvider from "@/context/cart/CartProvider";
import { getCart } from "@/lib/server/cart";
import ContactsSection from "@/components/ui/ContactsSection";

export default async function ReservedPage() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data } = await supabase.from("customers").select().single();
  const cart = await getCart(supabase);

  return (
    <>
      <TopBar />

      <Header user={user} />

      <MaxWidthContainer className="bg-white p-8 pb-4">
        <h1 className="uppercase font-bold text-2xl mb-6">
          Your <span className="text-red-500">Dashboard</span>
        </h1>

        <div className="grid grid-cols-12 gap-4">
          {/* <Box className="col-span-12">
            <BoxTitle>Elenco ordini</BoxTitle>
            <div className="grid grid-cols-5">
              <div>12/08/2012</div>
              <div>500€</div>
            </div>
          </Box> */}
          <Box className="col-span-8">
            <BoxTitle>I tuoi Preferiti</BoxTitle>
          </Box>

          <CartProvider cartProducts={cart.products} cartId={cart.id}>
            <Box className="col-span-4">
              <div className="flex items-center justify-between gap-4 mb-2">
                <BoxTitle>Carrello</BoxTitle>
                <p className="font-medium text-sm text-neutral-500 translate-y-px">
                  <span className="text-xs">(</span>
                  <span>0 products</span>
                  <span className="text-xs">)</span>
                </p>
              </div>

              <div className="max-h-[420px] overflow-y-auto">
                <CartList />
              </div>
            </Box>
          </CartProvider>

          <Box className="col-span-6">
            <BoxTitle>Dati utente</BoxTitle>
          </Box>

          <Box className="col-span-6">
            <BoxTitle>contatti</BoxTitle>
            <ContactsSection />
          </Box>
        </div>

        {data && <pre className="my-8">{JSON.stringify(data, null, 2)}</pre>}

        <div className="text-center text-sm">
          <span>© {new Date().getFullYear()} </span>
          <span>Autoricambi </span>
          <span>2</span>
          <span>M</span>
          <span>2</span>
        </div>
      </MaxWidthContainer>
    </>
  );
}

function BoxTitle({ children }) {
  return <h2 className="text-lg font-medium">{children}</h2>;
}

function Box({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={twMerge(
        "border border-stone-300 bg-stone-p [box-shadow:0px_0px_3px_#00000020] p-4",
        className
      )}>
      {children}
    </div>
  );
}

function Header({ user }: { user: User }) {
  return (
    <div className="sticky top-0 bg-white shadow-md shadow-[#00000012] z-10">
      <MaxWidthContainer className="flex gap-8 py-2 items-center">
        <Image src={imgLogo} alt="logo 2emme2 autoricambi" className="w-16" />
        <nav className="pt-1.5">
          <ul className="flex gap-6 items-center text-sm font-medium">
            <li>Preferiti</li>
            <li>Carrello</li>
            <li>Elenco ordini</li>
            <li>Dati utente</li>
            <li>Contatti</li>
          </ul>
        </nav>
        <LogoutButton className="ml-auto pt-1.5 text-sm">
          {user?.email}
        </LogoutButton>
      </MaxWidthContainer>
    </div>
  );
}

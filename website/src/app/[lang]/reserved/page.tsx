"use server";

import CartList from "@/components/cart/CartList";
import TopBar from "@/components/header/TopBar";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import CartProvider from "@/context/cart/CartProvider";
import { Database } from "@/database.types";
import { getCart } from "@/lib/server/cart";
import settings from "@/settings";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import Header from "./Header";
import "./box.css";

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

      <MaxWidthContainer className="bg-white min-h-screen p-8 pb-4">
        <div>
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
            <Box id="favourites" className="col-span-8">
              <BoxTitle>I tuoi Preferiti</BoxTitle>
            </Box>

            <CartProvider cartProducts={cart.products} cartId={cart.id}>
              <Box id="cart" className="col-span-4">
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

            <Box id="user-data" className="col-span-6">
              <BoxTitle>Dati utente</BoxTitle>
            </Box>

            <Box id="contacts" className="col-span-6">
              <BoxTitle>Contatti</BoxTitle>
              <p>
                <span className="text-sm leading-tight">Email: </span>
                <span className="font-medium leading-tight">
                  {settings.info.email}
                </span>
              </p>
              <p>
                <span className="text-sm leading-tight">Phone: </span>
                <span className="font-medium leading-tight">
                  {settings.info.phone}
                </span>
              </p>

              <div className="h-3"></div>

              <BoxTitle>Orari</BoxTitle>
              <ul className="flex flex-col">
                <li>
                  Da <b className="font-medium">Lunedì</b>
                  <span> a </span>
                  <b className="font-medium">Venerdì</b>
                  <span className="text-neutral-600">
                    <span>: </span>
                    <br className="xs:hidden md:block lg:hidden" />
                    <span>{settings.info.openings.monTue}</span>
                  </span>
                </li>
                <li>
                  <b className="font-medium">Sabato</b>
                  <span>: </span>
                  <br className="xs:hidden md:block lg:hidden" />
                  <span>{settings.info.openings.sat}</span>
                </li>
              </ul>
            </Box>
          </div>

          {/* {data && <pre className="my-8">{JSON.stringify(data, null, 2)}</pre>} */}
        </div>

        <div className="text-center text-sm mt-8">
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
  id,
  className,
  children,
}: PropsWithChildren<{ id?: string; className?: string }>) {
  return (
    <div
      id={id}
      data-box
      className={twMerge(
        "border border-stone-300 bg-stone-p [box-shadow:0px_0px_3px_#00000020] p-4 w-full",
        className
      )}
    >
      {children}
    </div>
  );
}

"use client";

import CartList from "@/components/cart/CartList";
import Product from "@/components/product/Product";
import Button from "@/components/ui/Button";
import LoadingScreen from "@/components/ui/LoadingScreen";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import CartProvider from "@/context/cart/CartProvider";
import { createClientSideClient } from "@/lib/client/supabase";
import { EcodatArticle } from "@/lib/shared/ecodat";
import settings from "@/settings";
import { User } from "@supabase/supabase-js";
import { PropsWithChildren, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Input, Label } from "../reset-password/Input";
import { Customer } from "./customer";

interface Props {
  cart: any;
  user: User;
  customer: Customer;
  type: string;
  favourites: EcodatArticle[];
}

export default function ReservedClientPage({
  cart,
  user,
  type,
  customer,
  favourites,
}: Props) {
  const [data, setData] = useState<any>(customer || {});
  const [initial, setInitial] = useState<any>(customer || {});
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

  const saveData = async () => {
    setLoading(true);

    const supabase = createClientSideClient();
    const query =
      type === "business"
        ? supabase
            .from("customer_business")
            .update({
              phone: data.phone,
              name: data.name,
              cf: data.cf,
              piva: data.piva,
              pec: data.pec,
              sdi: data.sdi,
            })
            .eq("id_customer", user.id)
        : supabase
            .from("customer_private")
            .update({
              phone: data.phone,
              name: data.name,
              surname: data.surname,
              cf: data.cf,
            })
            .eq("id_customer", user.id);

    const { error } = await query;

    if (error) {
      console.error("error", error);
      setError(error.message);
    } else {
      setInitial(data);
    }

    setLoading(false);
  };

  const deepEqual = (a: any, b: any) => {
    let eq = true;
    for (const ak in a) {
      if (a[ak] !== b[ak]) {
        eq = false;
        break;
      }
    }
    return eq;
  };

  return (
    <>
      <LoadingScreen loading={loading} message="Salvataggio in corso" />

      <MaxWidthContainer className="bg-white min-h-screen p-8 pb-4">
        <div>
          <h1 className="uppercase font-bold text-2xl mb-6">
            Your <span className="text-red-500">Dashboard</span>
          </h1>

          <div className="grid grid-cols-12 gap-4 md:gap-6 lg:gap-8">
            {/*
              <Box className="col-span-12">
                <BoxTitle>Elenco ordini</BoxTitle>
                <div className="grid grid-cols-5">
                  <div>12/08/2012</div>
                  <div>500€</div>
                </div>
              </Box>
            */}
            <Box id="favourites" className="col-span-full lg:col-span-8">
              <BoxTitle>I tuoi Preferiti</BoxTitle>

              <div className="h-3"></div>

              <div className="overflow-x-auto">
                <div className="flex flex-nowrap w-fit gap-4">
                  {favourites.map((p) => (
                    <div key={p.id} className="w-60">
                      <Product product={p} />
                    </div>
                  ))}
                </div>
              </div>
            </Box>

            <CartProvider cartProductIds={cart.products} cartId={cart.id}>
              <Box
                id="cart"
                className="col-span-full sm:col-span-6 lg:col-span-4">
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

            <Box id="user-data" className="col-span-full sm:col-span-6">
              <div className="flex justify-between gap-4">
                <BoxTitle>
                  <span>Dati </span>
                  <span>{type === "business" ? "azienda" : "utente"}</span>
                </BoxTitle>
                {!deepEqual(data, initial) && (
                  <Button
                    onClick={() => saveData()}
                    className="bg-red-gradient text-white font-medium rounded-md">
                    save
                  </Button>
                )}
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <div className="h-2"></div>

              {customer && (
                <div className="flex flex-col gap-2">
                  {/* <Label text="email">
                  <Input
                    value={user.email || ""}
                    placeholder=". . ."
                    disabled={true}
                  />
                </Label> */}

                  <Label text="phone">
                    <Input
                      value={data?.phone || ""}
                      onChange={(e) =>
                        setData({ ...data, phone: e.target.value })
                      }
                      placeholder=". . ."
                    />
                  </Label>

                  {"piva" in customer ? (
                    <>
                      {/* IS A BUSINESS */}
                      <Label text="ragione sociale">
                        <Input
                          value={data?.name || ""}
                          onChange={(e) =>
                            setData({ ...data, name: e.target.value })
                          }
                          placeholder=". . ."
                        />
                      </Label>

                      <Label text="CF">
                        <Input
                          value={data?.cf || ""}
                          onChange={(e) =>
                            setData({ ...data, cf: e.target.value })
                          }
                          placeholder=". . ."
                        />
                      </Label>

                      <Label text="p. IVA">
                        <Input
                          value={data?.piva || ""}
                          onChange={(e) =>
                            setData({ ...data, piva: e.target.value })
                          }
                          placeholder=". . ."
                        />
                      </Label>

                      <Label text="PEC">
                        <Input
                          value={data?.pec || ""}
                          onChange={(e) =>
                            setData({ ...data, pec: e.target.value })
                          }
                          placeholder=". . ."
                        />
                      </Label>

                      <Label text="SDI">
                        <Input
                          value={data?.sdi || ""}
                          onChange={(e) =>
                            setData({ ...data, sdi: e.target.value })
                          }
                          placeholder=". . ."
                        />
                      </Label>
                    </>
                  ) : (
                    <>
                      {/* IS A PRIVATE */}
                      <Label text="name">
                        <Input
                          value={customer?.name || ""}
                          placeholder=". . ."
                          disabled={true}
                        />
                      </Label>
                      <Label text="surname">
                        <Input
                          value={customer?.surname || ""}
                          placeholder=". . ."
                          disabled={true}
                        />
                      </Label>
                      <Label text="CF">
                        <Input
                          value={customer?.cf || ""}
                          placeholder=". . ."
                          disabled={true}
                        />
                      </Label>
                    </>
                  )}
                </div>
              )}
            </Box>

            <Box
              id="contacts"
              className="place-self-start col-span-full lg:col-span-6">
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
        "border border-stone-300 bg-stone-100 [box-shadow:0px_0px_3px_#00000020] p-4 w-full scroll-m-20",
        className
      )}>
      {children}
    </div>
  );
}

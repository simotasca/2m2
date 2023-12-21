"use client";

import { PropsWithChildren, useState } from "react";
import Button from "../ui/Button";
import useAuth from "@/context/auth/useAuth";
import useFavourites from "@/context/favourites/useFavourites";
import { CartProduct } from "@/lib/shared/cart";
import { LoginModal } from "../auth/LoginModal";

export default function FavouritesToggle({
  children,
  product,
  className,
}: PropsWithChildren<{ product: CartProduct; className?: string }>) {
  const { toggleFavourite, loading: favouritesLoading } = useFavourites();
  const { isLogged } = useAuth();
  const [openLoginModal, setOpenLoginModal] = useState(false);

  return (
    <>
      <Button
        disabled={favouritesLoading}
        onClick={(e) => {
          e.preventDefault();
          isLogged ? toggleFavourite(product) : setOpenLoginModal(true);
        }}
        className={className}>
        {children}
      </Button>

      {/* TODO: opening effect */}
      {!isLogged && openLoginModal && (
        <>
          <div
            className="fixed z-[49] top-0 left-0 w-screen h-screen bg-black bg-opacity-40 pointer-events-auto"
            onClick={(e) => {
              e.preventDefault();
              setOpenLoginModal(false);
            }}></div>
          <div className="fixed z-50 top-0 left-0 w-screen h-screen grid place-items-center pointer-events-none">
            <div className="pointer-events-auto">
              <LoginModal
                title={
                  <p className="text-dark text-sm font-medium text-right leading-[1.2]">
                    {/* TODO: missing translation, see -> r("auth.login.title") */}
                    <span>You must sign in to use favourites</span>
                  </p>
                }
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}

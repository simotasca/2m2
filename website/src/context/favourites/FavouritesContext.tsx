"use client";

import { createClientSideClient } from "@/lib/client/supabase";
import { Dispatch, PropsWithChildren, createContext, useState } from "react";
import useAuth from "../auth/useAuth";

interface Favourite {
  id: number;
}

export const FavouritesContext = createContext<{
  isFavourite: (f: Favourite) => boolean;
  addFavourite: (f: Favourite) => void;
  removeFavourite: (f: Favourite) => void;
  toggleFavourite: (f: Favourite) => void;
  loading: boolean;
  setLoading: Dispatch<boolean>;
}>({
  isFavourite: () => false,
  addFavourite: () => {},
  removeFavourite: () => {},
  toggleFavourite: () => {},
  loading: false,
  setLoading: () => {},
});

type Props = PropsWithChildren<{ initialFavourites: number[] }>;

export default function FavouritesProvider({
  children,
  initialFavourites,
}: Props) {
  const [favourites, setFavourites] = useState<number[]>(initialFavourites);
  const [loading, setLoading] = useState(false);
  const { session } = useAuth();

  const isFavourite = ({ id }: Favourite) => {
    return favourites.indexOf(id) !== -1;
  };

  const addFavourite = async ({ id }: Favourite) => {
    if (!session?.user) return;

    setLoading(true);

    const supabase = createClientSideClient();
    const { error } = await supabase.from("favourites").insert({
      id_product: id,
      id_customer: session.user.id,
    });

    if (error) {
      console.error("ERROR: could not save to favourites: " + error.message);
    } else {
      setFavourites((prev) => [...prev, id]);
    }

    setLoading(false);
  };

  const removeFavourite = async ({ id }: Favourite) => {
    setLoading(true);

    if (!session?.user) return;

    // can only delete mine thanx to RLS
    const supabase = createClientSideClient();
    const { error } = await supabase
      .from("favourites")
      .delete()
      .eq("id_product", id);

    if (error) {
      console.error("ERROR: could not delate favourite: " + error.message);
    }

    setFavourites((prev) => prev.filter((f) => f !== id));
    setLoading(false);
  };

  const toggleFavourite = (f: Favourite) => {
    isFavourite(f) ? removeFavourite(f) : addFavourite(f);
  };

  return (
    <FavouritesContext.Provider
      value={{
        isFavourite,
        addFavourite,
        removeFavourite,
        toggleFavourite,
        loading,
        setLoading,
      }}>
      {children}
    </FavouritesContext.Provider>
  );
}

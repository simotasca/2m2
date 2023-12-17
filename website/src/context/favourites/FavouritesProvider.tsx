"use client";

import { Database } from "@/database.types";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { Dispatch, PropsWithChildren, useEffect, useState } from "react";
import { createContext } from "react";

interface Favourite {
  id: number;
}

export const FavouritesContext = createContext<{
  isFavourite: (f: Favourite) => boolean;
  addFavourite: (f: Favourite) => void;
  removeFavourite: (f: Favourite) => void;
  loading: boolean;
  setLoading: Dispatch<boolean>;
}>({
  isFavourite: () => false,
  addFavourite: () => {},
  removeFavourite: () => {},
  loading: false,
  setLoading: () => {},
});

type Props = PropsWithChildren<{ initialFavourites: number[] }>;

export default function FavouritesProvider({
  children,
  initialFavourites,
}: Props) {
  const supabase = createClientComponentClient<Database>();
  const [favourites, setFavourites] = useState<number[]>(initialFavourites);
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(false);

  const isFavourite = ({ id }: Favourite) => {
    return favourites.indexOf(id) !== -1;
  };

  const addFavourite = async ({ id }: Favourite) => {
    if (!user) {
      // open modal register claim;
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("favourites").insert({
      id_product: id,
      id_customer: user.id,
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

    if (!user) return;

    // can only delete mine thanx to RLS
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

  useEffect(() => {
    supabase.auth.getUser().then(({ data, error }) => {
      if (error || !data?.user) return;
      setUser(data.user);
    });
  }, []);

  return (
    <FavouritesContext.Provider
      value={{
        isFavourite,
        addFavourite,
        removeFavourite,
        loading,
        setLoading,
      }}>
      {children}
    </FavouritesContext.Provider>
  );
}

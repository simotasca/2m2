import { useContext } from "react";
import { FavouritesContext } from "./FavouritesProvider";

export default function useFavourites() {
  return useContext(FavouritesContext);
}

import { useContext } from "react";
import { FavoritesContext } from "../contexts/FavoritesContext";

export function useFavorite() {
  return useContext(FavoritesContext)
}
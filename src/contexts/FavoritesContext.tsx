import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
import { MovieOrSerie } from "../@types/movieOrSerie";

interface FavoritesContextProps {
  favorites: MovieOrSerie[]
  addToFavorites: (item: MovieOrSerie) => void
  removeFromFavorites: (itemId: string) => void
  getFavorites: () => void
}

export const FavoritesContext = createContext({} as FavoritesContextProps)

export function FavoritesContextProvider({ children }) {
  const [favorites, setFavorites] = useState<MovieOrSerie[]>([])

  async function getFavorites() {
    const items = await AsyncStorage.getItem("favorites")

    if (items) {
        setFavorites(JSON.parse(items))
    }
  }

  async function fetchFavorites() {
    await AsyncStorage.setItem("favorites", JSON.stringify(favorites))
  }

  async function addToFavorites(item: MovieOrSerie) {
    const itemAlreadyFavorite = favorites.find(favorite => favorite.id === item.id)
    
    if(!itemAlreadyFavorite) {
      setFavorites([...favorites, item])
    }
  }
  
  async function removeFromFavorites(itemId: string) {
    const itemIsFavorite = favorites.find(favorite => favorite.id === itemId) 
    
    if(itemIsFavorite) {  
      const updatedFavorites = favorites.filter(element => element.id !== itemId)
      
      setFavorites(updatedFavorites)
    }
}

  useEffect(() => {
    getFavorites()
  }, [])

  useEffect(() => {
    fetchFavorites()
  }, [favorites])

  return (
    <FavoritesContext.Provider value={{
      favorites,
      addToFavorites,
      removeFromFavorites,
      getFavorites
    }}>
      {children}
    </FavoritesContext.Provider>
  )
}
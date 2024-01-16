/* eslint-disable react-hooks/exhaustive-deps */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState } from 'react';
import { Movie, TvSerie } from '../@types/cineItems';

interface FavoritesContextProps {
  favorites: (Movie | TvSerie)[];
  addToFavorites: (item: Movie | TvSerie) => Promise<void>;
  removeFromFavorites: (itemId: string) => Promise<void>;
  getFavorites: () => Promise<void>;
}

export const FavoritesContext = createContext({} as FavoritesContextProps);

export function FavoritesContextProvider({ children }) {
  const [favorites, setFavorites] = useState<(Movie | TvSerie)[]>([]);

  async function getFavorites() {
    try {
      const items = await AsyncStorage.getItem('favorites');

      if (items) {
        setFavorites(JSON.parse(items));
      }
    } catch (error) {
      throw error;
    }
  }

  async function fetchFavorites() {
    await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
  }

  async function addToFavorites(item: Movie | TvSerie) {
    const itemAlreadyFavorite = favorites.find(
      favorite => favorite.id === item.id,
    );

    if (!itemAlreadyFavorite) {
      setFavorites([...favorites, item]);
    }
  }

  async function removeFromFavorites(itemId: string) {
    const itemIsFavorite = favorites.find(favorite => favorite.id === itemId);

    if (itemIsFavorite) {
      const updatedFavorites = favorites.filter(
        element => element.id !== itemId,
      );

      setFavorites(updatedFavorites);
    }
  }

  useEffect(() => {
    getFavorites();
  }, []);

  useEffect(() => {
    fetchFavorites();
  }, [favorites]);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        getFavorites,
      }}>
      {children}
    </FavoritesContext.Provider>
  );
}

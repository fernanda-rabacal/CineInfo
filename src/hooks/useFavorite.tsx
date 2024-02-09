import { useEffect, useState } from 'react';
import { Movie, TvSerie } from '../@types/cineItems';
import { StorageService } from '../data/services/StorageService';

export function useFavorite(id?: string) {
  const [favorites, setFavorites] = useState<(Movie | TvSerie)[]>([]);
  const [isFavorited, setIsFavorited] = useState(() => {
    const isFavorite = favorites.find(favorite => favorite.id === id);

    return !!isFavorite;
  });

  async function getFavorites() {
    try {
      const items = await StorageService.getItem('favorites');

      if (items) {
        setFavorites(JSON.parse(items));
      }
    } catch (error) {
      console.error('Error retrieving data');
    }
  }

  async function fetchFavorites() {
    try {
      await StorageService.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error('Error storaging data');
    }
  }

  function addToFavorites(item: Movie | TvSerie) {
    if (itemIsFavorited(item.id)) {
      return;
    }

    setFavorites([...favorites, item]);

    setIsFavorited(true);
  }

  function removeFromFavorites(itemId: string) {
    if (!itemIsFavorited(itemId)) {
      return;
    }
    const updatedFavorites = favorites.filter(element => element.id !== itemId);

    setFavorites(updatedFavorites);
    setIsFavorited(false);
  }

  function itemIsFavorited(itemId: string) {
    const itemIsFavorite = favorites.find(favorite => favorite.id === itemId);

    return !!itemIsFavorite;
  }

  useEffect(() => {
    getFavorites();
  }, []);

  useEffect(() => {
    fetchFavorites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favorites]);

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    getFavorites,
    isFavorited,
  };
}

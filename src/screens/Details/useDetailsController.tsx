import { useCallback, useState } from 'react';
import { DetailsProps } from '../../contexts/CineItemContext';
import { useCineItem } from '../../hooks/useData';
import { useFavorite } from '../../hooks/useFavorite';
import { useFocusEffect } from '@react-navigation/native';

export function useDetailsController(itemId: string, isMovie = true) {
  const { addToFavorites, removeFromFavorites, isFavorited } = useFavorite();
  const { getDetails } = useCineItem();

  const [itemDetails, setItemData] = useState({} as DetailsProps);
  const [isLoading, setIsLoading] = useState(
    Object.keys(itemDetails).length === 0,
  );

  function handleAddToFavorites() {
    addToFavorites(itemDetails);
  }

  function handleRemoveFromFavorites() {
    removeFromFavorites(itemId);
  }

  async function getItemsData() {
    setIsLoading(true);
    const details = await getDetails(itemId, isMovie);

    setItemData(details);
    setIsLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      getItemsData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [itemId]),
  );

  return {
    itemDetails,
    isFavorited,
    isLoading,
    handleAddToFavorites,
    handleRemoveFromFavorites,
  };
}

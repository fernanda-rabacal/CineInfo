import { useState } from 'react';
import { useCineItem } from '../../hooks/useData';
import { Movie, TvSerie } from '../../@types/cineItems';

export function useDiscoverController() {
  const { cineItems, setPage, isLoadingNewPage } = useCineItem();

  const [search, setSearch] = useState('');
  const [selectedTypeId, setSelectedTypeId] = useState(1);
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [selectedCategoryId, setSelectedCategoryId] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);

  const [searchResultItems, setSearchResultItems] = useState<
    (Movie | TvSerie)[]
  >([]);

  const filteredItems = cineItems.filter(item => {
    let hasGenre = true;
    let isFromSelectedType = true;
    let isFromSelectedCategory = true;

    if (selectedGenreId !== 1) {
      hasGenre = !!(item.genre_ids && item.genre_ids.includes(selectedGenreId));
    }

    if (selectedTypeId !== 1) {
      isFromSelectedType =
        (selectedTypeId === 2 && !!Object.keys(item).includes('title')) ||
        (selectedTypeId === 3 && !!Object.keys(item).includes('name'));
    }

    if (selectedCategoryId !== 1) {
      isFromSelectedCategory = item.category_id === selectedCategoryId;
    }

    return hasGenre && isFromSelectedType && isFromSelectedCategory;
  });

  function onEndReached() {
    if (!isLoadingNewPage) {
      setPage(prevPage => prevPage + 1);
    }
  }

  function closeModal() {
    setSearch('');
    setModalVisible(false);
  }

  function handleSearchItems() {
    setModalVisible(true);

    if (!search) {
      setSearchResultItems([]);
      return;
    }

    const resultItems = cineItems.filter(item => {
      //@ts-ignore
      const lowerTitle = (item.title || item.name).trim().toLowerCase();

      return lowerTitle.includes(search.trim().toLowerCase());
    });

    setSearchResultItems(resultItems);
  }

  return {
    cineItems,
    search,
    setSearch,
    handleSearchItems,
    modalVisible,
    closeModal,
    onEndReached,
    filteredItems,
    searchResultItems,
    setSelectedTypeId,
    setSelectedGenreId,
    setSelectedCategoryId,
  };
}

import { useEffect, useState } from 'react';
import { FlatList, Text, TextInput, View } from 'react-native';
import { styles } from './styles';
import { ScreenLayout } from '../../components/ScreenLayout';
import { Select } from '../../components/Select';
import { ItemDisplay } from '../../components/ItemPosterDisplay';
import { categories, genres, types } from '../../data/filterCategories';
import { useCineItem } from '../../hooks/useData';
import { MagnifyingGlass } from 'phosphor-react-native';
import { TvSerie } from '../../@types/cineItems';

export function Discover() {
  const { cineItems, setPage, isLoadingNewPage } = useCineItem();

  const [search, setSearch] = useState('');
  const [selectedTypeId, setSelectedTypeId] = useState(1);
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [selectedCategoryId, setSelectedCategoryId] = useState(1);

  const [searchResultItems, setSearchResultItems] = useState<(Movie & TvSerie)[]>([]);

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

  useEffect(() => {
    function filterItems() {
      if (!search) {
        setSearchResultItems([]);
        return;
      }

      const resultItems = cineItems.filter(item => {
        const lowerTitle = (item.title || item.name).trim().toLowerCase();

        return lowerTitle.includes(search.trim().toLowerCase());
      });

      setSearchResultItems(resultItems);
    }

    filterItems();
  }, [cineItems, search]);

  return (
    <ScreenLayout isLoading={!cineItems.length}>
      <View style={styles.searchInput}>
        <MagnifyingGlass color="#dedede" size={20} />
        <TextInput
          placeholder="Pesquise..."
          style={{ flex: 1 }}
          onChangeText={text => setSearch(text)}
        />
      </View>
      <View style={styles.selectContainer}>
        <Select
          title="Tipos"
          options={types}
          onChangeSelect={setSelectedTypeId}
        />
        <Select
          title="Gêneros"
          options={genres}
          onChangeSelect={setSelectedGenreId}
        />
        <Select
          title="Categorias"
          options={categories}
          onChangeSelect={setSelectedCategoryId}
        />
      </View>
      <FlatList
        data={filteredItems}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item.id + index.toString()}
        numColumns={3}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.2}
        renderItem={({ item }) => (
          <ItemDisplay
            isMovie={!!item.title}
            posterPath={item.poster_path}
            itemId={item.id}
            recommendation
          />
        )}
      />
    </ScreenLayout>
  );
}

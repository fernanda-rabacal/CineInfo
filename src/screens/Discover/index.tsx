import { useState } from 'react';
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { CaretLeft, MagnifyingGlass } from 'phosphor-react-native';
import Modal from 'react-native-modal';

import { styles } from './styles';
import { ScreenLayout } from '../../components/ScreenLayout';
import { Select } from '../../components/Select';
import { ItemDisplay } from '../../components/ItemPosterDisplay';

import { useCineItem } from '../../hooks/useData';
import { Movie, TvSerie } from '../../@types/cineItems';
import { categories, genres, types } from '../../data/filterCategories';
import { SafeAreaView } from 'react-native-safe-area-context';

export function Discover() {
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

  return (
    <>
      <SafeAreaView>
        <Modal
          animationIn="slideInRight"
          animationOut="slideOutRight"
          style={styles.modalContainer}
          isVisible={modalVisible}
          animationInTiming={500}>
          <View style={styles.modalContent}>
            <View style={styles.gotBackContainer}>
              <TouchableOpacity onPress={closeModal}>
                <CaretLeft color="#dddddd" size={28} />
              </TouchableOpacity>
              <View style={[styles.searchInput, { flex: 1 }]}>
                <MagnifyingGlass color="#dedede" size={20} />
                <TextInput
                  placeholder="Pesquise..."
                  onChangeText={text => setSearch(text)}
                  onSubmitEditing={handleSearchItems}
                  returnKeyType="search"
                  value={search}
                />
              </View>
            </View>

            <FlatList
              data={searchResultItems}
              ListEmptyComponent={
                <Text style={styles.noDataFoundText}>
                  Nenhum Resultado encontrado
                </Text>
              }
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => item.id + index.toString()}
              numColumns={3}
              onEndReached={onEndReached}
              onEndReachedThreshold={0.2}
              renderItem={({ item }) => (
                <ItemDisplay
                  //@ts-ignore
                  isMovie={!!item.title}
                  posterPath={item.poster_path}
                  itemId={item.id}
                  recommendation
                />
              )}
            />
          </View>
        </Modal>
      </SafeAreaView>

      <ScreenLayout isLoading={!cineItems.length}>
        <View style={styles.container}>
          <View style={styles.searchInput}>
            <MagnifyingGlass color="#dedede" size={20} />
            <TextInput
              placeholder="Pesquise..."
              onChangeText={text => setSearch(text)}
              onSubmitEditing={handleSearchItems}
              returnKeyType="search"
              value={search}
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
            numColumns={3}
            contentContainerStyle={{ alignItems: 'center', paddingBottom: 20 }}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.2}
            keyExtractor={(item, index) => item.id + index.toString()}
            renderItem={({ item }) => (
              <ItemDisplay
                //@ts-ignore
                isMovie={!!item.title}
                posterPath={item.poster_path}
                itemId={item.id}
                recommendation
              />
            )}
          />
        </View>
      </ScreenLayout>
    </>
  );
}

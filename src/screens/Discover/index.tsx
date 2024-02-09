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

import { categories, genres, types } from '../../data/filterCategories';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDiscoverController } from './useDiscoverController';

export function Discover() {
  const {
    cineItems,
    closeModal,
    filteredItems,
    handleSearchItems,
    modalVisible,
    onEndReached,
    search,
    setSearch,
    searchResultItems,
    setSelectedCategoryId,
    setSelectedGenreId,
    setSelectedTypeId,
  } = useDiscoverController();

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
